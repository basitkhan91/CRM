using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Currency : PasBase
    {
        public Int32 CurrencyId { get; set; }

        public string Code { get; set; }

        public string Memo { get; set; }

        public string Symbol { get; set; }

        public string DisplayName { get; set; }

        // public Int32 MasterCompanyId { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }


        public virtual MasterCompany MasterCompany { get; set; }
        public bool? IsDelete { get; set; }


    }
}
