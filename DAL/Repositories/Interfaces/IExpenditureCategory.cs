using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{

    public interface IExpenditureCategory : IRepository<DAL.Models.ExpenditureCategory>
    {
        IEnumerable<DAL.Models.ExpenditureCategory> getAllExpenditureCategoryInfo();


        //  void CreateAction(DAL.Models.Action action);

    }
}

