using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
   public class CertificationType
    {
        [Key]
        public long? CertificationTypeId { get; set; }

        public string CertificationName { get; set; }

       // [ForeignKey("MasterCompanyId")]
        public long? MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

       // public virtual MasterCompany MasterCompany { get; set; }
    }
}
