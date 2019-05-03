using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class CreditTermsAudit:PasBase
    {
        [Key]
        public Int16 CreditTermsAuditId { get; set; }

        public Int16 CreditTermsId { get; set; }

        public string Name { get; set; }
        public string Memo { get; set; }

        public byte Percentage { get; set; }

        public byte Days { get; set; }

        public byte NetDays { get; set; }
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
