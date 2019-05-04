using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class POROCategory : PasBase, IAudit
    {
        [Key]
        public long? POROCategoryId { get; set; }
        public string CategoryName { get; set; }
        public bool? IsPO { get; set; }
        public bool? IsRO { get; set; }
        public Int32 MasterCompanyId { get; set; }     
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }

    }
}
