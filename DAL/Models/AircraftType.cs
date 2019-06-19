using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
  public  class AircraftType : BaseEntity
    {
        [Key]
        public int AircraftTypeId { get; set; }
        public string Description { get; set; }
        public Int32? MasterCompanyId { get; set; }
    }
}
