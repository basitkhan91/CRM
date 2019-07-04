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


    public partial class WorkflowMaterial
    {
        [Key]
        public long WorkflowMaterialListId { get; set; }
        public long WorkflowId { get; set; }

        [Required(ErrorMessage ="Part Number is required")]
        public long ItemMasterId { get; set; }

        [Required(ErrorMessage = "Part Number is required")]
        [MaxLength(40,ErrorMessage ="Part number can not be more than 40 characters.")]
        public string PartNumber { get; set; }

        [Required(ErrorMessage = "Part Description is required")]
        [MaxLength(75,ErrorMessage = "Part number can not be more than 75 characters.")]
        public string PartDescription { get; set; }

        public long? ItemClassificationId { get; set; }

        [ForeignKey("TaskId")]
        public Nullable<long> TaskId { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        public Nullable<short> Quantity { get; set; }

        [Required(ErrorMessage = "UOM is required")]
        public Nullable<long> UnitOfMeasureId { get; set; }

        [Required(ErrorMessage = "Condition is required")]
        public Nullable<short> ConditionCodeId { get; set; }

        [Required(ErrorMessage = "Unit Cost is required")]
        public Nullable<decimal> UnitCost { get; set; }

        [Required(ErrorMessage = "Ext. Cost is required")]
        public Nullable<decimal> ExtendedCost { get; set; }

        [Required(ErrorMessage = "Price is required")]
        public Nullable<decimal> Price { get; set; }

        [Required(ErrorMessage = "Mandatory/Supplemental is required")]
        public string MandatoryOrSupplemental { get; set; }

        public Nullable<int> ProvisionId { get; set; }
        public Nullable<bool> IsDeferred { get; set; }
        public byte WorkflowActionId { get; set; }
        public string Memo { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        
    }
}
