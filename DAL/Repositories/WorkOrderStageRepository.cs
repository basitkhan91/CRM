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

        public IEnumerable<object> WorkOrderStageList(Filters<WorkOrderStageFilters> woFilters)
        {
            long statusId = 0;

            var open = "open";
            var canceled = "canceled";
            var closed = "closed";
            var all = "all";

            if (!string.IsNullOrEmpty(woFilters.filters.Status))
            {
                if (open.Contains(woFilters.filters.Status.ToLower()))
                {
                    statusId = 1;
                }
                else if (canceled.Contains(woFilters.filters.Status.ToLower()))
                {
                    statusId = 3;
                }

                else if (closed.Contains(woFilters.filters.Status.ToLower()))
                {
                    statusId = 2;
                }
                else if (all.Contains(woFilters.filters.Status.ToLower()))
                {
                    statusId = 0;
                }
            }

            if (woFilters.filters.ManagementStructureId == null)
                woFilters.filters.ManagementStructureId = 0;
            if (woFilters.filters.Sequence == null)
                woFilters.filters.Sequence = 0;

            try
            {

                var totalRecords = (from stage in _appContext.WorkOrderStage
                            join status in _appContext.WorkOrderStatus on stage.StatusId equals status.Id
                            where stage.IsDeleted == false
                            && stage.Code.Contains(!String.IsNullOrEmpty(woFilters.filters.Code) ? woFilters.filters.Code : stage.Code)
                            && stage.Description.Contains(!String.IsNullOrEmpty(woFilters.filters.Description) ? woFilters.filters.Description : stage.Description)
                            && stage.ManagementStructureId == (woFilters.filters.ManagementStructureId > 0 ? woFilters.filters.ManagementStructureId : stage.ManagementStructureId)
                            && stage.Memo.Contains(!String.IsNullOrEmpty(woFilters.filters.Memo) ? woFilters.filters.Memo : stage.Memo)
                            && stage.Sequence == (woFilters.filters.Sequence > 0 ? woFilters.filters.Sequence : stage.Sequence)
                            && stage.Stage.Contains(!String.IsNullOrEmpty(woFilters.filters.Stage) ? woFilters.filters.Stage : stage.Stage)
                            && stage.StatusId == (statusId > 0 ? statusId : stage.StatusId)
                            select new
                            {
                                stage.WorkOrderStageId

                            }).Distinct().Count();
                

                var list = (from stage in _appContext.WorkOrderStage
                            join status in _appContext.WorkOrderStatus on stage.StatusId equals status.Id
                            where stage.IsDeleted==false
                            && stage.Code.Contains(!String.IsNullOrEmpty(woFilters.filters.Code) ? woFilters.filters.Code : stage.Code)
                            && stage.Description.Contains(!String.IsNullOrEmpty(woFilters.filters.Description) ? woFilters.filters.Description : stage.Description)
                            && stage.ManagementStructureId == (woFilters.filters.ManagementStructureId > 0 ? woFilters.filters.ManagementStructureId : stage.ManagementStructureId)
                            && stage.Memo.Contains(!String.IsNullOrEmpty(woFilters.filters.Memo) ? woFilters.filters.Memo : stage.Memo)
                            && stage.Sequence == (woFilters.filters.Sequence > 0 ? woFilters.filters.Sequence : stage.Sequence)
                            && stage.Stage.Contains(!String.IsNullOrEmpty(woFilters.filters.Stage) ? woFilters.filters.Stage : stage.Stage)
                            && stage.StatusId == (statusId > 0 ? statusId : stage.StatusId)
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



                if (woFilters.SortOrder.HasValue && !string.IsNullOrEmpty(woFilters.SortField))
                {
                    if (woFilters.SortOrder == -1)
                    {
                        switch (woFilters.SortField)
                        {
                            case "code":
                                return list.OrderByDescending(p => p.Code).ToList();
                            case "description":
                                return list.OrderByDescending(p => p.Description).ToList();
                            case "managementStructureId":
                                return list.OrderByDescending(p => p.ManagementStructureId).ToList();
                            case "memo":
                                return list.OrderByDescending(p => p.Memo).ToList();
                            case "sequence":
                                return list.OrderByDescending(p => p.Sequence).ToList();
                            case "stage":
                                return list.OrderByDescending(p => p.Stage).ToList();
                            case "status":
                                return list.OrderByDescending(p => p.Status).ToList();
                        }
                    }
                    else
                    {
                        switch (woFilters.SortField)
                        {
                            case "code":
                                return list.OrderBy(p => p.Code).ToList();
                            case "description":
                                return list.OrderBy(p => p.Description).ToList();
                            case "managementStructureId":
                                return list.OrderBy(p => p.ManagementStructureId).ToList();
                            case "memo":
                                return list.OrderBy(p => p.Memo).ToList();
                            case "sequence":
                                return list.OrderBy(p => p.Sequence).ToList();
                            case "stage":
                                return list.OrderBy(p => p.Stage).ToList();
                            case "status":
                                return list.OrderBy(p => p.Status).ToList();
                        }
                    }
                }

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
