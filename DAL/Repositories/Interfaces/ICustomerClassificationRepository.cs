using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
   public interface ICustomerClassificationRepository : IRepository<DAL.Models.CustomerClassification>
    {
        IEnumerable<DAL.Models.CustomerClassification> GetAllCustomerClassificationData();
    }
}
