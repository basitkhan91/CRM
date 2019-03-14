using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
  public  class ReceivingCustomerWorkRepository : Repository<DAL.Models.ReceivingCustomerWork>, IReceivingCustomerWork
    {
        public ReceivingCustomerWorkRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.ReceivingCustomerWork> GetAllreceivingCustomerWork()
        {
            return _appContext.ReceivingCustomerWork.OrderByDescending(c => c.ReceivingCustomerWorkId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
