using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Common
{
    public class AttachmentDetails
    {
        [Key]
        public long AttachmentDetailId { get; set; }
        public long AttachmentId { get; set; }
        //public string Code { get;set; }
        public string FileName { get; set; }
        public string Description { get; set; }
        //public string Memo { get; set; }
        public string Link { get; set; }
        public string FileFormat { get; set; }
        public decimal? FileSize { get; set; }
        public string FileType { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
