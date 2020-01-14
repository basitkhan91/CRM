﻿using System;
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
        public int TotalRecords { get; set; }
    }
}
