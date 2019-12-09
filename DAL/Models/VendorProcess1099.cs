using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class VendorProcess1099
    {        
        [Key]
        public long VendorProcess1099Id { get; set; }
        public long Master1099Id { get; set; }
        public bool IsDefaultCheck { get; set; } 
        public bool IsDefaultRadio { get; set; }       
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
