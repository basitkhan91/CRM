using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class AircraftType : BaseEntity, IAudit
    {
        [Key]
        public int AircraftTypeId { get; set; }
        public string Description { get; set; }
        public Int32? MasterCompanyId { get; set; }
    }
}
