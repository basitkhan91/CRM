using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IPercentageRepository:IRepository<Percentage>
    {
        IEnumerable<Percentage> GetPercentages();
    }
}
