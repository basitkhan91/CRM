using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class StocklineIntegrationPortal : PasBase
    {
        [Key]
        public long StocklineIntegrationPortalId { get; set; }
         [ForeignKey("StocklineId")]
        public long StocklineId { get; set; }
        [ForeignKey("IntegrationPortalId")]
        public int IntegrationPortalId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public int MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsListed { get; set; }
    }
}
