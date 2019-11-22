using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class CommunicationContact
    {
        [Key]
        public long ContactId { get; set; }
        [Required]
        public string ContactNo { get; set; }
        [Required]
        public int ContactTypeId { get; set; }
        [Required]
        public string Memo { get; set; }
        [Required]
        public long ContactById { get; set; }
        [Required]
        public DateTime ContactDate { get; set; }
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
        [NotMapped]
        public string ContactBy { get; set; }
    }
}
