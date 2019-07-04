using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IGlCashFlowRepository : IRepository<DAL.Models.GlClassFlowClassification>
    {
        IEnumerable<DAL.Models.GlClassFlowClassification> GetAllGlCashFlowData();
        new IQueryable<GlClassFlowClassification> GetPaginationData();
    }
}
