using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class PublicationAudit 
    {
        [Key]
        public long PublicationAuditId { get; set; }
        public long PublicationRecordId { get; set; }
        public DateTime EntryDate { get; set; }
        public string PublicationId { get; set; }
        public string Description { get; set; }
        public long PublicationTypeId { get; set; }
        public string ASD { get; set; }
        public int Sequence { get; set; }
        public string Publishby { get; set; }
        public string Location { get; set; }
        public DateTime RevisionDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public DateTime NextReviewDate { get; set; }
        public long EmployeeId { get; set; } 
        public int VerifiedBy { get; set; }
        public int RevisionNum { get; set; }
        public Nullable<DateTime> VerifiedDate { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
