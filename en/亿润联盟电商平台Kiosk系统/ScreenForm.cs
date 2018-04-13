using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using LeInfo.Kiosk.WebControls;
using mshtml;

namespace LeInfo.Kiosk.yirunKiosk
{
    public partial class ScreenForm : Form
    {
        public string _KioskNum;
        public ScreenForm(string kioskno)
        {
            this._KioskNum = kioskno;
            InitializeComponent();
            this.setKwb(this.kioskWebBrowser1, true);

        }


        /// <summary>
        /// 设置KioskWebBrowser布局属性
        /// </summary>
        /// <param name="kwb">KioskWebBrowser对象</param>
        /// <param name="isObjectForScripting">是否需要JS调用程序内部方法，默认不需要</param>
        private void setKwb(KioskWebBrowser kwb, bool isObjectForScripting = false)
        {
            kwb.Navigate("http://www.e-runint.com/kad/full/terminal_no/" + this._KioskNum);
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
       
      
    }
}
