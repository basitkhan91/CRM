using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public class VendorCapability : PasBase
    {
        [Key]
        public long? Id { get; set; }

        public int? CapabilityId { get; set; }

        public string Name { get; set; }

        public int? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }
    }
}
