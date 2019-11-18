using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class AssetStatusAudit : PasBaseAudit
    {
        [Key]
        public long AssetStatusAuditId { get; set; }
        public long AssetStatusId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }

    }
}
