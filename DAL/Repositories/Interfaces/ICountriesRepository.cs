using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories
{
   public interface ICountriesRepository : IRepository<Countries>
    {
        IEnumerable<Countries> GetCountries();

    }
   
}
