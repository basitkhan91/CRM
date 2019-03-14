using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  

    public interface IGatecodeRepository : IRepository<DAL.Models.GatecodeClass>
    {
        IEnumerable<DAL.Models.GatecodeClass> getAllGatecodeInfo ();


        //  void CreateAction(DAL.Models.Action action);

    }
}
