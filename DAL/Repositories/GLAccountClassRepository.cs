using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;


namespace DAL.Repositories
{
   public class GLAccountClassRepository : Repository<DAL.Models.GLAccountClass>, IGLAccountClassRespository
    {
        public GLAccountClassRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Models.GLAccountClass> GetAllGLAccountClassData()
        {
            return _appContext.GLAccountClass.Include("MasterCompany").Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.GLAccountClassId).ToList();
           
        }
        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
