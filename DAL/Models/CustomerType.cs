using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class CustomerType
    {
        public int? CustomerTypeId { get; set; }
        public string Description { get; set; }
        public int MasterCompanyId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
