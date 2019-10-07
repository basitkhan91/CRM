using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class PublicationType 
    {
        [Key]
        public long PublicationTypeId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Memo { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool IsDeleted { get; set; }
       
        public bool IsActive { get; set; }

        public int MasterCompanyId { get; set; }
        [NotMapped]
        public string UploadStatus { get; set; }

    }
}
