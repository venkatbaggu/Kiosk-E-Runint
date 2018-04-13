//#define DE
using CefSharp;
using CefSharp.WinForms;
using Leinfo.Kiosk.Entity;
using LeInfo.Kiosk.DVRAPI;
using LeInfo.Kiosk.WebControls;
using mshtml;
using Newtonsoft.Json.Linq;
using System;
using System.ComponentModel;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Windows.Forms;

namespace LeInfo.Kiosk.yirunKiosk
{


    public partial class MainForm : Form
    {
        /// <summary>
        /// 回调代理
        /// </summary>
        private delegate void CallbackFunction();

        #region --- 成员 Begin ---

        /// <summary>
        /// 加载数据是等待界面
        /// </summary>
       // private LoadingForm _LoadingForm;

        private ScreenForm _ScreenForm;

        /// <summary>
        /// chrome游览器核心
        /// </summary>
        public ChromiumWebBrowser chromeBrowser;

        /// <summary>
        /// 保持程序焦点位置
        /// </summary>
        private KeepApplicationFocus keepApp = null;

        /// <summary>
        /// 点击退出画面计算
        /// </summary>
        private int _ClickCount = 0;

        /// <summary>
        /// 点击退出画面计算
        /// </summary>
        private bool[] _MouseCloseStep = new bool[2];

        /// <summary>
        /// 当前程序运行的路径
        /// </summary>
        internal string root_url = "file://" + AppDomain.CurrentDomain.BaseDirectory + @"www\";

        /// <summary>
        /// 程序主题
        /// </summary>
        internal string theme = "theme_default";

        internal string wwwRoot = "http://www.e-runint.com";
        //internal string wwwRoot = "http://www.unellinc.hk";
        internal string dvrErrorMsg = "DVR监控失败!";
        //internal string dvrErrorMsg = "DVR Error!";


        /// <summary>
        /// 主页面路径
        /// </summary>
        internal string _Exit_PageUrl = "";

        /// <summary>
        /// 主页面路径
        /// </summary>
        internal string _Home_PageUrl = "";

        /// <summary>
        /// drv错误页面路径
        /// </summary>
        internal string _DrvErrorUrl = "";

        /// <summary>
        /// 头部广告页面路径
        /// </summary>
        internal string _Head_PageUrl = "";

        /// <summary>
        /// 脚部广告页面路径
        /// </summary>
        internal string _Bottom_PageUrl = "";

        /// <summary>
        ///  当前Form对象
        /// </summary>       
        internal MainForm _this;

        /// <summary>
        ///  页面对象
        /// </summary>       
        internal HtmlDocument html = null;

        internal KioskInfo _KioskInfo = null;

        private Timer timer;
        private Timer timer_ScreenForm;
        private int flag_ScreenForm;
        private int flag_ScreenFormCache;
        private bool flag_ScreenFormTow = true;
        internal string dvr_url = "";
        internal string dvr_username = "";
        internal string dvr_password = "";



        private DVR_API dvr_api;

        #endregion --- 成员 End ---

        #region --- 设置页面路径 Begin ---

        /// <summary>
        /// 设置所有页面起始路径
        /// </summary>
        private void setUrl()
        {
            //TODO: 设置所有页面起始路径

            _Exit_PageUrl = this.root_url + @"exitpage\exitpage.html";//退出页面路径

            _this._Head_PageUrl = wwwRoot + "/kad/tad";//头部广告页面路径

            if (_KioskInfo.Extension.Where(s => s.Key == "theme").Count() > 0)
            {
                string ttmp = _KioskInfo.Extension.Where(s => s.Key == "theme").Single().Value.ToString();
                if (string.IsNullOrEmpty(ttmp) == false) { this.theme = ttmp; }
            }
            //主页面路径
            _this._Home_PageUrl = wwwRoot + "/kiosk/www/" + this.theme + "/index.html";
            //_this._Home_PageUrl = "E:/update/theme_2017/index.html";
            //_this._Home_PageUrl = "D:/GitHub/Kiosk-E-Runint/cn/www/theme_2017/index.html";
            _DrvErrorUrl = wwwRoot + "/kiosk/www/" + this.theme + "/dvrerror.html";

            //设置脚部广告页面路径
            _this._Bottom_PageUrl = wwwRoot + "/kad/xad";//底部
        }

