using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    [Table("Publications")]
    public class Publications 
    {
        [Key]
        public long Id { get; set; }

        [Required(ErrorMessage = "Publication Id is required")]
        public string PublicationId { get; set; }

        public string PublicationDescription { get; set; }

        public string PublicationType { get; set; }

        public string Sequence { get; set; }

        public string Source { get; set; }

        public int? AircraftManufacturer { get; set; }

        public long? Model { get; set; }

        public string Location { get; set; }

        public string Revision { get; set; }

        public string RevisionDate { get; set; }

        public string VerifiedBy { get; set; }

        public string VerifiedDate { get; set; }

        public string Status { get; set; }

        public string Image { get; set; }
 
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }
        
        public string UpdatedBy { get; set; }
        
        public DateTime? UpdatedDate { get; set; }

        public bool? IsDeleted { get; set; }

        [ForeignKey("TaskId")]
        public long TaskId { get; set; }

        public long WorkflowId { get; set; }

        public int? MasterCompanyId { get; set; }

        public List<WorkflowPublicationDashNumber> WorkflowPublicationDashNumbers { get; set; }
    }
}