using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class AircraftDashNumber : BaseEntity
    {
        [Key]
        public Int32  DashNumberId { get; set; }

        [Required(ErrorMessage ="Aircraft Id is required.")]
        [ForeignKey("AircraftTypeId")]
        public Int32  AircraftTypeId { get; set; }

        [ForeignKey("AircraftModelId")]
        [Required(ErrorMessage = "Aircraft Model Id is required.")]
        public long   AircraftModelId { get; set; }

        [Required(ErrorMessage = "Dash Number is required.")]
        public int  DashNumber { get; set; }
        
        public int? MasterCompanyId { get; set; }

        public virtual AircraftType AircraftType { get; set; }

        public virtual AircraftModel AircraftModel { get; set; }
    }
}
