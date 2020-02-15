using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderQuoteFreight
    {
        [Key]
        public long WorkOrderQuoteFreightId { get; set; }
        [ForeignKey("WorkOrderQuoteDetailsId")]
        public long WorkOrderQuoteDetailsId { get; set; }
        public long CarrierId { get; set; }
        public long ShipViaId { get; set; }
        public string Length { get; set; }
        public string Width { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string Memo { get; set; }
        public decimal? Amount { get; set; }
        public bool? IsFixedFreight { get; set; }
        public long? MarkupPercentageId { get; set; }
        public string MarkupFixedPrice { get; set; }
        public long? TaskId { get; set; }
        public long? HeaderMarkupId { get; set; }
        public int? BillingMethodId { get; set; }
        public decimal? BillingRate { get; set; }
        public decimal? BillingAmount { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }


    }
}
