﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderMaterials
    {
        [Key]
        public long WorkOrderMaterialsId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        public long? ItemMasterId { get; set; }
        public long TaskId { get; set; }
        public long ConditionCodeId { get; set; }
        public string MandatoryOrSupplemental { get; set; }
        public long ItemClassificationId { get; set; }
        public int Quantity { get; set; }
        public long UnitOfMeasureId { get; set; }
        public decimal UnitCost { get; set; }
        public decimal ExtendedCost { get; set; }
        public decimal? Price { get; set; }
        public decimal? ExtendedPrice { get; set; }
        public string Memo { get; set; }
        public bool? IsDefered { get; set; }

        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ItemMaster ItemMaster { get; set; }
    }
}
