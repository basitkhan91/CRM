﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class VendorCapabilityType
    {
        public long VendorCapabilityTypeId { get; set; }

        public long VendorCapabilityId { get; set; }

        public Int32 CapabilityTypeId { get; set; }

        public Int32? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
