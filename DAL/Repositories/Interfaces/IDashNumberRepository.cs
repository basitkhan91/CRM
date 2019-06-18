
using System;
using System.Collections.Generic;
using DAL.Models;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IDashNumberRepository : IRepository<DAL.Models.AircraftDashNumber>
    {
        IEnumerable<AircraftDashNumber> GetDashNumbers();
    }
}
