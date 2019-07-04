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

    public partial class WorkflowExpertiseList
    {
        [Key]
        public long WorkflowExpertiseListId { get; set; }
        public long WorkflowId { get; set; }
        public Nullable<short> ExpertiseTypeId { get; set; }
        public Nullable<decimal> EstimatedHours { get; set; }
        public Nullable<decimal> LaborDirectRate { get; set; }
        public Nullable<decimal> DirectLaborRate { get; set; }
        public Nullable<decimal> OverheadBurden { get; set; }
        public Nullable<decimal> OverheadCost { get; set; }
        public Nullable<decimal> StandardRate { get; set; }
        public Nullable<decimal> LaborOverheadCost { get; set; }

        [ForeignKey("TaskId")]
        public long TaskId { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
    }
}
