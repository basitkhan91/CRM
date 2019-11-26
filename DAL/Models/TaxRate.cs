using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace DAL.Models
{
   public class TaxRates : PasBase,IAudit
    {
        [Key]
        public long TaxRateId { get; set; }

        public string TaxTypeId { get; set; }
        public string Memo { get; set; }


        public decimal? TaxRate { get; set; }
 

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
