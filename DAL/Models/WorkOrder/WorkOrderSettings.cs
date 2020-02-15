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
        public string RecivingListDefaultRB { get; set; }
        public string WOListDefaultRB { get; set; }
        public long? DefaultConditionId { get; set; }
        public long? DefaultSiteId { get; set; }
        public long? DefaultWearhouseId { get; set; }
        public long? DefaultLocationId { get; set; }
        public long? DefaultShelfId { get; set; }
        public long? DefaultStageCodeId { get; set; }
        public long? DefaultScopeId { get; set; }
        public long? DefaultStatusId { get; set; }
        public long? DefaultPriorityId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