        #endregion --- 设置页面路径 End ---

        #region --- 设置KioskWebBrowser加载首页路径 Begin ---
        /// <summary>
        /// 设置KioskWebBrowser加载首页路径
        /// </summary>
        private void setKioskWebBrowserFirstNavigate()
        {
            _this.kwb_Ad_head.Navigate(_this._Head_PageUrl);
            //TODO：设置主页
            //_this.kwb_body.Navigate(_this._Home_PageUrl);
            _this.kwb_Ad_bottom.Navigate(_this._Bottom_PageUrl);

        }


        #endregion --- 设置KioskWebBrowser加载首页路径 End ---

        public MainForm()
        {
            InitializeComponent();
            IECache.ClearIECache();
            dvr_api = new DVR_API();
            //KioskInfo info = new KioskInfo() { KioskNum = "KioskDemo", KioskExitPaw = "123456", KioskHeadAD = 610f, KioskBottomAD = 290f, AutoUpdateResultUrl = "", AutoUpdateUrl = "", LastDate = DateTime.Now.AddDays(-1), CurrVer = "v1.0.0", LastVer = "1.01.01" };
            //info.Extension.Add(new KeyValue() { Key = "k1", Value = "v1" });
            //info.Extension.Add(new KeyValue() { Key = "k2", Value = 1 });           
            //KioskInfo.Save(info);

            _KioskInfo = KioskInfo.LoadXmlFile();
            bool bl = false;
            var currdate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            if (currdate > _KioskInfo.LastDate)
            {
                try
                {
                    bl = this.check();
                }
                catch (Exception)
                {

                }
            }

            if (bl)
            {
                Application.Exit();
                return;
            }

            timer = new Timer();
            timer.Interval = 10 * 60 * 1000;
            timer.Tick += (s, e) =>
            {
                if (html != null)
                {
                    Uri uri = html.Url;
                    string stmp = uri.Segments[uri.Segments.Length - 1];
                    if (stmp == "index.html")
                    {
                        return;
                    }
                }
                chromeBrowser.Load(_Home_PageUrl);
                //html.InvokeScript("userlogout");
            };
            _this = this;//获取自己

            this.keepApp = new KeepApplicationFocus(this.Handle);//实例保持焦点方法
            this.tableLayoutPanel1.RowStyles[0].Height = 50;
            this.tableLayoutPanel1.RowStyles[2].Height = 50;
            this.panel_Body_Kwb.Dock = DockStyle.Fill;
            this.setUrl();//设置页面路径
            this.panel_DVR.Dock = DockStyle.Fill;
            this.panel_DVR.Visible = false;
            this.setKoiskKioskWebBrowserLayout(); //设置Kiosk布局
            this.setEvents();//设置事件



#if !(DE)

            this.tableLayoutPanel1.RowStyles[0].Height = _KioskInfo.KioskHeadAD;
            this.tableLayoutPanel1.RowStyles[2].Height = _KioskInfo.KioskBottomAD;
            this.keepApp.RunAsync();//启动保持焦点

            this.FormBorderStyle = FormBorderStyle.None;//没有边框的窗口

            this.WindowState = FormWindowState.Maximized;//窗口最大化
#endif

            this.setKioskWebBrowserFirstNavigate();//设置KioskWebBrowser加载首页路径



            if (_KioskInfo.Extension.Where(s => s.Key == "flag_ScreenForm").Single().Value is int)
            {
                try
                {
                    flag_ScreenFormCache = (int)_KioskInfo.Extension.Where(s => s.Key == "flag_ScreenForm").Single().Value;
                }
                catch (Exception)
                {

                    flag_ScreenFormCache = -1;
                }
            }
            _ScreenForm = new ScreenForm(_KioskInfo.KioskNum);
            _ScreenForm.WindowState = FormWindowState.Minimized;
            setScreenFormEvents();
            //_ScreenForm.Visible = false;
            _ScreenForm.Show();
            flag_ScreenForm = flag_ScreenFormCache;
            timer_ScreenForm = new Timer();
            timer_ScreenForm.Interval = 1000;

            timer_ScreenForm.Tick += (s, e) =>
            {
                if (flag_ScreenFormTow)
                {
                    if (flag_ScreenForm > 0)
                    {
                        flag_ScreenForm--;
                    }
                    else
                    {
                        flag_ScreenForm = -1;
                    }
                    if (flag_ScreenForm <= 0)
                    {

                        if (keepApp != null)//判断保持界面为最前端是否实例
                        {
                            keepApp.CancelAsync();//关闭保持界面为最前端控制
                        }
                        _this.TopMost = false;
                        _ScreenForm.TopMost = true;
                        _ScreenForm.WindowState = FormWindowState.Maximized;

                    }
                    else
                    {

                        _ScreenForm.TopMost = false;
                        _this.TopMost = true;
                        _ScreenForm.WindowState = FormWindowState.Minimized;
                        if (keepApp != null)
                        {
                            keepApp.RunAsync();
                        }
                    }
                }
            };

            timer_ScreenForm.Start();

        }

