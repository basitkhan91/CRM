using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class VendorCapabilityAircraft
    {       
       
        [Key]
        public long VendorCapabilityAirCraftId { get; set; }
        public long VendorCapabilityId { get; set; }      
        public long VendorId { get; set; }
        public long CapabilityId { get; set; }
        public long AircraftTypeId { get; set; }
        public long AircraftModelId { get; set; }
        public long DashNumberId { get; set; }
        public int MasterCompanyId { get; set; }
        public string Memo { get; set; }
        public string PartNumber { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; } 

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }

        // public bool? isSelected { get; set; }

        public bool? IsDeleted { get; set; }

        //public string CapabilityName { get; set; }
        //public string PartNumber { get; set; }

        //public string AircraftType { get; set; }
        //public string AircraftModel { get; set; }







    }
}
