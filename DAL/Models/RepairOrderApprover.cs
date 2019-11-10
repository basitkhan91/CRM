using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class RepairOrderApprover
    {
        public RepairOrderApprover()
        {
            RepairOrderApproverList = new List<RepairOrderApproverList>();
        }

        [Key]
        public long RoApproverId { get; set; }
        [ForeignKey("RepairOrderId")]
        public long RepairOrderId { get; set; }
        public virtual List<RepairOrderApproverList> RepairOrderApproverList { get; set; }
    }
}
