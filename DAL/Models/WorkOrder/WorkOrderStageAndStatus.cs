using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderStageAndStatus
    {
        [Key]
        public long WOStageStatusId { get; set; }
        public long WOStageId { get; set; }
        public long WOStatusId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

    }
}
