using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderQuoteDetails
    {
        public WorkOrderQuoteDetails()
        {
            WorkOrderQuoteExclusions = new List<WorkOrderQuoteExclusions>();
            WorkOrderQuoteFreight = new List<WorkOrderQuoteFreight>();
            WorkOrderQuoteCharges = new List<WorkOrderQuoteCharges>();
            WorkOrderQuoteMaterial = new List<WorkOrderQuoteMaterial>();
            //WorkOrderQuoteLaborHeader = new WorkOrderQuoteLaborHeader();
        }
        [Key]
        public long WorkOrderQuoteDetailsId { get; set; }
        [ForeignKey("WorkOrderQuoteId")]
        public long WorkOrderQuoteId { get; set; }
        public long ItemMasterId { get; set; }
        public long BuildMethodId { get; set; }
        public long SelectedId { get; set; }
        public string ReferenceNo { get; set; }
        public long? WorkflowWorkOrderId { get; set; }
        public int? TaskId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

       public virtual List<WorkOrderQuoteExclusions> WorkOrderQuoteExclusions { get; set; }
        public virtual List<WorkOrderQuoteFreight> WorkOrderQuoteFreight { get; set; }
        public virtual List<WorkOrderQuoteCharges> WorkOrderQuoteCharges { get; set; }
        public virtual List<WorkOrderQuoteMaterial> WorkOrderQuoteMaterial { get; set; }
        public virtual WorkOrderQuoteLaborHeader WorkOrderQuoteLaborHeader { get; set; }

    }
    
}
