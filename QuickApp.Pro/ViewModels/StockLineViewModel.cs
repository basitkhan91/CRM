﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class StockLineViewModel
    {
        public long StockLineId { get; set; }
        public string PartNumber { get; set; }
        public string StockLineNumber { get; set; }
        public string StocklineMatchKey { get; set; }
        public string ControlNumber { get; set; }
        //[FK]
        [ForeignKey("ItemMasterId")]
        public long? ItemMasterId { get; set; }

        public Int32? Quantity { get; set; }
        //[FK]
        [ForeignKey("ConditionId")]
        public long? ConditionId { get; set; }

        public string SerialNumber { get; set; }
        public bool? ShelfLife { get; set; }
        public DateTime? ShelfLifeExpirationDate { get; set; }
        //[FK]
        [ForeignKey("SiteId")]
        public long? SiteId { get; set; }
        [ForeignKey("ShelfId")]
        public long? ShelfId { get; set; }
        [ForeignKey("BinId")]
        public long? BinId { get; set; }
        [ForeignKey("WarehouseId")]
        public long? WarehouseId { get; set; }

        //[FK]
        [ForeignKey("LocationId")]
        public long? LocationId { get; set; }

        public string ObtainFrom { get; set; }
        public string Owner { get; set; }
        public string TraceableTo { get; set; }
        public long? ManufacturerId { get; set; }
        public string Manufacturer { get; set; }
        public string ManufacturerLotNumber { get; set; }
        public DateTime? ManufacturingDate { get; set; }
        public string ManufacturingBatchNumber { get; set; }
        public string PartCertificationNumber { get; set; }
        public string CertifiedBy { get; set; }
        public DateTime? CertifiedDate { get; set; }
        public DateTime? TagDate { get; set; }
        public string TagType { get; set; }
        public DateTime? CertifiedDueDate { get; set; }
        public string CalibrationMemo { get; set; }
        public DateTime? OrderDate { get; set; }
        public Int32? QuantityToReceive { get; set; }
        //[FK]
        [ForeignKey("PurchaseOrderId")]
        public long? PurchaseOrderId { get; set; }
        public decimal? PurchaseOrderUnitCost { get; set; }
        public decimal? InventoryUnitCost { get; set; }

        //[FK]
        [ForeignKey("RepairOrderId")]
        public long? RepairOrderId { get; set; }
        public decimal? RepairOrderUnitCost { get; set; }

        public DateTime? ReceivedDate { get; set; }
        public string ReceiverNumber { get; set; }
        public string ReconciliationNumber { get; set; }
        public decimal? UnitSalesPrice { get; set; }
        public decimal? CoreUnitCost { get; set; }
        public long? GLAccountId { get; set; }
        public long? AssetId { get; set; }
        public bool? IsHazardousMaterial { get; set; }
        public bool? IsPMA { get; set; }
        public bool? IsDER { get; set; }
        public bool? OEM { get; set; }
        public string Memo { get; set; }
        public long? ManagementStructureEntityId { get; set; }
        public long? TimeLifeCyclesId { get; set; }

        public string Site { get; set; }
        public string Shelf { get; set; }
        public string Bin { get; set; }

        public bool? TimeLife { get; set; }
        public long? TimeLifeId { get; set; }

        public Int32? ObtainFromType { get; set; }
        public Int32? OwnerType { get; set; }
        public Int32? TraceableToType { get; set; }
        public Int32? UnitCostAdjustmentReasonTypeId { get; set; }
        public Int32? UnitSalePriceAdjustmentReasonTypeId { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public Int32? CompanyId { get; set; }
        [ForeignKey("BusinessUnitId")]
        public Int32? BusinessUnitId { get; set; }
        [ForeignKey("DivisionId")]
        public Int32? DivisionId { get; set; }
        [ForeignKey("DepartmentId")]
        public Int32? DepartmentId { get; set; }

        public bool? isSerialized { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
       
        public string IdNumber { get; set; }

        public Int32? IntegrationPortalId { get; set; }
        public bool? IsListed { get; set; }

        public long? StocklineIntegrationPortalId { get; set; }

    }
}
