﻿using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class CustomerTaxTypeRateMappingAudit
    {
        [Key]
        public long AuditCustomerTaxTypeRateMappingId { get; set; }
        public long CustomerTaxTypeRateMappingId { get; set; }
        public long CustomerId { get; set; }
        public string TaxType { get; set; }
        public string TaxRate { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public long? TaxRateId { get; set; }
        public byte? TaxTypeId { get; set; }
    }
}
