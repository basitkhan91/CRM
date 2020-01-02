using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  
    
    public interface IReceivingCustomerWork : IRepository<DAL.Models.ReceivingCustomerWork>
    {
        IEnumerable<object> GetAllreceivingCustomerWork();
        IEnumerable<object> GetAllreceivingCustomerWorkAudit(long receivingCustomerWorkId);
        IEnumerable<object> GetreceivingCustomerWorkById(long receivingCustomerWorkId);
        IEnumerable<object> GetAllTimeLifeData(long id);

        //  void CreateAction(DAL.Models.Action action);

    }
}
