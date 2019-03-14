using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class SiteViewModel
    {
        public long SiteId { get; set; }
        public string Name { get; set; }
        //FK
        public long? AddressId { get; set; }
        public string Memo { get; set; }
       //Forign Key
        public Int32? MasterCompanyId { get; set; } 
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string StateOrProvince { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
    }
}
