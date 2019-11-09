using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class RepairOrderApproverList
    {
        [Key]
        public long RoApproverListId { get; set; }
        [ForeignKey("RoApproverId")]
        public long RoApproverId { get; set; }
        public long EmployeeId { get; set; }
        public int Level { get; set; }
        public int StatusId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
