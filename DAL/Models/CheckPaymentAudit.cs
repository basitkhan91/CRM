using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class CheckPaymentAudit
    {
        [Key]
        public long AuditCheckPaymentId { get; set; }
        public long CheckPaymentId { get; set; }
        public string RoutingNumber { get; set; }
        public string AccountNumber { get; set; }
        public string SiteName { get; set; }
        public bool IsPrimayPayment { get; set; }
        public long? AddressId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
