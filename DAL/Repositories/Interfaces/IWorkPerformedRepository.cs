using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces 
{
    public interface IWorkPerformedRepository : IRepository<WorkPerformed>
    {
        IEnumerable<WorkPerformed> GetAllWorkPerformedData();
        IEnumerable<WorkPerformedAudit> GetWorkPerformedHistory(long workPerformedId);
    }
}
