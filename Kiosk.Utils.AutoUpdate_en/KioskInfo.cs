using System;
using System.Collections.Generic;
using System.IO;
using System.Xml.Serialization;

namespace Leinfo.Kiosk.Entity
{
    [Serializable]
    public class KioskInfo
    {
        /// <summary>
        /// 程序名字
        /// </summary>
        public string ProcessName { get; set; } = "erunkiosk";
        /// <summary>
        /// 配置文件
        /// </summary>
        private const string FileName = "kioskinfo.xml";

        /// <summary>
        /// Kiosk编号
        /// </summary>
        public string KioskNum { get; set; }
        /// <summary>
        /// 退出密码
        /// </summary>
        public string KioskExitPaw { get; set; }
        /// <summary>
        /// 头部广告高度
        /// </summary>
        public float KioskHeadAD { get; set; }
        /// <summary>
        /// 底部广告高度
        /// </summary>
        public float KioskBottomAD { get; set; }
        /// <summary>
        /// 更新下载位置
        /// </summary>
        public string AutoUpdateUrl { get; set; }

        /// <summary>
        /// 返回更新状态
        /// </summary>
        public string AutoUpdateResultUrl { get; set; }
        /// <summary>
        /// 最后检查时间
        /// </summary>
        public DateTime LastDate { get; set; }
        /// <summary>
        /// 当前版本
        /// </summary>
        public string CurrVer { get; set; }
        /// <summary>
        /// 最后版本
        /// </summary>
        public string LastVer { get; set; }

        public List <KeyValue> Extension { get; set; } = new List <KeyValue>();

        /// <summary>
        /// 版本比较
        /// </summary>
        /// <returns>需要更新为True</returns>
        public bool CompareVer() {

            var curr = CurrVer.Replace("v", "").Split('.');
            var last = LastVer.Replace("v", "").Split('.');
            bool bl = false;
            bl = (int.Parse(curr[0]) < int.Parse(last[0]));
            if (bl) { return bl; }
            bl=(int.Parse(curr[1]) < int.Parse(last[1]));
            if (bl) { return bl; }

            bl = (int.Parse(curr[2]) < int.Parse(last[2]));
            return bl;
        }


        /// <summary>
        /// 从Xml文档读取获得对象
        /// </summary>
        /// <param name="fileFullPath">xml文件完整路径</param>
        /// <returns>对象实体，失败抛出异常</returns>
        public static KioskInfo LoadXmlFile()
        {
            FileStream fs = null;

            try
            {
                fs = new FileStream(FileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                XmlSerializer xml = new XmlSerializer(typeof(KioskInfo));
                return (KioskInfo)xml.Deserialize(fs);
            }
            catch (Exception)
            {
                KioskInfo info = new KioskInfo() { KioskNum = "KioskDemo", KioskExitPaw = "123456", KioskHeadAD = 610f, KioskBottomAD = 290f, AutoUpdateResultUrl = "", AutoUpdateUrl = "", LastDate = DateTime.Now.AddDays(-1), CurrVer = "v1.0.0", LastVer= "v1.0.0" };
                info.Extension.Add(new KeyValue() { Key = "flag_ScreenForm", Value = 60 });
                KioskInfo.Save(info);
                return info;
            }
            finally
            {
                if (fs != null)
                {
                    fs.Close();
                }
            }
        }

        /// <summary>
        /// 保存对象到Xml文档
        /// </summary>
        /// <param name="t">对象</param>
        /// <param name="fileFullPath">xml文件完整路径</param>
        /// <returns>成功返回 True 抛出异常</returns>
        public static bool Save(KioskInfo t)
        {
            bool bl = false;
            FileStream fs = null;
            try
            {
                if (File.Exists(FileName))
                {
                    File.Delete(FileName);
                }
                fs = new FileStream(FileName, FileMode.OpenOrCreate, FileAccess.Write, FileShare.ReadWrite);

                XmlSerializer xml = new XmlSerializer(typeof(KioskInfo));
                xml.Serialize(fs, t);
                bl = true;
            }
            catch (Exception)
            {
                //throw ex;
            }
            finally
            {
                if (fs != null)
                {
                    fs.Close();
                }
            }
            return bl;
        }
    }

    public class KeyValue
    {
        public string Key { get; set; }

        public Object Value { get; set; }
    }

   
}
