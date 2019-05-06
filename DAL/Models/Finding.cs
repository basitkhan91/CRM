using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Finding : PasBase, IAudit
    {
        [Key]
        public long FindingId { get; set; }

        public string FindingCode { get; set; }

        public string Description { get; set; }

        public string Memo { get; set; }
        //public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public bool? IsDelete { get; set; }

    }
}
