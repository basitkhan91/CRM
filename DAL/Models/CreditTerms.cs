using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
   public class CreditTerms:PasBase,IAudit
    {
        [Key]
        public Int16 CreditTermsId { get; set; }

        public string Name { get; set; }
       

        public decimal Percentage { get; set; }

        public byte Days { get; set; }

        public byte NetDays { get; set; }
        public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
        public bool? IsDeleted { get; set; }



    }

}
