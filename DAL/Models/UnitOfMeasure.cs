using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class UnitOfMeasure : PasBase, IAudit
    {
        [Key]
        public long UnitOfMeasureId { get; set; }

        public string Description { get; set; }

        public string ShortName { get; set; }
        public string Memo { get; set; }


        public string Standard { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
        public bool? IsDelete { get; set; }
        [NotMapped]
        public string UploadStatus { get; set; }
    }
}
