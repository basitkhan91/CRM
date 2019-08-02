using DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class VendorCapabiltiyAircraftModelViewModel
    {
        public long VendorCapabilityAircraftModelId { get; set; }

        public long VendorCapabilityId { get; set; }

        public Int32 AircraftModelId { get; set; }

        public string DashNumber { get; set; }

        public Int32? MasterCompanyId { get; set; }

        public bool? isSelected { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
