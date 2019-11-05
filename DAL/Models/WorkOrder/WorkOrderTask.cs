using System;
using System.Collections.Generic;

namespace DAL.Models 
{
    public class WorkOrderTask
    {
        public long WorkOrderTaskId { get; set; }
        public long WorkOrderId { get; set; }
        public long WorkFlowWorkOrderId { get; set; }
        public long TaskId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public virtual List<WorkOrderTaskAttribute> WorkOrderTaskAttribute { get; set; }
    }
}
