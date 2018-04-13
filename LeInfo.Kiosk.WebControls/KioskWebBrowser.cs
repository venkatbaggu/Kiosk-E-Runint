using System.Runtime.InteropServices;
using System.Security.Permissions;
using System.Windows.Forms;

namespace LeInfo.Kiosk.WebControls
{
    [PermissionSet(SecurityAction.Demand, Name = "FullTrust")]
    [ComVisible(true)]
    public class KioskWebBrowser : WebBrowser
    {
        #region --- 成員 Begin ---
        /// <summary>
        /// 导航错误事件
        /// </summary>
        /// <param name="sender">源</param>
        /// <param name="e">事件</param>
        public delegate void WebBrowserNavigateErrorEventHandler(object sender, KioskWebBrowserNavigateErrorEventArgscs e);
        public event WebBrowserNavigateErrorEventHandler NavigateError;

        AxHost.ConnectionPointCookie _Cookie;
        KioskWebBrowserEventHelper _Helper;

        #endregion --- 成員 End ---

        #region --- Functions Begin ---


        /// <summary>
        /// 浏览表格后的功能
        /// </summary>
        /// <param name="url"></param>
        /// <param name="postdata"></param>
        public void NavigatePost(string url, string postdata)
        {
            System.Text.Encoding a = System.Text.Encoding.UTF8;
            byte[] byte1 = a.GetBytes(postdata);
            this.Navigate(url, "", byte1, "Content-Type: application/x-www-form-urlencoded");
        }

        /// <summary>
        /// 产生一个实例的客户端,它将处理这个事件和ActiveX控件。
        /// </summary>
        [PermissionSetAttribute(SecurityAction.LinkDemand, Name = "FullTrust")]
        protected override void CreateSink()
        {
            base.CreateSink();

            // 产生一个实例的客户端,它将处理这个事件和ActiveX控件。
            _Helper = new KioskWebBrowserEventHelper(this);
            _Cookie = new AxHost.ConnectionPointCookie(this.ActiveXInstance, _Helper, typeof(IKioskWebBrowserEvents));
        }

        /// <summary>
        /// 断开客户处理事件ActiveX控制。
        /// </summary>
        [PermissionSetAttribute(SecurityAction.LinkDemand, Name = "FullTrust")]
        protected override void DetachSink()
        {
            if (_Cookie != null)
            {
                _Cookie.Disconnect();
                _Cookie = null;
            }
            base.DetachSink();
        }

        /// <summary>
        /// 提高导航错误事件事件。
        /// </summary>
        /// <param name="e"></param>
        public virtual void OnNavigateError(KioskWebBrowserNavigateErrorEventArgscs e)
        {
            if (this.NavigateError != null)
            {
                this.NavigateError(this, e);
            }
        }

        protected override void WndProc(ref Message m)
        {
            switch (m.Msg)
            {
                case 0x201:   //   WM_LMOUSEBUTTON 
                case 0x204:
                case 0x207:
                case 0x21:
                    base.DefWndProc(ref m);
                    return;
            }
            base.WndProc(ref m);
        }
        #endregion --- Functions End ---
    }

}
