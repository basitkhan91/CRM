using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class MasterParts
    {
        [Key]
        public long MasterPartId { get; set; }
        public string PartNumber { get; set; }
        public string Description { get; set; }
        [ForeignKey("ManufacturerId")]
        public long? ManufacturerId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public int? MasterCompanyId {get;set;}
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
        public virtual Manufacturer Manufacturer { get; set; }
    }
}
