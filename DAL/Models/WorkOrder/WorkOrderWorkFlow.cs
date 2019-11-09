using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderWorkFlow
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WorkOrderWorkFlow()
        {
            Charges = new List<WorkOrderCharges>();
            Equipments = new List<WorkOrderAssets>();
            Exclusions = new List<WorkOrderExclusions>();
            Expertise = new List<WorkOrderExpertise>();
            MaterialList = new List<WorkOrderMaterials>();
            Documents = new List<WorkOrderDocuments>();
            WorkOrderAddress = new List<WorkOrderAddress>();
           // WorkOrderQuote = new WorkOrderQuote();
           WorkOrderFreight = new List<WorkOrderFreight>();
            Directions = new List<WorkOrderDirections>();
            Publication = new List<WorkOrderPublications>();
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
        [ForeignKey("WorkScopeId")]
        public long? WorkScopeId { get; set; }
        [ForeignKey("ItemMasterId")]
        public long? ItemMasterId { get; set; }
        public string PartNumberDescription { get; set; }
        public string ChangedPartNumber { get; set; }
        public string ChangedPartNumberDescription { get; set; }
        [ForeignKey("CustomerId")]
        public long? CustomerId { get; set; }
        public int? CurrencyId { get; set; }
        public DateTime? WorkflowCreateDate { get; set; }
        public DateTime? WorkflowExpirationDate { get; set; }
        public bool? IsCalculatedBERThreshold { get; set; }
        public bool? IsFixedAmount { get; set; }
        public decimal? FixedAmount { get; set; }
        public decimal? BERThresholdAmount { get; set; }
        public string WorkOrderNumber { get; set; }
        public decimal? FlatRate { get; set; }
        public bool? IsPercentageOfNew { get; set; }
        public decimal? CostOfNew { get; set; }
        public byte? PercentageOfNew { get; set; }
        public bool? IsPercentageOfReplacement { get; set; }
        public decimal? CostOfReplacement { get; set; }
        public byte? PercentageOfReplacement { get; set; }
        public decimal? OtherCost { get; set; }
        public string Memo { get; set; }
        public long? ManagementStructureId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        //public virtual Customer Customer { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public string WorkFlowWorkOrderNo { get; set; }


        public virtual List<WorkOrderCharges> Charges { get; set; }
        public virtual List<WorkOrderAssets> Equipments { get; set; }
        public virtual List<WorkOrderExclusions> Exclusions { get; set; }
        public virtual List<WorkOrderMaterials> MaterialList { get; set; }
        public virtual List<WorkOrderDocuments> Documents { get; set; }
        public virtual List<WorkOrderAddress> WorkOrderAddress { get; set; }
        public virtual List<WorkOrderFreight> WorkOrderFreight { get; set; }
        //public virtual List<WorkOrderTask> WorkOrderTask { get; set; }
        public virtual List<WorkOrderExpertise> Expertise { get; set; }
        public virtual List<WorkOrderDirections> Directions { get; set; }
        public virtual List<WorkOrderPublications> Publication { get; set; }

        [NotMapped]
        public WorkOrderLaborHeader WorkOrderLaborHeader { get; set; }
        [NotMapped]
        public WorkOrderQuote WorkOrderQuote { get; set; }
    }
}
