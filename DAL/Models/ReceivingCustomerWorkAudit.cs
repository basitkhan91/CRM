using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class ReceivingCustomerWorkAudit
    {
        [Key]
        public long AuditReceivingCustomerWorkId { get; set; }
        public long ReceivingCustomerWorkId { get; set; }

        [ForeignKey("CustomerId")]
        public long CustomerId { get; set; }
        public string ReceivingCustomerNumber { get; set; }
        public string CustomerReference { get; set; }
        public bool? IsSerialized { get; set; }
        public long? ItemMasterId { get; set; }
        public string ContactId { get; set; }
        public string TraceableToType { get; set; }
        public string ChangePartNumber { get; set; }
        public string PartCertificationNumber { get; set; }
        public short? Quantity { get; set; }
        [ForeignKey("ConditionId")]
        public long? ConditionId { get; set; }
        public long? SiteId { get; set; }
        public long? BinId { get; set; }
        public long? ShelfId { get; set; }
        [ForeignKey("WarehouseId")]
        public long? WarehouseId { get; set; }
        [ForeignKey("LocationId")]
        public long? LocationId { get; set; }
        public string ObtainFromType { get; set; }
        public string PartDescription { get; set; }
        public string Owner { get; set; }
        public bool? IsCustomerStock { get; set; }
        public DateTime? ManufacturingDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? TimeLifeDate { get; set; }
        public string TimeLifeOrigin { get; set; }
        public long? TimeLifeCyclesId { get; set; }
        public string ManufacturingTrace { get; set; }
        public string ManufacturingLotNumber { get; set; }
        [ForeignKey("EmployeeId")]
        public long? EmployeeId { get; set; }
        public string SerialNumber { get; set; }
        public string CertifiedBy { get; set; }
        public DateTime? TagDate { get; set; }
        public string TagType { get; set; }
        public string TraceableTo { get; set; }
        public string ObtainFrom { get; set; }
        public bool? IsTimeLife { get; set; }
        public bool? IsMFGDate { get; set; }
        public long? ManufacturerId { get; set; }
        public DateTime ReceivedDate { get; set; }
        [ForeignKey("MasterCompanyId")]
        public int MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool? IsExpirationDate { get; set; }
        public string PartNumber { get; set; }
        public virtual Condition Condition { get; set; }
        public virtual ItemMaster ItemMaster { get; set; }
        public virtual Site Site { get; set; }
        public virtual Warehouse Warehouse { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Location Location { get; set; }
        public virtual Bin Bin { get; set; }
        public virtual Shelf Shelf { get; set; }
        public virtual TimeLife TimeLife { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        [ForeignKey("ManagementStructureId")]
        public long? ManagementStructureId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string Manufacturer { get; set; }

        #region NOT USED
        [ForeignKey("CustomerClassificationId")]
        public long? CustomerClassificationId { get; set; }
        [ForeignKey("ScopeId")]
        public bool? ScopeId { get; set; }
        [ForeignKey("PriorityId")]
        public long? PriorityId { get; set; }
        [ForeignKey("StatusId")]
        public bool? StatusId { get; set; }
        public long? WorkOrderId { get; set; }
        public string ReasonForRemoval { get; set; }
        public string WorkPhone { get; set; }
        public int? OwnerType { get; set; }

        #endregion NOT USED

    }
}
