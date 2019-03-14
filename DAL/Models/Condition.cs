using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Condition:PasBase
    {
        public long ConditionId { get; set; }

        public string Description { get; set; }
        public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
