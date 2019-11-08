using System;

namespace DAL.Models
{
    public class WorkOrderTaskAttribute
    {
        public long WorkOrderTaskAttributeId { get; set; }
        public long WorkOrderTaskId { get; set; }
        public long TaskAttributeId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
