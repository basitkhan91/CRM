using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace DAL.Repositories
{
    public class GLAccountCategoriesRepository : Repository<DAL.Models.GLAccountCategories>, IGLAccountCategoriesRepository
    {
        public GLAccountCategoriesRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.GLAccountCategories> GetAllGLAccountCategoriesData()
        {
            var data =_appContext.GLAccountCategory.Include("MasterCompany").Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.GLAccountCategoryName).ToList();
            return data;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}