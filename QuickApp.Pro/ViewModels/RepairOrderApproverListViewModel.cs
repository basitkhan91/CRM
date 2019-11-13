using System;

namespace QuickApp.Pro.ViewModels
{
    public class RepairOrderApproverListViewModel
    {
        public long RoApproverListId { get; set; }
        public long RoApproverId { get; set; }
        public long EmployeeId { get; set; }
        public int Level { get; set; }
        public int StatusId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
