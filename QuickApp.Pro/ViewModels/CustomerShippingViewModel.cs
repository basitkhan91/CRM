using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class CustomerShippingViewModel
    {
        public long CustomerShippingId { get; set; }
        public long CustomerId { get; set; }
        public long CustomerShippingAddressId { get; set; }
        public string SiteName { get; set; }
        public string ShipVia { get; set; }
        public string ShippingAccountinfo { get; set; }
        public string ShippingId { get; set; }
        public string ShippingURL { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string Memo { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsPrimary { get; set; }

        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string StateOrProvince { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public long AddressId { get; set; }


        public string ExportLicenseNumber { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public Decimal? Amount { get; set; }
    }
}

