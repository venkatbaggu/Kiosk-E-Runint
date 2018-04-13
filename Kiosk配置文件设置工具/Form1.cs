using Leinfo.Kiosk.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Kiosk配置文件设置工具
{
    public partial class Form1 : Form
    {
        private Regex rx = new Regex("^[0-9]*$");
        public Form1()
        {
            InitializeComponent();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "88800003";
            this.textBox2.Text = "123456";
            this.textBox3.Text = "1.3.11";
            this.textBox4.Text = "120";
            this.textBox5.Text = "theme_default";
            this.textBox6.Text = "558";
            this.textBox7.Text = "270";


        }

        private void button1_Click(object sender, EventArgs e)
        {
            KioskInfo info = new KioskInfo();

            if (this.radioButton1.Checked)
            {
                info.ProcessName = "亿润联盟电商平台Kiosk系统";
            }
            else
            {
                info.ProcessName = "erunkiosk";
            }

            if (string.IsNullOrEmpty(this.textBox1.Text) || string.IsNullOrWhiteSpace(this.textBox1.Text))
            {
                MessageBox.Show("终端编号，不能为空"); return;
            }
            else
            {
                info.KioskNum = this.textBox1.Text;
            }

            if (string.IsNullOrEmpty(this.textBox2.Text) || string.IsNullOrWhiteSpace(this.textBox2.Text))
            {
                MessageBox.Show("退出密码，不能为空"); return;
            }
            else
            {
                info.KioskExitPaw = this.textBox2.Text;
            }

            if (string.IsNullOrEmpty(this.textBox3.Text) || string.IsNullOrWhiteSpace(this.textBox3.Text))
            {
                MessageBox.Show("当前版本，不能为空"); return;
            }
            else
            {
                var pawss = this.textBox3.Text.Split('.');
                if (pawss.Length != 3)
                {
                    MessageBox.Show("当前版本，格式必须为 1.1.1"); return;
                }

                if (rx.IsMatch(pawss[0]) && rx.IsMatch(pawss[1]) && rx.IsMatch(pawss[2]))
                {
                    info.CurrVer = this.textBox3.Text;
                }
                else
                {
                    MessageBox.Show("当前版本，格式必须为 1.1.1"); return;

                }
            }

            if (string.IsNullOrEmpty(this.textBox4.Text) || string.IsNullOrWhiteSpace(this.textBox4.Text))
            {
                MessageBox.Show("屏保时间，不能为空"); return;
            }
            else if (rx.IsMatch(this.textBox4.Text))
            {
                info.Extension.Add(new KeyValue()
                {
                    Key = "flag_ScreenForm",
                    Value = Int32.Parse(this.textBox4.Text)
                });
            }
            else
            {
                MessageBox.Show("屏保时间，格式必须为正整数数值"); return;
            }

            if (string.IsNullOrEmpty(this.textBox5.Text) || string.IsNullOrWhiteSpace(this.textBox5.Text))
            { }
            else
            {
                info.Extension.Add(new KeyValue()
                {
                    Key = "theme",
                    Value = this.textBox5.Text

                });
            }



            if (string.IsNullOrEmpty(this.textBox6.Text) || string.IsNullOrWhiteSpace(this.textBox6.Text))
            {
                MessageBox.Show("头部广告高度，不能为空"); return;
            }
            else if (rx.IsMatch(this.textBox6.Text))
            {
                info.KioskHeadAD = float.Parse(this.textBox6.Text);
            }
            else
            {
                MessageBox.Show("头部广告高度，格式必须为正整数数值"); return;
            }

            if (string.IsNullOrEmpty(this.textBox7.Text) || string.IsNullOrWhiteSpace(this.textBox7.Text))
            {
                MessageBox.Show("脚部广告高度，不能为空"); return;
            }
            else if (rx.IsMatch(this.textBox7.Text))
            {
                info.KioskBottomAD = float.Parse(this.textBox7.Text);
            }
            else
            {
                MessageBox.Show("脚部广告高度，格式必须为正整数数值"); return;
            }

            try
            {
                info.LastDate = DateTime.Now;
                info.LastVer = info.CurrVer;
                KioskInfo.Save(info);
            }
            catch (Exception)
            {

                MessageBox.Show("保存Kiosk配置文档失败!");
            }


        }

        private void Form1_Load(object sender, EventArgs e)
        {
            this.Text = "Kiosk配置文件设置工具 v" + Application.ProductVersion.ToString().Substring(0, Application.ProductVersion.ToString().LastIndexOf('.'));
        }
    }
}
