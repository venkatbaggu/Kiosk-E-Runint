using System;
using System.Runtime.InteropServices;

namespace LeInfo.Kiosk.DVRAPI
{
    /// <summary>
	/// CHCNetSDK 的摘要说明。
	/// </summary>
    public static class CHCNetSDK
    {

        #region --- 常量 Begin ---

        public const int STREAM_ID_LEN = 32;
        public const int MAX_CHANNUM_V30 = MAX_ANALOG_CHANNUM + MAX_IP_CHANNEL;//64
        public const int MAX_ANALOG_CHANNUM = 32;//最大32个模拟通道
        public const int MAX_IP_CHANNEL = 32;//允许加入的最多IP通道数
        public const int NET_DVR_GET_IPPARACFG_V40 = 1062; //获取IP接入配置信息 
        public const int SERIALNO_LEN = 48;//序列号长度
        public const int MAX_IP_DEVICE_V40 = 64;//允许接入的最大IP设备数
        public const int NAME_LEN = 32;//用户名长度
        public const int PASSWD_LEN = 16;//密码长度
        public const int MAX_DOMAIN_NAME = 64;  /* 最大域名长度 */

        #endregion --- 常量 End ---

        #region --- API参数结构 Begin ---

        /*IP地址*/
        [StructLayoutAttribute(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
        public struct NET_DVR_IPADDR
        {

            /// char[16]
            [MarshalAsAttribute(UnmanagedType.ByValTStr, SizeConst = 16)]
            public string sIpV4;

            /// BYTE[128]
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 128, ArraySubType = UnmanagedType.I1)]
            public byte[] byRes;

            public void Init()
            {
                byRes = new byte[128];
            }
        }

