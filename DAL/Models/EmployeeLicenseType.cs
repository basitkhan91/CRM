using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
  public  class EmployeeLicenseType:IAudit
    {
        public Byte EmployeeLicenseTypeId { get; set; }
        [Required]
        public string Description { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsDelete { get; set; }

    }
}
