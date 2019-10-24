using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ChargeAuditViewModel
    {
   

        public string ChargeName { get; set; }

        public int? Quantity { get; set; }

        public string Description { get; set; }
        public string FunctionalCurrencySymbol { get; set; }

        public decimal? MarkUpPercentage { get; set; }

   
        public string CurrencySymbol { get; set; }

     

        public string Memo { get; set; }

        public int? IntegrationPortalId { get; set; }

        public decimal? Cost { get; set; }


        public decimal? BillableAmount { get; set; }
        public long? ManagementStructureId { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public string PurchaseOrderNumber { get; internal set; }
        public string VendorName { get; internal set; }
        public string IntegrationName { get; internal set; }
        public string GLAccountName { get; internal set; }
        public string UpdatedBy { get; internal set; }
        public DateTime? UpdatedDate { get; internal set; }
    }
}
