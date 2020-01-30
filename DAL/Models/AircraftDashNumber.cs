using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class AircraftDashNumber : BaseEntity, IAudit
    {
        [Key]
        public long  DashNumberId { get; set; }

        [Required(ErrorMessage ="Aircraft Id is required.")]
        [ForeignKey("AircraftTypeId")]
        public int  AircraftTypeId { get; set; }

        [ForeignKey("AircraftModelId")]
        [Required(ErrorMessage = "Aircraft Model Id is required.")]
        public long   AircraftModelId { get; set; }
           [NotMapped]
        public string AircraftTypeName { get; set; }
        [NotMapped]
        public string ModelName { get; set; }

        [Required(ErrorMessage = "Dash Number is required.")]
        public string  DashNumber { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }

        public virtual AircraftType AircraftType { get; set; }

        public virtual AircraftModel AircraftModel { get; set; }
		

     

    }
}
