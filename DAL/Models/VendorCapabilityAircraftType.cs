using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class VendorCapabilityAircraftType 
    {
        [Key]
        public long VendorCapabilityAircraftTypeId { get; set; }
        public long VendorCapabilityId { get; set; }
        public int AircraftTypeId { get; set; }
        public int MasterCompanyId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
