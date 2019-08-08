using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ShippingVia : BaseEntity
    {
        [Key]
        public long ShippingViaId { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string Name { get; set; }

        public string Memo { get; set; }

        public Int32? MasterCompanyId { get; set; }
    }
}
