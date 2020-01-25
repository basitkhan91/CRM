using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderStage 
    {
        [Key]
        public Int64 WorkOrderStageId { get; set; }
        public string Code { get; set; }
        public string Stage { get; set; }
        public int Sequence { get; set; }
        public long StatusId { get; set; }
        public long ManagementStructureId { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
