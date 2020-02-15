using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class CustomerDocumentDetail
    {
        [Key]
        public long CustomerDocumentDetailId { get; set; }
      
        public long CustomerId { get; set; }
       
      
        public long AttachmentId { get; set; }
        public int MasterCompanyId { get; set; }
        public string DocName { get; set; }
        public string DocMemo { get; set; }
        public string DocDescription { get; set; }

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;

    }
}