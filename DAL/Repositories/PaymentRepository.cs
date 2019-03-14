using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class PaymentRepository : Repository<DAL.Models.Action>, IPayment
    {
        public PaymentRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Action> GetAllPayment()
        {
            return _appContext.Action.Include("MasterCompany").OrderByDescending(c => c.ActionId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}