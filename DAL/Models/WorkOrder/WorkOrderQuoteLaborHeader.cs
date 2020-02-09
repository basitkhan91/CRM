using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderQuoteLaborHeader
    {
        public WorkOrderQuoteLaborHeader()
        {
            WorkOrderQuoteLabor = new List<WorkOrderQuoteLabor>();
        }

        [Key]
        public long WorkOrderQuoteLaborHeaderId { get; set; }
        [ForeignKey("WorkOrderQuoteDetailsId")]
        public long WorkOrderQuoteDetailsId { get; set; }
        public long? DataEnteredBy { get; set; }
        public string MarkupFixedPrice { get; set; }
        public long? HeaderMarkupId { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public virtual List<WorkOrderQuoteLabor> WorkOrderQuoteLabor { get; set; }
    }
}
