using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class GlobalSettingsInfo
    {
        public long CultureId { get; set; }
        public string DiscplayName { get; set; }
        public string CultureName { get; set; }
        public string CurrencyFormat { get; set; }
        public string NumberFormat { get; set; }
        public string DateFormat { get; set; }
        public string PercentFormat { get; set; }
        public string CreditLimtFormat { get; set; }
    }
}
