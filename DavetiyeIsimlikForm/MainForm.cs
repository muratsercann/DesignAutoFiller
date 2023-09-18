using Newtonsoft.Json.Linq;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Text.Json.Nodes;
using Newtonsoft.Json.Linq;
namespace DavetiyeIsimlikForm
{
    public partial class MainForm : Form
    {
        public const string browserTarget = @"C:\Program Files\Google\Chrome\Application\chrome.exe";
        public static string textPath = Application.StartupPath + "Web_Davetiye›simlik\\davetliler.txt";
        public static string dataPath = Application.StartupPath + "Web_Davetiye›simlik\\data.js";
        public static string settingsPath = Application.StartupPath + "Web_Davetiye›simlik\\settingsData.js";
        public static string settingsTempPath = Application.StartupPath + "Web_Davetiye›simlik\\settingsTempData.js";
        public static string htmlpageUrl = Application.StartupPath + "Web_Davetiye›simlik\\Davetiye›simlik.html";
        public Settings settings = new Settings();
        public Settings pastSettings = new Settings();
        public Settings defaultSettings = new Settings();

        public MainForm()
        {
            InitializeComponent();

            FillFormControls();
            Preview();
            createSettingsObj();
        }

        private void FillFormControls()
        {
            txtUrl.Text = Path.GetFullPath(htmlpageUrl);
            string strNames = Business.ReadFile(dataPath);
            List<string> list = Business.ConvertJsStringArrayToList(strNames);
            lblTotalNumber.Text = list.Count().ToString();
            strNames = Business.ConvertListToText(list);
            txtNameList.Text = strNames;
        }

        private void createSettingsObj()
        {
            string strSettings = Business.ReadFile(settingsPath);
            strSettings = strSettings.Substring((strSettings.IndexOf('=') + 1), strSettings.Length - strSettings.IndexOf('=') - 1);
            JObject jsonSettings = JObject.Parse(strSettings);
            if (jsonSettings["imageUrl"] != null)
            {
                settings.ImageUrl = jsonSettings["imageUrl"].ToString();
            }
            if (jsonSettings["headerText"] != null)
            {
                settings.HeaderText = jsonSettings["headerText"].ToString();
            }
            if (jsonSettings["prefix"] != null)
            {
                settings.Prefix = jsonSettings["prefix"].ToString();
            }
            if (jsonSettings["isPageNumberVisible"] != null)
            {
                settings.IsPageNumberVisible = Convert.ToBoolean(jsonSettings["isPageNumberVisible"].ToString());
            }
        }


        private void btn_Create_Click(object sender, EventArgs e)
        {
            string txt = txtNameList.Text;
            List<string> listNames = new List<string>();
            if (!string.IsNullOrEmpty(txt))
            {
                listNames = txt.Split("\n").ToList();
            }

            string formattedText = createFormattedText(listNames);
            Business.WriteToFile(txt, textPath);
            Business.WriteToFile(formattedText, dataPath);

            //Form ¸zerindeki isim listesini yenile
            FillFormControls();

            if (webView.Source != null)
            {
                webView.Reload();
            }


        }

        public string createFormattedText(List<string> list)
        {
            string formattedText = "var names = [";

            foreach (string item in list)
            {
                formattedText += "\"" + item.Trim().ToUpper() + "\",";
            }
            formattedText = formattedText.TrimEnd(',');
            formattedText += "]";
            return formattedText;
        }



        public static void OpenInBrowser(string webTarget)
        {
            if (string.IsNullOrEmpty(webTarget))
            {
                return;
            }

            var prs = new ProcessStartInfo(browserTarget);
            prs.Arguments = "\"" + webTarget + "\"";

            try
            {
                Process.Start(prs);
            }
            catch (System.ComponentModel.Win32Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private void btnOpenInBrowser_Click(object sender, EventArgs e)
        {
            string path = Path.GetFullPath(htmlpageUrl);
            OpenInBrowser(path);
        }

        private void Preview()
        {
            if (string.IsNullOrEmpty(txtUrl.Text))
            {
                return;
            }
            try
            {
                Uri u = new Uri(txtUrl.Text);
                if (webView.Source != null && webView.Source.AbsolutePath == u.AbsolutePath)
                {
                    webView.Reload();
                    return;
                }

                webView.Source = u;
            }
            catch (Exception)
            {
                MessageBox.Show("GeÁersiz adres !");
                return;
            }
            finally
            {

            }
        }

        private void btnGoToWebSite_Click(object sender, EventArgs e)
        {
            Preview();

        }

        private void txtUrl_Enter(object sender, EventArgs e)
        {
            Preview();
        }

        private void btnSettings_Click(object sender, EventArgs e)
        {
            SettingsForm settingsForm = new SettingsForm(this);
            settingsForm.Show();
        }

    }

}