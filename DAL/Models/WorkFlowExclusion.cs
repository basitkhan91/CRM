﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
   public class WorkFlowExclusion
    {
        public long WorkflowExclusionId { get; set; }
        public long WorkflowId { get; set; }
        public long ItemMasterId { get; set; }
        public Nullable<decimal> UnitCost { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<decimal> ExtendedCost { get; set; }
        public Nullable<byte> EstimtPercentOccurrance { get; set; }
        public string Memo { get; set; }

        [ForeignKey("TaskId")]
        public Nullable<long> TaskId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
      
    }
}
