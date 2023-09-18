using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DavetiyeIsimlikForm
{
    public class Settings
    {
        private string imageUrl = string.Empty;
        private string headerText = string.Empty;
        private string prefix = string.Empty;
        private bool isPageNumberVisible = false;
        private int columnNumber;

        public static void Save(Settings s)
        {
            Business.SaveSettings(s);

        }
        public string ImageUrl
        {
            get { return  imageUrl; }

            set { 
                imageUrl = value;
                Settings.Save(this);
            }
        }

        public string HeaderText
        {
            get { return headerText; }

            set
            {
                headerText = value;
                Settings.Save(this);
            }
        }

        public string Prefix
        {
            get { return prefix; }

            set
            {
                prefix = value;
                Settings.Save(this);
            }
        }

        public bool IsPageNumberVisible
        {
            get { return isPageNumberVisible; }

            set
            {
                isPageNumberVisible = value;
                Business.SaveSettings(this);
            }
        }
    }
}
