using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderAddress
    {
        [Key]
        public long WorkOrderAddressId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        [ForeignKey("CustomerId")]
        public long CustomerId { get; set; }
        [Required(ErrorMessage = "Please select Site")]
        public long SiteId { get; set; }
        public string SiteName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string StateProvince { get; set; }
        public long CountryId { get; set; }
        [Required(ErrorMessage = "Please enter Contact Name")]
        public string ContactName { get; set; }
        [Required(ErrorMessage = "Please enter Memo")]
        public string Memo { get; set; }
        public int AddressType { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        [NotMapped]
        public string CountryName { get; set; }

    }
}
