using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class PublicationTypeAudit
    {
        [Key]
        public long PublicationTypeAuditId { get; set; }
        public long PublicationTypeId { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public int MasterCompanyId { get; set; }
    }
}
