using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class VendorContactATAMappingAudit
    {
        [Key]
        public long AuditVendorContactATAMappingId { get; set; }
        public long VendorContactATAMappingId { get; set; }
        public long VendorId { get; set; }
        public long VendorContactId { get; set; }
        public long ATAChapterId { get; set; }
        public long ATASubChapterId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsDeleted { get; set; }
        public bool IsActive { get; set; }
    }
}
