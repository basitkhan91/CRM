using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderDocuments
    {
        [Key]
        public long WorkOrderDocumentsId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        public int CompanyId { get; set; }
        public int BusinessUnitId { get; set; }
        public int DivisionId { get; set; }
        public int DepartmentId { get; set; }
        public long DocumentId { get; set; }
        public string Description { get; set; }
        public string DocumentLink {get;set;}
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        [NotMapped]
        public string Company { get; set; }
        [NotMapped]
        public string BusinessUnit { get; set; }
        [NotMapped]
        public string Divison { get; set; }
        [NotMapped]
        public string Department { get; set; }
        [NotMapped]
        public string DocumentCode { get; set; }

    }
}
