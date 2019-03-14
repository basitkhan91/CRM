using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class WorkFlowDirectionViewModel
    {
        public long WorkflowDirectionId { get; set; }
        public long WorkflowId { get; set; }
        public string Action { get; set; }
        public string Description { get; set; }
        public string Sequence { get; set; }
        public string Memo { get; set; }
        public Nullable<long> ActionId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> UpdaedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
    }
}
