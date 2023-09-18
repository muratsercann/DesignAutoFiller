using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DavetiyeIsimlikForm
{
    internal static class Business
    {
        public static void SaveSettings(Settings s)
        {
            string data = "var settingsData = {" +
                  "imageUrl:\"" + s.ImageUrl + "\"" +
                  ",headerText:\"" + s.HeaderText + "\""+
                  ",prefix:\"" + s.Prefix + "\""+
                  ",isPageNumberVisible:\"" + s.IsPageNumberVisible + "\"}";

            WriteToFile(data,MainForm.settingsPath);
        }

        public static bool WriteToFile(string content, string path)
        {
            bool result = false;
            try
            {
                StreamWriter sw = new StreamWriter(path);
                sw.Write(content);
                sw.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.Message);
            }
            finally
            {
                result = true;

            }
            
            return result;
        }
        
        public static string ReadFile(string path)
        {
            int counter = 0;
            string text = string.Empty;
            if (!File.Exists(path))
            {
                return string.Empty;
            }
            using (StreamReader file = new StreamReader(path))
            {

                string ln;
                // var a = ["","",""];
                while ((ln = file.ReadLine()) != null)
                {
                    text += ln;
                    counter++;
                }
                file.Close();

            }

            return text;
        }

        public static List<string> ConvertJsStringArrayToList(string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return new List<string>();
            }

            List<string> list = (str.Substring(str.IndexOf("=") + 1).Trim().Trim(new[] { '[', ']' }).Split(",").ToList());

            list = (from item in list
                                    select item.Trim('\"')).ToList<string>();


            return list;
        }

        public static string ConvertListToText(List<string> list)
        {
            if (list == null || list.Count == 0)
            {
                return string.Empty;
            }
            string result = string.Empty;

            foreach (string item in list)
            {
                result += item.ToUpper() + "\r\n";
            }

            return result;
        }

    }
}
