using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class CommunicationChatAudit
    {
        [Key]
        public long CommunicationChatAuditId { get; set; }
        public long CommunicationChatId { get; set; }
        public string Notes { get; set; }
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
