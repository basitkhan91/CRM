using System.Collections.Generic;

namespace QuickApp.Pro.ViewModels
{
    public class RepairOrderApproverViewModel
    {
        public RepairOrderApproverViewModel()
        {
            RepairOrderApproverList = new List<RepairOrderApproverListViewModel>();
        }

        public long RoApproverId { get; set; }
        public long RepairOrderId { get; set; }
        public virtual List<RepairOrderApproverListViewModel> RepairOrderApproverList { get; set; }
    }


}
