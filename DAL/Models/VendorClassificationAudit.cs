using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class VendorClassificationAudit : PasBase
    {
        [Key]
        public long VendorClassificationAuditId { get; set; }
        public long VendorClassificationId { get; set; }
        public string ClassificationName { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public string Memo { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
