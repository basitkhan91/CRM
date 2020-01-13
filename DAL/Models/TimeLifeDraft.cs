using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace DAL.Models
{
    public class TimeLifeDraft : PasBase
    {
        [Key]
        public long TimeLifeDraftCyclesId { get; set; }

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

        public long StockLineDraftId { get; set; }

        public bool DetailsNotProvided { get; set; }

        [ForeignKey("PurchaseOrderId")]
        public long? PurchaseOrderId { get; set; }
        [ForeignKey("PurchaseOrderId")]
        public long? PurchaseOrderPartRecordId { get; set; }

        [ForeignKey("RepairOrderId")]
        public long? RepairOrderId { get; set; }
        
        [ForeignKey("RepairOrderPartRecordId")]
        public long? RepairOrderPartRecordId { get; set; }

        public virtual PurchaseOrder PurchaseOrder { get; set; }
    }
}
