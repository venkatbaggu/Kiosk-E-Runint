using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LeInfo.Kiosk.yirunKiosk
{
    public class KeepApplicationFocus
    {
        //窗体语柄
        private IntPtr formHandle = IntPtr.Zero;
        /// <summary>
        /// 保持焦点后台工作线程
        /// </summary>
        private BackgroundWorker bgWorkerWinFocus;
        /// <summary>
        /// 保持焦点后台工作线程旗标
        /// </summary>
        private bool bgWorkerWinFocusFlag = false;


        /// <summary>
        /// 保持程序窗體在最前端
        /// </summary>
        /// <param name="hWnd"></param>
        /// <returns></returns>
        [DllImport("User32.dll")]
        private static extern int SetForegroundWindow(IntPtr hWnd);
        /// <summary>
        /// 保持程序焦点
        /// </summary>
        /// <param name="handle">程序的语柄</param>
        public KeepApplicationFocus(IntPtr handle)
        {
            this.formHandle = handle;
            this.bgWorkerWinFocusFlag = true;
            this.bgWorkerWinFocus = new BackgroundWorker();
            this.bgWorkerWinFocus.DoWork += BgWorkerWinFocus_DoWork;
        }

        public void CancelAsync()
        {
            this.bgWorkerWinFocusFlag = false;

        }
        /// <summary>
        /// 保持焦点方法
        /// </summary>
        public void RunAsync()
        {
            if (this.bgWorkerWinFocusFlag == false)
            {
                this.bgWorkerWinFocusFlag = true;
                this.bgWorkerWinFocus.RunWorkerAsync();
            }

        }

        private void BgWorkerWinFocus_DoWork(object sender, DoWorkEventArgs e)
        {
            while (bgWorkerWinFocusFlag)
            {
                if (formHandle != IntPtr.Zero)
                {
                    SetForegroundWindow(formHandle);
                    Thread.Sleep(500);
                }
                else
                {
                    bgWorkerWinFocusFlag = false;
                }

            }
        }
    }
}
