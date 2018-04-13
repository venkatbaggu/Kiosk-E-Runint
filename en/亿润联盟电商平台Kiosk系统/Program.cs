using System;
using System.Diagnostics;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Win32;
using Leinfo.Kiosk.Entity;

namespace LeInfo.Kiosk.yirunKiosk
{
    static class Program
    {
        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        [STAThread]
        static void Main()
        {

            //string appName2 =Process.GetCurrentProcess().ProcessName;//应用程序名称 xxx
            string appName1 = Process.GetCurrentProcess().MainModule.ModuleName; //应用程序名称 xxx.exe

            //构造单启动模式
            bool isRun = false;//程序是否在运行
            Mutex mutex = new Mutex(true, appName1, out isRun);//根据程序名称获取系统线程列表
            if (!isRun)//判断是否在运行
            {
                //在运行
                Environment.Exit(1);//退出当前执行命令
            }
            int setValue = 0;//获取写入
            using (RegistryKey hkIE = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Internet Explorer"))//获取注册表位置 {Internet Explorer}位置
            {
                string svcVersion = hkIE.GetValue("svcVersion").ToString();//读取IE版本

                int ieVer = int.Parse(svcVersion.Substring(0, svcVersion.IndexOf(".")));//简化版本

                //计算版本值
                if (ieVer > 9)
                {
                    setValue = ieVer * 1000;
                }
                else
                {
                    setValue = 9999;
                }
            }

            using (RegistryKey hkEMULATION = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Internet Explorer\MAIN\FeatureControl\FEATURE_BROWSER_EMULATION", true))//获取注册表位置 {FEATURE_BROWSER_EMULATION}位置
            {
                hkEMULATION.SetValue(appName1, setValue, RegistryValueKind.DWord);//写入IE版本值
            }



            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainForm());
        }
    }
}
