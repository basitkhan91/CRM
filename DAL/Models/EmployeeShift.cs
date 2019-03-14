using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace DAL.Models
{
  public  class EmployeeShift : PasBase
    {
        public long EmployeeShiftId { get; set; }
       
        public long EmployeeId { get; set; }
      
        public long? ShiftId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
    }
}
