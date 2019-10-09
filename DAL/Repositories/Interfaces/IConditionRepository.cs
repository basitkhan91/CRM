using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IConditionRepository : IRepository<Condition>
    {
        IEnumerable<Condition> GetAllConditionData();
        IEnumerable<DAL.Models.ConditionAudit > GetAuditDetails(long conditionId);
    }
}
