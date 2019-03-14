using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Part
    {
        [Key]
        public long PartId { get; set; }

        public string PartNumber { get; set; }
        //public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }
        public string Description { get; set; }

        public string Manufacturer { get; set; }

       
        public string Comments { get; set; }


        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public string ParentPartId { get; set; }

    }
}
