
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
        public class AccountingCalendarRepository : Repository<DAL.Models.AccountingCalendar>, IAccountingCalendar
    {
            public AccountingCalendarRepository(ApplicationDbContext context) : base(context)
            { }

            public IEnumerable<DAL.Models.AccountingCalendar> GetAllAccountingCalendar()
            {
                return _appContext.AccountingCalendar.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderByDescending(c => c.AccountingCalendarId).ToList();
            }


            //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

            private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        }
    }

