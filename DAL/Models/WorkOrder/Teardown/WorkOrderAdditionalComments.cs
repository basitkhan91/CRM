using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderAdditionalComments
    {
        [Key]
        public long WorkOrderAdditionalCommentsId { get; set; }
        public long WorkOrderTeardownId { get; set; }
        public string Memo { get; set; }
    }
}
