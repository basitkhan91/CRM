using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace DAL.Repositories
{
    public class WorkOrderStageRepository : Repository<WorkOrderStage>, IWorkOrderStageRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public WorkOrderStageRepository(ApplicationDbContext context) : base(context)
        {
        }

        public WorkOrderStage CreateWorkOrderStage(WorkOrderStage workOrderStage)
        {
            try
            {
                workOrderStage.CreatedDate = workOrderStage.UpdatedDate = DateTime.Now;
                workOrderStage.IsActive = true;
                workOrderStage.IsDeleted = false;
                _appContext.WorkOrderStage.Add(workOrderStage);
                _appContext.SaveChanges();
                return workOrderStage;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderStage UpdateWorkOrderStage(WorkOrderStage workOrderStage)
        {
            try
            {
                workOrderStage.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderStage.Add(workOrderStage);
                _appContext.SaveChanges();
                return workOrderStage;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<object> WorkOrderStageList()
        {
            

            try
            {

                var totalRecords = (from stage in _appContext.WorkOrderStage
                                    join status in _appContext.WorkOrderStatus on stage.StatusId equals status.Id
                                    where stage.IsDeleted == false
                                    select new
                            {
                                stage.WorkOrderStageId
                            }).Distinct().Count();
                

                var list = (from stage in _appContext.WorkOrderStage
                            join status in _appContext.WorkOrderStatus on stage.StatusId equals status.Id
                            where stage.IsDeleted==false
                            select new
                            {

                                stage.Code,
                                stage.CreatedBy,
                                stage.CreatedDate,
                                stage.Description,
                                stage.IsActive,
                                stage.IsDeleted,
                                stage.ManagementStructureId,
                                stage.MasterCompanyId,
                                stage.Memo,
                                stage.Sequence,
                                stage.Stage,
                                stage.StatusId,
                                Status = status.Description,
                                stage.UpdatedBy,
                                stage.UpdatedDate,
                                stage.WorkOrderStageId,
                                TotalRecords= totalRecords

                            }).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderStage(long workOrderStageId, string updatedBy)
        {
            try
            {
                WorkOrderStage workOrderStage = new WorkOrderStage();
                workOrderStage.WorkOrderStageId = workOrderStage.WorkOrderStageId;

                workOrderStage.IsDeleted = true;
                workOrderStage.UpdatedBy = workOrderStage.UpdatedBy;
                workOrderStage.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderStage.Attach(workOrderStage);

                _appContext.Entry(workOrderStage).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderStage).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderStage).Property(p => p.UpdatedDate).IsModified = true;
                
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void WorkOrderStageStatus(long workOrderStageId, bool status, string updatedBy)
        {
            try
            {
                WorkOrderStage workOrderStage = new WorkOrderStage();
                workOrderStage.WorkOrderStageId = workOrderStage.WorkOrderStageId;

                workOrderStage.IsActive = status;
                workOrderStage.UpdatedBy = workOrderStage.UpdatedBy;
                workOrderStage.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderStage.Attach(workOrderStage);

                _appContext.Entry(workOrderStage).Property(p => p.IsActive).IsModified = true;
                _appContext.Entry(workOrderStage).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderStage).Property(p => p.UpdatedDate).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object WorkOrderStageById(long workOrderStageId)
        {
            try
            {
                var data = (from stage in _appContext.WorkOrderStage
                            join status in _appContext.WorkOrderStatus on stage.StatusId equals status.Id
                            where stage.WorkOrderStageId==workOrderStageId
                            select new
                            {

                                stage.Code,
                                stage.CreatedBy,
                                stage.CreatedDate,
                                stage.Description,
                                stage.IsActive,
                                stage.IsDeleted,
                                stage.ManagementStructureId,
                                stage.MasterCompanyId,
                                stage.Memo,
                                stage.Sequence,
                                stage.Stage,
                                stage.StatusId,
                                Status = status.Description,
                                stage.UpdatedBy,
                                stage.UpdatedDate,
                                stage.WorkOrderStageId

                            }).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
