using System;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using System.Windows.Forms;
using System.Xml;

namespace LeInfo.Kiosk.WebControls
{
    [PermissionSet(SecurityAction.Demand, Name = "FullTrust")]
    [ComVisible(true)]
    public abstract class KioskPageHandler
    {
        #region --- 成员 Begin ---


        private string _AppTheme;

        public string AppTheme
        {
            get
            {
                return this._AppTheme;
            }
            set
            {
                this._AppTheme = value;
            }
        }

        static public string LANG_CHT = "cht", LANG_CHS = "chs", LANG_EN = "en";
        private string _Lang = "cht";
        /// <summary>
        /// 語言
        /// </summary>
        public string Lang
        {
            get
            {
                return this._Lang;
            }
            set
            {
                this._Lang = value;
            }
        }


        private string _Type = "All";
        /// <summary>
        /// 类型
        /// </summary>
        public string Type
        {
            get
            {
                return this._Type;
            }
            set
            {
                this._Type = value;
            }
        }


        private string _Id = "1";
        /// <summary>
        /// ID
        /// </summary>
        public string Id
        {
            get
            {
                return this._Id;
            }
            set
            {
                this._Id = value;
            }
        }


        private int _Page = 1;
        /// <summary>
        /// 页码
        /// </summary>
        public int Page
        {
            get
            {
                return this._Page;
            }
            set
            {
                this._Page = value;
            }
        }


        protected static KioskWebBrowser _KioskWebBrowser;

        public static KioskWebBrowser KioskWebBrowser
        {
            get
            {
                return _KioskWebBrowser;
            }
            set
            {
                _KioskWebBrowser = value;
            }
        }


        private static HtmlDocument _HtmlDoc = null;

        public static HtmlDocument HtmlDoc
        {
            get
            {
                return _HtmlDoc;
            }
            set
            {
                _HtmlDoc = value;
            }
        }


        #endregion --- 成员 End ---

        #region --- Ctor Begin ---

        public KioskPageHandler()
        {
            this._Type = GetDefaultType();
        }
        #endregion --- Ctor End ---

        #region --- Virtual Functions Begin ---

        public abstract String GetTitle();

        public abstract String GetTitleDetail();

        public virtual String GetFileName()
        {
            String path = GetPagePath().Replace('/', '\\');
            int i = path.LastIndexOf('\\') + 1;
            if (i >= path.Length) i = path.LastIndexOf("\\") + 1;
            return path.Substring(i);
        }
        public virtual bool NeedNavigation()
        {
            return false;
        }

        public virtual String GetKeyNode()
        {
            return "Id";
        }

        /// <summary>
        /// 返回默认类型
        /// </summary>
        /// <returns></returns>
        public virtual string GetDefaultType()
        {
            return "All";
        }

        public abstract String GetPagePath();

        public abstract String GetDetailPagePath();

        public abstract String GetXMLPath();

        public abstract String GetItemNodesPath();

        public abstract String MakeItemDivInnerHtml(XmlNode item);

        public abstract int GetPageShowItemCount();

        public abstract void XMLDetailToHtml(XmlNode item, HtmlDocument htmlDoc);

        public virtual void ShowTravel(string type, int page)
        {
            //Console.WriteLine("\n\nShow Page: " + GetTitle() + ", type: " + type + " in page:" + page);
            String address = "file://" + AppDomain.CurrentDomain.BaseDirectory + GetPagePath().Replace("/", "\\");
            if (type != "")
                _Type = type;
            else
                _Type = GetDefaultType();
            if (page > 0) this._Page = page;
            _KioskWebBrowser.Navigate(address);
            _KioskWebBrowser.Focus();
        }

        public virtual void ShowTravelDetail(string requireid)
        {
            String address = "file://" + AppDomain.CurrentDomain.BaseDirectory + GetDetailPagePath().Replace("/", "\\");
            _Id = requireid;
            //Console.WriteLine(string.Format("Type: {0} in id {1}", GetDetailPagePath(), requireid));
            _KioskWebBrowser.Navigate(address);
            _KioskWebBrowser.Focus();
        }

