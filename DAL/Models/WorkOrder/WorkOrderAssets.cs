using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderAssets
    {
        [Key]
        public long WorkOrderAssetId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        [ForeignKey("AssetRecordId")]
        public long? AssetRecordId { get; set; }
        public int? Quantity { get; set; }
        public int MinQuantity { get; set; }
        public int MaxQuantity { get; set; }
        public int ExpectedQuantity { get; set; }
        public string Findings { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

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
