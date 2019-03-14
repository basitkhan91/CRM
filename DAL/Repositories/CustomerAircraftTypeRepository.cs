
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DAL.Repositories
{
    public class CustomerAircraftTypeRepository : Repository<DAL.Models.CustomerAircraftType>, ICustomerAircraftType
    {
        public CustomerAircraftTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.CustomerAircraftType> GetAllData()
        {
            return _appContext.CustomerAircraftType.OrderByDescending(c => c.CustomerAircraftTypeId).ToList();


        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}