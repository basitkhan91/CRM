using DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ManufacturerViewModel
    {
        [Key]
        public long ManufacturerId { get; set; }

        public string Name { get; set; }
        //public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }
        public string Comments { get; set; }
        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

    }
}
