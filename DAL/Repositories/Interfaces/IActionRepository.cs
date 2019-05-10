using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IActionRepository : IRepository<DAL.Models.Task>
    {
        IEnumerable<DAL.Models.Task> GetAllTask();


      //  void CreateAction(DAL.Models.Action action);
       
    }
}
