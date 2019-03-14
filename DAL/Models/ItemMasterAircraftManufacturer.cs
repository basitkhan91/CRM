using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class ItemMasterAircraftManufacturer : PasBase
    {
        public long ItemMasterAircraftManufacturerId { get; set; }

        public long ItemMasterId { get; set; }

        public int AircraftTypeId { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public bool? IsActive { get; set; }
    }
}
