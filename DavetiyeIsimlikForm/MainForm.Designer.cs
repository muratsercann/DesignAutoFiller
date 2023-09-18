namespace DavetiyeIsimlikForm
{
    partial class MainForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            splitter1 = new Splitter();
            btnSettings = new Button();
            txtNameList = new TextBox();
            btnOpenInBrowser = new Button();
            btn_Create = new Button();
            lbl_isimListesi = new Label();
            btnGoToWebSite = new Button();
            txtUrl = new TextBox();
            webView = new Microsoft.Web.WebView2.WinForms.WebView2();
            label1 = new Label();
            label2 = new Label();
            lblTotalNumber = new Label();
            ((System.ComponentModel.ISupportInitialize)webView).BeginInit();
            SuspendLayout();
            // 
            // splitter1
            // 
            splitter1.Location = new Point(0, 0);
            splitter1.Name = "splitter1";
            splitter1.Size = new Size(3, 549);
            splitter1.TabIndex = 4;
            splitter1.TabStop = false;
            // 
            // btnSettings
            // 
            btnSettings.Location = new Point(220, 100);
            btnSettings.Name = "btnSettings";
            btnSettings.Size = new Size(119, 23);
            btnSettings.TabIndex = 10;
            btnSettings.Text = "Ayarlar";
            btnSettings.UseVisualStyleBackColor = true;
            btnSettings.Click += btnSettings_Click;
            // 
            // txtNameList
            // 
            txtNameList.Location = new Point(9, 39);
            txtNameList.Multiline = true;
            txtNameList.Name = "txtNameList";
            txtNameList.ScrollBars = ScrollBars.Both;
            txtNameList.Size = new Size(194, 471);
            txtNameList.TabIndex = 3;
            txtNameList.WordWrap = false;
            // 
            // btnOpenInBrowser
            // 
            btnOpenInBrowser.Location = new Point(219, 67);
            btnOpenInBrowser.Name = "btnOpenInBrowser";
            btnOpenInBrowser.Size = new Size(120, 27);
            btnOpenInBrowser.TabIndex = 5;
            btnOpenInBrowser.Text = "Tarayıcıda Göster";
            btnOpenInBrowser.UseVisualStyleBackColor = true;
            btnOpenInBrowser.Click += btnOpenInBrowser_Click;
            // 
            // btn_Create
            // 
            btn_Create.Location = new Point(219, 38);
            btn_Create.Name = "btn_Create";
            btn_Create.Size = new Size(120, 23);
            btn_Create.TabIndex = 2;
            btn_Create.Text = "Oluştur";
            btn_Create.UseVisualStyleBackColor = true;
            btn_Create.Click += btn_Create_Click;
            // 
            // lbl_isimListesi
            // 
            lbl_isimListesi.AutoSize = true;
            lbl_isimListesi.Location = new Point(9, 21);
            lbl_isimListesi.Name = "lbl_isimListesi";
            lbl_isimListesi.Size = new Size(116, 15);
            lbl_isimListesi.TabIndex = 1;
            lbl_isimListesi.Text = "İsim Listesini Giriniz :";
            // 
            // btnGoToWebSite
            // 
            btnGoToWebSite.Location = new Point(738, 37);
            btnGoToWebSite.Name = "btnGoToWebSite";
            btnGoToWebSite.Size = new Size(38, 23);
            btnGoToWebSite.TabIndex = 8;
            btnGoToWebSite.Text = "Git";
            btnGoToWebSite.UseVisualStyleBackColor = true;
            btnGoToWebSite.Click += btnGoToWebSite_Click;
            // 
            // txtUrl
            // 
            txtUrl.Location = new Point(376, 38);
            txtUrl.Name = "txtUrl";
            txtUrl.Size = new Size(356, 23);
            txtUrl.TabIndex = 7;
            txtUrl.Enter += txtUrl_Enter;
            // 
            // webView
            // 
            webView.AllowExternalDrop = true;
            webView.CreationProperties = null;
            webView.DefaultBackgroundColor = Color.White;
            webView.Location = new Point(376, 67);
            webView.Name = "webView";
            webView.Size = new Size(779, 470);
            webView.TabIndex = 6;
            webView.UseWaitCursor = true;
            webView.ZoomFactor = 0.7D;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(1098, 42);
            label1.Name = "label1";
            label1.Size = new Size(57, 15);
            label1.TabIndex = 11;
            label1.Text = "Önizleme";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(9, 522);
            label2.Name = "label2";
            label2.Size = new Size(75, 15);
            label2.TabIndex = 12;
            label2.Text = "Toplam kişi : ";
            // 
            // lblTotalNumber
            // 
            lblTotalNumber.AutoSize = true;
            lblTotalNumber.Location = new Point(87, 522);
            lblTotalNumber.Name = "lblTotalNumber";
            lblTotalNumber.Size = new Size(0, 15);
            lblTotalNumber.TabIndex = 13;
            // 
            // MainForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1167, 549);
            Controls.Add(lblTotalNumber);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(webView);
            Controls.Add(btnSettings);
            Controls.Add(txtUrl);
            Controls.Add(btnGoToWebSite);
            Controls.Add(splitter1);
            Controls.Add(txtNameList);
            Controls.Add(lbl_isimListesi);
            Controls.Add(btnOpenInBrowser);
            Controls.Add(btn_Create);
            Name = "MainForm";
            Text = "Davetiye İsimlik";
            ((System.ComponentModel.ISupportInitialize)webView).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        public Splitter splitter1;
        public TextBox txtNameList;
        public Button btnOpenInBrowser;
        public Button btn_Create;
        public Label lbl_isimListesi;
        public Button btnSettings;
        public Button btnGoToWebSite;
        public TextBox txtUrl;
        public Microsoft.Web.WebView2.WinForms.WebView2 webView;
        private Label label1;
        private Label label2;
        private Label lblTotalNumber;
    }
}