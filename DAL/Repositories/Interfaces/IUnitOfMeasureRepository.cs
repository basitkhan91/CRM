using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{

    public interface IUnitOfMeasureRepository : IRepository<UnitOfMeasure>
    {
        IEnumerable<UnitOfMeasure> getUnitOfMeasureData();
       new IQueryable<UnitOfMeasure> GetPaginationData();

        //  void CreateAction(DAL.Models.Action action);

    }
}

