using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.DataFormats;

namespace DavetiyeIsimlikForm
{
    public partial class SettingsForm : Form
    {
        private MainForm mainForm;
        public SettingsForm()
        {
            InitializeComponent();
        }

        public SettingsForm(MainForm f)
        {
            InitializeComponent();
            mainForm = f;
            setSettingsValuesOnForm();

        }

        private void setSettingsValuesOnForm()
        {
            if (mainForm == null)
            {
                MessageBox.Show("mainForm is null");
                return;
            }
            if (mainForm.settings.ImageUrl != null)
            {
                txtImageLink.Text = mainForm.settings.ImageUrl;
            }
            if (mainForm.settings.HeaderText != null)
            {
                txtHeaderText.Text = mainForm.settings.HeaderText;
            }
            if (mainForm.settings.Prefix != null)
            {
                txtPrefix.Text = mainForm.settings.Prefix;
            }
            cb_IsNumberVisible.Checked = mainForm.settings.IsPageNumberVisible;

        }



        private void Save()
        {
            mainForm.pastSettings.ImageUrl = mainForm.settings.ImageUrl;
            mainForm.pastSettings.HeaderText = mainForm.settings.HeaderText;
            mainForm.pastSettings.Prefix = mainForm.settings.Prefix;
            mainForm.pastSettings.IsPageNumberVisible = mainForm.settings.IsPageNumberVisible;

            if (!string.IsNullOrEmpty(txtImageLink.Text))
            {
                mainForm.settings.ImageUrl = txtImageLink.Text;
            }

            if (!string.IsNullOrEmpty(txtHeaderText.Text))
            {
                mainForm.settings.HeaderText = txtHeaderText.Text;
            }

            if (!string.IsNullOrEmpty(txtPrefix.Text))
            {
                mainForm.settings.Prefix = txtPrefix.Text;
            }

            mainForm.settings.IsPageNumberVisible = cb_IsNumberVisible.Checked;

        }

        private void UnDoChanges()
        {
            mainForm.settings.ImageUrl = mainForm.pastSettings.ImageUrl;
            mainForm.settings.HeaderText = mainForm.pastSettings.HeaderText;
            mainForm.settings.IsPageNumberVisible = mainForm.pastSettings.IsPageNumberVisible;
            mainForm.settings.Prefix = mainForm.pastSettings.Prefix;

            setSettingsValuesOnForm();
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            Save();
            btnUndo.Enabled = true;

            if (mainForm.webView.Source != null)
            {
                mainForm.webView.Reload();
            }
        }

        private void btnUndo_Click(object sender, EventArgs e)
        {
            UnDoChanges();
            btnUndo.Enabled = false;
            if (mainForm.webView.Source != null)
            {
                mainForm.webView.Reload();
            }
        }


    }
}
