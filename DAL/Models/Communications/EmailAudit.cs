using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class EmailAudit
    {
        [Key]
        public long EmailAuditId { get; set; }
        public long EmailId { get; set; }
        public int EmailTypeId { get; set; }
        public string Subject { get; set; }
        public long ContactById { get; set; }
        public DateTime ContactDate { get; set; }
        public string EmailBody { get; set; }
        public string ToEmail { get; set; }
        public string FromEmail { get; set; }
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
