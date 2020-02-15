using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderDocuments
    {
        [Key]
        public long WorkOrderDocumentId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        public long AttachmentId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Memo { get; set; }
        public string Description { get; set; }
        public long ManagementStructureId { get;set;}
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
