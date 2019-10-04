using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Memo
    {
        [Key]
        public long MemoId { get; set; }
        [Required(ErrorMessage ="Please enter Memo Code")]
        public string MemoCode { get; set; }
        [Required(ErrorMessage = "Please enter Description")]
        public string Description { get; set; }
        public int ModuleId { get; set; }
        public long ReferenceId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        [NotMapped]
        public string UploadStatus { get; set; }
    }
}
