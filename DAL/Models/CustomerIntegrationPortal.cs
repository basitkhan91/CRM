using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public class CustomerIntegrationPortal
    {
 
        public long CustomerIntegrationPortalId { get; set; }

        public long CustomerId { get; set; }

        public int IntegrationPortalId { get; set; }

        public int MasterCompanyId { get; set; }

        
        public string CreatedBy { get; set; }

        
        public string UpdatedBy { get; set; }

      
        public DateTime CreatedDate { get; set; }

      
        public DateTime UpdatedDate { get; set; }

        public bool IsActive { get; set; } = true;

        //public virtual Customer Customer { get; set; }
    }
}
