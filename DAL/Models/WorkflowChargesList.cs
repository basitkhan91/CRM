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
    public partial class WorkflowChargesList
    {
        [Key]
        public long WorkflowChargesListId { get; set; }
        public long WorkflowId { get; set; }

        [Required(ErrorMessage ="Charges Type is required")]
        public byte WorkflowChargeTypeId { get; set; }

        [Required(ErrorMessage = "Charges Description is required")]
        [MaxLength(40,ErrorMessage ="Charges Description must be less than 40 characters.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Charges Quantity is required")]
        public Nullable<short> Quantity { get; set; }
        [Required(ErrorMessage = "Charges Unit Cost is required")]
        public Nullable<decimal> UnitCost { get; set; }
        [Required(ErrorMessage = "Charges Extended Cost is required")]
        public Nullable<decimal> ExtendedCost { get; set; }
        [Required(ErrorMessage = "Charges Unit Price is required")]
        public Nullable<decimal> UnitPrice { get; set; }
        [Required(ErrorMessage = "Charges Extended Price is required")]
        public Nullable<decimal> ExtendedPrice { get; set; }
        [Required(ErrorMessage = "Charges Currency is required")]
        public Nullable<int> CurrencyId { get; set; }
        [Required(ErrorMessage = "Charges FX rate is required")]
        public Nullable<decimal> ForexRate { get; set; }

        public Nullable<long> VendorId { get; set; }
        public string VendorName { get; set; }
        public decimal VendorUnitPrice { get; set; }

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
