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

        public long PublicationsId { get; set; }

        [ForeignKey("WorkflowId")]
        public long WorkflowId { get; set; }

        [ForeignKey("AircraftDashNumberId")]
        public long AircraftDashNumberId { get; set; }

        [ForeignKey("TaskId")]
        public long TaskId { get; set; }

    }
}
