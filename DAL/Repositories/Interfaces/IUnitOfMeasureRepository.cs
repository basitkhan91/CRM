using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{

    public interface IUnitOfMeasureRepository : IRepository<UnitOfMeasure>
    {
        IEnumerable<UnitOfMeasure> getUnitOfMeasureData();


        //  void CreateAction(DAL.Models.Action action);

    }
}

