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
        public long Id { get; set; }
        public string Identification { get; set; }
        public string Name { get; set; }
        public string Memo { get; set; }

    }
}
