using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ShelfViewModel
    {
        public long ShelfId { get; set; }
        [ForeignKey("LocationId")]
        public long? LocationId { get; set; }
        public string Name { get; set; }
        public string WareHouseName { get; set; }
        public string Memo { get; set; }
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

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
