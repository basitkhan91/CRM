using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class CodeTypes
    {
        [Key]
        public long CodeTypeId { get; set; }
        public string CodeType { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
