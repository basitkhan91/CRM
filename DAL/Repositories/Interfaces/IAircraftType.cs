using System;
using System.Collections.Generic;
using DAL.Models;
using System.Text;
using System.Linq;

namespace DAL.Repositories.Interfaces
{
  public interface  IAircraftType : IRepository<AircraftType>
    {
        IEnumerable<AircraftType> getAircraftTypeData();
        IQueryable<AircraftType> GetPaginationData();
    }
}