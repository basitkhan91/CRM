﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderBillingInvoicing
    {
        [Key]
        public long BillingInvoicingId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        public long WorkFlowWorkOrderId { get; set; }
        public long WorkOrderPartNoId { get; set; }
        public long ItemMasterId { get; set; }
        public long InvoiceTypeId { get; set; }
        public string InvoiceNo { get; set; }
        public long CustomerId { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public string InvoiceTime { get; set; }
        public DateTime? PrintDate { get; set; }
        public DateTime? ShipDate { get; set; }
        public int? NoofPieces { get; set; }
        public long EmployeeId { get; set; }
        public int? RevType { get; set; }
        public string GateStatus { get; set; }
        public long SoldToCustomerId { get; set; }
        public long SoldToSiteId { get; set; }
        public long ShipToCustomerId { get; set; }
        public long ShipToSiteId { get; set; }
        public string ShipToAttention { get; set; }
        public long ManagementStructureId { get; set; }
        public long ManagementEmpId { get; set; }
        public string Notes { get; set; }
        public string CostPlusType { get; set; }
        public bool? TotalWorkOrder { get; set; }
        public long? TotalWorkOrderValue { get; set; }
        public bool? Material { get; set; }
        public long? MaterialValue { get; set; }
        public bool? LaborOverHead { get; set; }
        public long? LaborOverHeadValue { get; set; }
        public bool? MiscCharges { get; set; }
        public long? MiscChargesValue { get; set; }
        public bool? ProForma { get; set; }
        public bool? PartialInvoice { get; set; }
        public bool? CostPlusRateCombo { get; set; }
        public long? ShipViaId { get; set; }
        public string WayBillRef { get; set; }
        public string Tracking { get; set; }
        public int? CurrencyId { get; set; }
        public decimal? AvailableCredit { get; set; }
        public decimal? TotalWorkOrderCost { get; set; }
        public decimal? TotalWorkOrderCostPlus { get; set; }
        public decimal? MaterialCost { get; set; }
        public decimal? MaterialCostPlus { get; set; }
        public decimal? LaborOverHeadCost { get; set; }
        public decimal? LaborOverHeadCostPlus { get; set; }
        public decimal? MiscChargesCost { get; set; }
        public decimal? MiscChargesCostPlus { get; set; }
        public decimal? GrandTotal { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

    }
}
