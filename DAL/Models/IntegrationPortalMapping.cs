using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class IntegrationPortalMapping
    {
        [Key]
        public long IntegrationPortalMappingId { get; set; }
        public int ModuleId { get; set; }
        public long ReferenceId { get; set; }
        public long IntegrationPortalId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
