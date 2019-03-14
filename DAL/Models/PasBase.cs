using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class PasBase
    {
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
