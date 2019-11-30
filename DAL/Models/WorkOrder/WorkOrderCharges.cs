using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderCharges
    {
        [Key]
        public long WorkOrderChargesId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        public long ChargesTypeId { get; set; }
        public long? VendorId { get; set; }
        public int? Quantity { get; set; }
        public int RoNumberId { get; set; }
        public string InvoiceNo { get; set; }
        public decimal Amount { get; set; }
        public int MarkupPercentageId { get; set; }
        public decimal CostPlusAmount {get;set;}
        public decimal FixedAmount { get; set; }
        public long TaskId { get; set; }
        public string Description { get; set; }
        public decimal? UnitCost { get; set; }
        public decimal? ExtentedCost { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? ExtentedPrice { get; set; }

        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool? IsFromWorkFlow { get; set; }

        [NotMapped]
        public string VendorName { get; set; }
        [NotMapped]
        public string ChargeType { get; set; }
        [NotMapped]
        public long workflowChargeTypeId { get; set; }
    }
}
