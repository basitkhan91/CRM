using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
   
    public interface IIntegration : IRepository<DAL.Models.IntegrationPortal>
    {
        IEnumerable<DAL.Models.IntegrationPortal> getIntegrationData (int id);


        //  void CreateAction(DAL.Models.Action action);

    }
}
