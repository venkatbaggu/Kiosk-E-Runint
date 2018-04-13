using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LeInfo.Kiosk.yirunKiosk
{
    /// <summary>
    /// 加载数据等待界面
    /// </summary>
    public class LoadingForm
    {
        /// <summary>
        /// 加载数据是等待界面
        /// </summary>
        private Form _LoadingForm = new Form();

        /// <summary>
        /// 加载数据等待界面的显示图片容器
        /// </summary>
        private PictureBox _picBox = new PictureBox();

        /// <summary>
        /// 调用的主窗口
        /// </summary>
        private Form _ParentForm;


        public LoadingForm(Form parentForm)
        {
            _ParentForm = parentForm;
            this._LoadingForm.WindowState = FormWindowState.Maximized;
            this._LoadingForm.FormBorderStyle = FormBorderStyle.None;
            this._LoadingForm.BackColor = Color.Black;
            this._LoadingForm.Opacity = 0.9;
            this._LoadingForm.Controls.Add(this._picBox);
            this._LoadingForm.ShowInTaskbar = false;
            this._picBox.SizeMode = PictureBoxSizeMode.CenterImage;
            this._picBox.Location = new System.Drawing.Point(Screen.PrimaryScreen.Bounds.Width / 2 - 80, Screen.PrimaryScreen.Bounds.Height / 2 - 80);
            this._picBox.Size = new Size(168, 168);
            this._picBox.Image = Properties.Resources.loading1;

        }


        /// <summary>
        /// 显示加载数据等待界面
        /// </summary>
        public void ShowLoadingForm()
        {

            if (_LoadingForm == null) return;
            _ParentForm.TopMost = false;
            _LoadingForm.Show();
            _LoadingForm.TopMost = true;
        }

        /// <summary>
        /// 隐藏加载数据等待界面
        /// </summary>
        public void CloseLoadingForm()
        {
            if (_LoadingForm == null) return;
            _LoadingForm.Hide();
            _LoadingForm.TopMost = false;
            _ParentForm.TopMost = true;
        }

    }
}
