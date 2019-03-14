using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class JournalApprovals : PasBase
    {
        public long ConditionId { get; set; }
       

        public string Description { get; set; }

        public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }


        public virtual MasterCompany MasterCompany { get; set; }


    }
}
