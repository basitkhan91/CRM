using System;

namespace DAL.Models
{
    public class PublicationFilters
    {
        public long PublicationRecordId { get; set; }
        public string PublicationId { get; set; }
        public string Description { get; set; }
        public string PublicationType { get; set; }
        public string PublishedBy { get; set; }
        public DateTime? RevisionDate { get; set; }
        public int? RevisionNum { get; set; }
        public DateTime? NextReviewDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string Location { get; set; }
        public string VerifiedBy { get; set; }
        public DateTime? VerifiedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public int TotalRecords { get; set; }
    }
}
