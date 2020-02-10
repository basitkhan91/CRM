using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class GlobalSettings
    {
        [Key]
        public long GlobalSettingId { get; set; }
        public int CompanyId { get; set; }
        public long CultureId { get; set; }
        public string CurrencyFormat { get; set; }
        public string NumberFormat { get; set; }
        public string DateFormat { get; set; }
        public string PercentFormat { get; set; }
        public string CreditLimtFormat { get; set; }
        public string CultureName { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

    }
}
