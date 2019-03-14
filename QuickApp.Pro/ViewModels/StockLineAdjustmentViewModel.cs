using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ManagementStructureViewModel
    {

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string Site { get; set; }
        public long? WarehouseId { get; set; }
        public long? LocationId { get; set; }
        public string Shelf { get; set; }
        public string Bin { get; set; }
        public string PartNumber { get; set; }
        public string SerialNumber { get; set; }
        public decimal? InventoryUnitCost { get; set; }
        public decimal? UnitSalesPrice { get; set; }
        public long ManagementStructureId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long? ParentId { get; set; }
        public bool? IsLastChild { get; set; }
        public string TagName { get; set; }
        public long? LegalEntityId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public string IsActive { get; set; }

    }
}
