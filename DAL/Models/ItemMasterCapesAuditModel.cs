using System;

namespace DAL.Models
{
    public partial class ItemMasterCapesAuditModel
    {
        public long AuditItemMasterCapesId { get; set; }
        public long ItemMasterCapesId { get; set; }
        public long ItemMasterId { get; set; }
        public string partNo { get; set; }
        public string capabilityType { get; set; }
        public bool? isVerified { get; set; }
        public string verifiedBy { get; set; }
        public DateTime? verifiedDate { get; set; }
        public string memo { get; set; }
        public string company { get; set; }
        public string pnDiscription { get; set; }
        public DateTime createdDate { get; set; }
        public bool isActive { get; set; }
        public long ManagementStrId { get; set; }
        public string level1 { get; set; }
        public string level2 { get; set; }
        public string level3 { get; set; }
        public string level4 { get; set; }

        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
