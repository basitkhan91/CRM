using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class SubWorkOrder
    {
        [Key]
        public long SubWorkOrderId { get; set; }
        public long WorkOrderId { get; set; }
        public string MasterPartNo { get; set; }
        public string MasterPartDescription { get; set; }
        public string RevisedPartNo { get; set; }
        public string WorkScope { get; set; }
        public string SubWorkOrderNo { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime? NeedDate { get; set; }
        public DateTime? EstCompDate { get; set; }
        public long? StageId { get; set; }
        public long? StatusId { get; set; }
        public string CMM { get; set; }
        public string WorkFlowNo { get; set; }
        public bool IsPMA { get; set; }
        public bool IsDER { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        [NotMapped]
        public string WorkOrderNum { get; set; }
    }
}
