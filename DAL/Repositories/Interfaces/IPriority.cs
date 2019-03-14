

using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{


    public interface IPriority : IRepository<DAL.Models.Priority>
    {
        IEnumerable<DAL.Models.Priority> GetPriorities();


        //  void CreateAction(DAL.Models.Action action);

    }
}
