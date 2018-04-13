using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace LeInfo.Kiosk.WebControls
{
    public static class IECache
    {

        public static void ClearIECache()
        {
            try
            {
                //清除IE临时文件
                ShellExecute(IntPtr.Zero, "open", "rundll32.exe", " InetCpl.cpl,ClearMyTracksByProcess 8", "", ShowCommands.SW_HIDE);

                clearFolder(new DirectoryInfo(Environment.GetFolderPath
                              (Environment.SpecialFolder.InternetCache)));

            }
            catch (Exception)
            {

            }

        }

        private static void clearFolder(DirectoryInfo folder)
        {
            foreach (FileInfo file in folder.GetFiles())
            {
                file.Delete();
            }
            foreach (DirectoryInfo subfolder in folder.GetDirectories())
            {
                clearFolder(subfolder);
            }
        }

        [DllImport("shell32.dll")]
        static extern IntPtr ShellExecute(IntPtr hwnd, string lpOperation, string lpFile, string lpParameters, string lpDirectory, ShowCommands nShowCmd);
    }
    public enum ShowCommands : int
    {
        SW_HIDE = 0,
        SW_SHOWNOrmAL = 1,
        SW_NOrmAL = 1,
        SW_SHOWMINIMIZED = 2,
        SW_SHOWMAXIMIZED = 3,
        SW_MAXIMIZE = 3,
        SW_SHOWNOACTIVATE = 4,
        SW_SHOW = 5,
        SW_MINIMIZE = 6,
        SW_SHOWMINNOACTIVE = 7,
        SW_SHOWNA = 8,
        SW_RESTORE = 9,
        SW_SHOWDEFAULT = 10,
        SW_FORCEMINIMIZE = 11,
        SW_MAX = 11
    }
}
