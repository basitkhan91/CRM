using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class UnitOfMeasureAudit: PasBase
    {
        [Key]
        public long UnitOfMeasureAuditId { get; set; }
        public long UnitOfMeasureId { get; set; }
        public string Description { get; set; }
        public string ShortName { get; set; }
        public string Memo { get; set; }
        public string Standard { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
