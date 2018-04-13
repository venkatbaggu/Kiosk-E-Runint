using System;
using System.Runtime.InteropServices;

namespace LeInfo.Kiosk.WebControls
{

    /// <summary>
    /// 进口导航错误事件接口
    /// </summary>
    [ComImport, Guid("34A715A0-6587-11D0-924A-0020AFC7AC4D"), InterfaceType(ComInterfaceType.InterfaceIsIDispatch), TypeLibType(TypeLibTypeFlags.FHidden)]
    public interface IKioskWebBrowserEvents
    {
        [DispId(271)]
        void NavigateError([In, MarshalAs(UnmanagedType.IDispatch)] object pDisp, [In] ref object URL, [In] ref object frame, [In] ref object statusCode, [In, Out] ref bool cancel);
    }
}
