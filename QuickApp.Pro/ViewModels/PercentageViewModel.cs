using DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class PercentageViewModel: IAudit
    {
        [Key]
        public long PercentId { get; set; }
        public decimal PercentValue { get; set; }

        [ForeignKey("MasterCompanyId")]

        public int MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
