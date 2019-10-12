using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class WorkflowPublicationDashNumber
    {
        [Key]
        public long WorkflowPublicationDashNumberId { get; set; }

        [ForeignKey("PublicationsId")]
        public long PublicationsId { get; set; }

        [ForeignKey("AircraftDashNumberId")]
        public long AircraftDashNumberId { get; set; }
    }
}
