using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
   public interface IWorkflowActionRepository : IRepository<WorkflowAction>
    { 
        IEnumerable<WorkflowAction> GetAllWorkflowActionData();
    }
}
