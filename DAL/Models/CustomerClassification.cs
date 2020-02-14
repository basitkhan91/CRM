using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class CustomerClassification : PasBase, IAudit
    {
        [Key]
        public long CustomerClassificationId { get; set; }

        public string Description { get; set; }
        public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool IsActive { get; set; } = true;

        public virtual MasterCompany MasterCompany { get; set; }
        //public virtual Customer Customer { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