        public virtual string nextPageIMG() { return "images/next.png"; }
        public virtual string prevPageIMG() { return "images/pervious.png"; }
        public virtual string nextDetailIMG() { return "images/detail_next.png"; }
        public virtual string prevDetailIMG() { return "images/detail_up.png"; }
        public virtual string backDetailIMG() { return "images/detail_back.png"; }

        public virtual XmlDocument getXmlDocument(bool reflesh = false)
        {
            string cnXmlPath = "file://" + AppDomain.CurrentDomain.BaseDirectory + GetXMLPath();
            XmlDocument cnXml = new XmlDocument();
            cnXml.Load(cnXmlPath);
            return cnXml;
        }

        public virtual void PageTravel()
        {
            Console.WriteLine("Page Travel start: " + _Type);
            _HtmlDoc = _KioskWebBrowser.Document;
            //开始倒计时 javascript 的功能
            //htmlDoc.InvokeScript("initRedirect");

            //子菜单中设置选择
            HtmlElement selectedType = _HtmlDoc.GetElementById("sub_" + _Type);

            if (selectedType != null)
            {
                string subLinkHtml = selectedType.OuterHtml;
                string newSubLinkHtml = subLinkHtml.Replace("<A ", @"<A class=""selected"" ");
                selectedType.OuterHtml = newSubLinkHtml;
            }
            /*else
            {
                return;
            }*/

            //Load xml

            XmlDocument cnXml = getXmlDocument(true);
            XmlNodeList nodes;
            //Load xml data
            if (_Type == "All" || _Type == null || _Type == "")
            {
                nodes = cnXml.SelectNodes(GetItemNodesPath());
            }
            else
            {
                nodes = cnXml.SelectNodes(GetItemNodesPath() + "[Type='" + _Type + "']");
            }
            Console.WriteLine("\n\n\nALL ITEMS COUNT: " + nodes.Count);
            if (nodes.Count <= 0)
            {
                HtmlElement message = _HtmlDoc.GetElementById("EmptyXMLMessage");
                if (message != null)
                {
                    message.InnerHtml = "<div>" + message.InnerText + "</div>";
                }
            }
            else
            {
                //第一条记录时,计算身份证的页面
                int startId = (_Page - 1) * GetPageShowItemCount() + 1;

                //填进6记录页面
                int itemCount = 1;
                for (int i = startId; i < startId + GetPageShowItemCount(); i++)
                {

                    //如果这是最后的记录
                    if (i - 1 >= nodes.Count)
                    {
                        break;
                    }

                    string onclick = "";
                    if (GetTitleDetail() != null)
                        onclick = string.Format("onclick=\"window.external.showTravelDetail('{0}',{1})\"", GetTitleDetail(), nodes.Item(i - 1).SelectSingleNode("Id").InnerText);

                    _HtmlDoc.GetElementById("item_" + itemCount).InnerHtml = String.Format("<div style=\"width:100%\" {0}>{1}</div>", onclick, MakeItemDivInnerHtml(nodes.Item(i - 1)));
                    itemCount++;
                }
            }
            try
            {
                // 计算网页编号为导航按钮
                int last_page = (int)Math.Ceiling((double)nodes.Count / GetPageShowItemCount());
                int pre_page = _Page - 1;
                int next_page = _Page + 1;
                //if (pre_page < 1) pre_page = 1;
                //if (next_page > last_page) next_page = last_page;

                //添加页面导航按钮
                if (_HtmlDoc.GetElementById("page") != null)
                    _HtmlDoc.GetElementById("page").InnerHtml = (pre_page < 1 && next_page > last_page) ? "&nbsp;" : "<div>" + _Page + "/" + last_page + "</div>";


                _HtmlDoc.GetElementById("pre_page").InnerHtml = (pre_page >= 1) ? string.Format(
                    @"<a onclick=""window.external.showTravel('{0}', '{1}',{2})""><img src=""{3}"" /></a>"
                    , GetTitle(), _Type, pre_page, prevPageIMG()) : "<a>&nbsp;</a>";
                _HtmlDoc.GetElementById("next_page").InnerHtml = (next_page <= last_page) ? string.Format(
                    @"<a onclick=""window.external.showTravel('{0}', '{1}', {2})""><img src=""{3}"" /></a>"
                    , GetTitle(), _Type, next_page, nextPageIMG()) : "<a>&nbsp;</a>";
            }
            catch (Exception e)
            {
                Console.WriteLine("catch a exception when calculate the nav menus: " + e);
            }
        }

