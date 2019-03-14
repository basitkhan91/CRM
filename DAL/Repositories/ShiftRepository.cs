using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class ShiftRepository : Repository<shift>, IShiftRepository
    {
        public ShiftRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.shift> Getshift()
        {
            //return _appContext.ActionAttribute.Include("MasterCompany").OrderByDescending(c => c.ActionAttributeId).ToList();
            return _appContext.Shift.OrderByDescending(c => c.ShiftId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

    