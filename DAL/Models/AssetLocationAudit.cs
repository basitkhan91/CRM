using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class AssetLocationAudit : PasBaseAudit
    {
        [Key]
        public long AssetLocationAuditId { get; set; }
        public long AssetLocationId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }

    }
}
