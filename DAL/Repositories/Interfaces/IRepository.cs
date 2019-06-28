// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        void Add(TEntity entity);
        void AddRange(IEnumerable<TEntity> entities);

        void Update(TEntity entity);
        void UpdateRange(IEnumerable<TEntity> entities);

        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entities);

        int Count();

        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
        TEntity GetSingleOrDefault(Expression<Func<TEntity, bool>> predicate);
        
        TEntity Get(int id);
        IEnumerable<TEntity> GetAll();
        IQueryable<TEntity> GetPaginationData();
        //TResult GetFirstOrDefault<TResult>(Expression<Func<TEntity, TResult>> selector,
        //                                 Expression<Func<TEntity, bool>> predicate = null,
        //                                 Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
        //                                 Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
        //                                 bool disableTracking = true);
    }

}
