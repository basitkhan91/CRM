using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderSettings
    {
        [Key]
        public long WorkOrderSettingId { get; set; }
        public int WorkOrderTypeId { get; set; }
        public string Prefix { get; set; }
        public string Sufix { get; set; }
        public string StartCode { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
