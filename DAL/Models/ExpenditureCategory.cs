using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DAL.Core;

namespace DAL.Models
{
    public class ExpenditureCategory : PasBase
    {
        [Key]
        public long ExpenditureCategoryId { get; set; }

        public string Description { get; set; }
        public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }
        [NotMapped]
        public UploadTag UploadTag { get; set; }
    }
}
