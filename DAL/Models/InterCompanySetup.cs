using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class InterCompanySetup : BaseEntity
    {
        [Key]
        public long InterCompanySetupId { get; set; }

        [Required(ErrorMessage = "Affiliate Code is required")]
        public string AffiliateCode { get; set; }

        [Required(ErrorMessage = "Afiliate name is required")]
        public string AffiliateName { get; set; }

        [ForeignKey("GLAccountId")]
        [Required(ErrorMessage = "GL Account to be credited is required")]
        public long? GLAccountToBeCredited { get; set; }

        [ForeignKey("GLAccountId")]
        [Required(ErrorMessage = "GL Account to be dedited is required")]
        public long? GLAccountToBeDebited { get; set; }

        [Required(ErrorMessage = "Journal Type is required")]
        public long? JournalType { get; set; }

        [Required(ErrorMessage = "Early payment discount taken from customer is required")]
        public string DiscountFromCustomer { get; set; }

        [Required(ErrorMessage = "FX Gain and loss from customer is required")]
        public string FXGainAndLossFromCustomer { get; set; }

        [Required(ErrorMessage = "Early payment discount taken from vendor is required")]
        public string DiscountToCustomer { get; set; }

        [Required(ErrorMessage = "FX Gain and loss from vendor is required")]
        public string FXGainAndLossToCustomer { get; set; }
    }
}
