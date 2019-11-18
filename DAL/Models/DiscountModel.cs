using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class DiscountModel
     {
       [Key]
        public long DiscountId { get; set; }

        public decimal DiscontValue { get; set; }

        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }




    }
}
