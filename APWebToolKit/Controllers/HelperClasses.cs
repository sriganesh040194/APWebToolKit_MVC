using System;

namespace APWebToolKit.Controllers
{
    public static class HelperClasses
    {

        public static string getMonthName(int month)
        {
            return Enum.GetName(typeof(Month), month);
        }

        public enum Month
        {
            Jan = 1,
            Feb,
            Mar,
            Apr,
            May,
            Jun,
            Jul,
            Aug,
            Sep,
            Oct,
            Nov,
            Dec
        }

    }

    
}
