
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
    public class PublicationRepository : Repository<DAL.Models.Publication>, IPublication
    {
        public PublicationRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Publication> GetPublications()
        {
            return _appContext.Publication.Include("MasterCompany").Where(c=>c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.PublicationId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
