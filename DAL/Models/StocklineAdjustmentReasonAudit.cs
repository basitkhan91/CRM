﻿using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class StocklineAdjustmentReasonAudit : PasBase
    {
        [Key]
        public long AdjustmentReasonAuditId { get; set; }
        public long AdjustmentReasonId { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }

    }
}