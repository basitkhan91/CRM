using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class Site:PasBase
    {
        public long SiteId { get; set; }
        public string Name { get; set; }
        [ForeignKey("AddressId")]
        public long? AddressId { get; set; }
        public string Memo { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public virtual ManagementSite ManagementSite { get; set; }
        public virtual Address Address { get; set; }
    }
}
