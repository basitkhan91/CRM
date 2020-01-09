
using System;
using System.Collections.Generic;
using DAL.Models;
using System.Text;
using System.Linq;

namespace DAL.Repositories.Interfaces
{
    public interface IDashNumberRepository : IRepository<DAL.Models.AircraftDashNumber>
    {
        IEnumerable<AircraftDashNumber> GetDashNumbers();
        new IQueryable<AircraftDashNumber> GetPaginationData();
        IEnumerable<object> getDashListByIDS(string Mid, long Tid, string Did);
        IEnumerable<object> GetDashNoByID(string Mid, string Tid);
        IEnumerable<object> GetCapesDashNoByID(string Mid, string Tid);
        IEnumerable<object> getDashListBy_MUTLIIDs(string Mid, string Tid, string Did);
    }
}
