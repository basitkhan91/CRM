using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class LegalEntityShipping
    {

        [Key]
        public long LegalEntityShippingId { get; set; }
        public long LegalEntityId { get; set; }
        public long LegalEntityShippingAddressId { get; set; }
        public string ShipVia { get; set; }
        public string ShippingId { get; set; }
        public string ShippingAccountinfo { get; set; }
        public string Memo { get; set; }
        public string ShippingURL { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }

    }
}
