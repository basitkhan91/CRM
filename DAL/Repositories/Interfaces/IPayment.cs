using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IPayment : IRepository<DAL.Models.Action>
    {
        IEnumerable<DAL.Models.Action> GetAllPayment();

        

        //  void CreateAction(DAL.Models.Action action);

    }
}