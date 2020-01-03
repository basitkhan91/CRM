using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class EmployeeStation
    {
        [Key]
        public long EmployeeStationId { get; set; }
        public string StationName { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }       
       
    }
}
