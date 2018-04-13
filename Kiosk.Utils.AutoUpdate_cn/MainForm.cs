using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Windows.Forms;
using System.Xml;
using ICSharpCode.SharpZipLib.Zip;
using Leinfo.Kiosk.Entity;

namespace Kiosk.Utils.AutoUpdate
{
    public partial class MainForm : Form
    {
        //配置信息
        private KioskInfo _KioskInfo;
        //下载位置
        const string DIRECTORYTEMP = "temp";
        //文件名字
        private string _FileName = "";
        //下载用的类
        private WebClient client = null;




        public MainForm()
        {
            InitializeComponent();

        }
        private void MainForm_Load(object sender, EventArgs e)
        {
            //获取Kiosk信息
            _KioskInfo = KioskInfo.LoadXmlFile();
            //没有更新路径当前程序无效，需要关闭程序

            if (string.IsNullOrWhiteSpace(_KioskInfo.AutoUpdateUrl) || !_KioskInfo.CompareVer())
            {
                Application.Exit();
                return;
            }
            //关闭已启动的Kiosk系统
            this.killProcess();
#if !DEBUG
            //显示为前端界面    
            this.TopMost = true;
            //窗体最大化
            this.WindowState = FormWindowState.Maximized;
#endif
            //删除原有的更新文件
            this.deleteDirectoryFiles();

            this._FileName = _KioskInfo.AutoUpdateUrl.Substring(_KioskInfo.AutoUpdateUrl.LastIndexOf("/") + 1);


            //下载文件用的类
            client = new WebClient();
            //注册下载监听事件
            this.initWebClientEvent();
            //创建下载的临时目录           
            this.createDirectory();
            this.downLoadFiles();
        }

        #region --- 右下角程序图标事件 Begin ---

        private void notifyIcon1_DoubleClick(object sender, EventArgs e)
        {
            if (this.WindowState == FormWindowState.Minimized)
            {

                this.WindowState = FormWindowState.Normal;
            }
            else
            {
                this.WindowState = FormWindowState.Minimized;

            }
        }
        //右鍵顯示\隱藏
        private void sv_ToolStripMenuItem_Click(object sender, EventArgs e)
        {

            if (this.WindowState == FormWindowState.Minimized)
            {

                this.WindowState = FormWindowState.Maximized;
            }
            else
            {
                this.WindowState = FormWindowState.Minimized;

            }
        }
        //右鍵關閉
        private void colose_ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        #endregion --- 右下角程序图标事件 End ---

        /// <summary>
        /// 程序关闭事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MainForm_FormClosed(object sender, FormClosedEventArgs e)
        {
            this.deleteDirectoryFiles();
        }


        #region --- 启动和关闭Kiosk程序 Begin ---

        /// <summary>
        /// 启动Kiosk程序
        /// </summary>
        private void startProcess()
        {
            Timer t = new Timer();
            t.Interval = 1000 * 5;
            t.Tick += (ts, te) =>
            {

                System.Diagnostics.Process[] ps = System.Diagnostics.Process.GetProcesses();
                var count = ps.Where(s => s.ProcessName.Equals(_KioskInfo.ProcessName, StringComparison.CurrentCultureIgnoreCase)).Count();
                if (count == 0)
                {
                    System.Diagnostics.Process.Start(_KioskInfo.ProcessName);
                }
                t.Stop();
                Application.Exit();
            };
            t.Start();
        }



        /// <summary>
        /// 关闭程序
        /// </summary>
        private void killProcess()
        {
            System.Diagnostics.Process[] ps = System.Diagnostics.Process.GetProcesses();
            var process = ps.Where(s => s.ProcessName.Equals(_KioskInfo.ProcessName, StringComparison.CurrentCultureIgnoreCase)).SingleOrDefault();
            if (process != null)
            {
                process.Kill();
            }

        }

        #endregion --- 启动和关闭Kiosk程序 End ---


        #region --- 文件操作 Begin ---

