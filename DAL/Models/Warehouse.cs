using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class Warehouse:PasBase
    {
        public long WarehouseId { get; set; }
        public long SiteId { get; set; }
        public string Name { get; set; }
        public string Memo { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public int LastModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
