using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LeInfo.Kiosk.yirunKiosk
{
    /// <summary>
    /// 用于Chrome游览器的JS事件
    /// </summary>
    public class ErunJsEvent
    {
        private MainForm form;
        public ErunJsEvent(MainForm f)
        {
            form = f;
        }

        //window.external.GoToPage(pass);
        //js调用方法 form中的方法名 GoToPage(pass)

        public string UrlUtil(string relative_url)
        {
            return form.root_url + form.theme + relative_url;
        }


        /// <summary>
        /// JS跳转到首页
        /// </summary>
        public void gotofirstpage()
        {

            form.chromeBrowser.Load(form._Home_PageUrl);
        }

  

        public string getkiosnum()
        {
            try
            {

                return form._KioskInfo.KioskNum;

            }
            catch (System.Exception)
            {

                return "kios_demo";
            }

        }
        /// <summary>
        /// 确定退出密码输入
        /// </summary>
        public void exitkioskconfirm(string paw)
        {
            //Application.Exit();
            //TODO:密码退出判断方法

            if (paw.Equals(form._KioskInfo.KioskExitPaw))
            {
                Application.Exit();
               // form.AppExit();
            }
            else
            {
                gotofirstpage();
            }
        }


        /// <summary>
        /// JS跳转页面
        /// </summary>
        /// <param name="url"></param>
        public void gotopage(string relative_url)
        {
            form.chromeBrowser.Load(this.UrlUtil(relative_url));
        }


        public void bodyclick(int x, int y) {

            form.Exit_ClickPaw(x, y);
        }


        public void dvr_login(string inputusername, string inputpassword, string dvrurl)
        {
            //TODO:DVR路径修改
            form.dvr_url = dvrurl;
            form.dvr_username = inputusername;
            form.dvr_password = inputpassword;

             form.loginDvr();
        }
    }


}
