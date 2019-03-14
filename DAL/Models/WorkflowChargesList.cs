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
        public byte WorkflowChargeTypeId { get; set; }
        public string Description { get; set; }
        public Nullable<short> Quantity { get; set; }
        public Nullable<decimal> UnitCost { get; set; }
        public Nullable<decimal> ExtendedCost { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> ExtendedPrice { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public Nullable<decimal> ForexRate { get; set; }
        public Nullable<long> VendorId { get; set; }
        public decimal VendorUnitPrice { get; set; }
        public long ActionId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public string VendorName { get; set; }
    }
}
