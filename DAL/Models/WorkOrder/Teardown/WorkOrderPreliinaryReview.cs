using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderPreliinaryReview
    {
        [Key]
        public long WorkOrderPreliinaryReviewId { get; set; }
        public long WorkOrderTeardownId { get; set; }
        public string Memo { get; set; }
        public long? InspectorId { get; set; }
        public DateTime? InspectorDate { get; set; }
        [NotMapped]
        public string Inspector { get; set; }
    }
}
