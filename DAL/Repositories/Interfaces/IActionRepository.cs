using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IActionRepository : IRepository<DAL.Models.Action>
    {
        IEnumerable<DAL.Models.Action> GetAllActionData();


      //  void CreateAction(DAL.Models.Action action);
       
    }
}
