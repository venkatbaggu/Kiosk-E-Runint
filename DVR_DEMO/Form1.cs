using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using LeInfo.Kiosk.DVRAPI;

namespace DVR_DEMO
{
    public partial class Form1 : Form
    {

        private string url = @"http://www.hik-online.com/tlc888888/";
       // private string url = @"www.hik-online.com/adc333333";
        private string username = "admin";
        private string password = "a12345678";
        private DVR_API dvr_api = null;



        public Form1()
        {
            InitializeComponent();
            dvr_api = new DVR_API();

        }

        private void button1_Click(object sender, EventArgs e)
        {
            //TODO:马上链接
           
            dvr_api.InitSDK();
            bool bl = dvr_api.LoginDVR(url, username, password);
      
            this.textBox1.Text += dvr_api.msg+ Environment.NewLine;
            if (bl)
            {
          
                button1.Enabled = false;
                button2.Enabled = true;

                foreach (var item in dvr_api.ChannelInfoList)
                {
                    this.lv.Items.Add(new ListViewItem(new string[] { item.CameraName, item.CameraStatus }));//将通道添加到列表中 add the channel to the list
                }

            }
           
        }

        private void button2_Click(object sender, EventArgs e)
        {
            //TODO:断开链接
            bool bl = dvr_api.LogoutDVR();
            if (bl)
            {
                button1.Enabled = true;
                button2.Enabled = false;
                lv.Items.Clear();
                pb_video.Invalidate();
                dvr_api.Cleanup();
            }
        }

        private void lv_ItemSelectionChanged(object sender, ListViewItemSelectionChangedEventArgs e)
        {
            int iSelIndex = -1;
            //TODO:选中通道
            if (lv.SelectedItems.Count > 0)
            {
                iSelIndex = lv.SelectedItems[0].Index;  //当前选中的行
            }
            if (iSelIndex < 0)
            {
                return;
            }
            dvr_api.StopView();
            pb_video.Invalidate();
            dvr_api.ShowView(iSelIndex, pb_video.Handle);
            pb_video.Invalidate();


        }


    }
}
