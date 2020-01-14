using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class ItemMasterDataFilters
    {
        public long? ItemMasterId { get; set; }
        public long ManagementStrId { get; set; }
        public string partNo { get; set; }
        public string partDescription { get; set; }
        public string manufacturer { get; set; }
        public string aircraft { get; set; }
        public string model { get; set; }
        public string dashNumber { get; set; }
        public string aTAChapter { get; set; }
        public string aTASubChapter { get; set; }
        public string capabilityType { get; set; }
        public string level1 { get; set; }
        public string level2 { get; set; }
        public string level3 { get; set; }
        public string level4 { get; set; }
        public string publication { get; set; }
        public string integrationPortal { get; set; }
        public DateTime createdDate { get; set; }
        public int TotalRecords { get; set; }
    }
}
