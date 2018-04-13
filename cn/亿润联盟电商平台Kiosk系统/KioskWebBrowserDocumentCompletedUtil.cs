using System.Windows.Forms;
using LeInfo.Kiosk.WebControls;

namespace LeInfo.Kiosk.yirunKiosk
{
    // KioskWebBrowser页面内容处理程序
    public static class KioskWebBrowserDocumentCompletedUtil
    {
      

        /// <summary>
        /// 页面内容处理
        /// </summary>
        /// <param name="kwb"></param>
        /// <param name="e"></param>
        /// <param name="html_Click"></param>
        public static void BodyDocumentCompleted(this MainForm form, HtmlDocument html)
        {
            //获取页面title        
            string title = html.Title;

            switch (title)
            {
                case "exitkiosk":
                    //这里是退出程序的页面
                    break;
                default:
                    break;
            }
        }

 
    }
}
