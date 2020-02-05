using DAL.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ShippingViaDetailsAudit 
    {
        [Key]
        public long AuditShippingViaDetailsId { get; set; }
        public long ShippingViaDetailsId { get; set; }

        public long InternationalShippingId { get; set; }
        public long CustomerId { get; set; }
        public string ShipVia { get; set; }
        public string ShippingAccountInfo { get; set; }
        public string ShippingId { get; set; }
        public string ShippingURL { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsPrimary { get; set; }
    }
}

