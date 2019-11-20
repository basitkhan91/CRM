using System;
using System.ComponentModel.DataAnnotations;

namespace DAL
{
    public partial class EmployeeManagementStructure
    {
        [Key]
        public long EmployeeManagementId { get; set; }    
        public long EmployeeId { get; set; }    
        public long ManagementStructureId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
