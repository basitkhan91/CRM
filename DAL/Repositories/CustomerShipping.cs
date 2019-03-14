using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
   public class CustomerShippingRepository:Repository<CustomerShipping>, ICustomerShipping
    {

        

    
        public CustomerShippingRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<CustomerShipping> GetAllCustomerShipping()
        {
           return _appContext.CustomerShipping.OrderByDescending(c => c.CustomerShippingId).ToList();
           
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
