using System;

namespace DAL.Models
{
    public class RestrictedParts
    {
        public long RestrictedPartId { get; set; }
        public int ModuleId { get; set; }
        public long? ReferenceId { get; set; }
        public long MasterPartId { get; set; }
        public string PartType { get; set; } 
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
