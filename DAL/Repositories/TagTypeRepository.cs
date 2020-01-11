using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class TagTypeRepository : Repository<TagType>, ITagType
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public TagTypeRepository(ApplicationDbContext context) : base(context)
        {
        }
      
        IQueryable<TagType> ITagType.GetAllTagTypeData()
        {
            return _appContext.TagType.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                .OrderByDescending(c => c.TagTypeId).ToList().AsQueryable();
        }
    }
}
