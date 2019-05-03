using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
  public  class EmployeeLicenseType:PasBase,IAudit
    {
        [Key]
        public Byte? EmployeeLicenseTypeId { get; set; }
        [Required]
        public string Description { get; set; }
        public bool? IsActive { get; set; }
        // [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public bool? IsDelete { get; set; }

    }
}
