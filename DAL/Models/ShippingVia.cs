using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class ShippingVia 
    {
        [Key]
        public long ShippingViaId { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string Name { get; set; }
        public string Memo { get; set; }
        public string ShippingId { get; set; }
        public string ShippingURL { get; set; }
        public string ShippingAccountInfo { get; set; }
        public int UserType { get; set; }
        public long ReferenceId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        [NotMapped]
        public long AddressId { get; set; }
    }
}
