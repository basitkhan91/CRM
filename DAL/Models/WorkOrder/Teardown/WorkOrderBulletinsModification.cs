using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderBulletinsModification
    {
        [Key]
        public long WorkOrderBulletinsModificationId { get; set; }
        public long WorkOrderTeardownId { get; set; }
        public string Memo { get; set; }
    }
}
