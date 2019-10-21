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

        //  void CreateAction(DAL.Models.Action action);

    }
}
