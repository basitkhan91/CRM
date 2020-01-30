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
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public virtual DomesticWirePayment DomesticWirePayment { get; set; }
    }
}
