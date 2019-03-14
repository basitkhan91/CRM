using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class CustomerTypeRepository : Repository<CustomerType>, ICustomerType
    {
        public CustomerTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<CustomerType> GetCustomerTypes()
        {
           
            return _appContext.CustomerType.OrderByDescending(c => c.CustomerTypeId).ToList();
        }


       

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}


