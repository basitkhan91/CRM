using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IWorkFlowRepositoryTest : IRepository<Workflow>
    {
        Workflow getWorkFlowWithChildren(int workFlowId);
    }
}   
    