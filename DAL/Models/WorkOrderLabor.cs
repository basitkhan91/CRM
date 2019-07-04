using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderLabor : PasBaseAuditing
    {
        public Int64 ID { get; set; }
        public Int64 WorkOrderId { get; set; }
        public string DataEnteredBy { get; set; }
        public int LaborExpertiseId { get; set; }
        public Int64 EmployeeId { get; set; }
        public Int64 ActionId { get; set; }
        public int Hours { get; set; }
        public bool ActionsCompletedByOneTech { get; set; }
        public bool UseTargeHoursFromWorkflow { get; set; }
        public bool AssignHoursBySpecificAction { get; set; }
        public bool AssignTotalHoursToWorkOrder { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        //public string CreatedBy { get; set; }
        //public string UpdatedBy { get; set; }
        //public DateTime CreatedDate { get; set; }
        //public DateTime UpdatedDate { get; set; }
        //public bool IsActive { get; set; }
        //public bool IsDelete { get; set; }
    }
}
