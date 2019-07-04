using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
 public class DocumentRepository: Repository<DAL.Models.Document>, IDocument
    {
         
        public DocumentRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Document> GetDocuments()
        {
            return _appContext.Document.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.DocumentId).ToList();
        }

        override
        public IQueryable<DAL.Models.Document> GetPaginationData()
        {
            return _appContext.Document.Where(c => (c.IsDelete == false || c.IsDelete == null))
                .OrderByDescending(c => c.DocumentId).ToList().AsQueryable();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
