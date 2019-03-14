using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class StocklineIntegrationPortal : PasBase
    {
        public long StocklineIntegrationPortalId { get; set; }
         
        public long StocklineId { get; set; }
        public Int32? IntegrationPortalId { get; set; }
        public Int32? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsListed { get; set; }

        
    }
}
