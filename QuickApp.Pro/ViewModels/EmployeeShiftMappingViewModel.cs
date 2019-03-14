using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class EmployeeShiftMappingViewModel
    {

        public long? EmployeeShiftMappingId { get; set; }

        public long? EmployeeId { get; set; }

        public byte ShiftId { get; set; }

        public int MasterCompanyId { get; set; }


        public string CreatedBy { get; set; }


        public string UpdatedBy { get; set; }


        public DateTime CreatedDate { get; set; }


        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }
    }

}
