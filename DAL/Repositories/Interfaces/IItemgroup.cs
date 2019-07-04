using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IItemgroup : IRepository<DAL.Models.Itemgroup>
    {
        IEnumerable<DAL.Models.Itemgroup> GetItemgroups();
        new IQueryable<Itemgroup> GetPaginationData();

        //  void CreateAction(DAL.Models.Action action);

    }
}
