using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
  public class AddressAudit
    {
        [Key]
        public long? AddressAuditId { get; set; }
        public long? AddressId { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string Line3 { get; set; }
        public string City { get; set; }
        public string StateOrProvince { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public int MasterCompanyId { get; set; }
        public System.DateTime RecordCreateDate { get; set; }
        public Nullable<System.DateTime> RecordModifiedDate { get; set; }
        public Nullable<int> LastModifiedBy { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        
        public virtual MasterCompany MasterCompany { get; set; }
    }
}
