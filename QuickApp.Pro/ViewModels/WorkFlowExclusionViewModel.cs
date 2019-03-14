using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class WorkFlowExclusionViewModel
    {

        public long WorkflowExclusionId { get; set; }
        public long WorkflowId { get; set; }
        public long ItemMasterId { get; set; }
        public Nullable<decimal> UnitCost { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<decimal> ExtendedCost { get; set; }
        public Nullable<byte> EstimtPercentOccurrance { get; set; }
        public string Memo { get; set; }
        public Nullable<long> ActionId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
    }
}
