using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class EmployeeLeaveTypeMappingViewModel
    {
        public long? EmployeeLeaveTypeMappingId { get; set; }

        public long? EmployeeId { get; set; }

        public byte EmployeeLeaveTypeId { get; set; }

        public int MasterCompanyId { get; set; }


        public string CreatedBy { get; set; }


        public string UpdatedBy { get; set; }


        public DateTime CreatedDate { get; set; }


        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }
    }
}
