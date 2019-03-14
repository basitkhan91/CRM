using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IItemgroup : IRepository<DAL.Models.Itemgroup>
    {
        IEnumerable<DAL.Models.Itemgroup> GetItemgroups();


        //  void CreateAction(DAL.Models.Action action);

    }
}
