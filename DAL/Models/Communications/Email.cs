using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Email
    {
        [Key]
        public long EmailId { get; set; }
        [Required]
        public int EmailTypeId { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public long ContactById { get; set; }
        [Required]
        public DateTime ContactDate { get; set; }
        [Required]
        public string EmailBody { get; set; }
        [Required]
        public string ToEmail { get; set; }
        [Required]
        public string FromEmail { get; set; }
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
        public string EmailType { get; set; }
        [NotMapped]
        public string ContactBy { get; set; }
    }
}
