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
            WorkOrderCharges = new List<WorkOrderCharges>();
            WorkOrderEquipments = new List<WorkOrderAssets>();
            WorkOrderExclusions = new List<WorkOrderExclusions>();
            WorkOrderExpertise = new List<WorkOrderExpertise>();
            WorkOrderMaterialList = new List<WorkOrderMaterials>();
            WorkOrderDocuments = new List<WorkOrderDocuments>();
            WorkOrderAddress = new List<WorkOrderAddress>();
            // WorkOrderQuote = new WorkOrderQuote();
            WorkOrderFreight = new List<WorkOrderFreight>();
            WorkOrderDirections = new List<WorkOrderDirections>();
            WorkOrderPublication = new List<WorkOrderPublications>();
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
        public bool? IsPercentageOfNew { get; set; }
        public decimal? CostOfNew { get; set; }
        public byte? PercentageOfNew { get; set; }
        public bool? IsPercentageOfReplacement { get; set; }
        public decimal? CostOfReplacement { get; set; }
        public byte? PercentageOfReplacement { get; set; }
        public decimal? OtherCost { get; set; }
        public string Memo { get; set; }
        public long? ChangedPartNumberId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        //public virtual Customer Customer { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string WorkFlowWorkOrderNo { get; set; }
        public decimal? MaterilaCost { get; set; }
        public decimal? ExpertiseCost { get; set; }
        public decimal? ChargesCost { get; set; }
        public decimal? Total { get; set; }
        public int? PerOfBerThreshold {get;set;}


        public virtual List<WorkOrderCharges> WorkOrderCharges { get; set; }
        public virtual List<WorkOrderAssets> WorkOrderEquipments { get; set; }
        public virtual List<WorkOrderExclusions> WorkOrderExclusions { get; set; }
        public virtual List<WorkOrderMaterials> WorkOrderMaterialList { get; set; }
        public virtual List<WorkOrderDocuments> WorkOrderDocuments { get; set; }
        public virtual List<WorkOrderAddress> WorkOrderAddress { get; set; }
        public virtual List<WorkOrderFreight> WorkOrderFreight { get; set; }
        public virtual List<WorkOrderExpertise> WorkOrderExpertise { get; set; }
        public virtual List<WorkOrderDirections> WorkOrderDirections { get; set; }
        public virtual List<WorkOrderPublications> WorkOrderPublication { get; set; }

        //[NotMapped]
        //public WorkOrderLaborHeader WorkOrderLaborHeader { get; set; }
        //[NotMapped]
        //public WorkOrderQuote WorkOrderQuote { get; set; }
        [NotMapped]
        public bool IsSaveToWorkFlow { get; set; }
        [NotMapped]
        public List<WorkflowChargesList> Charges { get; set; }
        [NotMapped]
        public List<WorkFlowDirection> Directions { get; set; }
        [NotMapped]
        public List<WorkflowEquipmentList> Equipments { get; set; }
        [NotMapped]
        public List<WorkFlowExclusion> Exclusions { get; set; }
        [NotMapped]
        public List<WorkflowExpertiseList> Expertise { get; set; }
        [NotMapped]
        public List<WorkflowMaterial> MaterialList { get; set; }
        [NotMapped]
        public List<WorkflowMeasurement> Measurements { get; set; }
        [NotMapped]
        public List<Publications> Publication { get; set; }
    }
}
