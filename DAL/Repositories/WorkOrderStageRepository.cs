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
                            where stage.IsDeleted == false
                            select new WOStageFilters()
                            {

                                Code = stage.Code,
                                CreatedDate = stage.CreatedDate,
                                Description = stage.Description,
                                IsActive = stage.IsActive,
                                ManagementStrId = stage.ManagementStructureId,
                                Memo = stage.Memo,
                                Sequence = stage.Sequence,
                                Stage = stage.Stage,
                                StatusId = stage.StatusId,
                                Status = status.Description,
                                UpdatedBy = stage.UpdatedBy,
                                WorkOrderStageId = stage.WorkOrderStageId,
                                TotalRecords = totalRecords

                            }).Distinct().ToList();

                if (list != null && list.Count() > 0)
                {
                    string level1 = string.Empty;
                    string level2 = string.Empty;
                    string level3 = string.Empty;
                    string level4 = string.Empty;

                    foreach (var item in list)
                    {
                        level1 = string.Empty;
                        level2 = string.Empty;
                        level3 = string.Empty;
                        level4 = string.Empty;

                        var mngInfoList = GetManagementStructureCodes(item.ManagementStrId);
                        if (mngInfoList != null && mngInfoList.Count > 0)
                        {
                            if (mngInfoList.Any(p => p.Level1 == "Level1"))
                            {
                                item.LevelId1 = mngInfoList.Where(p=>p.Level1=="Level1").FirstOrDefault().LevelId1;
                                item.LevelCode1 = mngInfoList.Where(p => p.Level1 == "Level1").FirstOrDefault().LevelCode1;
                                item.Level1 = "Level1";
                            }
                            else
                            {
                                item.LevelId1 = 0;
                                item.LevelCode1 ="";
                                item.Level1 = "";
                            }

                            if (mngInfoList.Any(p => p.Level2 == "Level2"))
                            {
                                item.LevelId2 = mngInfoList.Where(p => p.Level2 == "Level2").FirstOrDefault().LevelId2;
                                item.LevelCode2 = mngInfoList.Where(p => p.Level2 == "Level2").FirstOrDefault().LevelCode2;
                                item.Level2 = "Level2";
                            }
                            else
                            {
                                item.LevelId2 = 0;
                                item.LevelCode2 = "";
                                item.Level2 = "";
                            }

                            if (mngInfoList.Any(p => p.Level3 == "Level3"))
                            {
                                item.LevelId3 = mngInfoList.Where(p => p.Level3 == "Level3").FirstOrDefault().LevelId3;
                                item.LevelCode3 = mngInfoList.Where(p => p.Level3 == "Level3").FirstOrDefault().LevelCode3;
                                item.Level3 = "Level3";
                            }
                            else
                            {
                                item.LevelId3 = 0;
                                item.LevelCode3 = "";
                                item.Level3 = "";
                            }

                            if (mngInfoList.Any(p => p.Level4 == "Level4"))
                            {
                                item.LevelId4 = mngInfoList.Where(p => p.Level4 == "Level4").FirstOrDefault().LevelId4;
                                item.LevelCode4 = mngInfoList.Where(p => p.Level4 == "Level4").FirstOrDefault().LevelCode4;
                                item.Level4 = "Level4";
                            }
                            else
                            {
                                item.LevelId4 = 0;
                                item.LevelCode4 = "";
                                item.Level4 = "";
                            }
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
                            where stage.WorkOrderStageId == workOrderStageId
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

        private List<MangStructureInfo> GetManagementStructureCodes(long manmgStrucId)
        {
            List<MangStructureInfo> mngInfoList = new List<MangStructureInfo>();
            MangStructureInfo mangStructureInfo = null;
            ManagementStructure level4 = null;
            ManagementStructure level3 = null;
            ManagementStructure level2 = null;
            ManagementStructure level1 = null;
            string level1Code = string.Empty;
            try
            {
                level4 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == manmgStrucId).AsNoTracking().FirstOrDefault();
                if (level4 != null && level4.ParentId > 0)
                {
                    level3 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level4.ParentId).AsNoTracking().FirstOrDefault();
                }
                if (level3 != null && level3.ParentId > 0)
                {
                    level2 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level3.ParentId).AsNoTracking().FirstOrDefault();
                }
                if (level2 != null && level2.ParentId > 0)
                {
                    level1 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level2.ParentId).AsNoTracking().FirstOrDefault();
                }


                if (level4 != null && level3 != null && level2 != null && level1 != null)
                {
                    mangStructureInfo = new MangStructureInfo();

                    mangStructureInfo.Level1 = "Level1";
                    mangStructureInfo.LevelCode1 = level1.Code;
                    mangStructureInfo.LevelId1 = level1.ManagementStructureId;

                    mangStructureInfo.Level2 = "Level2";
                    mangStructureInfo.LevelCode2 = level2.Code;
                    mangStructureInfo.LevelId2 = level2.ManagementStructureId;

                    mangStructureInfo.Level3 = "Level3";
                    mangStructureInfo.LevelCode3 = level3.Code;
                    mangStructureInfo.LevelId3 = level3.ManagementStructureId;

                    mangStructureInfo.Level4 = "Level4";
                    mangStructureInfo.LevelCode4 = level4.Code;
                    mangStructureInfo.LevelId4 = level4.ManagementStructureId;

                    mngInfoList.Add(mangStructureInfo);
                    
                }
                else if (level4 != null && level2 != null && level3 != null)
                {
                    mangStructureInfo.Level1 = "Level1";
                    mangStructureInfo.LevelCode1 = level1.Code;
                    mangStructureInfo.LevelId1 = level1.ManagementStructureId;

                    mangStructureInfo.Level2 = "Level2";
                    mangStructureInfo.LevelCode2 = level2.Code;
                    mangStructureInfo.LevelId2 = level2.ManagementStructureId;

                    mangStructureInfo.Level3 = "Level3";
                    mangStructureInfo.LevelCode3 = level3.Code;
                    mangStructureInfo.LevelId3 = level3.ManagementStructureId;

                    mngInfoList.Add(mangStructureInfo);
                }
                else if (level4 != null && level3 != null)
                {
                    mangStructureInfo.Level1 = "Level1";
                    mangStructureInfo.LevelCode1 = level1.Code;
                    mangStructureInfo.LevelId1 = level1.ManagementStructureId;

                    mangStructureInfo.Level2 = "Level2";
                    mangStructureInfo.LevelCode2 = level2.Code;
                    mangStructureInfo.LevelId2 = level2.ManagementStructureId;

                    mngInfoList.Add(mangStructureInfo);
                }
                else if (level4 != null)
                {
                    mangStructureInfo.Level1 = "Level1";
                    mangStructureInfo.LevelCode1 = level1.Code;
                    mangStructureInfo.LevelId1 = level1.ManagementStructureId;

                    mngInfoList.Add(mangStructureInfo);
                }



                return mngInfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
