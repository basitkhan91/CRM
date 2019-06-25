using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{

    public class AircraftModel : BaseEntity,IAudit
    {
        [Key]
        public long AircraftModelId { get; set; }
        [ForeignKey("AircraftTypeId")]
        public int AircraftTypeId { get; set; }
        public string ModelName { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public virtual AircraftType AircraftType { get; set; }
    }
}
