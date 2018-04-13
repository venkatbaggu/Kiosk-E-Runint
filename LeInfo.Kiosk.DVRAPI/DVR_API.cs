using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace LeInfo.Kiosk.DVRAPI
{
    public class DVR_API
    {
        public string msg = "";

        /// <summary>
        /// 官方网址
        /// </summary>
        private const string url_root = "www.hik-online.com";
        /// <summary>
        /// 是否实例DVR的SDK
        /// </summary>
        public bool IsInitSDK { get; set; } = false;

        /// <summary>
        /// 通道列表
        /// </summary>
        public List<ChannelInfo> ChannelInfoList { get; set; } = new List<ChannelInfo>();

        /// <summary>
        /// 设备信息
        /// </summary>
        private CHCNetSDK.NET_DVR_DEVICEINFO_V30 _DeviceInfo;
        /// <summary>
        /// 设备设置
        /// </summary>
        private CHCNetSDK.NET_DVR_IPPARACFG_V40 m_struIpParaCfgV40;
        private CHCNetSDK.NET_DVR_IPCHANINFO m_struChanInfo;
        private CHCNetSDK.NET_DVR_IPCHANINFO_V40 m_struChanInfoV40;

        //设备容器
        private int[] iIPDevID = new int[96];
        private int[] iChannelNum = new int[96];

        //是否预览
        private Int32 m_lRealHandle = -1;

        /// <summary>
        /// 登录ID
        /// </summary>
        private Int32 m_lUserID = -1;

        //记录
        private uint dwAChanTotalNum = 0;
        private uint dwDChanTotalNum = 0;

        /// <summary>
        /// 释放资源
        /// </summary>
        ~DVR_API()
        {
            CHCNetSDK.NET_DVR_Cleanup();
        }

        /// <summary>
        /// 实例SDK
        /// </summary>
        /// <returns>是否成功</returns>
        public bool InitSDK()
        {
            if (IsInitSDK)//防止重新实例
            {
                return IsInitSDK;
            }

            IsInitSDK = CHCNetSDK.NET_DVR_Init();//实例SDK方法

            if (IsInitSDK == false)//实例不成功
            {
                return IsInitSDK;
            }

            //实例成功后

            CHCNetSDK.NET_DVR_SetLogToFile(3, AppDomain.CurrentDomain.BaseDirectory + @"dvrlog\", true);//设置操作记录自动记录

            for (int i = 0; i < 64; i++)//清空设备容器记录
            {
                iIPDevID[i] = -1;
                iChannelNum[i] = -1;
            }

            return IsInitSDK;
        }
        public void Cleanup()
        {
            CHCNetSDK.NET_DVR_Cleanup();
            IsInitSDK = false;
            m_lUserID = -1;
        }
        /// <summary>
        /// 获取最后一次的错误信息
        /// </summary>
        /// <returns></returns>
        public uint GetLastError()
        {
            return CHCNetSDK.NET_DVR_GetLastError();
        }


        /// <summary>
        /// 登陆
        /// </summary>
        /// <param name="url">网址路径</param>
        /// <param name="username">登录名称</param>
        /// <param name="password">登录密码</param>
        /// <returns></returns>
        public bool LoginDVR(string url, string username, string password)
        {
            try
            {
                //检查参数字段
                if (string.IsNullOrWhiteSpace(url) || string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
                {
                    return false;
                }
                //截取设备名字
                if (url.LastIndexOf("/") == url.Length - 1)
                {
                    url = url.Substring(0, url.Length - 1);
                }
                string HiDDNSNamestr = "";
                if (url.IndexOf(url_root) > -1)
                {
                    var index = url.IndexOf(url_root) + url_root.Length + 1;
                    HiDDNSNamestr = url.Substring(index);
                }
                else
                {
                    HiDDNSNamestr = url;
                }
                if (HiDDNSNamestr.Length < 1)
                {
                    return false;
                }

                //转化设备名字
                byte[] HiDDNSName = System.Text.Encoding.Default.GetBytes(HiDDNSNamestr);


                byte[] GetIPAddress = new byte[16]; //获取设备映射的IP
                uint dwPort = 0;//获取设备映射端口
                if (!CHCNetSDK.NET_DVR_GetDVRIPByResolveSvr_EX(url_root, (ushort)80, HiDDNSName, (ushort)HiDDNSName.Length, null, 0, GetIPAddress, ref dwPort))
                {
                    uint iLastErr = CHCNetSDK.NET_DVR_GetLastError();
                    string str = "NET_DVR_GetDVRIPByResolveSvr_EX failed, error code= " + iLastErr; //域名解析失败，输出错误号 Failed to login and output the error code
                    msg = str;
                    return false;
                }


                string DVRIPAddress = System.Text.Encoding.UTF8.GetString(GetIPAddress).TrimEnd('\0');//转换IP
                Int32 DVRPortNumber = (Int32)dwPort;//转换设备映射端口
                msg = DVRIPAddress + ":" + DVRPortNumber;
                m_lUserID = CHCNetSDK.NET_DVR_Login_V30(DVRIPAddress, DVRPortNumber, username, password, ref _DeviceInfo);
                if (m_lUserID < 0)
                {
                    msg += Environment.NewLine + "NET_DVR_Login_V30 failed, error code=" + CHCNetSDK.NET_DVR_GetLastError();
                    return false;
                }
                this.ChannelInfoList.Clear();
                dwAChanTotalNum = (uint)_DeviceInfo.byChanNum;
                dwDChanTotalNum = (uint)_DeviceInfo.byIPChanNum + 256 * (uint)_DeviceInfo.byHighDChanNum;

                if (dwDChanTotalNum > 0)
                {
                    InfoIPChannel();
                }
                else
                {
                    for (int i = 0; i < dwAChanTotalNum; i++)
                    {
                        ListAnalogChannel(i + 1, 1);
                        iChannelNum[i] = i + (int)_DeviceInfo.byStartChan;
                    }
                }
                return true;
            }
            catch (Exception)
            {

            }

            return false;
        }

        private void InfoIPChannel()
        {
            uint dwSize = (uint)Marshal.SizeOf(m_struIpParaCfgV40);

            IntPtr ptrIpParaCfgV40 = Marshal.AllocHGlobal((Int32)dwSize);
            Marshal.StructureToPtr(m_struIpParaCfgV40, ptrIpParaCfgV40, false);

            uint dwReturn = 0;
            int iGroupNo = 0;  //该Demo仅获取第一组64个通道，如果设备IP通道大于64路，需要按组号0~i多次调用NET_DVR_GET_IPPARACFG_V40获取

            if (!CHCNetSDK.NET_DVR_GetDVRConfig(m_lUserID, CHCNetSDK.NET_DVR_GET_IPPARACFG_V40, iGroupNo, ptrIpParaCfgV40, dwSize, ref dwReturn))
            {

                //获取IP资源配置信息失败，输出错误号 Failed to get configuration of IP channels and output the error code
                msg =  "NET_DVR_GetDVRConfig failed, error code=" + CHCNetSDK.NET_DVR_GetLastError();
            }
            else
            {

                m_struIpParaCfgV40 = (CHCNetSDK.NET_DVR_IPPARACFG_V40)Marshal.PtrToStructure(ptrIpParaCfgV40, typeof(CHCNetSDK.NET_DVR_IPPARACFG_V40));

                for (int i = 0; i < dwAChanTotalNum; i++)
                {
                    ListAnalogChannel(i + 1, m_struIpParaCfgV40.byAnalogChanEnable[i]);
                    iChannelNum[i] = i + (int)_DeviceInfo.byStartChan;
                }

                byte byStreamType = 0;
                uint iDChanNum = 64;

                if (dwDChanTotalNum < 64)
                {
                    iDChanNum = dwDChanTotalNum; //如果设备IP通道小于64路，按实际路数获取
                }

                for (int i = 0; i < iDChanNum; i++)
                {
                    iChannelNum[i + dwAChanTotalNum] = i + (int)m_struIpParaCfgV40.dwStartDChan;
                    byStreamType = m_struIpParaCfgV40.struStreamMode[i].byGetStreamType;

                    dwSize = (uint)Marshal.SizeOf(m_struIpParaCfgV40.struStreamMode[i].uGetStream);
                    switch (byStreamType)
                    {
                        //目前NVR仅支持直接从设备取流 NVR supports only the mode: get stream from device directly
                        case 0:
                            IntPtr ptrChanInfo = Marshal.AllocHGlobal((Int32)dwSize);
                            Marshal.StructureToPtr(m_struIpParaCfgV40.struStreamMode[i].uGetStream, ptrChanInfo, false);
                            m_struChanInfo = (CHCNetSDK.NET_DVR_IPCHANINFO)Marshal.PtrToStructure(ptrChanInfo, typeof(CHCNetSDK.NET_DVR_IPCHANINFO));

                            //列出IP通道 List the IP channel
                            ListIPChannel(i + 1, m_struChanInfo.byEnable, m_struChanInfo.byIPID);
                            iIPDevID[i] = m_struChanInfo.byIPID + m_struChanInfo.byIPIDHigh * 256 - iGroupNo * 64 - 1;

                            Marshal.FreeHGlobal(ptrChanInfo);
                            break;
                        case 6:
                            IntPtr ptrChanInfoV40 = Marshal.AllocHGlobal((Int32)dwSize);
                            Marshal.StructureToPtr(m_struIpParaCfgV40.struStreamMode[i].uGetStream, ptrChanInfoV40, false);
                            m_struChanInfoV40 = (CHCNetSDK.NET_DVR_IPCHANINFO_V40)Marshal.PtrToStructure(ptrChanInfoV40, typeof(CHCNetSDK.NET_DVR_IPCHANINFO_V40));

                            //列出IP通道 List the IP channel
                            ListIPChannel(i + 1, m_struChanInfoV40.byEnable, m_struChanInfoV40.wIPID);
                            iIPDevID[i] = m_struChanInfoV40.wIPID - iGroupNo * 64 - 1;

                            Marshal.FreeHGlobal(ptrChanInfoV40);
                            break;
                        default:
                            break;
                    }
                }
            }
            Marshal.FreeHGlobal(ptrIpParaCfgV40);
        }



        private void ListIPChannel(Int32 iChanNo, byte byOnline, int byIPID)
        {
            string str1 = String.Format("IPCamera {0}", iChanNo);
            string str2 = "";
            // m_lTree++;

            if (byIPID == 0)
            {
                str2 = "X"; //通道空闲，没有添加前端设备 the channel is idle                  
            }
            else
            {
                if (byOnline == 0)
                {
                    str2 = "离线"; //通道不在线 the channel is off-line
                }
                else
                {
                    str2 = "在线"; //通道在线 The channel is on-line
                }
                ChannelInfoList.Add(new ChannelInfo() { CameraName = str1, CameraStatus = str2 });

            }



        }

        private void ListAnalogChannel(Int32 iChanNo, byte byEnable)
        {
            string str1 = String.Format("Camera {0}", iChanNo);
            string str2 = "";
            //   m_lTree++;

            if (byEnable == 0)
            {
                str2 = "禁用"; //通道已被禁用 This channel has been disabled               
            }
            else
            {
                str2 = "启动"; //通道处于启用状态 This channel has been enabled
            }
            ChannelInfoList.Add(new ChannelInfo() { CameraName = str1, CameraStatus = str2 });

        }


        /// <summary>
        /// 登出程序
        /// </summary>
        public bool LogoutDVR()
        {
            if (m_lRealHandle >= 0)//检查是否在观看
            {
                //正在观看，这里需要关闭监控
                StopView();

            }
            bool bl = CHCNetSDK.NET_DVR_Logout(m_lUserID);//登出

            if (bl)
            {
                m_lUserID = -1;
                this.ChannelInfoList.Clear();
            }
            return bl;
        }


        public bool StopView()
        {

            //停止预览 Stop live view 
            if (!CHCNetSDK.NET_DVR_StopRealPlay(m_lRealHandle))
            {
                return false;
            }

            m_lRealHandle = -1;
            return true;
        }
        public bool ShowView(int iSelIndex, IntPtr handle)
        {
            if (m_lRealHandle >= 0)
            {
                return false;
            }

            CHCNetSDK.NET_DVR_PREVIEWINFO lpPreviewInfo = new CHCNetSDK.NET_DVR_PREVIEWINFO();
            lpPreviewInfo.hPlayWnd = handle;//预览窗口 live view window
            lpPreviewInfo.lChannel = iChannelNum[(int)iSelIndex];//预览的设备通道 the device channel number
            lpPreviewInfo.dwStreamType = 0;//码流类型：0-主码流，1-子码流，2-码流3，3-码流4，以此类推
            lpPreviewInfo.dwLinkMode = 0;//连接方式：0- TCP方式，1- UDP方式，2- 多播方式，3- RTP方式，4-RTP/RTSP，5-RSTP/HTTP 
            lpPreviewInfo.bBlocked = true; //0- 非阻塞取流，1- 阻塞取流
            lpPreviewInfo.dwDisplayBufNum = 15; //播放库显示缓冲区最大帧数
            IntPtr pUser = IntPtr.Zero;//用户数据 user data 

            m_lRealHandle = CHCNetSDK.NET_DVR_RealPlay_V40(m_lUserID, ref lpPreviewInfo, null, pUser);

            return true;
        }

    }
}
