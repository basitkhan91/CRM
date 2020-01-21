using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
namespace DAL.Repositories.Interfaces
{
   
    public interface IIntegration : IRepository<IntegrationPortal>
    {
        IEnumerable<IntegrationPortal> getIntegrationData (int id);
        IEnumerable<IntegrationPortal> GetIntegrationLite();
        IEnumerable<IntegrationPortal> getIntegrationAllData();

        
        IEnumerable<DAL.Models.IntegrationPortalAudit> GetIntegrationPortalAuditDetails(long integrationPortalId);

        //  void CreateAction(DAL.Models.Action action);

    }
}
