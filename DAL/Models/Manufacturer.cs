using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Manufacturer : IAudit
    {
        [Key]
        public long ManufacturerId { get; set; }

        public string Name { get; set; }
        //public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }
        public string Comments { get; set; }
        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        [NotMapped]
        public string UploadStatus { get; set; }
    }
}

