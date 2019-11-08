using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderPublicationDashNumber
    {
        [Key]
        public long WOPublicationDashNumberId { get; set; }
        public long WorkOrderPublicationId { get; set; }
        public long DashNumberId { get; set; }

    }
}
