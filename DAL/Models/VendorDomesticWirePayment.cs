using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class VendorDomesticWirePayment
    {
        [Key]
        public long VendorDomesticWirePaymentId { get; set; }
        public long VendorId { get; set; }
        public long DomesticWirePaymentId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
    
        public virtual DomesticWirePayment DomesticWirePayment { get; set; }
    }
}
