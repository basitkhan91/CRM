using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public class CustomerAffiliation
    {
        [Key]
        public Int32 ? CustomerAffiliationId { get; set; }
        public string description { get; set; }
    }
}
