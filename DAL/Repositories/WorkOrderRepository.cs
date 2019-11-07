using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace DAL.Repositories
{
    public class WorkOrderRepository : Repository<WorkOrder>, IWorkOrderRepository
    {
        public WorkOrderRepository(ApplicationDbContext context) : base(context)
        { }


        #region Work Order
        public IEnumerable<object> GetAllWorkOrderData()
        {
            try
            {
                var result = _appContext.WorkOrder.Where(c => c.IsDeleted != true).ToList();
                //var result = _appContext.WorkOrder.Include("MasterCompany").Where(c => c.IsDeleted != true).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public WorkOrder CreateWorkOrder(WorkOrder workOrder)
        {
            try
            {
                workOrder.CreatedDate = workOrder.UpdatedDate = DateTime.Now;
                workOrder.IsActive = true;
                workOrder.IsDeleted = false;
                _appContext.WorkOrder.Add(workOrder);
                _appContext.SaveChanges();


                workOrder.WorkOrderNum = "WO" + workOrder.WorkOrderId;
                _appContext.WorkOrder.Update(workOrder);
                _appContext.SaveChanges();

                // Creating WorkflowWorkOrder From Work Flow
                CreateWorkFlowWorkOrderFromWorkFlow(workOrder.PartNumbers, workOrder.WorkOrderId, workOrder.CreatedBy);

                return workOrder;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrder UpdateWorkOrder(WorkOrder workOrder)
        {
            try
            {
                workOrder.UpdatedDate = DateTime.Now;
                workOrder.UpdatedBy = "admin";
                workOrder.IsDeleted = false;
                _appContext.WorkOrder.Add(workOrder);
                _appContext.SaveChanges();
                return workOrder;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrder(long workOrderId)
        {
            WorkOrder workOrder = new WorkOrder();
            try
            {
                workOrder.WorkOrderId = workOrderId;
                workOrder.UpdatedDate = DateTime.Now;
                workOrder.UpdatedBy = "admin";
                workOrder.IsDeleted = true;

                _appContext.WorkOrder.Attach(workOrder);
                _appContext.Entry(workOrder).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(workOrder).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrder).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void WorkOrderStatus(long workOrderId, bool status, string updatedBy)
        {
            WorkOrder workOrder = new WorkOrder();
            try
            {
                workOrder.WorkOrderId = workOrderId;
                workOrder.UpdatedDate = DateTime.Now;
                workOrder.UpdatedBy = updatedBy;
                workOrder.IsActive = status;

                _appContext.WorkOrder.Attach(workOrder);
                _appContext.Entry(workOrder).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(workOrder).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrder).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderPartList(long workOrderId)
        {

            try
            {
                var totalRecords = (from wo in _appContext.WorkOrder
                                    join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                    join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                                    join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                                    join im in _appContext.ItemMaster on wop.MasterPartId equals im.MasterPartId
                                    join rp in _appContext.Nha_Tla_Alt_Equ_ItemMapping on wop.MappingItemMasterId equals rp.MappingItemMasterId
                                    join im1 in _appContext.ItemMaster on rp.MappingItemMasterId equals im1.ItemMasterId
                                    join wos in _appContext.WorkOrderStage on wop.WorkOrderStageId equals wos.ID
                                    join wost in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals wost.Id
                                    where wo.WorkOrderId == workOrderId
                                    select new
                                    {
                                        wo.WorkOrderId,
                                    }
                          )
                          .Distinct()
                          .Count();

                var list = (from wo in _appContext.WorkOrder
                            join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                            join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                            join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.MasterPartId
                            join rp in _appContext.Nha_Tla_Alt_Equ_ItemMapping on wop.MappingItemMasterId equals rp.MappingItemMasterId
                            join im1 in _appContext.ItemMaster on rp.MappingItemMasterId equals im1.ItemMasterId
                            join wos in _appContext.WorkOrderStage on wop.WorkOrderStageId equals wos.ID
                            join wost in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals wost.Id
                            where wo.WorkOrderId == workOrderId
                            select new
                            {
                                wo.WorkOrderId,
                                wo.WorkOrderNum,
                                wo.OpenDate,
                                WorkScope = ws.Description,
                                Priority = pr.Description,
                                im.PartNumber,
                                im.PartDescription,
                                RevisedPartNo = im1.PartNumber,
                                WorkOrderType = wo.WorkOrderTypeId == 1 ? "Customer" : (wo.WorkOrderTypeId == 2 ? "Shop(Internal)" : (wo.WorkOrderTypeId == 3 ? "Liquidation" : "Services")),
                                wop.CustomerRequestDate,
                                wop.PromisedDate,
                                wop.EstimatedShipDate,
                                wop.EstimatedCompletionDate,
                                WorkOrderStage = wos.Description,
                                WorkOrderStatus = wost.Description,
                                wo.IsActive,
                                wo.CreatedDate,
                                TotalRecords = totalRecords
                            }
                          ).Distinct()
                          .ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrdersList(int pageNo, int pageSize)
        {
            var pageNumber = pageNo + 1;
            var take = pageSize;
            var skip = take * (pageNumber - 1);

            try
            {
                var totalRecords = (from wo in _appContext.WorkOrder
                                    join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                    join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                                    join wost in _appContext.WorkOrderStatus on wo.WorkOrderStatusId equals wost.Id
                                    where wo.IsDeleted == false
                                    select new
                                    {
                                        wo.WorkOrderId,
                                    }
                          ).Distinct().Count();

                var list = (from wo in _appContext.WorkOrder
                            join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                            join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                            join wost in _appContext.WorkOrderStatus on wo.WorkOrderStatusId equals wost.Id
                            where wo.IsDeleted == false 
                            select new
                            {
                                wo.WorkOrderId,
                                wo.WorkOrderNum,
                                wo.OpenDate,
                                cust.Name,
                                cust.CustomerCode,
                                WorkOrderType = wo.WorkOrderTypeId == 1 ? "Customer" : (wo.WorkOrderTypeId == 2 ? "Shop(Internal)" : (wo.WorkOrderTypeId == 3 ? "Liquidation" : "Services")),
                                wo.IsActive,
                                wo.CreatedDate,
                                WorkOrderStatus = wost.Description,
                                TotalRecords = totalRecords
                            }
                          ).Distinct()
                          .OrderByDescending(p => p.CreatedDate)
                          .Skip(skip)
                          .Take(take)
                          .ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrder WorkOrderById(long workOrderId)
        {
            try
            {
                var workOrder = _appContext.Set<WorkOrder>().Where(x => x.WorkOrderId == workOrderId).FirstOrDefault();
                if (workOrder != null)
                {
                    workOrder.PartNumbers = _appContext.Set<WorkOrderPartNumber>().Where(x => x.WorkOrderId == workOrderId && x.IsDeleted == false).OrderBy(x => x.ID).ToList();
                }
                return workOrder;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Work Flow Work Order

        public long CreateWorkFlowWorkOrder(WorkOrderWorkFlow workFlowWorkOrder)
        {
            try
            {
                if(workFlowWorkOrder.Equipments!=null && workFlowWorkOrder.Equipments.Count>0)
                {
                    workFlowWorkOrder.Equipments.ForEach(p => p.AssetRecordId = Convert.ToInt64(p.AssetId));
                }
                workFlowWorkOrder.CreatedDate = workFlowWorkOrder.UpdatedDate = DateTime.Now;
                workFlowWorkOrder.IsActive = true;
                workFlowWorkOrder.IsDeleted = false;
                _appContext.WorkOrderWorkFlow.Add(workFlowWorkOrder);
                _appContext.SaveChanges();

                workFlowWorkOrder.WorkFlowWorkOrderNo = "WOWF" + workFlowWorkOrder.WorkFlowWorkOrderId;
                _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                _appContext.SaveChanges();

                return workFlowWorkOrder.WorkFlowWorkOrderId;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public void UpdateWorkFlowWorkOrder(WorkOrderWorkFlow workFlowWorkOrder)
        {
            try
            {
                workFlowWorkOrder.UpdatedDate = DateTime.Now;
                workFlowWorkOrder.IsActive = true;
                workFlowWorkOrder.IsDeleted = false;
                _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderWorkFlow GetWorkFlowWorkOrderById(long workFlowWorkOrderId)
        {
            try
            {
                var workFlowWorkOrder = _appContext.WorkOrderWorkFlow.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).FirstOrDefault();
                if (workFlowWorkOrder != null)
                {
                    workFlowWorkOrder.Charges = _appContext.WorkOrderCharges.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    workFlowWorkOrder.Equipments = _appContext.WorkOrderAssets.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    workFlowWorkOrder.Exclusions = _appContext.WorkOrderExclusions.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    //workFlowWorkOrder.WorkOrderLaborHeader = _appContext.WorkOrderLaborHeader.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).FirstOrDefault();

                    //if (workFlowWorkOrder.WorkOrderLaborHeader != null)
                    //{
                    //    workFlowWorkOrder.WorkOrderLaborHeader.WorkOrderLaborList = _appContext.WorkOrderLabor.Where(p => p.WorkOrderLaborHeaderId == workFlowWorkOrder.WorkOrderLaborHeader.WorkOrderLaborHeaderId).ToList();
                    //}
                    workFlowWorkOrder.MaterialList = _appContext.WorkOrderMaterials.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    //workFlowWorkOrder.WorkOrderTask = _appContext.WorkOrderTask.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    workFlowWorkOrder.Directions = _appContext.WorkOrderDirections.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    workFlowWorkOrder.Expertise = _appContext.WorkOrderExpertise.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    workFlowWorkOrder.Publication = _appContext.WorkOrderPublications.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                }
                    
                return workFlowWorkOrder;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderWorkFlowNos(long workOrderId)
        {
            try
            {
                var list = (from w in _appContext.WorkOrderWorkFlow
                            where w.IsDeleted == false && w.IsActive == true && w.WorkOrderId == workOrderId
                            select new
                            {
                              value=  w.WorkFlowWorkOrderId,
                              label=  w.WorkFlowWorkOrderNo
                            }
                          ).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderTaskAttributes(long workOrderTaskId)
        {
            try
            {
                var list = (from ta in _appContext.WorkOrderTaskAttribute
                            where ta.IsDeleted == false && ta.IsActive == true && ta.WorkOrderTaskId == workOrderTaskId
                            select new
                            {
                                ta.WorkOrderTaskAttributeId,
                                ta.TaskAttributeId
                            }
                          ).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Work Order Labour
        public long CreateWorkOrderLabor(WorkOrderLaborHeader workOrderLabor)
        {
            try
            {
                workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                workOrderLabor.IsActive = true;
                workOrderLabor.IsDeleted = false;

                _appContext.WorkOrderLaborHeader.Add(workOrderLabor);
                _appContext.SaveChanges();
                return workOrderLabor.WorkOrderLaborHeaderId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateWorkOrderLabor(WorkOrderLaborHeader workOrderLabor)
        {
            try
            {
                workOrderLabor.UpdatedDate = DateTime.Now;
                workOrderLabor.IsActive = true;
                workOrderLabor.IsDeleted = false;

                _appContext.WorkOrderLaborHeader.Update(workOrderLabor);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderLaborHeader GetWorkFlowWorkOrderLabourList(long wfwoId = 0, long workOrderId = 0)
        {
            WorkOrderLaborHeader workFlowLabourHeader = new WorkOrderLaborHeader();
            WorkOrderLabor workOrderLabor;
            
            try
            {
                var result = _appContext.WorkOrderLaborHeader
                             .Join(_appContext.WorkOrderLabor,
                            wlh => wlh.WorkOrderLaborHeaderId,
                            wl => wl.WorkOrderLaborHeaderId,
                            (wlh, wl) => new { wlh, wl })
                            .Join(_appContext.Task,
                            wfe => wfe.wl.TaskId,
                            t => t.TaskId,
                            (wfe, t) => new { wfe, t })
                             .Join(_appContext.ExpertiseType,
                            wfe1 => wfe1.wfe.wl.ExpertiseId,
                            et => et.ExpertiseTypeId,
                            (wfe1, et) => new { wfe1, et })
                             .Where(p => (p.wfe1.wfe.wlh.WorkFlowWorkOrderId == wfwoId || p.wfe1.wfe.wlh.WorkOrderId == workOrderId) && p.wfe1.wfe.wlh.IsDeleted == false)
                             .Select(p => new
                             {

                                 WorkOrderLaborHeader = p.wfe1.wfe.wlh,
                                 WorkFlowLabour = p.wfe1.wfe.wl,
                                 Task = p.wfe1.t.Description,
                                 Expertise = p.et.Description,

                             })
                             .ToList();
                if (result != null && result.Count > 0)
                {
                    workFlowLabourHeader = new WorkOrderLaborHeader();
                    workFlowLabourHeader = result.FirstOrDefault().WorkOrderLaborHeader;
                    workFlowLabourHeader.WorkOrderLaborList = new List<WorkOrderLabor>();
                    foreach (var item in result)
                    {
                        workOrderLabor = new WorkOrderLabor();
                        workOrderLabor = item.WorkFlowLabour;
                        workOrderLabor.Task = item.Task;
                        workOrderLabor.Expertise = item.Expertise;
                        workFlowLabourHeader.WorkOrderLaborList.Add(workOrderLabor);
                    }
                }

                return workFlowLabourHeader;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Work Order Charges
        public long CreateWorkOrderCharges(WorkOrderCharges workOrderCharges)
        {
            try
            {
                workOrderCharges.CreatedDate = workOrderCharges.UpdatedDate = DateTime.Now;
                workOrderCharges.IsActive = true;
                workOrderCharges.IsDeleted = false;

                _appContext.WorkOrderCharges.Add(workOrderCharges);
                _appContext.SaveChanges();
                return workOrderCharges.WorkOrderChargesId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateWorkOrderCharges(WorkOrderCharges workOrderCharges)
        {
            try
            {
                workOrderCharges.UpdatedDate = DateTime.Now;
                workOrderCharges.IsActive = true;
                workOrderCharges.IsDeleted = false;

                _appContext.WorkOrderCharges.Update(workOrderCharges);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<WorkOrderCharges> GetWorkFlowWorkOrderChargesList(long wfwoId = 0, long workOrderId = 0)
        {
            List<WorkOrderCharges> workOrderChargesList = new List<WorkOrderCharges>();
            WorkOrderCharges workOrderCharges;

            try
            {
                var result = _appContext.WorkOrderCharges
                             .Join(_appContext.ItemMaster,
                            wc => wc.ItemMasterId,
                            im => im.ItemMasterId,
                            (wc, im) => new { wc, im })
                            .Join(_appContext.Vendor,
                            wc1 => wc1.wc.VendorId,
                            v => v.VendorId,
                            (wc1, v) => new { wc1, v })
                             .Where(p => (p.wc1.wc.WorkFlowWorkOrderId == wfwoId || p.wc1.wc.WorkOrderId == workOrderId) && p.wc1.wc.IsDeleted == false)
                             .Select(p => new
                             {
                                 WorkOrderCharges = p.wc1.wc,
                                 VendorName = p.v.VendorName,
                                 PartNumber = p.wc1.im.PartNumber
                             })
                             .ToList();
                if (result != null && result.Count > 0)
                {
                    foreach (var item in result)
                    {
                        workOrderCharges = new WorkOrderCharges();
                        workOrderCharges = item.WorkOrderCharges;
                        workOrderCharges.VendorName = item.VendorName;
                        workOrderCharges.PartNumber = item.PartNumber;

                        workOrderChargesList.Add(workOrderCharges);
                    }
                }

                return workOrderChargesList;
            }
            catch (Exception)
            {

                throw;
            }
        }



        #endregion

        #region Work Order Assets

        public long CreateWorkOrderAssets(WorkOrderAssets workOrderAssets)
        {
            try
            {
                workOrderAssets.CreatedDate = workOrderAssets.UpdatedDate = DateTime.Now;
                workOrderAssets.IsActive = true;
                workOrderAssets.IsDeleted = false;

                _appContext.WorkOrderAssets.Add(workOrderAssets);
                _appContext.SaveChanges();
                return workOrderAssets.WorkOrderAssetId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateWorkOrderAssets(WorkOrderAssets workOrderAssets)
        {
            try
            {
                workOrderAssets.UpdatedDate = DateTime.Now;
                workOrderAssets.IsActive = true;
                workOrderAssets.IsDeleted = false;

                _appContext.WorkOrderAssets.Update(workOrderAssets);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderAssetList(long wfwoId, long workOrderId)
        {
            try
            {
                var workOrderAssetsList = (from wa in _appContext.WorkOrderAssets
                                           join a in _appContext.Asset on wa.AssetRecordId equals a.AssetRecordId
                                           join at in _appContext.AssetType on a.AssetTypeId equals at.AssetTypeId
                                           where wa.IsDeleted == false && (wa.WorkOrderId == workOrderId || wa.WorkFlowWorkOrderId == wfwoId)
                                           select new
                                           {
                                               wa.WorkOrderAssetId,
                                               Asset= a.Name,
                                               a.Description,
                                               at.AssetTypeName,
                                               wa.Quantity,
                                               wa.MinQuantity,
                                               wa.MaxQuantity,
                                               wa.ExpectedQuantity,
                                               wa.Findings
                                           }).Distinct().ToList();

                return workOrderAssetsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Work Order Exclusions

        public long CreateWorkOrderExclusions(WorkOrderExclusions workOrderExclusions)
        {
            try
            {
                workOrderExclusions.CreatedDate = workOrderExclusions.UpdatedDate = DateTime.Now;
                workOrderExclusions.IsActive = true;
                workOrderExclusions.IsDeleted = false;

                _appContext.WorkOrderExclusions.Add(workOrderExclusions);
                _appContext.SaveChanges();
                return workOrderExclusions.WorkOrderExclusionsId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateWorkOrderExclusions(WorkOrderExclusions workOrderExclusions)
        {
            try
            {
                workOrderExclusions.UpdatedDate = DateTime.Now;
                workOrderExclusions.IsActive = true;
                workOrderExclusions.IsDeleted = false;

                _appContext.WorkOrderExclusions.Update(workOrderExclusions);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<WorkOrderExclusions> GetWorkFlowWorkOrderExclusionsList(long workOrderId = 0, long wfwoId = 0)
        {
            List<WorkOrderExclusions> workOrderExclusionsList = new List<WorkOrderExclusions>();
            WorkOrderExclusions workOrderExclusions;

            try
            {

                var result = (from we in _appContext.WorkOrderExclusions
                              join im in _appContext.ItemMaster on we.ItemMasterId equals im.ItemMasterId
                              join eo in _appContext.ExclusionEstimatedOccurances on we.EstOcuuranceId equals eo.Id
                              join mp in _appContext.MarkUpPercentage on we.MarkUpPercentageId equals mp.MarkUpPercentageId
                              where we.IsDeleted == false && (we.WorkFlowWorkOrderId == wfwoId || we.WorkOrderId == workOrderId)
                              select new
                              {
                                  WorkOrderExclusions = we,
                                  Epn = im.PartNumber,
                                  EpnDescription = im.PartDescription,
                                  Source = string.Empty,
                                  EstOcuurance = eo.Name,
                                  MarkUpPercentage = mp.MarkUpValue
                              })
                             .ToList();

                if (result != null && result.Count > 0)
                {
                    foreach (var item in result)
                    {
                        workOrderExclusions = new WorkOrderExclusions();
                        workOrderExclusions = item.WorkOrderExclusions;
                        workOrderExclusions.Epn = item.Epn;
                        workOrderExclusions.EpnDescription = item.EpnDescription;
                        workOrderExclusions.Source = item.Source;
                        workOrderExclusions.EstOcuurance = item.EstOcuurance;
                        workOrderExclusions.MarkUpPercentage = item.MarkUpPercentage;

                        workOrderExclusionsList.Add(workOrderExclusions);
                    }
                }

                return workOrderExclusionsList;
            }
            catch (Exception)
            {

                throw;
            }
        }


        #endregion

        #region Work Order Documents

        public long CreateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments)
        {
            try
            {
                workOrderDocuments.CreatedDate = workOrderDocuments.UpdatedDate = DateTime.Now;
                workOrderDocuments.IsActive = true;
                workOrderDocuments.IsDeleted = false;

                _appContext.WorkOrderDocuments.Add(workOrderDocuments);
                _appContext.SaveChanges();
                return workOrderDocuments.WorkOrderDocumentsId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments)
        {
            try
            {
                workOrderDocuments.UpdatedDate = DateTime.Now;
                workOrderDocuments.IsActive = true;
                workOrderDocuments.IsDeleted = false;

                _appContext.WorkOrderDocuments.Update(workOrderDocuments);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<WorkOrderDocuments> GetWorkFlowWorkOrderDocumentsList(long wfwoId = 0, long workOrderId = 0)
        {
            List<WorkOrderDocuments> workOrderDocumentsList = new List<WorkOrderDocuments>();
            WorkOrderDocuments workOrderDocuments;

            try
            {

                var result = (from wd in _appContext.WorkOrderDocuments

                              join doc in _appContext.Document on wd.DocumentId equals doc.DocumentId
                              where wd.IsDeleted == false && (wd.WorkFlowWorkOrderId == wfwoId || wd.WorkOrderId == workOrderId)
                              select new
                              {
                                  WorkOrderDocuments = wd,
                                  DocumentCode = doc.DocumentCode
                              })
                             .ToList();


                if (result != null && result.Count > 0)
                {
                    foreach (var item in result)
                    {
                        workOrderDocuments = new WorkOrderDocuments();
                        workOrderDocuments = item.WorkOrderDocuments;
                        workOrderDocuments.DocumentCode = item.DocumentCode;

                        workOrderDocumentsList.Add(workOrderDocuments);
                    }
                }

                return workOrderDocumentsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderDocuments(long WorkOrderDocumentsId, string updatedBy)
        {
            try
            {
                WorkOrderDocuments workOrderDocument = new WorkOrderDocuments();
                workOrderDocument.WorkOrderDocumentsId = WorkOrderDocumentsId;
                workOrderDocument.UpdatedDate = DateTime.Now;
                workOrderDocument.IsDeleted = true;
                workOrderDocument.UpdatedBy = updatedBy;

                _appContext.WorkOrderDocuments.Attach(workOrderDocument);
                _appContext.Entry(workOrderDocument).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderDocument).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrderDocument).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }



        #endregion

        #region Work Order Materials

        public long CreateWorkOrderMaterials(WorkOrderMaterials workOrderMaterials)
        {
            try
            {
                workOrderMaterials.CreatedDate = workOrderMaterials.UpdatedDate = DateTime.Now;
                workOrderMaterials.IsActive = true;
                workOrderMaterials.IsDeleted = false;

                _appContext.WorkOrderMaterials.Add(workOrderMaterials);
                _appContext.SaveChanges();
                return workOrderMaterials.WorkOrderMaterialsId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateWorkOrderMaterials(WorkOrderMaterials workOrderMaterials)
        {
            try
            {
                workOrderMaterials.UpdatedDate = DateTime.Now;
                workOrderMaterials.IsActive = true;
                workOrderMaterials.IsDeleted = false;

                _appContext.WorkOrderMaterials.Update(workOrderMaterials);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderMaterialList(long wfwoId, long workOrderId )
        {

            try
            {
                var workOrderMaterialsList = (from wom in _appContext.WorkOrderMaterials
                                              join sl in _appContext.StockLine on wom.ItemMasterId equals sl.ItemMasterId
                                              join im in _appContext.ItemMaster on wom.ItemMasterId equals im.ItemMasterId
                                              join p in _appContext.Provision on im.ProvisionId equals p.ProvisionId into pro
                                              from p in pro.DefaultIfEmpty()
                                              join c in _appContext.Condition on wom.ConditionCodeId equals c.ConditionId
                                              //join it in _appContext.ItemType 
                                              join wo in _appContext.WorkOrderWorkFlow on wom.WorkFlowWorkOrderId equals wo.WorkFlowWorkOrderId
                                              join cur in _appContext.Currency on wo.CurrencyId equals cur.CurrencyId into currs
                                              from cur in currs.DefaultIfEmpty()
                                              join pop in _appContext.PurchaseOrderPart on sl.PurchaseOrderId equals pop.PurchaseOrderId into pops
                                              from pop in pops.DefaultIfEmpty()
                                              join po in _appContext.PurchaseOrder on pop.PurchaseOrderId equals po.PurchaseOrderId into pod
                                              from po in pod.DefaultIfEmpty()
                                              join ro in _appContext.RepairOrder on sl.RepairOrderId equals ro.RepairOrderId into rod
                                              from ro in rod.DefaultIfEmpty()
                                              join tl in _appContext.TimeLife on sl.TimeLifeCyclesId equals tl.TimeLifeCyclesId into tlc
                                              from tl in tlc.DefaultIfEmpty()
                                              join wh in _appContext.Warehouse on sl.WarehouseId equals wh.WarehouseId into wah
                                              from wh in wah.DefaultIfEmpty()
                                              join lo in _appContext.Location on sl.LocationId equals lo.LocationId into loc
                                               from lo in loc.DefaultIfEmpty()
                                              join sh in _appContext.Shelf on sl.ShelfId equals sh.ShelfId into shf
                                              from sh in shf.DefaultIfEmpty()
                                              join bi in _appContext.Bin on sl.BinId equals bi.BinId into bin
                                              from bi in bin.DefaultIfEmpty()
                                              where wom.IsDeleted==false && (wom.WorkOrderId== workOrderId || wom.WorkFlowWorkOrderId==wfwoId)
                                              select new
                                              {
                                                  sl.StockLineNumber,
                                                  sl.PartNumber,
                                                  im.PartDescription,
                                                  pop.AltPartNumber,
                                                  sl.SerialNumber,
                                                  Provision = p.Description,
                                                  Oem = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                                                  Control = sl.IdNumber,
                                                  Condition = c.Description,
                                                  ItemType = string.Empty,
                                                  QunatityRequried = wom.Quantity,
                                                  QunatityReserved = 0,
                                                  QunatityTurnIn = 0,
                                                  QunatityIssued = 0,
                                                  QunatityBackOrder = 0,
                                                  QunatityRemaining = 0,
                                                  wom.UnitCost,
                                                  wom.ExtendedCost,
                                                  Currency = cur.DisplayName,
                                                  po.PurchaseOrderNumber,
                                                  ro.RepairOrderNumber,
                                                  PartQuantityOnHand = 0,
                                                  PartQuantityAvailable = 0,
                                                  PartQuantityOnOrder = 0,
                                                  AltPartQuantityOnHand = 0,
                                                  AltPartQuantityAvailable = 0,
                                                  AltPartQuantityOnOrder = 0,
                                                  Receiver = string.Empty,
                                                  wo.WorkOrderNumber,
                                                  SubWorkOrder = string.Empty,
                                                  SalesOrder=string.Empty,
                                                  TimeLife=tl.TimeRemaining,
                                                  WareHouse= wh.Name,
                                                  Location=lo.Name,
                                                  Shelf=sh.Name,
                                                  Bin=bi.Name

                                              }).Distinct().ToList();

                return workOrderMaterialsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderMaterials(long WorkOrderMaterialsId, string updatedBy)
        {
            try
            {
                WorkOrderMaterials workOrderDocument = new WorkOrderMaterials();
                workOrderDocument.WorkOrderMaterialsId = WorkOrderMaterialsId;
                workOrderDocument.UpdatedDate = DateTime.Now;
                workOrderDocument.IsDeleted = true;
                workOrderDocument.UpdatedBy = updatedBy;

                _appContext.WorkOrderMaterials.Attach(workOrderDocument);
                _appContext.Entry(workOrderDocument).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderDocument).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrderDocument).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }



        #endregion

        #region Work Order Address

        public long CreateWorkOrderAddress(WorkOrderAddress workOrderAddress)
        {
            try
            {
                workOrderAddress.CreatedDate = workOrderAddress.UpdatedDate = DateTime.Now;
                workOrderAddress.IsActive = true;
                workOrderAddress.IsDeleted = false;

                _appContext.WorkOrderAddress.Add(workOrderAddress);
                _appContext.SaveChanges();
                return workOrderAddress.WorkOrderAddressId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateWorkOrderAddress(WorkOrderAddress workOrderAddress)
        {
            try
            {
                workOrderAddress.UpdatedDate = DateTime.Now;
                workOrderAddress.IsActive = true;
                workOrderAddress.IsDeleted = false;

                _appContext.WorkOrderAddress.Update(workOrderAddress);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<WorkOrderAddress> GetWorkFlowWorkOrderAddressList(long wfwoId = 0, long workOrderId = 0)
        {
            List<WorkOrderAddress> workOrderAddressList = new List<WorkOrderAddress>();
            WorkOrderAddress workOrderAddress;

            try
            {
                var result = _appContext.WorkOrderAddress
                             .Join(_appContext.Countries,
                            wa => wa.CountryId,
                            c => c.countries_id,
                            (wa, c) => new { wa, c })
                            .Where(p => (p.wa.WorkFlowWorkOrderId == wfwoId || p.wa.WorkOrderId == workOrderId) && p.wa.IsDeleted == false)
                             .Select(p => new
                             {
                                 WorkOrderAddress = p.wa,
                                 CountryName = p.c.countries_name
                             })
                             .ToList();
                if (result != null && result.Count > 0)
                {
                    foreach (var item in result)
                    {
                        workOrderAddress = new WorkOrderAddress();
                        workOrderAddress = item.WorkOrderAddress;
                        workOrderAddress.CountryName = item.CountryName;
                        workOrderAddressList.Add(workOrderAddress);
                    }
                }

                return workOrderAddressList;
            }
            catch (Exception)
            {

                throw;
            }
        }


        #endregion

        #region Work Order Quote

        public long CreateWorkOrderQuote(WorkOrderQuote workOrderQuote)
        {
            try
            {
                workOrderQuote.CreatedDate = workOrderQuote.UpdatedDate = DateTime.Now;
                workOrderQuote.IsActive = true;
                workOrderQuote.IsDeleted = false;

                _appContext.WorkOrderQuote.Add(workOrderQuote);
                _appContext.SaveChanges();
                return workOrderQuote.WorkOrderQuoteId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateWorkOrderQuote(WorkOrderQuote workOrderQuote)
        {
            try
            {
                workOrderQuote.UpdatedDate = DateTime.Now;
                workOrderQuote.IsActive = true;
                workOrderQuote.IsDeleted = false;

                _appContext.WorkOrderQuote.Update(workOrderQuote);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderQuote GetWorkFlowWorkOrderQuote(long wfwoId = 0, long workOrderId = 0)
        {
            try
            {
                WorkOrderQuote workOrderQuote = new WorkOrderQuote();
                var result = (from wq in _appContext.WorkOrderQuote
                              join wo in _appContext.WorkOrder on wq.WorkOrderId equals wo.WorkOrderId
                              join cust in _appContext.Customer on wq.CustomerId equals cust.CustomerId
                              join cur in _appContext.Currency on wq.CurrencyId equals cur.CurrencyId
                              join emp in _appContext.Employee on wq.EmployeeId equals emp.EmployeeId
                              join sp in _appContext.Employee on wq.SalesPersonId equals sp.EmployeeId
                              join cc in _appContext.CustomerContact on cust.CustomerId equals cc.CustomerId
                              join con in _appContext.Contact on cc.ContactId equals con.ContactId
                              join ct in _appContext.CreditTerms on cust.CreditTermsId equals ct.CreditTermsId
                              where (wq.WorkFlowWorkOrderId == wfwoId || wq.WorkOrderId == workOrderId) && wq.IsDeleted == false
                              select new
                              {
                                  WorkOrderQuote = wq,
                                  WorkOrderNumber = wo.WorkOrderNum,
                                  CurrencyName = cur.Symbol,
                                  CurrencyCode = cur.Code,
                                  CustomerName = cust.Name,
                                  CustomerCode = cust.CustomerCode,
                                  CustomerContact = con.WorkPhone,
                                  CustomerEmail = cust.Email,
                                  CustomerPhone = cust.CustomerPhone,
                                  CustomerReference = cust.CSRName,
                                  CreditLimit = cust.CreditLimit,
                                  CreditTermId = ct.CreditTermsId,
                                  CreditTerm = ct.Name,
                                  SalesPersonName = sp.FirstName + ' ' + sp.LastName,
                                  EmployeeName = emp.FirstName + ' ' + emp.LastName

                              })
                                .FirstOrDefault();
                if (result != null)
                {
                    workOrderQuote = result.WorkOrderQuote;
                    workOrderQuote.workOrderNumber = result.WorkOrderNumber;
                    workOrderQuote.CurrencyName = result.CurrencyName;
                    workOrderQuote.CurrencyCode = result.CurrencyCode;
                    workOrderQuote.CustomerName = result.CustomerName;
                    workOrderQuote.CustomerCode = result.CustomerCode;
                    workOrderQuote.CustomerContact = result.CustomerContact;
                    workOrderQuote.CustomerEmail = result.CustomerEmail;
                    workOrderQuote.CustomerPhone = result.CustomerPhone;
                    workOrderQuote.CustomerReference = result.CustomerReference;
                    workOrderQuote.CreditLimit = result.CreditLimit;
                    workOrderQuote.CreditTermId = result.CreditTermId;
                    workOrderQuote.CreditTerm = result.CreditTerm;
                    workOrderQuote.SalesPersonName = result.SalesPersonName;
                    workOrderQuote.EmployeeName = result.EmployeeName;

                }

                return workOrderQuote;
            }
            catch (Exception)
            {
                throw;
            }
        }



        #endregion

        #region Work Order Freight

        public long CreateWorkOrderFreight(WorkOrderFreight workOrderFreight)
        {
            try
            {
                workOrderFreight.CreatedDate = workOrderFreight.UpdatedDate = DateTime.Now;
                workOrderFreight.IsActive = true;
                workOrderFreight.IsDeleted = false;

                _appContext.WorkOrderFreight.Add(workOrderFreight);
                _appContext.SaveChanges();
                return workOrderFreight.WorkOrderFreightId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateWorkOrderFreight(WorkOrderFreight workOrderFreight)
        {
            try
            {
                workOrderFreight.UpdatedDate = DateTime.Now;
                workOrderFreight.IsActive = true;
                workOrderFreight.IsDeleted = false;

                _appContext.WorkOrderFreight.Update(workOrderFreight);
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<WorkOrderFreight> GetWorkFlowWorkOrderFreightList(long wfwoId = 0, long workOrderId = 0)
        {
            List<WorkOrderFreight> workOrderFreightList = new List<WorkOrderFreight>();
            WorkOrderFreight workOrderFreight;

            try
            {
                var result = (from wf in _appContext.WorkOrderFreight
                              join car in _appContext.ShippingVia on wf.CarrierId equals car.ShippingViaId
                              join sv in _appContext.ShippingVia on wf.ShipViaId equals sv.ShippingViaId
                              where wf.IsDeleted == false && (wf.WorkFlowWorkOrderId == wfwoId || wf.WorkOrderId == workOrderId)
                              select new
                              {
                                  WorkOrderFreight = wf,
                                  ShipViaName = sv.Name,
                                  CarrierName = car.Name
                              }).ToList();

                if (result != null && result.Count > 0)
                {
                    foreach (var item in result)
                    {
                        workOrderFreight = new WorkOrderFreight();
                        workOrderFreight = item.WorkOrderFreight;
                        workOrderFreight.CarrierName = item.CarrierName;
                        workOrderFreight.ShipViaName = item.ShipViaName;

                        workOrderFreightList.Add(workOrderFreight);
                    }

                }
                return workOrderFreightList;
            }
            catch (Exception)
            {

                throw;
            }
        }


        #endregion

        #region Dropdowns

        public IEnumerable<object> GetWorkFlowNos(long partId, long workScopeId)
        {
            try
            {

                var workFlowNos = (from wf in _appContext.Workflow
                                   join im in _appContext.ItemMaster on wf.ItemMasterId equals im.ItemMasterId
                                   join ws in _appContext.WorkScope on wf.WorkScopeId equals ws.WorkScopeId
                                   where wf.IsDelete == false && wf.IsActive == true && im.ItemMasterId == partId && wf.WorkScopeId == workScopeId
                                   select new
                                   {
                                       WorkFlowNo = wf.WorkOrderNumber,
                                       WorkFlowId = wf.WorkflowId
                                   }).Distinct().ToList();

                return workFlowNos;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderPartDetails()
        {
            try
            {
                var list = (from sl in _appContext.StockLine
                            join im in _appContext.ItemMaster on sl.ItemMasterId equals im.ItemMasterId
                            select new
                            {
                                sl.ItemMasterId,
                                sl.PartNumber,
                                im.PartDescription
                            })
                            .Distinct()
                            .ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetStockLineDetailsByPartNo(long itemMasterId)
        {
            try
            {
                var list = (from sl in _appContext.StockLine
                            where sl.ItemMasterId == itemMasterId
                            select new
                            {
                                sl.StockLineId,
                                sl.StockLineNumber
                            })
                            .Distinct()
                            .ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetConditionDetailsByPartNo(long itemMasterId)
        {
            try
            {
                var list = (from sl in _appContext.StockLine
                            join c in _appContext.Condition on sl.ConditionId equals c.ConditionId
                            where sl.ItemMasterId == itemMasterId
                            select new
                            {
                                sl.ConditionId,
                                c.Description
                            })
                            .Distinct()
                            .ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetPartSerialNo(long stockLineId, long conditionId)
        {
            try
            {
                var serialNo = (from sl in _appContext.StockLine
                                where sl.StockLineId == stockLineId && sl.ConditionId == conditionId
                                select new
                                {
                                    SerialNumber = sl.SerialNumber
                                }).FirstOrDefault();

                return serialNo;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetPartPublications(long itemMasterId)
        {
            try
            {

                var list = (from a in _appContext.Attachment
                            join ad in _appContext.AttachmentDetails on a.AttachmentId equals ad.AttachmentId
                            join p in _appContext.Publication on a.ReferenceId equals p.PublicationRecordId
                            join pim in _appContext.PublicationItemMasterMapping on p.PublicationRecordId equals pim.PublicationRecordId
                            where a.IsDeleted == false && ad.IsDeleted == false && a.ModuleId == Convert.ToInt32(ModuleEnum.Publication)
                            && pim.ItemMasterId == itemMasterId
                            select new
                            {
                                p.PublicationId,
                                p.PublicationRecordId,
                                ad.FileName,
                                ad.Link,
                                ad.CreatedDate
                            }).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetRevisedParts(long itemMasterId, int mappingType)
        {
            try
            {
                var data = (from p in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                            join im in _appContext.ItemMaster on p.ItemMasterId equals im.ItemMasterId
                            join im1 in _appContext.ItemMaster on p.MappingItemMasterId equals im1.ItemMasterId
                            where p.IsDeleted == false && im.ItemMasterId == itemMasterId && p.MappingType == mappingType
                            select new
                            {
                                p.MappingItemMasterId,
                                RevisedPartNo = im1.PartNumber
                            })
                            .Distinct()
                            .ToList();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Private Methods

        private void CreateWorkFlowWorkOrderFromWorkFlow(List<WorkOrderPartNumber> workOrderPartNumbers, long workOrderId, string createdBy)
        {
            try
            {
                if (workOrderPartNumbers != null && workOrderPartNumbers.Count > 0)
                {
                    foreach (var item in workOrderPartNumbers)
                    {
                        var workFlowId = item.WorkflowId;
                        if (workFlowId > 0)
                        {
                            var isExists = _appContext.WorkOrderWorkFlow.Any(p => p.WorkflowId == workFlowId);
                            if (!isExists)
                            {
                                WorkOrderWorkFlow workFlowWorkOrder = new WorkOrderWorkFlow();
                                var workFlow = _appContext.Set<Workflow>().Where(x => x.WorkflowId == workFlowId).FirstOrDefault();

                                if (workFlow != null)
                                {
                                    workFlow.Charges = _appContext.Set<WorkflowChargesList>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete != true)).OrderBy(x => x.WorkflowChargesListId).ToList();
                                    workFlow.Directions = _appContext.Set<WorkFlowDirection>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowDirectionId).ToList();
                                    workFlow.Equipments = _appContext.Set<WorkflowEquipmentList>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowEquipmentListId).ToList();
                                    workFlow.Exclusions = _appContext.Set<WorkFlowExclusion>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowExclusionId).ToList();
                                    workFlow.Expertise = _appContext.Set<WorkflowExpertiseList>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowExpertiseListId).ToList();
                                    workFlow.MaterialList = _appContext.Set<WorkflowMaterial>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowActionId).ToList();
                                    // workFlow.Measurements = _appContext.Set<WorkflowMeasurement>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowMeasurementId).ToList();
                                     workFlow.Publication = _appContext.Set<Publications>().Where(x => x.WorkflowId == workFlowId && (x.IsDeleted == null || x.IsDeleted.Value != true)).OrderBy(x => x.Id).ToList();
                                    //workFlow.Publication.ForEach(publ =>
                                    //{
                                    //    publ.WorkflowPublicationDashNumbers = _appContext.WorkflowPublicationDashNumber.Where(x => x.PublicationsId == publ.Id && x.WorkflowId == publ.WorkflowId).ToList();
                                    //});


                                    workFlowWorkOrder.WorkOrderId = workOrderId;
                                    workFlowWorkOrder.CreatedDate = workFlowWorkOrder.UpdatedDate = DateTime.Now;
                                    workFlowWorkOrder.CreatedBy = workFlowWorkOrder.UpdatedBy = createdBy;
                                    workFlowWorkOrder.IsActive = true;
                                    workFlowWorkOrder.IsDeleted = false;
                                    workFlowWorkOrder.MasterCompanyId = item.MasterCompanyId;

                                    workFlowWorkOrder = BIndWorkFlowWorkOrderDetails(workFlowWorkOrder, workFlow);

                                    if (workFlow.Charges != null && workFlow.Charges.Count > 0)
                                    {
                                        workFlowWorkOrder.Charges = BindWorkFlowWorkOrderCharges(workFlow.Charges, workOrderId, createdBy, item.MasterCompanyId);
                                    }
                                    if (workFlow.Equipments != null && workFlow.Equipments.Count > 0)
                                    {
                                        workFlowWorkOrder.Equipments = BindWorkFlowWorkOrderAssets(workFlow.Equipments, workOrderId, createdBy, item.MasterCompanyId);
                                    }
                                    if (workFlow.Exclusions != null && workFlow.Exclusions.Count > 0)
                                    {
                                        workFlowWorkOrder.Exclusions = BindWorkFlowWorkOrderExclusions(workFlow.Exclusions, workOrderId, createdBy, item.MasterCompanyId);
                                    }
                                    if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                                    {
                                        workFlowWorkOrder.Expertise = BindWorkFlowWorkOrderExpertise(workFlow.Expertise, workOrderId, createdBy, item.MasterCompanyId);
                                    }
                                    if (workFlow.MaterialList != null && workFlow.MaterialList.Count > 0)
                                    {
                                        workFlowWorkOrder.MaterialList = BindWorkFlowWorkOrderMaterials(workFlow.MaterialList, workOrderId, createdBy, item.MasterCompanyId);
                                    }
                                    if (workFlow.MaterialList != null && workFlow.MaterialList.Count > 0)
                                    {
                                        workFlowWorkOrder.MaterialList = BindWorkFlowWorkOrderMaterials(workFlow.MaterialList, workOrderId, createdBy, item.MasterCompanyId);
                                    }
                                    if (workFlow.Directions != null && workFlow.Directions.Count > 0)
                                    {
                                        workFlowWorkOrder.Directions = BindWorkFlowWorkOrderDirections(workFlow.Directions, workOrderId, createdBy, item.MasterCompanyId);
                                    }
                                    if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                                    {
                                        workFlowWorkOrder.Publication = BindWorkFlowWorkOrderPublications(workFlow.Publication, workOrderId, createdBy, item.MasterCompanyId);
                                    }

                                    _appContext.WorkOrderWorkFlow.Add(workFlowWorkOrder);
                                    _appContext.SaveChanges();
                                }



                            }
                        }
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        private WorkOrderWorkFlow BIndWorkFlowWorkOrderDetails(WorkOrderWorkFlow workFlowWorkOrder, Workflow workFlow)
        {
            workFlowWorkOrder.BERThresholdAmount = workFlow.BERThresholdAmount;
            //workFlowWorkOrder.ChangedPartNumber = workFlow.ChangedPartNumber;
            workFlowWorkOrder.ChangedPartNumberDescription = workFlow.ChangedPartNumberDescription;
            workFlowWorkOrder.CostOfNew = workFlow.CostOfNew;
            workFlowWorkOrder.CostOfReplacement = workFlow.CostOfReplacement;
            workFlowWorkOrder.CurrencyId = workFlow.CurrencyId;
            workFlowWorkOrder.CustomerId = workFlow.CustomerId;
            workFlowWorkOrder.FixedAmount = workFlow.FixedAmount;
            workFlowWorkOrder.FlatRate = workFlow.FlatRate;
            workFlowWorkOrder.IsCalculatedBERThreshold = workFlow.IsCalculatedBERThreshold;
            workFlowWorkOrder.IsFixedAmount = workFlow.IsFixedAmount;
            workFlowWorkOrder.IsPercentageOfNew = workFlow.IsPercentageOfNew;
            workFlowWorkOrder.IsPercentageOfReplacement = workFlow.IsPercentageOfReplacement;
            workFlowWorkOrder.ItemMasterId = workFlow.ItemMasterId;
            workFlowWorkOrder.ManagementStructureId = workFlow.ManagementStructureId;
            workFlowWorkOrder.Memo = workFlow.Memo;
            workFlowWorkOrder.OtherCost = workFlow.OtherCost;
            workFlowWorkOrder.PartNumberDescription = workFlow.PartNumberDescription;
            workFlowWorkOrder.PercentageOfNew = workFlow.PercentageOfNew;
            workFlowWorkOrder.PercentageOfReplacement = workFlow.PercentageOfReplacement;
            workFlowWorkOrder.Version = workFlow.Version;
            workFlowWorkOrder.WorkflowDescription = workFlow.WorkflowDescription;
            workFlowWorkOrder.WorkflowCreateDate = workFlow.WorkflowCreateDate;
            workFlowWorkOrder.WorkflowExpirationDate = workFlow.WorkflowExpirationDate;
            workFlowWorkOrder.WorkflowId = workFlow.WorkflowId;

            return workFlowWorkOrder;
        }

        private List<WorkOrderCharges> BindWorkFlowWorkOrderCharges(List<WorkflowChargesList> charges, long workOrderId, string createdBy, int masterCompanyId)
        {
            try
            {
                List<WorkOrderCharges> workOrderCharges = new List<WorkOrderCharges>();
                WorkOrderCharges workOrderCharge;
                foreach (var item in charges)
                {
                    workOrderCharge = new WorkOrderCharges();
                    workOrderCharge.Amount = 0;
                    workOrderCharge.CostPlusAmount = 0;
                    workOrderCharge.CreatedBy = createdBy;
                    workOrderCharge.CreatedDate = DateTime.Now;
                    workOrderCharge.FixedAmount = 0;
                    workOrderCharge.IsActive = true;
                    workOrderCharge.IsDeleted = false;
                    workOrderCharge.ItemMasterId = 1;
                    workOrderCharge.MarkupPercentageId = 1;
                    workOrderCharge.MasterCompanyId = masterCompanyId;
                    workOrderCharge.PartNumber = "";
                    workOrderCharge.Quantity = item.Quantity;
                    workOrderCharge.UpdatedBy = createdBy;
                    workOrderCharge.UpdatedDate = DateTime.Now;
                    workOrderCharge.VendorId = item.VendorId;
                    workOrderCharge.WorkOrderId = workOrderId;
                    workOrderCharges.Add(workOrderCharge);
                }

                return workOrderCharges;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<WorkOrderAssets> BindWorkFlowWorkOrderAssets(List<WorkflowEquipmentList> equipments, long workOrderId, string createdBy, int masterCompanyId)
        {
            try
            {
                List<WorkOrderAssets> WorkOrderAssetsList = new List<WorkOrderAssets>();
                WorkOrderAssets workOrderAsset;
                foreach (var item in equipments)
                {
                    workOrderAsset = new WorkOrderAssets();
                    workOrderAsset.AssetRecordId = item.AssetId;
                    workOrderAsset.AssetTypeId = item.AssetTypeId;
                    workOrderAsset.UpdatedBy = workOrderAsset.CreatedBy = createdBy;
                    workOrderAsset.UpdatedDate = workOrderAsset.CreatedDate = DateTime.Now;
                    workOrderAsset.IsActive = true;
                    workOrderAsset.IsDeleted = false;
                    workOrderAsset.MasterCompanyId = masterCompanyId;
                    workOrderAsset.Quantity = item.Quantity;
                    workOrderAsset.WorkOrderId = workOrderId;
                    WorkOrderAssetsList.Add(workOrderAsset);
                }

                return WorkOrderAssetsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<WorkOrderExclusions> BindWorkFlowWorkOrderExclusions(List<WorkFlowExclusion> exclusions, long workOrderId, string createdBy, int masterCompanyId)
        {
            try
            {
                List<WorkOrderExclusions> WorkOrderExclusionsList = new List<WorkOrderExclusions>();
                WorkOrderExclusions workOrderExclusion;
                foreach (var item in exclusions)
                {
                    workOrderExclusion = new WorkOrderExclusions();
                    workOrderExclusion.UpdatedBy = workOrderExclusion.CreatedBy = createdBy;
                    workOrderExclusion.UpdatedDate = workOrderExclusion.CreatedDate = DateTime.Now;
                    workOrderExclusion.IsActive = true;
                    workOrderExclusion.IsDeleted = false;
                    workOrderExclusion.MasterCompanyId = masterCompanyId;
                    workOrderExclusion.WorkOrderId = workOrderId;

                    workOrderExclusion.ItemMasterId = item.ItemMasterId;
                    workOrderExclusion.ExtendedCost = item.ExtendedCost;
                    workOrderExclusion.Memo = item.Memo;
                    workOrderExclusion.Quantity = item.Quantity;
                    workOrderExclusion.UnitCost = item.UnitCost;

                    WorkOrderExclusionsList.Add(workOrderExclusion);
                }

                return WorkOrderExclusionsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<WorkOrderExpertise> BindWorkFlowWorkOrderExpertise(List<WorkflowExpertiseList> expertise, long workOrderId, string createdBy, int masterCompanyId)
        {
            try
            {
                List<WorkOrderExpertise> workOrderExpertiseList = new List<WorkOrderExpertise>();
                WorkOrderExpertise workOrderExpertise;


                foreach (var item in expertise)
                {
                    workOrderExpertise = new WorkOrderExpertise();
                    workOrderExpertise.UpdatedBy = workOrderExpertise.CreatedBy = createdBy;
                    workOrderExpertise.UpdatedDate = workOrderExpertise.CreatedDate = DateTime.Now;
                    workOrderExpertise.IsActive = true;
                    workOrderExpertise.IsDeleted = false;
                    workOrderExpertise.WorkOrderId = workOrderId;
                    workOrderExpertise.MasterCompanyId = masterCompanyId;

                    workOrderExpertise.ExpertiseTypeId =Convert.ToInt32(item.ExpertiseTypeId);
                    workOrderExpertise.EstimatedHours = item.EstimatedHours;
                    workOrderExpertise.TaskId = item.TaskId;

                    workOrderExpertiseList.Add(workOrderExpertise);
                }

                return workOrderExpertiseList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<WorkOrderMaterials> BindWorkFlowWorkOrderMaterials(List<WorkflowMaterial> materialList, long workOrderId, string createdBy, int masterCompanyId)
        {
            try
            {
                List<WorkOrderMaterials> WorkOrderMaterialList = new List<WorkOrderMaterials>();
                WorkOrderMaterials workOrderMaterial;
                foreach (var item in materialList)
                {
                    workOrderMaterial = new WorkOrderMaterials();
                    workOrderMaterial.UpdatedBy = workOrderMaterial.CreatedBy = createdBy;
                    workOrderMaterial.UpdatedDate = workOrderMaterial.CreatedDate = DateTime.Now;
                    workOrderMaterial.IsActive = true;
                    workOrderMaterial.IsDeleted = false;
                    workOrderMaterial.MasterCompanyId = masterCompanyId;
                    workOrderMaterial.WorkOrderId = workOrderId;

                    workOrderMaterial.ItemMasterId = item.ItemMasterId;

                    WorkOrderMaterialList.Add(workOrderMaterial);
                }

                return WorkOrderMaterialList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<WorkOrderPublications> BindWorkFlowWorkOrderPublications(List<Publications> publicationList, long workOrderId, string createdBy, int masterCompanyId)
        {
            try
            {
                List<WorkOrderPublications> workOrderPublicationList = new List<WorkOrderPublications>();
                WorkOrderPublications workOrderPublication;
                foreach (var item in publicationList)
                {
                    workOrderPublication = new WorkOrderPublications();
                    workOrderPublication.UpdatedBy = workOrderPublication.CreatedBy = createdBy;
                    workOrderPublication.UpdatedDate = workOrderPublication.CreatedDate = DateTime.Now;
                    workOrderPublication.IsActive = true;
                    workOrderPublication.IsDeleted = false;
                    workOrderPublication.MasterCompanyId = masterCompanyId;
                    workOrderPublication.WorkOrderId = workOrderId;

                    workOrderPublication.PublicationId = item.Id;
                    workOrderPublication.TaskId = item.TaskId;

                    workOrderPublicationList.Add(workOrderPublication);
                }

                return workOrderPublicationList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<WorkOrderDirections> BindWorkFlowWorkOrderDirections(List<WorkFlowDirection> directionList, long workOrderId, string createdBy, int masterCompanyId)
        {
            try
            {
                List<WorkOrderDirections> workOrderDirectionsList = new List<WorkOrderDirections>();
                WorkOrderDirections  workOrderDirection;
                foreach (var item in directionList)
                {
                    workOrderDirection = new WorkOrderDirections();
                    workOrderDirection.UpdatedBy = workOrderDirection.CreatedBy = createdBy;
                    workOrderDirection.UpdatedDate = workOrderDirection.CreatedDate = DateTime.Now;
                    workOrderDirection.IsActive = true;
                    workOrderDirection.IsDeleted = false;
                    workOrderDirection.MasterCompanyId = masterCompanyId;
                    workOrderDirection.WorkOrderId = workOrderId;

                    workOrderDirection.Action = item.Action;
                    workOrderDirection.DirectionName = item.Description;
                    workOrderDirection.Memo = item.Memo;
                    workOrderDirection.Sequence =Convert.ToInt32(item.Sequence);
                    workOrderDirection.WorkFlowWorkOrderId = 0;
                    workOrderDirection.WorkOrderId = workOrderId;
                    workOrderDirection.TaskId =Convert.ToInt64(item.TaskId);
                    workOrderDirectionsList.Add(workOrderDirection);
                }

                return workOrderDirectionsList;
            }
            catch (Exception)
            {

                throw;
            }
        }


        #endregion

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
