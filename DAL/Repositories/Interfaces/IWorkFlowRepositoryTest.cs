using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IWorkFlowRepositoryTest : IRepository<Workflow>
    {
        Workflow getCompleteWorkFlowEntity(int workFlowId);
        List<Workflow> getAllWorkFlow();
		List<Workflow> getAllWorkFlowById(long workFlowId);

		Workflow getWorkFlowWithMaterialList(int WorkflowId);
    }
}   
    