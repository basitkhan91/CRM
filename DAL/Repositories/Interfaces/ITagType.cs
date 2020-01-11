using System.Linq;

namespace DAL.Repositories.Interfaces
{
    public interface ITagType: IRepository<Models.TagType>
    {
        IQueryable<Models.TagType> GetAllTagTypeData();
    }
}
