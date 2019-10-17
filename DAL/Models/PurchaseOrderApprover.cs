using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class PurchaseOrderApprover
    {
        public PurchaseOrderApprover()
        {
            PurchaseOrderApproverList= new List<PurchaseOrderApproverList>();
        }

        [Key]
        public long POApproverId { get; set; }
        [ForeignKey("PurchaseOrderId")]
        public long PurchaseOrderId { get; set; }
        public virtual List<PurchaseOrderApproverList> PurchaseOrderApproverList { get; set; }
    }
}
