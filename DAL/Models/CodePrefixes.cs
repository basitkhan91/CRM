using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class CodePrefixes
    {
        [Key]
        public long CodePrefixId { get; set; }
        public long CodeTypeId { get; set; }
        public int? CodeSubTypeId { get; set; }
        public string CodePrefix { get; set; }
        public string CodeSufix { get; set; }
        public string StartsFrom { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
