using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class CommunicationContactAudit
    {
        [Key]
        public long ContactAuditId { get; set; }
        public long ContactId { get; set; }
        public string ContactNo { get; set; }
        public int ContactTypeId { get; set; }
        public string Memo { get; set; }
        public long ContactById { get; set; }
        public DateTime ContactDate { get; set; }
        public int ModuleId { get; set; }
        public long ReferenceId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
