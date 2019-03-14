using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Publications 
    {
        public Int32? Id { get; set; } 
        public string PublicationId { get; set; }
        public string PublicationDescription { get; set; }
        public string PublicationType { get; set; }
        public string Sequence { get; set; }
        public string Source { get; set; }
        public Int32? AircraftManufacturer { get; set; }
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

        //public virtual Action ActionObject { get; set; }

        public long ActionId { get; set; }
        //[ForeignKey("WorkflowId")]
        //public virtual  Workflow WorkFlow { get; set; }
        public long WorkflowId { get; set; }
    }
}