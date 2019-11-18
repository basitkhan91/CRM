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

		[Required(ErrorMessage = "Aircraft Id is required.")]
		[ForeignKey("AircraftTypeId")]
        public int AircraftTypeId { get; set; }

        [NotMapped]
        public string AircraftTypeName { get; set; }
        public string ModelName { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public virtual AircraftType AircraftType { get; set; }
		public string Memo { get; set; }
        

    }
}
