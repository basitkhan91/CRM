using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{

    public class ChargeViewModel
    {
        public long ChargeId { get; set; }

        public string ChargeName { get; set; }

        public int Quantity { get; set; }

        public int MarkUpPercentage { get; set; }

        public int CurrencyId { get; set; }
        public int? PurchaseOrderId { get; set; }

        public long? VendorId { get; set; }

        public string Memo { get; set; }

        public int? IntegrationPortalId { get; set; }

        public long GLAccountId { get; set; }

        public int FunctionalCurrencyId { get; set; }

        public decimal Cost { get; set; }

        

        public string Description { get; set; }

        public Int32 ManagementStructureId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

       

        public decimal BillableAmount { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }
        

    }

   
}
