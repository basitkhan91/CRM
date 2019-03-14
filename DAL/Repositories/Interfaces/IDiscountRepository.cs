using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
namespace DAL.Repositories.Interfaces
{
    public interface IDiscountRepository : IRepository<DAL.Models.DiscountModel>
    {
        IEnumerable<DAL.Models.DiscountModel> GetAllDiscountData();

    
    }
}
