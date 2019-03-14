using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class ItemClassfication
    {
        [Key]
        public long ItemClassificationId { get; set; }

        public string ItemClassificationCode { get; set; }

        public string Description { get; set; }

        public string ItemType { get; set; }
        public string Memo { get; set; }



        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
        public bool? IsDelete { get; set; }

    }
}
