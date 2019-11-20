﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderReserveIssuesParts: RevisedIssuedParts
    {
        public long? ItemMasterId { get; set; }
        public string PartNumber { get; set; }
        public string PartDescription { get; set; }
        public List<WOReservedIssuedAltParts> WOReservedIssuedAltParts { get;set;}
        
    }

    public class WOReservedIssuedAltParts: RevisedIssuedParts
    {
        public long AltPartId { get; set; }
        public string AltPartNumber { get; set; }
        public string AltPartDescription { get; set; }
    }

    public class RevisedIssuedParts
    {
        public long WorkOrderId { get; set; }
        public long WorkFlowWorkOrderId { get; set; }
        public long WorkOrderMaterialsId { get; set; }
        public int? QuantityOnHand { get; set; }
        public int? QuantityAvailable { get; set; }
        public int? QuantityOnOrder { get; set; }
        public long? ConditionId { get; set; }
        public string Condition { get; set; }
        public bool? IsAltPart { get; set; }
        public long? AltPartMasterPartId { get; set; }
        public int Quantity { get; set; }
        public int? QuantityReserved { get; set; }
        public int? QuantityTurnIn { get; set; }
        public int? QuantityIssued { get; set; }
        public string IssuedBy { get; set; }
        public DateTime? IssuedDate { get; set; }
        public string ReservedBy { get; set; }
        public DateTime? ReservedDate { get; set; }
    }
}
