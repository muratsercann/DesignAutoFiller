namespace DavetiyeIsimlikForm
{
    partial class SettingsForm
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
            txtImageLink = new TextBox();
            label1 = new Label();
            btnSave = new Button();
            label2 = new Label();
            txtHeaderText = new TextBox();
            txtPrefix = new TextBox();
            label3 = new Label();
            cb_IsNumberVisible = new CheckBox();
            btnUndo = new Button();
            SuspendLayout();
            // 
            // txtImageLink
            // 
            txtImageLink.Location = new Point(117, 25);
            txtImageLink.Name = "txtImageLink";
            txtImageLink.Size = new Size(377, 23);
            txtImageLink.TabIndex = 0;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(11, 28);
            label1.Name = "label1";
            label1.Size = new Size(72, 15);
            label1.TabIndex = 1;
            label1.Text = "Resim URL : ";
            // 
            // btnSave
            // 
            btnSave.Location = new Point(372, 186);
            btnSave.Name = "btnSave";
            btnSave.Size = new Size(122, 23);
            btnSave.TabIndex = 2;
            btnSave.Text = "Tamam";
            btnSave.UseVisualStyleBackColor = true;
            btnSave.Click += btnSave_Click;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(11, 63);
            label2.Name = "label2";
            label2.Size = new Size(37, 15);
            label2.TabIndex = 3;
            label2.Text = "Başlık";
            // 
            // txtHeaderText
            // 
            txtHeaderText.Location = new Point(117, 60);
            txtHeaderText.Name = "txtHeaderText";
            txtHeaderText.Size = new Size(377, 23);
            txtHeaderText.TabIndex = 4;
            // 
            // txtPrefix
            // 
            txtPrefix.Location = new Point(117, 98);
            txtPrefix.Name = "txtPrefix";
            txtPrefix.Size = new Size(377, 23);
            txtPrefix.TabIndex = 5;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(11, 101);
            label3.Name = "label3";
            label3.Size = new Size(38, 15);
            label3.TabIndex = 6;
            label3.Text = "Ön Ek";
            // 
            // cb_IsNumberVisible
            // 
            cb_IsNumberVisible.AutoSize = true;
            cb_IsNumberVisible.Location = new Point(118, 136);
            cb_IsNumberVisible.Name = "cb_IsNumberVisible";
            cb_IsNumberVisible.Size = new Size(162, 19);
            cb_IsNumberVisible.TabIndex = 8;
            cb_IsNumberVisible.Text = "Sıra numaraları gösterilsin";
            cb_IsNumberVisible.UseVisualStyleBackColor = true;
            // 
            // btnUndo
            // 
            btnUndo.Enabled = false;
            btnUndo.Location = new Point(12, 186);
            btnUndo.Name = "btnUndo";
            btnUndo.Size = new Size(75, 23);
            btnUndo.TabIndex = 9;
            btnUndo.Text = "Geri Al";
            btnUndo.UseVisualStyleBackColor = true;
            btnUndo.Click += btnUndo_Click;
            // 
            // SettingsForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(501, 221);
            Controls.Add(btnUndo);
            Controls.Add(cb_IsNumberVisible);
            Controls.Add(label3);
            Controls.Add(txtPrefix);
            Controls.Add(txtHeaderText);
            Controls.Add(label2);
            Controls.Add(btnSave);
            Controls.Add(label1);
            Controls.Add(txtImageLink);
            Name = "SettingsForm";
            Text = "SettingsForm";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox txtImageLink;
        private Label label1;
        private Button btnSave;
        private Label label2;
        private TextBox txtHeaderText;
        private TextBox txtPrefix;
        private Label label3;
        private CheckBox cb_IsNumberVisible;
        private Button btnUndo;
    }
}