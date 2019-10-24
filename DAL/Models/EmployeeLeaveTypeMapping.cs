using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class EmployeeLeaveTypeMapping
    {
        public long? EmployeeLeaveTypeMappingId { get; set; }

        public long? EmployeeId { get; set; }

        public byte? EmployeeLeaveTypeId { get; set; }

        public int MasterCompanyId { get; set; }


		public short? JobTypeId { get; set; }


		public string CreatedBy { get; set; }


        public string UpdatedBy { get; set; }


        public DateTime CreatedDate { get; set; }


        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

    }
}
