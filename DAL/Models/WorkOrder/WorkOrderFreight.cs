using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderFreight
    {
        [Key]
        public long WorkOrderFreightId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        public long CarrierId { get; set; }
        public long ShipViaId { get; set; }
        public string Length { get; set; }
        public string Width { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string Memo { get; set; }
        public decimal Amount { get; set; }
        public bool IsFixedFreight { get; set; }
        public decimal FixedAmount { get; set; }
        public long? TaskId { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        [NotMapped]
        public string CarrierName { get; set; }
        [NotMapped]
        public string ShipViaName { get; set; }

    }
}
