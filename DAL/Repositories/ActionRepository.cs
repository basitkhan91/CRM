using DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Model = DAL.Models;
namespace DAL.Repositories
{
      public class ActionRepository : Repository<DAL.Models.Task>, IActionRepository
    {
        public ActionRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Model.Task> GetAllTask()
        {
            var task =_appContext.Task.Include("MasterCompany").Where(a => a.IsDelete==false || a.IsDelete==null).OrderByDescending(a => a.TaskId).ToList();
            return task;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
