using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderRemovalReasons
    {
        [Key]
        public long WorkOrderRemovalReasonsId { get; set; }
        public long WorkOrderTeardownId { get; set; }
        public bool? ManualEntry { get; set; }
        public string Memo { get; set; }
    }
}
