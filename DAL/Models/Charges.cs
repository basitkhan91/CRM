using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class Charge:PasBase,IAudit

    {
        [Key]
        public long?  ChargeId { get; set; }

        public string ChargeName { get; set; }

        public int? Quantity { get; set; }

        public decimal? MarkUpPercentage { get; set; }

        public int? CurrencyId { get; set; }
        public long? PurchaseOrderId { get; set; }

        public long? VendorId { get; set; }

        public string Memo { get; set; }

        public int? IntegrationPortalId { get; set; }

        public long? GLAccountId { get; set; }

        public int? FunctionalCurrencyId { get; set; }

        public decimal? Cost { get; set; }

        public string Description { get; set; }
        public decimal BillableAmount { get; set; }
        public long ManagementStructureId { get; set; }

        public Int32? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
        
