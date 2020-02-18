using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class ItemMasterCapesFilters
    {
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
        public int TotalRecords { get; set; }
        public long? verifiedById { get; set; }
        public int? capabilityTypeId { get; set; }

        public long levelId1 { get; set; }
        public long levelId2 { get; set; }
        public long levelId3 { get; set; }
        public long levelId4 { get; set; }
    }
}
