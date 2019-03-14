using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface ILaborAndOverheadCostRepository : IRepository<DAL.Models.LaborOverloadCost>
    {
        IEnumerable<DAL.Models.LaborOverloadCost> GetAllGLLaborAndOverheadCostData();

    }
}