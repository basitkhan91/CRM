using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
   public class DiscountModel
     {
       [Key]
        public long DiscountId { get; set; }

        public string DiscontValue { get; set; }

        
    }
}
