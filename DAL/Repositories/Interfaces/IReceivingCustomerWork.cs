using DAL.Common;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  
    
    public interface IReceivingCustomerWork : IRepository<DAL.Models.ReceivingCustomerWork>
    {
        IEnumerable<object> GetAllreceivingCustomerWork();
        IEnumerable<Object> GetList(Filters<ReceivingCustomerWorkFilter> customerFilters);

        IEnumerable<object> GetAllreceivingCustomerWorkAudit(long receivingCustomerWorkId);
        object GetreceivingCustomerWorkById(long receivingCustomerWorkId);
        IEnumerable<object> GetAllTimeLifeData(long id);
        void DeleteReceivingCustomer(long id, string updatedBy);
        IEnumerable<object> GetReceivingCustomerWorkData(long receivingCustomerWorkId);
        IEnumerable<Object> GetListGlobalFilter(string value, int pageNumber, int pageSize);

        ReceivingCustomerWork CreateReceivingCustomer(ReceivingCustomerWork receivingCustomer);
        ReceivingCustomerWork UpdateReceivingCustomer(ReceivingCustomerWork receivingCustomer);
        object GetPartDettails(long itemMasterId);

    }
}
