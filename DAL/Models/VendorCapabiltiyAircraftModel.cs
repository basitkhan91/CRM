using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace DAL.Models
{
    public class VendorCapabiltiyAircraftModel
    {
        [Key]
        public long VendorCapabilityAircraftModelId { get; set; }

        public long VendorCapabilityId { get; set; }

        public long AircraftModelId { get; set; }

        public Int32? DashNumber { get; set; }

        public Int32? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? isSelected { get; set; }

        public bool? IsDelete { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
