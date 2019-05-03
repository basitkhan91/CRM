using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class WarehouseAudit:PasBase
    {
        [Key]
        public long WarehouseAuditId { get; set; }
        public long WarehouseId { get; set; }
        public long SiteId { get; set; }
        public string Name { get; set; }
        public string Memo { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public int LastModifiedBy { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
