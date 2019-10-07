using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Common
{
    public class Attachment
    {
        public Attachment()
        {
            AttachmentDetails = new List<AttachmentDetails>();
        }
        [Key]
        public long AttachmentId { get; set; }
        public int ModuleId { get; set; }
        public long? ReferenceId { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public List<AttachmentDetails> AttachmentDetails { get; set; }
    }
}
