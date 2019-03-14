using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IBusinessUnit : IRepository<DAL.Models.BusinessUnit>
    {
        IEnumerable<DAL.Models.BusinessUnit> GetAllBusinessUnitData();
    }
}
