using System;
using System.Runtime.InteropServices;

namespace LeInfo.Kiosk.WebControls
{
    /// <summary>
    /// 处理导航错误事件的潜在的ActiveX控制项,通过提高导航错误事件定义在这个班。 
    /// </summary>
    public class KioskWebBrowserEventHelper : StandardOleMarshalObject, IKioskWebBrowserEvents
    {
        private KioskWebBrowser parent;

        public KioskWebBrowserEventHelper(KioskWebBrowser parent)
        {
            this.parent = parent;
        }

        public void NavigateError(object pDisp, ref object url, ref object frame, ref object statusCode, ref bool cancel)
        {
            // 提高NavigateError事件。
            KioskWebBrowserNavigateErrorEventArgscs e = new KioskWebBrowserNavigateErrorEventArgscs((String)url, (String)frame, (Int32)statusCode, cancel);
            this.parent.OnNavigateError(e);
        }

    }
}
