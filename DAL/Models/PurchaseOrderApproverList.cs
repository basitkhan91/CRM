using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class PurchaseOrderApproverList
    {
        [Key]
        public long POApproverListId { get; set; }
        [ForeignKey("POApproverId")]
        public long POApproverId { get; set; }
        public long EmployeeId { get; set; }
        public int Level { get; set; }
        public int StatusId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
