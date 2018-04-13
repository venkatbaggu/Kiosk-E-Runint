namespace LeInfo.Kiosk.yirunKiosk
{
    partial class ScreenForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
          base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.kioskWebBrowser1 = new LeInfo.Kiosk.WebControls.KioskWebBrowser();
            this.SuspendLayout();
            // 
            // kioskWebBrowser1
            // 
            this.kioskWebBrowser1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.kioskWebBrowser1.Location = new System.Drawing.Point(0, 0);
            this.kioskWebBrowser1.MinimumSize = new System.Drawing.Size(20, 20);
            this.kioskWebBrowser1.Name = "kioskWebBrowser1";
            this.kioskWebBrowser1.ScrollBarsEnabled = false;
            this.kioskWebBrowser1.Size = new System.Drawing.Size(284, 261);
            this.kioskWebBrowser1.TabIndex = 0;
            this.kioskWebBrowser1.Url = new System.Uri("", System.UriKind.Relative);
            // 
            // ScreenForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(284, 261);
            this.Controls.Add(this.kioskWebBrowser1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "ScreenForm";
            this.Text = "ScreenForm";
            this.TopMost = true;
            this.WindowState = System.Windows.Forms.FormWindowState.Minimized;
            this.ResumeLayout(false);

        }

        #endregion

        public WebControls.KioskWebBrowser kioskWebBrowser1;
    }
}