        /// <summary>
        /// 删除更新目录
        /// </summary>
        private void deleteDirectoryFiles()
        {
            try
            {
                //   this.lab_updata.Text = "系统正在删除更新文件";
                if (!Directory.Exists(DIRECTORYTEMP))
                {
                    return;
                }
                Directory.Delete(DIRECTORYTEMP, true);


            }
            catch (Exception)
            {

            }
        }
        /// <summary>
        /// 创建临时下载目录
        /// </summary>
        private void createDirectory()
        {
            try
            {
                Directory.CreateDirectory(DIRECTORYTEMP);
            }
            catch (Exception)
            {

            }

        }

        #endregion --- 文件操作 End ---


        #region --- 下载更新文件 Begin ---

        /// <summary>
        /// 下载文件
        /// </summary>
        private void downLoadFiles()
        {
            try
            {
                this.label2.Text = "准备下载中......";
                // FTP下载用户和密码
                //client.Credentials = new NetworkCredential("YourUserName", "YourPassWord");  
                Uri uri = new Uri(_KioskInfo.AutoUpdateUrl);
                client.DownloadFileAsync(uri, DIRECTORYTEMP + "\\" + this._FileName);
            }
            catch {  
                this.label2.Text = "下载错误！！！准备重启Kiosk系统";
                this.startProcess();
            }
        }


        private void initWebClientEvent()
        {
            int downLoadPercentage = 0;
            //下载进度事件
            client.DownloadProgressChanged += (s, e) =>
            {
                downLoadPercentage = e.ProgressPercentage;
                this.label2.Text = string.Format("({0}/{1}kb--({2}%)", e.BytesReceived, e.TotalBytesToReceive, e.ProgressPercentage);
                this.notifyIcon1.BalloonTipText = this.label2.Text;
                this.notifyIcon1.Text = this.label2.Text;
                this.notifyIcon1.ShowBalloonTip(3000);
            };
            //
            client.DownloadFileCompleted += (s, e) =>
            {
                if (downLoadPercentage == 100 && e.Error == null)
                {
                    this.label2.Text = "下载成功，准备更新Kiosk系统！";
                    this.unzipFiles();
                }
                else
                {
                    this.label2.Text = "下载失败！！！准备重启Kiosk系统";
                }

            };

        }


        #endregion --- 下载更新文件 End ---

        #region --- 解压更新包 Begin ---


        /// <summary>
        /// 解压文件
        /// </summary>
        private void unzipFiles()
        {
            //检查文件
            if (string.IsNullOrEmpty(this._FileName) == true || File.Exists(DIRECTORYTEMP + "\\" + this._FileName) == false)
            {
                this.label2.Text = "更新Kiosk失败，原因没有找到需解压的文件。准备重启Kiosk系统！";
                this.startProcess();
                return;
            }
            //进行解压
            try
            {
                this.label2.Text = "正在安装更新文件，请稍后......";
                FastZip fastZip = new FastZip();
                fastZip.ExtractZip(DIRECTORYTEMP + "\\" + this._FileName, Application.StartupPath, "");
                this.label2.Text = "更新完成，正准备重启Kiosk系统！";
                KioskInfo tmp = KioskInfo.LoadXmlFile();
                tmp.KioskNum = _KioskInfo.KioskNum;
                tmp.CurrVer = _KioskInfo.LastVer;
                tmp.LastVer = _KioskInfo.LastVer;
                tmp.KioskExitPaw = _KioskInfo.KioskExitPaw;
                tmp.KioskHeadAD = _KioskInfo.KioskHeadAD;
                tmp.KioskBottomAD = _KioskInfo.KioskBottomAD;
                tmp.LastDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
                KioskInfo.Save(tmp);
                this.startProcess();
            }
            catch 
            {
                this.label2.Text = "更新失败！准备重启Kiosk系统";
                this.startProcess();
            }
        }

        #endregion --- 解压更新包 End ---


    }
}

