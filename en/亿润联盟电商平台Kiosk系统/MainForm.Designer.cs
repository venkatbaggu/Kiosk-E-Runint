using System.Security.Permissions;

namespace LeInfo.Kiosk.yirunKiosk
{
    [PermissionSet(SecurityAction.Demand, Name = "FullTrust")]
    partial class MainForm
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.panel1 = new System.Windows.Forms.Panel();
            this.kwb_Ad_head = new LeInfo.Kiosk.WebControls.KioskWebBrowser();
            this.panel2 = new System.Windows.Forms.Panel();
            this.panel_DVR = new System.Windows.Forms.Panel();
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.panel4 = new System.Windows.Forms.Panel();
            this.pictureBox_DVR = new System.Windows.Forms.PictureBox();
            this.tableLayoutPanel4 = new System.Windows.Forms.TableLayoutPanel();
            this.panel6 = new System.Windows.Forms.Panel();
            this.button1 = new System.Windows.Forms.Button();
            this.panel_List = new System.Windows.Forms.FlowLayoutPanel();
            this.panel_Body_Kwb = new System.Windows.Forms.Panel();
            this.panel3 = new System.Windows.Forms.Panel();
            this.kwb_Ad_bottom = new LeInfo.Kiosk.WebControls.KioskWebBrowser();
            this.tableLayoutPanel1.SuspendLayout();
            this.panel1.SuspendLayout();
            this.panel2.SuspendLayout();
            this.panel_DVR.SuspendLayout();
            this.tableLayoutPanel2.SuspendLayout();
            this.panel4.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox_DVR)).BeginInit();
            this.tableLayoutPanel4.SuspendLayout();
            this.panel6.SuspendLayout();
            this.panel3.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.panel2, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.panel3, 0, 2);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(584, 361);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.kwb_Ad_head);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(3, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(578, 14);
            this.panel1.TabIndex = 0;
            // 
            // kwb_Ad_head
            // 
            this.kwb_Ad_head.Dock = System.Windows.Forms.DockStyle.Fill;
            this.kwb_Ad_head.Location = new System.Drawing.Point(0, 0);
            this.kwb_Ad_head.MinimumSize = new System.Drawing.Size(20, 20);
            this.kwb_Ad_head.Name = "kwb_Ad_head";
            this.kwb_Ad_head.Size = new System.Drawing.Size(578, 20);
            this.kwb_Ad_head.TabIndex = 0;
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.panel_DVR);
            this.panel2.Controls.Add(this.panel_Body_Kwb);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(3, 23);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(578, 315);
            this.panel2.TabIndex = 1;
            // 
            // panel_DVR
            // 
            this.panel_DVR.BackColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.panel_DVR.Controls.Add(this.tableLayoutPanel2);
            this.panel_DVR.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel_DVR.Location = new System.Drawing.Point(0, 0);
            this.panel_DVR.Name = "panel_DVR";
            this.panel_DVR.Size = new System.Drawing.Size(578, 315);
            this.panel_DVR.TabIndex = 2;
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.ColumnCount = 1;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel2.Controls.Add(this.panel4, 0, 0);
            this.tableLayoutPanel2.Controls.Add(this.tableLayoutPanel4, 0, 1);
            this.tableLayoutPanel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel2.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 2;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 150F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(578, 315);
            this.tableLayoutPanel2.TabIndex = 0;
            // 
            // panel4
            // 
            this.panel4.BackColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.panel4.Controls.Add(this.pictureBox_DVR);
            this.panel4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel4.Location = new System.Drawing.Point(3, 3);
            this.panel4.Name = "panel4";
            this.panel4.Size = new System.Drawing.Size(572, 159);
            this.panel4.TabIndex = 0;
            // 
            // pictureBox_DVR
            // 
            this.pictureBox_DVR.BackgroundImage = global::LeInfo.Kiosk.yirunKiosk.Properties.Resources.loading1;
            this.pictureBox_DVR.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.pictureBox_DVR.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pictureBox_DVR.Location = new System.Drawing.Point(0, 0);
            this.pictureBox_DVR.Name = "pictureBox_DVR";
            this.pictureBox_DVR.Size = new System.Drawing.Size(572, 159);
            this.pictureBox_DVR.TabIndex = 1;
            this.pictureBox_DVR.TabStop = false;
            // 
            // tableLayoutPanel4
            // 
            this.tableLayoutPanel4.ColumnCount = 2;
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 200F));
            this.tableLayoutPanel4.Controls.Add(this.panel6, 1, 0);
            this.tableLayoutPanel4.Controls.Add(this.panel_List, 0, 0);
            this.tableLayoutPanel4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel4.Location = new System.Drawing.Point(3, 168);
            this.tableLayoutPanel4.Name = "tableLayoutPanel4";
            this.tableLayoutPanel4.RowCount = 1;
            this.tableLayoutPanel4.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel4.Size = new System.Drawing.Size(572, 144);
            this.tableLayoutPanel4.TabIndex = 2;
            // 
            // panel6
            // 
            this.panel6.BackColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.panel6.Controls.Add(this.button1);
            this.panel6.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel6.Location = new System.Drawing.Point(375, 3);
            this.panel6.Name = "panel6";
            this.panel6.Size = new System.Drawing.Size(194, 138);
            this.panel6.TabIndex = 2;
            // 
            // button1
            // 
            this.button1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.button1.Font = new System.Drawing.Font("宋体", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.button1.Location = new System.Drawing.Point(0, 0);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(194, 138);
            this.button1.TabIndex = 2;
            this.button1.Text = "Exit DVR";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // panel_List
            // 
            this.panel_List.AutoScroll = true;
            this.panel_List.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel_List.Location = new System.Drawing.Point(3, 3);
            this.panel_List.Name = "panel_List";
            this.panel_List.Size = new System.Drawing.Size(366, 138);
            this.panel_List.TabIndex = 3;
            // 
            // panel_Body_Kwb
            // 
            this.panel_Body_Kwb.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel_Body_Kwb.Location = new System.Drawing.Point(0, 0);
            this.panel_Body_Kwb.Name = "panel_Body_Kwb";
            this.panel_Body_Kwb.Size = new System.Drawing.Size(578, 315);
            this.panel_Body_Kwb.TabIndex = 1;
            // 
            // panel3
            // 
            this.panel3.Controls.Add(this.kwb_Ad_bottom);
            this.panel3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel3.Location = new System.Drawing.Point(3, 344);
            this.panel3.Name = "panel3";
            this.panel3.Size = new System.Drawing.Size(578, 14);
            this.panel3.TabIndex = 2;
            // 
            // kwb_Ad_bottom
            // 
            this.kwb_Ad_bottom.Dock = System.Windows.Forms.DockStyle.Fill;
            this.kwb_Ad_bottom.Location = new System.Drawing.Point(0, 0);
            this.kwb_Ad_bottom.MinimumSize = new System.Drawing.Size(20, 20);
            this.kwb_Ad_bottom.Name = "kwb_Ad_bottom";
            this.kwb_Ad_bottom.Size = new System.Drawing.Size(578, 20);
            this.kwb_Ad_bottom.TabIndex = 0;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Black;
            this.ClientSize = new System.Drawing.Size(584, 361);
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "MainForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "亿润联盟电商平台Kiosk系统";
            this.tableLayoutPanel1.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.panel2.ResumeLayout(false);
            this.panel_DVR.ResumeLayout(false);
            this.tableLayoutPanel2.ResumeLayout(false);
            this.panel4.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox_DVR)).EndInit();
            this.tableLayoutPanel4.ResumeLayout(false);
            this.panel6.ResumeLayout(false);
            this.panel3.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Panel panel3;
        private WebControls.KioskWebBrowser kwb_Ad_head;
        private WebControls.KioskWebBrowser kwb_Ad_bottom;
       
        private System.Windows.Forms.Panel panel_Body_Kwb;
        private System.Windows.Forms.Panel panel_DVR;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel2;
        private System.Windows.Forms.Panel panel4;
        private System.Windows.Forms.PictureBox pictureBox_DVR;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel4;
        private System.Windows.Forms.Panel panel6;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.FlowLayoutPanel panel_List;
    }
}

