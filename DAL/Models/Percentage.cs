using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    /// <summary>
    /// Class representing percentage
    /// </summary>
    public class Percentage : PasBase, IAudit
    {
        [Key]
        public long PercentId { get; set; }

        public decimal PercentValue { get; set; }  
   
        public bool? IsActive { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
