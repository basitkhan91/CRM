using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IPercentageRepository:IRepository<DAL.Models.Percentage>
    {
        IEnumerable<Percentage> GetPercentages();

        IEnumerable<PercentageAudit> GetpercentageAuditDetails(long Id);
    }
}