        public virtual void PageTravelDetail(bool showprevnext = true)
        {
            _HtmlDoc = _KioskWebBrowser.Document;

            //开始倒计时 javascript 的功能
            //htmlDoc.InvokeScript("initRedirect");

            XmlDocument cnXml = getXmlDocument();
            XmlNode node;
            XmlNode preNode;
            XmlNode nextNode;

            //Get xml data
            node = cnXml.SelectSingleNode(GetItemNodesPath() + "[" + GetKeyNode() + "='" + _Id + "']");

            try
            {
                XMLDetailToHtml(node, _HtmlDoc);
            }
            catch (Exception e)
            {
                Console.WriteLine("Get some exception: " + e.ToString());
            }
            if (showprevnext)
            {
                //寻找纪录数据
                preNode = node.PreviousSibling;
                while (preNode != null && _Type != "All" && preNode.SelectSingleNode("Type").InnerText != _Type)
                {
                    preNode = preNode.PreviousSibling;
                }
                //纪录显示链接
                if (preNode != null)
                {
                    if (_HtmlDoc.GetElementById("prev") != null)
                        _HtmlDoc.GetElementById("prev").InnerHtml = string.Format(
                            @"<a onclick=""window.external.showTravelDetail('{0}', '{1}')""><img src=""{2}"" /></a>"
                            , GetTitleDetail()
                            , preNode.SelectSingleNode("Id").InnerText
                            , prevDetailIMG());
                    if (_HtmlDoc.GetElementById("prev_name") != null)
                        _HtmlDoc.GetElementById("prev_name").InnerHtml = @"<a>" + preNode.SelectSingleNode("Name").InnerText + "</a>";
                }
                //寻找下一个记录数据
                nextNode = node.NextSibling;
                while (nextNode != null && _Type != "All" && nextNode.SelectSingleNode("Type").InnerText != _Type)
                {
                    nextNode = nextNode.NextSibling;
                }
                //下一个记录显示链接
                if (nextNode != null)
                {
                    if (_HtmlDoc.GetElementById("next") != null)
                        _HtmlDoc.GetElementById("next").InnerHtml = String.Format(
                            @"<a onclick=""window.external.showTravelDetail('{0}', '{1}')""><img src=""{2}"" /></a>"
                            , GetTitleDetail()
                            , nextNode.SelectSingleNode("Id").InnerText
                            , nextDetailIMG()
                            );
                    if (_HtmlDoc.GetElementById("next_name") != null)
                        _HtmlDoc.GetElementById("next_name").InnerHtml = @"<a>" + nextNode.SelectSingleNode("Name").InnerText + "</a>";
                }
            }
            HtmlElement backelem = _HtmlDoc.GetElementById("back_url");
            if (backelem != null)
                backelem.InnerHtml = "<a href=\"" + GetFileName() + "\"><img src=\"" + backDetailIMG() + "\" /></a>";
        }


        #endregion --- Virtual Functions End ---

        #region --- Static Functions Begin ---

        /// <summary>
        /// 设置页面对象
        /// </summary>
        /// <param name="wb"></param>
        public static void SetWebBrowser(KioskWebBrowser wb)
        {
            _KioskWebBrowser = wb;
        }

        #endregion --- Static Functions End ---


    }

}
