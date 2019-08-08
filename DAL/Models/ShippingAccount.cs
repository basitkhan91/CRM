using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class ShippingAccount : BaseEntity
    {
        [Key]
        public long ShippingAccountId { get; set; }

        [Required(ErrorMessage = "Account Number Is Required.")]
        public string AccountNumber { get; set; }
        
        public string Memo { get; set; }

        public Int32? MasterCompanyId { get; set; }
    }
}
