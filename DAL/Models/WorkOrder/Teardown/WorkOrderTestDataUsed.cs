using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderTestDataUsed
    {
        [Key]
        public long WorkOrderTestDataUsedId { get; set; }
        public long WorkOrderTeardownId { get; set; }
        public string Memo { get; set; }
    }
}
