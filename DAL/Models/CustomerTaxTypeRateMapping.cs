using System;
using System.ComponentModel.DataAnnotations;


namespace DAL.Models
{
    public class CustomerTaxTypeRateMapping
    {
        [Key]
        public long CustomerTaxTypeRateMappingId { get; set; }
        public long CustomerId { get; set; }
        public long TaxType { get; set; }
        public string TaxRate { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsDeleted { get; set; }
    }
}