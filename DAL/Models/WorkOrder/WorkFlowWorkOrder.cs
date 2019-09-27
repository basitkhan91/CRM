using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class WorkFlowWorkOrder
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WorkFlowWorkOrder()
        {
            Charges = new List<WorkOrderCharges>();
            Assets = new List<WorkOrderAssets>();
            Exclusions = new List<WorkOrderExclusions>();
            Expertise = new WorkOrderLaborHeader();
            MaterialList = new List<WorkOrderMaterials>();
            Documents = new List<WorkOrderDocuments>();
            WorkOrderAddress = new List<WorkOrderAddress>();
            WorkOrderQuote = new WorkOrderQuote();
            WorkOrderFreight = new List<WorkOrderFreight>();
        }

        [Key]
        public long WorkFlowWorkOrderId { get; set; }

        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }

        [ForeignKey("WorkflowId")]
        public long WorkflowId { get; set; }

        

        //[Required(ErrorMessage = "Workflow Description is required")]
        public string WorkflowDescription { get; set; }

        public string Version { get; set; }

        [Required(ErrorMessage = "Work Scope is required")]
        [ForeignKey("WorkScopeId")]
        public Nullable<long> WorkScopeId { get; set; }

        [Required(ErrorMessage = "Part Number is required")]
        [ForeignKey("ItemMasterId")]
        public Nullable<long> ItemMasterId { get; set; }

        public string PartNumberDescription { get; set; }

        public string ChangedPartNumber { get; set; }

        public string ChangedPartNumberDescription { get; set; }

        [ForeignKey("CustomerId")]
        public Nullable<long> CustomerId { get; set; }

        [Required(ErrorMessage = "Currency is required")]
        public Nullable<int> CurrencyId { get; set; }

        [Required(ErrorMessage = "Work Flow Create Date is required")]
        public Nullable<System.DateTime> WorkflowCreateDate { get; set; }

        public Nullable<System.DateTime> WorkflowExpirationDate { get; set; }

        public Nullable<bool> IsCalculatedBERThreshold { get; set; }

        public Nullable<bool> IsFixedAmount { get; set; }

        public Nullable<decimal> FixedAmount { get; set; }

        public Nullable<decimal> BERThresholdAmount { get; set; }

        public string WorkOrderNumber { get; set; }

        public decimal? FlatRate { get; set; }

        public Nullable<bool> IsPercentageOfNew { get; set; }

        public Nullable<decimal> CostOfNew { get; set; }

        public Nullable<byte> PercentageOfNew { get; set; }

        public Nullable<bool> IsPercentageOfReplacement { get; set; }

        public Nullable<decimal> CostOfReplacement { get; set; }

        public Nullable<byte> PercentageOfReplacement { get; set; }

        public Nullable<decimal> OtherCost { get; set; }

        public string Memo { get; set; }

        public Nullable<long> ManagementStructureId { get; set; }

        public int? MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public System.DateTime CreatedDate { get; set; }

        public System.DateTime UpdatedDate { get; set; }

        public virtual Customer Customer { get; set; }

        public Nullable<bool> IsActive { get; set; }

        public Nullable<bool> IsDeleted { get; set; }

        public virtual WorkOrder WorkOrder { get; set; }
        public virtual WorkScope WorkScope { get; set; }
        public virtual ItemMaster ItemMaster { get; set; }

        public virtual List<WorkOrderCharges> Charges { get; set; }
        public virtual List<WorkOrderAssets> Assets { get; set; }
        public virtual List<WorkOrderExclusions> Exclusions { get; set; }
        public virtual WorkOrderLaborHeader Expertise { get; set; }
        public virtual List<WorkOrderMaterials> MaterialList { get; set; }
        public virtual List<WorkOrderDocuments> Documents { get; set; }
        public virtual List<WorkOrderAddress> WorkOrderAddress { get; set; }
        public virtual WorkOrderQuote WorkOrderQuote { get; set; }
        public virtual List<WorkOrderFreight> WorkOrderFreight { get; set; }
    }
}
