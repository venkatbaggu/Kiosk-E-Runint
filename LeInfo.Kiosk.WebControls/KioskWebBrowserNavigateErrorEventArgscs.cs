using System;

namespace LeInfo.Kiosk.WebControls
{
    /// <summary>
    /// KioskWebBrowser提供数据。导航错误事件.
    /// </summary>
    public class KioskWebBrowserNavigateErrorEventArgscs : EventArgs
    {
        #region --- 成員 Begin ---

        private String urlValue;
        private String frameValue;
        private Int32 statusCodeValue;
        private Boolean cancelValue;

        public String Url
        {
            get { return urlValue; }
            set { urlValue = value; }
        }

        public String Frame
        {
            get { return frameValue; }
            set { frameValue = value; }
        }

        public Int32 StatusCode
        {
            get { return statusCodeValue; }
            set { statusCodeValue = value; }
        }

        public Boolean Cancel
        {
            get { return cancelValue; }
            set { cancelValue = value; }
        }


        #endregion --- 成員 End ---


        #region --- ctor Begin ---

        public KioskWebBrowserNavigateErrorEventArgscs(String url, String frame, Int32 statusCode, Boolean cancel)
        {
            urlValue = url;
            frameValue = frame;
            statusCodeValue = statusCode;
            cancelValue = cancel;
        }

        #endregion --- ctor End ---
    }

}