        private bool check()
        {
            HttpWebRequest request = WebRequest.Create(wwwRoot + @"/appinf/getKioskVersion") as HttpWebRequest;
            request.KeepAlive = false;
            request.Timeout = 15 * 1000;
            request.Method = "POST";
            request.ContentType = "application/json;charset=UTF-8";
            //参数
            StringBuilder sb = new StringBuilder();
            //sb.Append("trm_id=").Append(this._KioskID);
            //sb.Append("&trm_paw=").Append(this._Monitoring_key);
            //sb.Append("&update_status=").Append(status);

            byte[] byteData = UTF8Encoding.UTF8.GetBytes(sb.ToString());
            request.ContentLength = byteData.Length;
            using (Stream postStream = request.GetRequestStream())
            {
                postStream.Write(byteData, 0, byteData.Length);
            }
            //请求返回结果
            JObject jsonObject = null;
            using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(response.GetResponseStream());
                jsonObject = JObject.Parse(reader.ReadToEnd());

            }
            if (jsonObject == null)
            {
                return false;
            }

            _KioskInfo.LastVer = jsonObject["version"].ToString();
            _KioskInfo.AutoUpdateUrl = jsonObject["url"].ToString();
            _KioskInfo.LastDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day); ;
            KioskInfo.Save(_KioskInfo);
            if (!_KioskInfo.CompareVer())
            {
                return false;
            }
            if (File.Exists("AutoUpdate.exe"))
            {

                System.Diagnostics.Process.Start("AutoUpdate");
                return true;
            }
            return false;
        }

        #region --- 设置Kios游览器 Begin ---

        /// <summary>
        /// 设置 Chrome游览器核心
        /// </summary>
        private void setChromeBrowser()
        {
            CefSettings settings = new CefSettings();
            Cef.Initialize(settings);
            chromeBrowser = new ChromiumWebBrowser(_Home_PageUrl);

            this.panel_Body_Kwb.Controls.Add(chromeBrowser);
            chromeBrowser.Dock = DockStyle.Fill;
            //页面加载完成后
            chromeBrowser.FrameLoadEnd += ChromeBrowser_FrameLoadEnd;
            chromeBrowser.RegisterJsObject("formJs", new ErunJsEvent(this));


        }



        //页面加载完成后
        private void ChromeBrowser_FrameLoadEnd(object sender, FrameLoadEndEventArgs e)
        {
            //重置屏幕保护计时
            flag_ScreenForm = flag_ScreenFormCache;

            var pagename = e.Url.Split('/').Last();
            var strlen = pagename.IndexOf(".");
            if (strlen > 0)
            {
                pagename = pagename.Substring(0, strlen);
            }
            SetScreenFormActionNone();
            //禁止右键
            chromeBrowser.ExecuteScriptAsync("document.oncontextmenu=new Function('event.returnValue=false;');");
            //禁止全选
            chromeBrowser.ExecuteScriptAsync("document.onselectstart=new Function('event.returnValue=false;');");
            for (int i = 0; i < _MouseCloseStep.Length; i++)
            {
                _MouseCloseStep[i] = false;
            }
            _ClickCount = 0;
            switch (pagename)
            {
                case "exitpage":
                case "cart2":
                case "cart3":
                case "cart4":
                case "diy3d":
                case "3d":
                case "e1":
                case "e2":
                    //这些页面不需要屏幕保护
                    SetScreenFormAction1();
                    break;
                default:
                    SetScreenFormAction2();
                    break;
            }

        }


        private void SetScreenFormActionNone()
        {
            if (this.InvokeRequired == true)
            {
                CallbackFunction d = new CallbackFunction(SetScreenFormActionNone);
                this.Invoke(d);

            }
            else
            {
                if (timer.Enabled)
                {
                    timer.Stop();
                }

                flag_ScreenForm = flag_ScreenFormCache;
            }
        }

        private void SetScreenFormAction1()
        {
            if (this.InvokeRequired == true)
            {
                CallbackFunction d = new CallbackFunction(SetScreenFormAction1);
                this.Invoke(d);

            }
            else
            {
                if (timer.Enabled)
                {
                    timer.Stop();
                }

                flag_ScreenForm = flag_ScreenFormCache;
                this.flag_ScreenFormTow = false;
                _ScreenForm.WindowState = FormWindowState.Minimized;
            }
        }
        private void SetScreenFormAction2()
        {
            if (this.InvokeRequired == true)
            {
                CallbackFunction d = new CallbackFunction(SetScreenFormAction2);
                this.Invoke(d);

            }
            else
            {
                //其他页面需要这个屏幕保护计时
                if (timer != null && !timer.Enabled)
                {
#if !(DE)
                    timer.Start();
#endif
                }
                this.flag_ScreenFormTow = true;
            }
        }
        /// <summary>
        /// 设置Kiosk布局
        /// </summary>
        private void setKoiskKioskWebBrowserLayout()
        {
            //设置头部广告页面容器
            this.setKwb(this.kwb_Ad_head);
            //设置主页面容器
            //this.setKwb(this.kwb_body, true);
            this.setChromeBrowser();
            //设置脚部广告容器-底部
            this.setKwb(this.kwb_Ad_bottom);

        }
        /// <summary>
        /// 设置KioskWebBrowser布局属性
        /// </summary>
        /// <param name="kwb">KioskWebBrowser对象</param>
        /// <param name="isObjectForScripting">是否需要JS调用程序内部方法，默认不需要</param>
        private void setKwb(KioskWebBrowser kwb, bool isObjectForScripting = false)
        {
            if (isObjectForScripting)
            {
                //设置JS调用方法
                kwb.ObjectForScripting = this;
            }
            //不显示JS错误
            kwb.ScriptErrorsSuppressed = true;
            //去掉滚动条
            kwb.ScrollBarsEnabled = false;
            //去掉导航栏菜单
            kwb.IsWebBrowserContextMenuEnabled = false;
            //禁用其他标准游览器
            kwb.AllowWebBrowserDrop = false;
        }

        #endregion --- 设置Kios游览器 End ---

        #region --- 设置Kios事件 Begin ---
        /// <summary>
        /// 设置事件
        /// </summary>
        private void setEvents()
        {
            this.setKioskWebBrowserEvents(this.kwb_Ad_head);//头部广告游览器

            // this.setKioskWebBrowserEvents(this.kwb_body, true);//主显示游览器

            this.setKioskWebBrowserEvents(this.kwb_Ad_bottom); //脚部左边广告游览器

            this.FormClosed += MainForm_FormClosed;//程序关闭事件
        }
        /// <summary>
        /// 设置游览器事件
        /// </summary>
        /// <param name="kwb">游览器控件</param>
        /// <param name="isBody">是否为主显示游览器控件</param>
        private void setKioskWebBrowserEvents(KioskWebBrowser kwb, bool isBody = false)
        {

            kwb.NewWindow += kwb_NewWindow; //禁止使用新窗口显示

            kwb.NavigateError += kwb_NavigateError;  //页面路径错误

            if (!isBody)//非主游览器控件
            {
                kwb.DocumentCompleted += ad_kwb_DocumentCompleted;//页面内容变更监控，设置防止全选功能等
                return;
            }

            //主游览器控件

            kwb.Navigating += Body_kwb_Navigating;//设置主页面跳转时触发事件，用于显示加载数据等待页面

            kwb.DocumentCompleted += Body_kwb_DocumentCompleted;//设置主游览器内容更变监控，关闭显示加载数据等待页面，设置防止全选功能等

        }

        private void setScreenFormEvents()
        {
            this._ScreenForm.kioskWebBrowser1.NewWindow += kwb_NewWindow; //禁止使用新窗口显示

            this._ScreenForm.kioskWebBrowser1.NavigateError += kwb_NavigateError;  //页面路径错误
            this._ScreenForm.kioskWebBrowser1.DocumentCompleted += KioskWebBrowser1_DocumentCompleted;//页面内容变更监控，设置防止全选功能等
        }

        #endregion --- 设置Kios事件 End ---

        #region --- 关闭程序 Begin ---

        /// <summary>
        /// 关闭程序
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void MainForm_FormClosed(object sender, FormClosedEventArgs e)
        {

            if (this.keepApp != null)//判断保持界面为最前端是否实例
            {
                this.keepApp.CancelAsync();//关闭保持界面为最前端控制
            }
            if (timer.Enabled)
            {
                timer.Stop();
            }
            if (timer_ScreenForm != null && timer_ScreenForm.Enabled)
            {
                timer_ScreenForm.Stop();
            }

            try
            {
                this.chromeBrowser.Dispose();
                Cef.Shutdown();
            }
            catch
            {

            }

            Application.Exit();//完整退出程序
        }

        #endregion --- 关闭程序 End ---

        #region --- 游览器通用事件和不需要修改的事件 Begin ---


        private void KioskWebBrowser1_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            KioskWebBrowser kwb = sender as KioskWebBrowser;//当前游览器控件
            if (kwb.ReadyState != WebBrowserReadyState.Complete) return;//判断是否加载完成

            foreach (HtmlElement archor in kwb.Document.Links)//将所有的链接的目标，指向本窗体
            {
                archor.SetAttribute("target", "_self");
            }

            foreach (HtmlElement form in kwb.Document.Forms) //将所有的FORM的提交目标，指向本窗体
            {
                form.SetAttribute("target", "_self");
            }

            //禁止KioskWebBrowser全选功能
            kwb.Document.Body.AttachEventHandler("onselectstart", (sender1, e1) =>
            {
                IHTMLWindow2 iWin2 = (IHTMLWindow2)kwb.Document.Window.DomWindow;
                iWin2.@event.returnValue = false;
            });

            if (kwb.Document != null) //注册点击关闭程序事件
            {
                kwb.Document.Click += (ss, ee) =>
                {
                    flag_ScreenForm = flag_ScreenFormCache;


                };

            }


        }

        /// <summary>
        /// 禁止游览器创建新窗体
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void kwb_NewWindow(object sender, CancelEventArgs e)
        {
            e.Cancel = true;
        }

        /// <summary>
        /// 游览器页面内容更变后事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void ad_kwb_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            KioskWebBrowser kwb = sender as KioskWebBrowser;//当前游览器控件
            if (kwb.ReadyState != WebBrowserReadyState.Complete) return;//判断是否加载完成

            foreach (HtmlElement archor in kwb.Document.Links)//将所有的链接的目标，指向本窗体
            {
                archor.SetAttribute("target", "_self");
            }

            foreach (HtmlElement form in kwb.Document.Forms) //将所有的FORM的提交目标，指向本窗体
            {
                form.SetAttribute("target", "_self");
            }

            //禁止KioskWebBrowser全选功能
            kwb.Document.Body.AttachEventHandler("onselectstart", (sender1, e1) =>
            {
                IHTMLWindow2 iWin2 = (IHTMLWindow2)kwb.Document.Window.DomWindow;
                iWin2.@event.returnValue = false;
            });
        }

        /// <summary>
        /// 主页面向导错误
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void kwb_NavigateError(object sender, WebControls.KioskWebBrowserNavigateErrorEventArgscs e)
        {
            string frame = e.Frame;//错误的框架
            int status = e.StatusCode;//错误代码
            if (status == -2146697211)
            {

                if (this.keepApp != null)//判断保持界面为最前端是否实例
                {
                    this.keepApp.CancelAsync();//关闭保持界面为最前端控制
                }
                if (timer.Enabled)
                {
                    timer.Stop();
                }

                NoInternet.NoInternetForm niform = new NoInternet.NoInternetForm();
                niform.Show();
                // this.Hide();                
            }
        }

        /// <summary>
        /// 页面跳转是触发的事件，用于显示加载数据等待页面
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Body_kwb_Navigating(object sender, WebBrowserNavigatingEventArgs e)
        {
#if !(DE)
            if (!e.Url.ToString().Equals("javascript:;"))//判断是否非跳转页面
            {
                //    this._LoadingForm.ShowLoadingForm(); //显示加载数据等待页面
            }
#endif

        }

        #endregion --- 游览器通用事件和不需要修改的事件 End ---

        /// <summary>
        /// 主页面内容更变后事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Body_kwb_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            KioskWebBrowser kwb = sender as KioskWebBrowser;//游览器控件
            if (kwb.ReadyState != WebBrowserReadyState.Complete)//判断是否内容加载完成
            {
                return;
            }
            //内容加载完毕

            this._ClickCount = 0; //重置控制点击屏幕退出程序次数
            for (int i = 0; i < this._MouseCloseStep.Length; i++)//重置控制点击屏幕退出程序的方案记录
            {
                this._MouseCloseStep[i] = false;
            }

            foreach (HtmlElement archor in kwb.Document.Links)  //将所有的链接的目标，指向本窗体
            {
                archor.SetAttribute("target", "_self");
            }

            foreach (HtmlElement form in kwb.Document.Forms) //将所有的FORM的提交目标，指向本窗体
            {
                form.SetAttribute("target", "_self");
            }

            if (kwb.Document != null) //注册点击关闭程序事件
            {
                if (html == null)
                {
                    html = kwb.Document;

                }
            }

            this.BodyDocumentCompleted(html);//跳入页面内容处理方法
            if (timer.Enabled)
            {
                timer.Stop();
            }

            flag_ScreenForm = flag_ScreenFormCache;
            Uri uri = html.Url;
            string s = uri.Segments[uri.Segments.Length - 1];
            switch (s)
            {
                //case "index.html":
                case "exitpage.html":
                case "cart2.html":
                case "cart3.html":
                case "cart4.html":
                case "diy3d.html":
                    this.flag_ScreenFormTow = false;
                    _ScreenForm.WindowState = FormWindowState.Minimized;
                    break;
                default:
                    if (timer != null && !timer.Enabled)
                    {
#if !(DE)
                        timer.Start();
#endif
                    }
                    this.flag_ScreenFormTow = true;

                    break;
            }



            //禁止游览器全选功能
            kwb.Document.Body.AttachEventHandler("onselectstart", (sender1, e1) =>
            {
                IHTMLWindow2 iWin1 = (IHTMLWindow2)kwb.Document.Window.DomWindow;
                iWin1.@event.returnValue = false;
            });
