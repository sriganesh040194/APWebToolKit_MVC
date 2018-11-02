using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net;
using JetBrains.Annotations;
using System.Net.Mail;
using System.Net.Http;

namespace APWebToolKit.Controllers
{
    [Route("api/[controller]")]
    public class IrradianceController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private static string[] irradianceColumnName = new[] { "Fixed angle","Time, UTC", "G", "Gb", "Gd" };

        private string[] splitIrradianceString { get; set; }
        private string irradianceString { get; set; }
        
        public IEnumerable<Irradiance> ListOfIrradianceObj { get; set; }

        //[HttpGet("[action]/{lat}/{id2}/{id3}")]
        //public IEnumerable<Irradiance> GetIrradiance2(int lat, int id2, int id3)
        //{
        //    try
        //    {
        //        var aa = lat + id2 + id3;
        //        Console.WriteLine("done, working!!" + aa);
        //    }
        //    catch (Exception e)
        //    {

        //    }
        //    return new List<Irradiance>();
        //}

        [HttpPost("[action]/{obj}")]
        public string Hello(object obj)
        {
            try
            {
                var message = new MailMessage();

                Console.WriteLine("hello" +obj);

            }catch(Exception e)
            {

            }
            return "heeeeee";        }


        [HttpGet("[action]/{obj}")]
        public double TotalYearlyEnergyProduced(IEnumerable<object> obj)
        {
            double total =0;
            try
            {
                ListOfIrradianceObj.Select(a => total += a.EmAxis);
                
            }catch(Exception e)
            {
                Console.WriteLine("TotalEnergyProduced: Some error occured. Error----->  " +e);
                return -1;
            }

            return total;
        }


        [HttpGet("[action]/{lat}/{lon}/{peek}")]
        public IEnumerable<Irradiance> GetIrradiance(float lat, float lon, int peek)
        {
            try
            {
                //String uri = "http://re.jrc.ec.europa.eu/pvgis5/DRcalc.php?lat=52&lon=6&month=1&global=1";
                string uri = "http://re.jrc.ec.europa.eu/pvgis5/PVcalc.php?lat=" + lat + "&lon=" + lon + "&peakpower=" + peek+"&loss=14&angle=10";


                WebRequest request = WebRequest.Create(uri);
                //request.Method = "GET";
                WebResponse response = request.GetResponse();
                Stream responseStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(responseStream);
                // Read the content.  
                string responseFromServer = reader.ReadToEnd();

                irradianceString = responseFromServer;
                ListOfIrradianceObj= GetIrradianceChartObject();
                return ListOfIrradianceObj;

            }
            catch (Exception e)
            {
                Console.WriteLine("Sorry some error occured. Error = " + e);
            }

            return null;

        }

        [HttpGet("[action]")]
        public List<Irradiance> GetIrradianceChartObject()
        {
            //GetIrradiance();

            SplitIrradiaceString(irradianceString, irradianceColumnName);
            return SortIrradiaceString(irradianceColumnName);

        }

        public void SplitIrradiaceString(string irradianceString, string[] irradianceColumnName)
        {
            splitIrradianceString = irradianceString.Split(irradianceColumnName.First())[1].Split("\r\n");
        }


        /// <summary>
        /// This is not the best way to do it, mainly because its hard coded. Maybe try to generalize it when you have time 
        /// </summary
        /// <param name="irradianceColumnName"></param>
        /// <returns></returns>
        public List<Irradiance> SortIrradiaceString(string[] irradianceColumnName)
        {
            if (splitIrradianceString == null) return null;

            var irradiancesObjList = new List<Irradiance>();
            foreach (string row in splitIrradianceString)
            {
                var splitRowString = row.Split('\t');
                //For now i know that there is only going to be 7 elements in the array.
                if (splitRowString.Count() < 11) continue;
                var IrradianceObj = new Irradiance();
                
                try
                {
                    IrradianceObj.MonthAxis = HelperClasses.getMonthName(Convert.ToInt32(splitRowString[0]));
                    IrradianceObj.EdAxis = Convert.ToDouble(splitRowString[2].ToString());
                    IrradianceObj.EmAxis = Convert.ToDouble(splitRowString[4].ToString());
                }
                catch (Exception e)
                {
                    continue;
                }

                irradiancesObjList.Add(IrradianceObj);
            }
            return irradiancesObjList;
        }



        public class Irradiance
        {
            public string MonthAxis { get; set; }
            public double EdAxis { set; get; }
            public double EmAxis { set; get; }
        }

        //Method for getting monthly irradiance maybe useful later

        //        var irradiancesObjList = new List<Irradiance>();
        //            foreach (string row in splitIrradianceString)
        //            {
        //                var splitRowString = row.Split('\t');
        //                //For now i know that there is only going to be 7 elements in the array.
        //                if (splitRowString.Count() < 7) continue;
        //                var IrradianceObj = new Irradiance();
        //        IrradianceObj.TimeAxis = splitRowString[0].ToString();
        //                try
        //                {
        //                    IrradianceObj.GAxis = Convert.ToInt32(splitRowString[2].ToString());
        //                    IrradianceObj.GbAxis = Convert.ToInt32(splitRowString[4].ToString());
        //                    IrradianceObj.GdAxis = Convert.ToInt32(splitRowString[6].ToString());
        //                }
        //                catch (Exception e)
        //                {
        //                    continue;
        //                }

        //irradiancesObjList.Add(IrradianceObj);
        //            }
        //            return irradiancesObjList;



            // Class for Monthly data
        //public string IrradianceString { get; set; }
        //public string TimeAxis { get; set; }
        //public string MonthAxis { get; set; }
        //public int GAxis { set; get; }
        //public int GbAxis { set; get; }
        //public int GdAxis { set; get; }

        public IActionResult Index()
        {
            return View();
        }
    }
}