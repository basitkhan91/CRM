using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public partial class ClassificationMapping
    {
        [Key]
        public long ClassificationMappingId { get; set; }
        public int ModuleId { get; set; }
        public long ReferenceId { get; set; }
        public long ClasificationId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        //public long CustomerId { get; set; }

        [NotMapped]
        public string Description { get; set; }
    }
}
