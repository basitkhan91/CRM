using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class TaxRatesAudit : PasBase
    {
        [Key]
        public long TaxRateAuditId { get; set; }
        public long TaxRateId { get; set; }
        public string TaxTypeId { get; set; }
        public string Memo { get; set; }
        public decimal TaxRate { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
