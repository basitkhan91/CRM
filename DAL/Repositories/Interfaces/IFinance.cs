using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IFinance : IRepository<Vendor>
    {
        IEnumerable<Vendor> GetAllFinanceData();


        //  void CreateAction(DAL.Models.Action action);

    }
}