        //ipc接入设备信息扩展，支持ip设备的域名添加
        [StructLayoutAttribute(LayoutKind.Sequential)]
        public struct NET_DVR_IPDEVINFO_V31
        {
            public byte byEnable;//该IP设备是否有效
            public byte byProType;
            public byte byEnableQuickAdd;
            public byte byRes1;//保留字段，置0
            [MarshalAsAttribute(UnmanagedType.ByValTStr, SizeConst = NAME_LEN)]
            public string sUserName;//用户名
            [MarshalAsAttribute(UnmanagedType.ByValTStr, SizeConst = PASSWD_LEN)]
            public string sPassword;//密码
            [MarshalAsAttribute(UnmanagedType.ByValTStr, SizeConst = MAX_DOMAIN_NAME)]
            public string byDomain;//设备域名
            public NET_DVR_IPADDR struIP;//IP地址
            public ushort wDVRPort;// 端口号
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 34, ArraySubType = UnmanagedType.I1)]
            public byte[] byRes2;//保留字段，置0
        }

        [StructLayout(LayoutKind.Explicit)]
        public struct NET_DVR_GET_STREAM_UNION
        {
            [FieldOffset(0)]
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 492, ArraySubType = UnmanagedType.I1)]
            public byte[] byUnion;
            public void Init()
            {
                byUnion = new byte[492];
            }
        }


        [StructLayoutAttribute(LayoutKind.Sequential)]
        public struct NET_DVR_STREAM_MODE
        {
            public byte byGetStreamType;/*取流方式：0- 直接从设备取流；1- 从流媒体取流；2- 通过IPServer获得IP地址后取流；
                                          * 3- 通过IPServer找到设备，再通过流媒体取设备的流； 4- 通过流媒体由URL去取流；
                                          * 5- 通过hiDDNS域名连接设备然后从设备取流 */
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 3, ArraySubType = UnmanagedType.I1)]
            public byte[] byRes;
            public NET_DVR_GET_STREAM_UNION uGetStream;
            public void Init()
            {
                byGetStreamType = 0;
                byRes = new byte[3];
                //uGetStream.Init();
            }
        }

        //NET_DVR_Login_V30()参数结构
        [StructLayoutAttribute(LayoutKind.Sequential)]
        public struct NET_DVR_DEVICEINFO_V30
        {
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = SERIALNO_LEN, ArraySubType = UnmanagedType.I1)]
            public byte[] sSerialNumber;  //序列号
            public byte byAlarmInPortNum;		        //报警输入个数
            public byte byAlarmOutPortNum;		        //报警输出个数
            public byte byDiskNum;				    //硬盘个数
            public byte byDVRType;				    //设备类型, 1:DVR 2:ATM DVR 3:DVS ......
            public byte byChanNum;				    //模拟通道个数
            public byte byStartChan;			        //起始通道号,例如DVS-1,DVR - 1
            public byte byAudioChanNum;                //语音通道数
            public byte byIPChanNum;					//最大数字通道个数，低位  
            public byte byZeroChanNum;			//零通道编码个数 //2010-01-16
            public byte byMainProto;			//主码流传输协议类型 0-private, 1-rtsp,2-同时支持private和rtsp
            public byte bySubProto;				//子码流传输协议类型0-private, 1-rtsp,2-同时支持private和rtsp
            public byte bySupport;        //能力，位与结果为0表示不支持，1表示支持，
                                          //bySupport & 0x1, 表示是否支持智能搜索
                                          //bySupport & 0x2, 表示是否支持备份
                                          //bySupport & 0x4, 表示是否支持压缩参数能力获取
                                          //bySupport & 0x8, 表示是否支持多网卡
                                          //bySupport & 0x10, 表示支持远程SADP
                                          //bySupport & 0x20, 表示支持Raid卡功能
                                          //bySupport & 0x40, 表示支持IPSAN 目录查找
                                          //bySupport & 0x80, 表示支持rtp over rtsp
            public byte bySupport1;        // 能力集扩充，位与结果为0表示不支持，1表示支持
                                           //bySupport1 & 0x1, 表示是否支持snmp v30
                                           //bySupport1 & 0x2, 支持区分回放和下载
                                           //bySupport1 & 0x4, 是否支持布防优先级	
                                           //bySupport1 & 0x8, 智能设备是否支持布防时间段扩展
                                           //bySupport1 & 0x10, 表示是否支持多磁盘数（超过33个）
                                           //bySupport1 & 0x20, 表示是否支持rtsp over http	
                                           //bySupport1 & 0x80, 表示是否支持车牌新报警信息2012-9-28, 且还表示是否支持NET_DVR_IPPARACFG_V40结构体
            public byte bySupport2; /*能力，位与结果为0表示不支持，非0表示支持							
							bySupport2 & 0x1, 表示解码器是否支持通过URL取流解码
							bySupport2 & 0x2,  表示支持FTPV40
							bySupport2 & 0x4,  表示支持ANR
							bySupport2 & 0x8,  表示支持CCD的通道参数配置
							bySupport2 & 0x10,  表示支持布防报警回传信息（仅支持抓拍机报警 新老报警结构）
							bySupport2 & 0x20,  表示是否支持单独获取设备状态子项
							bySupport2 & 0x40,  表示是否是码流加密设备*/
            public ushort wDevType;              //设备型号
            public byte bySupport3; //能力集扩展，位与结果为0表示不支持，1表示支持
                                    //bySupport3 & 0x1, 表示是否多码流
                                    // bySupport3 & 0x4 表示支持按组配置， 具体包含 通道图像参数、报警输入参数、IP报警输入、输出接入参数、
                                    // 用户参数、设备工作状态、JPEG抓图、定时和时间抓图、硬盘盘组管理 
                                    //bySupport3 & 0x8为1 表示支持使用TCP预览、UDP预览、多播预览中的"延时预览"字段来请求延时预览（后续都将使用这种方式请求延时预览）。而当bySupport3 & 0x8为0时，将使用 "私有延时预览"协议。
                                    //bySupport3 & 0x10 表示支持"获取报警主机主要状态（V40）"。
                                    //bySupport3 & 0x20 表示是否支持通过DDNS域名解析取流

            public byte byMultiStreamProto;//是否支持多码流,按位表示,0-不支持,1-支持,bit1-码流3,bit2-码流4,bit7-主码流，bit-8子码流
            public byte byStartDChan;		//起始数字通道号,0表示无效
            public byte byStartDTalkChan;	//起始数字对讲通道号，区别于模拟对讲通道号，0表示无效
            public byte byHighDChanNum;		//数字通道个数，高位
            public byte bySupport4;
            public byte byLanguageType;// 支持语种能力,按位表示,每一位0-不支持,1-支持  
                                       //  byLanguageType 等于0 表示 老设备
                                       //  byLanguageType & 0x1表示支持中文
                                       //  byLanguageType & 0x2表示支持英文
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 9, ArraySubType = UnmanagedType.I1)]
            public byte[] byRes2;		//保留
        }

        /* V40扩展IP接入配置结构 */
        [StructLayoutAttribute(LayoutKind.Sequential)]
        public struct NET_DVR_IPPARACFG_V40
        {
            public uint dwSize;/* 结构大小 */
            public uint dwGroupNum;
            public uint dwAChanNum;
            public uint dwDChanNum;
            public uint dwStartDChan;

            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = MAX_CHANNUM_V30, ArraySubType = UnmanagedType.I1)]
            public byte[] byAnalogChanEnable; /* 模拟通道是否启用，从低到高表示1-32通道，0表示无效 1有效 */

            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = MAX_IP_DEVICE_V40, ArraySubType = UnmanagedType.Struct)]
            public NET_DVR_IPDEVINFO_V31[] struIPDevInfo; /* IP设备 */

            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = MAX_CHANNUM_V30, ArraySubType = UnmanagedType.Struct)]
            public NET_DVR_STREAM_MODE[] struStreamMode;/* IP通道 */

            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 20, ArraySubType = UnmanagedType.I1)]
            public byte[] byRes2; /* 模拟通道是否启用，从低到高表示1-32通道，0表示无效 1有效 */
        }


        /* IP通道匹配参数 */
        [StructLayoutAttribute(LayoutKind.Sequential)]
        public struct NET_DVR_IPCHANINFO
        {
            public byte byEnable;/* 该通道是否在线 */
            public byte byIPID;/* IP设备ID 取值1- MAX_IP_DEVICE */
            public byte byChannel;/* 通道号 */
            public byte byIPIDHigh; // IP设备ID的高8位
            public byte byTransProtocol;//传输协议类型0-TCP/auto(具体有设备决定)，1-UDP 2-多播 3-仅TCP 4-auto
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 31, ArraySubType = UnmanagedType.I1)]
            public byte[] byRes;//保留,置0
            public void Init()
            {
                byRes = new byte[31];
            }
        }


        [StructLayoutAttribute(LayoutKind.Sequential)]
        public struct NET_DVR_IPCHANINFO_V40
        {
            public byte byEnable;				/* 该通道是否在线 */
            public byte byRes1;
            public ushort wIPID;                  //IP设备ID
            public uint dwChannel;				//通道号
            public byte byTransProtocol;		//传输协议类型0-TCP，1-UDP
            public byte byTransMode;			//传输码流模式 0－主码流 1－子码流
            public byte byFactoryType;			/*前端设备厂家类型,通过接口获取*/
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 241, ArraySubType = UnmanagedType.I1)]
            public byte[] byRes;
        }

        //预览V40接口
        [StructLayoutAttribute(LayoutKind.Sequential)]
        public struct NET_DVR_PREVIEWINFO
        {
            public Int32 lChannel;//通道号
            public uint dwStreamType;	// 码流类型，0-主码流，1-子码流，2-码流3，3-码流4 等以此类推
            public uint dwLinkMode;// 0：TCP方式,1：UDP方式,2：多播方式,3 - RTP方式，4-RTP/RTSP,5-RSTP/HTTP 
            public IntPtr hPlayWnd;//播放窗口的句柄,为NULL表示不播放图象
            public bool bBlocked;  //0-非阻塞取流, 1-阻塞取流, 如果阻塞SDK内部connect失败将会有5s的超时才能够返回,不适合于轮询取流操作.
            public bool bPassbackRecord; //0-不启用录像回传,1启用录像回传
            public byte byPreviewMode;//预览模式，0-正常预览，1-延迟预览
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = STREAM_ID_LEN, ArraySubType = UnmanagedType.I1)]
            public byte[] byStreamID;//流ID，lChannel为0xffffffff时启用此参数
            public byte byProtoType; //应用层取流协议，0-私有协议，1-RTSP协议
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 2, ArraySubType = UnmanagedType.I1)]
            public byte[] byRes1;
            public uint dwDisplayBufNum;
            [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 216, ArraySubType = UnmanagedType.I1)]
            public byte[] byRes;
        }

        #endregion --- API参数结构 End ---

        /// <summary>
        /// 预览回调
        /// </summary>
        /// <param name="lRealHandle">当前的预览句柄</param>
        /// <param name="dwDataType">数据类型</param>
        /// <param name="pBuffer">存放数据的缓冲区指针</param>
        /// <param name="dwBufSize">缓冲区大小</param>
        /// <param name="pUser">用户数据</param>
        public delegate void REALDATACALLBACK(Int32 lRealHandle, UInt32 dwDataType, IntPtr pBuffer, UInt32 dwBufSize, IntPtr pUser);

        #region --- 调用函数 Begin ---

        /// <summary>
        /// 初始化SDK，在调用其他SDK函数的前提调用。
        /// </summary>
        /// <returns>TRUE表示成功，FALSE表示失败。</returns>
        [DllImport(@".\dvrlib\HCNetSDK.dll")]
        public static extern bool NET_DVR_Init();


        /// <summary>
        /// 释放SDK资源，在整个程序结束之前最后调用
        /// </summary>
        /// <returns>TRUE表示成功，FALSE表示失败</returns>
        [DllImport(@".\dvrlib\HCNetSDK.dll")]
        public static extern bool NET_DVR_Cleanup();



        /// <summary>
        /// 启用日志文件写入接口
        /// </summary>
        /// <param name="bLogEnable">启用模式</param>
        /// <param name="strLogDir">日志路径</param>
        /// <param name="bAutoDel">是否自动删除</param>
        /// <returns>TRUE表示成功，FALSE表示失败。</returns>
        [DllImport(@".\dvrlib\HCNetSDK.dll")]
        public static extern bool NET_DVR_SetLogToFile(int bLogEnable, string strLogDir, bool bAutoDel);


        /// <summary>
        /// 获取最后一次错误的信息
        /// </summary>
        /// <returns></returns>
        [DllImport(@".\dvrlib\HCNetSDK.dll")]
        public static extern uint NET_DVR_GetLastError();


        /// <summary>
        /// 获取服务IP和端口
        /// </summary>
        /// <param name="sServerIP"></param>
        /// <param name="wServerPort"></param>
        /// <param name="sDVRName"></param>
        /// <param name="wDVRNameLen"></param>
        /// <param name="sDVRSerialNumber"></param>
        /// <param name="wDVRSerialLen"></param>
        /// <param name="sGetIP"></param>
        /// <param name="dwPort"></param>
        /// <returns>TRUE表示成功，FALSE表示失败。</returns>
        [DllImport(@".\dvrlib\HCNetSDK.dll")]
        public static extern bool NET_DVR_GetDVRIPByResolveSvr_EX(string sServerIP, ushort wServerPort, byte[] sDVRName, ushort wDVRNameLen, byte[] sDVRSerialNumber, ushort wDVRSerialLen, byte[] sGetIP, ref uint dwPort);


        /// <summary>
        /// 用户登陆
        /// </summary>
        /// <param name="sDVRIP">设备IP地址</param>
        /// <param name="wDVRPort">设备端口号</param>
        /// <param name="sUserName">登录的用户名</param>
        /// <param name="sPassword">用户密码</param>
        /// <param name="lpDeviceInfo">设备信息</param>
        /// <returns>-1表示失败，其他值表示返回的用户ID值</returns>
        [DllImport(@".\dvrlib\HCNetSDK.dll")]
        public static extern Int32 NET_DVR_Login_V30(string sDVRIP, Int32 wDVRPort, string sUserName, string sPassword, ref NET_DVR_DEVICEINFO_V30 lpDeviceInfo);

        /// <summary>
        /// 用户登出
        /// </summary>
        /// <param name="iUserID">用户ID值</param>
        /// <returns>TRUE表示成功，FALSE表示失败。</returns>
        [DllImport(@".\dvrlib\HCNetSDK.dll")]
        public static extern bool NET_DVR_Logout(int iUserID);



        /// <summary>
        /// 获取参数配置
        /// </summary>
        /// <param name="lUserID">用户ID值</param>
        /// <param name="dwCommand"></param>
        /// <param name="lChannel"></param>
        /// <param name="lpOutBuffer"></param>
        /// <param name="dwOutBufferSize"></param>
        /// <param name="lpBytesReturned"></param>
        /// <returns>TRUE表示成功，FALSE表示失败。</returns>
        [DllImport(@".\dvrlib\HCNetSDK.dll")]
        public static extern bool NET_DVR_GetDVRConfig(int lUserID, uint dwCommand, int lChannel, IntPtr lpOutBuffer, uint dwOutBufferSize, ref uint lpBytesReturned);


        /// <summary>
        /// 实时预览扩展接口
        /// </summary>
        /// <param name="iUserID">用户ID值</param>
        /// <param name="lpPreviewInfo">预览参数</param>
        /// <param name="fRealDataCallBack_V30">码流数据回调函数 </param>
        /// <param name="pUser">用户数据</param>
        /// <returns>1表示失败，其他值作为NET_DVR_StopRealPlay等函数的句柄参数</returns>
        [DllImport(@".\dvrlib\HCNetSDK.dll")]
        public static extern int NET_DVR_RealPlay_V40(int iUserID, ref NET_DVR_PREVIEWINFO lpPreviewInfo, REALDATACALLBACK fRealDataCallBack_V30, IntPtr pUser);


        /// <summary>
        /// 停止预览
        /// </summary>
        /// <param name="iRealHandle">预览句柄，NET_DVR_RealPlay或者NET_DVR_RealPlay_V30的返回值</param>
        /// <returns>TRUE表示成功，FALSE表示失败。</returns>
        [DllImport(@".\dvrlib\HCNetSDK.dll")]
        public static extern bool NET_DVR_StopRealPlay(int iRealHandle);


        #endregion --- 调用函数 End ---

    }

}
