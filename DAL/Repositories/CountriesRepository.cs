using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
   public class CountriesRepository : Repository<Countries>, ICountriesRepository
    {
        public CountriesRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Countries> GetCountries()
        {
            //return _appContext.ActionAttribute.Include("MasterCompany").OrderByDescending(c => c.ActionAttributeId).ToList();
            return _appContext.Countries.OrderBy(c => c.countries_id).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

    
