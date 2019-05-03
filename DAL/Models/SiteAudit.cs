using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class SiteAudit : PasBase
    {
        public long SiteAuditId { get; set; }
        public long SiteId { get; set; }
        public string Name { get; set; }
        public long? AddressId { get; set; }
        public string Memo { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
