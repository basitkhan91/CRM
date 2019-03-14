using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class LocationViewModel
    {
        public long LocationId { get; set; }
        public long WarehouseId { get; set; }
        public string Name { get; set; }
        public string Memo { get; set; }

        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string stateOrProvince { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }

        public string Zone { get; set; }
        public string Level { get; set; }
        public string Aisle { get; set; }
        public string Rack { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }
    }
}
