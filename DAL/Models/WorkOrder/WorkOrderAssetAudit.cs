using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderAssetAudit
    {
        [Key]
        public long WorkOrderAssetAuditId { get; set; }
        public long WorkOrderAssetId { get; set; }
        public long WorkOrderId { get; set; }
        public long WorkFlowWorkOrderId { get; set; }
        public long? AssetRecordId { get; set; }
        public int? Quantity { get; set; }
        public int MinQuantity { get; set; }
        public int MaxQuantity { get; set; }
        public int ExpectedQuantity { get; set; }
        public string Findings { get; set; }
        public long TaskId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool? IsFromWorkFlow { get; set; }
        public long? CheckedInById { get; set; }
        public DateTime? CheckedInDate { get; set; }
        public long? CheckedOutById { get; set; }
        public DateTime? CheckedOutDate { get; set; }
        public int? CheckInOutStatus { get; set; }
        [NotMapped]
        public string AssetId { get; set; }
        [NotMapped]
        public string AssetName { get; set; }
        [NotMapped]
        public string Description { get; set; }
        [NotMapped]
        public string AssetTypeName { get; set; }
        [NotMapped]
        public long? AssetTypeId { get; set; }
    }
}