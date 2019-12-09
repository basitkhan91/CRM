﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderQuoteCharges
    {
        [Key]
        public long WorkOrderQuoteChargesId { get; set; }
        [ForeignKey("WorkOrderQuoteDetailsId")]
        public long WorkOrderQuoteDetailsId { get; set; }
        public long? ChargesTypeId { get; set; }
        public long? VendorId { get; set; }
        public int? Quantity { get; set; }
        public int? RoNumberId { get; set; }
        public string InvoiceNo { get; set; }
        public decimal? Amount { get; set; }
        public int? MarkupPercentageId { get; set; }
        public decimal? CostPlusAmount { get; set; }
        public decimal? FixedAmount { get; set; }
        public string Description { get; set; }
        public decimal? UnitCost { get; set; }
        public decimal? ExtendedCost { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? ExtendedPrice { get; set; }

        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        
    }
}
