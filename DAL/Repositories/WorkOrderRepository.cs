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
                string workOrderNo = string.Empty;
                string latestWoNo = string.Empty;
                long incWoNo = 0;

                var exisWorkOrder = _appContext.WorkOrder.OrderByDescending(p => p.WorkOrderId).FirstOrDefault();

                workOrder.CreatedDate = workOrder.UpdatedDate = DateTime.Now;
                workOrder.IsActive = true;
                workOrder.IsDeleted = false;
                _appContext.WorkOrder.Add(workOrder);
                _appContext.SaveChanges();

                UpdateCustomer(workOrder);

                var workOrderSettings = _appContext.WorkOrderSettings.Where(p => p.WorkOrderTypeId == workOrder.WorkOrderTypeId && p.IsActive == true && p.IsDeleted == false).FirstOrDefault();
                if (workOrderSettings != null)
                {
                    workOrderNo = workOrderSettings.Prefix + workOrderSettings.StartCode;
                }


                if (exisWorkOrder != null)
                {
                    if (!string.IsNullOrEmpty(workOrderNo))
                    {

                        latestWoNo = exisWorkOrder.WorkOrderNum.Substring(workOrderNo.Length);
                        incWoNo = Convert.ToInt64(latestWoNo) + 1;
                    }
                    else
                    {
                        incWoNo = 1;
                    }
                }
                else
                {
                    incWoNo = 1;
                }
                workOrder.WorkOrderNum = workOrderNo + incWoNo;
                _appContext.WorkOrder.Update(workOrder);
                _appContext.SaveChanges();

                foreach (var item in workOrder.PartNumbers)
                {
                    var workScope = _appContext.WorkScope.Where(p => p.WorkScopeId == item.WorkOrderScopeId).FirstOrDefault();
                    if (workScope != null)
                        item.WorkScope = workScope.Description;
                }

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
                _appContext.WorkOrder.Update(workOrder);
                _appContext.SaveChanges();

                foreach (var item in workOrder.PartNumbers)
                {
                    var workScope = _appContext.WorkScope.Where(p => p.WorkScopeId == item.WorkOrderScopeId).FirstOrDefault();
                    if (workScope != null)
                        item.WorkScope = workScope.Description;
                }

                UpdateCustomer(workOrder);

                workOrder.WorkFlowWorkOrderId = CreateWorkFlowWorkOrderFromWorkFlow(workOrder.PartNumbers, workOrder.WorkOrderId, workOrder.CreatedBy);

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
                                WorkOrderType = wo.WorkOrderTypeId == 1 ? "Customer" : (wo.WorkOrderTypeId == 2 ? "Internal" : (wo.WorkOrderTypeId == 3 ? "Tear Down" : "Shop Services")),
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

        public IEnumerable<object> GetWorkOrdersList(Filters<WorkOrderFilters> woFilters)
        {
            if (woFilters.filters == null)
                woFilters.filters = new WorkOrderFilters();
            var pageNumber = woFilters.first + 1;
            var take = woFilters.rows;
            var skip = take * (pageNumber - 1);

            short statusId = 0;

            var open = "open";
            var canceled = "canceled";
            var closed = "closed";
            var all = "all";

            if (!string.IsNullOrEmpty(woFilters.filters.WorkOrderStatus))
            {
                if (open.Contains(woFilters.filters.WorkOrderStatus.ToLower()))
                {
                    statusId = 1;
                }
                else if (canceled.Contains(woFilters.filters.WorkOrderStatus.ToLower()))
                {
                    statusId = 3;
                }

                else if (closed.Contains(woFilters.filters.WorkOrderStatus.ToLower()))
                {
                    statusId = 2;
                }
                else if (all.Contains(woFilters.filters.WorkOrderStatus.ToLower()))
                {
                    statusId = 0;
                }
            }

            try
            {
                var totalRecords = (from wo in _appContext.WorkOrder
                                    join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                    join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                                    join ca in _appContext.CustomerAffiliation on cust.CustomerAffiliationId equals ca.CustomerAffiliationId
                                    join wost in _appContext.WorkOrderStatus on wo.WorkOrderStatusId equals wost.Id
                                    join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                                    join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                                    join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                                    join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.ID
                                    join rp in _appContext.ItemMaster on wop.RevisedPartId equals rp.ItemMasterId into woprp
                                    from rp in woprp.DefaultIfEmpty()


                                    where wo.IsDeleted == false
                                    && wo.WorkOrderNum.Contains(!String.IsNullOrEmpty(woFilters.filters.WorkOrderNum) ? woFilters.filters.WorkOrderNum : wo.WorkOrderNum)
                                    && im.PartNumber.Contains(!String.IsNullOrEmpty(woFilters.filters.PartNos) ? woFilters.filters.PartNos : im.PartNumber)
                                    && im.PartDescription.Contains(!String.IsNullOrEmpty(woFilters.filters.PNDescription) ? woFilters.filters.PNDescription : im.PartDescription)
                                    && ws.Description.Contains(!String.IsNullOrEmpty(woFilters.filters.WorkScope) ? woFilters.filters.WorkScope : ws.Description)
                                    && pr.Description.Contains(!String.IsNullOrEmpty(woFilters.filters.Priority) ? woFilters.filters.Priority : pr.Description)
                                    && cust.Name.Contains(!String.IsNullOrEmpty(woFilters.filters.CustomerName) ? woFilters.filters.CustomerName : cust.Name)
                                    && ca.description.Contains(!String.IsNullOrEmpty(woFilters.filters.CustomerType) ? woFilters.filters.CustomerType : ca.description)
                                    && wo.OpenDate.Date == (woFilters.filters.OpenDate != null ? woFilters.filters.OpenDate : wo.OpenDate.Date)
                                    && wop.CustomerRequestDate.Date == (woFilters.filters.CustomerRequestDate != null ? woFilters.filters.CustomerRequestDate : wop.CustomerRequestDate.Date)
                                    && wop.PromisedDate.Date == (woFilters.filters.PromisedDate != null ? woFilters.filters.PromisedDate : wop.PromisedDate.Date)
                                    && wop.EstimatedShipDate.Date == (woFilters.filters.EstimatedShipDate != null ? woFilters.filters.EstimatedShipDate : wop.EstimatedShipDate.Date)
                                    && wop.EstimatedCompletionDate.Date == (woFilters.filters.EstimatedCompletionDate != null ? woFilters.filters.EstimatedCompletionDate : wop.EstimatedCompletionDate.Date)
                                    && stage.Description.Contains(!String.IsNullOrEmpty(woFilters.filters.Stage) ? woFilters.filters.Stage : stage.Description)
                                    && wo.WorkOrderStatusId == (statusId > 0 ? statusId : wo.WorkOrderStatusId)
                                    //&& rp != null && !string.IsNullOrEmpty(rp.PartNumber) && rp.PartNumber.Contains(!String.IsNullOrEmpty(woFilters.filters.RevisedPN) ? woFilters.filters.RevisedPN : rp.PartNumber)
                                    //&& woFilters.filters.RevisedPN == null ? string.IsNullOrEmpty(rp.PartNumber) || rp.PartNumber != null :
                                    //             rp.PartNumber.Contains(woFilters.filters.RevisedPN)

                                    select new
                                    {
                                        wo.WorkOrderId,
                                    }
                          ).Distinct().Count();



                var list = (from wo in _appContext.WorkOrder
                            join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                            join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                            join ca in _appContext.CustomerAffiliation on cust.CustomerAffiliationId equals ca.CustomerAffiliationId
                            join wost in _appContext.WorkOrderStatus on wo.WorkOrderStatusId equals wost.Id
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                            join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                            join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                            join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.ID
                            join rp in _appContext.ItemMaster on wop.RevisedPartId equals rp.ItemMasterId into woprp
                            from rp in woprp.DefaultIfEmpty()


                            where wo.IsDeleted == false
                            && wo.WorkOrderNum.Contains(!String.IsNullOrEmpty(woFilters.filters.WorkOrderNum) ? woFilters.filters.WorkOrderNum : wo.WorkOrderNum)
                            && im.PartNumber.Contains(!String.IsNullOrEmpty(woFilters.filters.PartNos) ? woFilters.filters.PartNos : im.PartNumber)
                            && im.PartDescription.Contains(!String.IsNullOrEmpty(woFilters.filters.PNDescription) ? woFilters.filters.PNDescription : im.PartDescription)
                            && ws.Description.Contains(!String.IsNullOrEmpty(woFilters.filters.WorkScope) ? woFilters.filters.WorkScope : ws.Description)
                            && pr.Description.Contains(!String.IsNullOrEmpty(woFilters.filters.Priority) ? woFilters.filters.Priority : pr.Description)
                            && cust.Name.Contains(!String.IsNullOrEmpty(woFilters.filters.CustomerName) ? woFilters.filters.CustomerName : cust.Name)
                            && ca.description.Contains(!String.IsNullOrEmpty(woFilters.filters.CustomerType) ? woFilters.filters.CustomerType : ca.description)
                            && wo.OpenDate.Date == (woFilters.filters.OpenDate != null ? woFilters.filters.OpenDate : wo.OpenDate.Date)
                            && wop.CustomerRequestDate.Date == (woFilters.filters.CustomerRequestDate != null ? woFilters.filters.CustomerRequestDate : wop.CustomerRequestDate.Date)
                            && wop.PromisedDate.Date == (woFilters.filters.PromisedDate != null ? woFilters.filters.PromisedDate : wop.PromisedDate.Date)
                            && wop.EstimatedShipDate.Date == (woFilters.filters.EstimatedShipDate != null ? woFilters.filters.EstimatedShipDate : wop.EstimatedShipDate.Date)
                            && wop.EstimatedCompletionDate.Date == (woFilters.filters.EstimatedCompletionDate != null ? woFilters.filters.EstimatedCompletionDate : wop.EstimatedCompletionDate.Date)
                            && stage.Description.Contains(!String.IsNullOrEmpty(woFilters.filters.Stage) ? woFilters.filters.Stage : stage.Description)
                            && wo.WorkOrderStatusId == (statusId > 0 ? statusId : wo.WorkOrderStatusId)
                            //&& rp != null && !string.IsNullOrEmpty(rp.PartNumber) && rp.PartNumber.Contains(!String.IsNullOrEmpty(woFilters.filters.RevisedPN) ? woFilters.filters.RevisedPN : rp.PartNumber)
                            //&& woFilters.filters.RevisedPN == null ? string.IsNullOrEmpty(rp.PartNumber) || rp.PartNumber != null :
                            //             rp.PartNumber.Contains(woFilters.filters.RevisedPN)
                            select new
                            {
                                wo.WorkOrderId,
                                wo.WorkOrderNum,

                                PartNos = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                wp => wp.MasterPartId,
                                im => im.ItemMasterId,
                                (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.im.PartNumber)),

                                PNDescription = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                wp => wp.MasterPartId,
                                im => im.ItemMasterId,
                                (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.im.PartDescription)),

                                WorkScope = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkScope,
                                wp => wp.WorkOrderScopeId,
                                ws => ws.WorkScopeId,
                                (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.ws.Description)),

                                Priority = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.Priority,
                                wp => wp.WorkOrderPriorityId,
                                pr => pr.PriorityId,
                                (wp, pr) => new { wp, pr }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.pr.Description)),

                                CustomerName = cust.Name,
                                CustomerType = ca.description,
                                OpenDate = wo.OpenDate.Date,

                                CustomerRequestDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                          .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                          .Select(p => p.CustomerRequestDate.Date)),

                                PromisedDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                          .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                          .Select(p => p.PromisedDate.Date)),

                                EstimatedShipDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                          .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                          .Select(p => p.EstimatedShipDate.Date)),

                                EstimatedCompletionDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                          .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                          .Select(p => p.EstimatedCompletionDate.Date)),

                                Stage = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStage,
                                wp => wp.WorkOrderStageId,
                                ws => ws.ID,
                                (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.ws.Description)),

                                WorkOrderStatus = wost.Description,
                                wo.IsActive,
                                wo.CreatedDate,
                                TotalRecords = totalRecords,
                            }

                          ).Distinct()
                          .OrderByDescending(p => p.CreatedDate)
                          .Skip(skip)
                          .Take(take)
                          .ToList();

                if (woFilters.SortOrder.HasValue && !string.IsNullOrEmpty(woFilters.SortField))
                {
                    if (woFilters.SortOrder == -1)
                    {
                        switch (woFilters.SortField)
                        {
                            case "workOrderNum":
                                return list.OrderByDescending(p => p.WorkOrderNum).ToList();
                            case "partNos":
                                return list.OrderByDescending(p => p.PartNos).ToList();
                            case "pnDescription":
                                return list.OrderByDescending(p => p.PNDescription).ToList();
                            case "workScope":
                                return list.OrderByDescending(p => p.WorkScope).ToList();
                            case "priority":
                                return list.OrderByDescending(p => p.Priority).ToList();
                            case "customerName":
                                return list.OrderByDescending(p => p.CustomerName).ToList();
                            case "customerType":
                                return list.OrderByDescending(p => p.CustomerType).ToList();
                            case "openDate":
                                return list.OrderByDescending(p => p.OpenDate).ToList();
                            case "customerRequestDate":
                                return list.OrderByDescending(p => p.CustomerRequestDate).ToList();
                            case "promisedDate":
                                return list.OrderByDescending(p => p.PromisedDate).ToList();
                            case "estimatedShipDate":
                                return list.OrderByDescending(p => p.EstimatedShipDate).ToList();
                            case "estimatedCompletionDate":
                                return list.OrderByDescending(p => p.EstimatedCompletionDate).ToList();
                            case "stage":
                                return list.OrderByDescending(p => p.Stage).ToList();
                            case "workOrderStatus":
                                return list.OrderByDescending(p => p.WorkOrderStatus).ToList();
                        }
                    }
                    else
                    {
                        switch (woFilters.SortField)
                        {
                            case "workOrderNum":
                                return list.OrderBy(p => p.WorkOrderNum).ToList();
                            case "partNos":
                                return list.OrderBy(p => p.PartNos).ToList();
                            case "pnDescription":
                                return list.OrderBy(p => p.PNDescription).ToList();
                            case "workScope":
                                return list.OrderBy(p => p.WorkScope).ToList();
                            case "priority":
                                return list.OrderBy(p => p.Priority).ToList();
                            case "customerName":
                                return list.OrderBy(p => p.CustomerName).ToList();
                            case "customerType":
                                return list.OrderBy(p => p.CustomerType).ToList();
                            case "openDate":
                                return list.OrderBy(p => p.OpenDate).ToList();
                            case "customerRequestDate":
                                return list.OrderBy(p => p.CustomerRequestDate).ToList();
                            case "promisedDate":
                                return list.OrderBy(p => p.PromisedDate).ToList();
                            case "estimatedShipDate":
                                return list.OrderBy(p => p.EstimatedShipDate).ToList();
                            case "estimatedCompletionDate":
                                return list.OrderBy(p => p.EstimatedCompletionDate).ToList();
                            case "stage":
                                return list.OrderBy(p => p.Stage).ToList();
                            case "workOrderStatus":
                                return list.OrderBy(p => p.WorkOrderStatus).ToList();
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

        public IEnumerable<object> WorkOrdersGlobalSearch(string filterText, int pageNumber, int pageSize)
        {
            var take = pageSize;
            var skip = take * (pageNumber);

            short statusId = 0;

            var open = "open";
            var canceled = "canceled";
            var all = "all";
            var closed = "closed";

            if (!string.IsNullOrEmpty(filterText))
            {
                if (open.Contains(filterText.ToLower()))
                {
                    statusId = 1;
                }
                else if (canceled.Contains(filterText.ToLower()))
                {
                    statusId = 3;
                }
                else if (all.Contains(filterText.ToLower()))
                {
                    statusId = 0;
                }
                else if (closed.Contains(filterText.ToLower()))
                {
                    statusId = 2;
                }

                try
                {
                    var totalRecords = (from wo in _appContext.WorkOrder
                                        join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                        join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                                        join ca in _appContext.CustomerAffiliation on cust.CustomerAffiliationId equals ca.CustomerAffiliationId
                                        join wost in _appContext.WorkOrderStatus on wo.WorkOrderStatusId equals wost.Id
                                        join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                                        join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                                        join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                                        join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.ID
                                        join rp in _appContext.ItemMaster on wop.RevisedPartId equals rp.ItemMasterId into woprp
                                        from rp in woprp.DefaultIfEmpty()


                                        where wo.IsDeleted == false
                                        && (wo.WorkOrderNum.Contains(filterText)
                                        || im.PartNumber.Contains(filterText)
                                        || im.PartDescription.Contains(filterText)
                                        || ws.Description.Contains(filterText)
                                        || pr.Description.Contains(filterText)
                                        || cust.Name.Contains(filterText)
                                        || ca.description.Contains(filterText)
                                        || stage.Description.Contains(filterText)
                                        || wo.WorkOrderStatusId == statusId)
                                        //&& rp != null && !string.IsNullOrEmpty(rp.PartNumber) && rp.PartNumber.Contains(!String.IsNullOrEmpty(woFilters.filters.RevisedPN) ? woFilters.filters.RevisedPN : rp.PartNumber)
                                        //&& woFilters.filters.RevisedPN == null ? string.IsNullOrEmpty(rp.PartNumber) || rp.PartNumber != null :
                                        //             rp.PartNumber.Contains(woFilters.filters.RevisedPN)
                                        select new
                                        {
                                            wo.WorkOrderId,
                                        }
                              ).Distinct().Count();

                    var list = (from wo in _appContext.WorkOrder
                                join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                                join ca in _appContext.CustomerAffiliation on cust.CustomerAffiliationId equals ca.CustomerAffiliationId
                                join wost in _appContext.WorkOrderStatus on wo.WorkOrderStatusId equals wost.Id
                                join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                                join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                                join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                                join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.ID
                                join rp in _appContext.ItemMaster on wop.RevisedPartId equals rp.ItemMasterId into woprp
                                from rp in woprp.DefaultIfEmpty()


                                where wo.IsDeleted == false
                                && (wo.WorkOrderNum.Contains(filterText)
                                || im.PartNumber.Contains(filterText)
                                || im.PartDescription.Contains(filterText)
                                || ws.Description.Contains(filterText)
                                || pr.Description.Contains(filterText)
                                || cust.Name.Contains(filterText)
                                || ca.description.Contains(filterText)
                                || stage.Description.Contains(filterText)
                                || wo.WorkOrderStatusId == statusId)
                                select new
                                {
                                    wo.WorkOrderId,
                                    wo.WorkOrderNum,

                                    PartNos = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                wp => wp.MasterPartId,
                                im => im.ItemMasterId,
                                (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.im.PartNumber)),

                                    PNDescription = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                wp => wp.MasterPartId,
                                im => im.ItemMasterId,
                                (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.im.PartDescription)),

                                    WorkScope = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkScope,
                                wp => wp.WorkOrderScopeId,
                                ws => ws.WorkScopeId,
                                (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.ws.Description)),

                                    Priority = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.Priority,
                                wp => wp.WorkOrderPriorityId,
                                pr => pr.PriorityId,
                                (wp, pr) => new { wp, pr }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.pr.Description)),

                                    CustomerName = cust.Name,
                                    CustomerType = ca.description,
                                    wo.OpenDate.Date,

                                    CustomerRequestDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                          .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                          .Select(p => p.CustomerRequestDate.Date)),

                                    PromisedDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                          .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                          .Select(p => p.PromisedDate.Date)),

                                    EstimatedShipDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                          .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                          .Select(p => p.EstimatedShipDate.Date)),

                                    EstimatedCompletionDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                          .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                          .Select(p => p.EstimatedCompletionDate.Date)),

                                    Stage = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStage,
                                wp => wp.WorkOrderStageId,
                                ws => ws.ID,
                                (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.ws.Description)),

                                    WorkOrderStatus = wost.Description,
                                    wo.IsActive,
                                    wo.CreatedDate,
                                    TotalRecords = totalRecords,
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
            else
            {
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
                                    CustomerName = cust.Name,
                                    cust.CustomerCode,
                                    WorkOrderType = wo.WorkOrderTypeId == 1 ? "Customer" : (wo.WorkOrderTypeId == 2 ? "Internal" : (wo.WorkOrderTypeId == 3 ? "Tear Down" : "Shop Services")),
                                    wo.IsActive,
                                    wo.CreatedDate,
                                    WorkOrderStatus = wost.Description,
                                    PartNos = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                wp => wp.MasterPartId,
                                im => im.ItemMasterId,
                                (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                .Select(p => p.im.PartNumber)),
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
        }

        public WorkOrder WorkOrderById(long workOrderId)
        {
            try
            {
                var workOrder = _appContext.Set<WorkOrder>().Where(x => x.WorkOrderId == workOrderId).FirstOrDefault();
                if (workOrder != null)
                {
                    workOrder.PartNumbers = _appContext.Set<WorkOrderPartNumber>().Where(x => x.WorkOrderId == workOrderId && x.IsDeleted == false).OrderBy(x => x.ID).ToList();

                    if (workOrder.PartNumbers != null && workOrder.PartNumbers.Count > 0)
                    {
                        foreach (var part in workOrder.PartNumbers)
                        {
                            var revisedPartId = _appContext.ItemMaster.Where(p => p.ItemMasterId == part.MasterPartId).FirstOrDefault().RevisedPartId;
                            if (revisedPartId != null && revisedPartId > 0)
                            {
                                part.RevisedPartNo = _appContext.ItemMaster.Where(p => p.ItemMasterId == revisedPartId).Select(p => p.PartNumber).FirstOrDefault().ToString();
                            }
                        }
                    }
                }

                var customer = _appContext.Customer.Where(p => p.CustomerId == workOrder.CustomerId).FirstOrDefault();

                if (customer != null)
                {
                    workOrder.CustomerDetails = new CustomerDetails();

                    //var primarySalesPerson = (from cust in _appContext.Customer
                    //                       join csr in _appContext.Employee on cust.PrimarySalesPersonId equals Convert.ToString(csr.EmployeeId) into custcsr
                    //                       from csr in custcsr.DefaultIfEmpty()
                    //                       where cust.CustomerId == workOrder.CustomerId
                    //                       select new
                    //                       {
                    //                           csr
                    //                       }).FirstOrDefault();

                    workOrder.CSR = workOrder.CustomerDetails.CSRName = customer.PrimarySalesPersonId;
                    workOrder.CustomerDetails.CustomerRef = customer.ContractReference;
                    workOrder.CustomerDetails.CustomerName = customer.Name;
                    workOrder.CustomerDetails.CreditLimit = customer.CreditLimit;
                    workOrder.CustomerDetails.CreditTermsId = customer.CreditTermsId;
                    workOrder.CustomerDetails.CustomerId = workOrder.CustomerId;
                    workOrder.CustomerDetails.CustomerName = customer.Name;
                    workOrder.CustomerDetails.CustomerEmail = customer.Email;
                    workOrder.CustomerDetails.CustomerPhone = customer.CustomerPhone;

                    workOrder.CreditLimit = Convert.ToInt64(customer.CreditLimit);
                    workOrder.CreditTermsId = Convert.ToInt16(customer.CreditTermsId);
                    workOrder.CustomerReference = customer.ContractReference;
                }

                foreach (var part in workOrder.PartNumbers)
                {
                    part.RevisedParts = WORevisedParts(part.MasterPartId, 1);
                    var itemMaster = WorkOrderPartDetails(part.MasterPartId);
                    if (itemMaster != null)
                        part.Description = itemMaster.PartDescription;
                    else
                        part.Description = string.Empty;
                    var stockLine = WOPartSerialNo(part.StockLineId);
                    if (stockLine != null)
                        part.SerialNumber = stockLine.SerialNumber;
                    else
                        part.SerialNumber = string.Empty;
                }

                if (workOrder.IsSinglePN)
                {
                    var workFlowWorkOrder = _appContext.WorkOrderWorkFlow.Where(p => p.WorkOrderId == workOrderId).FirstOrDefault();
                    if (workFlowWorkOrder != null)
                        workOrder.WorkFlowWorkOrderId = workFlowWorkOrder.WorkFlowWorkOrderId;
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
                                       join ct in _appContext.CreditTerms on c.CreditTermsId equals ct.CreditTermsId
                                       join e in _appContext.Employee on wo.EmployeeId equals e.EmployeeId
                                       join sp in _appContext.Employee on wo.SalesPersonId equals sp.EmployeeId
                                       join ws in _appContext.WorkOrderStatus on wo.WorkOrderStatusId equals ws.Id
                                       join wf in _appContext.WorkOrderWorkFlow on wo.WorkOrderId equals wf.WorkOrderId
                                       join ps in _appContext.Employee on c.PrimarySalesPersonId equals Convert.ToString(ps.EmployeeId) into cps
                                       from ps in cps.DefaultIfEmpty()
                                       where wo.WorkOrderId == workOrderId
                                       select new
                                       {
                                           SingleMPN = wo.IsSinglePN == true ? "Single MPN" : "Multiple MPN",
                                           WorkOrderType = wo.WorkOrderTypeId == 1 ? "Customer" : (wo.WorkOrderTypeId == 2 ? "Internal" : (wo.WorkOrderTypeId == 2 ? "Tear Down" : "Shop Services")),
                                           WorkOrderNumber = wo.WorkOrderNum,
                                           CustomerName = c.Name,
                                           wo.IsContractAvl,
                                           wo.Contract,
                                           CreditTerm = ct.Name,
                                           c.CreditLimit,
                                           wo.OpenDate,
                                           c.ContractReference,
                                           Employee = e.FirstName,
                                           Salesperson = sp.FirstName,
                                           WOStatus = ws.Description,
                                           c.CustomerCode,
                                           c.CustomerContact,
                                           CSR = ps == null ? "" : ps.FirstName,
                                           CustomerReference = c.ContractReference,
                                           workFlowWorkOrderId = wo.IsSinglePN == true ? wf.WorkFlowWorkOrderId : 0,
                                           workFlowId = wo.IsSinglePN == true ? wf.WorkflowId : 0,
                                           wo.ManagementStructureId
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

        #region Sub Work Order

        public SubWorkOrder CreateSubWorkOrder(SubWorkOrder subWorkOrder)
        {
            try
            {

                string subWorkOrderNo = string.Empty;
                int versionNo = 0;

                var exSubWorkOrder = _appContext.SubWorkOrder.Where(p => p.WorkOrderId == subWorkOrder.WorkOrderId).OrderByDescending(p => p.SubWorkOrderId).FirstOrDefault();
                if (exSubWorkOrder != null)
                {
                    var exSubWorkOrderNo = exSubWorkOrder.SubWorkOrderNo;
                    versionNo = Convert.ToInt32(exSubWorkOrderNo.Substring(exSubWorkOrderNo.IndexOf("-") + 1));
                    subWorkOrderNo = subWorkOrder.WorkOrderNum + "-" + Convert.ToString(versionNo + 1);
                }
                else
                {
                    subWorkOrderNo = subWorkOrder.WorkOrderNum + "-" + Convert.ToString(versionNo + 1);
                }

                subWorkOrder.SubWorkOrderNo = subWorkOrderNo;
                subWorkOrder.IsActive = true;
                subWorkOrder.IsDeleted = false;
                subWorkOrder.CreatedDate = subWorkOrder.UpdatedDate = DateTime.Now;
                _appContext.SubWorkOrder.Add(subWorkOrder);
                _appContext.SaveChanges();


                subWorkOrder.WorkFlowWorkOrderId = CreateSubWorkOrderWorkFlow(subWorkOrder.WorkFlowId, subWorkOrder.SubWorkOrderId, subWorkOrder.CreatedBy, subWorkOrder.MasterCompanyId);

                return subWorkOrder;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public SubWorkOrder UpdateSubWorkOrder(SubWorkOrder subWorkOrder)
        {
            try
            {
                _appContext.SubWorkOrder.Update(subWorkOrder);
                _appContext.SaveChanges();
                return subWorkOrder;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object SubWorkOrderDetails(long subWorkOrderId)
        {
            try
            {
                //var subWorkOrder = _appContext.Set<SubWorkOrder>().Where(x => x.SubWorkOrderId == subWorkOrderId).FirstOrDefault();
                //return subWorkOrder;

                var data = (from swo in _appContext.SubWorkOrder
                            join wo in _appContext.WorkOrder on swo.WorkOrderId equals wo.WorkOrderId
                            join wop in _appContext.WorkOrderPartNumber on swo.WorkOrderPartNumberId equals wop.ID
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                            join rp in _appContext.Nha_Tla_Alt_Equ_ItemMapping on wop.MappingItemMasterId equals rp.MappingItemMasterId into woprp
                            from rp in woprp.DefaultIfEmpty()
                            join im1 in _appContext.ItemMaster on rp.MappingItemMasterId equals im1.ItemMasterId into rpim1
                            from im1 in rpim1.DefaultIfEmpty()
                            join sl in _appContext.StockLine on wop.StockLineId equals sl.StockLineId
                            join wos in _appContext.WorkScope on wop.WorkOrderScopeId equals wos.WorkScopeId
                            join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                            join wf in _appContext.Workflow on swo.WorkFlowId equals wf.WorkflowId into wopwf
                            from wf in wopwf.DefaultIfEmpty()
                            join pub in _appContext.Publication on swo.CMMId equals pub.PublicationRecordId into woppub
                            from pub in woppub.DefaultIfEmpty()
                            join stage in _appContext.WorkOrderStage on swo.StageId equals stage.ID
                            join status in _appContext.WorkOrderStatus on swo.StatusId equals status.Id

                            where swo.SubWorkOrderId == subWorkOrderId
                            select new
                            {
                                swo.SubWorkOrderId,
                                swo.SubWorkOrderNo,
                                swo.NeedDate,
                                wo.WorkOrderNum,
                                MCPN = im.PartNumber,
                                RevisedMCPN = im1.PartNumber,
                                MCPNDescription = im.PartDescription,
                                MCSerialNum = sl.SerialNumber,
                                CustName = cust.Name,
                                WorkScope = wos.Description,
                                Stockline = sl.StockLineNumber,
                                WorkFlowId = swo.WorkFlowId,
                                WorkFlowNo = wf == null ? "" : wf.WorkOrderNumber,
                                swo.OpenDate,
                                swo.EstCompDate,
                                swo.StageId,
                                WorkOrderStage = stage.Description,
                                swo.StatusId,
                                WorkOrderStatus = status.Description,
                                swo.CMMId,
                                WorkOrderCMM = pub.PublicationId,
                                swo.IsDER,
                                swo.IsPMA,
                                wop.WorkOrderScopeId,
                            }).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> SubWorkOrderList(long workOrderId)
        {
            try
            {
                var list = (from swo in _appContext.SubWorkOrder
                            join wo in _appContext.WorkOrder on swo.WorkOrderId equals wo.WorkOrderId
                            join wop in _appContext.WorkOrderPartNumber on swo.WorkOrderPartNumberId equals wop.ID
                            join wowf in _appContext.WorkOrderWorkFlow on wo.WorkOrderId equals wowf.WorkOrderId
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                            join wos in _appContext.WorkScope on swo.StatusId equals wos.WorkScopeId
                            join stage in _appContext.WorkOrderStage on swo.StageId equals stage.ID
                            join rp in _appContext.Nha_Tla_Alt_Equ_ItemMapping on wop.MappingItemMasterId equals rp.MappingItemMasterId into woprp
                            from rp in woprp.DefaultIfEmpty()
                            join im1 in _appContext.ItemMaster on rp.MappingItemMasterId equals im1.ItemMasterId into rpim1
                            from im1 in rpim1.DefaultIfEmpty()
                            where swo.WorkOrderId == workOrderId
                            select new
                            {

                                swo.SubWorkOrderNo,
                                WorkScope = wos.Description,
                                MasterPartNo = im.PartNumber,
                                RevisedPartNo = im1.PartNumber,
                                MasterPartDescription = im.PartDescription,
                                wo.OpenDate,
                                swo.NeedDate,
                                Stage = stage.Description,
                                swo.WorkOrderId,
                                swo.SubWorkOrderId,
                                wowf.WorkFlowWorkOrderId
                            }).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object SubWorkOrderHeaderDetails(long workOrderId, long workOrderPartNumberId)
        {
            try
            {
                var data = (from wo in _appContext.WorkOrder
                            join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                            join rp in _appContext.Nha_Tla_Alt_Equ_ItemMapping on wop.MappingItemMasterId equals rp.MappingItemMasterId into woprp
                            from rp in woprp.DefaultIfEmpty()
                            join im1 in _appContext.ItemMaster on rp.MappingItemMasterId equals im1.ItemMasterId into rpim1
                            from im1 in rpim1.DefaultIfEmpty()
                            join sl in _appContext.StockLine on wop.StockLineId equals sl.StockLineId
                            join wos in _appContext.WorkScope on wop.WorkOrderScopeId equals wos.WorkScopeId
                            join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                            join wf in _appContext.Workflow on wop.WorkflowId equals wf.WorkflowId into wopwf
                            from wf in wopwf.DefaultIfEmpty()
                            join pub in _appContext.Publication on wop.CMMId equals pub.PublicationRecordId into woppub
                            from pub in woppub.DefaultIfEmpty()
                            join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.ID
                            join status in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals status.Id
                            join wowf in _appContext.WorkOrderWorkFlow on wo.WorkOrderId equals wowf.WorkOrderId



                            where wo.WorkOrderId == workOrderId && wop.ID == workOrderPartNumberId
                            select new
                            {
                                wo.WorkOrderNum,
                                WorkFlowWorkOrderId = wowf.WorkFlowWorkOrderId,
                                MCPN = im.PartNumber,
                                RevisedMCPN = im1.PartNumber,
                                MCPNDescription = im.PartDescription,
                                MCSerialNum = sl.SerialNumber,
                                CustName = cust.Name,
                                WorkScope = wos.Description,
                                Stockline = sl.StockLineNumber,
                                WorkFlowId = wf == null ? 0 : wop.WorkflowId,
                                WorkFlowNo = wf == null ? "" : wf.WorkOrderNumber,
                                wo.OpenDate,
                                wop.EstimatedCompletionDate,
                                StageId = wop.WorkOrderStageId,
                                WorkOrderStage = stage.Description,
                                StatusId = wop.WorkOrderStatusId,
                                WorkOrderStatus = status.Description,
                                CMMId = wop.CMMId,
                                WorkOrderCMM = pub.PublicationId,
                                wop.IsDER,
                                wop.IsPMA,
                                wop.WorkOrderScopeId,
                                SubWorkOrderNo = wo.WorkOrderNum + "-1",
                                ItemMasterId = wop.MasterPartId

                            }).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private long CreateSubWorkOrderWorkFlow(long? workFlowId, long workOrderId, string createdBy, int masterCompanyId)
        {
            try
            {
                long workFlowWorkOrderId = 0;

                if (workFlowId > 0)
                {
                    WorkOrderWorkFlow workFlowWorkOrder = new WorkOrderWorkFlow();
                    WorkOrderLaborHeader workOrderLaborHeader = new WorkOrderLaborHeader();
                    var workFlow = _appContext.Set<Workflow>().Where(x => x.WorkflowId == workFlowId).FirstOrDefault();

                    if (workFlow != null)
                    {
                        workFlow.Charges = _appContext.Set<WorkflowChargesList>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete != true)).OrderBy(x => x.WorkflowChargesListId).ToList();
                        workFlow.Directions = _appContext.Set<WorkFlowDirection>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowDirectionId).ToList();
                        workFlow.Equipments = _appContext.Set<WorkflowEquipmentList>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowEquipmentListId).ToList();
                        workFlow.Exclusions = _appContext.Set<WorkFlowExclusion>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowExclusionId).ToList();
                        workFlow.Expertise = _appContext.Set<WorkflowExpertiseList>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowExpertiseListId).ToList();
                        workFlow.MaterialList = _appContext.Set<WorkflowMaterial>().Where(x => x.WorkflowId == workFlowId && (x.IsDelete == null || x.IsDelete.Value != true)).OrderBy(x => x.WorkflowActionId).ToList();
                        workFlow.Publication = _appContext.Set<Publications>().Where(x => x.WorkflowId == workFlowId && (x.IsDeleted == null || x.IsDeleted.Value != true)).OrderBy(x => x.Id).ToList();
                        if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                        {
                            workFlow.Publication.ForEach(publ =>
                            {
                                publ.WorkflowPublicationDashNumbers = _appContext.WorkflowPublicationDashNumber.Where(x => x.PublicationsId == publ.Id).ToList();

                            });
                        }


                        workFlowWorkOrder.WorkOrderId = workOrderId;
                        workFlowWorkOrder.CreatedDate = workFlowWorkOrder.UpdatedDate = DateTime.Now;
                        workFlowWorkOrder.CreatedBy = workFlowWorkOrder.UpdatedBy = createdBy;
                        workFlowWorkOrder.IsActive = true;
                        workFlowWorkOrder.IsDeleted = false;
                        workFlowWorkOrder.MasterCompanyId = masterCompanyId;

                        workFlowWorkOrder = BIndWorkFlowWorkOrderDetails(workFlowWorkOrder, workFlow);

                        if (workFlow.Charges != null && workFlow.Charges.Count > 0)
                        {
                            workFlowWorkOrder.Charges = BindWorkFlowWorkOrderCharges(workFlow.Charges, workOrderId, createdBy, masterCompanyId);
                            workFlowWorkOrder.Charges.ForEach(p => p.IsFromWorkFlow = true);
                        }
                        if (workFlow.Equipments != null && workFlow.Equipments.Count > 0)
                        {
                            workFlowWorkOrder.Equipments = BindWorkFlowWorkOrderAssets(workFlow.Equipments, workOrderId, createdBy, masterCompanyId);
                            workFlowWorkOrder.Equipments.ForEach(p => p.IsFromWorkFlow = true);
                        }
                        if (workFlow.Exclusions != null && workFlow.Exclusions.Count > 0)
                        {
                            workFlowWorkOrder.Exclusions = BindWorkFlowWorkOrderExclusions(workFlow.Exclusions, workOrderId, createdBy, masterCompanyId);
                            workFlowWorkOrder.Exclusions.ForEach(p => p.IsFromWorkFlow = true);
                        }
                        if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                        {
                            workFlowWorkOrder.Expertise = BindWorkFlowWorkOrderExpertise(workFlow.Expertise, workOrderId, createdBy, masterCompanyId);
                            workFlowWorkOrder.Expertise.ForEach(p => p.IsFromWorkFlow = true);
                        }
                        if (workFlow.MaterialList != null && workFlow.MaterialList.Count > 0)
                        {
                            workFlowWorkOrder.MaterialList = BindWorkFlowWorkOrderMaterials(workFlow.MaterialList, workOrderId, createdBy, masterCompanyId);
                            workFlowWorkOrder.MaterialList.ForEach(p => p.IsFromWorkFlow = true);
                        }

                        if (workFlow.Directions != null && workFlow.Directions.Count > 0)
                        {
                            workFlowWorkOrder.Directions = BindWorkFlowWorkOrderDirections(workFlow.Directions, workOrderId, createdBy, masterCompanyId);
                            workFlowWorkOrder.Directions.ForEach(p => p.IsFromWorkFlow = true);
                        }
                        if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                        {
                            workFlowWorkOrder.Publication = BindWorkFlowWorkOrderPublications(workFlow.Publication, workOrderId, createdBy, masterCompanyId);
                            workFlowWorkOrder.Publication.ForEach(p => p.IsFromWorkFlow = true);
                        }
                        if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                        {
                            workOrderLaborHeader = BindWorkFlowWorkOrderLabor(workFlow.Expertise, workOrderId, createdBy, masterCompanyId);
                        }

                        _appContext.WorkOrderWorkFlow.Add(workFlowWorkOrder);
                        _appContext.SaveChanges();

                        workFlowWorkOrder.WorkFlowWorkOrderNo = "WOWF" + workFlowWorkOrder.WorkFlowWorkOrderId;
                        _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                        _appContext.SaveChanges();

                        workFlowWorkOrderId = workFlowWorkOrder.WorkFlowWorkOrderId;

                        if (workOrderLaborHeader != null && workOrderLaborHeader.LaborList != null && workOrderLaborHeader.LaborList.Count > 0)
                        {
                            workOrderLaborHeader.LaborList.ForEach(p => p.IsFromWorkFlow = true);
                            workOrderLaborHeader.WorkFlowWorkOrderId = workFlowWorkOrderId;
                            _appContext.WorkOrderLaborHeader.Add(workOrderLaborHeader);
                            _appContext.SaveChanges();

                        }
                    }
                }
                else
                {
                    WorkOrderWorkFlow workOrderWorkFlow = new WorkOrderWorkFlow();
                    workOrderWorkFlow.WorkOrderId = workOrderId;
                    workOrderWorkFlow.MasterCompanyId = masterCompanyId;
                    workOrderWorkFlow.WorkflowId = 0;
                    workOrderWorkFlow.UpdatedBy = workOrderWorkFlow.CreatedBy = createdBy;
                    workOrderWorkFlow.UpdatedDate = workOrderWorkFlow.CreatedDate = DateTime.Now;
                    workOrderWorkFlow.IsActive = true;
                    workOrderWorkFlow.IsDeleted = false;
                    _appContext.WorkOrderWorkFlow.Add(workOrderWorkFlow);
                    _appContext.SaveChanges();
                    workFlowWorkOrderId = workOrderWorkFlow.WorkFlowWorkOrderId;

                    workOrderWorkFlow.WorkFlowWorkOrderNo = "WOWF" + workOrderWorkFlow.WorkFlowWorkOrderId;
                    _appContext.WorkOrderWorkFlow.Update(workOrderWorkFlow);
                    _appContext.SaveChanges();
                }
                return workFlowWorkOrderId;
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
                if (workFlowWorkOrder.Equipments != null && workFlowWorkOrder.Equipments.Count > 0)
                {
                    workFlowWorkOrder.Equipments.ForEach(p => p.AssetRecordId = Convert.ToInt64(p.AssetId));
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

        public void UpdateWorkOrderWorkFlow(Workflow workFlow)
        {
            try
            {
                try
                {
                    //if (workOrderWorkFlow.IsSaveToWorkFlow)
                    //    workFlowId = SaveWorkFlow(workOrderWorkFlow.WorkflowId, workOrderWorkFlow.CreatedBy);
                    //else
                    //    workFlowId = workOrderWorkFlow.WorkflowId;

                    //workOrderWorkFlow.UpdatedDate = DateTime.Now;
                    //workOrderWorkFlow.IsActive = true;
                    //workOrderWorkFlow.IsDeleted = false;
                    //workOrderWorkFlow.WorkflowId = workFlowId;
                    //_appContext.WorkOrderWorkFlow.Update(workOrderWorkFlow);
                    //_appContext.SaveChanges();

                    UpdateWorkFlowWorkOrder(workFlow);
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
                            join wop in _appContext.WorkOrderPartNumber on w.WorkOrderPartNoId equals wop.ID
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                            join wf in _appContext.Workflow on w.WorkflowId equals wf.WorkflowId into wwf
                            from wf in wwf.DefaultIfEmpty()
                            join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                            join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.ID
                            join pri in _appContext.Priority on wop.WorkOrderPriorityId equals pri.PriorityId

                            where w.IsDeleted == false && w.IsActive == true && w.WorkOrderId == workOrderId && wop.WorkOrderId == workOrderId
                            select new
                            {
                                value = w.WorkFlowWorkOrderId,
                                label = w.WorkFlowWorkOrderNo,
                                wop.MasterPartId,
                                WorkflowId = wf == null ? 0 : wf.WorkflowId,
                                WorkflowNo = wf == null ? "" : wf.WorkOrderNumber,
                                im.PartNumber,
                                Description = im.PartDescription,
                                Workscope = ws.Description,
                                NTE = (im.OverhaulHours == null ? 0 : im.OverhaulHours) + (im.RPHours == null ? 0 : im.RPHours) + (im.mfgHours == null ? 0 : im.mfgHours) + (im.TestHours == null ? 0 : im.TestHours),
                                Qty = wop.Quantity,
                                priority = pri.Description,
                                Stage = wop.Description,
                                WorkOrderPartNumberId = wop.ID,
                                wop.WorkOrderScopeId
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

        public object GetWorkOrderPartDetailsById(long workOrderPartNoId)
        {
            try
            {
                var data = (from wop in _appContext.WorkOrderPartNumber
                            join sl in _appContext.StockLine on wop.StockLineId equals sl.StockLineId
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                            where wop.ID == workOrderPartNoId
                            select new
                            {
                                workOrderPartNoId = wop.ID,
                                MCPN = im.PartNumber,
                                MCPNDESCRIPTION = im.PartDescription,
                                MCSERIAL = sl.SerialNumber,
                                STOCKLINE = sl.StockLineNumber,
                                QTYRESERVED = sl.QuantityReserved,
                                CONTROLID = sl.IdNumber,
                                CONTROL = sl.ControlNumber,
                                QTYTOREPAIR = wop.Quantity
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

                workOrderLaborHeader.CreatedDate = workOrderLaborHeader.UpdatedDate = DateTime.Now;
                workOrderLaborHeader.IsActive = true;
                workOrderLaborHeader.IsDeleted = false;

                if (workOrderLaborHeader.WorkOrderLaborHeaderId > 0)
                {
                    _appContext.WorkOrderLaborHeader.Update(workOrderLaborHeader);
                }
                else
                {
                    _appContext.WorkOrderLaborHeader.Add(workOrderLaborHeader);
                }
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

        public object GetWorkFlowWorkOrderLabourList(long wfwoId = 0, long workOrderId = 0)
        {
            try
            {
                var laborList = (from lh in _appContext.WorkOrderLaborHeader
                                 join l in _appContext.WorkOrderLabor on lh.WorkOrderLaborHeaderId equals l.WorkOrderLaborHeaderId
                                 join deby in _appContext.Employee on lh.DataEnteredBy equals deby.EmployeeId into lhdeby
                                 from deby in lhdeby.DefaultIfEmpty()
                                 join exp in _appContext.ExpertiseType on lh.ExpertiseId equals exp.ExpertiseTypeId into lhexp
                                 from exp in lhexp.DefaultIfEmpty()
                                 join emp in _appContext.Employee on lh.EmployeeId equals emp.EmployeeId into lhemp
                                 from emp in lhemp.DefaultIfEmpty()
                                 join wfwo in _appContext.WorkOrderWorkFlow on lh.WorkFlowWorkOrderId equals wfwo.WorkFlowWorkOrderId
                                 where lh.IsDeleted == false && lh.WorkFlowWorkOrderId == wfwoId
                                 select new
                                 {
                                     lh.CreatedBy,
                                     lh.CreatedDate,
                                     lh.DataEnteredBy,
                                     lh.EmployeeId,
                                     lh.HoursorClockorScan,
                                     lh.IsActive,
                                     lh.IsDeleted,
                                     lh.IsTaskCompletedByOne,
                                     lh.LabourMemo,
                                     lh.MasterCompanyId,
                                     lh.UpdatedBy,
                                     lh.UpdatedDate,
                                     lh.WorkFlowWorkOrderId,
                                     lh.WorkOrderHoursType,
                                     lh.WorkOrderId,
                                     lh.WorkOrderLaborHeaderId,
                                     lh.ExpertiseId,
                                     lh.TotalWorkHours,
                                     wfwo.WorkFlowWorkOrderNo,
                                     DataEnteredByName = deby.FirstName,
                                     ExpertiseType = exp.Description,
                                     EmployeeName = emp.FirstName,
                                     LaborList = (from wol in _appContext.WorkOrderLabor
                                                  join exp in _appContext.ExpertiseType on wol.ExpertiseId equals exp.ExpertiseTypeId into wolexp
                                                  from exp in wolexp.DefaultIfEmpty()
                                                  join emp in _appContext.Employee on wol.EmployeeId equals emp.EmployeeId into wolemp
                                                  from emp in wolemp.DefaultIfEmpty()
                                                  join task in _appContext.Task.Where(p => p.IsActive == true && p.IsDelete == false) on wol.TaskId equals task.TaskId into woltask
                                                  from task in woltask.DefaultIfEmpty()
                                                  where wol.WorkOrderLaborHeaderId == lh.WorkOrderLaborHeaderId
                                                  select new
                                                  {
                                                      wol.AdjustedHours,
                                                      wol.Adjustments,
                                                      wol.BillableId,
                                                      wol.CreatedBy,
                                                      wol.CreatedDate,
                                                      wol.EmployeeId,
                                                      wol.EndDate,
                                                      wol.ExpertiseId,
                                                      Expertise = exp.Description,
                                                      wol.Hours,
                                                      wol.IsActive,
                                                      wol.IsDeleted,
                                                      wol.IsFromWorkFlow,
                                                      wol.Memo,
                                                      wol.StartDate,
                                                      wol.TaskId,
                                                      Task = task.Description,
                                                      wol.UpdatedBy,
                                                      wol.UpdatedDate,
                                                      wol.WorkOrderLaborHeaderId,
                                                      wol.WorkOrderLaborId,
                                                      EmployeeName = emp.FirstName
                                                  }
                                                 ).Distinct().ToList()
                                 }

                               ).FirstOrDefault();
                return laborList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteWorkOrderLabor(long workOrderLaborId, string updatedBy)
        {
            WorkOrderLabor workOrderLabor = new WorkOrderLabor();
            try
            {
                workOrderLabor.WorkOrderLaborId = workOrderLaborId;
                workOrderLabor.IsDeleted = true;
                workOrderLabor.UpdatedBy = updatedBy;
                workOrderLabor.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderLabor.Attach(workOrderLabor);

                _appContext.Entry(workOrderLabor).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderLabor).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderLabor).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Work Order Charges
        public List<WorkOrderCharges> CreateWorkOrderCharges(List<WorkOrderCharges> workOrderCharges)
        {
            try
            {
                if (workOrderCharges != null && workOrderCharges.Count > 0)
                {
                    workOrderCharges.ForEach(p => p.ChargesTypeId = p.workflowChargeTypeId);
                }
                _appContext.WorkOrderCharges.AddRange(workOrderCharges);
                _appContext.SaveChanges();
                return workOrderCharges;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<WorkOrderCharges> UpdateWorkOrderCharges(List<WorkOrderCharges> workOrderCharges)
        {
            try
            {
                if (workOrderCharges != null && workOrderCharges.Count > 0)
                {
                    foreach (var charge in workOrderCharges)
                    {
                        if (charge.WorkOrderChargesId > 0)
                        {
                            _appContext.WorkOrderCharges.Update(charge);
                        }
                        else
                        {
                            _appContext.WorkOrderCharges.Add(charge);
                        }
                        _appContext.SaveChanges();

                    }
                }
                return workOrderCharges;
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
                            where woc.IsDeleted == false && woc.WorkFlowWorkOrderId == wfwoId
                            select new
                            {
                                woc.ChargesTypeId,
                                ChargeType = ct.Name,
                                woc.Description,
                                woc.Quantity,
                                woc.UnitCost,
                                woc.ExtendedCost,
                                woc.UnitPrice,
                                woc.ExtendedPrice,
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
                                woc.WorkOrderId,
                                WorkflowChargeTypeId = woc.ChargesTypeId
                            }
                          ).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteWorkOrderCharge(long workOrderChargeId, string updatedBy)
        {
            WorkOrderCharges workOrderCharge = new WorkOrderCharges();
            try
            {
                workOrderCharge.WorkOrderChargesId = workOrderChargeId;
                workOrderCharge.IsDeleted = true;
                workOrderCharge.UpdatedBy = updatedBy;
                workOrderCharge.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderCharges.Attach(workOrderCharge);

                _appContext.Entry(workOrderCharge).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderCharge).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderCharge).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }


        #endregion

        #region Work Order Assets

        public List<WorkOrderAssets> CreateWorkOrderAssets(List<WorkOrderAssets> workOrderAssets)
        {
            try
            {
                if (workOrderAssets != null && workOrderAssets.Count > 0)
                {
                    workOrderAssets.ForEach(p =>
                    {
                        p.AssetRecordId = Convert.ToInt64(p.AssetId);
                        p.CheckInOutStatus = 1;
                    });
                }
                _appContext.WorkOrderAssets.AddRange(workOrderAssets);
                _appContext.SaveChanges();
                return workOrderAssets;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<WorkOrderAssets> UpdateWorkOrderAssets(List<WorkOrderAssets> workOrderAssets)
        {
            try
            {
                if (workOrderAssets != null && workOrderAssets.Count > 0)
                {
                    foreach (var asset in workOrderAssets)
                    {
                        //workOrderAssets.ForEach(p =>
                        //{
                        //    p.AssetRecordId = Convert.ToInt64(p.AssetId);
                        //});

                        if (asset.WorkOrderAssetId > 0)
                        {
                            _appContext.WorkOrderAssets.Update(asset);
                        }
                        else
                        {
                            _appContext.WorkOrderAssets.Add(asset);
                        }
                        _appContext.SaveChanges();
                    }
                }
                return workOrderAssets;


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
                                           where wa.IsDeleted == false && wa.WorkFlowWorkOrderId == wfwoId
                                           select new
                                           {
                                               wa.AssetRecordId,

                                               wa.WorkOrderAssetId,
                                               AssetId = a.AssetId,
                                               a.Description,
                                               at.AssetTypeName,
                                               at.AssetTypeId,
                                               wa.Quantity,
                                               wa.MinQuantity,
                                               wa.MaxQuantity,
                                               wa.ExpectedQuantity,
                                               wa.Findings,
                                               wa.CheckedInById,
                                               wa.CheckedInDate,
                                               wa.CheckedOutById,
                                               wa.CheckedOutDate,
                                               wa.CheckInOutStatus

                                           }).Distinct().ToList();

                return workOrderAssetsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderAsset(long workOrderAssetId, string updatedBy)
        {
            try
            {
                WorkOrderAssets workOrderAsset = new WorkOrderAssets();
                workOrderAsset.WorkOrderAssetId = workOrderAssetId;
                workOrderAsset.UpdatedDate = DateTime.Now;
                workOrderAsset.IsDeleted = true;
                workOrderAsset.UpdatedBy = updatedBy;

                _appContext.WorkOrderAssets.Attach(workOrderAsset);
                _appContext.Entry(workOrderAsset).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void SaveAssetCheckedIn(WorkOrderAssetCheckInOut workOrderAssetCheckInOut)
        {
            try
            {
                WorkOrderAssets workOrderAsset = new WorkOrderAssets();
                workOrderAsset.WorkOrderAssetId = workOrderAssetCheckInOut.WorkOrderAssetId;
                workOrderAsset.UpdatedDate = DateTime.Now;
                workOrderAsset.CheckedInById = workOrderAssetCheckInOut.CheckedInById;
                workOrderAsset.CheckedInDate = workOrderAssetCheckInOut.CheckedInDate;
                workOrderAsset.UpdatedBy = workOrderAssetCheckInOut.UpdatedBy;
                workOrderAsset.CheckInOutStatus = workOrderAssetCheckInOut.CheckInOutStatus;


                _appContext.WorkOrderAssets.Attach(workOrderAsset);
                _appContext.Entry(workOrderAsset).Property(x => x.CheckedInById).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.CheckedInDate).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.CheckInOutStatus).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void SaveAssetCheckedOut(WorkOrderAssetCheckInOut workOrderAssetCheckInOut)
        {
            try
            {
                WorkOrderAssets workOrderAsset = new WorkOrderAssets();
                workOrderAsset.WorkOrderAssetId = workOrderAssetCheckInOut.WorkOrderAssetId;
                workOrderAsset.UpdatedDate = DateTime.Now;
                workOrderAsset.CheckedOutById = workOrderAssetCheckInOut.CheckedOutById;
                workOrderAsset.CheckedOutDate = workOrderAssetCheckInOut.CheckedOutDate;
                workOrderAsset.UpdatedBy = workOrderAssetCheckInOut.UpdatedBy;
                workOrderAsset.CheckInOutStatus = workOrderAssetCheckInOut.CheckInOutStatus;

                _appContext.WorkOrderAssets.Attach(workOrderAsset);
                _appContext.Entry(workOrderAsset).Property(x => x.CheckedOutById).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.CheckedOutDate).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.CheckInOutStatus).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetAssetCheckedInandOutDetails(long assetRecordId, long workOrderAssetId)
        {
            try
            {
                var data = (from woa in _appContext.WorkOrderAssets
                            join a in _appContext.Asset on woa.AssetRecordId equals a.AssetRecordId
                            join cin in _appContext.Employee on woa.CheckedInById equals cin.EmployeeId into woacin
                            from cin in woacin.DefaultIfEmpty()
                            join cout in _appContext.Employee on woa.CheckedOutById equals cout.EmployeeId into woacout
                            from cout in woacout.DefaultIfEmpty()
                            where woa.WorkOrderAssetId == workOrderAssetId || woa.AssetRecordId == assetRecordId
                            select new
                            {

                                a.Name,
                                a.AssetId,
                                woa.CheckedInById,
                                CheckedInByName = cin.FirstName,
                                woa.CheckedInDate,
                                woa.CheckedOutById,
                                CheckedOutByName = cout.FirstName,
                                woa.CheckedOutDate
                            });
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object WorkOrderAssetView(long assetRecordId)
        {
            var data = _appContext.Asset.Where(c => (c.IsDelete == false || c.IsDelete == null) && c.AssetRecordId == assetRecordId);
            var temp = data.Include("Manufacturer");
            var temp1 = temp.Include("GLAccount");
            var temp2 = temp1.Include("Currency");
            var temp3 = temp2.Include("UnitOfMeasure");
            var temp4 = temp3.Include("AssetType");
            var temp5 = temp4.OrderByDescending(c => c.AssetRecordId).ToList();
            return data;
        }

        public IEnumerable<object> WorkOrderAssetHistory(long workOrderAssetId)
        {
            try
            {
                var workOrderAssetsList = (from wa in _appContext.WorkOrderAssetAudit
                                           join a in _appContext.Asset on wa.AssetRecordId equals a.AssetRecordId
                                           join at in _appContext.AssetType on a.AssetTypeId equals at.AssetTypeId
                                           where wa.WorkOrderAssetId == workOrderAssetId
                                           select new
                                           {
                                               wa.AssetRecordId,
                                               wa.WorkOrderAssetId,
                                               a.AssetId,
                                               a.Description,
                                               at.AssetTypeName,
                                               at.AssetTypeId,
                                               wa.Quantity,
                                               wa.MinQuantity,
                                               wa.MaxQuantity,
                                               wa.ExpectedQuantity,
                                               wa.Findings,
                                               wa.CheckedInById,
                                               wa.CheckedInDate,
                                               wa.CheckedOutById,
                                               wa.CheckedOutDate,
                                               wa.CheckInOutStatus
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

        public List<WorkOrderExclusions> CreateWorkOrderExclusions(List<WorkOrderExclusions> workOrderExclusions)
        {
            try
            {
                _appContext.WorkOrderExclusions.AddRange(workOrderExclusions);
                _appContext.SaveChanges();
                return workOrderExclusions;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<WorkOrderExclusions> UpdateWorkOrderExclusions(List<WorkOrderExclusions> workOrderExclusions)
        {
            try
            {

                if (workOrderExclusions != null && workOrderExclusions.Count > 0)
                {
                    foreach (var exclusion in workOrderExclusions)
                    {
                        if (exclusion.WorkOrderExclusionsId > 0)
                        {
                            _appContext.WorkOrderExclusions.Update(exclusion);
                        }
                        else
                        {
                            _appContext.WorkOrderExclusions.Add(exclusion);
                        }
                        _appContext.SaveChanges();
                    }
                }
                return workOrderExclusions;


            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkFlowWorkOrderExclusionsList(long wfwoId = 0, long workOrderId = 0)
        {
            try
            {
                var workOrderExclusionsList = (from we in _appContext.WorkOrderExclusions
                                               join im in _appContext.ItemMaster on we.ItemMasterId equals im.ItemMasterId
                                               join task in _appContext.Task on we.TaskId equals task.TaskId into wetask
                                               from task in wetask.DefaultIfEmpty()
                                               join eo in _appContext.ExclusionEstimatedOccurances on we.EstimtPercentOccurranceId equals eo.Id into weeo
                                               from eo in weeo.DefaultIfEmpty()
                                               join mp in _appContext.Percent on we.MarkUpPercentageId equals mp.PercentId into wemp
                                               from mp in wemp.DefaultIfEmpty()
                                               where we.IsDeleted == false && we.WorkFlowWorkOrderId == wfwoId
                                               select new
                                               {
                                                   we.CostPlusAmount,
                                                   we.CreatedBy,
                                                   we.CreatedDate,
                                                   Epn = im == null ? "" : im.PartNumber,
                                                   EpnDescription = im == null ? "" : im.PartDescription,
                                                   we.EstimtPercentOccurranceId,
                                                   ExstimtPercentOccurance = eo.Name == null ? "" : eo.Name,
                                                   we.ExtendedCost,
                                                   we.FixedAmount,
                                                   we.IsActive,
                                                   we.IsDeleted,
                                                   we.IsFromWorkFlow,
                                                   we.ItemMasterId,
                                                   we.MarkUpPercentageId,
                                                   MarkUpPercentage = mp == null ? 0 : mp.PercentValue,
                                                   we.MasterCompanyId,
                                                   we.Memo,
                                                   we.Quantity,
                                                   we.Reference,
                                                   we.SourceId,
                                                   Source = we.SourceId == 0 ? "" : (we.SourceId == 1 ? "Manual" : "Workflow"),
                                                   we.TaskId,
                                                   Task = task.Description == null ? "" : task.Description,
                                                   we.UnitCost,
                                                   we.UpdatedBy,
                                                   we.UpdatedDate,
                                                   we.WorkFlowWorkOrderId,
                                                   we.WorkOrderExclusionsId,
                                                   we.WorkOrderId,
                                               }).Distinct()
                             .ToList();
                return workOrderExclusionsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderExclusions(long workOrderExclusionsId, string updatedBy)
        {
            try
            {
                WorkOrderExclusions workOrderExclusion = new WorkOrderExclusions();
                workOrderExclusion.WorkOrderExclusionsId = workOrderExclusionsId;
                workOrderExclusion.UpdatedDate = DateTime.Now;
                workOrderExclusion.IsDeleted = true;
                workOrderExclusion.UpdatedBy = updatedBy;

                _appContext.WorkOrderExclusions.Attach(workOrderExclusion);
                _appContext.Entry(workOrderExclusion).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderExclusion).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrderExclusion).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Work Order Documents

        public List<WorkOrderDocuments> CreateWorkOrderDocuments(List<WorkOrderDocuments> workOrderDocuments)
        {
            try
            {
                _appContext.WorkOrderDocuments.AddRange(workOrderDocuments);
                _appContext.SaveChanges();
                return workOrderDocuments;
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

        public IEnumerable<object> GetWorkFlowWorkOrderDocumentsList(long wfwoId = 0, long workOrderId = 0)
        {
            try
            {
                var workOrderDocuments = (from wd in _appContext.WorkOrderDocuments

                                          join doc in _appContext.Document on wd.DocumentId equals doc.DocumentId
                                          where wd.IsDeleted == false && wd.WorkFlowWorkOrderId == wfwoId
                                          select new
                                          {
                                              wd.CompanyId,
                                              wd.CreatedBy,
                                              wd.CreatedDate,
                                              wd.Description,
                                              wd.DocumentId,
                                              wd.DocumentLink,
                                              wd.IsActive,
                                              wd.IsDeleted,
                                              wd.ManagementStructureId,
                                              wd.MasterCompanyId,
                                              wd.UpdatedBy,
                                              wd.UpdatedDate,
                                              wd.WorkFlowWorkOrderId,
                                              wd.WorkOrderDocumentsId,
                                              wd.WorkOrderId,
                                              DocumentCode = doc.DocumentCode
                                          }).Distinct()
                             .ToList();


                return workOrderDocuments;
            }

            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderDocuments(long workOrderDocumentsId, string updatedBy)
        {
            try
            {
                WorkOrderDocuments workOrderDocument = new WorkOrderDocuments();
                workOrderDocument.WorkOrderDocumentsId = workOrderDocumentsId;
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
                    if (item.PartStatusId == Convert.ToInt32(PartStatusEnum.UnIssue))
                    {
                        item.PartStatusId = Convert.ToInt32(PartStatusEnum.Issue);
                    }
                    if (item.PartStatusId == Convert.ToInt32(PartStatusEnum.UnReserve))
                    {
                        item.PartStatusId = Convert.ToInt32(PartStatusEnum.Reserve);
                    }

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
                                              join sl in _appContext.StockLine on wom.WorkOrderMaterialsId equals sl.WorkOrderMaterialsId into sls
                                              from sl in sls.DefaultIfEmpty()
                                              join im in _appContext.ItemMaster on wom.ItemMasterId equals im.ItemMasterId
                                              join p in _appContext.Provision on im.ProvisionId equals p.ProvisionId into pro
                                              from p in pro.DefaultIfEmpty()
                                              join c in _appContext.Condition on wom.ConditionCodeId equals c.ConditionId
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
                                              where wom.IsDeleted == false && wom.WorkFlowWorkOrderId == wfwoId
                                              select new
                                              {
                                                  sl.StockLineNumber,
                                                  im.PartNumber,
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
                                                  PartQuantityAvailable = sl == null ? 0 : sl.QuantityOnHand,
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
                                                  Bin = bi.Name,
                                                  PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                                                  wom.QuantityIssued,
                                                  wom.QuantityReserved,
                                                  wom.QuantityTurnIn,
                                                  wom.ConditionCodeId,
                                                  wom.UnitOfMeasureId,
                                                  wom.Quantity,
                                                  wom.Price,
                                                  wom.ExtendedPrice,
                                                  wom.WorkOrderMaterialsId,
                                                  wom.WorkFlowWorkOrderId,
                                                  wom.WorkOrderId,
                                                  im.ItemMasterId,
                                                  im.ItemClassificationId,
                                                  im.PurchaseUnitOfMeasureId
                                              }).Distinct().ToList();

                return workOrderMaterialsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderMaterials(long workOrderMaterialsId, string updatedBy)
        {
            try
            {
                WorkOrderMaterials workOrderMaterials = new WorkOrderMaterials();
                workOrderMaterials.WorkOrderMaterialsId = workOrderMaterialsId;
                workOrderMaterials.UpdatedDate = DateTime.Now;
                workOrderMaterials.IsDeleted = true;
                workOrderMaterials.UpdatedBy = updatedBy;

                _appContext.WorkOrderMaterials.Attach(workOrderMaterials);
                _appContext.Entry(workOrderMaterials).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderMaterials).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrderMaterials).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<WorkOrderReserveIssuesParts> GetReservedIssuedParts(long WorkFlowWorkOrderId, long workOrderId, int statusId)
        {
            List<WorkOrderReserveIssuesParts> workOrderReserveIssuesParts = new List<WorkOrderReserveIssuesParts>();
            WorkOrderReserveIssuesParts workOrderReserveIssuesPart;
            try
            {
                var list = (from wom in _appContext.WorkOrderMaterials
                            join im in _appContext.ItemMaster on wom.ItemMasterId equals im.ItemMasterId
                            join con in _appContext.Condition on wom.ConditionCodeId equals con.ConditionId
                             into wopcon
                            from con in wopcon.DefaultIfEmpty()
                            join sl in _appContext.StockLine on new { a = (long?)wom.ConditionCodeId, b = (long?)wom.WorkOrderMaterialsId } equals new { a = sl.ConditionId, b = sl == null ? 0 : sl.WorkOrderMaterialsId }
                            into wopsl
                            from sl in wopsl.DefaultIfEmpty()
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            where wom.IsDeleted == false && wom.IsActive == true
                            && (wom.IsAltPart == null || wom.IsAltPart == false)
                            && (wom.PartStatusId == null || wom.PartStatusId == 0 || wom.Quantity - wom.QuantityReserved > 0 || wom.QuantityReserved > 0)

                            && wom.WorkFlowWorkOrderId == WorkFlowWorkOrderId
                            select new
                            {
                                wom.WorkOrderId,
                                wom.WorkFlowWorkOrderId,
                                im.PartNumber,
                                im.PartDescription,
                                wom.Quantity,
                                wom.QuantityReserved,
                                QuantityAlreadyReserved = wom.QuantityReserved,
                                wom.QuantityTurnIn,
                                QuantityIssued = wom.Quantity - wom.QuantityReserved - wom.QuantityIssued + wom.QuantityReserved,
                                QuantityAlreadyIssued = wom.QuantityIssued,
                                Condition = con.Description,
                                wom.ConditionCodeId,
                                QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                                QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                                QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                                StockLineId = sl == null ? 0 : sl.StockLineId,
                                wom.IssuedById,
                                wom.IssuedDate,
                                wom.ReservedById,
                                wom.ReservedDate,
                                wom.ItemMasterId,
                                wom.WorkOrderMaterialsId,
                                wom.IsAltPart,
                                im.ItemClassificationId,
                                im.PurchaseUnitOfMeasureId,
                                wom.TaskId,
                                PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                                wom.ExtendedCost,
                                Manufacturer = man.Name,
                                im.ManufacturerId,
                                OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),

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
                        workOrderReserveIssuesPart.IssuedById = item.IssuedById;
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
                        workOrderReserveIssuesPart.ReservedById = item.ReservedById;
                        workOrderReserveIssuesPart.ReservedDate = item.ReservedDate;
                        workOrderReserveIssuesPart.WOReservedIssuedAltParts = GetWOReservedIssuedAltParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WOReservedIssuedEquParts = GetWOReservedIssuedEquParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WorkOrderId = item.WorkOrderId;
                        workOrderReserveIssuesPart.WorkFlowWorkOrderId = item.WorkFlowWorkOrderId;
                        workOrderReserveIssuesPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                        workOrderReserveIssuesPart.IsAltPart = item.IsAltPart;
                        workOrderReserveIssuesPart.AltPartMasterPartId = 0;
                        workOrderReserveIssuesPart.StockLineId = item.StockLineId;
                        workOrderReserveIssuesPart.TaskId = item.TaskId;
                        workOrderReserveIssuesPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                        workOrderReserveIssuesPart.ItemClassificationId = item.ItemClassificationId;
                        workOrderReserveIssuesPart.PartStatusId = item.PartStatusId;
                        workOrderReserveIssuesPart.ExtendedCost = item.ExtendedCost;
                        workOrderReserveIssuesPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                        workOrderReserveIssuesPart.QuantityAlreadyIssued = item.QuantityAlreadyIssued;

                        workOrderReserveIssuesPart.Manufacturer = item.Manufacturer;
                        workOrderReserveIssuesPart.ManufacturerId = item.ManufacturerId;
                        workOrderReserveIssuesPart.OemDer = item.OemDer;

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

        public IEnumerable<WorkOrderReserveIssuesParts> GetReservedParts(long WorkFlowWorkOrderId, long workOrderId)
        {
            List<WorkOrderReserveIssuesParts> workOrderReserveIssuesParts = new List<WorkOrderReserveIssuesParts>();
            WorkOrderReserveIssuesParts workOrderReserveIssuesPart;
            try
            {
                var list = (from wom in _appContext.WorkOrderMaterials
                            join im in _appContext.ItemMaster on wom.ItemMasterId equals im.ItemMasterId
                            join con in _appContext.Condition on wom.ConditionCodeId equals con.ConditionId
                             into wopcon
                            from con in wopcon.DefaultIfEmpty()
                            join sl in _appContext.StockLine on new { a = (long?)wom.ConditionCodeId, b = (long?)wom.WorkOrderMaterialsId } equals new { a = sl.ConditionId, b = sl == null ? 0 : sl.WorkOrderMaterialsId }
                            into wopsl
                            from sl in wopsl.DefaultIfEmpty()
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            where wom.IsDeleted == false && wom.IsActive == true && (wom.PartStatusId == null || wom.PartStatusId == 0 || wom.Quantity - wom.QuantityReserved > 0)
                            && (wom.IsAltPart == null || wom.IsAltPart == false)
                            && wom.WorkFlowWorkOrderId == WorkFlowWorkOrderId
                            select new
                            {
                                wom.WorkOrderId,
                                wom.WorkFlowWorkOrderId,
                                im.PartNumber,
                                im.PartDescription,
                                wom.Quantity,
                                QuantityReserved = wom.Quantity - wom.QuantityReserved - wom.QuantityIssued,
                                QuantityAlreadyReserved = wom.QuantityReserved,
                                wom.UnReservedQty,
                                wom.QuantityTurnIn,
                                QuantityIssued = wom.QuantityReserved,
                                QuantityAlreadyIssued = wom.QuantityIssued,
                                wom.UnIssuedQty,
                                Condition = con.Description,
                                wom.ConditionCodeId,
                                QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                                QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                                QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                                StockLineId = sl == null ? 0 : sl.StockLineId,
                                wom.IssuedById,
                                wom.IssuedDate,
                                wom.ReservedById,
                                wom.ReservedDate,
                                wom.ItemMasterId,
                                wom.WorkOrderMaterialsId,
                                wom.IsAltPart,
                                im.ItemClassificationId,
                                im.PurchaseUnitOfMeasureId,
                                wom.TaskId,
                                PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                                wom.ExtendedCost,
                                Manufacturer = man.Name,
                                im.ManufacturerId,
                                OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),

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
                        workOrderReserveIssuesPart.IssuedById = item.IssuedById;
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
                        workOrderReserveIssuesPart.ReservedById = item.ReservedById;
                        workOrderReserveIssuesPart.ReservedDate = item.ReservedDate;
                        workOrderReserveIssuesPart.WOReservedIssuedAltParts = GetWOReservedAltParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WOReservedIssuedEquParts = GetWOReservedEquParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WorkOrderId = item.WorkOrderId;
                        workOrderReserveIssuesPart.WorkFlowWorkOrderId = item.WorkFlowWorkOrderId;
                        workOrderReserveIssuesPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                        workOrderReserveIssuesPart.IsAltPart = item.IsAltPart;
                        workOrderReserveIssuesPart.AltPartMasterPartId = 0;
                        workOrderReserveIssuesPart.StockLineId = item.StockLineId;
                        workOrderReserveIssuesPart.TaskId = item.TaskId;
                        workOrderReserveIssuesPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                        workOrderReserveIssuesPart.ItemClassificationId = item.ItemClassificationId;
                        workOrderReserveIssuesPart.PartStatusId = item.PartStatusId;
                        workOrderReserveIssuesPart.ExtendedCost = item.ExtendedCost;
                        workOrderReserveIssuesPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                        workOrderReserveIssuesPart.QuantityAlreadyIssued = item.QuantityAlreadyIssued;
                        workOrderReserveIssuesPart.Manufacturer = item.Manufacturer;
                        workOrderReserveIssuesPart.ManufacturerId = item.ManufacturerId;
                        workOrderReserveIssuesPart.OemDer = item.OemDer;

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

        public IEnumerable<WorkOrderReserveIssuesParts> GetUnReservedParts(long WorkFlowWorkOrderId, long workOrderId)
        {
            List<WorkOrderReserveIssuesParts> workOrderReserveIssuesParts = new List<WorkOrderReserveIssuesParts>();
            WorkOrderReserveIssuesParts workOrderReserveIssuesPart;
            try
            {
                var list = (from wom in _appContext.WorkOrderMaterials
                            join im in _appContext.ItemMaster on wom.ItemMasterId equals im.ItemMasterId
                            join con in _appContext.Condition on wom.ConditionCodeId equals con.ConditionId
                             into wopcon
                            from con in wopcon.DefaultIfEmpty()
                            join sl in _appContext.StockLine on new { a = (long?)wom.ConditionCodeId, b = (long?)wom.WorkOrderMaterialsId } equals new { a = sl.ConditionId, b = sl == null ? 0 : sl.WorkOrderMaterialsId }
                            into wopsl
                            from sl in wopsl.DefaultIfEmpty()
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            where wom.IsDeleted == false && wom.IsActive == true && wom.QuantityReserved > 0
                            && (wom.IsAltPart == null || wom.IsAltPart == false)
                            && wom.WorkFlowWorkOrderId == WorkFlowWorkOrderId
                            select new
                            {
                                wom.WorkOrderId,
                                wom.WorkFlowWorkOrderId,
                                im.PartNumber,
                                im.PartDescription,
                                wom.Quantity,
                                QuantityReserved = wom.QuantityReserved,
                                QuantityAlreadyReserved = wom.QuantityReserved,
                                wom.UnReservedQty,
                                wom.QuantityTurnIn,
                                wom.QuantityIssued,
                                QuantityAlreadyIssued = wom.QuantityIssued,
                                wom.UnIssuedQty,
                                Condition = con.Description,
                                wom.ConditionCodeId,
                                QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                                QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                                QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                                StockLineId = sl == null ? 0 : sl.StockLineId,
                                wom.IssuedById,
                                wom.IssuedDate,
                                wom.ReservedById,
                                wom.ReservedDate,
                                wom.ItemMasterId,
                                wom.WorkOrderMaterialsId,
                                wom.IsAltPart,
                                im.ItemClassificationId,
                                im.PurchaseUnitOfMeasureId,
                                wom.TaskId,
                                PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                                wom.ExtendedCost,
                                Manufacturer = man.Name,
                                im.ManufacturerId,
                                OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),

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
                        workOrderReserveIssuesPart.IssuedById = item.IssuedById;
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
                        workOrderReserveIssuesPart.ReservedById = item.ReservedById;
                        workOrderReserveIssuesPart.ReservedDate = item.ReservedDate;
                        workOrderReserveIssuesPart.WOReservedIssuedAltParts = GetWOUnReservedAltParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WOReservedIssuedEquParts = GetWOUnReservedEquParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WorkOrderId = item.WorkOrderId;
                        workOrderReserveIssuesPart.WorkFlowWorkOrderId = item.WorkFlowWorkOrderId;
                        workOrderReserveIssuesPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                        workOrderReserveIssuesPart.IsAltPart = item.IsAltPart;
                        workOrderReserveIssuesPart.AltPartMasterPartId = 0;
                        workOrderReserveIssuesPart.StockLineId = item.StockLineId;
                        workOrderReserveIssuesPart.TaskId = item.TaskId;
                        workOrderReserveIssuesPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                        workOrderReserveIssuesPart.ItemClassificationId = item.ItemClassificationId;
                        workOrderReserveIssuesPart.PartStatusId = item.PartStatusId;
                        workOrderReserveIssuesPart.ExtendedCost = item.ExtendedCost;
                        workOrderReserveIssuesPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                        workOrderReserveIssuesPart.QuantityAlreadyIssued = item.QuantityAlreadyIssued;
                        workOrderReserveIssuesPart.Manufacturer = item.Manufacturer;
                        workOrderReserveIssuesPart.ManufacturerId = item.ManufacturerId;
                        workOrderReserveIssuesPart.OemDer = item.OemDer;
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

        public IEnumerable<WorkOrderReserveIssuesParts> GetIssuedParts(long WorkFlowWorkOrderId, long workOrderId)
        {
            List<WorkOrderReserveIssuesParts> workOrderReserveIssuesParts = new List<WorkOrderReserveIssuesParts>();
            WorkOrderReserveIssuesParts workOrderReserveIssuesPart;
            try
            {
                var list = (from wom in _appContext.WorkOrderMaterials
                            join im in _appContext.ItemMaster on wom.ItemMasterId equals im.ItemMasterId
                            join con in _appContext.Condition on wom.ConditionCodeId equals con.ConditionId
                             into wopcon
                            from con in wopcon.DefaultIfEmpty()
                            join sl in _appContext.StockLine on new { a = (long?)wom.ConditionCodeId, b = (long?)wom.WorkOrderMaterialsId } equals new { a = sl.ConditionId, b = sl == null ? 0 : sl.WorkOrderMaterialsId }
                            into wopsl
                            from sl in wopsl.DefaultIfEmpty()
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            where wom.IsDeleted == false && wom.IsActive == true && wom.QuantityReserved > 0
                            && (wom.IsAltPart == null || wom.IsAltPart == false)
                            && wom.WorkFlowWorkOrderId == WorkFlowWorkOrderId

                            select new
                            {
                                wom.WorkOrderId,
                                wom.WorkFlowWorkOrderId,
                                im.PartNumber,
                                im.PartDescription,
                                wom.Quantity,
                                QuantityReserved = wom.Quantity - wom.QuantityReserved - wom.QuantityIssued,
                                QuantityAlreadyReserved = wom.QuantityReserved,
                                wom.UnReservedQty,
                                wom.QuantityTurnIn,
                                QuantityIssued = wom.QuantityReserved,
                                QuantityAlreadyIssued = wom.QuantityIssued,
                                wom.UnIssuedQty,
                                Condition = con.Description,
                                wom.ConditionCodeId,
                                QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                                QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                                QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                                StockLineId = sl == null ? 0 : sl.StockLineId,
                                wom.IssuedById,
                                wom.IssuedDate,
                                wom.ReservedById,
                                wom.ReservedDate,
                                wom.ItemMasterId,
                                wom.WorkOrderMaterialsId,
                                wom.IsAltPart,
                                im.ItemClassificationId,
                                im.PurchaseUnitOfMeasureId,
                                wom.TaskId,
                                PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                                wom.ExtendedCost,
                                Manufacturer = man.Name,
                                im.ManufacturerId,
                                OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),

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
                        workOrderReserveIssuesPart.IssuedById = item.IssuedById;
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
                        workOrderReserveIssuesPart.ReservedById = item.ReservedById;
                        workOrderReserveIssuesPart.ReservedDate = item.ReservedDate;
                        workOrderReserveIssuesPart.WOReservedIssuedAltParts = GetWOIssuedAltParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WOReservedIssuedEquParts = GetWOIssuedEquParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WorkOrderId = item.WorkOrderId;
                        workOrderReserveIssuesPart.WorkFlowWorkOrderId = item.WorkFlowWorkOrderId;
                        workOrderReserveIssuesPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                        workOrderReserveIssuesPart.IsAltPart = item.IsAltPart;
                        workOrderReserveIssuesPart.AltPartMasterPartId = 0;
                        workOrderReserveIssuesPart.StockLineId = item.StockLineId;
                        workOrderReserveIssuesPart.TaskId = item.TaskId;
                        workOrderReserveIssuesPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                        workOrderReserveIssuesPart.ItemClassificationId = item.ItemClassificationId;
                        workOrderReserveIssuesPart.PartStatusId = item.PartStatusId;
                        workOrderReserveIssuesPart.ExtendedCost = item.ExtendedCost;
                        workOrderReserveIssuesPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                        workOrderReserveIssuesPart.QuantityAlreadyIssued = item.QuantityAlreadyIssued;
                        workOrderReserveIssuesPart.Manufacturer = item.Manufacturer;
                        workOrderReserveIssuesPart.ManufacturerId = item.ManufacturerId;
                        workOrderReserveIssuesPart.OemDer = item.OemDer;

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

        public IEnumerable<WorkOrderReserveIssuesParts> GetUnIssuedParts(long WorkFlowWorkOrderId, long workOrderId)
        {
            List<WorkOrderReserveIssuesParts> workOrderReserveIssuesParts = new List<WorkOrderReserveIssuesParts>();
            WorkOrderReserveIssuesParts workOrderReserveIssuesPart;
            try
            {
                var list = (from wom in _appContext.WorkOrderMaterials
                            join im in _appContext.ItemMaster on wom.ItemMasterId equals im.ItemMasterId
                            join con in _appContext.Condition on wom.ConditionCodeId equals con.ConditionId
                             into wopcon
                            from con in wopcon.DefaultIfEmpty()
                            join sl in _appContext.StockLine on new { a = (long?)wom.ConditionCodeId, b = (long?)wom.WorkOrderMaterialsId } equals new { a = sl.ConditionId, b = sl == null ? 0 : sl.WorkOrderMaterialsId }
                            into wopsl
                            from sl in wopsl.DefaultIfEmpty()
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            where wom.IsDeleted == false && wom.IsActive == true && wom.QuantityIssued > 0
                            && (wom.IsAltPart == null || wom.IsAltPart == false)
                            && wom.WorkFlowWorkOrderId == WorkFlowWorkOrderId
                            select new
                            {
                                wom.WorkOrderId,
                                wom.WorkFlowWorkOrderId,
                                im.PartNumber,
                                im.PartDescription,
                                wom.Quantity,
                                QuantityReserved = wom.Quantity - wom.QuantityReserved - wom.QuantityIssued,
                                QuantityAlreadyReserved = wom.QuantityReserved,
                                wom.UnReservedQty,
                                wom.QuantityTurnIn,
                                wom.QuantityIssued,
                                QuantityAlreadyIssued = wom.QuantityIssued,
                                wom.UnIssuedQty,
                                Condition = con.Description,
                                wom.ConditionCodeId,
                                QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                                QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                                QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                                StockLineId = sl == null ? 0 : sl.StockLineId,
                                wom.IssuedById,
                                wom.IssuedDate,
                                wom.ReservedById,
                                wom.ReservedDate,
                                wom.ItemMasterId,
                                wom.WorkOrderMaterialsId,
                                wom.IsAltPart,
                                im.ItemClassificationId,
                                im.PurchaseUnitOfMeasureId,
                                wom.TaskId,
                                PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                                wom.ExtendedCost,
                                Manufacturer = man.Name,
                                im.ManufacturerId,
                                OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),

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
                        workOrderReserveIssuesPart.IssuedById = item.IssuedById;
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
                        workOrderReserveIssuesPart.ReservedById = item.ReservedById;
                        workOrderReserveIssuesPart.ReservedDate = item.ReservedDate;
                        workOrderReserveIssuesPart.WOReservedIssuedAltParts = GetWOUnIssuedAltParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WOReservedIssuedEquParts = GetWOUnIssuedEquParts(item.ItemMasterId, item.WorkFlowWorkOrderId, item.WorkOrderId, item.TaskId);
                        workOrderReserveIssuesPart.WorkOrderId = item.WorkOrderId;
                        workOrderReserveIssuesPart.WorkFlowWorkOrderId = item.WorkFlowWorkOrderId;
                        workOrderReserveIssuesPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                        workOrderReserveIssuesPart.IsAltPart = item.IsAltPart;
                        workOrderReserveIssuesPart.AltPartMasterPartId = 0;
                        workOrderReserveIssuesPart.StockLineId = item.StockLineId;
                        workOrderReserveIssuesPart.TaskId = item.TaskId;
                        workOrderReserveIssuesPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                        workOrderReserveIssuesPart.ItemClassificationId = item.ItemClassificationId;
                        workOrderReserveIssuesPart.PartStatusId = item.PartStatusId;
                        workOrderReserveIssuesPart.ExtendedCost = item.ExtendedCost;
                        workOrderReserveIssuesPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                        workOrderReserveIssuesPart.QuantityAlreadyIssued = item.QuantityAlreadyIssued;

                        workOrderReserveIssuesPart.Manufacturer = item.Manufacturer;
                        workOrderReserveIssuesPart.ManufacturerId = item.ManufacturerId;
                        workOrderReserveIssuesPart.OemDer = item.OemDer;

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

        public WorkOrderQuote CreateWorkOrderQuote(WorkOrderQuote workOrderQuote)
        {
            try
            {
                workOrderQuote.CreatedDate = workOrderQuote.UpdatedDate = DateTime.Now;
                workOrderQuote.IsActive = true;
                workOrderQuote.IsDeleted = false;

                _appContext.WorkOrderQuote.Add(workOrderQuote);
                _appContext.SaveChanges();


                workOrderQuote.QuoteNumber = "WOQ" + workOrderQuote.WorkOrderQuoteId;
                _appContext.WorkOrderQuote.Update(workOrderQuote);
                _appContext.SaveChanges();

                return workOrderQuote;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderQuote UpdateWorkOrderQuote(WorkOrderQuote workOrderQuote)
        {
            try
            {
                workOrderQuote.UpdatedDate = DateTime.Now;
                workOrderQuote.IsActive = true;
                workOrderQuote.IsDeleted = false;

                _appContext.WorkOrderQuote.Update(workOrderQuote);
                _appContext.SaveChanges();
                return workOrderQuote;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetWorkFlowWorkOrderQuote(long wfwoId = 0, long workOrderId = 0)
        {
            try
            {
                var workOrderQuote = (from wq in _appContext.WorkOrderQuote
                                      join wo in _appContext.WorkOrder on wq.WorkOrderId equals wo.WorkOrderId
                                      join cust in _appContext.Customer on wq.CustomerId equals cust.CustomerId
                                      join cur in _appContext.Currency on wq.CurrencyId equals cur.CurrencyId
                                      join emp in _appContext.Employee on wq.EmployeeId equals emp.EmployeeId
                                      join sp in _appContext.Employee on wq.SalesPersonId equals sp.EmployeeId
                                      join cc in _appContext.CustomerContact on cust.CustomerId equals cc.CustomerId into custcc
                                      from cc in custcc.DefaultIfEmpty()
                                      join con in _appContext.Contact on cc.ContactId equals con.ContactId into cccon
                                      from con in cccon.DefaultIfEmpty()
                                      join ct in _appContext.CreditTerms on cust.CreditTermsId equals ct.CreditTermsId into custct
                                      from ct in custct.DefaultIfEmpty()
                                      join qd in _appContext.WorkOrderQuoteDetails on wq.WorkOrderQuoteId equals qd.WorkOrderQuoteId into wqqd
                                      from qd in wqqd.DefaultIfEmpty()
                                      where wq.WorkOrderId == workOrderId && wq.IsDeleted == false
                                      select new
                                      {
                                          WorkOrderQuote = wq,
                                          WorkOrderNumber = wo.WorkOrderNum,
                                          CurrencyName = cur.Symbol,
                                          CurrencyCode = cur.Code,
                                          CustomerName = cust.Name,
                                          CustomerCode = cust.CustomerCode,
                                          CustomerContact = con == null ? "" : con.WorkPhone,
                                          CustomerEmail = cust.Email,
                                          CustomerPhone = cust.CustomerPhone,
                                          CustomerReference = cust.CSRName,
                                          CreditLimit = cust.CreditLimit,
                                          CreditTermId = ct == null ? 0 : ct.CreditTermsId,
                                          CreditTerm = ct == null ? "" : ct.Name,
                                          SalesPersonName = sp.FirstName + ' ' + sp.LastName,
                                          EmployeeName = emp.FirstName + ' ' + emp.LastName,
                                          wq.Warnings,
                                          wq.Memo,
                                          wq.AccountsReceivableBalance,
                                          BuildMethodId = qd == null ? 0 : qd.BuildMethodId,
                                          SelectedId = qd == null ? 0 : qd.SelectedId,
                                          ReferenceNo = qd == null ? "" : qd.ReferenceNo,

                                      }).FirstOrDefault();
                return workOrderQuote;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public object WorkOrderQuoteExists(long workOrderId)
        {
            try
            {
                return _appContext.WorkOrderQuote.Where(p => p.WorkOrderId == workOrderId).FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }



        public WorkOrderQuoteDetails CreateWorkOrderQuoteDetails(WorkOrderQuoteDetails workOrderQuoteDetails)
        {
            try
            {
                _appContext.WorkOrderQuoteDetails.Add(workOrderQuoteDetails);
                _appContext.SaveChanges();
                return workOrderQuoteDetails;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderQuoteDetails UpdateWorkOrderQuoteDetails(WorkOrderQuoteDetails workOrderQuoteDetails)
        {
            try
            {
                _appContext.WorkOrderQuoteDetails.Update(workOrderQuoteDetails);
                _appContext.SaveChanges();
                return workOrderQuoteDetails;
            }
            catch (Exception)
            {

                throw;
            }
        }



        public WorkOrderQuoteDetails CreateWorkOrderQuoteExclusions(WorkOrderQuoteDetails quoteExclusions)
        {
            try
            {
                if (quoteExclusions.WorkOrderQuoteDetailsId > 0)
                {
                    _appContext.WorkOrderQuoteDetails.Update(quoteExclusions);
                }
                else
                {
                    _appContext.WorkOrderQuoteDetails.Add(quoteExclusions);
                }

                _appContext.SaveChanges();
                return quoteExclusions;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderQuoteDetails UpdateWorkOrderQuoteExclusions(WorkOrderQuoteDetails quoteExclusions)
        {
            try
            {
                _appContext.WorkOrderQuoteDetails.Update(quoteExclusions);
                _appContext.SaveChanges();
                return quoteExclusions;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderQuoteExclusions(long WorkOrderQuoteId)
        {
            try
            {
                var workOrderExclusionsList = (from we in _appContext.WorkOrderQuoteExclusions
                                               join wq in _appContext.WorkOrderQuoteDetails on we.WorkOrderQuoteDetailsId equals wq.WorkOrderQuoteDetailsId
                                               join im in _appContext.ItemMaster on we.ItemMasterId equals im.ItemMasterId
                                               join eo in _appContext.ExclusionEstimatedOccurances on we.ExstimtPercentOccuranceId equals eo.Id into weeo
                                               from eo in weeo.DefaultIfEmpty()
                                               join mp in _appContext.Percent on we.MarkUpPercentageId equals mp.PercentId into wemp
                                               from mp in wemp.DefaultIfEmpty()
                                               where we.IsDeleted == false && wq.WorkOrderQuoteId == WorkOrderQuoteId
                                               select new
                                               {
                                                   we.CostPlusAmount,
                                                   we.CreatedBy,
                                                   we.CreatedDate,
                                                   Epn = im.PartNumber,
                                                   EpnDescription = im.PartDescription,
                                                   we.ExstimtPercentOccuranceId,
                                                   ExstimtPercentOccurance = eo.Name == null ? "" : eo.Name,
                                                   we.ExtendedCost,
                                                   we.FixedAmount,
                                                   we.IsActive,
                                                   we.IsDeleted,
                                                   we.ItemMasterId,
                                                   we.MarkUpPercentageId,
                                                   MarkUpPercentage = mp == null ? 0 : mp.PercentValue,
                                                   we.MasterCompanyId,
                                                   we.Memo,
                                                   we.Quantity,
                                                   we.Reference,
                                                   we.SourceId,
                                                   Source = we.SourceId == 0 ? "" : (we.SourceId == 1 ? "Manual" : "Workflow"),
                                                   we.UnitCost,
                                                   we.UpdatedBy,
                                                   we.UpdatedDate,
                                                   we.WorkOrderQuoteDetailsId,
                                                   we.WorkOrderQuoteExclusionsId,
                                               }).Distinct()
                             .ToList();
                return workOrderExclusionsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderQuoteExclusion(long exclusionId, string updatedBy)
        {
            WorkOrderQuoteExclusions workOrderQuoteExclusions = new WorkOrderQuoteExclusions();
            try
            {
                workOrderQuoteExclusions.WorkOrderQuoteExclusionsId = exclusionId;
                workOrderQuoteExclusions.IsDeleted = true;
                workOrderQuoteExclusions.UpdatedBy = updatedBy;
                workOrderQuoteExclusions.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderQuoteExclusions.Attach(workOrderQuoteExclusions);

                _appContext.Entry(workOrderQuoteExclusions).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderQuoteExclusions).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderQuoteExclusions).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }



        public WorkOrderQuoteDetails CreateWorkOrderQuoteFreight(WorkOrderQuoteDetails quoteFreight)
        {
            try
            {
                if (quoteFreight.WorkOrderQuoteDetailsId > 0)
                {
                    _appContext.WorkOrderQuoteDetails.Update(quoteFreight);
                }
                else
                {
                    _appContext.WorkOrderQuoteDetails.Add(quoteFreight);
                }

                _appContext.SaveChanges();
                return quoteFreight;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderQuoteDetails UpdateWorkOrderQuoteFreight(WorkOrderQuoteDetails quoteFreight)
        {
            try
            {
                _appContext.WorkOrderQuoteDetails.Update(quoteFreight);
                _appContext.SaveChanges();
                return quoteFreight;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderQuoteFreight(long WorkOrderQuoteId)
        {
            try
            {
                var workOrderFreightList = (from wf in _appContext.WorkOrderQuoteFreight
                                            join wq in _appContext.WorkOrderQuoteDetails on wf.WorkOrderQuoteDetailsId equals wq.WorkOrderQuoteDetailsId
                                            join car in _appContext.Carrier on wf.CarrierId equals car.CarrierId
                                            join sv in _appContext.CustomerShipping on wf.ShipViaId equals sv.CustomerShippingId
                                            where wf.IsDeleted == false && wq.WorkOrderQuoteId == WorkOrderQuoteId
                                            select new
                                            {
                                                wf.Amount,
                                                wf.CarrierId,
                                                wf.CreatedBy,
                                                wf.CreatedDate,
                                                wf.FixedAmount,
                                                wf.Height,
                                                wf.IsActive,
                                                wf.IsDeleted,
                                                wf.IsFixedFreight,
                                                wf.Length,
                                                wf.MasterCompanyId,
                                                wf.Memo,
                                                wf.ShipViaId,
                                                wf.UpdatedBy,
                                                wf.UpdatedDate,
                                                wf.Weight,
                                                wf.Width,
                                                wf.WorkOrderQuoteDetailsId,
                                                wf.WorkOrderQuoteFreightId,
                                                ShipViaName = sv.ShipVia,
                                                CarrierName = car.Description,
                                                wf.MarkupPercentageId,
                                                wf.FreightCostPlus
                                            }).Distinct().ToList();

                return workOrderFreightList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderQuoteFreight(long freightId, string updatedBy)
        {
            WorkOrderQuoteFreight workOrderQuoteFreight = new WorkOrderQuoteFreight();
            try
            {
                workOrderQuoteFreight.WorkOrderQuoteFreightId = freightId;
                workOrderQuoteFreight.IsDeleted = true;
                workOrderQuoteFreight.UpdatedBy = updatedBy;
                workOrderQuoteFreight.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderQuoteFreight.Attach(workOrderQuoteFreight);

                _appContext.Entry(workOrderQuoteFreight).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderQuoteFreight).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderQuoteFreight).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }



        public WorkOrderQuoteDetails CreateWorkOrderQuoteCharges(WorkOrderQuoteDetails quoteCharges)
        {
            try
            {
                if (quoteCharges.WorkOrderQuoteDetailsId > 0)
                {
                    _appContext.WorkOrderQuoteDetails.Update(quoteCharges);
                }
                else
                {
                    _appContext.WorkOrderQuoteDetails.Add(quoteCharges);
                }
                _appContext.SaveChanges();
                return quoteCharges;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderQuoteDetails UpdateWorkOrderQuoteCharges(WorkOrderQuoteDetails quoteCharges)
        {
            try
            {
                _appContext.WorkOrderQuoteDetails.Update(quoteCharges);
                _appContext.SaveChanges();
                return quoteCharges;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderQuoteCharges(long WorkOrderQuoteId)
        {
            try
            {
                var list = (from woc in _appContext.WorkOrderQuoteCharges
                            join wq in _appContext.WorkOrderQuoteDetails on woc.WorkOrderQuoteDetailsId equals wq.WorkOrderQuoteDetailsId
                            join ct in _appContext.ChargesTypes on woc.ChargesTypeId equals ct.Id
                            join v in _appContext.Vendor on woc.VendorId equals v.VendorId into wocv
                            from v in wocv.DefaultIfEmpty()
                            where woc.IsDeleted == false && wq.WorkOrderQuoteId == WorkOrderQuoteId
                            select new
                            {
                                woc.ChargesTypeId,
                                ChargeType = ct.Name,
                                woc.Description,
                                woc.Quantity,
                                woc.UnitCost,
                                woc.ExtendedCost,
                                woc.UnitPrice,
                                woc.ExtendedPrice,
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
                                woc.UpdatedBy,
                                woc.UpdatedDate,
                                woc.WorkOrderQuoteDetailsId,
                                woc.WorkOrderQuoteChargesId,
                                WorkflowChargeTypeId = woc.ChargesTypeId,
                                woc.ChargesCostPlus,
                            }
                          ).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteWorkOrderQuoteCharges(long workOrderChargeId, string updatedBy)
        {
            WorkOrderQuoteCharges workOrderCharge = new WorkOrderQuoteCharges();
            try
            {
                workOrderCharge.WorkOrderQuoteChargesId = workOrderChargeId;
                workOrderCharge.IsDeleted = true;
                workOrderCharge.UpdatedBy = updatedBy;
                workOrderCharge.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderQuoteCharges.Attach(workOrderCharge);

                _appContext.Entry(workOrderCharge).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderCharge).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderCharge).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }



        public WorkOrderQuoteDetails CreateWorkOrderQuoteMaterial(WorkOrderQuoteDetails quoteMaterials)
        {
            try
            {
                if (quoteMaterials.WorkOrderQuoteDetailsId > 0)
                {
                    _appContext.WorkOrderQuoteDetails.Update(quoteMaterials);
                }
                else
                {
                    _appContext.WorkOrderQuoteDetails.Add(quoteMaterials);
                }
                _appContext.SaveChanges();
                return quoteMaterials;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderQuoteDetails UpdateWorkOrderQuoteMaterial(WorkOrderQuoteDetails quoteMaterials)
        {
            try
            {
                _appContext.WorkOrderQuoteDetails.Update(quoteMaterials);
                _appContext.SaveChanges();
                return quoteMaterials;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderQuoteMaterial(long WorkOrderQuoteId)
        {

            try
            {
                var workOrderMaterialsList = (from wom in _appContext.WorkOrderQuoteMaterial
                                              join wq in _appContext.WorkOrderQuoteDetails on wom.WorkOrderQuoteDetailsId equals wq.WorkOrderQuoteDetailsId
                                              join im in _appContext.ItemMaster on wom.ItemMasterId equals im.ItemMasterId
                                              join p in _appContext.Provision on im.ProvisionId equals p.ProvisionId into pro
                                              from p in pro.DefaultIfEmpty()
                                              join c in _appContext.Condition on wom.ConditionCodeId equals c.ConditionId
                                              join uom in _appContext.UnitOfMeasure on wom.UnitOfMeasureId equals uom.UnitOfMeasureId
                                              where wom.IsDeleted == false && wq.WorkOrderQuoteId == WorkOrderQuoteId
                                              select new
                                              {
                                                  im.PartNumber,
                                                  im.PartDescription,
                                                  AltPartNumber = string.Empty,
                                                  Source = wq.BuildMethodId == 1 ? "WF" : (wq.BuildMethodId == 2 ? "WO" : (wq.BuildMethodId == 3 ? "WF" : "Third Party")),
                                                  wq.ReferenceNo,
                                                  wom.Quantity,
                                                  wom.UnitOfMeasureId,
                                                  UnitOfMeasure = uom.Description,
                                                  wom.ConditionCodeId,
                                                  ConditionType = c.Description,
                                                  OemPmaDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                                                  wom.UnitCost,
                                                  wom.MarkupPercentageId,
                                                  wom.Price,
                                                  wom.ExtendedPrice,
                                                  wom.MaterialCostPlus,
                                                  wom.FixedAmount,
                                                  wom.WorkOrderQuoteDetailsId,
                                                  wom.WorkOrderQuoteMaterialId,
                                                  wom.ItemClassificationId,
                                                  wom.ItemMasterId
                                              }).Distinct().ToList();

                return workOrderMaterialsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderQuoteMaterial(long workOrderMaterialsId, string updatedBy)
        {
            try
            {
                WorkOrderQuoteMaterial workOrderQuoteMaterial = new WorkOrderQuoteMaterial();
                workOrderQuoteMaterial.WorkOrderQuoteMaterialId = workOrderMaterialsId;
                workOrderQuoteMaterial.UpdatedDate = DateTime.Now;
                workOrderQuoteMaterial.IsDeleted = true;
                workOrderQuoteMaterial.UpdatedBy = updatedBy;

                _appContext.WorkOrderQuoteMaterial.Attach(workOrderQuoteMaterial);
                _appContext.Entry(workOrderQuoteMaterial).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderQuoteMaterial).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrderQuoteMaterial).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }



        public WorkOrderQuoteDetails CreateWorkOrderQuoteLabor(WorkOrderQuoteDetails quoteLabor)
        {
            try
            {
                if (quoteLabor.WorkOrderQuoteDetailsId > 0)
                {
                    _appContext.WorkOrderQuoteDetails.Update(quoteLabor);
                }
                else
                {
                    _appContext.WorkOrderQuoteDetails.Add(quoteLabor);
                }
                _appContext.SaveChanges();
                return quoteLabor;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderQuoteDetails UpdateWorkOrderQuoteLabor(WorkOrderQuoteDetails quoteLabor)
        {
            try
            {
                _appContext.WorkOrderQuoteDetails.Update(quoteLabor);
                _appContext.SaveChanges();
                return quoteLabor;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetWorkOrderQuoteLabor(long WorkOrderQuoteId)
        {
            try
            {
                var laborList = (from lh in _appContext.WorkOrderQuoteLaborHeader
                                 join wq in _appContext.WorkOrderQuoteDetails on lh.WorkOrderQuoteDetailsId equals wq.WorkOrderQuoteDetailsId
                                 join l in _appContext.WorkOrderQuoteLabor on lh.WorkOrderQuoteLaborHeaderId equals l.WorkOrderQuoteLaborHeaderId
                                 join deby in _appContext.Employee on lh.DataEnteredBy equals deby.EmployeeId into lhdeby
                                 from deby in lhdeby.DefaultIfEmpty()
                                 join exp in _appContext.ExpertiseType on lh.ExpertiseId equals exp.ExpertiseTypeId into lhexp
                                 from exp in lhexp.DefaultIfEmpty()
                                 join emp in _appContext.Employee on lh.EmployeeId equals emp.EmployeeId into lhemp
                                 from emp in lhemp.DefaultIfEmpty()
                                 where lh.IsDeleted == false && wq.WorkOrderQuoteId == WorkOrderQuoteId
                                 select new
                                 {
                                     lh.CreatedBy,
                                     lh.CreatedDate,
                                     lh.DataEnteredBy,
                                     lh.EmployeeId,
                                     lh.HoursorClockorScan,
                                     lh.IsActive,
                                     lh.IsDeleted,
                                     lh.IsTaskCompletedByOne,
                                     lh.LabourMemo,
                                     lh.MasterCompanyId,
                                     lh.UpdatedBy,
                                     lh.UpdatedDate,
                                     lh.WorkOrderQuoteDetailsId,
                                     lh.WorkOrderHoursType,
                                     lh.WorkOrderQuoteLaborHeaderId,
                                     lh.ExpertiseId,
                                     lh.TotalWorkHours,
                                     DataEnteredByName = deby.FirstName,
                                     ExpertiseType = exp.Description,
                                     EmployeeName = emp.FirstName,
                                     LaborList = (from wol in _appContext.WorkOrderQuoteLabor
                                                  join exp in _appContext.ExpertiseType on wol.ExpertiseId equals exp.ExpertiseTypeId into wolexp
                                                  from exp in wolexp.DefaultIfEmpty()
                                                  join emp in _appContext.Employee on wol.EmployeeId equals emp.EmployeeId into wolemp
                                                  from emp in wolemp.DefaultIfEmpty()
                                                  join task in _appContext.Task.Where(p => p.IsActive == true && p.IsDelete == false) on wol.TaskId equals task.TaskId into woltask
                                                  from task in woltask.DefaultIfEmpty()
                                                  where wol.WorkOrderQuoteLaborHeaderId == lh.WorkOrderQuoteLaborHeaderId
                                                  select new
                                                  {
                                                      wol.AdjustedHours,
                                                      wol.Adjustments,
                                                      wol.BillableId,
                                                      wol.CreatedBy,
                                                      wol.CreatedDate,
                                                      wol.EmployeeId,
                                                      wol.EndDate,
                                                      wol.ExpertiseId,
                                                      Expertise = exp.Description,
                                                      wol.Hours,
                                                      wol.IsActive,
                                                      wol.IsDeleted,
                                                      wol.Memo,
                                                      wol.StartDate,
                                                      wol.TaskId,
                                                      Task = task.Description,
                                                      wol.UpdatedBy,
                                                      wol.UpdatedDate,
                                                      wol.WorkOrderQuoteLaborHeaderId,
                                                      wol.WorkOrderQuoteLaborId,
                                                      EmployeeName = emp.FirstName,
                                                      wol.DirectLaborOHCost,
                                                      wol.MarkupPercentageId,
                                                      wol.LabourCostPlus
                                                  }
                                                 ).Distinct().ToList()
                                 }

                               ).FirstOrDefault();
                return laborList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void DeleteWorkOrderQuoteLabor(long workOrderQuoteLaborId, string updatedBy)
        {
            WorkOrderQuoteLabor workOrderLabor = new WorkOrderQuoteLabor();
            try
            {
                workOrderLabor.WorkOrderQuoteLaborId = workOrderQuoteLaborId;
                workOrderLabor.IsDeleted = true;
                workOrderLabor.UpdatedBy = updatedBy;
                workOrderLabor.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderQuoteLabor.Attach(workOrderLabor);

                _appContext.Entry(workOrderLabor).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderLabor).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderLabor).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetWorkOrderQuoteDetails(long workOrderId)
        {
            try
            {
                var data = (from wo in _appContext.WorkOrder
                            join woq in _appContext.WorkOrderQuote on wo.WorkOrderId equals woq.WorkOrderId
                            join wqd in _appContext.WorkOrderQuoteDetails on woq.WorkOrderQuoteId equals wqd.WorkOrderQuoteId
                            select new
                            {
                                wqd
                            }).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Work Order Freight

        public List<WorkOrderFreight> CreateWorkOrderFreight(List<WorkOrderFreight> workOrderFreight)
        {
            try
            {
                _appContext.WorkOrderFreight.AddRange(workOrderFreight);
                _appContext.SaveChanges();
                return workOrderFreight;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<WorkOrderFreight> UpdateWorkOrderFreight(List<WorkOrderFreight> workOrderFreight)
        {
            try
            {
                try
                {
                    if (workOrderFreight != null && workOrderFreight.Count > 0)
                    {
                        foreach (var freight in workOrderFreight)
                        {
                            if (freight.WorkOrderFreightId > 0)
                            {
                                _appContext.WorkOrderFreight.Update(freight);
                            }
                            else
                            {
                                _appContext.WorkOrderFreight.Add(freight);
                            }
                            _appContext.SaveChanges();

                        }
                    }
                    return workOrderFreight;
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

        public IEnumerable<object> GetWorkFlowWorkOrderFreightList(long wfwoId = 0, long workOrderId = 0)
        {
            try
            {
                var workOrderFreightList = (from wf in _appContext.WorkOrderFreight
                                            join car in _appContext.Carrier on wf.CarrierId equals car.CarrierId
                                            join sv in _appContext.CustomerShipping on wf.ShipViaId equals sv.CustomerShippingId
                                            where wf.IsDeleted == false && wf.WorkFlowWorkOrderId == wfwoId
                                            select new
                                            {
                                                wf.Amount,
                                                wf.CarrierId,
                                                wf.CreatedBy,
                                                wf.CreatedDate,
                                                wf.FixedAmount,
                                                wf.Height,
                                                wf.IsActive,
                                                wf.IsDeleted,
                                                wf.IsFixedFreight,
                                                wf.Length,
                                                wf.MasterCompanyId,
                                                wf.Memo,
                                                wf.ShipViaId,
                                                wf.UpdatedBy,
                                                wf.UpdatedDate,
                                                wf.Weight,
                                                wf.Width,
                                                wf.WorkFlowWorkOrderId,
                                                wf.WorkOrderFreightId,
                                                wf.WorkOrderId,
                                                sv.ShipVia,
                                                CarrierName = car.Description
                                            }).Distinct().ToList();

                return workOrderFreightList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteWorkOrderFreight(long workOrderFreightId, string updatedBy)
        {
            WorkOrderFreight workOrderFreight = new WorkOrderFreight();
            try
            {
                workOrderFreight.WorkOrderFreightId = workOrderFreightId;
                workOrderFreight.IsDeleted = true;
                workOrderFreight.UpdatedBy = updatedBy;
                workOrderFreight.UpdatedDate = DateTime.Now;
                _appContext.WorkOrderFreight.Attach(workOrderFreight);

                _appContext.Entry(workOrderFreight).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(workOrderFreight).Property(p => p.UpdatedBy).IsModified = true;
                _appContext.Entry(workOrderFreight).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.SaveChanges();
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

        public IEnumerable<object> GetWorkOrderPublications(long wfwoId, long workOrderId)
        {
            try
            {
                var workOrderPublicationList = (from wop in _appContext.WorkOrderPublications
                                                join pub in _appContext.Publication on wop.PublicationId equals pub.PublicationRecordId
                                                join act in _appContext.AircraftType on wop.AircraftManufacturerId equals act.AircraftTypeId into wopact
                                                from act in wopact.DefaultIfEmpty()
                                                join acm in _appContext.AircraftModel on wop.ModelId equals acm.AircraftModelId into wopacm
                                                from acm in wopacm.DefaultIfEmpty()
                                                join pt in _appContext.PublicationType on pub.PublicationTypeId equals pt.PublicationTypeId
                                                join vfb in _appContext.Employee on pub.VerifiedBy equals vfb.EmployeeId into pubvfb
                                                from vfb in pubvfb.DefaultIfEmpty()
                                                where wop.IsDeleted == false && wop.WorkFlowWorkOrderId == wfwoId
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
                                                    Image = "",
                                                    PublicationName = pub.PublicationId,
                                                    WorkOrderPublicationDashNumber = _appContext.WorkOrderPublicationDashNumber.Where(x => x.WorkOrderPublicationId == wop.WorkOrderPublicationId).ToList()
                                                }).Distinct().ToList();


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
                            where wod.IsDeleted == false && wod.WorkFlowWorkOrderId == wfwoId
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

        #region Billing and Invoicing

        public WorkOrderBillingInvoicing CreateWorkOrderBillingInvoicing(WorkOrderBillingInvoicing billingInvoicing)
        {
            try
            {
                _appContext.WorkOrderBillingInvoicing.Add(billingInvoicing);
                _appContext.SaveChanges();
                return billingInvoicing;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderBillingInvoicing UpdateWorkOrderBillingInvoicing(WorkOrderBillingInvoicing billingInvoicing)
        {
            try
            {
                _appContext.WorkOrderBillingInvoicing.Update(billingInvoicing);
                _appContext.SaveChanges();
                return billingInvoicing;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetBillingInvoicingDetails(long WorkOrderId, long workOrderPartNoId)
        {
            try
            {
                var data = (from bi in _appContext.WorkOrderBillingInvoicing
                            join wo in _appContext.WorkOrder on bi.WorkOrderId equals wo.WorkOrderId
                            join wop in _appContext.WorkOrderPartNumber on bi.WorkOrderPartNoId equals wop.ID
                            join wowf in _appContext.WorkOrderWorkFlow on bi.WorkFlowWorkOrderId equals wowf.WorkFlowWorkOrderId
                            join cust in _appContext.Customer on bi.CustomerId equals cust.CustomerId
                            join it in _appContext.InvoiceType on bi.InvoiceTypeId equals it.InvoiceTypeId
                            join emp in _appContext.Employee on bi.EmployeeId equals emp.EmployeeId
                            join wos in _appContext.WorkScope on wop.WorkOrderScopeId equals wos.WorkScopeId
                            join soc in _appContext.Customer on bi.SoldToCustomerId equals soc.CustomerId
                            join sos in _appContext.CustomerShippingAddress on bi.SoldToSiteId equals sos.CustomerShippingAddressId
                            join soa in _appContext.Address on sos.AddressId equals soa.AddressId

                            join shc in _appContext.Customer on bi.SoldToCustomerId equals shc.CustomerId
                            join shs in _appContext.CustomerShippingAddress on bi.SoldToSiteId equals shs.CustomerShippingAddressId
                            join sha in _appContext.Address on sos.AddressId equals sha.AddressId
                            join mnge in _appContext.Employee on bi.ManagementEmpId equals mnge.EmployeeId into bimnge
                            from mnge in bimnge.DefaultIfEmpty()
                            join sp in _appContext.Employee on wo.SalesPersonId equals sp.EmployeeId
                            join cur in _appContext.Currency on bi.CurrencyId equals cur.CurrencyId into custcur
                            from cur in custcur.DefaultIfEmpty()
                            join ct in _appContext.CreditTerms on cust.CreditTermsId equals ct.CreditTermsId
                            join sv in _appContext.ShippingVia on bi.ShipViaId equals sv.ShippingViaId into bisv
                            from sv in bisv.DefaultIfEmpty()
                            join ps in _appContext.Employee on cust.PrimarySalesPersonId equals Convert.ToString(ps.EmployeeId) into custps
                            from ps in custps.DefaultIfEmpty()
                            where bi.WorkOrderId == WorkOrderId && bi.WorkOrderPartNoId == workOrderPartNoId
                            select new
                            {
                                bi.BillingInvoicingId,
                                bi.WorkOrderId,
                                bi.WorkOrderPartNoId,
                                bi.WorkFlowWorkOrderId,
                                bi.ItemMasterId,
                                bi.InvoiceTypeId,
                                InvoiceType = it.Description,
                                bi.InvoiceNo,
                                cust.ContractReference,
                                cust.CustomerCode,
                                bi.InvoiceDate,
                                bi.InvoiceTime,
                                bi.PrintDate,
                                bi.ShipDate,
                                bi.NoofPieces,
                                bi.EmployeeId,
                                EmployeeName = emp.FirstName,
                                bi.RevType,
                                wo.WorkOrderTypeId,
                                WorkOrderType = wo.WorkOrderTypeId == 1 ? "Customer" : (wo.WorkOrderTypeId == 2 ? "Internal" : (wo.WorkOrderTypeId == 3 ? "Tear Down" : "Shop Services")),
                                WorkScope = wos.Description,
                                wop.WorkOrderScopeId,
                                wop.Quantity,
                                wo.OpenDate,
                                wo.SalesPersonId,
                                SalesPerson = sp.FirstName,
                                bi.CurrencyId,
                                Currency = cur.DisplayName,
                                cust.CreditLimit,
                                cust.CreditTermsId,
                                CreditTerm = ct.Name,
                                bi.GateStatus,
                                bi.SoldToCustomerId,
                                SoldToCustomer = soc.Name,
                                bi.SoldToSiteId,
                                soa.City,
                                soa.Country,
                                soa.Line1,
                                soa.Line2,
                                soa.Line3,
                                soa.PoBox,
                                soa.PostalCode,
                                soa.StateOrProvince,
                                bi.ShipToCustomerId,
                                ShipToCustomer = shc.Name,
                                bi.ShipToSiteId,
                                ShipToCity = sha.City,
                                ShipToCountry = sha.Country,
                                ShipToLine1 = sha.Line1,
                                ShipToLine2 = sha.Line2,
                                ShipToLine3 = sha.Line3,
                                ShipToPoBox = sha.PoBox,
                                ShipToPostalCode = sha.PostalCode,
                                ShipToState = sha.StateOrProvince,
                                bi.ShipToAttention,
                                bi.ManagementStructureId,
                                bi.ManagementEmpId,
                                ManagementEmp = mnge.FirstName,
                                bi.Notes,
                                bi.CostPlusType,
                                bi.TotalWorkOrder,
                                bi.TotalWorkOrderValue,
                                bi.Material,
                                bi.MaterialValue,
                                bi.LaborOverHead,
                                bi.LaborOverHeadValue,
                                bi.MiscCharges,
                                bi.MiscChargesValue,
                                bi.ProForma,
                                bi.PartialInvoice,
                                bi.CostPlusRateCombo,
                                bi.ShipViaId,
                                ShipVia = sv.Name,
                                ShippingAccountinfo = sv.ShippingAccountInfo,
                                bi.WayBillRef,
                                bi.Tracking,
                                CSR = ps == null ? "" : ps.FirstName,
                                CustomerReference = cust.ContractReference,
                                CustomerName = cust.Name,
                                wo.CustomerId,
                                cust.Email,
                                cust.CustomerPhone,
                                bi.AvailableCredit,
                                bi.TotalWorkOrderCost,
                                bi.TotalWorkOrderCostPlus,
                                bi.MaterialCost,
                                bi.MaterialCostPlus,
                                bi.LaborOverHeadCost,
                                bi.LaborOverHeadCostPlus,
                                bi.MiscChargesCost,
                                bi.MiscChargesCostPlus,
                                bi.GrandTotal,
                            }).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }


        #endregion

        #region Work Order Main Component

        public IEnumerable<object> WorkOrderROlist()
        {
            var roList = (from ro in _appContext.RepairOrder
                          join rop in _appContext.RepairOrderPart on ro.RepairOrderId equals rop.RepairOrderId
                          join im in _appContext.ItemMaster on rop.ItemMasterId equals im.ItemMasterId
                          join sl in _appContext.StockLine on rop.StockLineId equals sl.StockLineId
                          into ropsl
                          from sl in ropsl.DefaultIfEmpty()
                          join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                          join cur in _appContext.Currency on rop.ReportCurrencyId equals cur.CurrencyId
                          where ro.IsDeleted == false && ro.IsActive == true && rop.IsParent == true
                          && ro.StatusId == 1
                          select new
                          {
                              ro.RepairOrderId,
                              rop.RepairOrderPartRecordId,
                              im.PartNumber,
                              im.PartDescription,
                              sl.SerialNumber,
                              ro.RepairOrderNumber,
                              rop.QuantityOrdered,
                              sl.ControlNumber,
                              ControllerId = sl.IdNumber,
                              rop.UnitCost,
                              rop.ExtendedCost,
                              Currency = cur.DisplayName,
                              v.VendorName,
                              Status = "Open",
                              ro.OpenDate,
                              ro.NeedByDate

                          }).Distinct().ToList();

            return roList;

        }

        #endregion


        #region Dropdowns

        public IEnumerable<object> GetWorkFlowNos(long partId, long workScopeId)
        {
            try
            {

                var workFlowNos = (from wf in _appContext.Workflow
                                   join c in _appContext.Customer on wf.CustomerId equals c.CustomerId
                                   join im in _appContext.ItemMaster on wf.ItemMasterId equals im.ItemMasterId
                                   join ws in _appContext.WorkScope on wf.WorkScopeId equals ws.WorkScopeId
                                   join cur in _appContext.Currency on wf.CurrencyId equals cur.CurrencyId
                                   where (wf.IsDelete == false || wf.IsDelete == null) && wf.IsActive == true && wf.ItemMasterId == partId && wf.WorkScopeId == workScopeId
                                   select new
                                   {
                                       WorkFlowNo = wf.WorkOrderNumber + "_" + wf.Version,
                                       WorkFlowId = wf.WorkflowId,
                                       CustomerName = c.Name,
                                       im.PartNumber,
                                       im.PartDescription,
                                       WorkScope = ws.Description,
                                       Currency = cur.DisplayName,
                                   }).Distinct().ToList();

                return workFlowNos;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderNos(long partId, long workScopeId)
        {
            try
            {

                var workOrderNos = (from wo in _appContext.WorkOrder
                                    join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                    join c in _appContext.Customer on wo.CustomerId equals c.CustomerId
                                    join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                                    join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                                    join wowf in _appContext.WorkOrderWorkFlow on wo.WorkOrderId equals wowf.WorkOrderId

                                    where wo.IsDeleted == false && wo.IsActive == true && wop.MasterPartId == partId && wop.WorkOrderScopeId == workScopeId
                                    select new
                                    {
                                        wo.WorkOrderNum,
                                        wo.WorkOrderId,
                                        WorkOrderPartNumberId = wop.ID,
                                        wowf.WorkFlowWorkOrderId,
                                        CustomerName = c.Name,
                                        im.PartNumber,
                                        im.PartDescription,
                                        WorkScope = ws.Description,

                                    }).Distinct().ToList();

                return workOrderNos;
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
                            where im.IsActive == true && (im.IsDeleted == false || im.IsDeleted == null)
                            select new
                            {
                                sl.ItemMasterId,
                                im.PartNumber,
                                im.PartDescription,
                                im.DER,
                                PMA = im.isPma,
                                NTEOverhaulHours = im.OverhaulHours == null ? 0 : im.OverhaulHours,
                                NTERepairHours = im.RPHours == null ? 0 : im.RPHours,
                                NTEMfgHours = im.mfgHours == null ? 0 : im.mfgHours,
                                NTEBenchTestHours = im.TestHours == null ? 0 : im.TestHours,
                                TurnTimeOverhaulHours = im.TurnTimeOverhaulHours == null ? 0 : im.TurnTimeOverhaulHours,
                                TurnTimeRepairHours = im.TurnTimeRepairHours == null ? 0 : im.TurnTimeRepairHours,
                                TurnTimeMfg = im.turnTimeMfg == null ? 0 : im.turnTimeMfg,
                                TurnTimeBenchTest = im.turnTimeBenchTest == null ? 0 : im.turnTimeBenchTest,
                                RevisedPartId = im.RevisedPartId == null ? 0 : im.RevisedPartId,
                                RevisedPartNo = im.RevisedPartId == null ? "" : (_appContext.ItemMaster.Where(p => p.ItemMasterId == im.RevisedPartId).Select(p => p.PartNumber).FirstOrDefault().ToString())
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
                            join ad in _appContext.AttachmentDetails on a.AttachmentId equals ad.AttachmentId into aad
                            from ad in aad.DefaultIfEmpty()
                            join p in _appContext.Publication on a.ReferenceId equals p.PublicationRecordId
                            join pim in _appContext.PublicationItemMasterMapping on p.PublicationRecordId equals pim.PublicationRecordId
                            where a.IsDeleted == false && ad.IsDeleted == false && a.ModuleId == Convert.ToInt32(ModuleEnum.Publication)
                            && pim.ItemMasterId == itemMasterId
                            select new
                            {
                                p.PublicationId,
                                p.PublicationRecordId,
                                FileName = ad == null ? "" : ad.FileName,
                                Link = ad == null ? "" : ad.Link,
                                CreatedDate = p.CreatedDate
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

        public object GetStockLineDetails(long stockLineId)
        {
            try
            {
                var serialNo = (from sl in _appContext.StockLine
                                join po in _appContext.PurchaseOrder on sl.PurchaseOrderId equals po.PurchaseOrderId into slpo
                                from po in slpo.DefaultIfEmpty()
                                where sl.StockLineId == stockLineId
                                select new
                                {
                                    sl.ControlNumber,
                                    ControlId = sl.IdNumber,
                                    PurchaseOrderNo = po == null ? "" : po.PurchaseOrderNumber,
                                    PurchaseOrderId = sl.PurchaseOrderId == null ? 0 : sl.PurchaseOrderId
                                }).FirstOrDefault();

                return serialNo;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetWorkOrderStageandStatus()
        {
            try
            {
                var data = (from ss in _appContext.WorkOrderStageAndStatus
                            join stage in _appContext.WorkOrderStage on ss.WOStageId equals stage.ID
                            join ws in _appContext.WorkOrderStatus on ss.WOStatusId equals ws.Id
                            where ss.IsActive == true && ss.IsDeleted == false
                            select new
                            {
                                WorkOrderStage = stage.Description,
                                WorkOrderStageId = stage.ID,
                                WorkOrderStaus = ws.Description,
                                WorkOrderStausId = ws.Id
                            }).Distinct().ToList();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetNTESTDValues(long itemMasterId, string workScope)
        {

            string nteType = string.Empty;
            string stdType = string.Empty;

            if (workScope.ToLower().Contains("overhaul"))
            {
                nteType = "Overhaul";
                stdType = "Overhaul";
            }
            else if (workScope.ToLower().Contains("repair"))
            {
                nteType = "Repair";
                stdType = "Repair";
            }
            else if (workScope.ToLower().Contains("bench"))
            {
                nteType = "Bench";
                stdType = "Bench";
            }
            else if (workScope.ToLower().Contains("mfg"))
            {
                nteType = "Mfg";
                stdType = "Mfg";
            }

            try
            {
                var list = (from im in _appContext.ItemMaster
                            where im.IsActive == true && (im.IsDeleted == false || im.IsDeleted == null)
                            select new
                            {

                                NTEHours =
                                (
                                    nteType == "Overhaul" ? (im.OverhaulHours == null ? 0 : im.OverhaulHours) :
                                    nteType == "Repair" ? (im.RPHours == null ? 0 : im.RPHours) :
                                    nteType == "Bench" ? (im.TestHours == null ? 0 : im.TestHours) :
                                    nteType == "Mfg" ? (im.mfgHours == null ? 0 : im.mfgHours) : 0
                                ),
                                STDHours =
                                (
                                    stdType == "Overhaul" ? (im.TurnTimeOverhaulHours == null ? 0 : im.TurnTimeOverhaulHours) :
                                    stdType == "Repair" ? (im.TurnTimeRepairHours == null ? 0 : im.TurnTimeRepairHours) :
                                    stdType == "Bench" ? (im.turnTimeBenchTest == null ? 0 : im.turnTimeBenchTest) :
                                    stdType == "Mfg" ? (im.turnTimeMfg == null ? 0 : im.turnTimeMfg) : 0
                                ),

                            }).FirstOrDefault();

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
                            WorkOrderLaborHeader workOrderLaborHeader = new WorkOrderLaborHeader();
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
                                if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                                {
                                    workFlow.Publication.ForEach(publ =>
                                    {
                                        publ.WorkflowPublicationDashNumbers = _appContext.WorkflowPublicationDashNumber.Where(x => x.PublicationsId == publ.Id).ToList();

                                    });
                                }


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
                                    workFlowWorkOrder.Charges.ForEach(p => p.IsFromWorkFlow = true);
                                }
                                if (workFlow.Equipments != null && workFlow.Equipments.Count > 0)
                                {
                                    workFlowWorkOrder.Equipments = BindWorkFlowWorkOrderAssets(workFlow.Equipments, workOrderId, createdBy, item.MasterCompanyId);
                                    workFlowWorkOrder.Equipments.ForEach(p => p.IsFromWorkFlow = true);
                                }
                                if (workFlow.Exclusions != null && workFlow.Exclusions.Count > 0)
                                {
                                    workFlowWorkOrder.Exclusions = BindWorkFlowWorkOrderExclusions(workFlow.Exclusions, workOrderId, createdBy, item.MasterCompanyId);
                                    workFlowWorkOrder.Exclusions.ForEach(p => p.IsFromWorkFlow = true);
                                }
                                if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                                {
                                    workFlowWorkOrder.Expertise = BindWorkFlowWorkOrderExpertise(workFlow.Expertise, workOrderId, createdBy, item.MasterCompanyId);
                                    workFlowWorkOrder.Expertise.ForEach(p => p.IsFromWorkFlow = true);
                                }
                                if (workFlow.MaterialList != null && workFlow.MaterialList.Count > 0)
                                {
                                    workFlowWorkOrder.MaterialList = BindWorkFlowWorkOrderMaterials(workFlow.MaterialList, workOrderId, createdBy, item.MasterCompanyId);
                                    workFlowWorkOrder.MaterialList.ForEach(p => p.IsFromWorkFlow = true);
                                }

                                if (workFlow.Directions != null && workFlow.Directions.Count > 0)
                                {
                                    workFlowWorkOrder.Directions = BindWorkFlowWorkOrderDirections(workFlow.Directions, workOrderId, createdBy, item.MasterCompanyId);
                                    workFlowWorkOrder.Directions.ForEach(p => p.IsFromWorkFlow = true);
                                }
                                if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                                {
                                    workFlowWorkOrder.Publication = BindWorkFlowWorkOrderPublications(workFlow.Publication, workOrderId, createdBy, item.MasterCompanyId);
                                    workFlowWorkOrder.Publication.ForEach(p => p.IsFromWorkFlow = true);
                                }
                                if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                                {
                                    workOrderLaborHeader = BindWorkFlowWorkOrderLabor(workFlow.Expertise, workOrderId, createdBy, item.MasterCompanyId);
                                }

                                workFlowWorkOrder.WorkOrderPartNoId = item.ID;

                                var existWorkFlow = _appContext.WorkOrderWorkFlow.Where(p => p.WorkOrderPartNoId == item.ID).AsNoTracking().FirstOrDefault();
                                if (existWorkFlow != null)
                                {
                                    workFlowWorkOrder.WorkFlowWorkOrderId = existWorkFlow.WorkFlowWorkOrderId;
                                    _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                                }

                                else
                                {
                                    _appContext.WorkOrderWorkFlow.Add(workFlowWorkOrder);
                                }

                                //_appContext.WorkOrderWorkFlow.Add(workFlowWorkOrder);
                                _appContext.SaveChanges();

                                workFlowWorkOrder.WorkFlowWorkOrderNo = "WOWF" + workFlowWorkOrder.WorkFlowWorkOrderId;
                                _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                                _appContext.SaveChanges();

                                workFlowWorkOrderId = workFlowWorkOrder.WorkFlowWorkOrderId;

                                if (workOrderLaborHeader != null && workOrderLaborHeader.LaborList != null && workOrderLaborHeader.LaborList.Count > 0)
                                {
                                    workOrderLaborHeader.LaborList.ForEach(p => p.IsFromWorkFlow = true);
                                    workOrderLaborHeader.WorkFlowWorkOrderId = workFlowWorkOrderId;
                                    _appContext.WorkOrderLaborHeader.Add(workOrderLaborHeader);
                                    _appContext.SaveChanges();

                                }


                            }



                            // }
                        }
                        else
                        {
                            WorkOrderWorkFlow workOrderWorkFlow = new WorkOrderWorkFlow();
                            workOrderWorkFlow.WorkOrderId = workOrderId;
                            workOrderWorkFlow.MasterCompanyId = 1;
                            workOrderWorkFlow.WorkflowId = 0;
                            workOrderWorkFlow.UpdatedBy = workOrderWorkFlow.CreatedBy = "admin";
                            workOrderWorkFlow.UpdatedDate = workOrderWorkFlow.CreatedDate = DateTime.Now;
                            workOrderWorkFlow.IsActive = true;
                            workOrderWorkFlow.IsDeleted = false;
                            workOrderWorkFlow.WorkOrderPartNoId = item.ID;


                            var existWorkFlow = _appContext.WorkOrderWorkFlow.Where(p => p.WorkOrderPartNoId == item.ID).AsNoTracking().FirstOrDefault();
                            if (existWorkFlow != null)
                            {
                                workOrderWorkFlow.WorkFlowWorkOrderId = existWorkFlow.WorkFlowWorkOrderId;


                                _appContext.WorkOrderWorkFlow.Update(workOrderWorkFlow);
                            }

                            else
                            {
                                _appContext.WorkOrderWorkFlow.Add(workOrderWorkFlow);
                            }

                            //_appContext.WorkOrderWorkFlow.Add(workOrderWorkFlow);
                            _appContext.SaveChanges();
                            workFlowWorkOrderId = workOrderWorkFlow.WorkFlowWorkOrderId;

                            workOrderWorkFlow.WorkFlowWorkOrderNo = "WOWF" + workOrderWorkFlow.WorkFlowWorkOrderId;
                            _appContext.WorkOrderWorkFlow.Update(workOrderWorkFlow);
                            _appContext.SaveChanges();
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

        private List<WorkOrderCharges> BindWorkFlowWorkOrderCharges(List<WorkflowChargesList> charges, long workOrderId, string createdBy, int? masterCompanyId)
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
                    workOrderCharge.ChargesTypeId = Convert.ToInt32(item.WorkflowChargeTypeId);
                    workOrderCharge.MarkupPercentageId = 1;
                    workOrderCharge.MasterCompanyId = Convert.ToInt32(masterCompanyId);
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

        private List<WorkOrderAssets> BindWorkFlowWorkOrderAssets(List<WorkflowEquipmentList> equipments, long workOrderId, string createdBy, int? masterCompanyId)
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
                    workOrderAsset.MasterCompanyId = Convert.ToInt32(masterCompanyId);
                    workOrderAsset.Quantity = item.Quantity;
                    workOrderAsset.WorkOrderId = workOrderId;
                    workOrderAsset.TaskId = item.TaskId;
                    workOrderAsset.CheckInOutStatus = 1;
                    WorkOrderAssetsList.Add(workOrderAsset);
                }

                return WorkOrderAssetsList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<WorkOrderExclusions> BindWorkFlowWorkOrderExclusions(List<WorkFlowExclusion> exclusions, long workOrderId, string createdBy, int? masterCompanyId)
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
                    workOrderExclusion.MasterCompanyId = Convert.ToInt32(masterCompanyId);
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

        private List<WorkOrderExpertise> BindWorkFlowWorkOrderExpertise(List<WorkflowExpertiseList> expertise, long workOrderId, string createdBy, int? masterCompanyId)
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
                    workOrderExpertise.MasterCompanyId = Convert.ToInt32(masterCompanyId);

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

        private List<WorkOrderMaterials> BindWorkFlowWorkOrderMaterials(List<WorkflowMaterial> materialList, long workOrderId, string createdBy, int? masterCompanyId)
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
                    workOrderMaterial.MasterCompanyId = Convert.ToInt32(masterCompanyId);
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

        private List<WorkOrderPublications> BindWorkFlowWorkOrderPublications(List<Publications> publicationList, long workOrderId, string createdBy, int? masterCompanyId)
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
                    workOrderPublication.MasterCompanyId = Convert.ToInt32(masterCompanyId);
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

        private List<WorkOrderDirections> BindWorkFlowWorkOrderDirections(List<WorkFlowDirection> directionList, long workOrderId, string createdBy, int? masterCompanyId)
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
                    workOrderDirection.MasterCompanyId = Convert.ToInt32(masterCompanyId);
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

        private WorkOrderLaborHeader BindWorkFlowWorkOrderLabor(List<WorkflowExpertiseList> expertise, long workOrderId, string createdBy, int? masterCompanyId)
        {
            try
            {
                WorkOrderLaborHeader workOrderLaborHeader = new WorkOrderLaborHeader();
                workOrderLaborHeader.LaborList = new List<WorkOrderLabor>();
                WorkOrderLabor workOrderLabor;

                foreach (var item in expertise)
                {
                    workOrderLabor = new WorkOrderLabor();
                    workOrderLaborHeader.UpdatedBy = workOrderLaborHeader.CreatedBy = createdBy;
                    workOrderLaborHeader.UpdatedDate = workOrderLaborHeader.CreatedDate = DateTime.Now;
                    workOrderLaborHeader.IsActive = true;
                    workOrderLaborHeader.IsDeleted = false;
                    workOrderLaborHeader.WorkOrderId = workOrderId;
                    workOrderLaborHeader.MasterCompanyId = Convert.ToInt32(masterCompanyId);

                    workOrderLabor.ExpertiseId = Convert.ToInt32(item.ExpertiseTypeId);
                    workOrderLabor.Hours = item.EstimatedHours;
                    workOrderLabor.TaskId = item.TaskId;

                    workOrderLaborHeader.LaborList.Add(workOrderLabor);
                }

                return workOrderLaborHeader;
            }
            catch (Exception)
            {

                throw;
            }
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


        /* Alternative Parts */
        private List<WOReservedIssuedAltParts> GetWOReservedIssuedAltParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedAltParts> woReservedIssuedAltParts = new List<WOReservedIssuedAltParts>();
            WOReservedIssuedAltParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join im1 in _appContext.ItemMaster on alt.ItemMasterId equals im1.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true && alt.MappingType == Convert.ToInt32(PartMappingTypeEnum.AltParts)
                        && (wom.PartStatusId == null || wom.PartStatusId == 0 || wom.Quantity - wom.QuantityReserved > 0 || wom.QuantityReserved - wom.QuantityReserved > 0)
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            ConditionId = sl == null ? 0 : sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedById = wom == null ? 0 : wom.IssuedById,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedById = wom == null ? 0 : wom.ReservedById,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                            PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                            ExtendedCost = wom == null ? 0 : wom.ExtendedCost,
                            Manufacturer = man.Name,
                            im.ManufacturerId,
                            OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                            ParentPartNo = im1.PartNumber
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
                    woReservedIssuedAltPart.IssuedById = item.IssuedById;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedById = item.ReservedById;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltPart.PartStatusId = item.PartStatusId;
                    woReservedIssuedAltPart.ExtendedCost = item.ExtendedCost;
                    woReservedIssuedAltPart.Manufacturer = item.Manufacturer;
                    woReservedIssuedAltPart.ManufacturerId = item.ManufacturerId;
                    woReservedIssuedAltPart.OemDer = item.OemDer;
                    woReservedIssuedAltPart.ParentPartNo = item.ParentPartNo;

                    woReservedIssuedAltParts.Add(woReservedIssuedAltPart);
                }
            }

            return woReservedIssuedAltParts;
        }

        private List<WOReservedIssuedAltParts> GetWOReservedAltParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedAltParts> woReservedIssuedAltParts = new List<WOReservedIssuedAltParts>();
            WOReservedIssuedAltParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join im1 in _appContext.ItemMaster on alt.ItemMasterId equals im1.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true && alt.MappingType == Convert.ToInt32(PartMappingTypeEnum.AltParts)
                        && (wom.PartStatusId == null || wom.PartStatusId == 0 || wom.Quantity - wom.QuantityReserved > 0)
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            ConditionId = sl == null ? 0 : sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            //QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityReserved = wom.Quantity - wom.QuantityReserved,
                            QuantityAlreadyReserved = wom == null ? 0 : wom.QuantityReserved,
                            UnReservedQty = wom == null ? 0 : wom.UnReservedQty,
                            UnIssuedQty = wom == null ? 0 : wom.UnIssuedQty,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedById = wom == null ? 0 : wom.IssuedById,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedById = wom == null ? 0 : wom.ReservedById,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                            PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                            ExtendedCost = wom == null ? 0 : wom.ExtendedCost,
                            Manufacturer = man.Name,
                            im.ManufacturerId,
                            OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                            ParentPartNo = im1.PartNumber
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
                    woReservedIssuedAltPart.IssuedById = item.IssuedById;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedById = item.ReservedById;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltPart.PartStatusId = item.PartStatusId;
                    woReservedIssuedAltPart.ExtendedCost = item.ExtendedCost;
                    woReservedIssuedAltPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                    woReservedIssuedAltPart.UnIssuedQty = item.UnIssuedQty;
                    woReservedIssuedAltPart.UnReservedQty = item.UnReservedQty;
                    woReservedIssuedAltPart.Manufacturer = item.Manufacturer;
                    woReservedIssuedAltPart.ManufacturerId = item.ManufacturerId;
                    woReservedIssuedAltPart.OemDer = item.OemDer;
                    woReservedIssuedAltPart.ParentPartNo = item.ParentPartNo;

                    woReservedIssuedAltParts.Add(woReservedIssuedAltPart);
                }
            }

            return woReservedIssuedAltParts;
        }

        private List<WOReservedIssuedAltParts> GetWOUnReservedAltParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedAltParts> woReservedIssuedAltParts = new List<WOReservedIssuedAltParts>();
            WOReservedIssuedAltParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join im1 in _appContext.ItemMaster on alt.ItemMasterId equals im1.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true && alt.MappingType == Convert.ToInt32(PartMappingTypeEnum.AltParts)
                        && wom.QuantityReserved - wom.QuantityIssued > 0
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            ConditionId = sl == null ? 0 : sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            //QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityReserved = wom.Quantity - wom.QuantityReserved,
                            QuantityAlreadyReserved = wom == null ? 0 : wom.QuantityReserved,
                            UnReservedQty = wom == null ? 0 : wom.UnReservedQty,
                            UnIssuedQty = wom == null ? 0 : wom.UnIssuedQty,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedById = wom == null ? 0 : wom.IssuedById,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedById = wom == null ? 0 : wom.ReservedById,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                            PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                            ExtendedCost = wom == null ? 0 : wom.ExtendedCost,
                            Manufacturer = man.Name,
                            im.ManufacturerId,
                            OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                            ParentPartNo = im1.PartNumber
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
                    woReservedIssuedAltPart.IssuedById = item.IssuedById;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedById = item.ReservedById;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltPart.PartStatusId = item.PartStatusId;
                    woReservedIssuedAltPart.ExtendedCost = item.ExtendedCost;
                    woReservedIssuedAltPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                    woReservedIssuedAltPart.UnIssuedQty = item.UnIssuedQty;
                    woReservedIssuedAltPart.UnReservedQty = item.UnReservedQty;
                    woReservedIssuedAltPart.Manufacturer = item.Manufacturer;
                    woReservedIssuedAltPart.ManufacturerId = item.ManufacturerId;
                    woReservedIssuedAltPart.OemDer = item.OemDer;
                    woReservedIssuedAltPart.ParentPartNo = item.ParentPartNo;

                    woReservedIssuedAltParts.Add(woReservedIssuedAltPart);
                }
            }

            return woReservedIssuedAltParts;
        }

        private List<WOReservedIssuedAltParts> GetWOIssuedAltParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedAltParts> woReservedIssuedAltParts = new List<WOReservedIssuedAltParts>();
            WOReservedIssuedAltParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join im1 in _appContext.ItemMaster on alt.ItemMasterId equals im1.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true && alt.MappingType == Convert.ToInt32(PartMappingTypeEnum.AltParts)
                        && wom.QuantityReserved - wom.QuantityReserved > 0
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            ConditionId = sl == null ? 0 : sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            //QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityReserved = wom.Quantity - wom.QuantityReserved,
                            QuantityAlreadyReserved = wom == null ? 0 : wom.QuantityReserved,
                            UnReservedQty = wom == null ? 0 : wom.UnReservedQty,
                            UnIssuedQty = wom == null ? 0 : wom.UnIssuedQty,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedById = wom == null ? 0 : wom.IssuedById,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedById = wom == null ? 0 : wom.ReservedById,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                            PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                            ExtendedCost = wom == null ? 0 : wom.ExtendedCost,
                            Manufacturer = man.Name,
                            im.ManufacturerId,
                            OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                            ParentPartNo = im1.PartNumber
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
                    woReservedIssuedAltPart.IssuedById = item.IssuedById;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedById = item.ReservedById;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltPart.PartStatusId = item.PartStatusId;
                    woReservedIssuedAltPart.ExtendedCost = item.ExtendedCost;
                    woReservedIssuedAltPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                    woReservedIssuedAltPart.UnIssuedQty = item.UnIssuedQty;
                    woReservedIssuedAltPart.UnReservedQty = item.UnReservedQty;
                    woReservedIssuedAltPart.Manufacturer = item.Manufacturer;
                    woReservedIssuedAltPart.ManufacturerId = item.ManufacturerId;
                    woReservedIssuedAltPart.OemDer = item.OemDer;
                    woReservedIssuedAltPart.ParentPartNo = item.ParentPartNo;

                    woReservedIssuedAltParts.Add(woReservedIssuedAltPart);
                }
            }

            return woReservedIssuedAltParts;
        }

        private List<WOReservedIssuedAltParts> GetWOUnIssuedAltParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedAltParts> woReservedIssuedAltParts = new List<WOReservedIssuedAltParts>();
            WOReservedIssuedAltParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join im1 in _appContext.ItemMaster on alt.ItemMasterId equals im1.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true && alt.MappingType == Convert.ToInt32(PartMappingTypeEnum.AltParts)
                        && wom.QuantityIssued > 0
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            ConditionId = sl == null ? 0 : sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            //QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityReserved = wom.Quantity - wom.QuantityReserved,
                            QuantityAlreadyReserved = wom == null ? 0 : wom.QuantityReserved,
                            UnReservedQty = wom == null ? 0 : wom.UnReservedQty,
                            UnIssuedQty = wom == null ? 0 : wom.UnIssuedQty,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedById = wom == null ? 0 : wom.IssuedById,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedById = wom == null ? 0 : wom.ReservedById,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                            PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                            ExtendedCost = wom == null ? 0 : wom.ExtendedCost,
                            Manufacturer = man.Name,
                            im.ManufacturerId,
                            OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                            ParentPartNo = im1.PartNumber
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
                    woReservedIssuedAltPart.IssuedById = item.IssuedById;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedById = item.ReservedById;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltPart.PartStatusId = item.PartStatusId;
                    woReservedIssuedAltPart.ExtendedCost = item.ExtendedCost;
                    woReservedIssuedAltPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                    woReservedIssuedAltPart.UnIssuedQty = item.UnIssuedQty;
                    woReservedIssuedAltPart.UnReservedQty = item.UnReservedQty;
                    woReservedIssuedAltPart.Manufacturer = item.Manufacturer;
                    woReservedIssuedAltPart.ManufacturerId = item.ManufacturerId;
                    woReservedIssuedAltPart.OemDer = item.OemDer;
                    woReservedIssuedAltPart.ParentPartNo = item.ParentPartNo;

                    woReservedIssuedAltParts.Add(woReservedIssuedAltPart);
                }
            }

            return woReservedIssuedAltParts;
        }


        /* Equivalent Parts */
        private List<WOReservedIssuedEquParts> GetWOReservedIssuedEquParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedEquParts> woReservedIssuedAltParts = new List<WOReservedIssuedEquParts>();
            WOReservedIssuedEquParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join im1 in _appContext.ItemMaster on alt.ItemMasterId equals im1.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true && alt.MappingType == Convert.ToInt32(PartMappingTypeEnum.EquParts)
                        && (wom.PartStatusId == null || wom.PartStatusId == 0 || wom.Quantity - wom.QuantityReserved > 0 || wom.QuantityReserved - wom.QuantityReserved > 0)
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            ConditionId = sl == null ? 0 : sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedById = wom == null ? 0 : wom.IssuedById,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedById = wom == null ? 0 : wom.ReservedById,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                            PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                            ExtendedCost = wom == null ? 0 : wom.ExtendedCost,
                            Manufacturer = man.Name,
                            im.ManufacturerId,
                            OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                            ParentPartNo = im1.PartNumber
                        })
                         .Distinct()
                         .ToList();
            if (list != null && list.Count > 0)
            {
                foreach (var item in list)
                {
                    woReservedIssuedAltPart = new WOReservedIssuedEquParts();
                    woReservedIssuedAltPart.EquPartDescription = item.PartDescription;
                    woReservedIssuedAltPart.EquPartId = item.MappingItemMasterId;
                    woReservedIssuedAltPart.EquPartNumber = item.PartNumber;
                    woReservedIssuedAltPart.EquPartMasterPartId = item.ItemMasterId;
                    woReservedIssuedAltPart.QuantityAvailable = item.QuantityAvailable;
                    woReservedIssuedAltPart.QuantityOnHand = item.QuantityOnHand;
                    woReservedIssuedAltPart.QuantityOnOrder = item.QuantityOnOrder;
                    woReservedIssuedAltPart.ConditionId = item.ConditionId;
                    woReservedIssuedAltPart.Condition = item.Condition;
                    woReservedIssuedAltPart.IsEquPart = true;
                    woReservedIssuedAltPart.Quantity = item.Quantity;
                    woReservedIssuedAltPart.QuantityIssued = item.QuantityIssued;
                    woReservedIssuedAltPart.QuantityReserved = item.QuantityReserved;
                    woReservedIssuedAltPart.QuantityTurnIn = item.QuantityTurnIn;
                    woReservedIssuedAltPart.WorkFlowWorkOrderId = wokorderWorkFlowId;
                    woReservedIssuedAltPart.WorkOrderId = workOrderId;
                    woReservedIssuedAltPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                    woReservedIssuedAltPart.IssuedById = item.IssuedById;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedById = item.ReservedById;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltPart.PartStatusId = item.PartStatusId;
                    woReservedIssuedAltPart.ExtendedCost = item.ExtendedCost;
                    woReservedIssuedAltPart.Manufacturer = item.Manufacturer;
                    woReservedIssuedAltPart.ManufacturerId = item.ManufacturerId;
                    woReservedIssuedAltPart.OemDer = item.OemDer;
                    woReservedIssuedAltPart.ParentPartNo = item.ParentPartNo;

                    woReservedIssuedAltParts.Add(woReservedIssuedAltPart);
                }
            }

            return woReservedIssuedAltParts;
        }
        private List<WOReservedIssuedEquParts> GetWOReservedEquParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedEquParts> woReservedIssuedAltParts = new List<WOReservedIssuedEquParts>();
            WOReservedIssuedEquParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join im1 in _appContext.ItemMaster on alt.ItemMasterId equals im1.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true && alt.MappingType == Convert.ToInt32(PartMappingTypeEnum.EquParts)
                        && (wom.PartStatusId == null || wom.PartStatusId == 0 || wom.Quantity - wom.QuantityReserved > 0)
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            ConditionId = sl == null ? 0 : sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            //QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityReserved = wom.Quantity - wom.QuantityReserved,
                            QuantityAlreadyReserved = wom == null ? 0 : wom.QuantityReserved,
                            UnReservedQty = wom == null ? 0 : wom.UnReservedQty,
                            UnIssuedQty = wom == null ? 0 : wom.UnIssuedQty,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedById = wom == null ? 0 : wom.IssuedById,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedById = wom == null ? 0 : wom.ReservedById,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                            PartStatusId = wom == null ? 0 : wom.PartStatusId,
                            ExtendedCost = wom == null ? 0 : wom.ExtendedCost,
                            Manufacturer = man.Name,
                            im.ManufacturerId,
                            OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                            ParentPartNo = im1.PartNumber
                        })
                         .Distinct()
                         .ToList();

            if (list != null && list.Count > 0)
            {
                foreach (var item in list)
                {
                    woReservedIssuedAltPart = new WOReservedIssuedEquParts();
                    woReservedIssuedAltPart.EquPartDescription = item.PartDescription;
                    woReservedIssuedAltPart.EquPartId = item.MappingItemMasterId;
                    woReservedIssuedAltPart.EquPartNumber = item.PartNumber;
                    woReservedIssuedAltPart.EquPartMasterPartId = item.ItemMasterId;
                    woReservedIssuedAltPart.QuantityAvailable = item.QuantityAvailable;
                    woReservedIssuedAltPart.QuantityOnHand = item.QuantityOnHand;
                    woReservedIssuedAltPart.QuantityOnOrder = item.QuantityOnOrder;
                    woReservedIssuedAltPart.ConditionId = item.ConditionId;
                    woReservedIssuedAltPart.Condition = item.Condition;
                    woReservedIssuedAltPart.IsEquPart = true;
                    woReservedIssuedAltPart.Quantity = item.Quantity;
                    woReservedIssuedAltPart.QuantityIssued = item.QuantityIssued;
                    woReservedIssuedAltPart.QuantityReserved = item.QuantityReserved;
                    woReservedIssuedAltPart.QuantityTurnIn = item.QuantityTurnIn;
                    woReservedIssuedAltPart.WorkFlowWorkOrderId = wokorderWorkFlowId;
                    woReservedIssuedAltPart.WorkOrderId = workOrderId;
                    woReservedIssuedAltPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                    woReservedIssuedAltPart.IssuedById = item.IssuedById;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedById = item.ReservedById;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltPart.PartStatusId = item.PartStatusId;
                    woReservedIssuedAltPart.ExtendedCost = item.ExtendedCost;
                    woReservedIssuedAltPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                    woReservedIssuedAltPart.UnIssuedQty = item.UnIssuedQty;
                    woReservedIssuedAltPart.UnReservedQty = item.UnReservedQty;
                    woReservedIssuedAltPart.Manufacturer = item.Manufacturer;
                    woReservedIssuedAltPart.ManufacturerId = item.ManufacturerId;
                    woReservedIssuedAltPart.OemDer = item.OemDer;
                    woReservedIssuedAltPart.ParentPartNo = item.ParentPartNo;

                    woReservedIssuedAltParts.Add(woReservedIssuedAltPart);
                }
            }

            return woReservedIssuedAltParts;
        }
        private List<WOReservedIssuedEquParts> GetWOUnReservedEquParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedEquParts> woReservedIssuedAltParts = new List<WOReservedIssuedEquParts>();
            WOReservedIssuedEquParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join im1 in _appContext.ItemMaster on alt.ItemMasterId equals im1.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true && alt.MappingType == Convert.ToInt32(PartMappingTypeEnum.EquParts)
                        && wom.QuantityReserved - wom.QuantityIssued > 0
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            ConditionId = sl == null ? 0 : sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            //QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityReserved = wom.Quantity - wom.QuantityReserved,
                            QuantityAlreadyReserved = wom == null ? 0 : wom.QuantityReserved,
                            UnReservedQty = wom == null ? 0 : wom.UnReservedQty,
                            UnIssuedQty = wom == null ? 0 : wom.UnIssuedQty,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedById = wom == null ? 0 : wom.IssuedById,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedById = wom == null ? 0 : wom.ReservedById,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                            PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                            ExtendedCost = wom == null ? 0 : wom.ExtendedCost,
                            Manufacturer = man.Name,
                            im.ManufacturerId,
                            OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                            ParentPartNo = im1.PartNumber
                        })
                         .Distinct()
                         .ToList();

            if (list != null && list.Count > 0)
            {
                foreach (var item in list)
                {
                    woReservedIssuedAltPart = new WOReservedIssuedEquParts();
                    woReservedIssuedAltPart.EquPartDescription = item.PartDescription;
                    woReservedIssuedAltPart.EquPartId = item.MappingItemMasterId;
                    woReservedIssuedAltPart.EquPartNumber = item.PartNumber;
                    woReservedIssuedAltPart.EquPartMasterPartId = item.ItemMasterId;
                    woReservedIssuedAltPart.QuantityAvailable = item.QuantityAvailable;
                    woReservedIssuedAltPart.QuantityOnHand = item.QuantityOnHand;
                    woReservedIssuedAltPart.QuantityOnOrder = item.QuantityOnOrder;
                    woReservedIssuedAltPart.ConditionId = item.ConditionId;
                    woReservedIssuedAltPart.Condition = item.Condition;
                    woReservedIssuedAltPart.IsEquPart = true;
                    woReservedIssuedAltPart.Quantity = item.Quantity;
                    woReservedIssuedAltPart.QuantityIssued = item.QuantityIssued;
                    woReservedIssuedAltPart.QuantityReserved = item.QuantityReserved;
                    woReservedIssuedAltPart.QuantityTurnIn = item.QuantityTurnIn;
                    woReservedIssuedAltPart.WorkFlowWorkOrderId = wokorderWorkFlowId;
                    woReservedIssuedAltPart.WorkOrderId = workOrderId;
                    woReservedIssuedAltPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                    woReservedIssuedAltPart.IssuedById = item.IssuedById;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedById = item.ReservedById;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltPart.PartStatusId = item.PartStatusId;
                    woReservedIssuedAltPart.ExtendedCost = item.ExtendedCost;
                    woReservedIssuedAltPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                    woReservedIssuedAltPart.UnIssuedQty = item.UnIssuedQty;
                    woReservedIssuedAltPart.UnReservedQty = item.UnReservedQty;
                    woReservedIssuedAltPart.Manufacturer = item.Manufacturer;
                    woReservedIssuedAltPart.ManufacturerId = item.ManufacturerId;
                    woReservedIssuedAltPart.OemDer = item.OemDer;
                    woReservedIssuedAltPart.ParentPartNo = item.ParentPartNo;

                    woReservedIssuedAltParts.Add(woReservedIssuedAltPart);
                }
            }

            return woReservedIssuedAltParts;
        }
        private List<WOReservedIssuedEquParts> GetWOIssuedEquParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedEquParts> woReservedIssuedAltParts = new List<WOReservedIssuedEquParts>();
            WOReservedIssuedEquParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join im1 in _appContext.ItemMaster on alt.ItemMasterId equals im1.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true && alt.MappingType == Convert.ToInt32(PartMappingTypeEnum.EquParts)
                        && wom.QuantityReserved - wom.QuantityReserved > 0
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            ConditionId = sl == null ? 0 : sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            //QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityReserved = wom.Quantity - wom.QuantityReserved,
                            QuantityAlreadyReserved = wom == null ? 0 : wom.QuantityReserved,
                            UnReservedQty = wom == null ? 0 : wom.UnReservedQty,
                            UnIssuedQty = wom == null ? 0 : wom.UnIssuedQty,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedById = wom == null ? 0 : wom.IssuedById,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedById = wom == null ? 0 : wom.ReservedById,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                            PartStatusId = wom == null ? 0 : wom.PartStatusId,
                            ExtendedCost = wom == null ? 0 : wom.ExtendedCost,
                            Manufacturer = man.Name,
                            im.ManufacturerId,
                            OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                            ParentPartNo = im1.PartNumber
                        })
                         .Distinct()
                         .ToList();

            if (list != null && list.Count > 0)
            {
                foreach (var item in list)
                {
                    woReservedIssuedAltPart = new WOReservedIssuedEquParts();
                    woReservedIssuedAltPart.EquPartDescription = item.PartDescription;
                    woReservedIssuedAltPart.EquPartId = item.MappingItemMasterId;
                    woReservedIssuedAltPart.EquPartNumber = item.PartNumber;
                    woReservedIssuedAltPart.EquPartMasterPartId = item.ItemMasterId;
                    woReservedIssuedAltPart.QuantityAvailable = item.QuantityAvailable;
                    woReservedIssuedAltPart.QuantityOnHand = item.QuantityOnHand;
                    woReservedIssuedAltPart.QuantityOnOrder = item.QuantityOnOrder;
                    woReservedIssuedAltPart.ConditionId = item.ConditionId;
                    woReservedIssuedAltPart.Condition = item.Condition;
                    woReservedIssuedAltPart.IsEquPart = true;
                    woReservedIssuedAltPart.Quantity = item.Quantity;
                    woReservedIssuedAltPart.QuantityIssued = item.QuantityIssued;
                    woReservedIssuedAltPart.QuantityReserved = item.QuantityReserved;
                    woReservedIssuedAltPart.QuantityTurnIn = item.QuantityTurnIn;
                    woReservedIssuedAltPart.WorkFlowWorkOrderId = wokorderWorkFlowId;
                    woReservedIssuedAltPart.WorkOrderId = workOrderId;
                    woReservedIssuedAltPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                    woReservedIssuedAltPart.IssuedById = item.IssuedById;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedById = item.ReservedById;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltPart.PartStatusId = item.PartStatusId;
                    woReservedIssuedAltPart.ExtendedCost = item.ExtendedCost;
                    woReservedIssuedAltPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                    woReservedIssuedAltPart.UnIssuedQty = item.UnIssuedQty;
                    woReservedIssuedAltPart.UnReservedQty = item.UnReservedQty;
                    woReservedIssuedAltPart.Manufacturer = item.Manufacturer;
                    woReservedIssuedAltPart.ManufacturerId = item.ManufacturerId;
                    woReservedIssuedAltPart.OemDer = item.OemDer;
                    woReservedIssuedAltPart.ParentPartNo = item.ParentPartNo;

                    woReservedIssuedAltParts.Add(woReservedIssuedAltPart);
                }
            }

            return woReservedIssuedAltParts;
        }
        private List<WOReservedIssuedEquParts> GetWOUnIssuedEquParts(long? itemMasterId, long wokorderWorkFlowId, long workOrderId, long taskId)
        {
            List<WOReservedIssuedEquParts> woReservedIssuedAltParts = new List<WOReservedIssuedEquParts>();
            WOReservedIssuedEquParts woReservedIssuedAltPart;

            var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                        join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                        join im1 in _appContext.ItemMaster on alt.ItemMasterId equals im1.ItemMasterId
                        join sl in _appContext.StockLine on alt.MappingItemMasterId equals sl.ItemMasterId into altsl
                        from sl in altsl.DefaultIfEmpty()
                        join con in _appContext.Condition on sl.ConditionId equals con.ConditionId into slcon
                        from con in slcon.DefaultIfEmpty()
                        join wom in _appContext.WorkOrderMaterials on im.ItemMasterId equals wom.ItemMasterId into imwom
                        from wom in imwom.DefaultIfEmpty()
                        join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                        where alt.ItemMasterId == itemMasterId && alt.IsDeleted == false && alt.IsActive == true && alt.MappingType == Convert.ToInt32(PartMappingTypeEnum.EquParts)
                        && wom.QuantityIssued > 0
                        select new
                        {
                            alt.MappingItemMasterId,
                            im.PartNumber,
                            im.PartDescription,
                            alt.ItemMasterId,
                            ConditionId = sl == null ? 0 : sl.ConditionId,
                            Condition = con.Description,
                            QuantityOnHand = sl == null ? 0 : sl.QuantityOnHand,
                            QuantityAvailable = sl == null ? 0 : sl.QuantityAvailable,
                            QuantityOnOrder = sl == null ? 0 : sl.QuantityOnOrder,
                            StockLineId = sl == null ? 0 : sl.StockLineId,
                            Quantity = wom == null ? 0 : wom.Quantity,
                            QuantityIssued = wom == null ? 0 : wom.QuantityIssued,
                            //QuantityReserved = wom == null ? 0 : wom.QuantityReserved,
                            QuantityReserved = wom.Quantity - wom.QuantityReserved,
                            QuantityAlreadyReserved = wom == null ? 0 : wom.QuantityReserved,
                            UnReservedQty = wom == null ? 0 : wom.UnReservedQty,
                            UnIssuedQty = wom == null ? 0 : wom.UnIssuedQty,
                            QuantityTurnIn = wom == null ? 0 : wom.QuantityTurnIn,
                            IssuedById = wom == null ? 0 : wom.IssuedById,
                            IssuedDate = wom == null ? DateTime.Now : wom.IssuedDate,
                            ReservedById = wom == null ? 0 : wom.ReservedById,
                            ReservedDate = wom == null ? DateTime.Now : wom.ReservedDate,
                            WorkOrderMaterialsId = wom == null ? 0 : wom.WorkOrderMaterialsId,
                            im.PurchaseUnitOfMeasureId,
                            im.ItemClassificationId,
                            PartStatusId = wom.PartStatusId == null ? 0 : wom.PartStatusId,
                            ExtendedCost = wom == null ? 0 : wom.ExtendedCost,
                            Manufacturer = man.Name,
                            im.ManufacturerId,
                            OemDer = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                            ParentPartNo = im1.PartNumber
                        })
                         .Distinct()
                         .ToList();

            if (list != null && list.Count > 0)
            {
                foreach (var item in list)
                {
                    woReservedIssuedAltPart = new WOReservedIssuedEquParts();
                    woReservedIssuedAltPart.EquPartDescription = item.PartDescription;
                    woReservedIssuedAltPart.EquPartId = item.MappingItemMasterId;
                    woReservedIssuedAltPart.EquPartNumber = item.PartNumber;
                    woReservedIssuedAltPart.EquPartMasterPartId = item.ItemMasterId;
                    woReservedIssuedAltPart.QuantityAvailable = item.QuantityAvailable;
                    woReservedIssuedAltPart.QuantityOnHand = item.QuantityOnHand;
                    woReservedIssuedAltPart.QuantityOnOrder = item.QuantityOnOrder;
                    woReservedIssuedAltPart.ConditionId = item.ConditionId;
                    woReservedIssuedAltPart.Condition = item.Condition;
                    woReservedIssuedAltPart.IsEquPart = true;
                    woReservedIssuedAltPart.Quantity = item.Quantity;
                    woReservedIssuedAltPart.QuantityIssued = item.QuantityIssued;
                    woReservedIssuedAltPart.QuantityReserved = item.QuantityReserved;
                    woReservedIssuedAltPart.QuantityTurnIn = item.QuantityTurnIn;
                    woReservedIssuedAltPart.WorkFlowWorkOrderId = wokorderWorkFlowId;
                    woReservedIssuedAltPart.WorkOrderId = workOrderId;
                    woReservedIssuedAltPart.WorkOrderMaterialsId = item.WorkOrderMaterialsId;
                    woReservedIssuedAltPart.IssuedById = item.IssuedById;
                    woReservedIssuedAltPart.IssuedDate = item.IssuedDate;
                    woReservedIssuedAltPart.ReservedById = item.ReservedById;
                    woReservedIssuedAltPart.ReservedDate = item.ReservedDate;
                    woReservedIssuedAltPart.TaskId = taskId;
                    woReservedIssuedAltPart.UnitOfMeasureId = item.PurchaseUnitOfMeasureId;
                    woReservedIssuedAltPart.ItemClassificationId = item.ItemClassificationId;
                    woReservedIssuedAltPart.ItemMasterId = itemMasterId;
                    woReservedIssuedAltPart.PartStatusId = item.PartStatusId;
                    woReservedIssuedAltPart.ExtendedCost = item.ExtendedCost;
                    woReservedIssuedAltPart.QuantityAlreadyReserved = item.QuantityAlreadyReserved;
                    woReservedIssuedAltPart.UnIssuedQty = item.UnIssuedQty;
                    woReservedIssuedAltPart.UnReservedQty = item.UnReservedQty;
                    woReservedIssuedAltPart.Manufacturer = item.Manufacturer;
                    woReservedIssuedAltPart.ManufacturerId = item.ManufacturerId;
                    woReservedIssuedAltPart.OemDer = item.OemDer;
                    woReservedIssuedAltPart.ParentPartNo = item.ParentPartNo;

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

                if (Convert.ToInt32(PartStatusEnum.Reserve) == part.PartStatusId)
                {
                    if (part.QuantityAlreadyReserved == null)
                        part.QuantityAlreadyReserved = 0;
                    woMaterial.UnReservedQty = woMaterial.QuantityReserved = part.QuantityReserved + part.QuantityAlreadyReserved;
                }
                else if (Convert.ToInt32(PartStatusEnum.UnReserve) == part.PartStatusId)
                {
                    //if (woMaterial.UnReservedQty == null)
                    //    woMaterial.UnReservedQty = 0;
                    woMaterial.UnReservedQty = woMaterial.QuantityReserved = woMaterial.UnReservedQty - part.QuantityReserved;
                }
                else if (Convert.ToInt32(PartStatusEnum.Issue) == part.PartStatusId)
                {
                    if (woMaterial.UnIssuedQty == null)
                        woMaterial.UnIssuedQty = 0;
                    if (woMaterial.UnReservedQty == null)
                        woMaterial.UnReservedQty = 0;
                    woMaterial.QuantityIssued = woMaterial.UnIssuedQty = woMaterial.UnIssuedQty + part.QuantityIssued;
                    woMaterial.QuantityReserved = woMaterial.UnReservedQty = woMaterial.UnReservedQty - part.QuantityIssued;
                }
                else if (Convert.ToInt32(PartStatusEnum.UnIssue) == part.PartStatusId)
                {
                    woMaterial.QuantityIssued = woMaterial.UnIssuedQty = woMaterial.UnIssuedQty - part.QuantityIssued;
                    woMaterial.QuantityReserved = woMaterial.UnReservedQty = woMaterial.UnReservedQty + part.QuantityIssued;
                }
                else if (Convert.ToInt32(PartStatusEnum.ReserveAndIssue) == part.PartStatusId)
                {
                    woMaterial.QuantityIssued = woMaterial.UnIssuedQty = woMaterial.UnIssuedQty + part.QuantityIssued;
                }

                if (woMaterial.QuantityIssued == null)
                    woMaterial.QuantityIssued = 0;
                if (woMaterial.QuantityReserved == null)
                    woMaterial.QuantityReserved = 0;
                if (woMaterial.UnReservedQty == null)
                    woMaterial.UnReservedQty = 0;
                if (woMaterial.UnIssuedQty == null)
                    woMaterial.UnIssuedQty = 0;

                woMaterial.QuantityTurnIn = part.QuantityTurnIn;
                woMaterial.ReservedById = part.ReservedById;
                woMaterial.ReservedDate = part.ReservedDate;
                woMaterial.IssuedById = part.ReservedById;
                woMaterial.IssuedDate = part.IssuedDate;
                woMaterial.UpdatedDate = DateTime.Now;
                woMaterial.PartStatusId = part.PartStatusId;

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
                workOrderMaterial.IssuedById = part.IssuedById;
                workOrderMaterial.IssuedDate = part.IssuedDate;
                workOrderMaterial.ItemClassificationId = Convert.ToInt64(part.ItemClassificationId);
                workOrderMaterial.ItemMasterId = part.ItemMasterId;
                workOrderMaterial.MasterCompanyId = part.MasterCompanyId;
                workOrderMaterial.Quantity = part.Quantity;
                workOrderMaterial.QuantityIssued = part.QuantityIssued;
                workOrderMaterial.QuantityReserved = part.QuantityReserved;
                workOrderMaterial.UnReservedQty = part.QuantityReserved;
                workOrderMaterial.QuantityTurnIn = part.QuantityTurnIn;
                workOrderMaterial.ReservedById = part.ReservedById;
                workOrderMaterial.ReservedDate = part.ReservedDate;
                workOrderMaterial.TaskId = Convert.ToInt64(part.TaskId);
                workOrderMaterial.UnitOfMeasureId = Convert.ToInt64(part.UnitOfMeasureId);
                workOrderMaterial.UpdatedBy = part.UpdatedBy;
                workOrderMaterial.UpdatedDate = DateTime.Now;
                workOrderMaterial.WorkFlowWorkOrderId = part.WorkFlowWorkOrderId;
                workOrderMaterial.WorkOrderId = part.WorkOrderId;
                workOrderMaterial.PartStatusId = part.PartStatusId;

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

                if (Convert.ToInt32(PartStatusEnum.Reserve) == part.PartStatusId || Convert.ToInt32(PartStatusEnum.ReserveAndIssue) == part.PartStatusId)
                {
                    woStockLine.QuantityAvailable = woStockLine.QuantityAvailable == null ? 0 : woStockLine.QuantityAvailable - part.QuantityReserved;
                }
                if (Convert.ToInt32(PartStatusEnum.UnReserve) == part.PartStatusId)
                {
                    woStockLine.QuantityAvailable = woStockLine.QuantityAvailable == null ? 0 : woStockLine.QuantityAvailable + part.QuantityReserved;
                }

                if (Convert.ToInt32(PartStatusEnum.Reserve) == part.PartStatusId)
                {
                    woStockLine.QuantityReserved = woStockLine.QuantityReserved + part.QuantityReserved;
                }
                else if (Convert.ToInt32(PartStatusEnum.UnReserve) == part.PartStatusId)
                {
                    woStockLine.QuantityReserved = woStockLine.QuantityReserved - part.QuantityReserved;
                }
                else if (Convert.ToInt32(PartStatusEnum.Issue) == part.PartStatusId)
                {
                    woStockLine.QuantityIssued = woStockLine.QuantityIssued + part.QuantityIssued;
                    woStockLine.QuantityReserved = woStockLine.QuantityReserved - part.QuantityIssued;
                }
                else if (Convert.ToInt32(PartStatusEnum.UnIssue) == part.PartStatusId)
                {
                    woStockLine.QuantityIssued = woStockLine.QuantityIssued - part.QuantityIssued;
                    woStockLine.QuantityReserved = woStockLine.QuantityReserved + part.QuantityIssued;
                }
                else if (Convert.ToInt32(PartStatusEnum.ReserveAndIssue) == part.PartStatusId)
                {
                    woStockLine.QuantityIssued = woStockLine.QuantityIssued + part.QuantityIssued;
                }

                if (woStockLine.QuantityIssued == null)
                    woStockLine.QuantityIssued = 0;
                if (woStockLine.QuantityReserved == null)
                    woStockLine.QuantityReserved = 0;
                if (woStockLine.QuantityAvailable == null)
                    woStockLine.QuantityAvailable = 0;

                woStockLine.QuantityOnOrder = part.QuantityOnOrder;
                woStockLine.StockLineId = part.StockLineId;
                woStockLine.UpdatedDate = DateTime.Now;
                woStockLine.UpdatedBy = part.UpdatedBy;
                woStockLine.WorkOrderMaterialsId = part.WorkOrderMaterialsId;
                _appContext.StockLine.Update(woStockLine);
            }
            else
            {
                StockLine stockLine = new StockLine();
                stockLine.QuantityOnHand = part.QuantityOnHand;
                if (Convert.ToInt32(PartStatusEnum.Reserve) == part.PartStatusId || Convert.ToInt32(PartStatusEnum.ReserveAndIssue) == part.PartStatusId)
                {
                    stockLine.QuantityAvailable = stockLine.QuantityAvailable == null ? 0 : stockLine.QuantityAvailable - part.QuantityReserved;

                }
                if (Convert.ToInt32(PartStatusEnum.UnReserve) == part.PartStatusId)
                {
                    stockLine.QuantityAvailable = stockLine.QuantityAvailable == null ? 0 : stockLine.QuantityAvailable + part.QuantityReserved;
                }

                if (Convert.ToInt32(PartStatusEnum.Reserve) == part.PartStatusId)
                {
                    stockLine.QuantityReserved = part.QuantityReserved;
                }
                else if (Convert.ToInt32(PartStatusEnum.UnReserve) == part.PartStatusId)
                {
                    stockLine.QuantityReserved = part.QuantityReserved;
                }
                else if (Convert.ToInt32(PartStatusEnum.Issue) == part.PartStatusId)
                {
                    stockLine.QuantityIssued = part.QuantityIssued;
                }
                else if (Convert.ToInt32(PartStatusEnum.UnIssue) == part.PartStatusId)
                {
                    stockLine.QuantityIssued = part.QuantityIssued;

                }
                else if (Convert.ToInt32(PartStatusEnum.ReserveAndIssue) == part.PartStatusId)
                {
                    stockLine.QuantityIssued = part.QuantityIssued;
                }

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
                stockLine.WorkOrderMaterialsId = part.WorkOrderMaterialsId;
                stockLine.ConditionId = part.ConditionId;
                //stockLine.QuantityReserved = part.QuantityReserved;
                //stockLine.QuantityIssued = part.QuantityIssued;
                stockLine.QuantityOnOrder = part.QuantityOnOrder;
                stockLine.WorkOrderExtendedCost = part.ExtendedCost;

                if (stockLine.QuantityIssued == null)
                    stockLine.QuantityIssued = 0;
                if (stockLine.QuantityReserved == null)
                    stockLine.QuantityReserved = 0;
                if (stockLine.QuantityAvailable == null)
                    stockLine.QuantityAvailable = 0;

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

                if (Convert.ToInt32(PartStatusEnum.Reserve) == part.PartStatusId)
                {
                    if (part.QuantityAlreadyReserved == null)
                        part.QuantityAlreadyReserved = 0;
                    woMaterial.UnReservedQty = woMaterial.QuantityReserved = part.QuantityReserved + part.QuantityAlreadyReserved;
                }
                else if (Convert.ToInt32(PartStatusEnum.UnReserve) == part.PartStatusId)
                {
                    if (woMaterial.UnReservedQty == null)
                        woMaterial.UnReservedQty = 0;
                    woMaterial.UnReservedQty = woMaterial.QuantityReserved = woMaterial.UnReservedQty - part.QuantityReserved;
                }
                else if (Convert.ToInt32(PartStatusEnum.Issue) == part.PartStatusId)
                {
                    if (woMaterial.UnIssuedQty == null)
                        woMaterial.UnIssuedQty = 0;
                    if (woMaterial.UnReservedQty == null)
                        woMaterial.UnReservedQty = 0;
                    woMaterial.QuantityIssued = woMaterial.UnIssuedQty = woMaterial.UnIssuedQty + part.QuantityIssued;
                    woMaterial.QuantityReserved = woMaterial.UnReservedQty = woMaterial.UnReservedQty - part.QuantityIssued;
                }
                else if (Convert.ToInt32(PartStatusEnum.UnIssue) == part.PartStatusId)
                {
                    if (woMaterial.UnIssuedQty == null)
                        woMaterial.UnIssuedQty = 0;
                    if (woMaterial.UnReservedQty == null)
                        woMaterial.UnReservedQty = 0;

                    woMaterial.QuantityIssued = woMaterial.UnIssuedQty = woMaterial.UnIssuedQty - part.QuantityIssued;
                    woMaterial.QuantityReserved = woMaterial.UnReservedQty = woMaterial.UnReservedQty + part.QuantityIssued;
                }
                else if (Convert.ToInt32(PartStatusEnum.ReserveAndIssue) == part.PartStatusId)
                {
                    if (woMaterial.UnIssuedQty == null)
                        woMaterial.UnIssuedQty = 0;
                    woMaterial.QuantityIssued = woMaterial.UnIssuedQty = woMaterial.UnIssuedQty + part.QuantityIssued;
                }

                if (woMaterial.QuantityIssued == null)
                    woMaterial.QuantityIssued = 0;
                if (woMaterial.QuantityReserved == null)
                    woMaterial.QuantityReserved = 0;
                if (woMaterial.UnReservedQty == null)
                    woMaterial.UnReservedQty = 0;
                if (woMaterial.UnIssuedQty == null)
                    woMaterial.UnIssuedQty = 0;

                woMaterial.QuantityTurnIn = part.QuantityTurnIn;
                woMaterial.ReservedById = part.ReservedById;
                woMaterial.ReservedDate = part.ReservedDate;
                woMaterial.IssuedById = part.IssuedById;
                woMaterial.IssuedDate = part.IssuedDate;
                woMaterial.UpdatedDate = DateTime.Now;
                woMaterial.PartStatusId = part.PartStatusId;

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
                workOrderMaterial.IssuedById = part.IssuedById;
                workOrderMaterial.IssuedDate = part.IssuedDate;
                workOrderMaterial.ItemClassificationId = Convert.ToInt64(part.ItemClassificationId);
                workOrderMaterial.ItemMasterId = part.AltPartId;
                workOrderMaterial.MasterCompanyId = part.MasterCompanyId;
                workOrderMaterial.Quantity = part.Quantity;
                workOrderMaterial.QuantityIssued = part.QuantityIssued;
                workOrderMaterial.QuantityReserved = part.QuantityReserved;
                workOrderMaterial.QuantityTurnIn = part.QuantityTurnIn;
                workOrderMaterial.ReservedById = part.ReservedById;
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
                workOrderMaterial.PartStatusId = part.PartStatusId;

                if (workOrderMaterial.QuantityIssued == null)
                    workOrderMaterial.QuantityIssued = 0;
                if (workOrderMaterial.QuantityReserved == null)
                    workOrderMaterial.QuantityReserved = 0;
                if (workOrderMaterial.UnReservedQty == null)
                    workOrderMaterial.UnReservedQty = 0;
                if (workOrderMaterial.UnIssuedQty == null)
                    workOrderMaterial.UnIssuedQty = 0;

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
                if (Convert.ToInt32(PartStatusEnum.Reserve) == part.PartStatusId || Convert.ToInt32(PartStatusEnum.ReserveAndIssue) == part.PartStatusId)
                {
                    woStockLine.QuantityAvailable = woStockLine.QuantityAvailable == null ? 0 : woStockLine.QuantityAvailable - part.QuantityReserved;
                }
                if (Convert.ToInt32(PartStatusEnum.UnReserve) == part.PartStatusId)
                {
                    woStockLine.QuantityAvailable = woStockLine.QuantityAvailable == null ? 0 : woStockLine.QuantityAvailable + part.QuantityReserved;
                }

                woStockLine.QuantityOnOrder = part.QuantityOnOrder;
                woStockLine.StockLineId = part.StockLineId;
                woStockLine.UpdatedDate = DateTime.Now;
                woStockLine.UpdatedBy = part.UpdatedBy;
                woStockLine.WorkOrderMaterialsId = part.WorkOrderMaterialsId;
                woStockLine.QuantityReserved = part.QuantityReserved;
                woStockLine.QuantityIssued = part.QuantityIssued;
                woStockLine.QuantityOnOrder = part.QuantityOnOrder;

                if (woStockLine.QuantityIssued == null)
                    woStockLine.QuantityIssued = 0;
                if (woStockLine.QuantityReserved == null)
                    woStockLine.QuantityReserved = 0;
                if (woStockLine.QuantityAvailable == null)
                    woStockLine.QuantityAvailable = 0;

                _appContext.StockLine.Update(woStockLine);
            }
            else
            {
                StockLine stockLine = new StockLine();
                stockLine.QuantityOnHand = part.QuantityOnHand;
                if (Convert.ToInt32(PartStatusEnum.Reserve) == part.PartStatusId || Convert.ToInt32(PartStatusEnum.ReserveAndIssue) == part.PartStatusId)
                {
                    stockLine.QuantityAvailable = stockLine.QuantityAvailable == null ? 0 : stockLine.QuantityAvailable - part.QuantityReserved;
                }
                if (Convert.ToInt32(PartStatusEnum.UnReserve) == part.PartStatusId)
                {
                    stockLine.QuantityAvailable = stockLine.QuantityAvailable == null ? 0 : stockLine.QuantityAvailable + part.QuantityReserved;
                }
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
                stockLine.WorkOrderMaterialsId = part.WorkOrderMaterialsId;
                stockLine.ConditionId = part.ConditionId;
                stockLine.QuantityReserved = part.QuantityReserved;
                stockLine.QuantityIssued = part.QuantityIssued;
                stockLine.QuantityOnOrder = part.QuantityOnOrder;
                stockLine.WorkOrderExtendedCost = part.ExtendedCost;

                if (stockLine.QuantityIssued == null)
                    stockLine.QuantityIssued = 0;
                if (stockLine.QuantityReserved == null)
                    stockLine.QuantityReserved = 0;
                if (stockLine.QuantityAvailable == null)
                    stockLine.QuantityAvailable = 0;
                _appContext.StockLine.Add(stockLine);
            }

            _appContext.SaveChanges();
        }

        private long UpdateWorkFlowWorkOrder(Workflow workFlow)
        {
            try
            {
                //long workFlowWorkOrderId = 0;

                WorkOrderWorkFlow workFlowWorkOrder = new WorkOrderWorkFlow();
                WorkOrderLaborHeader workOrderLaborHeader = new WorkOrderLaborHeader();
                if (workFlow != null)
                {
                    workFlowWorkOrder.WorkOrderId = workFlow.workOrderId;
                    workFlowWorkOrder.CreatedDate = workFlow.CreatedDate;
                    workFlowWorkOrder.UpdatedDate = DateTime.Now;
                    workFlowWorkOrder.CreatedBy = workFlow.CreatedBy;
                    workFlowWorkOrder.UpdatedBy = workFlow.UpdatedBy;
                    workFlowWorkOrder.IsActive = true;
                    workFlowWorkOrder.IsDeleted = false;
                    workFlowWorkOrder.MasterCompanyId = Convert.ToInt32(workFlow.MasterCompanyId);

                    workFlowWorkOrder = BIndWorkFlowWorkOrderDetails(workFlowWorkOrder, workFlow);
                    workFlowWorkOrder.WorkFlowWorkOrderId = workFlow.workFlowWorkOrderId;
                    workFlowWorkOrder.WorkOrderPartNoId = workFlow.workOrderPartNoId;

                    if (workFlow.Charges != null && workFlow.Charges.Count > 0)
                    {
                        workFlowWorkOrder.Charges = BindWorkFlowWorkOrderCharges(workFlow.Charges, workFlow.workOrderId, workFlow.CreatedBy, workFlow.MasterCompanyId);
                        workFlowWorkOrder.Charges.ForEach(p => p.IsFromWorkFlow = true);
                    }
                    if (workFlow.Equipments != null && workFlow.Equipments.Count > 0)
                    {
                        workFlowWorkOrder.Equipments = BindWorkFlowWorkOrderAssets(workFlow.Equipments, workFlow.workOrderId, workFlow.CreatedBy, workFlow.MasterCompanyId);
                        workFlowWorkOrder.Equipments.ForEach(p => p.IsFromWorkFlow = true);
                    }
                    if (workFlow.Exclusions != null && workFlow.Exclusions.Count > 0)
                    {
                        workFlowWorkOrder.Exclusions = BindWorkFlowWorkOrderExclusions(workFlow.Exclusions, workFlow.workOrderId, workFlow.CreatedBy, workFlow.MasterCompanyId);
                        workFlowWorkOrder.Exclusions.ForEach(p => p.IsFromWorkFlow = true);
                    }
                    if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                    {
                        workFlowWorkOrder.Expertise = BindWorkFlowWorkOrderExpertise(workFlow.Expertise, workFlow.workOrderId, workFlow.CreatedBy, workFlow.MasterCompanyId);
                        workFlowWorkOrder.Expertise.ForEach(p => p.IsFromWorkFlow = true);
                    }
                    if (workFlow.MaterialList != null && workFlow.MaterialList.Count > 0)
                    {
                        workFlowWorkOrder.MaterialList = BindWorkFlowWorkOrderMaterials(workFlow.MaterialList, workFlow.workOrderId, workFlow.CreatedBy, workFlow.MasterCompanyId);
                        workFlowWorkOrder.MaterialList.ForEach(p => p.IsFromWorkFlow = true);
                    }

                    if (workFlow.Directions != null && workFlow.Directions.Count > 0)
                    {
                        workFlowWorkOrder.Directions = BindWorkFlowWorkOrderDirections(workFlow.Directions, workFlow.workOrderId, workFlow.CreatedBy, workFlow.MasterCompanyId);
                        workFlowWorkOrder.Directions.ForEach(p => p.IsFromWorkFlow = true);
                    }
                    if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                    {
                        workFlowWorkOrder.Publication = BindWorkFlowWorkOrderPublications(workFlow.Publication, workFlow.workOrderId, workFlow.CreatedBy, workFlow.MasterCompanyId);
                        workFlowWorkOrder.Publication.ForEach(p => p.IsFromWorkFlow = true);
                    }
                    if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                    {
                        workOrderLaborHeader = BindWorkFlowWorkOrderLabor(workFlow.Expertise, workFlow.workOrderId, workFlow.CreatedBy, workFlow.MasterCompanyId);
                    }
                    else
                    {
                        workOrderLaborHeader = null;
                    }



                    var excharges = _appContext.WorkOrderCharges.Where(p => p.WorkFlowWorkOrderId == workFlow.workFlowWorkOrderId && p.WorkOrderId == workFlow.workOrderId && p.IsFromWorkFlow == true).ToList();
                    _appContext.WorkOrderCharges.RemoveRange(excharges);

                    var exEquipments = _appContext.WorkOrderAssets.Where(p => p.WorkFlowWorkOrderId == workFlow.workFlowWorkOrderId && p.WorkOrderId == workFlow.workOrderId && p.IsFromWorkFlow == true).ToList();
                    _appContext.WorkOrderAssets.RemoveRange(exEquipments);

                    var exExclusions = _appContext.WorkOrderExclusions.Where(p => p.WorkFlowWorkOrderId == workFlow.workFlowWorkOrderId && p.WorkOrderId == workFlow.workOrderId && p.IsFromWorkFlow == true).ToList();
                    _appContext.WorkOrderExclusions.RemoveRange(exExclusions);

                    var exExpertise = _appContext.WorkOrderExpertise.Where(p => p.WorkFlowWorkOrderId == workFlow.workFlowWorkOrderId && p.WorkOrderId == workFlow.workOrderId && p.IsFromWorkFlow == true).ToList();
                    _appContext.WorkOrderExpertise.RemoveRange(exExpertise);

                    var exMaterialList = _appContext.WorkOrderMaterials.Where(p => p.WorkFlowWorkOrderId == workFlow.workFlowWorkOrderId && p.WorkOrderId == workFlow.workOrderId && p.IsFromWorkFlow == true).ToList();
                    _appContext.WorkOrderMaterials.RemoveRange(exMaterialList);

                    var exDirections = _appContext.WorkOrderDirections.Where(p => p.WorkFlowWorkOrderId == workFlow.workFlowWorkOrderId && p.WorkOrderId == workFlow.workOrderId && p.IsFromWorkFlow == true).ToList();
                    _appContext.WorkOrderDirections.RemoveRange(exDirections);

                    var woPublication = _appContext.WorkOrderPublications.Where(p => p.WorkFlowWorkOrderId == workFlow.workFlowWorkOrderId).ToList();

                    if (woPublication != null && woPublication.Count > 0)
                    {
                        foreach (var pub in woPublication)
                        {
                            var exPublicationDashNumbers = _appContext.WorkOrderPublicationDashNumber.Where(p => p.WorkOrderPublicationId == pub.WorkOrderPublicationId).ToList();
                            _appContext.WorkOrderPublicationDashNumber.RemoveRange(exPublicationDashNumbers);
                            _appContext.SaveChanges();
                        }

                    }


                    var exPublication = _appContext.WorkOrderPublications.Where(p => p.WorkFlowWorkOrderId == workFlow.workFlowWorkOrderId && p.WorkOrderId == workFlow.workOrderId && p.IsFromWorkFlow == true).ToList();
                    _appContext.WorkOrderPublications.RemoveRange(exPublication);


                    var laborHeader = _appContext.WorkOrderLaborHeader.Where(p => p.WorkFlowWorkOrderId == workFlow.workFlowWorkOrderId && p.WorkOrderId == workFlow.workOrderId).FirstOrDefault();

                    if (laborHeader != null)
                    {
                        var laborList = _appContext.WorkOrderLabor.Where(p => p.WorkOrderLaborHeaderId == laborHeader.WorkOrderLaborHeaderId && p.IsFromWorkFlow == true).ToList();
                        _appContext.WorkOrderLabor.RemoveRange(laborList);
                    }

                    var exWorkOrderLabor = _appContext.WorkOrderPublications.Where(p => p.WorkFlowWorkOrderId == workFlow.workFlowWorkOrderId && p.WorkOrderId == workFlow.workOrderId && p.IsFromWorkFlow == true).ToList();
                    _appContext.WorkOrderPublications.RemoveRange(exPublication);



                    _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                    _appContext.SaveChanges();

                    workFlowWorkOrder.WorkFlowWorkOrderNo = "WOWF" + workFlowWorkOrder.WorkFlowWorkOrderId;
                    _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                    _appContext.SaveChanges();

                    if (workOrderLaborHeader != null)
                    {
                        workOrderLaborHeader.LaborList.ForEach(p => p.IsFromWorkFlow = true);
                        workOrderLaborHeader.WorkFlowWorkOrderId = workFlow.workFlowWorkOrderId;
                        _appContext.WorkOrderLaborHeader.Add(workOrderLaborHeader);
                        _appContext.SaveChanges();
                    }


                    //Updating existing workflow id
                    WorkOrderPartNumber workOrderPartNumber = new WorkOrderPartNumber();
                    workOrderPartNumber.ID = workFlowWorkOrder.WorkOrderPartNoId;
                    workOrderPartNumber.WorkflowId = workFlowWorkOrder.WorkflowId;

                    _appContext.WorkOrderPartNumber.Attach(workOrderPartNumber);
                    _appContext.Entry(workOrderPartNumber).Property(p => p.WorkflowId).IsModified = true;
                    _appContext.SaveChanges();
                }
                return workFlow.workFlowWorkOrderId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private List<RevisedPart> WORevisedParts(long itemMasterId, int mappingType)
        {
            List<RevisedPart> revisedParts = new List<RevisedPart>();
            RevisedPart revisedPart;
            try
            {
                var list = (from p in _appContext.Nha_Tla_Alt_Equ_ItemMapping
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
                if (list != null && list.Count > 0)
                {
                    foreach (var part in list)
                    {
                        revisedPart = new RevisedPart();
                        revisedPart.MappingItemMasterId = part.MappingItemMasterId;
                        revisedPart.RevisedPartNo = part.RevisedPartNo;
                        revisedParts.Add(revisedPart);
                    }
                }
                return revisedParts;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private ItemMaster WorkOrderPartDetails(long itemMasterId)
        {
            try
            {
                return _appContext.ItemMaster.Where(p => p.ItemMasterId == itemMasterId).FirstOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public StockLine WOPartSerialNo(long stockLineId)
        {
            try
            {
                return _appContext.StockLine.Where(p => p.StockLineId == stockLineId).FirstOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void UpdateCustomer(WorkOrder workOrder)
        {
            Customer customer = new Customer();
            customer.CustomerId = workOrder.CustomerId;
            customer.PrimarySalesPersonId = workOrder.CSR;
            customer.ContractReference = workOrder.CustomerReference;
            customer.CreditTermsId = workOrder.CreditTermsId;
            customer.CreditLimit = workOrder.CreditLimit;

            customer.UpdatedBy = workOrder.UpdatedBy;
            customer.UpdatedDate = DateTime.Now;
            _appContext.Customer.Attach(customer);

            _appContext.Entry(customer).Property(p => p.PrimarySalesPersonId).IsModified = true;
            _appContext.Entry(customer).Property(p => p.ContractReference).IsModified = true;
            _appContext.Entry(customer).Property(p => p.CreditTermsId).IsModified = true;
            _appContext.Entry(customer).Property(p => p.CreditLimit).IsModified = true;
            _appContext.Entry(customer).Property(p => p.UpdatedBy).IsModified = true;
            _appContext.Entry(customer).Property(p => p.UpdatedDate).IsModified = true;
            _appContext.SaveChanges();
        }

        #endregion

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}