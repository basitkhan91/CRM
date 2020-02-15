using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class ItemMasterCapesAudit
    {
        [Key]
        public long AuditItemMasterCapesId { get; set; }
        public long ItemMasterCapesId { get; set; }
        public long ItemMasterId { get; set; }
        public int CapabilityTypeId { get; set; }
        public long ManagementStructureId { get; set; }
        public bool? IsVerified { get; set; }
        public long? VerifiedById { get; set; }
        public DateTime? VerifiedDate { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
