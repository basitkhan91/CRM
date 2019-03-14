using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IGlCashFlowRepository : IRepository<DAL.Models.GlClassFlowClassification>
    {
        IEnumerable<DAL.Models.GlClassFlowClassification> GetAllGlCashFlowData();
    }
}
