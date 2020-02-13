using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderPmaDerBulletins
    {
        [Key]
        public long WorkOrderPmaDerBulletinsId { get; set; }
        public long WorkOrderTeardownId { get; set; }
        public bool? ManualEntry { get; set; }
        public string AirworthinessDirecetives { get; set; }
        public string MandatoryService { get; set; }
        public string RequestedService { get; set; }
        public string ServiceLetters { get; set; }
        public string PMAParts { get; set; }
        public string DERRepairs { get; set; }
    }
}
