using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public class PublicationsList
    {
        public long PublicationRecordId { get; set; }
        public string PublicationId { get; set; }
        public string Description { get; set; }
        public string PublicationType { get; set; }
        public string PublishedBy { get; set; }
        public string EmployeeName { get; set; }
        public string Location { get; set; }
        public bool? IsActive { get; set; }
        public DateTime RevisionDate { get; set; }
        public long PublicationTypeId { get; set; }
        public string Sequence { get; set; }
        public string VerifiedBy { get; set; }
        public DateTime? VerifiedDate { get; set; }
        public string ASD { get; set; }
        public DateTime UpdatedDate { get; set; }
        public long ItemMasterId { get; set; }
        public List<ItemMasterAircraftMapping> ItemMasterAircraftMapping { get; set; }
    }
}
