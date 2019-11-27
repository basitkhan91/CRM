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

        IEnumerable<DAL.Models.ItemgroupAudit> GetItemGroupAuditDetails(long itemGroupId);

        //  void CreateAction(DAL.Models.Action action);

    }
}
