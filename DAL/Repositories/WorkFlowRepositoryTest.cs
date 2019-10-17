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
    public class WorkFlowRepositoryTest : Repository<DAL.Models.Workflow>, IWorkFlowRepositoryTest
    {
        public WorkFlowRepositoryTest(ApplicationDbContext context) : base(context)
        { }

        public Workflow getCompleteWorkFlowEntity(int WorkflowId)
        {
            var workFlow = _appContext.Set<Workflow>().Include("ItemMaster").Include("WorkScope").Include("Customer").Where(x => x.WorkflowId == WorkflowId).FirstOrDefault();

            if (workFlow != null)
            {
                workFlow.Charges = _appContext.Set<WorkflowChargesList>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete != true)).OrderBy(x => x.WorkflowChargesListId).ToList();
                workFlow.Directions = _appContext.Set<WorkFlowDirection>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowDirectionId).ToList();
                workFlow.Equipments = _appContext.Set<WorkflowEquipmentList>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowEquipmentListId).ToList();
                workFlow.Exclusions = _appContext.Set<WorkFlowExclusion>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowExclusionId).ToList();
                workFlow.Expertise = _appContext.Set<WorkflowExpertiseList>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowExpertiseListId).ToList();
                workFlow.MaterialList = _appContext.Set<WorkflowMaterial>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowActionId).ToList();
                workFlow.Measurements = _appContext.Set<WorkflowMeasurement>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowMeasurementId).ToList();
                workFlow.Publication = _appContext.Set<Publications>().Where(x => x.WorkflowId == WorkflowId && (x.IsDeleted == null || x.IsDeleted.Value != true)).OrderBy(x => x.Id).ToList();
                workFlow.Publication.ForEach(publ =>
                {
                    publ.WorkflowPublicationDashNumbers = _appContext.WorkflowPublicationDashNumber.Where(x => x.PublicationsId == publ.Id).ToList();
                    
                });
            }
            else
            {
                return null;
            }
            return workFlow;
        }

        public List<Workflow> getAllWorkFlow()
        {
            return _appContext.Workflow.Include("ItemMaster").Include("WorkScope").Include("Customer").Where(workflow => workflow.IsDelete == null || workflow.IsDelete != true).OrderByDescending(x => x.WorkflowId).ToList();
        }

        public Workflow getWorkFlowWithMaterialList(int WorkflowId)
        {
            var workFlow = _appContext.Set<Workflow>().Include("ItemMaster").Include("WorkScope").Include("Customer").Where(x => x.WorkflowId == WorkflowId).FirstOrDefault();

            if (workFlow == null)
            {
                return null;
            }

            workFlow.MaterialList = _appContext.Set<WorkflowMaterial>().Where(x => x.WorkflowId == WorkflowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowActionId).ToList();
            return workFlow;
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
