using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class VendorContactAudit
    {
        [Key]
        public long AuditVendorContactId { get; set; }
        public long VendorContactId { get; set; }       
        public long VendorId { get; set; }       
        public Nullable<long> ContactId { get; set; }
        public bool IsDefaultContact { get; set; }
        public int MasterCompanyId { get; set; }
        public System.DateTime RecordCreateDate { get; set; }
        public Nullable<System.DateTime> RecordModifiedDate { get; set; }     
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string Tag { get; set; }

    }
}
