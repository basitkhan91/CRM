using System;
using System.Collections.Generic;
using System.Text;

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
    }
}
