using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
   public class EmployeeLeaveType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Byte? EmployeeLeaveTypeId { get; set; }

        [Required]
        public string Description { get; set; }

        public bool? IsActive { get; set; }
        //public virtual MasterCompany MasterCompany { get; set; }

    }
}