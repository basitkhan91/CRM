using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  
    
    public interface IReceivingCustomerWork : IRepository<DAL.Models.ReceivingCustomerWork>
    {
        IEnumerable<object> GetAllreceivingCustomerWork();
        IEnumerable<object> GetAllTimeLifeData(long id);

        //  void CreateAction(DAL.Models.Action action);

    }
}
