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
    //internal class WorkFlowRepositoryTest : Repository<WorkFlowTable> , IWorkFlowRepositoryTest
    //{
    //    public Application_appContext ReachContext { 
    //        get { return _appContext as ReachContext; } 
    //    }

    //    public WorkFlowRepositoryTest(ReachContext _context)
    //        :base(_context){

    //    }

    public class WorkFlowRepositoryTest : Repository<DAL.Models.Workflow>, IWorkFlowRepositoryTest
    {
        public WorkFlowRepositoryTest(ApplicationDbContext context) : base(context)
        { }

        public Workflow getWorkFlowWithChildren(int WorkflowId)
        {

            var workFlow = _appContext.Set<Workflow>().Where(x => x.WorkflowId == WorkflowId).FirstOrDefault();

            if(workFlow != null)
            {
                workFlow.Charges = _appContext.Set<WorkflowChargesList>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null  || x.IsDelete != true) ).ToList();
                workFlow.Directions = _appContext.Set<WorkFlowDirection>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).ToList();
                workFlow.Equipments = _appContext.Set<WorkflowEquipmentList>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).ToList();
                workFlow.Exclusions = _appContext.Set<WorkFlowExclusion>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).ToList();
                workFlow.Expertise = _appContext.Set<WorkflowExpertiseList>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).ToList();
                workFlow.MaterialList = _appContext.Set<WorkflowMaterial>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).ToList();
                workFlow.Measurements = _appContext.Set<WorkflowMeasurement>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).ToList();
                workFlow.Publication = _appContext.Set<Publications>().Where(x => x.WorkflowId == WorkflowId && (x.IsDeleted == null || x.IsDeleted.Value != true)).ToList();

            }
            else
            {
                return null;
            }

           
            return workFlow;
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
    