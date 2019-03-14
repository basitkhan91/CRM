using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class StocklineIntegrationPortalViewModel
    {
        public long StocklineIntegrationPortalId { get; set; }

        public long StocklineId { get; set; }
        public Int32? IntegrationPortalId { get; set; }
        public Int32? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsListed { get; set; }
    }
}
 