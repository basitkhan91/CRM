using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class DiscountRepository : Repository<DAL.Models.DiscountModel>, IDiscountRepository
    {
        public DiscountRepository(ApplicationDbContext context) :base(context)
        { }

        public IEnumerable<Models.DiscountModel> GetAllDiscountData()
        {
            return _appContext.Discount.OrderByDescending(a => a.DiscountId).ToList();

        }
        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }


}
