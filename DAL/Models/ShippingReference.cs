using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ShippingReference : BaseEntity
    {
        [Key]
        public long ShippingReferenceId { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string Name { get; set; }

        public string Memo { get; set; }

        public Int32? MasterCompanyId { get; set; }
    }
}
