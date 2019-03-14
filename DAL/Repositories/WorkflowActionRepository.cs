using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Repositories.Interfaces;
namespace DAL.Repositories
{
   public class WorkflowActionRepository : Repository<WorkflowAction>, IWorkflowActionRepository
    {
        public WorkflowActionRepository(ApplicationDbContext context) : base(context)
        { }



        public IEnumerable<WorkflowAction> GetAllWorkflowActionData()
        {
            return _appContext.WorkflowAction.OrderBy(c => c.Description).ToList();
        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
