
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
    }
}
