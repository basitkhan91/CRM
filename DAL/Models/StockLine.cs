﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class StockLine : PasBase
    {
        [Key]
        public long StockLineId { get; set; }
        public string PartNumber { get; set; }
        public string StockLineNumber { get; set; }
        public string StocklineMatchKey { get; set; }
        public string ControlNumber { get; set; }
        [ForeignKey("ItemMasterId")]
        public long? ItemMasterId { get; set; }
        public int? Quantity { get; set; }
        [ForeignKey("ConditionId")]
        public long? ConditionId { get; set; }
        public string SerialNumber { get; set; }
        public bool? ShelfLife { get; set; }
        public DateTime? ShelfLifeExpirationDate { get; set; }
         [ForeignKey("WarehouseId")]
        public long? WarehouseId { get; set; }
        [ForeignKey("LocationId")]
        public long? LocationId { get; set; }
        public string ObtainFrom { get; set; }
        public string Owner { get; set; }
        public string TraceableTo { get; set; }
        public long? ManufacturerId { get; set; }
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
        [ForeignKey("PurchaseOrderId")]
        public long? PurchaseOrderId { get; set; }
        public decimal? PurchaseOrderUnitCost { get; set; }
        public decimal? InventoryUnitCost { get; set; }
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
        [NotMapped]
        public string Site { get; set; }
        [NotMapped]
        public string Shelf { get; set; }
        [NotMapped]
        public string Bin { get; set; }
        public long? ManagementStructureEntityId { get; set; }
        [NotMapped]
        public int? CompanyId { get; set; }
        [NotMapped]
        public int? BusinessUnitId { get; set; }
        [NotMapped]
        public int? DivisionId { get; set; }
        [NotMapped]
        public int? DepartmentId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public int? MasterCompanyId { get; set; }
        public bool? IsSerialized { get; set; }
        [ForeignKey("ShelfId")]
        public long? ShelfId { get; set; }
        [ForeignKey("BinId")]
        public long? BinId { get; set; }
        [ForeignKey("SiteId")]
        public long? SiteId { get; set; }
        public Int32? ObtainFromType { get; set; }
        public Int32? OwnerType { get; set; }
        public Int32? TraceableToType { get; set; }
        public Int32? UnitCostAdjustmentReasonTypeId { get; set; }
        public Int32? UnitSalePriceAdjustmentReasonTypeId { get; set; }
        public string IdNumber { get; set; }
        public Int32? QuantityToReceive { get; set; }
        //public bool? isIntegrateWith { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string ManufacturingTrace { get; set; }
        public decimal PurchaseOrderExtendedCost { get; set; }
        public string AircraftTailNumber { get; set; }
        public long? ShippingViaId { get; set; }
        public string EngineSerialNumber { get; set; }
        public int QuantityRejected { get; set; }
        public long? PurchaseOrderPartRecordId { get; set; }
        public string ShippingAccount { get; set; }
        public string ShippingReference { get; set; }
        public long? TimeLifeCyclesId { get; set; }
        public bool TimeLifeDetailsNotProvided { get; set; }
        public virtual PurchaseOrder PurchaseOrder { get; set; }
        public virtual PurchaseOrderPart PurchaseOrderPartRecord { get; set; }

    }
}
