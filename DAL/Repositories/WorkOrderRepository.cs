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
                workOrder.WorkFlowWorkOrderId = CreateWorkFlowWorkOrderFromWorkFlow(workOrder.PartNumbers, workOrder.WorkOrderId, workOrder.CreatedBy);

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
                                    join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                                    join rp in _appContext.Nha_Tla_Alt_Equ_ItemMapping on wop.MappingItemMasterId equals rp.MappingItemMasterId into woprp
                                    from rp in woprp.DefaultIfEmpty()
                                    join im1 in _appContext.ItemMaster on rp.MappingItemMasterId equals im1.ItemMasterId into rpim1
                                    from im1 in rpim1.DefaultIfEmpty()
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
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                            join rp in _appContext.Nha_Tla_Alt_Equ_ItemMapping on wop.MappingItemMasterId equals rp.MappingItemMasterId into woprp
                            from rp in woprp.DefaultIfEmpty()
                            join im1 in _appContext.ItemMaster on rp.MappingItemMasterId equals im1.ItemMasterId into rpim1
                            from im1 in rpim1.DefaultIfEmpty()
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

        public object WorkOrderHeaderView(long workOrderId)
        {
            try
            {
                var workOrderHeader = (from wo in _appContext.WorkOrder
                                       join c in _appContext.Customer on wo.CustomerId equals c.CustomerId
                                       join ct in _appContext.CreditTerms on wo.CreditTermsId equals ct.CreditTermsId
                                       join e in _appContext.Employee on wo.EmployeeId equals e.EmployeeId
                                       join sp in _appContext.Employee on wo.SalesPersonId equals sp.EmployeeId
                                       join ws in _appContext.WorkOrderStatus on wo.WorkOrderStatusId equals ws.Id
                                       where wo.WorkOrderId == workOrderId
                                       select new
                                       {
                                           SingleMPN = wo.IsSinglePN == true ? "Single MPN" : "Multiple MPN",
                                           WorkOrderType = wo.WorkOrderTypeId == 1 ? "Customer" : (wo.WorkOrderTypeId == 2 ? "Shop(Internal)" : (wo.WorkOrderTypeId == 2 ? "Liquidation" : "Services")),
                                           WorkOrderNumber = wo.WorkOrderNum,
                                           CustomerName = c.Name,
                                           wo.IsContractAvl,
                                           wo.Contract,
                                           CreditTerm = ct.Name,
                                           wo.CreditLimit,
                                           wo.OpenDate,
                                           c.ContractReference,
                                           Employee = e.FirstName,
                                           Salesperson = sp.FirstName,
                                           WOStatus = ws.Description,
                                           c.CustomerCode,
                                           c.CustomerContact
                                       }).FirstOrDefault();
                return workOrderHeader;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> WorkOrderPartsView(long workOrderId)
        {

            try
            {
                var list = (from wop in _appContext.WorkOrderPartNumber
                            join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                            join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                            join rp in _appContext.Nha_Tla_Alt_Equ_ItemMapping on wop.MappingItemMasterId equals rp.MappingItemMasterId into woprp
                            from rp in woprp.DefaultIfEmpty()
                            join im1 in _appContext.ItemMaster on rp.MappingItemMasterId equals im1.ItemMasterId into rpim1
                            from im1 in rpim1.DefaultIfEmpty()
                            join wos in _appContext.WorkOrderStage on wop.WorkOrderStageId equals wos.ID
                            join wost in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals wost.Id
                            join con in _appContext.Condition on wop.ConditionId equals con.ConditionId into wopcon
                            from con in wopcon.DefaultIfEmpty()
                            join sl in _appContext.StockLine on wop.StockLineId equals sl.StockLineId into wopsl
                            from sl in wopsl.DefaultIfEmpty()
                            join pub in _appContext.Publication on wop.CMMId equals pub.PublicationRecordId into woppub
                            from pub in woppub.DefaultIfEmpty()
                            join tech in _appContext.Employee on wop.TechnicianId equals tech.EmployeeId into woptech
                            from tech in woptech.DefaultIfEmpty()
                            where wop.WorkOrderId == workOrderId
                            select new
                            {
                                im.PartNumber,
                                im.PartDescription,
                                RevisedPartNo = im1.PartNumber == null ? "" : im1.PartNumber,
                                NTE = (im.OverhaulHours == null ? 0 : im.OverhaulHours) + (im.RPHours == null ? 0 : im.RPHours) + (im.mfgHours == null ? 0 : im.mfgHours) + (im.TestHours == null ? 0 : im.TestHours),
                                Condition = con.Description,
                                StockLine = sl.StockLineNumber,
                                sl.SerialNumber,
                                PublicationId = pub.PublicationId == null ? "" : pub.PublicationId,
                                WorkOrderStage = wos.Description,
                                WorkOrderStatus = wost.Description,
                                Priority = pr.Description,
                                wop.CustomerRequestDate,
                                wop.PromisedDate,
                                wop.EstimatedShipDate,
                                wop.EstimatedCompletionDate,
                                wop.IsDER,
                                wop.IsPMA,
                                tech.FirstName,
                                TechStation = "",
                                TearDownReport = "",
                                TATDaysCurrent = 0,
                                TATDaysStandard = wop.TATDaysStandard,
                                WorkScope = ws.Description,
                                wop.WorkOrderId
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



        #endregion

        #region Work Flow Work Order

        public long CreateWorkFlowWorkOrder(WorkOrderWorkFlow workFlowWorkOrder)
        {
            try
            {
                if (workFlowWorkOrder.WorkOrderEquipments != null && workFlowWorkOrder.WorkOrderEquipments.Count > 0)
                {
                    workFlowWorkOrder.WorkOrderEquipments.ForEach(p => p.AssetRecordId = Convert.ToInt64(p.AssetId));
                }
                workFlowWorkOrder.CreatedDate = workFlowWorkOrder.UpdatedDate = DateTime.Now;
                workFlowWorkOrder.IsActive = true;
                workFlowWorkOrder.IsDeleted = false;

                if (workFlowWorkOrder.WorkFlowWorkOrderId > 0)
                {
                    _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                    _appContext.SaveChanges();
                }
                else
                {
                    _appContext.WorkOrderWorkFlow.Add(workFlowWorkOrder);
                    _appContext.SaveChanges();
                }

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

        public void UpdateWorkFlowWorkOrder(WorkOrderWorkFlow workOrderWorkFlow)
        {
            try
            {
                long workFlowId = 0;
                try
                {
                    if (workOrderWorkFlow.IsSaveToWorkFlow)
                        workFlowId = SaveWorkFlow(workOrderWorkFlow.WorkflowId, workOrderWorkFlow.CreatedBy);
                    else
                        workFlowId = workOrderWorkFlow.WorkflowId;

                    workOrderWorkFlow.UpdatedDate = DateTime.Now;
                    workOrderWorkFlow.IsActive = true;
                    workOrderWorkFlow.IsDeleted = false;
                    workOrderWorkFlow.WorkflowId = workFlowId;
                    _appContext.WorkOrderWorkFlow.Update(workOrderWorkFlow);
                    _appContext.SaveChanges();


                }


                catch (Exception)
                {

                    throw;
                }
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
                    workFlowWorkOrder.WorkOrderCharges = _appContext.WorkOrderCharges.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    workFlowWorkOrder.WorkOrderEquipments = _appContext.WorkOrderAssets.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    workFlowWorkOrder.WorkOrderExclusions = _appContext.WorkOrderExclusions.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    //workFlowWorkOrder.WorkOrderLaborHeader = _appContext.WorkOrderLaborHeader.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).FirstOrDefault();

                    //if (workFlowWorkOrder.WorkOrderLaborHeader != null)
                    //{
                    //    workFlowWorkOrder.WorkOrderLaborHeader.WorkOrderLaborList = _appContext.WorkOrderLabor.Where(p => p.WorkOrderLaborHeaderId == workFlowWorkOrder.WorkOrderLaborHeader.WorkOrderLaborHeaderId).ToList();
                    //}
                    workFlowWorkOrder.WorkOrderMaterialList = _appContext.WorkOrderMaterials.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    //workFlowWorkOrder.WorkOrderTask = _appContext.WorkOrderTask.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    workFlowWorkOrder.WorkOrderDirections = _appContext.WorkOrderDirections.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    workFlowWorkOrder.WorkOrderExpertise = _appContext.WorkOrderExpertise.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
                    workFlowWorkOrder.WorkOrderPublication = _appContext.WorkOrderPublications.Where(p => p.WorkFlowWorkOrderId == workFlowWorkOrderId).ToList();
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
                            join wop in _appContext.WorkOrderPartNumber on w.WorkOrderId equals wop.WorkOrderId
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                            join wf in _appContext.Workflow on w.WorkflowId equals wf.WorkflowId into wwf
                            from wf in wwf.DefaultIfEmpty()
                            where w.IsDeleted == false && w.IsActive == true && w.WorkOrderId == workOrderId
                            select new
                            {
                                value = w.WorkFlowWorkOrderId,
                                label = w.WorkFlowWorkOrderNo,
                                wop.MasterPartId,
                                WorkflowId = wf == null ? 0 : wf.WorkflowId,
                                WorkflowNo = wf == null ? "" : wf.WorkOrderNumber,
                                im.PartNumber
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

        public object WorkOrderWorkFlowView(long workFlowWorkOrderId)
        {
            try
            {
                var data = (from wowf in _appContext.WorkOrderWorkFlow
                            where wowf.WorkFlowWorkOrderId == workFlowWorkOrderId
                            join im in _appContext.ItemMaster on wowf.ItemMasterId equals im.ItemMasterId
                            join c in _appContext.Customer on wowf.CustomerId equals c.CustomerId into wowfc
                            join cur in _appContext.Currency on wowf.CurrencyId equals cur.CurrencyId
                            from c in wowfc.DefaultIfEmpty()
                            join cp in _appContext.ItemMaster on wowf.ChangedPartNumberId equals cp.ItemMasterId into wowfcp
                            from cp in wowfcp.DefaultIfEmpty()

                            select new
                            {
                                wowf.WorkFlowWorkOrderNo,
                                wowf.WorkflowDescription,
                                wowf.Version,
                                wowf.WorkflowCreateDate,
                                wowf.WorkflowExpirationDate,
                                im.PartNumber,
                                im.PartDescription,
                                ChangedPartNumber = cp.PartNumber,
                                ChangedPartNumberDescription = cp.PartDescription,
                                CustomerName = c.Name,
                                Currency = cur.DisplayName,
                                wowf.IsCalculatedBERThreshold,
                                wowf.IsFixedAmount,
                                wowf.FixedAmount,
                                wowf.IsPercentageOfNew,
                                wowf.CostOfNew,
                                wowf.PercentageOfNew,
                                wowf.IsPercentageOfReplacement,
                                wowf.CostOfReplacement,
                                wowf.PercentageOfReplacement,
                                wowf.Memo,
                                wowf.BERThresholdAmount,
                                wowf.OtherCost,
                                wowf.MaterilaCost,
                                wowf.ExpertiseCost,
                                wowf.ChargesCost,
                                wowf.Total,
                                wowf.PerOfBerThreshold,
                            }).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Work Order Labour
        public long CreateWorkOrderLabor(WorkOrderLaborHeader workOrderLaborHeader)
        {
            try
            {
                workOrderLaborHeader.LaborList = new List<WorkOrderLabor>();
                WorkOrderLabor workOrderLabor;
                if (workOrderLaborHeader.WorkOrderLaborList != null)
                {
                    if (workOrderLaborHeader.WorkOrderLaborList.Assemble != null && workOrderLaborHeader.WorkOrderLaborList.Assemble.Count > 0)
                    {
                        foreach (var assemble in workOrderLaborHeader.WorkOrderLaborList.Assemble)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = assemble.AdjustedHours;
                            workOrderLabor.Adjustments = assemble.Adjustments;
                            workOrderLabor.BillableId = assemble.BillableId;
                            workOrderLabor.UpdatedBy = workOrderLabor.CreatedBy = assemble.CreatedBy;
                            workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = assemble.EmployeeId;
                            workOrderLabor.EndDate = assemble.EndDate;
                            workOrderLabor.Expertise = assemble.Expertise;
                            workOrderLabor.ExpertiseId = assemble.ExpertiseId;
                            workOrderLabor.Hours = assemble.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = assemble.StartDate;
                            workOrderLabor.Task = assemble.Task;
                            workOrderLabor.TaskId = assemble.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborId = 0;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Receive != null && workOrderLaborHeader.WorkOrderLaborList.Receive.Count > 0)
                    {
                        foreach (var receive in workOrderLaborHeader.WorkOrderLaborList.Receive)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = receive.AdjustedHours;
                            workOrderLabor.Adjustments = receive.Adjustments;
                            workOrderLabor.BillableId = receive.BillableId;
                            workOrderLabor.UpdatedBy = workOrderLabor.CreatedBy = receive.CreatedBy;
                            workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = receive.EmployeeId;
                            workOrderLabor.EndDate = receive.EndDate;
                            workOrderLabor.Expertise = receive.Expertise;
                            workOrderLabor.ExpertiseId = receive.ExpertiseId;
                            workOrderLabor.Hours = receive.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = receive.StartDate;
                            workOrderLabor.Task = receive.Task;
                            workOrderLabor.TaskId = receive.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborId = 0;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Inspect != null && workOrderLaborHeader.WorkOrderLaborList.Inspect.Count > 0)
                    {
                        foreach (var inspect in workOrderLaborHeader.WorkOrderLaborList.Inspect)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = inspect.AdjustedHours;
                            workOrderLabor.Adjustments = inspect.Adjustments;
                            workOrderLabor.BillableId = inspect.BillableId;
                            workOrderLabor.UpdatedBy = workOrderLabor.CreatedBy = inspect.CreatedBy;
                            workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = inspect.EmployeeId;
                            workOrderLabor.EndDate = inspect.EndDate;
                            workOrderLabor.Expertise = inspect.Expertise;
                            workOrderLabor.ExpertiseId = inspect.ExpertiseId;
                            workOrderLabor.Hours = inspect.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = inspect.StartDate;
                            workOrderLabor.Task = inspect.Task;
                            workOrderLabor.TaskId = inspect.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborId = 0;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Evaluate != null && workOrderLaborHeader.WorkOrderLaborList.Evaluate.Count > 0)
                    {
                        foreach (var evaluate in workOrderLaborHeader.WorkOrderLaborList.Evaluate)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = evaluate.AdjustedHours;
                            workOrderLabor.Adjustments = evaluate.Adjustments;
                            workOrderLabor.BillableId = evaluate.BillableId;
                            workOrderLabor.UpdatedBy = workOrderLabor.CreatedBy = evaluate.CreatedBy;
                            workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = evaluate.EmployeeId;
                            workOrderLabor.EndDate = evaluate.EndDate;
                            workOrderLabor.Expertise = evaluate.Expertise;
                            workOrderLabor.ExpertiseId = evaluate.ExpertiseId;
                            workOrderLabor.Hours = evaluate.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = evaluate.StartDate;
                            workOrderLabor.Task = evaluate.Task;
                            workOrderLabor.TaskId = evaluate.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborId = 0;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.TearDown != null && workOrderLaborHeader.WorkOrderLaborList.TearDown.Count > 0)
                    {
                        foreach (var tearDown in workOrderLaborHeader.WorkOrderLaborList.TearDown)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = tearDown.AdjustedHours;
                            workOrderLabor.Adjustments = tearDown.Adjustments;
                            workOrderLabor.BillableId = tearDown.BillableId;
                            workOrderLabor.UpdatedBy = tearDown.CreatedBy = tearDown.CreatedBy;
                            workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = tearDown.EmployeeId;
                            workOrderLabor.EndDate = tearDown.EndDate;
                            workOrderLabor.Expertise = tearDown.Expertise;
                            workOrderLabor.ExpertiseId = tearDown.ExpertiseId;
                            workOrderLabor.Hours = tearDown.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = tearDown.StartDate;
                            workOrderLabor.Task = tearDown.Task;
                            workOrderLabor.TaskId = tearDown.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborId = 0;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Disassemble != null && workOrderLaborHeader.WorkOrderLaborList.Disassemble.Count > 0)
                    {
                        foreach (var disassemble in workOrderLaborHeader.WorkOrderLaborList.Disassemble)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = disassemble.AdjustedHours;
                            workOrderLabor.Adjustments = disassemble.Adjustments;
                            workOrderLabor.BillableId = disassemble.BillableId;
                            workOrderLabor.UpdatedBy = workOrderLabor.CreatedBy = disassemble.CreatedBy;
                            workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = disassemble.EmployeeId;
                            workOrderLabor.EndDate = disassemble.EndDate;
                            workOrderLabor.Expertise = disassemble.Expertise;
                            workOrderLabor.ExpertiseId = disassemble.ExpertiseId;
                            workOrderLabor.Hours = disassemble.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = disassemble.StartDate;
                            workOrderLabor.Task = disassemble.Task;
                            workOrderLabor.TaskId = disassemble.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborId = 0;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Testing != null && workOrderLaborHeader.WorkOrderLaborList.Testing.Count > 0)
                    {
                        foreach (var testing in workOrderLaborHeader.WorkOrderLaborList.Testing)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = testing.AdjustedHours;
                            workOrderLabor.Adjustments = testing.Adjustments;
                            workOrderLabor.BillableId = testing.BillableId;
                            workOrderLabor.UpdatedBy = workOrderLabor.CreatedBy = testing.CreatedBy;
                            workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = testing.EmployeeId;
                            workOrderLabor.EndDate = testing.EndDate;
                            workOrderLabor.Expertise = testing.Expertise;
                            workOrderLabor.ExpertiseId = testing.ExpertiseId;
                            workOrderLabor.Hours = testing.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = testing.StartDate;
                            workOrderLabor.Task = testing.Task;
                            workOrderLabor.TaskId = testing.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborId = 0;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.QualityControl != null && workOrderLaborHeader.WorkOrderLaborList.QualityControl.Count > 0)
                    {
                        foreach (var qualityControl in workOrderLaborHeader.WorkOrderLaborList.QualityControl)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = qualityControl.AdjustedHours;
                            workOrderLabor.Adjustments = qualityControl.Adjustments;
                            workOrderLabor.BillableId = qualityControl.BillableId;
                            workOrderLabor.UpdatedBy = workOrderLabor.CreatedBy = qualityControl.CreatedBy;
                            workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = qualityControl.EmployeeId;
                            workOrderLabor.EndDate = qualityControl.EndDate;
                            workOrderLabor.Expertise = qualityControl.Expertise;
                            workOrderLabor.ExpertiseId = qualityControl.ExpertiseId;
                            workOrderLabor.Hours = qualityControl.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = qualityControl.StartDate;
                            workOrderLabor.Task = qualityControl.Task;
                            workOrderLabor.TaskId = qualityControl.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborId = 0;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Ship != null && workOrderLaborHeader.WorkOrderLaborList.Ship.Count > 0)
                    {
                        foreach (var ship in workOrderLaborHeader.WorkOrderLaborList.Ship)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = ship.AdjustedHours;
                            workOrderLabor.Adjustments = ship.Adjustments;
                            workOrderLabor.BillableId = ship.BillableId;
                            workOrderLabor.UpdatedBy = workOrderLabor.CreatedBy = ship.CreatedBy;
                            workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = ship.EmployeeId;
                            workOrderLabor.EndDate = ship.EndDate;
                            workOrderLabor.Expertise = ship.Expertise;
                            workOrderLabor.ExpertiseId = ship.ExpertiseId;
                            workOrderLabor.Hours = ship.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = ship.StartDate;
                            workOrderLabor.Task = ship.Task;
                            workOrderLabor.TaskId = ship.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborId = 0;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Clean != null && workOrderLaborHeader.WorkOrderLaborList.Clean.Count > 0)
                    {
                        foreach (var Clean in workOrderLaborHeader.WorkOrderLaborList.Clean)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = Clean.AdjustedHours;
                            workOrderLabor.Adjustments = Clean.Adjustments;
                            workOrderLabor.BillableId = Clean.BillableId;
                            workOrderLabor.UpdatedBy = workOrderLabor.CreatedBy = Clean.CreatedBy;
                            workOrderLabor.CreatedDate = workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = Clean.EmployeeId;
                            workOrderLabor.EndDate = Clean.EndDate;
                            workOrderLabor.Expertise = Clean.Expertise;
                            workOrderLabor.ExpertiseId = Clean.ExpertiseId;
                            workOrderLabor.Hours = Clean.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = Clean.StartDate;
                            workOrderLabor.Task = Clean.Task;
                            workOrderLabor.TaskId = Clean.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborId = 0;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                }

                workOrderLaborHeader.CreatedDate = workOrderLaborHeader.UpdatedDate = DateTime.Now;
                workOrderLaborHeader.IsActive = true;
                workOrderLaborHeader.IsDeleted = false;

                _appContext.WorkOrderLaborHeader.Add(workOrderLaborHeader);
                _appContext.SaveChanges();
                return workOrderLaborHeader.WorkOrderLaborHeaderId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateWorkOrderLabor(WorkOrderLaborHeader workOrderLaborHeader)
        {
            try
            {
                workOrderLaborHeader.LaborList = new List<WorkOrderLabor>();
                WorkOrderLabor workOrderLabor;
                if (workOrderLaborHeader.WorkOrderLaborList != null)
                {
                    if (workOrderLaborHeader.WorkOrderLaborList.Assemble != null && workOrderLaborHeader.WorkOrderLaborList.Assemble.Count > 0)
                    {
                        foreach (var assemble in workOrderLaborHeader.WorkOrderLaborList.Assemble)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = assemble.AdjustedHours;
                            workOrderLabor.Adjustments = assemble.Adjustments;
                            workOrderLabor.BillableId = assemble.BillableId;
                            workOrderLabor.CreatedBy = assemble.CreatedBy;
                            workOrderLabor.CreatedDate = assemble.CreatedDate;
                            workOrderLabor.UpdatedBy = assemble.UpdatedBy;
                            workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = assemble.EmployeeId;
                            workOrderLabor.EndDate = assemble.EndDate;
                            workOrderLabor.Expertise = assemble.Expertise;
                            workOrderLabor.ExpertiseId = assemble.ExpertiseId;
                            workOrderLabor.Hours = assemble.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = assemble.StartDate;
                            workOrderLabor.Task = assemble.Task;
                            workOrderLabor.TaskId = assemble.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = assemble.WorkOrderLaborHeaderId;
                            workOrderLabor.WorkOrderLaborId = assemble.WorkOrderLaborId;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Receive != null && workOrderLaborHeader.WorkOrderLaborList.Receive.Count > 0)
                    {
                        foreach (var receive in workOrderLaborHeader.WorkOrderLaborList.Receive)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = receive.AdjustedHours;
                            workOrderLabor.Adjustments = receive.Adjustments;
                            workOrderLabor.BillableId = receive.BillableId;
                            workOrderLabor.CreatedBy = receive.CreatedBy;
                            workOrderLabor.CreatedDate = receive.CreatedDate;
                            workOrderLabor.UpdatedBy = receive.UpdatedBy;
                            workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = receive.EmployeeId;
                            workOrderLabor.EndDate = receive.EndDate;
                            workOrderLabor.Expertise = receive.Expertise;
                            workOrderLabor.ExpertiseId = receive.ExpertiseId;
                            workOrderLabor.Hours = receive.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = receive.StartDate;
                            workOrderLabor.Task = receive.Task;
                            workOrderLabor.TaskId = receive.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = 0;
                            workOrderLabor.WorkOrderLaborHeaderId = receive.WorkOrderLaborHeaderId;
                            workOrderLabor.WorkOrderLaborId = receive.WorkOrderLaborId;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Inspect != null && workOrderLaborHeader.WorkOrderLaborList.Inspect.Count > 0)
                    {
                        foreach (var inspect in workOrderLaborHeader.WorkOrderLaborList.Inspect)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = inspect.AdjustedHours;
                            workOrderLabor.Adjustments = inspect.Adjustments;
                            workOrderLabor.BillableId = inspect.BillableId;
                            workOrderLabor.CreatedBy = inspect.CreatedBy;
                            workOrderLabor.CreatedDate = inspect.CreatedDate;
                            workOrderLabor.UpdatedBy = inspect.UpdatedBy;
                            workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = inspect.EmployeeId;
                            workOrderLabor.EndDate = inspect.EndDate;
                            workOrderLabor.Expertise = inspect.Expertise;
                            workOrderLabor.ExpertiseId = inspect.ExpertiseId;
                            workOrderLabor.Hours = inspect.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = inspect.StartDate;
                            workOrderLabor.Task = inspect.Task;
                            workOrderLabor.TaskId = inspect.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = inspect.WorkOrderLaborHeaderId;
                            workOrderLabor.WorkOrderLaborId = inspect.WorkOrderLaborId;
                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Evaluate != null && workOrderLaborHeader.WorkOrderLaborList.Evaluate.Count > 0)
                    {
                        foreach (var evaluate in workOrderLaborHeader.WorkOrderLaborList.Evaluate)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = evaluate.AdjustedHours;
                            workOrderLabor.Adjustments = evaluate.Adjustments;
                            workOrderLabor.BillableId = evaluate.BillableId;
                            workOrderLabor.CreatedBy = evaluate.CreatedBy;
                            workOrderLabor.CreatedDate = evaluate.CreatedDate;
                            workOrderLabor.UpdatedBy = evaluate.UpdatedBy;
                            workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = evaluate.EmployeeId;
                            workOrderLabor.EndDate = evaluate.EndDate;
                            workOrderLabor.Expertise = evaluate.Expertise;
                            workOrderLabor.ExpertiseId = evaluate.ExpertiseId;
                            workOrderLabor.Hours = evaluate.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = evaluate.StartDate;
                            workOrderLabor.Task = evaluate.Task;
                            workOrderLabor.TaskId = evaluate.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = evaluate.WorkOrderLaborHeaderId;
                            workOrderLabor.WorkOrderLaborId = evaluate.WorkOrderLaborId;

                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.TearDown != null && workOrderLaborHeader.WorkOrderLaborList.TearDown.Count > 0)
                    {
                        foreach (var tearDown in workOrderLaborHeader.WorkOrderLaborList.TearDown)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = tearDown.AdjustedHours;
                            workOrderLabor.Adjustments = tearDown.Adjustments;
                            workOrderLabor.BillableId = tearDown.BillableId;
                            workOrderLabor.CreatedBy = tearDown.CreatedBy;
                            workOrderLabor.CreatedDate = tearDown.CreatedDate;
                            workOrderLabor.UpdatedBy = tearDown.UpdatedBy;
                            workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = tearDown.EmployeeId;
                            workOrderLabor.EndDate = tearDown.EndDate;
                            workOrderLabor.Expertise = tearDown.Expertise;
                            workOrderLabor.ExpertiseId = tearDown.ExpertiseId;
                            workOrderLabor.Hours = tearDown.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = tearDown.StartDate;
                            workOrderLabor.Task = tearDown.Task;
                            workOrderLabor.TaskId = tearDown.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = tearDown.WorkOrderLaborHeaderId;
                            workOrderLabor.WorkOrderLaborId = tearDown.WorkOrderLaborId;

                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Disassemble != null && workOrderLaborHeader.WorkOrderLaborList.Disassemble.Count > 0)
                    {
                        foreach (var disassemble in workOrderLaborHeader.WorkOrderLaborList.Disassemble)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = disassemble.AdjustedHours;
                            workOrderLabor.Adjustments = disassemble.Adjustments;
                            workOrderLabor.BillableId = disassemble.BillableId;
                            workOrderLabor.CreatedBy = disassemble.CreatedBy;
                            workOrderLabor.CreatedDate = disassemble.CreatedDate;
                            workOrderLabor.UpdatedBy = disassemble.UpdatedBy;
                            workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = disassemble.EmployeeId;
                            workOrderLabor.EndDate = disassemble.EndDate;
                            workOrderLabor.Expertise = disassemble.Expertise;
                            workOrderLabor.ExpertiseId = disassemble.ExpertiseId;
                            workOrderLabor.Hours = disassemble.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = disassemble.StartDate;
                            workOrderLabor.Task = disassemble.Task;
                            workOrderLabor.TaskId = disassemble.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = disassemble.WorkOrderLaborHeaderId;
                            workOrderLabor.WorkOrderLaborId = disassemble.WorkOrderLaborId;

                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Testing != null && workOrderLaborHeader.WorkOrderLaborList.Testing.Count > 0)
                    {
                        foreach (var testing in workOrderLaborHeader.WorkOrderLaborList.Testing)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = testing.AdjustedHours;
                            workOrderLabor.Adjustments = testing.Adjustments;
                            workOrderLabor.BillableId = testing.BillableId;
                            workOrderLabor.CreatedBy = testing.CreatedBy;
                            workOrderLabor.CreatedDate = testing.CreatedDate;
                            workOrderLabor.UpdatedBy = testing.UpdatedBy;
                            workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = testing.EmployeeId;
                            workOrderLabor.EndDate = testing.EndDate;
                            workOrderLabor.Expertise = testing.Expertise;
                            workOrderLabor.ExpertiseId = testing.ExpertiseId;
                            workOrderLabor.Hours = testing.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = testing.StartDate;
                            workOrderLabor.Task = testing.Task;
                            workOrderLabor.TaskId = testing.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = testing.WorkOrderLaborHeaderId;
                            workOrderLabor.WorkOrderLaborId = testing.WorkOrderLaborId;

                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.QualityControl != null && workOrderLaborHeader.WorkOrderLaborList.QualityControl.Count > 0)
                    {
                        foreach (var qualityControl in workOrderLaborHeader.WorkOrderLaborList.QualityControl)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = qualityControl.AdjustedHours;
                            workOrderLabor.Adjustments = qualityControl.Adjustments;
                            workOrderLabor.BillableId = qualityControl.BillableId;
                            workOrderLabor.CreatedBy = qualityControl.CreatedBy;
                            workOrderLabor.CreatedDate = qualityControl.CreatedDate;
                            workOrderLabor.UpdatedBy = qualityControl.UpdatedBy;
                            workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = qualityControl.EmployeeId;
                            workOrderLabor.EndDate = qualityControl.EndDate;
                            workOrderLabor.Expertise = qualityControl.Expertise;
                            workOrderLabor.ExpertiseId = qualityControl.ExpertiseId;
                            workOrderLabor.Hours = qualityControl.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = qualityControl.StartDate;
                            workOrderLabor.Task = qualityControl.Task;
                            workOrderLabor.TaskId = qualityControl.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = qualityControl.WorkOrderLaborHeaderId;
                            workOrderLabor.WorkOrderLaborId = qualityControl.WorkOrderLaborId;

                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Ship != null && workOrderLaborHeader.WorkOrderLaborList.Ship.Count > 0)
                    {
                        foreach (var ship in workOrderLaborHeader.WorkOrderLaborList.Ship)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = ship.AdjustedHours;
                            workOrderLabor.Adjustments = ship.Adjustments;
                            workOrderLabor.BillableId = ship.BillableId;
                            workOrderLabor.CreatedBy = ship.CreatedBy;
                            workOrderLabor.CreatedDate = ship.CreatedDate;
                            workOrderLabor.UpdatedBy = ship.UpdatedBy;
                            workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = ship.EmployeeId;
                            workOrderLabor.EndDate = ship.EndDate;
                            workOrderLabor.Expertise = ship.Expertise;
                            workOrderLabor.ExpertiseId = ship.ExpertiseId;
                            workOrderLabor.Hours = ship.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = ship.StartDate;
                            workOrderLabor.Task = ship.Task;
                            workOrderLabor.TaskId = ship.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = ship.WorkOrderLaborHeaderId;
                            workOrderLabor.WorkOrderLaborId = ship.WorkOrderLaborId;

                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                    if (workOrderLaborHeader.WorkOrderLaborList.Clean != null && workOrderLaborHeader.WorkOrderLaborList.Clean.Count > 0)
                    {
                        foreach (var clean in workOrderLaborHeader.WorkOrderLaborList.Clean)
                        {
                            workOrderLabor = new WorkOrderLabor();
                            workOrderLabor.AdjustedHours = clean.AdjustedHours;
                            workOrderLabor.Adjustments = clean.Adjustments;
                            workOrderLabor.BillableId = clean.BillableId;
                            workOrderLabor.CreatedBy = clean.CreatedBy;
                            workOrderLabor.CreatedDate = clean.CreatedDate;
                            workOrderLabor.UpdatedBy = clean.UpdatedBy;
                            workOrderLabor.UpdatedDate = DateTime.Now;
                            workOrderLabor.EmployeeId = clean.EmployeeId;
                            workOrderLabor.EndDate = clean.EndDate;
                            workOrderLabor.Expertise = clean.Expertise;
                            workOrderLabor.ExpertiseId = clean.ExpertiseId;
                            workOrderLabor.Hours = clean.Hours;
                            workOrderLabor.IsActive = true;
                            workOrderLabor.IsDeleted = false;
                            workOrderLabor.StartDate = clean.StartDate;
                            workOrderLabor.Task = clean.Task;
                            workOrderLabor.TaskId = clean.TaskId;
                            workOrderLabor.WorkOrderLaborHeaderId = clean.WorkOrderLaborHeaderId;
                            workOrderLabor.WorkOrderLaborId = clean.WorkOrderLaborId;

                            workOrderLaborHeader.LaborList.Add(workOrderLabor);
                        }
                    }
                }

                workOrderLaborHeader.UpdatedDate = DateTime.Now;
                workOrderLaborHeader.IsActive = true;
                workOrderLaborHeader.IsDeleted = false;

                _appContext.WorkOrderLaborHeader.Update(workOrderLaborHeader);
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
            WorkOrderLaborList workOrderLaborList = null;
            int count = 0;

            try
            {

                var result = (from lh in _appContext.WorkOrderLaborHeader
                              join l in _appContext.WorkOrderLabor on lh.WorkOrderLaborHeaderId equals l.WorkOrderLaborHeaderId
                              where lh.IsDeleted == false && (lh.WorkOrderId == workOrderId || lh.WorkFlowWorkOrderId == wfwoId)
                              select new
                              {
                                  lh,
                                  l
                              }).ToList();
                if (result != null && result.Count > 0)
                {
                    workOrderLaborList = new WorkOrderLaborList();
                    workOrderLaborList.Receive = new List<Receive>();
                    workOrderLaborList.Inspect = new List<Inspect>();
                    workOrderLaborList.Evaluate = new List<Evaluate>();
                    workOrderLaborList.TearDown = new List<TearDown>();
                    workOrderLaborList.Disassemble = new List<Disassemble>();
                    workOrderLaborList.Assemble = new List<Assemble>();
                    workOrderLaborList.Testing = new List<Testing>();
                    workOrderLaborList.QualityControl = new List<QualityControl>();
                    workOrderLaborList.Ship = new List<Ship>();
                    workOrderLaborList.Clean = new List<Clean>();

                    foreach (var item in result)
                    {
                        if (count == 0)
                            workFlowLabourHeader = item.lh;


                        if (item.l.TaskId == Convert.ToInt64(TaskEnum.Receive))
                        {
                            Receive receive = new Receive();

                            receive.WorkOrderLaborId = item.l.WorkOrderLaborId;
                            receive.WorkOrderLaborHeaderId = item.l.WorkOrderLaborHeaderId;
                            receive.TaskId = item.l.TaskId;
                            receive.ExpertiseId = item.l.ExpertiseId;
                            receive.EmployeeId = item.l.EmployeeId;
                            receive.BillableId = item.l.BillableId;
                            receive.StartDate = item.l.StartDate;
                            receive.EndDate = item.l.EndDate;
                            receive.Hours = item.l.Hours;
                            receive.Adjustments = item.l.Adjustments;
                            receive.AdjustedHours = item.l.AdjustedHours;
                            receive.Memo = item.l.Memo;
                            receive.CreatedBy = item.l.CreatedBy;
                            receive.UpdatedBy = item.l.UpdatedBy;
                            receive.CreatedDate = item.l.CreatedDate;
                            receive.UpdatedDate = item.l.UpdatedDate;
                            receive.IsActive = item.l.IsActive;
                            receive.IsDeleted = item.l.IsDeleted;

                            workOrderLaborList.Receive.Add(receive);
                        }
                        else if (item.l.TaskId == Convert.ToInt64(TaskEnum.Inspect))
                        {
                            Inspect inspect = new Inspect();

                            inspect.WorkOrderLaborId = item.l.WorkOrderLaborId;
                            inspect.WorkOrderLaborHeaderId = item.l.WorkOrderLaborHeaderId;
                            inspect.TaskId = item.l.TaskId;
                            inspect.ExpertiseId = item.l.ExpertiseId;
                            inspect.EmployeeId = item.l.EmployeeId;
                            inspect.BillableId = item.l.BillableId;
                            inspect.StartDate = item.l.StartDate;
                            inspect.EndDate = item.l.EndDate;
                            inspect.Hours = item.l.Hours;
                            inspect.Adjustments = item.l.Adjustments;
                            inspect.AdjustedHours = item.l.AdjustedHours;
                            inspect.Memo = item.l.Memo;
                            inspect.CreatedBy = item.l.CreatedBy;
                            inspect.UpdatedBy = item.l.UpdatedBy;
                            inspect.CreatedDate = item.l.CreatedDate;
                            inspect.UpdatedDate = item.l.UpdatedDate;
                            inspect.IsActive = item.l.IsActive;
                            inspect.IsDeleted = item.l.IsDeleted;

                            workOrderLaborList.Inspect.Add(inspect);
                        }
                        else if (item.l.TaskId == Convert.ToInt64(TaskEnum.Evaluate))
                        {
                            Evaluate evaluate = new Evaluate();

                            evaluate.WorkOrderLaborId = item.l.WorkOrderLaborId;
                            evaluate.WorkOrderLaborHeaderId = item.l.WorkOrderLaborHeaderId;
                            evaluate.TaskId = item.l.TaskId;
                            evaluate.ExpertiseId = item.l.ExpertiseId;
                            evaluate.EmployeeId = item.l.EmployeeId;
                            evaluate.BillableId = item.l.BillableId;
                            evaluate.StartDate = item.l.StartDate;
                            evaluate.EndDate = item.l.EndDate;
                            evaluate.Hours = item.l.Hours;
                            evaluate.Adjustments = item.l.Adjustments;
                            evaluate.AdjustedHours = item.l.AdjustedHours;
                            evaluate.Memo = item.l.Memo;
                            evaluate.CreatedBy = item.l.CreatedBy;
                            evaluate.UpdatedBy = item.l.UpdatedBy;
                            evaluate.CreatedDate = item.l.CreatedDate;
                            evaluate.UpdatedDate = item.l.UpdatedDate;
                            evaluate.IsActive = item.l.IsActive;
                            evaluate.IsDeleted = item.l.IsDeleted;

                            workOrderLaborList.Evaluate.Add(evaluate);
                        }
                        else if (item.l.TaskId == Convert.ToInt64(TaskEnum.TearDown))
                        {
                            TearDown tearDown = new TearDown();

                            tearDown.WorkOrderLaborId = item.l.WorkOrderLaborId;
                            tearDown.WorkOrderLaborHeaderId = item.l.WorkOrderLaborHeaderId;
                            tearDown.TaskId = item.l.TaskId;
                            tearDown.ExpertiseId = item.l.ExpertiseId;
                            tearDown.EmployeeId = item.l.EmployeeId;
                            tearDown.BillableId = item.l.BillableId;
                            tearDown.StartDate = item.l.StartDate;
                            tearDown.EndDate = item.l.EndDate;
                            tearDown.Hours = item.l.Hours;
                            tearDown.Adjustments = item.l.Adjustments;
                            tearDown.AdjustedHours = item.l.AdjustedHours;
                            tearDown.Memo = item.l.Memo;
                            tearDown.CreatedBy = item.l.CreatedBy;
                            tearDown.UpdatedBy = item.l.UpdatedBy;
                            tearDown.CreatedDate = item.l.CreatedDate;
                            tearDown.UpdatedDate = item.l.UpdatedDate;
                            tearDown.IsActive = item.l.IsActive;
                            tearDown.IsDeleted = item.l.IsDeleted;

                            workOrderLaborList.TearDown.Add(tearDown);
                        }
                        else if (item.l.TaskId == Convert.ToInt64(TaskEnum.Disassemble))
                        {
                            Disassemble disassemble = new Disassemble();

                            disassemble.WorkOrderLaborId = item.l.WorkOrderLaborId;
                            disassemble.WorkOrderLaborHeaderId = item.l.WorkOrderLaborHeaderId;
                            disassemble.TaskId = item.l.TaskId;
                            disassemble.ExpertiseId = item.l.ExpertiseId;
                            disassemble.EmployeeId = item.l.EmployeeId;
                            disassemble.BillableId = item.l.BillableId;
                            disassemble.StartDate = item.l.StartDate;
                            disassemble.EndDate = item.l.EndDate;
                            disassemble.Hours = item.l.Hours;
                            disassemble.Adjustments = item.l.Adjustments;
                            disassemble.AdjustedHours = item.l.AdjustedHours;
                            disassemble.Memo = item.l.Memo;
                            disassemble.CreatedBy = item.l.CreatedBy;
                            disassemble.UpdatedBy = item.l.UpdatedBy;
                            disassemble.CreatedDate = item.l.CreatedDate;
                            disassemble.UpdatedDate = item.l.UpdatedDate;
                            disassemble.IsActive = item.l.IsActive;
                            disassemble.IsDeleted = item.l.IsDeleted;

                            workOrderLaborList.Disassemble.Add(disassemble);
                        }
                        else if (item.l.TaskId == Convert.ToInt64(TaskEnum.Assemble))
                        {
                            Assemble assemble = new Assemble();

                            assemble.WorkOrderLaborId = item.l.WorkOrderLaborId;
                            assemble.WorkOrderLaborHeaderId = item.l.WorkOrderLaborHeaderId;
                            assemble.TaskId = item.l.TaskId;
                            assemble.ExpertiseId = item.l.ExpertiseId;
                            assemble.EmployeeId = item.l.EmployeeId;
                            assemble.BillableId = item.l.BillableId;
                            assemble.StartDate = item.l.StartDate;
                            assemble.EndDate = item.l.EndDate;
                            assemble.Hours = item.l.Hours;
                            assemble.Adjustments = item.l.Adjustments;
                            assemble.AdjustedHours = item.l.AdjustedHours;
                            assemble.Memo = item.l.Memo;
                            assemble.CreatedBy = item.l.CreatedBy;
                            assemble.UpdatedBy = item.l.UpdatedBy;
                            assemble.CreatedDate = item.l.CreatedDate;
                            assemble.UpdatedDate = item.l.UpdatedDate;
                            assemble.IsActive = item.l.IsActive;
                            assemble.IsDeleted = item.l.IsDeleted;

                            workOrderLaborList.Assemble.Add(assemble);
                        }
                        else if (item.l.TaskId == Convert.ToInt64(TaskEnum.Testing))
                        {
                            Testing testing = new Testing();

                            testing.WorkOrderLaborId = item.l.WorkOrderLaborId;
                            testing.WorkOrderLaborHeaderId = item.l.WorkOrderLaborHeaderId;
                            testing.TaskId = item.l.TaskId;
                            testing.ExpertiseId = item.l.ExpertiseId;
                            testing.EmployeeId = item.l.EmployeeId;
                            testing.BillableId = item.l.BillableId;
                            testing.StartDate = item.l.StartDate;
                            testing.EndDate = item.l.EndDate;
                            testing.Hours = item.l.Hours;
                            testing.Adjustments = item.l.Adjustments;
                            testing.AdjustedHours = item.l.AdjustedHours;
                            testing.Memo = item.l.Memo;
                            testing.CreatedBy = item.l.CreatedBy;
                            testing.UpdatedBy = item.l.UpdatedBy;
                            testing.CreatedDate = item.l.CreatedDate;
                            testing.UpdatedDate = item.l.UpdatedDate;
                            testing.IsActive = item.l.IsActive;
                            testing.IsDeleted = item.l.IsDeleted;

                            workOrderLaborList.Testing.Add(testing);
                        }
                        else if (item.l.TaskId == Convert.ToInt64(TaskEnum.QualityControl))
                        {
                            QualityControl qualityControl = new QualityControl();

                            qualityControl.WorkOrderLaborId = item.l.WorkOrderLaborId;
                            qualityControl.WorkOrderLaborHeaderId = item.l.WorkOrderLaborHeaderId;
                            qualityControl.TaskId = item.l.TaskId;
                            qualityControl.ExpertiseId = item.l.ExpertiseId;
                            qualityControl.EmployeeId = item.l.EmployeeId;
                            qualityControl.BillableId = item.l.BillableId;
                            qualityControl.StartDate = item.l.StartDate;
                            qualityControl.EndDate = item.l.EndDate;
                            qualityControl.Hours = item.l.Hours;
                            qualityControl.Adjustments = item.l.Adjustments;
                            qualityControl.AdjustedHours = item.l.AdjustedHours;
                            qualityControl.Memo = item.l.Memo;
                            qualityControl.CreatedBy = item.l.CreatedBy;
                            qualityControl.UpdatedBy = item.l.UpdatedBy;
                            qualityControl.CreatedDate = item.l.CreatedDate;
                            qualityControl.UpdatedDate = item.l.UpdatedDate;
                            qualityControl.IsActive = item.l.IsActive;
                            qualityControl.IsDeleted = item.l.IsDeleted;

                            workOrderLaborList.QualityControl.Add(qualityControl);
                        }
                        else if (item.l.TaskId == Convert.ToInt64(TaskEnum.Ship))
                        {
                            Ship ship = new Ship();

                            ship.WorkOrderLaborId = item.l.WorkOrderLaborId;
                            ship.WorkOrderLaborHeaderId = item.l.WorkOrderLaborHeaderId;
                            ship.TaskId = item.l.TaskId;
                            ship.ExpertiseId = item.l.ExpertiseId;
                            ship.EmployeeId = item.l.EmployeeId;
                            ship.BillableId = item.l.BillableId;
                            ship.StartDate = item.l.StartDate;
                            ship.EndDate = item.l.EndDate;
                            ship.Hours = item.l.Hours;
                            ship.Adjustments = item.l.Adjustments;
                            ship.AdjustedHours = item.l.AdjustedHours;
                            ship.Memo = item.l.Memo;
                            ship.CreatedBy = item.l.CreatedBy;
                            ship.UpdatedBy = item.l.UpdatedBy;
                            ship.CreatedDate = item.l.CreatedDate;
                            ship.UpdatedDate = item.l.UpdatedDate;
                            ship.IsActive = item.l.IsActive;
                            ship.IsDeleted = item.l.IsDeleted;

                            workOrderLaborList.Ship.Add(ship);
                        }
                        else if (item.l.TaskId == Convert.ToInt64(TaskEnum.Clean))
                        {
                            Clean clean = new Clean();

                            clean.WorkOrderLaborId = item.l.WorkOrderLaborId;
                            clean.WorkOrderLaborHeaderId = item.l.WorkOrderLaborHeaderId;
                            clean.TaskId = item.l.TaskId;
                            clean.ExpertiseId = item.l.ExpertiseId;
                            clean.EmployeeId = item.l.EmployeeId;
                            clean.BillableId = item.l.BillableId;
                            clean.StartDate = item.l.StartDate;
                            clean.EndDate = item.l.EndDate;
                            clean.Hours = item.l.Hours;
                            clean.Adjustments = item.l.Adjustments;
                            clean.AdjustedHours = item.l.AdjustedHours;
                            clean.Memo = item.l.Memo;
                            clean.CreatedBy = item.l.CreatedBy;
                            clean.UpdatedBy = item.l.UpdatedBy;
                            clean.CreatedDate = item.l.CreatedDate;
                            clean.UpdatedDate = item.l.UpdatedDate;
                            clean.IsActive = item.l.IsActive;
                            clean.IsDeleted = item.l.IsDeleted;

                            workOrderLaborList.Clean.Add(clean);
                        }
                        count++;
                    }

                    workFlowLabourHeader.WorkOrderLaborList = workOrderLaborList;

                }

                //var result = _appContext.WorkOrderLaborHeader
                //             .Join(_appContext.WorkOrderLabor,
                //            wlh => wlh.WorkOrderLaborHeaderId,
                //            wl => wl.WorkOrderLaborHeaderId,
                //            (wlh, wl) => new { wlh, wl })
                //            .Join(_appContext.Task,
                //            wfe => wfe.wl.TaskId,
                //            t => t.TaskId,
                //            (wfe, t) => new { wfe, t })
                //             .Join(_appContext.ExpertiseType,
                //            wfe1 => wfe1.wfe.wl.ExpertiseId,
                //            et => et.ExpertiseTypeId,
                //            (wfe1, et) => new { wfe1, et })
                //             .Where(p => (p.wfe1.wfe.wlh.WorkFlowWorkOrderId == wfwoId || p.wfe1.wfe.wlh.WorkOrderId == workOrderId) && p.wfe1.wfe.wlh.IsDeleted == false)
                //             .Select(p => new
                //             {

                //                 WorkOrderLaborHeader = p.wfe1.wfe.wlh,
                //                 WorkFlowLabour = p.wfe1.wfe.wl,
                //                 Task = p.wfe1.t.Description,
                //                 Expertise = p.et.Description,

                //             })
                //             .ToList();
                //if (result != null && result.Count > 0)
                //{
                //    workFlowLabourHeader = new WorkOrderLaborHeader();
                //    workFlowLabourHeader = result.FirstOrDefault().WorkOrderLaborHeader;
                //    workFlowLabourHeader.LaborList = new List<WorkOrderLabor>();
                //    foreach (var item in result)
                //    {
                //        workOrderLabor = new WorkOrderLabor();
                //        workOrderLabor = item.WorkFlowLabour;
                //        workOrderLabor.Task = item.Task;
                //        workOrderLabor.Expertise = item.Expertise;
                //        workFlowLabourHeader.LaborList.Add(workOrderLabor);
                //    }
                //}

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

        public IEnumerable<object> GetWorkFlowWorkOrderChargesList(long wfwoId = 0, long workOrderId = 0)
        {
            try
            {
                var list = (from woc in _appContext.WorkOrderCharges
                            join ct in _appContext.ChargesTypes on woc.ChargesTypeId equals ct.Id
                            join v in _appContext.Vendor on woc.VendorId equals v.VendorId into wocv
                            from v in wocv.DefaultIfEmpty()
                            where woc.IsDeleted == false && (woc.WorkFlowWorkOrderId == wfwoId || woc.WorkOrderId == workOrderId)
                            select new
                            {
                                woc.ChargesTypeId,
                                ChargeType = ct.Name,
                                woc.Description,
                                woc.Quantity,
                                woc.UnitCost,
                                woc.ExtentedCost,
                                woc.UnitPrice,
                                woc.ExtentedPrice,
                                woc.VendorId,
                                v.VendorName,
                                woc.Amount,
                                woc.CostPlusAmount,
                                woc.CreatedBy,
                                woc.CreatedDate,
                                woc.FixedAmount,
                                woc.InvoiceNo,
                                woc.IsActive,
                                woc.IsDeleted,
                                woc.MarkupPercentageId,
                                woc.MasterCompanyId,
                                woc.RoNumberId,
                                woc.TaskId,
                                woc.UpdatedBy,
                                woc.UpdatedDate,
                                woc.WorkFlowWorkOrderId,
                                woc.WorkOrderChargesId,
                                woc.WorkOrderId
                            }
                          ).Distinct().ToList();
                return list;
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
                                               Asset = a.Name,
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

        public List<WorkOrderMaterials> CreateWorkOrderMaterials(List<WorkOrderMaterials> workOrderMaterials)
        {
            try
            {
                _appContext.WorkOrderMaterials.AddRange(workOrderMaterials);
                _appContext.SaveChanges();
                return workOrderMaterials;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<WorkOrderMaterials> UpdateWorkOrderMaterials(List<WorkOrderMaterials> workOrderMaterials)
        {
            try
            {
                foreach (var item in workOrderMaterials)
                {
                    if (item.WorkOrderMaterialsId > 0)
                    {
                        _appContext.WorkOrderMaterials.Update(item);
                    }
                    else
                    {
                        _appContext.WorkOrderMaterials.Add(item);
                    }
                    _appContext.SaveChanges();
                }

                return workOrderMaterials;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderMaterialList(long wfwoId, long workOrderId)
        {

            try
            {
                var workOrderMaterialsList = (from wom in _appContext.WorkOrderMaterials
                                              join sl in _appContext.StockLine on wom.ItemMasterId equals sl.ItemMasterId into sls
                                              from sl in sls.DefaultIfEmpty()
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
                                              where wom.IsDeleted == false && (wom.WorkOrderId == workOrderId || wom.WorkFlowWorkOrderId == wfwoId)
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
                                                  SalesOrder = string.Empty,
                                                  TimeLife = tl.TimeRemaining,
                                                  WareHouse = wh.Name,
                                                  Location = lo.Name,
                                                  Shelf = sh.Name,
                                                  Bin = bi.Name

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

        public IEnumerable<WorkOrderReserveIssuesParts> GetReservedIssuedParts(long WorkFlowWorkOrderId, long workOrderId)
        {
            List<WorkOrderReserveIssuesParts> workOrderReserveIssuesParts = new List<WorkOrderReserveIssuesParts>();
            WorkOrderReserveIssuesParts workOrderReserveIssuesPart;
            try
            {
                var list = (from wom in _appContext.WorkOrderMaterials

                            join im in _appContext.ItemMaster on wom.ItemMasterId equals im.ItemMasterId
                            join con in _appContext.Condition on wom.ConditionCodeId equals con.ConditionId into wopcon
                            from con in wopcon.DefaultIfEmpty()
                            join sl in _appContext.StockLine on new { a = (long?)con.ConditionId, b = im.ItemMasterId } equals new { a = sl.ConditionId, b = sl == null ? 0 : sl.ItemMasterId }
                            into wopsl
                            from sl in wopsl.DefaultIfEmpty()

                            where wom.IsDeleted == false && wom.IsActive == true && wom.IsAltPart == false

                            && (wom.WorkFlowWorkOrderId == WorkFlowWorkOrderId || wom.WorkOrderId == workOrderId)
                            select new
                            {
                                wom.WorkOrderId,
                                wom.WorkFlowWorkOrderId,
                                im.PartNumber,
                                im.PartDescription,
                                wom.Quantity,
                                wom.QuantityReserved,
                                wom.QuantityTurnIn,
                                wom.QuantityIssued,
                                Condition = con.Description,
                                wom.ConditionCodeId,
                                QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                                QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                                QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                                StockLineId = sl == null ? 0 : sl.StockLineId,
                                wom.IssuedBy,
                                wom.IssuedDate,
                                wom.ReservedBy,
                                wom.ReservedDate,
                                wom.ItemMasterId,
                                wom.WorkOrderMaterialsId,
                                wom.IsAltPart,
                                im.ItemClassificationId,
                                im.PurchaseUnitOfMeasureId,
                                wom.TaskId
                            }
                          ).Distinct()
                          .ToList();

                if (list != null && list.Count > 0)
                {
                    foreach (var item in list)
                    {
                        workOrderReserveIssuesPart = new WorkOrderReserveIssuesParts();
                        workOrderReserveIssuesPart.Condition = item.Condition;
                        workOrderReserveIssuesPart.ConditionId = item.ConditionCodeId;
                        workOrderReserveIssuesPart.IssuedBy = item.IssuedBy;
                        workOrderReserveIssuesPart.IssuedDate = item.IssuedDate;
                        workOrderReserveIssuesPart.ItemMasterId = item.ItemMasterId;
                        workOrderReserveIssuesPart.PartDescription = item.PartDescription;
                        workOrderReserveIssuesPart.PartNumber = item.PartNumber;
                        workOrderReserveIssuesPart.Quantity = item.Quantity;
                        workOrderReserveIssuesPart.QuantityAvailable = item.QuantityAvailable;
                        workOrderReserveIssuesPart.QuantityIssued = item.QuantityIssued;
                        workOrderReserveIssuesPart.QuantityOnHand = item.QuantityOnHand;
                        workOrderReserveIssuesPart.QuantityOnOrder = item.QuantityOnOrder;
                        workOrderReserveIssuesPart.QuantityReserved = item.QuantityReserved;
                        workOrderReserveIssuesPart.QuantityTurnIn = item.QuantityTurnIn;
                        workOrderReserveIssuesPart.ReservedBy = item.ReservedBy;
                        workOrderReserveIssuesPart.ReservedDate = item.ReservedDate;
                        workOrderReserveIssuesPart.WOReservedIssuedAltParts = GetWOReservedIssuedAltParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WorkOrderId = item.WorkOrderId;
                        workOrderReserveIssuesPart.WorkFlowWorkOrderId = item.WorkFlowWorkOrderId;
                        workOrderReserveIssuesPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                        workOrderReserveIssuesPart.IsAltPart = item.IsAltPart;
                        workOrderReserveIssuesPart.AltPartMasterPartId = 0;
                        workOrderReserveIssuesPart.StockLineId = item.StockLineId;
                        workOrderReserveIssuesPart.TaskId = item.TaskId;
                        workOrderReserveIssuesPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                        workOrderReserveIssuesPart.ItemClassificationId = item.ItemClassificationId;
                        workOrderReserveIssuesParts.Add(workOrderReserveIssuesPart);
                    }
                }

                return workOrderReserveIssuesParts;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<WorkOrderReserveIssuesParts> SaveReserveIssuesParts(List<WorkOrderReserveIssuesParts> reserveIssuesParts)
        {
            try
            {
                foreach (var part in reserveIssuesParts)
                {
                    SaveWorkOrderMaterial(part);
                    SaveStockLine(part);

                    if (part.WOReservedIssuedAltParts != null && part.WOReservedIssuedAltParts.Count > 0)
                    {
                        foreach (var altPart in part.WOReservedIssuedAltParts)
                        {
                            SaveWorkOrderMaterialAltPart(altPart);
                            SaveStockLineAltPart(altPart);
                        }
                    }
                }
                return reserveIssuesParts;
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

        #region Work Order Publications

        public List<WorkOrderPublications> CreateWorkOrderPublications(List<WorkOrderPublications> workOrderPublications)
        {
            try
            {
                if (workOrderPublications != null && workOrderPublications.Count > 0)
                {
                    _appContext.WorkOrderPublications.AddRange(workOrderPublications);
                    _appContext.SaveChanges();
                }
                return workOrderPublications;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<WorkOrderPublications> UpdateWorkOrderPublications(List<WorkOrderPublications> workOrderPublications)
        {
            try
            {
                foreach (var item in workOrderPublications)
                {
                    if (item.WorkOrderPublicationId > 0)
                    {
                        _appContext.WorkOrderPublications.Update(item);
                    }
                    else
                    {
                        _appContext.WorkOrderPublications.Add(item);
                    }
                    _appContext.SaveChanges();
                }

                return workOrderPublications;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderPublication(long workOrderPublicationId, string updatedBy)
        {
            WorkOrderPublications workOrderPublications = new WorkOrderPublications();
            try
            {
                workOrderPublications.WorkOrderPublicationId = workOrderPublicationId;
                workOrderPublications.IsDeleted = true;
                workOrderPublications.UpdatedBy = updatedBy;
                workOrderPublications.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderPublications.Attach(workOrderPublications);

                _appContext.Entry(workOrderPublications).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderPublications).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderPublications).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void WorkOrderPublicationStatus(long workOrderPublicationId, bool status, string updatedBy)
        {
            WorkOrderPublications workOrderPublications = new WorkOrderPublications();
            try
            {
                workOrderPublications.WorkOrderPublicationId = workOrderPublicationId;
                workOrderPublications.IsActive = status;
                workOrderPublications.UpdatedBy = updatedBy;
                workOrderPublications.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderPublications.Attach(workOrderPublications);

                _appContext.Entry(workOrderPublications).Property(p => p.IsActive).IsModified = true;
                _appContext.Entry(workOrderPublications).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderPublications).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<WorkOrderPublicationList> GetWorkOrderPublications(long wfwoId, long workOrderId)
        {
            try
            {
                List<WorkOrderPublicationList> workOrderPublicationList = new List<WorkOrderPublicationList>();
                WorkOrderPublicationList workOrderPublication;

                var list = (from wop in _appContext.WorkOrderPublications
                            join pub in _appContext.Publication on wop.PublicationId equals pub.PublicationRecordId
                            join act in _appContext.AircraftType on wop.AircraftManufacturerId equals act.AircraftTypeId into wopact
                            from act in wopact.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on wop.ModelId equals acm.AircraftModelId into wopacm
                            from acm in wopacm.DefaultIfEmpty()
                            join pt in _appContext.PublicationType on pub.PublicationTypeId equals pt.PublicationTypeId
                            join vfb in _appContext.Employee on pub.VerifiedBy equals vfb.EmployeeId into pubvfb
                            from vfb in pubvfb.DefaultIfEmpty()
                            where wop.IsDeleted == false && (wop.WorkFlowWorkOrderId == wfwoId || wop.WorkOrderId == workOrderId)
                            select new
                            {
                                wop.WorkOrderPublicationId,
                                wop.WorkOrderId,
                                wop.WorkFlowWorkOrderId,
                                wop.PublicationId,
                                wop.AircraftManufacturerId,
                                wop.ModelId,
                                PublicationDescription = pub.Description,
                                PublicationType = pt.Description,
                                pub.RevisionDate,
                                pub.Sequence,
                                Source = "",
                                AirCraftManufacturer = act.Description,
                                Model = acm.ModelName,
                                pub.Location,
                                VerifiedBy = vfb.FirstName,
                                pub.VerifiedDate,
                                Status = "",
                                Image = ""
                            }).Distinct().ToList();

                if (list != null && list.Count > 0)
                {
                    foreach (var item in list)
                    {
                        workOrderPublication = new WorkOrderPublicationList();
                        workOrderPublication.AirCraftManufacturer = item.AirCraftManufacturer;
                        workOrderPublication.AircraftManufacturerId = item.AircraftManufacturerId;
                        workOrderPublication.Image = item.Image;
                        workOrderPublication.Location = item.Location;
                        workOrderPublication.Model = item.Model;
                        workOrderPublication.ModelId = item.ModelId;
                        workOrderPublication.PublicationDescription = item.PublicationDescription;
                        workOrderPublication.PublicationId = item.PublicationId;
                        workOrderPublication.PublicationType = item.PublicationType;
                        workOrderPublication.RevisionDate = item.RevisionDate;
                        workOrderPublication.Sequence = item.Sequence;
                        workOrderPublication.Source = item.Source;
                        workOrderPublication.Status = item.Status;
                        workOrderPublication.VerifiedBy = item.VerifiedBy;
                        workOrderPublication.VerifiedDate = item.VerifiedDate;
                        workOrderPublication.WorkFlowWorkOrderId = item.WorkFlowWorkOrderId;
                        workOrderPublication.WorkOrderId = item.WorkOrderId;
                        workOrderPublication.WorkOrderPublicationId = item.WorkOrderPublicationId;
                        workOrderPublication.WorkOrderPublicationDashNumber = _appContext.WorkOrderPublicationDashNumber.Where(x => x.WorkOrderPublicationId == item.WorkOrderPublicationId).ToList();

                        workOrderPublicationList.Add(workOrderPublication);
                    }
                }

                return workOrderPublicationList;
            }
            catch (Exception)
            {

                throw;
            }
        }



        #endregion

        #region Work Order Directions

        public IEnumerable<object> GetWorkOrderDirections(long wfwoId, long workOrderId)
        {
            try
            {
                var list = (from wod in _appContext.WorkOrderDirections
                            where wod.IsDeleted == false && (wod.WorkFlowWorkOrderId == wfwoId || wod.WorkOrderId == workOrderId)
                            select new
                            {

                                wod.Action,
                                wod.CreatedBy,
                                wod.CreatedDate,
                                wod.DirectionName,
                                wod.IsActive,
                                wod.IsDeleted,
                                wod.MasterCompanyId,
                                wod.Memo,
                                wod.Sequence,
                                wod.TaskId,
                                wod.UpdatedBy,
                                wod.UpdatedDate,
                                wod.WorkFlowWorkOrderId,
                                wod.WorkOrderDirectionId,
                                wod.WorkOrderId
                            }

                          ).Distinct().ToList();
                return list;
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
                                   where (wf.IsDelete == false || wf.IsDelete == null) && wf.IsActive == true && wf.ItemMasterId == partId && wf.WorkScopeId == workScopeId
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
                                im.PartDescription,
                                im.DER,
                                PMA = im.isPma,
                                NTE = (im.OverhaulHours == null ? 0 : im.OverhaulHours) + (im.RPHours == null ? 0 : im.RPHours) + (im.mfgHours == null ? 0 : im.mfgHours) + (im.TestHours == null ? 0 : im.TestHours)
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

        public IEnumerable<object> GetStockLineDetailsByPartNo(long itemMasterId, long conditionId)
        {
            try
            {
                var list = (from sl in _appContext.StockLine
                            where sl.ItemMasterId == itemMasterId && sl.ConditionId == conditionId
                            select new
                            {
                                sl.StockLineId,
                                sl.StockLineNumber,
                                sl.SerialNumber
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

        public object GetPartSerialNo(long stockLineId)
        {
            try
            {
                var serialNo = (from sl in _appContext.StockLine
                                where sl.StockLineId == stockLineId
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

        public IEnumerable<object> GetTechnicians()
        {
            try
            {
                var list = (from e in _appContext.Employee
                            join jt in _appContext.JobTitle on e.JobTitleId equals jt.JobTitleId
                            where e.IsActive == true && (e.IsDeleted == false || e.IsDeleted == null) && jt.Description == "Technician"
                            select new
                            {
                                label = e.FirstName,
                                value = e.EmployeeId
                            }).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Private Methods

        private long CreateWorkFlowWorkOrderFromWorkFlow(List<WorkOrderPartNumber> workOrderPartNumbers, long workOrderId, string createdBy)
        {
            try
            {
                long workFlowWorkOrderId = 0;

                if (workOrderPartNumbers != null && workOrderPartNumbers.Count > 0)
                {
                    foreach (var item in workOrderPartNumbers)
                    {
                        var workFlowId = item.WorkflowId;
                        if (workFlowId > 0)
                        {
                            //var isExists = _appContext.WorkOrderWorkFlow.Any(p => p.WorkflowId == workFlowId);
                            // if (!isExists)
                            // {
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
                                    workFlowWorkOrder.WorkOrderCharges = BindWorkFlowWorkOrderCharges(workFlow.Charges, workOrderId, createdBy, item.MasterCompanyId);
                                }
                                if (workFlow.Equipments != null && workFlow.Equipments.Count > 0)
                                {
                                    workFlowWorkOrder.WorkOrderEquipments = BindWorkFlowWorkOrderAssets(workFlow.Equipments, workOrderId, createdBy, item.MasterCompanyId);
                                }
                                if (workFlow.Exclusions != null && workFlow.Exclusions.Count > 0)
                                {
                                    workFlowWorkOrder.WorkOrderExclusions = BindWorkFlowWorkOrderExclusions(workFlow.Exclusions, workOrderId, createdBy, item.MasterCompanyId);
                                }
                                if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                                {
                                    workFlowWorkOrder.WorkOrderExpertise = BindWorkFlowWorkOrderExpertise(workFlow.Expertise, workOrderId, createdBy, item.MasterCompanyId);
                                }
                                if (workFlow.MaterialList != null && workFlow.MaterialList.Count > 0)
                                {
                                    workFlowWorkOrder.WorkOrderMaterialList = BindWorkFlowWorkOrderMaterials(workFlow.MaterialList, workOrderId, createdBy, item.MasterCompanyId);
                                }

                                if (workFlow.Directions != null && workFlow.Directions.Count > 0)
                                {
                                    workFlowWorkOrder.WorkOrderDirections = BindWorkFlowWorkOrderDirections(workFlow.Directions, workOrderId, createdBy, item.MasterCompanyId);
                                }
                                if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                                {
                                    workFlowWorkOrder.WorkOrderPublication = BindWorkFlowWorkOrderPublications(workFlow.Publication, workOrderId, createdBy, item.MasterCompanyId);
                                }

                                _appContext.WorkOrderWorkFlow.Add(workFlowWorkOrder);
                                _appContext.SaveChanges();

                                workFlowWorkOrder.WorkFlowWorkOrderNo = "WOWF" + workFlowWorkOrder.WorkFlowWorkOrderId;
                                _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                                _appContext.SaveChanges();

                                workFlowWorkOrderId = workFlowWorkOrder.WorkFlowWorkOrderId;
                            }



                            // }
                        }
                    }
                }
                return workFlowWorkOrderId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private WorkOrderWorkFlow BIndWorkFlowWorkOrderDetails(WorkOrderWorkFlow workFlowWorkOrder, Workflow workFlow)
        {
            workFlowWorkOrder.BERThresholdAmount = workFlow.BERThresholdAmount;
            workFlowWorkOrder.ChangedPartNumberId = workFlow.ChangedPartNumberId;
            workFlowWorkOrder.CostOfNew = workFlow.CostOfNew;
            workFlowWorkOrder.CostOfReplacement = workFlow.CostOfReplacement;
            workFlowWorkOrder.CurrencyId = workFlow.CurrencyId;
            workFlowWorkOrder.CustomerId = workFlow.CustomerId;
            workFlowWorkOrder.FixedAmount = workFlow.FixedAmount;
            workFlowWorkOrder.IsCalculatedBERThreshold = workFlow.IsCalculatedBERThreshold;
            workFlowWorkOrder.IsFixedAmount = workFlow.IsFixedAmount;
            workFlowWorkOrder.IsPercentageOfNew = workFlow.IsPercentageOfNew;
            workFlowWorkOrder.IsPercentageOfReplacement = workFlow.IsPercentageOfReplacement;
            workFlowWorkOrder.ItemMasterId = workFlow.ItemMasterId;
            workFlowWorkOrder.Memo = workFlow.Memo;
            workFlowWorkOrder.OtherCost = workFlow.OtherCost;
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
                    workOrderCharge.ChargesTypeId = 1;
                    workOrderCharge.MarkupPercentageId = 1;
                    workOrderCharge.MasterCompanyId = masterCompanyId;
                    workOrderCharge.ChargeType = "";
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
                    workOrderAsset.TaskId = item.TaskId;
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

                    workOrderExpertise.ExpertiseTypeId = Convert.ToInt32(item.ExpertiseTypeId);
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
                    workOrderMaterial.TaskId = Convert.ToInt64(item.TaskId);
                    workOrderMaterial.ConditionCodeId = Convert.ToInt64(item.ConditionCodeId);
                    workOrderMaterial.MandatoryOrSupplemental = item.MandatoryOrSupplemental;
                    workOrderMaterial.ItemClassificationId = Convert.ToInt64(item.ItemClassificationId);
                    workOrderMaterial.Quantity = Convert.ToInt32(item.Quantity);
                    workOrderMaterial.UnitOfMeasureId = Convert.ToInt64(item.UnitOfMeasureId);
                    workOrderMaterial.UnitCost = Convert.ToDecimal(item.UnitCost);
                    workOrderMaterial.ExtendedCost = Convert.ToDecimal(item.ExtendedCost);
                    workOrderMaterial.Price = item.Price;
                    workOrderMaterial.ExtendedPrice = item.ExtendedPrice;
                    workOrderMaterial.Memo = item.Memo;
                    workOrderMaterial.IsDefered = item.IsDeferred;

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
                    workOrderPublication.AircraftManufacturerId = item.AircraftManufacturer;
                    workOrderPublication.ModelId = item.Model;

                    if (item.WorkflowPublicationDashNumbers != null && item.WorkflowPublicationDashNumbers.Count > 0)
                    {
                        workOrderPublication.WorkOrderPublicationDashNumber = new List<WorkOrderPublicationDashNumber>();
                        WorkOrderPublicationDashNumber workOrderPublicationDashNumber;
                        foreach (var dashNo in item.WorkflowPublicationDashNumbers)
                        {
                            workOrderPublicationDashNumber = new WorkOrderPublicationDashNumber();
                            workOrderPublicationDashNumber.DashNumberId = dashNo.AircraftDashNumberId;
                            workOrderPublicationDashNumber.WOPublicationDashNumberId = 0;
                            workOrderPublicationDashNumber.WorkOrderPublicationId = 0;
                            workOrderPublication.WorkOrderPublicationDashNumber.Add(workOrderPublicationDashNumber);
                        }

                    }


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
                WorkOrderDirections workOrderDirection;
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
                    workOrderDirection.Sequence = Convert.ToInt32(item.Sequence);
                    workOrderDirection.WorkFlowWorkOrderId = 0;
                    workOrderDirection.WorkOrderId = workOrderId;
                    workOrderDirection.TaskId = Convert.ToInt64(item.TaskId);
                    workOrderDirectionsList.Add(workOrderDirection);
                }

                return workOrderDirectionsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<Publications> BindWorkFlowPublications(List<WorkOrderPublications> workOrderPublications)
        {
            List<Publications> publications = new List<Publications>();
            Publications publication;
            if (workOrderPublications != null && workOrderPublications.Count > 0)
            {
                foreach (var item in workOrderPublications)
                {
                    publication = new Publications();
                    publication.AircraftManufacturer = Convert.ToInt32(item.AircraftManufacturerId);
                    publication.CreatedBy = item.CreatedBy;
                    publication.CreatedDate = item.CreatedDate;
                    publication.Id = 0;
                    publication.Image = "";
                    publication.IsDeleted = item.IsDeleted;
                    publication.Model = item.ModelId;
                    publication.TaskId = item.TaskId;
                    publication.UpdatedBy = item.UpdatedBy;
                    publication.UpdatedDate = item.UpdatedDate;

                    var pub = (from p in _appContext.Publication
                               join pt in _appContext.PublicationType on p.PublicationTypeId equals pt.PublicationTypeId
                               where p.PublicationRecordId == item.PublicationId
                               select new
                               {
                                   p.Location,
                                   p.MasterCompanyId,
                                   p.Description,
                                   p.PublicationId,
                                   PublicationType = pt.Description,
                                   p.RevisionNum,
                                   p.RevisionDate,
                                   p.Sequence,
                                   p.VerifiedDate,
                                   p.VerifiedBy

                               }).FirstOrDefault();

                    if (pub != null)
                    {
                        publication.Location = pub.Location;
                        publication.MasterCompanyId = pub.MasterCompanyId;
                        publication.PublicationDescription = pub.Description;
                        publication.PublicationId = pub.PublicationId;
                        publication.PublicationType = pub.PublicationType;
                        publication.Revision = Convert.ToString(pub.RevisionNum);
                        publication.RevisionDate = pub.RevisionDate.ToString();
                        publication.Sequence = Convert.ToString(pub.Sequence);
                        publication.Source = "";
                        publication.Status = "";
                        publication.VerifiedBy = Convert.ToString(pub.VerifiedBy);
                        publication.VerifiedDate = Convert.ToString(pub.VerifiedDate);
                    }

                    publication.WorkflowPublicationDashNumbers = new List<WorkflowPublicationDashNumber>();
                    WorkflowPublicationDashNumber dashNumber;
                    if (item.WorkOrderPublicationDashNumber != null && item.WorkOrderPublicationDashNumber.Count > 0)
                    {
                        foreach (var dashNo in item.WorkOrderPublicationDashNumber)
                        {
                            dashNumber = new WorkflowPublicationDashNumber();
                            dashNumber.AircraftDashNumberId = dashNo.DashNumberId;
                            dashNumber.PublicationsId = 0;
                            dashNumber.WorkflowPublicationDashNumberId = 0;
                            publication.WorkflowPublicationDashNumbers.Add(dashNumber);
                        }
                    }

                    publications.Add(publication);
                }
            }

            return publications;
        }

        private Workflow GetWorkFlowDetails(long workFlowId)
        {
            return _appContext.Workflow.Where(p => p.WorkflowId == workFlowId).FirstOrDefault();
        }

        private long SaveWorkFlow(long workFlowId, string createdBy)
        {
            int versionNo = 0;
            try
            {
                //Existing Workflow Data
                var workFlow = GetWorkFlowDetails(workFlowId);
                if (workFlow != null)
                {
                    Workflow newWorkflow = new Workflow();

                    versionNo = Convert.ToInt32(workFlow.Version.Substring(workFlow.Version.IndexOf("-") + 1));

                    newWorkflow.BERThresholdAmount = workFlow.BERThresholdAmount;
                    newWorkflow.ChangedPartNumber = workFlow.ChangedPartNumber;
                    newWorkflow.ChangedPartNumberDescription = workFlow.ChangedPartNumberDescription;
                    newWorkflow.ChangedPartNumberId = workFlow.ChangedPartNumberId;
                    newWorkflow.CostOfNew = workFlow.CostOfNew;
                    newWorkflow.CostOfReplacement = workFlow.CostOfReplacement;
                    newWorkflow.CurrencyId = workFlow.CurrencyId;
                    newWorkflow.CustomerId = workFlow.CustomerId;
                    newWorkflow.FixedAmount = workFlow.FixedAmount;
                    newWorkflow.FlatRate = workFlow.FlatRate;
                    newWorkflow.IsCalculatedBERThreshold = workFlow.IsCalculatedBERThreshold;
                    newWorkflow.IsFixedAmount = workFlow.IsFixedAmount;
                    newWorkflow.IsPercentageOfNew = workFlow.IsPercentageOfNew;
                    newWorkflow.IsPercentageOfReplacement = workFlow.IsPercentageOfReplacement;
                    newWorkflow.ItemMasterId = workFlow.ItemMasterId;
                    newWorkflow.ManagementStructureId = workFlow.ManagementStructureId;
                    newWorkflow.MasterCompanyId = workFlow.MasterCompanyId;
                    newWorkflow.Memo = workFlow.Memo;
                    newWorkflow.OtherCost = workFlow.OtherCost;
                    newWorkflow.PartNumber = workFlow.PartNumber;
                    newWorkflow.PartNumberDescription = workFlow.PartNumberDescription;
                    newWorkflow.PercentageOfNew = workFlow.PercentageOfNew;
                    newWorkflow.PercentageOfReplacement = workFlow.PercentageOfReplacement;
                    newWorkflow.WorkflowCreateDate = workFlow.WorkflowCreateDate;
                    newWorkflow.WorkflowDescription = workFlow.WorkflowDescription;
                    newWorkflow.WorkflowExpirationDate = workFlow.WorkflowExpirationDate;
                    newWorkflow.WorkOrderNumber = workFlow.WorkOrderNumber;
                    newWorkflow.WorkScopeId = workFlow.WorkScopeId;

                    newWorkflow.Version = "V-" + Convert.ToString(versionNo + 1);
                    newWorkflow.CreatedDate = newWorkflow.UpdatedDate = DateTime.Now;
                    newWorkflow.IsActive = true;
                    newWorkflow.IsDelete = false;
                    newWorkflow.CreatedBy = newWorkflow.UpdatedBy = createdBy;
                    _appContext.Workflow.Add(newWorkflow);
                    _appContext.SaveChanges();
                    return newWorkflow.WorkflowId;
                }
            }
            catch (Exception)
            {

                throw;
            }

            return 0;
        }


        private List<WOReservedIssuedAltParts> GetWOReservedIssuedAltParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedAltParts> woReservedIssuedAltParts = new List<WOReservedIssuedAltParts>();
            WOReservedIssuedAltParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedBy = wom == null ? "" : wom.IssuedBy,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedBy = wom == null ? "" : wom.ReservedBy,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                        })
                         .Distinct()
                         .ToList();
            if (list != null && list.Count > 0)
            {
                foreach (var item in list)
                {
                    woReservedIssuedAltPart = new WOReservedIssuedAltParts();
                    woReservedIssuedAltPart.AltPartDescription = item.PartDescription;
                    woReservedIssuedAltPart.AltPartId = item.MappingItemMasterId;
                    woReservedIssuedAltPart.AltPartNumber = item.PartNumber;
                    woReservedIssuedAltPart.AltPartMasterPartId = item.ItemMasterId;
                    woReservedIssuedAltPart.QuantityAvailable = item.QuantityAvailable;
                    woReservedIssuedAltPart.QuantityOnHand = item.QuantityOnHand;
                    woReservedIssuedAltPart.QuantityOnOrder = item.QuantityOnOrder;
                    woReservedIssuedAltPart.ConditionId = item.ConditionId;
                    woReservedIssuedAltPart.Condition = item.Condition;
                    woReservedIssuedAltPart.IsAltPart = true;
                    woReservedIssuedAltPart.Quantity = item.Quantity;
                    woReservedIssuedAltPart.QuantityIssued = item.QuantityIssued;
                    woReservedIssuedAltPart.QuantityReserved = item.QuantityReserved;
                    woReservedIssuedAltPart.QuantityTurnIn = item.QuantityTurnIn;
                    woReservedIssuedAltPart.WorkFlowWorkOrderId = wokorderWorkFlowId;
                    woReservedIssuedAltPart.WorkOrderId = workOrderId;
                    woReservedIssuedAltPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                    woReservedIssuedAltPart.IssuedBy = item.IssuedBy;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedBy = item.ReservedBy;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltParts.Add(woReservedIssuedAltPart);
                }
            }

            return woReservedIssuedAltParts;
        }


        private void SaveWorkOrderMaterial(WorkOrderReserveIssuesParts part)
        {
            if (part.WorkOrderMaterialsId > 0)
            {
                var woMaterial = _appContext.WorkOrderMaterials.Where(p => p.WorkOrderMaterialsId == part.WorkOrderMaterialsId).FirstOrDefault();
                woMaterial.Quantity = part.Quantity;
                woMaterial.QuantityIssued = part.QuantityIssued;
                woMaterial.QuantityReserved = part.QuantityReserved;
                woMaterial.QuantityTurnIn = part.QuantityTurnIn;
                woMaterial.ReservedBy = part.ReservedBy;
                woMaterial.ReservedDate = part.ReservedDate;
                woMaterial.IssuedBy = part.IssuedBy;
                woMaterial.IssuedDate = part.IssuedDate;
                woMaterial.UpdatedDate = DateTime.Now;

                _appContext.WorkOrderMaterials.Update(woMaterial);
            }
            else
            {
                WorkOrderMaterials workOrderMaterial = new WorkOrderMaterials();
                workOrderMaterial.AltPartMasterPartId = part.AltPartMasterPartId;
                workOrderMaterial.ConditionCodeId = Convert.ToInt64(part.ConditionId);
                workOrderMaterial.CreatedBy = part.CreatedBy;
                workOrderMaterial.CreatedDate = DateTime.Now;
                workOrderMaterial.IsActive = true;
                workOrderMaterial.IsAltPart = part.IsAltPart;
                workOrderMaterial.IsDefered = false;
                workOrderMaterial.IsDeleted = false;
                workOrderMaterial.IssuedBy = part.IssuedBy;
                workOrderMaterial.IssuedDate = part.IssuedDate;
                workOrderMaterial.ItemClassificationId = Convert.ToInt64(part.ItemClassificationId);
                workOrderMaterial.ItemMasterId = part.ItemMasterId;
                workOrderMaterial.MasterCompanyId = part.MasterCompanyId;
                workOrderMaterial.Quantity = part.Quantity;
                workOrderMaterial.QuantityIssued = part.QuantityIssued;
                workOrderMaterial.QuantityReserved = part.QuantityReserved;
                workOrderMaterial.QuantityTurnIn = part.QuantityTurnIn;
                workOrderMaterial.ReservedBy = part.ReservedBy;
                workOrderMaterial.ReservedDate = part.ReservedDate;
                workOrderMaterial.TaskId = Convert.ToInt64(part.TaskId);
                workOrderMaterial.UnitOfMeasureId = Convert.ToInt64(part.UnitOfMeasureId);
                workOrderMaterial.UpdatedBy = part.UpdatedBy;
                workOrderMaterial.UpdatedDate = DateTime.Now;
                workOrderMaterial.WorkFlowWorkOrderId = part.WorkFlowWorkOrderId;
                workOrderMaterial.WorkOrderId = part.WorkOrderId;
                workOrderMaterial.WorkOrderMaterialsId = part.WorkOrderMaterialsId;

                _appContext.WorkOrderMaterials.Add(workOrderMaterial);
            }

            _appContext.SaveChanges();
        }

        private void SaveStockLine(WorkOrderReserveIssuesParts part)
        {
            if (part.StockLineId > 0)
            {
                var woStockLine = _appContext.StockLine.Where(p => p.StockLineId == part.StockLineId).FirstOrDefault();
                woStockLine.QuantityOnHand = part.QuantityOnHand;
                woStockLine.QuantityAvailable = part.QuantityAvailable;
                woStockLine.QuantityOnOrder = part.QuantityOnOrder;
                woStockLine.StockLineId = part.StockLineId;
                woStockLine.UpdatedDate = DateTime.Now;
                woStockLine.UpdatedBy = part.UpdatedBy;
                _appContext.StockLine.Update(woStockLine);
            }
            else
            {
                StockLine stockLine = new StockLine();
                stockLine.QuantityOnHand = part.QuantityOnHand;
                stockLine.QuantityAvailable = part.QuantityAvailable;
                stockLine.QuantityOnOrder = part.QuantityOnOrder;
                stockLine.StockLineId = part.StockLineId;
                stockLine.CreatedDate = DateTime.Now;
                stockLine.CreatedBy = part.CreatedBy;
                stockLine.UpdatedDate = DateTime.Now;
                stockLine.UpdatedBy = part.UpdatedBy;
                stockLine.MasterCompanyId = part.MasterCompanyId;
                stockLine.ItemMasterId = part.ItemMasterId;
                stockLine.PartNumber = part.PartNumber;
                stockLine.PurchaseOrderExtendedCost = 0;
                stockLine.QuantityRejected = 0;
                stockLine.TimeLifeDetailsNotProvided = false;
                _appContext.StockLine.Add(stockLine);
            }

            _appContext.SaveChanges();
        }

        private void SaveWorkOrderMaterialAltPart(WOReservedIssuedAltParts part)
        {
            if (part.WorkOrderMaterialsId > 0)
            {
                var woMaterial = _appContext.WorkOrderMaterials.Where(p => p.WorkOrderMaterialsId == part.WorkOrderMaterialsId).FirstOrDefault();

                woMaterial.Quantity = part.Quantity;
                woMaterial.QuantityIssued = part.QuantityIssued;
                woMaterial.QuantityReserved = part.QuantityReserved;
                woMaterial.QuantityTurnIn = part.QuantityTurnIn;
                woMaterial.ReservedBy = part.ReservedBy;
                woMaterial.ReservedDate = part.ReservedDate;
                woMaterial.IssuedBy = part.IssuedBy;
                woMaterial.IssuedDate = part.IssuedDate;
                woMaterial.UpdatedDate = DateTime.Now;

                _appContext.WorkOrderMaterials.Update(woMaterial);
            }
            else
            {
                WorkOrderMaterials workOrderMaterial = new WorkOrderMaterials();
                workOrderMaterial.AltPartMasterPartId = part.ItemMasterId;
                workOrderMaterial.ConditionCodeId = Convert.ToInt64(part.ConditionId);
                workOrderMaterial.CreatedBy = part.CreatedBy;
                workOrderMaterial.CreatedDate = DateTime.Now;
                workOrderMaterial.IsActive = true;
                workOrderMaterial.IsAltPart = part.IsAltPart;
                workOrderMaterial.IsDefered = false;
                workOrderMaterial.IsDeleted = false;
                workOrderMaterial.IssuedBy = part.IssuedBy;
                workOrderMaterial.IssuedDate = part.IssuedDate;
                workOrderMaterial.ItemClassificationId = Convert.ToInt64(part.ItemClassificationId);
                workOrderMaterial.ItemMasterId = part.AltPartId;
                workOrderMaterial.MasterCompanyId = part.MasterCompanyId;
                workOrderMaterial.Quantity = part.Quantity;
                workOrderMaterial.QuantityIssued = part.QuantityIssued;
                workOrderMaterial.QuantityReserved = part.QuantityReserved;
                workOrderMaterial.QuantityTurnIn = part.QuantityTurnIn;
                workOrderMaterial.ReservedBy = part.ReservedBy;
                workOrderMaterial.ReservedDate = part.ReservedDate;
                workOrderMaterial.TaskId = Convert.ToInt64(part.TaskId);
                workOrderMaterial.UnitOfMeasureId = Convert.ToInt64(part.UnitOfMeasureId);
                workOrderMaterial.UpdatedBy = part.UpdatedBy;
                workOrderMaterial.UpdatedDate = DateTime.Now;
                workOrderMaterial.WorkFlowWorkOrderId = part.WorkFlowWorkOrderId;
                workOrderMaterial.WorkOrderId = part.WorkOrderId;
                workOrderMaterial.WorkOrderMaterialsId = part.WorkOrderMaterialsId;
                workOrderMaterial.MandatoryOrSupplemental = "Mandatory";
                workOrderMaterial.UnitCost = 0;
                workOrderMaterial.ExtendedCost = 0;
                _appContext.WorkOrderMaterials.Add(workOrderMaterial);
            }

            _appContext.SaveChanges();
        }

        private void SaveStockLineAltPart(WOReservedIssuedAltParts part)
        {
            if (part.StockLineId > 0)
            {
                var woStockLine = _appContext.StockLine.Where(p => p.StockLineId == part.StockLineId).FirstOrDefault();
                woStockLine.QuantityOnHand = part.QuantityOnHand;
                woStockLine.QuantityAvailable = part.QuantityAvailable;
                woStockLine.QuantityOnOrder = part.QuantityOnOrder;
                woStockLine.StockLineId = part.StockLineId;
                woStockLine.UpdatedDate = DateTime.Now;
                woStockLine.UpdatedBy = part.UpdatedBy;
                _appContext.StockLine.Update(woStockLine);
            }
            else
            {
                StockLine stockLine = new StockLine();
                stockLine.QuantityOnHand = part.QuantityOnHand;
                stockLine.QuantityAvailable = part.QuantityAvailable;
                stockLine.QuantityOnOrder = part.QuantityOnOrder;
                stockLine.StockLineId = part.StockLineId;
                stockLine.CreatedDate = DateTime.Now;
                stockLine.CreatedBy = part.CreatedBy;
                stockLine.UpdatedDate = DateTime.Now;
                stockLine.UpdatedBy = part.UpdatedBy;
                stockLine.MasterCompanyId = part.MasterCompanyId;
                stockLine.ItemMasterId = part.AltPartMasterPartId;
                stockLine.PartNumber = part.AltPartNumber;
                stockLine.PurchaseOrderExtendedCost = 0;
                stockLine.QuantityRejected = 0;
                stockLine.TimeLifeDetailsNotProvided = false;
                _appContext.StockLine.Add(stockLine);
            }

            _appContext.SaveChanges();
        }

        private long UpdateWorkFlowWorkOrder(Workflow workFlow, long workOrderId,long workFlowWorkOrderId)
        {
            try
            {
                //long workFlowWorkOrderId = 0;

                WorkOrderWorkFlow workFlowWorkOrder = new WorkOrderWorkFlow();

                if (workFlow != null)
                {
                    workFlowWorkOrder.WorkOrderId = workOrderId;
                    workFlowWorkOrder.CreatedDate = workFlow.CreatedDate;
                    workFlowWorkOrder.UpdatedDate = DateTime.Now;
                    workFlowWorkOrder.CreatedBy = workFlow.CreatedBy;
                    workFlowWorkOrder.UpdatedBy = workFlow.UpdatedBy;
                    workFlowWorkOrder.IsActive = true;
                    workFlowWorkOrder.IsDeleted = false;
                    workFlowWorkOrder.MasterCompanyId = Convert.ToInt32(workFlow.MasterCompanyId);

                    workFlowWorkOrder = BIndWorkFlowWorkOrderDetails(workFlowWorkOrder, workFlow);
                    workFlowWorkOrder.WorkFlowWorkOrderId = workFlowWorkOrderId;
                    workFlowWorkOrder.WorkOrderId = workOrderId;
                    string createdBy = "";

                    if (workFlow.Charges != null && workFlow.Charges.Count > 0)
                    {
                        workFlowWorkOrder.WorkOrderCharges = BindWorkFlowWorkOrderCharges(workFlow.Charges, workOrderId, createdBy, 1);
                    }
                    if (workFlow.Equipments != null && workFlow.Equipments.Count > 0)
                    {
                        workFlowWorkOrder.WorkOrderEquipments = BindWorkFlowWorkOrderAssets(workFlow.Equipments, workOrderId, createdBy, 1);
                    }
                    if (workFlow.Exclusions != null && workFlow.Exclusions.Count > 0)
                    {
                        workFlowWorkOrder.WorkOrderExclusions = BindWorkFlowWorkOrderExclusions(workFlow.Exclusions, workOrderId, createdBy, 1);
                    }
                    if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                    {
                        workFlowWorkOrder.WorkOrderExpertise = BindWorkFlowWorkOrderExpertise(workFlow.Expertise, workOrderId, createdBy, 1);
                    }
                    if (workFlow.MaterialList != null && workFlow.MaterialList.Count > 0)
                    {
                        workFlowWorkOrder.WorkOrderMaterialList = BindWorkFlowWorkOrderMaterials(workFlow.MaterialList, workOrderId, createdBy, 1);
                    }

                    if (workFlow.Directions != null && workFlow.Directions.Count > 0)
                    {
                        workFlowWorkOrder.WorkOrderDirections = BindWorkFlowWorkOrderDirections(workFlow.Directions, workOrderId, createdBy, 1);
                    }
                    if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                    {
                        workFlowWorkOrder.WorkOrderPublication = BindWorkFlowWorkOrderPublications(workFlow.Publication, workOrderId, createdBy, 1);
                    }

                    _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                    _appContext.SaveChanges();

                    workFlowWorkOrder.WorkFlowWorkOrderNo = "WOWF" + workFlowWorkOrder.WorkFlowWorkOrderId;
                    _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                    _appContext.SaveChanges();

                    workFlowWorkOrderId = workFlowWorkOrder.WorkFlowWorkOrderId;
                }
                return workFlowWorkOrderId;
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
