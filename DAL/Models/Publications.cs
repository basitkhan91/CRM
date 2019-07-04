using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Publications 
    {
        [Key]
        public long Id { get; set; }

        [Required(ErrorMessage = "Publication Id is required")]
        public string PublicationId { get; set; }

        [Required(ErrorMessage = "Publication Description is required")]
        public string PublicationDescription { get; set; }

        [Required(ErrorMessage = "Publication Type is required")]
        public string PublicationType { get; set; }

        [MaxLength(5,ErrorMessage ="Sequence maximum length 5 characters")]
        public string Sequence { get; set; }

        public string Source { get; set; }

        public int? AircraftManufacturer { get; set; }

        public long? Model { get; set; }

        public string Location { get; set; }

        [MaxLength(5, ErrorMessage = "Revision maximum length 5 characters")]
        public string Revision { get; set; }

        public string RevisionDate { get; set; }

        [MaxLength(25, ErrorMessage = "VerifiedBy maximum length 25 characters")]
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
    }
}