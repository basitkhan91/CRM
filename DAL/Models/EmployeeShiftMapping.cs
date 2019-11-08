using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public  class EmployeeShiftMapping

    {
        public long? EmployeeShiftMappingId { get; set; }

        public long? EmployeeId { get; set; }

        public long? ShiftId { get; set; }

        public int MasterCompanyId { get; set; }

		public short? JobTypeId { get; set; }

		public string CreatedBy { get; set; }


        public string UpdatedBy { get; set; }


        public DateTime CreatedDate { get; set; }


        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }
    }

}
