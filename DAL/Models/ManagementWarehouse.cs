using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class ManagementWarehouse : PasBase
    {
        public long ManagementWarehouseId { get; set; }
        [ForeignKey("ManagementStructureId")]
        public long? ManagementStructureId { get; set; }
        [ForeignKey("WarehouseId")]
        public long? WarehouseId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
