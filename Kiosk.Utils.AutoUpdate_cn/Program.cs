using System;
using System.Diagnostics;
using System.Threading;
using System.Windows.Forms;

namespace Kiosk.Utils.AutoUpdate
{
    static class Program
    {
        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        [STAThread]
        static void Main()
        {

                   
            bool isRun = false;
            Mutex mutex = new Mutex(true, Process.GetCurrentProcess().ProcessName, out isRun);
            if (!isRun)
            {
                //MessageBox.Show("本程序已運行了，請不要重復再執行了！");
                Environment.Exit(1);
            }
            else
            {

                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new MainForm());
            }

        }
    }
}