#if !(DE)
            //   this._LoadingForm.CloseLoadingForm();  //关闭显示加载数据等待页面
#endif
        }

        /// <summary>
        /// 点击密码退出程序 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public void Exit_ClickPaw(int x, int y)
        {
            flag_ScreenForm = flag_ScreenFormCache;
            int difference = 100; //判断用的偏差值

            //设置容器最大值
            int maxX = this.panel_Body_Kwb.Width - difference;//X最大值
            int maxY = this.panel_Body_Kwb.Height - difference;//Y最大值

            //获取当前点击坐标
            int currX = x;//当前X值
            int currY = y;//当前Y值

            if (currX < 0 || currY < 0)//判断点击坐标是否正确
            {
                return;
            }

            //if (currX < difference && currY < difference && this._ClickCount == 0) //顺序1 左上角
            //{
            //    this._MouseCloseStep[this._ClickCount] = true;
            //}
            //else if (currX > maxX && currY < difference && this._ClickCount == 1) //顺序2 右上角
            //{
            //    this._MouseCloseStep[this._ClickCount] = true;
            //}
            //else if (currX < difference && currY > maxY && this._ClickCount == 2)//顺序3 左下角
            //{
            //    this._MouseCloseStep[this._ClickCount] = true;
            //}
            //else  if (currX > maxX && currY > maxY && this._ClickCount == 3)//顺序4 右下角
            if (currX > maxX && currY > maxY )//顺序4 右下角
            {
                this._MouseCloseStep[this._ClickCount] = true;
            }
            else//点击错误将会重置数据记录
            {
                this._ClickCount = 0;//重置点击次数
                for (int i = 0; i < this._MouseCloseStep.Length; i++)//重置点击方案记录
                {
                    this._MouseCloseStep[i] = false;
                }
                return;
            }

            if (this._ClickCount < this._MouseCloseStep.Length - 1)//计算点击次数方案
            {
                this._ClickCount++;
                return;
            }

            foreach (var item in this._MouseCloseStep)//检查点击退出方案是否匹配
            {
                if (!item) return;//不匹配
            }

            _this.chromeBrowser.Load(_this._Exit_PageUrl); //跳转退出页面

        }


        private int iSelIndex = -1;
        private void Btn_Click(object sender, EventArgs e)
        {
            Button btn = sender as Button;

            var tag = int.Parse(btn.Tag.ToString());

            if (iSelIndex == tag)
            {
                return;
            }
            // this._LoadingForm.ShowLoadingForm();
            iSelIndex = tag;
            dvr_api.StopView();
            this.pictureBox_DVR.Invalidate();

            foreach (var item in this.panel_List.Controls)
            {
                Button tmp = item as Button;
                if (tmp != null)
                {
                    tmp.Enabled = true;
                }
            }

            bool bl = dvr_api.ShowView(iSelIndex, this.pictureBox_DVR.Handle);

            this.pictureBox_DVR.Invalidate();
            // this._LoadingForm.CloseLoadingForm();
            if (bl == false)
            {
                MessageBox.Show(dvrErrorMsg);
                return;
            }
            btn.Enabled = false;

        }

        /// <summary>
        /// 登陆dvr
        /// </summary>
        /// <returns></returns>
        public void loginDvr()
        {
            if (this.InvokeRequired == true)
            {
                CallbackFunction d = new CallbackFunction(loginDvr);
                this.Invoke(d);

            }
            else
            {

                if (string.IsNullOrWhiteSpace(dvr_url) || string.IsNullOrWhiteSpace(dvr_username) || string.IsNullOrWhiteSpace(dvr_password))
                {
                    this.chromeBrowser.Load(this._DrvErrorUrl);

                }

                if (!dvr_api.InitSDK())
                {
                    this.chromeBrowser.Load(this._DrvErrorUrl);
                }


                this.panel_List.Controls.Clear();
                bool bl = dvr_api.LoginDVR(dvr_url, dvr_username, dvr_password);
                var channelInfoList = dvr_api.ChannelInfoList;
                for (int i = 0; i < channelInfoList.Count; i++)
                {
                    var item = channelInfoList[i];

                    Button btn = new Button();
                    btn.Text = item.CameraName + " (" + item.CameraStatus + ")";
                    // btn.Dock = DockStyle.Left;
                    btn.Height = 50;
                    btn.Width = 200;
                    btn.BackColor = Color.White;
                    btn.Font = new Font("宋体", 14F, FontStyle.Bold, GraphicsUnit.Point, ((byte)(134)));
                    btn.Tag = i;
                    btn.Click += Btn_Click;
                    this.panel_List.Controls.Add(btn);
                }
                if (bl)
                {
                    this.panel_Body_Kwb.Visible = false;
                    this.panel_DVR.Visible = true;
                    if (timer != null && timer.Enabled == true)
                    {
#if !DE
                        timer.Stop();
#endif
                    }
                }
                else
                {
                    this.panel_DVR.Visible = false;
                    this.panel_Body_Kwb.Visible = true;

                    this.chromeBrowser.Load(this._DrvErrorUrl);
                }
            }
        }

        /// <summary>
        /// 退出dvr
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button1_Click(object sender, EventArgs e)
        {
            this.panel_Body_Kwb.Visible = true;
            this.panel_DVR.Visible = false;
            //退出DVR
            bool bl = dvr_api.LogoutDVR();
            if (bl)
            {
                this.panel_List.Controls.Clear();
                this.pictureBox_DVR.Invalidate();
                dvr_api.Cleanup();
                if (timer != null && timer.Enabled == false)
                {
#if !DE
                    timer.Start();
#endif
                }
            }
        }



    }
}
