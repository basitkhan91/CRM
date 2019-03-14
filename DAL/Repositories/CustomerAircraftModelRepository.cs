using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class CustomerAircraftModelRepository : Repository<DAL.Models.CustomerAircraftModel>, ICustomerAircraftModel
    {
        public CustomerAircraftModelRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.CustomerAircraftModel> GetAllData()
        {
            return _appContext.CustomerAircraftModel.OrderByDescending(c => c.CustomerAircraftModelId).ToList();


        }
        public IEnumerable<object> GetSelectedAircraftModeldata(long id)
        {

            var q =

             from x in _appContext.CustomerAircraftModel
             join ad in _appContext.AircraftModel on x.AircraftModelId equals ad.AircraftModelId
             join at in _appContext.AircraftType on ad.AircraftTypeId equals at.AircraftTypeId
             where x.CustomerId == id


             //                // select new { t, ad, vt }).ToList();
             select new
             {
                 x.AircraftModelId,
                 ad.ModelName,
                 ad.AircraftTypeId,
                 at.Description,
                 ad,
                 x,
                 x.Priority,



             };

            // var data1 = _appContext.ItemMasterAircraftModel.Include("AircraftModel").Where(a=>a.ItemMasterId==id).OrderByDescending(c => c.AircraftModelId).ToList();
            return q;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

