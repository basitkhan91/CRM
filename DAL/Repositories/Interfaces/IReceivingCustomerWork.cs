using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  
    
    public interface IReceivingCustomerWork : IRepository<DAL.Models.ReceivingCustomerWork>
    {
        IEnumerable<DAL.Models.ReceivingCustomerWork> GetAllreceivingCustomerWork();


        //  void CreateAction(DAL.Models.Action action);

    }
}
