using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class ItemMasterCapesFilters
    {
        public long ItemMasterCapesId { get; set; }
        public string partNo { get; set; }
        public string capabilityType { get; set; }
        public string aircraftType { get; set; }
        public string aircraftModel { get; set; }
        public string aircraftDashNumber { get; set; }
        //public long ManagementStructureId { get; set; }
        public string description { get; set; }
        public string aTAChapter { get; set; }
        public string aTASubChapter { get; set; }
        public DateTime? entryDate { get; set; }
        public string cMM { get; set; }
        public string integrateWith { get; set; }
        public bool? isVerified { get; set; }
        public string verifiedBy { get; set; }
        public DateTime? verifiedDate { get; set; }
        public string memo { get; set; }
        public DateTime createdDate { get; set; }
        public bool isActive { get; set; }
        public int TotalRecords { get; set; }
    }
}
