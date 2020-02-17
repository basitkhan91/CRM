using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class ReceivingCustomerWork
    {
        [Key]
        public long ReceivingCustomerWorkId { get; set; }
        public long EmployeeId { get; set; }
        public long CustomerId { get; set; }
        public string Reference { get; set; }
        public string ReceivingNumber { get; set; }
        public long CustomerContactId { get; set; }
        public long ItemMasterId { get; set; }
        public long? RevisePartId { get; set; }
        public bool? IsSerialized { get; set; }
        public int? Quantity { get; set; }
        public long ConditionId { get; set; }
        public long SiteId { get; set; }
        public long WarehouseId { get; set; }
        public long? LocationId { get; set; }
        public long? ShelfId { get; set; }
        public long? BinId { get; set; }
        public int? OwnerTypeId { get; set; }
        public string Owner { get; set; }
        public bool IsCustomerStock { get; set; }
        public int? TraceableToTypeId { get; set; }
        public string TraceableTo { get; set; }
        public int? ObtainFromTypeId { get; set; }
        public string ObtainFrom { get; set; }
        public bool? IsMFGDate { get; set; }
        public DateTime? MFGDate { get; set; }
        public string MFGTrace { get; set; }
        public string MFGLotNo { get; set; }
        public bool? IsExpDate { get; set; }
        public DateTime? ExpDate { get; set; }
        public bool? IsTimeLife { get; set; }
        public DateTime? TimeLifeDate { get; set; }
        public string TimeLifeOrigin { get; set; }
        public long? TimeLifeCyclesId { get; set; }
        public string Memo { get; set; }
        public string CertifiedBy { get; set; }
        public DateTime? TagDate { get; set; }
        public long? TagTypeId { get; set; }
        public string SerialNumber { get; set; }
        public string PartCertificationNumber { get; set; }
        public long? ManagementStructureId { get; set; }
        public long? StockLineId { get; set; }
        public long? WorkOrderId { get; set; }
        public bool? IsSkipSerialNo { get; set; }
        public bool? IsSkipTimeLife { get; set; }
        public int MasterCompanyId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        [NotMapped]
        public long ManufacturerId { get; set; }
        [NotMapped]
        public string PartNumber { get; set; }
        
        [NotMapped]
        public string TagType { get; set; }
        [NotMapped]
        public string Condition { get; set; }
        [NotMapped]
        public string StockLineNumber { get; set; }
        [NotMapped]
        public string PartDescription { get; set; }
        [NotMapped]
        public string RevisedPartNo { get; set; }
        [NotMapped]
        public TimeLife TimeLife { get;set;}
        

    }
}
