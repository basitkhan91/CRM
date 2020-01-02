using System;
using System.ComponentModel.DataAnnotations;

namespace QuickApp.Pro.ViewModels
{
    public class TimeLifeViewModel
    {
        [Key]
        public long TimeLifeCyclesId { get; set; }
        public int? CyclesRemaining { get; set; }
        public int? CyclesSinceNew { get; set; }
        public int? CyclesSinceOVH { get; set; }
        public int? CyclesSinceInspection { get; set; }
        public int? CyclesSinceRepair { get; set; }
        public int? TimeRemaining { get; set; }
        public int? TimeSinceNew { get; set; }
        public int? TimeSinceOVH { get; set; }
        public int? TimeSinceInspection { get; set; }
        public int? TimeSinceRepair { get; set; }
        public int? LastSinceNew { get; set; }
        public int? LastSinceOVH { get; set; }
        public int? LastSinceInspection { get; set; }
        public int? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public long? PurchaseOrderId { get; set; }
        public long? PurchaseOrderPartRecordId { get; set; }
        public long? RepairOrderId { get; set; }
        public long? RepairOrderPartRecordId { get; set; }
        public long StockLineId { get; set; }
        public bool DetailsNotProvided { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        
    }
}
