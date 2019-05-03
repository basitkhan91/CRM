using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class CurrencyAudit:PasBase
    {
        [Key]
        public Int32 CurrencyAuditId { get; set; }

        public Int32 CurrencyId { get; set; }

        public string Code { get; set; }

        public string Memo { get; set; }

        public string Symbol { get; set; }

        public string DisplayName { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }
    }
}
