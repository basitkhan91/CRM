using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderAssetCheckInOut
    {
        public long WorkOrderAssetId { get; set; }
        public long? CheckedInById { get; set; }
        public DateTime? CheckedInDate { get; set; }
        public long? CheckedOutById { get; set; }
        public DateTime? CheckedOutDate { get; set; }
        public string UpdatedBy { get; set; }
        public int? CheckInOutStatus { get; set; }
    }
}
