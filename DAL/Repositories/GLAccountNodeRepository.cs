using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class GLAccountNodeRepository : Repository<DAL.Models.GLAccountNode>, IGLAccountNodeRepository
    {
        public GLAccountNodeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.GLAccountNode> GetAllGLAccount()
        {
            return _appContext.GLAccountNode.Include("ParentNode").Where(c => c.IsDelete == false)
                .OrderByDescending(c => c.GLAccountNodeId).ToList();

        }

        public IEnumerable<DAL.Models.GLAccountNode> GetAllGLAccountLeafNode()
        {
            return _appContext.GLAccountNode.Include("ParentNode").Where(c => c.IsDelete == false && c.LeafNodeCheck ==true && c.IsActive == true)
                .OrderByDescending(c => c.GLAccountNodeId).ToList();

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}

