//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public partial class Workflow
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Workflow()
        {
            Charges = new List<WorkflowChargesList>();
            Directions = new List<WorkFlowDirection>();
            Equipments = new List<WorkflowEquipmentList>();
            Exclusions = new List<WorkFlowExclusion>();
            Expertise = new List<WorkflowExpertiseList>();
            MaterialList = new List<WorkflowMaterial>();
            Measurements = new List<WorkflowMeasurement>();
            Publication = new List<Publications>();

        }

        [Key]
        public long WorkflowId { get; set; }

        public string WorkflowDescription { get; set; }

        public string Version { get; set; }

        [Required(ErrorMessage = "Work Scope is required")]
        [ForeignKey("WorkScopeId")]
        public Nullable<long> WorkScopeId { get; set; }

        [Required(ErrorMessage = "Part Number is required")]
        [ForeignKey("ItemMasterId")]
        public Nullable<long> ItemMasterId { get; set; }

        public string PartNumber { get; set; }

        public string PartNumberDescription { get; set; }

        [ForeignKey("ChangedPartNumberId")]
        public long? ChangedPartNumberId { get; set; }

        //public string ChangedPartNumber { get; set; }

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

        public Nullable <decimal> BERThresholdAmount { get; set; }

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

        public Nullable<bool> IsDelete { get; set; }

        public virtual WorkScope WorkScope { get; set; }

        public virtual ItemMaster ItemMaster { get; set; }

        public virtual ItemMaster ChangedPartNumber { get; set; }

        public virtual List<WorkflowChargesList> Charges { get; set; }

        public virtual List<WorkFlowDirection> Directions { get; set; }

        public virtual List<WorkflowEquipmentList> Equipments { get; set; }

        public virtual List<WorkFlowExclusion> Exclusions { get; set; }

        public virtual List<WorkflowExpertiseList> Expertise { get; set; }

        public virtual List<WorkflowMaterial> MaterialList { get; set; }

        public virtual List<WorkflowMeasurement> Measurements { get; set; }

        public virtual List<Publications> Publication { get; set; }

    }
}
