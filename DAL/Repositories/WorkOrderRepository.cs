using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using EntityFrameworkPaginate;
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

                //UpdateCustomer(workOrder);

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

                    //Updating Work Order Id in Stockline Table
                    StockLine stockLine = new StockLine();
                    stockLine.StockLineId = item.StockLineId;
                    stockLine.WorkOrderId = workOrder.WorkOrderId;
                    stockLine.UpdatedDate = workOrder.UpdatedDate;
                    stockLine.UpdatedBy = workOrder.UpdatedBy;

                    _appContext.StockLine.Attach(stockLine);
                    _appContext.Entry(stockLine).Property(x => x.WorkOrderId).IsModified = true;
                    _appContext.Entry(stockLine).Property(x => x.UpdatedDate).IsModified = true;
                    _appContext.Entry(stockLine).Property(x => x.UpdatedBy).IsModified = true;
                    _appContext.SaveChanges();

                    //Updating Work Order Id in Receiving Customer Table
                    ReceivingCustomerWork receivingCustomer = new ReceivingCustomerWork();
                    receivingCustomer.ReceivingCustomerWorkId = item.ReceivingCustomerWorkId;
                    receivingCustomer.WorkOrderId = workOrder.WorkOrderId;
                    receivingCustomer.UpdatedDate = workOrder.UpdatedDate;
                    receivingCustomer.UpdatedBy = workOrder.UpdatedBy;

                    _appContext.ReceivingCustomerWork.Attach(receivingCustomer);
                    _appContext.Entry(receivingCustomer).Property(x => x.WorkOrderId).IsModified = true;
                    _appContext.Entry(receivingCustomer).Property(x => x.UpdatedDate).IsModified = true;
                    _appContext.Entry(receivingCustomer).Property(x => x.UpdatedBy).IsModified = true;
                    _appContext.SaveChanges();

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
                foreach (var item in workOrder.PartNumbers)
                {
                    var woPartDetails = _appContext.WorkOrderPartNumber.Where(p => p.ID == item.ID).AsNoTracking().FirstOrDefault();

                    if (woPartDetails != null && woPartDetails.StockLineId != item.StockLineId)
                    {
                        StockLine stockLine = new StockLine();
                        stockLine.StockLineId = woPartDetails.StockLineId;
                        stockLine.WorkOrderId = 0;
                        stockLine.UpdatedDate = workOrder.UpdatedDate;
                        stockLine.UpdatedBy = workOrder.UpdatedBy;

                        _appContext.StockLine.Attach(stockLine);
                        _appContext.Entry(stockLine).Property(x => x.WorkOrderId).IsModified = true;
                        _appContext.Entry(stockLine).Property(x => x.UpdatedDate).IsModified = true;
                        _appContext.Entry(stockLine).Property(x => x.UpdatedBy).IsModified = true;
                        _appContext.SaveChanges();

                        //Updating Work Order Id in Receiving Customer Table
                        ReceivingCustomerWork receivingCustomer = new ReceivingCustomerWork();
                        receivingCustomer.ReceivingCustomerWorkId = _appContext.ReceivingCustomerWork.Where(p => p.StockLineId == woPartDetails.StockLineId).AsNoTracking().Select(p => p.ReceivingCustomerWorkId).FirstOrDefault(); ;
                        receivingCustomer.WorkOrderId = 0;
                        receivingCustomer.UpdatedDate = workOrder.UpdatedDate;
                        receivingCustomer.UpdatedBy = workOrder.UpdatedBy;

                        _appContext.ReceivingCustomerWork.Attach(receivingCustomer);
                        _appContext.Entry(receivingCustomer).Property(x => x.WorkOrderId).IsModified = true;
                        _appContext.Entry(receivingCustomer).Property(x => x.UpdatedDate).IsModified = true;
                        _appContext.Entry(receivingCustomer).Property(x => x.UpdatedBy).IsModified = true;
                        _appContext.SaveChanges();
                    }

                }
                workOrder.UpdatedDate = DateTime.Now;
                _appContext.WorkOrder.Update(workOrder);
                _appContext.SaveChanges();

                foreach (var item in workOrder.PartNumbers)
                {
                    var workScope = _appContext.WorkScope.Where(p => p.WorkScopeId == item.WorkOrderScopeId).FirstOrDefault();
                    if (workScope != null)
                        item.WorkScope = workScope.Description;

                    //Updating Work Order Id in Stockline Table
                    StockLine stockLine = new StockLine();
                    stockLine.StockLineId = item.StockLineId;
                    stockLine.WorkOrderId = workOrder.WorkOrderId;
                    stockLine.UpdatedDate = workOrder.UpdatedDate;
                    stockLine.UpdatedBy = workOrder.UpdatedBy;

                    _appContext.StockLine.Attach(stockLine);
                    _appContext.Entry(stockLine).Property(x => x.WorkOrderId).IsModified = true;
                    _appContext.Entry(stockLine).Property(x => x.UpdatedDate).IsModified = true;
                    _appContext.Entry(stockLine).Property(x => x.UpdatedBy).IsModified = true;
                    _appContext.SaveChanges();

                    //Updating Work Order Id in Receiving Customer Table
                    ReceivingCustomerWork receivingCustomer = new ReceivingCustomerWork();
                    receivingCustomer.ReceivingCustomerWorkId = item.ReceivingCustomerWorkId;
                    receivingCustomer.WorkOrderId = workOrder.WorkOrderId;
                    receivingCustomer.UpdatedDate = workOrder.UpdatedDate;
                    receivingCustomer.UpdatedBy = workOrder.UpdatedBy;

                    _appContext.ReceivingCustomerWork.Attach(receivingCustomer);
                    _appContext.Entry(receivingCustomer).Property(x => x.WorkOrderId).IsModified = true;
                    _appContext.Entry(receivingCustomer).Property(x => x.UpdatedDate).IsModified = true;
                    _appContext.Entry(receivingCustomer).Property(x => x.UpdatedBy).IsModified = true;
                    _appContext.SaveChanges();
                }

                // UpdateCustomer(workOrder);

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
                                    join wos in _appContext.WorkOrderStage on wop.WorkOrderStageId equals wos.WorkOrderStageId
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
                            join wos in _appContext.WorkOrderStage on wop.WorkOrderStageId equals wos.WorkOrderStageId
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

        public IEnumerable<object> GetWorkOrdersList(Common.Filters<WorkOrderFilters> woFilters)
        {
            if (woFilters.filters == null)
                woFilters.filters = new WorkOrderFilters();
            var pageNumber = woFilters.first + 1;
            var pageSize = woFilters.rows;


            string sortColumn = string.Empty;
            short statusId = 0;

            var open = "open";
            var canceled = "canceled";
            var closed = "closed";
            var all = "all";

            if (woFilters.filters.ViewType == null)
                woFilters.filters.ViewType = "mpn";

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

            int totalRecords = 0;
            var sorts = new Sorts<WorkOrderFilters>();
            var sorts1 = new Sorts<WorkOrderFilters1>();
            var filters = new EntityFrameworkPaginate.Filters<WorkOrderFilters>();

            if (string.IsNullOrEmpty(woFilters.SortField))
            {
                sortColumn = "createdDate";
                woFilters.SortOrder = -1;
                sorts.Add(sortColumn == "createdDate", x => x.CreatedDate, true);
            }
            else
            {
                sortColumn = woFilters.SortField;
            }

            if (sortColumn.Equals("pnDescriptionType"))
            {
                sortColumn = "PNDescriptionType";
            }
            else
            {
                sortColumn = char.ToUpper(sortColumn[0]) + sortColumn.Substring(1);
            }

            var propertyInfo = typeof(WorkOrderFilters).GetProperty(sortColumn);

            if (woFilters.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }

            filters.Add(!string.IsNullOrEmpty(woFilters.filters.WorkOrderNum), x => x.WorkOrderNum.ToLower().Contains(woFilters.filters.WorkOrderNum.ToLower()));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.PartNoType), x => x.PartNos.ToLower().Contains(woFilters.filters.PartNoType.ToLower()));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.PNDescriptionType), x => x.PNDescription.ToLower().Contains(woFilters.filters.PNDescriptionType.ToLower()));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.WorkScopeType), x => x.WorkScope.ToLower().Contains(woFilters.filters.WorkScopeType.ToLower()));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.PriorityType), x => x.Priority.ToLower().Contains(woFilters.filters.PriorityType.ToLower()));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.CustomerName), x => x.CustomerName.ToLower().Contains(woFilters.filters.CustomerName.ToLower()));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.CustomerType), x => x.CustomerType.ToLower().Contains(woFilters.filters.CustomerType.ToLower()));
            filters.Add(woFilters.filters.OpenDate != null, x => x.OpenDate == woFilters.filters.OpenDate);
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.CustomerRequestDateType), x => x.CustomerRequestDate.Contains(woFilters.filters.CustomerRequestDateType));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.PromisedDateType), x => x.PromisedDate.Contains(woFilters.filters.PromisedDateType));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.EstimatedShipDateType), x => x.EstimatedShipDate.Contains(woFilters.filters.EstimatedShipDateType));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.EstimatedCompletionDateType), x => x.EstimatedCompletionDate.Contains(woFilters.filters.EstimatedCompletionDateType));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.StageType), x => x.Stage.ToLower().Contains(woFilters.filters.StageType.ToLower()));
            filters.Add(statusId > 0, x => x.WorkOrderStatusId.Contains(statusId.ToString()));

            try
            {
                if (woFilters.filters.ViewType.ToLower() == "mpn")
                {

                    totalRecords = (from wo in _appContext.WorkOrder
                                    join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                    join wowf in _appContext.WorkOrderWorkFlow on wop.ID equals wowf.WorkOrderPartNoId
                                    join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                                    join ca in _appContext.CustomerAffiliation on cust.CustomerAffiliationId equals ca.CustomerAffiliationId
                                    join wost in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals wost.Id
                                    join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                                    join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                                    join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                                    join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId
                                    where wo.IsDeleted == false
                                    select new WorkOrderFilters()
                                    {
                                        WorkOrderId = wo.WorkOrderId,
                                        WorkOrderNum = wo.WorkOrderNum,
                                        PartNos = im.PartNumber,
                                        PartNoType = im.PartNumber,
                                        PNDescription = im.PartDescription,
                                        PNDescriptionType = im.PartDescription,
                                        WorkScope = ws.Description,
                                        WorkScopeType = ws.Description,
                                        Priority = pr.Description,
                                        PriorityType = pr.Description,
                                        CustomerName = cust.Name,
                                        CustomerType = ca.description,
                                        OpenDate = wo.OpenDate.Date,
                                        CustomerRequestDate = wop.CustomerRequestDate.ToString(),
                                        CustomerRequestDateType = wop.CustomerRequestDate.ToString(),
                                        PromisedDate = wop.PromisedDate.ToString(),
                                        PromisedDateType = wop.PromisedDate.ToString(),
                                        EstimatedShipDate = wop.EstimatedShipDate.ToString(),
                                        EstimatedShipDateType = wop.EstimatedShipDate.ToString(),
                                        EstimatedCompletionDate = wop.EstimatedCompletionDate.ToString(),
                                        EstimatedCompletionDateType = wop.EstimatedCompletionDate.ToString(),
                                        Stage = stage.Stage,
                                        StageType = stage.Stage,
                                        WorkOrderStatus = wost.Description,
                                        WorkOrderStatusType = wost.Description,
                                        IsActive = wo.IsActive,
                                        CreatedDate = wo.CreatedDate,
                                        WorkOrderStatusId = wop.WorkOrderStatusId.ToString(),
                                    }
                          ).Distinct()
                          .Paginate(pageNumber, pageSize, sorts, filters).RecordCount;

                    var list = (from wo in _appContext.WorkOrder
                                join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                join wowf in _appContext.WorkOrderWorkFlow on wop.ID equals wowf.WorkOrderPartNoId
                                join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                                join ca in _appContext.CustomerAffiliation on cust.CustomerAffiliationId equals ca.CustomerAffiliationId
                                join wost in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals wost.Id
                                join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                                join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                                join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                                join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId
                                where wo.IsDeleted == false
                                select new WorkOrderFilters()
                                {
                                    WorkOrderId = wo.WorkOrderId,
                                    WorkOrderNum = wo.WorkOrderNum,
                                    PartNos = im.PartNumber,
                                    PartNoType = im.PartNumber,
                                    PNDescription = im.PartDescription,
                                    PNDescriptionType = im.PartDescription,
                                    WorkScope = ws.Description,
                                    WorkScopeType = ws.Description,
                                    Priority = pr.Description,
                                    PriorityType = pr.Description,
                                    CustomerName = cust.Name,
                                    CustomerType = ca.description,
                                    OpenDate = wo.OpenDate.Date,
                                    CustomerRequestDate = wop.CustomerRequestDate.ToString(),
                                    CustomerRequestDateType = wop.CustomerRequestDate.ToString(),
                                    PromisedDate = wop.PromisedDate.ToString(),
                                    PromisedDateType = wop.PromisedDate.ToString(),
                                    EstimatedShipDate = wop.EstimatedShipDate.ToString(),
                                    EstimatedShipDateType = wop.EstimatedShipDate.ToString(),
                                    EstimatedCompletionDate = wop.EstimatedCompletionDate.ToString(),
                                    EstimatedCompletionDateType = wop.EstimatedCompletionDate.ToString(),
                                    Stage = stage.Stage,
                                    StageType = stage.Stage,
                                    WorkOrderStatus = wost.Description,
                                    WorkOrderStatusType = wost.Description,
                                    IsActive = wo.IsActive,
                                    CreatedDate = wo.CreatedDate,
                                    WorkOrderStatusId = wop.WorkOrderStatusId.ToString(),
                                    TotalRecords = totalRecords,
                                }
                          ).Distinct()
                          .Paginate(pageNumber, pageSize, sorts, filters).Results;
                    return list;
                }
                else
                {
                    totalRecords = (from wo in _appContext.WorkOrder
                                        //  join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                    join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                                    join ca in _appContext.CustomerAffiliation on cust.CustomerAffiliationId equals ca.CustomerAffiliationId
                                    where wo.IsDeleted == false
                                    select new WorkOrderFilters()
                                    {
                                        WorkOrderId = wo.WorkOrderId,
                                        WorkOrderNum = wo.WorkOrderNum,

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
                                    ws => ws.WorkOrderStageId,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Stage)),

                                        WorkOrderStatus = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStatus,
                                    wp => wp.WorkOrderStatusId,
                                    ws => ws.Id,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Description)),


                                        // WorkOrderStatus = wost.Description,
                                        IsActive = wo.IsActive,
                                        CreatedDate = wo.CreatedDate,

                                        WorkOrderStatusId = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStatus,
                                    wp => wp.WorkOrderStatusId,
                                    ws => ws.Id,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Id))
                                    }
                          ).Distinct()
                           .Paginate(pageNumber, woFilters.rows, sorts, filters).RecordCount;

                    var list = (from wo in _appContext.WorkOrder
                                    // join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                                join ca in _appContext.CustomerAffiliation on cust.CustomerAffiliationId equals ca.CustomerAffiliationId
                                where wo.IsDeleted == false
                                select new WorkOrderFilters()
                                {
                                    WorkOrderId = wo.WorkOrderId,
                                    WorkOrderNum = wo.WorkOrderNum,

                                    PartNos = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                    wp => wp.MasterPartId,
                                    im => im.ItemMasterId,
                                    (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.im.PartNumber)),

                                    PartNoType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple"
                                                : _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                                     wp => wp.MasterPartId,
                                                    im => im.ItemMasterId,
                                                    (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                                    .Select(p => p.im.PartNumber).FirstOrDefault().ToString(),

                                    PNDescription = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                    wp => wp.MasterPartId,
                                    im => im.ItemMasterId,
                                    (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.im.PartDescription)),

                                    PNDescriptionType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple"
                                                        : _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                                         wp => wp.MasterPartId,
                                                         im => im.ItemMasterId,
                                                         (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                                        .Select(p => p.im.PartDescription).FirstOrDefault().ToString(),

                                    WorkScope = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkScope,
                                    wp => wp.WorkOrderScopeId,
                                    ws => ws.WorkScopeId,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Description)),

                                    WorkScopeType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple"
                                    : _appContext.WorkOrderPartNumber.Join(_appContext.WorkScope,
                                    wp => wp.WorkOrderScopeId,
                                    ws => ws.WorkScopeId,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Description).FirstOrDefault().ToString(),


                                    Priority = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.Priority,
                                    wp => wp.WorkOrderPriorityId,
                                    pr => pr.PriorityId,
                                    (wp, pr) => new { wp, pr }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.pr.Description)),

                                    PriorityType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple"
                                    : _appContext.WorkOrderPartNumber.Join(_appContext.Priority,
                                    wp => wp.WorkOrderPriorityId,
                                    pr => pr.PriorityId,
                                    (wp, pr) => new { wp, pr }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.pr.Description).FirstOrDefault().ToString(),

                                    CustomerName = cust.Name,
                                    CustomerType = ca.description,
                                    OpenDate = wo.OpenDate.Date,

                                    CustomerRequestDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.CustomerRequestDate.Date)),

                                    CustomerRequestDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple"
                                                            : _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.CustomerRequestDate.Date).FirstOrDefault().ToString(),

                                    PromisedDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.PromisedDate.Date)),

                                    PromisedDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple"
                                                     : _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.PromisedDate.Date).FirstOrDefault().ToString(),

                                    EstimatedShipDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedShipDate.Date)),

                                    EstimatedShipDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple"
                                                          : _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedShipDate.Date).FirstOrDefault().ToString(),

                                    EstimatedCompletionDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedCompletionDate.Date)),

                                    EstimatedCompletionDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple"
                                                                : _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedCompletionDate.Date).FirstOrDefault().ToString(),

                                    Stage = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStage,
                                    wp => wp.WorkOrderStageId,
                                    ws => ws.WorkOrderStageId,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Stage)),

                                    StageType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple"
                                              : _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStage,
                                                wp => wp.WorkOrderStageId,
                                                ws => ws.WorkOrderStageId,
                                                (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                                .Select(p => p.ws.Stage).FirstOrDefault().ToString(),

                                    WorkOrderStatus = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStatus,
                                    wp => wp.WorkOrderStatusId,
                                    ws => ws.Id,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Description)),

                                    WorkOrderStatusType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple"
                                              : _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStatus,
                                                wp => wp.WorkOrderStatusId,
                                                ws => ws.Id,
                                                (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                                .Select(p => p.ws.Description).FirstOrDefault().ToString(),

                                    //WorkOrderStatus = wost.Description,
                                    IsActive = wo.IsActive,
                                    CreatedDate = wo.CreatedDate,

                                    WorkOrderStatusId = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStatus,
                                    wp => wp.WorkOrderStatusId,
                                    ws => ws.Id,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Id)),

                                    TotalRecords = totalRecords,
                                }

                           ).Distinct()
                           .Paginate(pageNumber, woFilters.rows, sorts, filters).Results;

                    return list;
                }

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

                int totalRecords = 0;
                try
                {
                    totalRecords = (from wo in _appContext.WorkOrder
                                    join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                    join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                                    join ca in _appContext.CustomerAffiliation on cust.CustomerAffiliationId equals ca.CustomerAffiliationId
                                    join wost in _appContext.WorkOrderStatus on wo.WorkOrderStatusId equals wost.Id
                                    join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                                    join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                                    join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                                    join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId
                                    where wo.IsDeleted == false
                                    && (wo.WorkOrderNum.Contains(filterText)
                                    || im.PartNumber.Contains(filterText)
                                    || im.PartDescription.Contains(filterText)
                                    || ws.Description.Contains(filterText)
                                    || pr.Description.Contains(filterText)
                                    || cust.Name.Contains(filterText)
                                    || ca.description.Contains(filterText)
                                    || stage.Stage.Contains(filterText)
                                    || wo.WorkOrderStatusId == statusId)
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
                                join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId
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
                                || stage.Stage.Contains(filterText)
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

                                    PartNoType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : im.PartNumber,

                                    PNDescription = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                    wp => wp.MasterPartId,
                                    im => im.ItemMasterId,
                                    (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.im.PartDescription)),

                                    PNDescriptionType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : im.PartDescription,

                                    WorkScope = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkScope,
                                    wp => wp.WorkOrderScopeId,
                                    ws => ws.WorkScopeId,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Description)),

                                    WorkScopeType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : ws.Description,


                                    Priority = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.Priority,
                                    wp => wp.WorkOrderPriorityId,
                                    pr => pr.PriorityId,
                                    (wp, pr) => new { wp, pr }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.pr.Description)),

                                    PriorityType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : pr.Description,

                                    CustomerName = cust.Name,
                                    CustomerType = ca.description,
                                    OpenDate = wo.OpenDate.Date,

                                    CustomerRequestDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.CustomerRequestDate.Date)),

                                    CustomerRequestDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : wop.CustomerRequestDate.ToString(),

                                    PromisedDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.PromisedDate.Date)),

                                    PromisedDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : wop.PromisedDate.ToString(),

                                    EstimatedShipDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedShipDate.Date)),

                                    EstimatedShipDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : wop.EstimatedShipDate.ToString(),

                                    EstimatedCompletionDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedCompletionDate.Date)),

                                    EstimatedCompletionDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : wop.EstimatedCompletionDate.ToString(),

                                    Stage = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStage,
                                    wp => wp.WorkOrderStageId,
                                    ws => ws.WorkOrderStageId,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Stage)),

                                    StageType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : stage.Stage,

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
                                        join ca in _appContext.CustomerAffiliation on cust.CustomerAffiliationId equals ca.CustomerAffiliationId
                                        join wost in _appContext.WorkOrderStatus on wo.WorkOrderStatusId equals wost.Id
                                        join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                                        join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
                                        join pr in _appContext.Priority on wop.WorkOrderPriorityId equals pr.PriorityId
                                        join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId
                                        join rp in _appContext.ItemMaster on wop.RevisedPartId equals rp.ItemMasterId into woprp
                                        from rp in woprp.DefaultIfEmpty()
                                        where wo.IsDeleted == false
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
                                join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId
                                join rp in _appContext.ItemMaster on wop.RevisedPartId equals rp.ItemMasterId into woprp
                                from rp in woprp.DefaultIfEmpty()
                                where wo.IsDeleted == false
                                select new
                                {
                                    wo.WorkOrderId,
                                    wo.WorkOrderNum,

                                    PartNos = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                    wp => wp.MasterPartId,
                                    im => im.ItemMasterId,
                                    (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.im.PartNumber)),

                                    PartNoType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : im.PartNumber,

                                    PNDescription = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.ItemMaster,
                                    wp => wp.MasterPartId,
                                    im => im.ItemMasterId,
                                    (wp, im) => new { wp, im }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.im.PartDescription)),

                                    PNDescriptionType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : im.PartDescription,

                                    WorkScope = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkScope,
                                    wp => wp.WorkOrderScopeId,
                                    ws => ws.WorkScopeId,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Description)),

                                    WorkScopeType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : ws.Description,


                                    Priority = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.Priority,
                                    wp => wp.WorkOrderPriorityId,
                                    pr => pr.PriorityId,
                                    (wp, pr) => new { wp, pr }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.pr.Description)),

                                    PriorityType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : pr.Description,

                                    CustomerName = cust.Name,
                                    CustomerType = ca.description,
                                    OpenDate = wo.OpenDate.Date,

                                    CustomerRequestDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.CustomerRequestDate.Date)),

                                    CustomerRequestDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : wop.CustomerRequestDate.ToString(),

                                    PromisedDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.PromisedDate.Date)),

                                    PromisedDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : wop.PromisedDate.ToString(),

                                    EstimatedShipDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedShipDate.Date)),

                                    EstimatedShipDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : wop.EstimatedShipDate.ToString(),

                                    EstimatedCompletionDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedCompletionDate.Date)),

                                    EstimatedCompletionDateType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : wop.EstimatedCompletionDate.ToString(),

                                    Stage = string.Join(",", _appContext.WorkOrderPartNumber.Join(_appContext.WorkOrderStage,
                                    wp => wp.WorkOrderStageId,
                                    ws => ws.WorkOrderStageId,
                                    (wp, ws) => new { wp, ws }).Where(p => p.wp.WorkOrderId == wo.WorkOrderId)
                                    .Select(p => p.ws.Stage)),

                                    StageType = _appContext.WorkOrderPartNumber.Where(p => p.WorkOrderId == wo.WorkOrderId).Count() > 1 ? "Multiple" : stage.Stage,

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
        }

        public WorkOrder WorkOrderById(long workOrderId, long receivingCustomerId)
        {

            try
            {
                if (receivingCustomerId > 0)
                {
                    return WorkOrderFromReceivingCustomer(receivingCustomerId);
                }

                WorkOrder workOrder = _appContext.Set<WorkOrder>().Where(x => x.WorkOrderId == workOrderId).FirstOrDefault();
                if (workOrder != null)
                {
                    workOrder.isRecCustomer = false;
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

                            var partDetails = WorkOrderPartDetails(workOrder.WorkOrderId, part.ID);
                            if (partDetails != null)
                            {
                                part.Condition = partDetails.Condition;
                                part.SerialNumber = partDetails.SerialNumber;
                                part.StockLineNumber = partDetails.StockLineNumber;
                                part.Description = partDetails.PartDescription;
                                part.PartNumber = partDetails.PartNumber;
                                part.RevisedPartNo = partDetails.RevisedPartNo;
                                part.ReceivingCustomerWorkId = partDetails.ReceivingCustomerWorkId;
                            }
                        }
                    }


                    var customer = _appContext.Customer.Where(p => p.CustomerId == workOrder.CustomerId).FirstOrDefault();
                    string customerRef = string.Empty;
                    if (customer != null)
                    {
                        workOrder.CustomerDetails = new CustomerDetails();

                        var recCustomer = _appContext.ReceivingCustomerWork.Where(p => p.ReceivingCustomerWorkId == workOrder.ReceivingCustomerWorkId).FirstOrDefault();
                        if (recCustomer != null)
                        {
                            customerRef = recCustomer.Reference;
                        }
                        workOrder.CustomerReference = workOrder.CustomerDetails.CustomerRef = customerRef;
                        workOrder.CustomerDetails.CustomerName = customer.Name;
                        workOrder.CustomerDetails.CreditLimit = customer.CreditLimit;
                        workOrder.CustomerDetails.CreditTermsId = customer.CreditTermsId;
                        workOrder.CustomerDetails.CustomerId = workOrder.CustomerId;
                        workOrder.CustomerDetails.CustomerName = customer.Name;
                        workOrder.CustomerDetails.CustomerEmail = customer.Email;
                        workOrder.CustomerDetails.CustomerPhone = customer.CustomerPhone;
                        workOrder.CustomerDetails.CSRId = workOrder.CSRId;
                        workOrder.CustomerDetails.CSRName = workOrder.CSRId == null ? "" : _appContext.Employee.Where(p => p.EmployeeId == workOrder.CSRId).Select(p => p.FirstName).FirstOrDefault();
                        workOrder.CSRName = workOrder.CustomerDetails.CSRName;
                        workOrder.CustomerCode = workOrder.CustomerDetails.CustomerCode = customer.CustomerCode;

                        workOrder.CreditLimit = Convert.ToInt64(customer.CreditLimit);
                        workOrder.CreditTermsId = Convert.ToInt16(customer.CreditTermsId);
                        var customerContact = (from c in _appContext.Customer
                                               join cc in _appContext.CustomerContact on c.CustomerId equals cc.CustomerId
                                               join con in _appContext.Contact on cc.ContactId equals con.ContactId
                                               where c.CustomerId == workOrder.CustomerId && cc.IsDefaultContact == true
                                               select new
                                               {
                                                   con
                                               }).FirstOrDefault();

                        if (customerContact != null)
                        {
                            workOrder.CustomerContact = workOrder.CustomerDetails.CustomerContact = customerContact.con.FirstName;
                        }
                    }




                    if (workOrder.IsSinglePN)
                    {
                        var workFlowWorkOrder = _appContext.WorkOrderWorkFlow.Where(p => p.WorkOrderId == workOrderId).FirstOrDefault();
                        if (workFlowWorkOrder != null)
                            workOrder.WorkFlowWorkOrderId = workFlowWorkOrder.WorkFlowWorkOrderId;
                    }
                }
                return workOrder;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private WorkOrder WorkOrderFromReceivingCustomer(long receivingCustomerId)
        {
            try
            {
                WorkOrder workOrder = new WorkOrder();
                WorkOrderPartNumber workOrderPart = new WorkOrderPartNumber();

                workOrder.PartNumbers = new List<WorkOrderPartNumber>();
                workOrder.CustomerDetails = new CustomerDetails();


                if (receivingCustomerId > 0)
                {
                    var recevingCustomer = _appContext.ReceivingCustomerWork.Where(p => p.ReceivingCustomerWorkId == receivingCustomerId).FirstOrDefault();
                    var customer = _appContext.Customer.Where(p => p.CustomerId == recevingCustomer.CustomerId).FirstOrDefault();

                    workOrder.isRecCustomer = true;
                    workOrder.WorkOrderNum = "";
                    workOrder.ManagementStructureId =Convert.ToInt64(recevingCustomer.ManagementStructureId);
                    workOrder.WorkOrderTypeId = 1;
                    workOrder.IsSinglePN = true;
                    workOrder.WorkOrderStatusId = 1;
                    workOrder.OpenDate = DateTime.Now;
                    workOrder.CustomerId = recevingCustomer.CustomerId;
                    workOrder.EmployeeId = recevingCustomer.EmployeeId;
                    workOrder.ReceivingCustomerWorkId = receivingCustomerId;
                    workOrder.CustomerReference = workOrder.CustomerDetails.CustomerRef = recevingCustomer.Reference;
                    workOrder.CustomerDetails.CustomerName = customer.Name;
                    workOrder.CustomerDetails.CreditLimit = customer.CreditLimit;
                    workOrder.CustomerDetails.CreditTermsId = customer.CreditTermsId;
                    workOrder.CustomerDetails.CustomerId = recevingCustomer.CustomerId;
                    workOrder.CustomerDetails.CustomerName = customer.Name;
                    workOrder.CustomerDetails.CustomerEmail = customer.Email;
                    workOrder.CustomerDetails.CustomerPhone = customer.CustomerPhone;
                    workOrder.CustomerDetails.CSRId = customer.CsrId;
                    workOrder.CustomerDetails.CSRName = customer.CsrId == null ? "" : _appContext.Employee.Where(p => p.EmployeeId == customer.CsrId).Select(p => p.FirstName).FirstOrDefault();
                    workOrder.CSRName = workOrder.CustomerDetails.CSRName;

                    workOrder.CreditLimit = Convert.ToInt64(customer.CreditLimit);
                    workOrder.CreditTermsId = Convert.ToInt16(customer.CreditTermsId);

                    var partDetails = this.RecevingPartDetails(recevingCustomer.ReceivingCustomerWorkId);
                    if (partDetails != null)
                    {
                        workOrderPart.Condition = partDetails.Condition;
                        workOrderPart.SerialNumber = partDetails.SerialNumber;
                        workOrderPart.StockLineNumber = partDetails.StockLineNumber;
                        workOrderPart.Description = partDetails.PartDescription;
                        workOrderPart.PartNumber = partDetails.PartNumber;
                        workOrderPart.RevisedPartNo = partDetails.RevisedPartNo;
                        workOrderPart.ReceivingCustomerWorkId = partDetails.ReceivingCustomerWorkId;
                        workOrderPart.MasterPartId = recevingCustomer.ItemMasterId;
                        workOrderPart.ConditionId = recevingCustomer.ConditionId;
                        workOrderPart.StockLineId = Convert.ToInt64(recevingCustomer.StockLineId);
                        workOrderPart.EstimatedCompletionDate = DateTime.Now;
                        workOrderPart.EstimatedShipDate = DateTime.Now; ;
                        workOrderPart.CustomerRequestDate = DateTime.Now;
                        workOrderPart.PromisedDate = DateTime.Now;
                        workOrderPart.ReceivedDate = recevingCustomer.CreatedDate;
                    }

                    workOrder.PartNumbers.Add(workOrderPart);

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
                                       join ps in _appContext.Employee on c.PrimarySalesPersonId equals ps.EmployeeId into cps
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
                                           wo.ManagementStructureId,
                                           wo.Notes,
                                           wo.Memo,
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
                            join wos in _appContext.WorkOrderStage on wop.WorkOrderStageId equals wos.WorkOrderStageId
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
                            join stage in _appContext.WorkOrderStage on swo.StageId equals stage.WorkOrderStageId
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
                                WorkOrderStage = stage.Stage,
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
                            join stage in _appContext.WorkOrderStage on swo.StageId equals stage.WorkOrderStageId
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
                                Stage = stage.Stage,
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
                            join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId
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
                                WorkOrderStage = stage.Stage,
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
                            join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId
                            join pri in _appContext.Priority on wop.WorkOrderPriorityId equals pri.PriorityId
                            join sl in _appContext.StockLine on wop.MasterPartId equals sl.ItemMasterId into wopsl
                            from sl in wopsl.DefaultIfEmpty()
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
                                wop.WorkOrderScopeId,
                                StockLineNo= sl==null?"":sl.StockLineNumber
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
                            join ts in _appContext.Task on woc.TaskId equals ts.TaskId into wocts
                            from ts in wocts.DefaultIfEmpty()
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
                                WorkflowChargeTypeId = woc.ChargesTypeId,
                                TaskName = ts == null ? "" : ts.Description
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
                                           join ts in _appContext.Task on wa.TaskId equals ts.TaskId into wats
                                           from ts in wats.DefaultIfEmpty()
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
                                               wa.CheckInOutStatus,
                                               wa.TaskId,
                                               TaskName = ts == null ? "" : ts.Description
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
                                           join cb in _appContext.Employee on wa.CheckedInById equals cb.EmployeeId into wacb
                                           from cb in wacb.DefaultIfEmpty()
                                           join co in _appContext.Employee on wa.CheckedInById equals co.EmployeeId into waco
                                           from co in waco.DefaultIfEmpty()

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
                                               wa.CheckInOutStatus,
                                               CheckedInBy = cb == null ? "" : cb.FirstName + " " + cb.LastName,
                                               CheckedOutBy = co == null ? "" : co.FirstName + " " + co.LastName,
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
                                                   TaskName = task == null ? "" : task.Description,
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

        public WorkOrderDocuments CreateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments)
        {
            try
            {
                workOrderDocuments.CreatedDate = workOrderDocuments.UpdatedDate = DateTime.Now;
                workOrderDocuments.IsActive = true;
                workOrderDocuments.IsDeleted = false;
                _appContext.WorkOrderDocuments.Add(workOrderDocuments);
                _appContext.SaveChanges();
                return workOrderDocuments;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderDocuments UpdateWorkOrderDocuments(WorkOrderDocuments workOrderDocument)
        {
            try
            {
                workOrderDocument.UpdatedDate = DateTime.Now;
                workOrderDocument.IsActive = true;
                workOrderDocument.IsDeleted = false;

                _appContext.WorkOrderDocuments.Update(workOrderDocument);
                _appContext.SaveChanges();

                return workOrderDocument;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderDocumentsList(long wfwoId = 0, long workOrderId = 0)
        {
            try
            {
                var workOrderDocuments = (from wd in _appContext.WorkOrderDocuments
                                          where wd.IsDeleted == false && wd.WorkFlowWorkOrderId == wfwoId
                                          select new
                                          {
                                              wd.WorkOrderDocumentId,
                                              wd.AttachmentId,
                                              wd.Code,
                                              wd.Name,
                                              wd.Description,
                                              AttachmentDetails = _appContext.WorkOrderDocuments
                     .Join(_appContext.AttachmentDetails,
                           woDoc => woDoc.AttachmentId,
                           atd => atd.AttachmentId,
                           (woDoc, atd) => new
                           {
                               atd.AttachmentDetailId,
                               atd.AttachmentId,
                               atd.FileName,
                               atd.Link,
                               atd.FileSize,
                               atd.CreatedBy,
                               atd.CreatedDate,
                               atd.UpdatedBy,
                               atd.UpdatedDate,
                               atd.Description,
                               atd.IsActive,
                               atd.IsDeleted
                           }
                           ).Where(p => p.AttachmentId == wd.AttachmentId && p.IsActive == true && p.IsDeleted == false)
                                          }).Distinct()
                             .ToList();


                return workOrderDocuments;
            }

            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderDocuments GetWorkOrderDocumentsDetailById(long id)
        {
            try
            {
                WorkOrderDocuments workOrderDocument = new WorkOrderDocuments();
                workOrderDocument = _appContext.WorkOrderDocuments
                    .Where(p => p.IsDeleted == false && p.WorkOrderDocumentId == id)
                    .OrderByDescending(p => p.UpdatedDate)
                    .FirstOrDefault();
                return workOrderDocument;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteWorkOrderDocuments(long workOrderDocumentsId, string updatedBy)
        {
            try
            {
                WorkOrderDocuments workOrderDocument = new WorkOrderDocuments();
                workOrderDocument.WorkOrderDocumentId = workOrderDocumentsId;
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

        public void WorkOrderDocumentStatus(long workOrderDocumentsId,bool status, string updatedBy)
        {
            try
            {
                WorkOrderDocuments workOrderDocument = new WorkOrderDocuments();
                workOrderDocument.WorkOrderDocumentId = workOrderDocumentsId;
                workOrderDocument.UpdatedDate = DateTime.Now;
                workOrderDocument.IsActive = status;
                workOrderDocument.UpdatedBy = updatedBy;

                _appContext.WorkOrderDocuments.Attach(workOrderDocument);
                _appContext.Entry(workOrderDocument).Property(x => x.IsActive).IsModified = true;
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
                                              join ts in _appContext.Task on wom.TaskId equals ts.TaskId into womts
                                              from ts in womts.DefaultIfEmpty()
                                              where wom.IsDeleted == false && wom.WorkFlowWorkOrderId == wfwoId
                                              select new
                                              {
                                                  StockLineNumber = sl == null ? "" : sl.StockLineNumber,
                                                  im.PartNumber,
                                                  im.PartDescription,
                                                  AltPartNumber = pop == null ? "" : pop.AltPartNumber,
                                                  SerialNumber = sl == null ? "" : sl.SerialNumber,
                                                  Provision = p == null ? "" : p.Description,
                                                  Oem = im.PMA == true && im.DER == true ? "PMA&DER" : (im.PMA == true && im.DER == false ? "PMA" : (im.PMA == false && im.DER == true ? "DER" : "")),
                                                  Control = sl == null ? "" : sl.IdNumber,
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
                                                  Currency = cur == null ? "" : cur.DisplayName,
                                                  PurchaseOrderNumber = po == null ? "" : po.PurchaseOrderNumber,
                                                  RepairOrderNumber = ro == null ? "" : ro.RepairOrderNumber,
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
                                                  TimeLife = tl == null ? 0 : tl.TimeRemaining,
                                                  WareHouse = wh == null ? "" : wh.Name,
                                                  Location = lo == null ? "" : lo.Name,
                                                  Shelf = sh == null ? "" : sh.Name,
                                                  Bin = bi == null ? "" : bi.Name,
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
                                                  im.PurchaseUnitOfMeasureId,
                                                  wom.Memo,
                                                  wom.IsDeferred,
                                                  wom.TaskId,
                                                  TaskName = ts == null ? "" : ts.Description
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
                                      join emp in _appContext.Employee on wq.EmployeeId equals emp.EmployeeId into wqemp
                                      from emp in wqemp.DefaultIfEmpty()
                                      join sp in _appContext.Employee on wq.SalesPersonId equals sp.EmployeeId into wqsp
                                      from sp in wqsp.DefaultIfEmpty()
                                      join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on cust.CustomerId equals cc.CustomerId into custcc
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
                                          CustomerContact = con == null ? "" : con.FirstName,
                                          CustomerEmail = cust.Email,
                                          CustomerPhone = cust.CustomerPhone,
                                          //CustomerReference = cust.CSRName,
                                          CreditLimit = cust.CreditLimit,
                                          CreditTermId = ct == null ? 0 : ct.CreditTermsId,
                                          CreditTerm = ct == null ? "" : ct.Name,
                                          SalesPersonName = emp == null ? "" : sp.FirstName + ' ' + sp.LastName,
                                          EmployeeName = emp == null ? "" : emp.FirstName + ' ' + emp.LastName,
                                          wq.Warnings,
                                          wq.Memo,
                                          wq.AccountsReceivableBalance,
                                          BuildMethodId = qd == null ? 0 : qd.BuildMethodId,
                                          SelectedId = qd == null ? 0 : qd.SelectedId,
                                          ReferenceNo = qd == null ? "" : qd.ReferenceNo,
                                          wq.CustomerId,
                                          wq.EmployeeId,
                                          wq.SalesPersonId
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

        public object GetQuoteBuildMethodDetails(long workflowWorkorderId)
        {
            try
            {
                var data = (from qd in _appContext.WorkOrderQuoteDetails
                            join im in _appContext.ItemMaster on qd.ItemMasterId equals im.ItemMasterId
                            where qd.WorkflowWorkOrderId == workflowWorkorderId
                            select new
                            {
                                qd.ItemMasterId,
                                im.PartNumber,
                                BuildMethod = qd.BuildMethodId == 1 ? "WF" : (qd.BuildMethodId == 2 ? "WO" : (qd.BuildMethodId == 3 ? "WF" : "Third Party")),
                                qd.BuildMethodId,
                                qd.SelectedId,
                                qd.ReferenceNo,
                                qd.WorkOrderQuoteDetailsId,
                                qd.TaskId
                            }
                            ).FirstOrDefault();
                return data;
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
                quoteExclusions.UpdatedDate = DateTime.Now;
                if (quoteExclusions.WorkOrderQuoteDetailsId > 0)
                {
                    var exeExclusions = _appContext.WorkOrderQuoteExclusions.Where(p => p.WorkOrderQuoteDetailsId == quoteExclusions.WorkOrderQuoteDetailsId).AsNoTracking().ToList();
                    _appContext.WorkOrderQuoteExclusions.RemoveRange(exeExclusions);

                    quoteExclusions.WorkOrderQuoteExclusions = quoteExclusions.WorkOrderQuoteExclusions.Where(p => p.IsDeleted == false).ToList();
                    quoteExclusions.WorkOrderQuoteExclusions.ForEach(p => { p.WorkOrderQuoteExclusionsId = 0; p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; });

                    _appContext.WorkOrderQuoteDetails.Update(quoteExclusions);
                }
                else
                {
                    quoteExclusions.CreatedDate = DateTime.Now;
                    quoteExclusions.IsDeleted = false;
                    quoteExclusions.IsActive = true;
                    quoteExclusions.WorkOrderQuoteExclusions.ForEach(p => { p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; });
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

        public IEnumerable<object> GetWorkOrderQuoteExclusions(long workOrderQuoteDetailsId, long buildMethodId)
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
                                               join ts in _appContext.Task on we.TaskId equals ts.TaskId into wets
                                               from ts in wets.DefaultIfEmpty()
                                               where we.IsDeleted == false && we.WorkOrderQuoteDetailsId == workOrderQuoteDetailsId
                                               && wq.BuildMethodId == buildMethodId
                                               select new
                                               {
                                                   we.CreatedBy,
                                                   we.CreatedDate,
                                                   Epn = im.PartNumber,
                                                   EpnDescription = im.PartDescription,
                                                   we.ExstimtPercentOccuranceId,
                                                   ExstimtPercentOccurance = eo.Name == null ? "" : eo.Name,
                                                   we.ExtendedCost,
                                                   we.IsActive,
                                                   we.IsDeleted,
                                                   we.ItemMasterId,
                                                   we.MarkUpPercentageId,
                                                   MarkUpPercentage = mp == null ? 0 : mp.PercentValue,
                                                   we.MasterCompanyId,
                                                   we.Memo,
                                                   we.Quantity,
                                                   we.UnitCost,
                                                   we.UpdatedBy,
                                                   we.UpdatedDate,
                                                   we.WorkOrderQuoteDetailsId,
                                                   we.WorkOrderQuoteExclusionsId,
                                                   we.TaskId,
                                                   TaskName = ts == null ? "" : ts.Description,
                                                   we.MarkupFixedPrice,
                                                   we.HeaderMarkupId,
                                                   we.BillingMethodId,
                                                   we.BillingRate,
                                                   we.BillingAmount,
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
                quoteFreight.UpdatedDate = DateTime.Now;

                if (quoteFreight.WorkOrderQuoteDetailsId > 0)
                {
                    var exeCharges = _appContext.WorkOrderQuoteFreight.Where(p => p.WorkOrderQuoteDetailsId == quoteFreight.WorkOrderQuoteDetailsId).AsNoTracking().ToList();
                    _appContext.WorkOrderQuoteFreight.RemoveRange(exeCharges);

                    quoteFreight.WorkOrderQuoteFreight = quoteFreight.WorkOrderQuoteFreight.Where(p => p.IsDeleted == false).ToList();
                    quoteFreight.WorkOrderQuoteFreight.ForEach(p => { p.WorkOrderQuoteFreightId = 0; p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; });

                    _appContext.WorkOrderQuoteDetails.Update(quoteFreight);
                }
                else
                {
                    quoteFreight.CreatedDate = DateTime.Now;
                    quoteFreight.IsDeleted = false;
                    quoteFreight.IsActive = true;
                    quoteFreight.WorkOrderQuoteExclusions.ForEach(p => { p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; });
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

        public IEnumerable<object> GetWorkOrderQuoteFreight(long workOrderQuoteDetailsId, long buildMethodId)
        {
            try
            {
                var workOrderFreightList = (from wf in _appContext.WorkOrderQuoteFreight
                                            join wq in _appContext.WorkOrderQuoteDetails on wf.WorkOrderQuoteDetailsId equals wq.WorkOrderQuoteDetailsId
                                            join car in _appContext.Carrier on wf.CarrierId equals car.CarrierId
                                            //join sv in _appContext.ShippingVia on wf.ShipViaId equals sv.ShippingViaId
                                            join ts in _appContext.Task on wf.TaskId equals ts.TaskId into wets
                                            from ts in wets.DefaultIfEmpty()
                                            join woq in _appContext.WorkOrderQuote on wq.WorkOrderQuoteId equals woq.WorkOrderQuoteId
                                            where wf.IsDeleted == false && wf.WorkOrderQuoteDetailsId == workOrderQuoteDetailsId
                                            && wq.BuildMethodId == buildMethodId
                                            select new
                                            {
                                                wf.Amount,
                                                wf.CarrierId,
                                                wf.CreatedBy,
                                                wf.CreatedDate,
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
                                                ShipViaName = _appContext.CustomerShipping.Where(p => p.CustomerShippingId == wf.ShipViaId).Select(p => p.ShipVia).FirstOrDefault(),
                                                CarrierName = car.Description,
                                                wf.MarkupPercentageId,
                                                wf.TaskId,
                                                TaskName = ts == null ? "" : ts.Description,
                                                wf.HeaderMarkupId,
                                                wf.BillingMethodId,
                                                wf.BillingRate,
                                                wf.BillingAmount,
                                                wf.MarkupFixedPrice,

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
                quoteCharges.UpdatedDate = DateTime.Now;
                if (quoteCharges.WorkOrderQuoteDetailsId > 0)
                {
                    var exeCharges = _appContext.WorkOrderQuoteCharges.Where(p => p.WorkOrderQuoteDetailsId == quoteCharges.WorkOrderQuoteDetailsId).AsNoTracking().ToList();
                    _appContext.WorkOrderQuoteCharges.RemoveRange(exeCharges);

                    quoteCharges.WorkOrderQuoteCharges = quoteCharges.WorkOrderQuoteCharges.Where(p => p.IsDeleted == false).ToList();
                    quoteCharges.WorkOrderQuoteCharges.ForEach(p => { p.WorkOrderQuoteChargesId = 0; p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; });

                    quoteCharges.WorkOrderQuoteCharges.ForEach(p => p.WorkOrderQuoteChargesId = 0);
                    _appContext.WorkOrderQuoteDetails.Update(quoteCharges);
                }
                else
                {
                    quoteCharges.CreatedDate = DateTime.Now;
                    quoteCharges.IsDeleted = false;
                    quoteCharges.IsActive = true;
                    quoteCharges.WorkOrderQuoteCharges.ForEach(p => { p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; });
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

        public IEnumerable<object> GetWorkOrderQuoteCharges(long workOrderQuoteDetailsId, long buildMethodId)
        {
            try
            {
                var list = (from woc in _appContext.WorkOrderQuoteCharges
                            join wq in _appContext.WorkOrderQuoteDetails on woc.WorkOrderQuoteDetailsId equals wq.WorkOrderQuoteDetailsId
                            join ct in _appContext.ChargesTypes on woc.ChargesTypeId equals ct.Id
                            join v in _appContext.Vendor on woc.VendorId equals v.VendorId into wocv
                            from v in wocv.DefaultIfEmpty()
                            join ts in _appContext.Task on woc.TaskId equals ts.TaskId into wocts
                            from ts in wocts.DefaultIfEmpty()
                            where woc.IsDeleted == false && woc.WorkOrderQuoteDetailsId == workOrderQuoteDetailsId
                            && wq.BuildMethodId == buildMethodId
                            select new
                            {
                                woc.ChargesTypeId,
                                ChargeType = ct.Name,
                                woc.Description,
                                woc.Quantity,
                                woc.UnitCost,
                                woc.ExtendedCost,
                                woc.VendorId,
                                v.VendorName,
                                woc.CreatedBy,
                                woc.CreatedDate,
                                woc.IsActive,
                                woc.IsDeleted,
                                woc.MarkupPercentageId,
                                woc.MasterCompanyId,
                                woc.UpdatedBy,
                                woc.UpdatedDate,
                                woc.WorkOrderQuoteDetailsId,
                                woc.WorkOrderQuoteChargesId,
                                WorkflowChargeTypeId = woc.ChargesTypeId,
                                woc.TaskId,
                                TaskName = ts == null ? "" : ts.Description,
                                woc.MarkupFixedPrice,
                                woc.BillingMethodId,
                                woc.HeaderMarkupId,
                                woc.BillingRate,
                                woc.BillingAmount,
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
                quoteMaterials.UpdatedDate = DateTime.Now;
                if (quoteMaterials.WorkOrderQuoteDetailsId > 0)
                {
                    var exeMaterials = _appContext.WorkOrderQuoteMaterial.Where(p => p.WorkOrderQuoteDetailsId == quoteMaterials.WorkOrderQuoteDetailsId).AsNoTracking().ToList();
                    _appContext.WorkOrderQuoteMaterial.RemoveRange(exeMaterials);
                    quoteMaterials.WorkOrderQuoteMaterial = quoteMaterials.WorkOrderQuoteMaterial.Where(p => p.IsDeleted == false).ToList();
                    quoteMaterials.WorkOrderQuoteMaterial.ForEach(p => { p.WorkOrderQuoteMaterialId = 0; p.IsActive = true;p.IsDeleted = false;p.CreatedDate = DateTime.Now;p.UpdatedDate = DateTime.Now; });
                    _appContext.WorkOrderQuoteDetails.Update(quoteMaterials);
                }
                else
                {
                    quoteMaterials.CreatedDate = DateTime.Now;
                    quoteMaterials.IsDeleted = false;
                    quoteMaterials.IsActive = true;
                    quoteMaterials.WorkOrderQuoteMaterial.ForEach(p => { p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; });
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

        public IEnumerable<object> GetWorkOrderQuoteMaterial(long workOrderQuoteDetailsId, long buildMethodId)
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
                                              join ts in _appContext.Task on wom.TaskId equals ts.TaskId into womts
                                              from ts in womts.DefaultIfEmpty()
                                              where wom.IsDeleted == false && wom.WorkOrderQuoteDetailsId == workOrderQuoteDetailsId
                                              && wq.BuildMethodId == buildMethodId
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
                                                  wom.WorkOrderQuoteDetailsId,
                                                  wom.WorkOrderQuoteMaterialId,
                                                  wom.ItemClassificationId,
                                                  wom.ItemMasterId,
                                                  wom.TaskId,
                                                  TaskName = ts == null ? "" : ts.Description,
                                                  wom.MarkupFixedPrice,
                                                  wom.BillingMethodId,
                                                  wom.HeaderMarkupId,
                                                  wom.ExtendedCost,
                                                  wom.BillingRate,
                                                  wom.BillingAmount,
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
                quoteLabor.UpdatedDate = DateTime.Now;
                if (quoteLabor.WorkOrderQuoteDetailsId > 0)
                {
                    var exelabourHeader = _appContext.WorkOrderQuoteLaborHeader.Where(p => p.WorkOrderQuoteDetailsId == quoteLabor.WorkOrderQuoteDetailsId).AsNoTracking().FirstOrDefault();
                    if (exelabourHeader != null)
                    {
                        var exelabour = _appContext.WorkOrderQuoteLabor.Where(p => p.WorkOrderQuoteLaborHeaderId == exelabourHeader.WorkOrderQuoteLaborHeaderId).AsNoTracking().ToList();
                        _appContext.WorkOrderQuoteLabor.RemoveRange(exelabour);
                        _appContext.WorkOrderQuoteLaborHeader.Remove(exelabourHeader);
                    }

                    if (quoteLabor.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor != null)
                    {
                        quoteLabor.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor.ForEach(p => { p.WorkOrderQuoteLaborId = 0; p.WorkOrderQuoteLaborHeaderId = 0; p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; });
                        quoteLabor.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor = quoteLabor.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor.Where(p => p.IsDeleted == false).ToList();
                    }

                    quoteLabor.WorkOrderQuoteLaborHeader.WorkOrderQuoteDetailsId = quoteLabor.WorkOrderQuoteDetailsId;
                    quoteLabor.WorkOrderQuoteLaborHeader.WorkOrderQuoteLaborHeaderId = 0;
                    quoteLabor.WorkOrderQuoteLaborHeader.IsActive = true;
                    quoteLabor.WorkOrderQuoteLaborHeader.IsDeleted = false;
                    quoteLabor.WorkOrderQuoteLaborHeader.CreatedDate = quoteLabor.WorkOrderQuoteLaborHeader.UpdatedDate = DateTime.Now;

                    _appContext.WorkOrderQuoteLaborHeader.Add(quoteLabor.WorkOrderQuoteLaborHeader);
                }
                else
                {
                    quoteLabor.CreatedDate = DateTime.Now;
                    quoteLabor.IsDeleted = false;
                    quoteLabor.IsActive = true;
                    quoteLabor.WorkOrderQuoteLaborHeader.IsActive = true;
                    quoteLabor.WorkOrderQuoteLaborHeader.IsDeleted = false;
                    if (quoteLabor.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor != null)
                    {
                        quoteLabor.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor.ForEach(p => { p.WorkOrderQuoteLaborId = 0; p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; });
                        quoteLabor.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor = quoteLabor.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor.Where(p => p.IsDeleted == false).ToList();
                    }
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

        public object GetWorkOrderQuoteLabor(long workOrderQuoteDetailsId, long buildMethodId)
        {
            try
            {
                var laborList = (from lh in _appContext.WorkOrderQuoteLaborHeader
                                 join wq in _appContext.WorkOrderQuoteDetails on lh.WorkOrderQuoteDetailsId equals wq.WorkOrderQuoteDetailsId
                                 join l in _appContext.WorkOrderQuoteLabor on lh.WorkOrderQuoteLaborHeaderId equals l.WorkOrderQuoteLaborHeaderId
                                 join deby in _appContext.Employee on lh.DataEnteredBy equals deby.EmployeeId into lhdeby
                                 from deby in lhdeby.DefaultIfEmpty()
                                 where lh.IsDeleted == false && lh.WorkOrderQuoteDetailsId == workOrderQuoteDetailsId
                                 && wq.BuildMethodId == buildMethodId
                                 select new
                                 {
                                     lh.CreatedBy,
                                     lh.CreatedDate,
                                     lh.DataEnteredBy,
                                     lh.IsActive,
                                     lh.IsDeleted,
                                     lh.MasterCompanyId,
                                     lh.UpdatedBy,
                                     lh.UpdatedDate,
                                     lh.WorkOrderQuoteDetailsId,
                                     lh.WorkOrderQuoteLaborHeaderId,
                                     DataEnteredByName = deby.FirstName,
                                     lh.MarkupFixedPrice,
                                     lh.HeaderMarkupId,
                                     LaborList = (from wol in _appContext.WorkOrderQuoteLabor
                                                  join exp in _appContext.ExpertiseType on wol.ExpertiseId equals exp.ExpertiseTypeId into wolexp
                                                  from exp in wolexp.DefaultIfEmpty()

                                                  join task in _appContext.Task.Where(p => p.IsActive == true && p.IsDelete == false) on wol.TaskId equals task.TaskId into woltask
                                                  from task in woltask.DefaultIfEmpty()
                                                  where wol.WorkOrderQuoteLaborHeaderId == lh.WorkOrderQuoteLaborHeaderId && wol.IsDeleted == false
                                                  select new
                                                  {
                                                      wol.BillableId,
                                                      wol.CreatedBy,
                                                      wol.CreatedDate,
                                                      wol.ExpertiseId,
                                                      Expertise = exp.Description,
                                                      wol.Hours,
                                                      wol.IsActive,
                                                      wol.IsDeleted,
                                                      wol.TaskId,
                                                      Task = task.Description,
                                                      wol.UpdatedBy,
                                                      wol.UpdatedDate,
                                                      wol.WorkOrderQuoteLaborHeaderId,
                                                      wol.WorkOrderQuoteLaborId,
                                                      wol.DirectLaborOHCost,
                                                      wol.MarkupPercentageId,
                                                      wol.BurdenRateAmount,
                                                      wol.TotalCostPerHour,
                                                      wol.TotalCost,
                                                      wol.BillingMethodId,
                                                      wol.BillingRate,
                                                      wol.BillingAmount
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



        public IEnumerable<object> WorkOrderQuoteList(Common.Filters<WOQuoteFilters> woQuoteFilters)
        {

            if (woQuoteFilters.filters == null)
                woQuoteFilters.filters = new WOQuoteFilters();
            var pageNumber = woQuoteFilters.first + 1;
            var pageSize = woQuoteFilters.rows;

            string sortColumn = string.Empty;

            var sorts = new Sorts<WOQuoteFilters>();
            var filters = new EntityFrameworkPaginate.Filters<WOQuoteFilters>();

            short statusId = 0;

            var open = "open";
            var canceled = "canceled";
            var closed = "closed";
            var all = "all";

            if (!string.IsNullOrEmpty(woQuoteFilters.filters.quoteStatus))
            {
                if (open.Contains(woQuoteFilters.filters.quoteStatus.ToLower()))
                {
                    statusId = 1;
                }
                else if (canceled.Contains(woQuoteFilters.filters.quoteStatus.ToLower()))
                {
                    statusId = 3;
                }

                else if (closed.Contains(woQuoteFilters.filters.quoteStatus.ToLower()))
                {
                    statusId = 2;
                }
                else if (all.Contains(woQuoteFilters.filters.quoteStatus.ToLower()))
                {
                    statusId = 0;
                }
            }

            if (string.IsNullOrEmpty(woQuoteFilters.SortField))
            {
                sortColumn = "createdDate";
                woQuoteFilters.SortOrder = -1;
                sorts.Add(sortColumn == "createdDate", x => x.createdDate, true);
            }
            else
            {
                sortColumn = woQuoteFilters.SortField;
            }

            var propertyInfo = typeof(WOQuoteFilters).GetProperty(sortColumn);

            if (woQuoteFilters.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }

            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.quoteNumber), x => x.quoteNumber.Contains(woQuoteFilters.filters.quoteNumber));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.workOrderNum), x => x.workOrderNum.Contains(woQuoteFilters.filters.workOrderNum));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.customerName), x => x.customerName.Contains(woQuoteFilters.filters.customerName));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.customerCode), x => x.customerCode.Contains(woQuoteFilters.filters.customerCode));
            filters.Add(woQuoteFilters.filters.openDate != null, x => x.openDate == woQuoteFilters.filters.openDate);
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.promisedDate), x => x.promisedDate.Contains(woQuoteFilters.filters.promisedDate));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.estCompletionDate), x => x.estCompletionDate.Contains(woQuoteFilters.filters.estCompletionDate));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.estShipDate), x => x.estShipDate.Contains(woQuoteFilters.filters.estShipDate));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.estShipDate), x => x.estShipDate.Contains(woQuoteFilters.filters.estShipDate));
            filters.Add(statusId > 0, x => x.quoteStatusId == statusId);


            try
            {

                var totalRecords = (from woq in _appContext.WorkOrderQuote
                                    join wo in _appContext.WorkOrder on woq.WorkOrderId equals wo.WorkOrderId
                                    join wop in _appContext.WorkOrderPartNumber on woq.WorkOrderId equals wop.WorkOrderId
                                    join wqs in _appContext.WorkOrderStatus on woq.QuoteStatusId equals wqs.Id
                                    join cust in _appContext.Customer on woq.CustomerId equals cust.CustomerId
                                    where woq.IsDeleted == false
                                    select new WOQuoteFilters()
                                    {
                                        WorkOrderQuoteId = woq.WorkOrderQuoteId,
                                        WorkOrderId = wo.WorkOrderId,
                                        quoteNumber = woq.QuoteNumber,
                                        workOrderNum = wo.WorkOrderNum,
                                        customerName = cust.Name,
                                        customerCode = cust.CustomerCode,
                                        openDate = woq.OpenDate,

                                        promisedDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.PromisedDate.Date)),


                                        estShipDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedShipDate.Date)),


                                        estCompletionDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedCompletionDate.Date)),

                                        quoteStatus = wqs.Description,
                                        quoteStatusId = woq.QuoteStatusId,
                                        isActive = woq.IsActive,
                                        createdDate = woq.CreatedDate,
                                    }).Distinct()
                            .Paginate(pageNumber, pageSize, sorts, filters).RecordCount;

                var list = (from woq in _appContext.WorkOrderQuote
                            join wo in _appContext.WorkOrder on woq.WorkOrderId equals wo.WorkOrderId
                            join wop in _appContext.WorkOrderPartNumber on woq.WorkOrderId equals wop.WorkOrderId
                            join wqs in _appContext.WorkOrderStatus on woq.QuoteStatusId equals wqs.Id
                            join cust in _appContext.Customer on woq.CustomerId equals cust.CustomerId
                            where woq.IsDeleted == false
                            select new WOQuoteFilters()
                            {
                                WorkOrderQuoteId = woq.WorkOrderQuoteId,
                                WorkOrderId = wo.WorkOrderId,
                                quoteNumber = woq.QuoteNumber,
                                workOrderNum = wo.WorkOrderNum,
                                customerName = cust.Name,
                                customerCode = cust.CustomerCode,
                                openDate = woq.OpenDate,

                                promisedDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.PromisedDate.Date)),


                                estShipDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedShipDate.Date)),


                                estCompletionDate = string.Join(",", _appContext.WorkOrderPartNumber
                                                              .Where(p => p.WorkOrderId == wo.WorkOrderId)
                                                              .Select(p => p.EstimatedCompletionDate.Date)),

                                quoteStatus = wqs.Description,
                                quoteStatusId = woq.QuoteStatusId,
                                isActive = woq.IsActive,
                                createdDate = woq.CreatedDate,
                                totalRecords = totalRecords

                            }).Distinct()
                            .Paginate(pageNumber, pageSize, sorts, filters).Results; ;

                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object WorkOrderQuoteView(long workOrderQuoteId)
        {
            try
            {

                var data = (from woq in _appContext.WorkOrderQuote
                            join wo in _appContext.WorkOrder on woq.WorkOrderId equals wo.WorkOrderId
                            join wop in _appContext.WorkOrderPartNumber on woq.WorkOrderId equals wop.WorkOrderId
                            join wqs in _appContext.WorkOrderStatus on woq.QuoteStatusId equals wqs.Id
                            join cust in _appContext.Customer on woq.CustomerId equals cust.CustomerId
                            join cur in _appContext.Currency on woq.CurrencyId equals cur.CurrencyId
                            join ct in _appContext.CreditTerms on cust.CreditTermsId equals ct.CreditTermsId into custct
                            from ct in custct.DefaultIfEmpty()
                            join sp in _appContext.Employee on wo.SalesPersonId equals sp.EmployeeId into wosp
                            from sp in wosp.DefaultIfEmpty()
                            join csr in _appContext.Employee on cust.PrimarySalesPersonId equals csr.EmployeeId into custcsr
                            from csr in custcsr.DefaultIfEmpty()
                            join emp in _appContext.Employee on wo.EmployeeId equals emp.EmployeeId into woemp
                            from emp in woemp.DefaultIfEmpty()
                            join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on cust.CustomerId equals cc.CustomerId into custcc
                            from cc in custcc.DefaultIfEmpty()
                            join con in _appContext.Contact on cc.ContactId equals con.ContactId into cccon
                            from con in cccon.DefaultIfEmpty()
                            where woq.IsDeleted == false && woq.WorkOrderQuoteId == workOrderQuoteId
                            select new
                            {
                                woq.WorkOrderQuoteId,
                                wo.WorkOrderId,
                                woq.QuoteNumber,
                                woq.OpenDate,
                                woq.QuoteDueDate,
                                woq.ValidForDays,
                                woq.ExpirationDate,
                                QuoteStatus = wqs.Description,
                                wo.WorkOrderNum,
                                CustomerName = cust.Name,
                                CustomerCode = cust.CustomerCode,
                                CustomerContact = con == null ? "" : con.FirstName,
                                CustomerEmail = cust.Email,
                                cust.CustomerPhone,
                                CustomerRef = cust.ContractReference,
                                ARBalance = woq.AccountsReceivableBalance,
                                cust.CreditLimit,
                                CreditTerms = ct == null ? "" : ct.Name,
                                SalesPerson = sp == null ? "" : sp.FirstName,
                                CSR = csr == null ? "" : csr.FirstName,
                                Employee = emp == null ? "" : emp.FirstName,
                                Currency = cur.Symbol,
                                woq.DSO,
                                woq.Warnings,
                                woq.Memo

                            }).Distinct().FirstOrDefault();


                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> HistoricalWorkOrderQuotes(Common.Filters<WOQuoteFilters> woQuoteFilters)
        {

            if (woQuoteFilters.filters == null)
                woQuoteFilters.filters = new WOQuoteFilters();
            var pageNumber = woQuoteFilters.first + 1;
            var pageSize = woQuoteFilters.rows;

            string sortColumn = string.Empty;

            var sorts = new Sorts<WOQuoteFilters>();
            var filters = new EntityFrameworkPaginate.Filters<WOQuoteFilters>();



            if (string.IsNullOrEmpty(woQuoteFilters.SortField))
            {
                sortColumn = "createdDate";
                woQuoteFilters.SortOrder = -1;
                sorts.Add(sortColumn == "createdDate", x => x.createdDate, true);
            }
            else
            {
                sortColumn = woQuoteFilters.SortField;
            }

            var propertyInfo = typeof(WOQuoteFilters).GetProperty(sortColumn);

            if (woQuoteFilters.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }

            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.quoteNumber), x => x.quoteNumber.Contains(woQuoteFilters.filters.quoteNumber));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.workOrderNum), x => x.workOrderNum.Contains(woQuoteFilters.filters.workOrderNum));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.customerName), x => x.customerName.Contains(woQuoteFilters.filters.customerName));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.customerCode), x => x.customerCode.Contains(woQuoteFilters.filters.customerCode));
            filters.Add(woQuoteFilters.filters.openDate != null, x => x.openDate == woQuoteFilters.filters.openDate);
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.promisedDate), x => x.promisedDate.Contains(woQuoteFilters.filters.promisedDate));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.estCompletionDate), x => x.estCompletionDate.Contains(woQuoteFilters.filters.estCompletionDate));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.estShipDate), x => x.estShipDate.Contains(woQuoteFilters.filters.estShipDate));
            filters.Add(!string.IsNullOrEmpty(woQuoteFilters.filters.estShipDate), x => x.estShipDate.Contains(woQuoteFilters.filters.estShipDate));
            filters.Add(woQuoteFilters.filters.StatusId != null && woQuoteFilters.filters.StatusId == 1, x => x.CusomerId == woQuoteFilters.filters.CusomerId);
            filters.Add(woQuoteFilters.filters.ItemMasterId != null && woQuoteFilters.filters.ItemMasterId > 0, x => x.ItemMasterId == woQuoteFilters.filters.ItemMasterId);
            filters.Add(woQuoteFilters.filters.WorkScopeId != null && woQuoteFilters.filters.WorkScopeId > 0, x => x.WorkScopeId == woQuoteFilters.filters.WorkScopeId);

            try
            {

                var totalRecords = (from woq in _appContext.WorkOrderQuote
                                    join wo in _appContext.WorkOrder on woq.WorkOrderId equals wo.WorkOrderId
                                    join wop in _appContext.WorkOrderPartNumber on woq.WorkOrderId equals wop.WorkOrderId
                                    join wqs in _appContext.WorkOrderStatus on woq.QuoteStatusId equals wqs.Id
                                    join cust in _appContext.Customer on woq.CustomerId equals cust.CustomerId
                                    where woq.IsDeleted == false
                                    select new WOQuoteFilters()
                                    {
                                        WorkOrderQuoteId = woq.WorkOrderQuoteId,
                                        WorkOrderId = wo.WorkOrderId,
                                        quoteNumber = woq.QuoteNumber,
                                        workOrderNum = wo.WorkOrderNum,
                                        customerName = cust.Name,
                                        customerCode = cust.CustomerCode,
                                        openDate = woq.OpenDate,
                                        promisedDate = wop.PromisedDate.ToString(),
                                        estShipDate = wop.PromisedDate.ToString(),
                                        estCompletionDate = wop.EstimatedCompletionDate.Date.ToString(),
                                        quoteStatus = wqs.Description,
                                        quoteStatusId = woq.QuoteStatusId,
                                        isActive = woq.IsActive,
                                        createdDate = woq.CreatedDate,
                                        CusomerId = woq.CustomerId,
                                        ItemMasterId = wop.MasterPartId,
                                        WorkScopeId = wop.WorkOrderScopeId,
                                    }).Distinct()
                            .Paginate(pageNumber, pageSize, sorts, filters).RecordCount;

                var list = (from woq in _appContext.WorkOrderQuote
                            join wo in _appContext.WorkOrder on woq.WorkOrderId equals wo.WorkOrderId
                            join wop in _appContext.WorkOrderPartNumber on woq.WorkOrderId equals wop.WorkOrderId
                            join wqs in _appContext.WorkOrderStatus on woq.QuoteStatusId equals wqs.Id
                            join cust in _appContext.Customer on woq.CustomerId equals cust.CustomerId
                            where woq.IsDeleted == false
                            select new WOQuoteFilters()
                            {
                                WorkOrderQuoteId = woq.WorkOrderQuoteId,
                                WorkOrderId = wo.WorkOrderId,
                                quoteNumber = woq.QuoteNumber,
                                workOrderNum = wo.WorkOrderNum,
                                customerName = cust.Name,
                                customerCode = cust.CustomerCode,
                                openDate = woq.OpenDate,
                                promisedDate = wop.PromisedDate.ToString(),
                                estShipDate = wop.PromisedDate.ToString(),
                                estCompletionDate = wop.EstimatedCompletionDate.Date.ToString(),
                                quoteStatus = wqs.Description,
                                quoteStatusId = woq.QuoteStatusId,
                                isActive = woq.IsActive,
                                createdDate = woq.CreatedDate,
                                CusomerId = woq.CustomerId,
                                ItemMasterId = wop.MasterPartId,
                                WorkScopeId = wop.WorkOrderScopeId,
                                totalRecords = totalRecords

                            }).Distinct()
                            .Paginate(pageNumber, pageSize, sorts, filters).Results; ;

                return list;
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
                                            join ts in _appContext.Task on wf.TaskId equals ts.TaskId into wfts
                                            from ts in wfts.DefaultIfEmpty()
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
                                                CarrierName = car.Description,
                                                wf.TaskId,
                                                TaskName = ts == null ? "" : ts.Description
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
                            join ps in _appContext.Employee on cust.PrimarySalesPersonId equals ps.EmployeeId into custps
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

        #region Teardown

        public WorkOrderTeardown CreateTeardown(WorkOrderTeardown tearDown)
        {
            try
            {
                tearDown.UpdatedDate = DateTime.Now;
                tearDown.IsActive = true;
                tearDown.IsDeleted = false;
                if (tearDown.WorkFlowWorkOrderId > 0)
                {
                    _appContext.WorkOrderTeardown.Update(tearDown);
                }
                else
                {
                    tearDown.CreatedDate = DateTime.Now;
                    _appContext.WorkOrderTeardown.Add(tearDown);
                }
                _appContext.SaveChanges();
                return tearDown;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderTeardown GetWorkOrderTeardown(long wowfId)
        {
            try
            {
                WorkOrderTeardown teardown = new WorkOrderTeardown();
                teardown = _appContext.WorkOrderTeardown.Where(p => p.WorkFlowWorkOrderId == wowfId).FirstOrDefault();
                if (teardown != null)
                {
                    teardown.WorkOrderAdditionalComments = _appContext.WorkOrderAdditionalComments.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderBulletinsModification = _appContext.WorkOrderBulletinsModification.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderDiscovery = _appContext.WorkOrderDiscovery.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderFinalInspection = _appContext.WorkOrderFinalInspection.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderFinalTest = _appContext.WorkOrderFinalTest.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderPmaDerBulletins = _appContext.WorkOrderPmaDerBulletins.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderPreAssemblyInspection = _appContext.WorkOrderPreAssemblyInspection.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderPreAssmentResults = _appContext.WorkOrderPreAssmentResults.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderPreliinaryReview = _appContext.WorkOrderPreliinaryReview.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderRemovalReasons = _appContext.WorkOrderRemovalReasons.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderTestDataUsed = _appContext.WorkOrderTestDataUsed.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();
                    teardown.WorkOrderWorkPerformed = _appContext.WorkOrderWorkPerformed.Where(p => p.WorkOrderTeardownId == teardown.WorkOrderTeardownId).FirstOrDefault();

                }
                return teardown;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public object WorkOrderTeardownView(long wowfId)
        {
            try
            {
                var data = (from td in _appContext.WorkOrderTeardown
                            join ac in _appContext.WorkOrderAdditionalComments on td.WorkOrderTeardownId equals ac.WorkOrderTeardownId
                            join bm in _appContext.WorkOrderBulletinsModification on td.WorkOrderTeardownId equals bm.WorkOrderTeardownId
                            join wd in _appContext.WorkOrderDiscovery on td.WorkOrderTeardownId equals wd.WorkOrderTeardownId
                            join wf in _appContext.WorkOrderFinalInspection on td.WorkOrderTeardownId equals wf.WorkOrderTeardownId
                            join ft in _appContext.WorkOrderFinalTest on td.WorkOrderTeardownId equals ft.WorkOrderTeardownId
                            join pd in _appContext.WorkOrderPmaDerBulletins on td.WorkOrderTeardownId equals pd.WorkOrderTeardownId
                            join pa in _appContext.WorkOrderPreAssemblyInspection on td.WorkOrderTeardownId equals pa.WorkOrderTeardownId
                            join par in _appContext.WorkOrderPreAssmentResults on td.WorkOrderTeardownId equals par.WorkOrderTeardownId
                            join pr in _appContext.WorkOrderPreliinaryReview on td.WorkOrderTeardownId equals pr.WorkOrderTeardownId
                            join rr in _appContext.WorkOrderRemovalReasons on td.WorkOrderTeardownId equals rr.WorkOrderTeardownId
                            join tdu in _appContext.WorkOrderTestDataUsed on td.WorkOrderTeardownId equals tdu.WorkOrderTeardownId
                            join wp in _appContext.WorkOrderWorkPerformed on td.WorkOrderTeardownId equals wp.WorkOrderTeardownId

                            join wdt in _appContext.Employee on wd.TechnicianId equals wdt.EmployeeId into wdwdt
                            from wdt in wdwdt.DefaultIfEmpty()
                            join wdi in _appContext.Employee on wd.InspectorId equals wdi.EmployeeId into wdwdi
                            from wdi in wdwdi.DefaultIfEmpty()

                            join wfi in _appContext.Employee on wf.InspectorId equals wfi.EmployeeId into wfwfi
                            from wfi in wfwfi.DefaultIfEmpty()

                            join ftt in _appContext.Employee on ft.TechnicianId equals ftt.EmployeeId into ftts
                            from ftt in ftts.DefaultIfEmpty()
                            join ftti in _appContext.Employee on ft.InspectorId equals ftti.EmployeeId into fttis
                            from ftti in fttis.DefaultIfEmpty()

                            join pai in _appContext.Employee on pa.TechnicianId equals pai.EmployeeId into papai
                            from pai in papai.DefaultIfEmpty()
                            join pat in _appContext.Employee on pa.InspectorId equals pat.EmployeeId into papat
                            from pat in papat.DefaultIfEmpty()

                            join pari in _appContext.Employee on par.TechnicianId equals pari.EmployeeId into parpari
                            from pari in parpari.DefaultIfEmpty()
                            join part in _appContext.Employee on par.InspectorId equals part.EmployeeId into parpart
                            from part in parpart.DefaultIfEmpty()

                            join pri in _appContext.Employee on pr.InspectorId equals pri.EmployeeId into parpri
                            from pri in parpri.DefaultIfEmpty()

                            join wpi in _appContext.Employee on wp.TechnicianId equals wpi.EmployeeId into wpwpi
                            from wpi in wpwpi.DefaultIfEmpty()
                            join wpt in _appContext.Employee on wp.InspectorId equals wpt.EmployeeId into wpwpt
                            from wpt in wpwpt.DefaultIfEmpty()


                            where td.WorkFlowWorkOrderId == wowfId
                            select new
                            {

                                DiscoveryTechnician = wdt == null ? "" : wdt.FirstName + " " + wdt.LastName,
                                DiscoveryInspector = wdi == null ? "" : wdi.FirstName + " " + wdi.LastName,
                                FinalInspectionInspector = wfi == null ? "" : wfi.FirstName + " " + wfi.LastName,
                                FinalTestTechnician = ftt == null ? "" : ftt.FirstName + " " + ftt.LastName,
                                FinalTestInspector = ftti == null ? "" : ftti.FirstName + " " + ftti.LastName,
                                AssemblyInspectionTechnician = pat == null ? "" : pat.FirstName + " " + pat.LastName,
                                AssemblyInspectionInspector = pai == null ? "" : pai.FirstName + " " + pai.LastName,
                                AssmentResultsTechnician = part == null ? "" : part.FirstName + " " + part.LastName,
                                AssmentResultsInspector = pari == null ? "" : pari.FirstName + " " + pari.LastName,
                                PreliinaryReviewInspector = pri == null ? "" : pri.FirstName + " " + pri.LastName,
                                WorkPerformedTechnician = wpt == null ? "" : wpt.FirstName + " " + wpt.LastName,
                                WorkPerformedInspector = wpi == null ? "" : wpi.FirstName + " " + pari.LastName,
                                AdditionalCommentsMemo = ac.Memo,
                                BulletinsModificationMemo = bm.Memo,
                                DiscoveryManualEntry = wd.ManualEntry,
                                DiscoveryMemo = wd.Memo,
                                DiscoveryTechnicianDate = wd.TechnicianDate,
                                DiscoveryInspectorDate = wd.InspectorDate,
                                FinalInspectionMemo = wf.Memo,
                                FinalInspectionInspectorDate = wf.InspectorDate,
                                FinalTestMemo = ft.Memo,
                                FinalTestInspectorDate = ft.InspectorDate,
                                FinalTestTechnicianDate = ft.TechnicianDate,
                                pd.DERRepairs,
                                pd.MandatoryService,
                                pd.ManualEntry,
                                pd.PMAParts,
                                pd.RequestedService,
                                pd.ServiceLetters,
                                AssmentResultsManualEntry = par.ManualEntry,
                                AssmentResultsMemo = par.Memo,
                                AssmentResultsTechnicianDate = par.TechnicianDate,
                                AssmentResultsInspectorDate = par.InspectorDate,
                                PreliinaryReviewMemo = pr.Memo,
                                PreliinaryReviewInspectorDate = pr.InspectorDate,
                                RemovalReasonsManualEntry = rr.ManualEntry,
                                RemovalReasonsMemo = rr.Memo,
                                DataUsedMemo = tdu.Memo,
                                WorkPerformedManualEntry = wp.ManualEntry,
                                WorkPerformedMemo = wp.Memo,
                                WorkPerformedTechnicianDate = wp.TechnicianDate,
                                WorkPerformedInspectorDate = wp.InspectorDate,

                            }).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }

        }

        #endregion

        #region Analysis

        public object WorkOrderAnalysis(long workOrderId)
        {
            var data = (from wo in _appContext.WorkOrder
                        join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                        join woq in _appContext.WorkOrderQuote on wo.WorkOrderId equals woq.WorkOrderId
                        join wqd in _appContext.WorkOrderQuoteDetails on woq.WorkOrderQuoteId equals wqd.WorkOrderQuoteId
                        join wom in _appContext.WorkOrderQuoteMaterial on wqd.WorkOrderQuoteDetailsId equals wom.WorkOrderQuoteDetailsId
                        join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                        join rp in _appContext.ItemMaster on wop.RevisedPartId equals rp.ItemMasterId into woprp
                        from rp in woprp.DefaultIfEmpty()
                        where wom.IsDeleted == false && wo.WorkOrderId == workOrderId
                        group wom by new { wom.Quantity, wom.UnitCost, ExtendedCost = (wom.Quantity * wom.UnitCost), im.PartNumber, im.PartDescription, RevisedPartNo = rp.PartNumber } into list
                        select new
                        {
                            list.Key.PartNumber,
                            list.Key.PartDescription,
                            list.Key.RevisedPartNo,
                            MaterialCost = list.Sum(s => s.ExtendedCost)
                        }).FirstOrDefault();
            return data;
        }

        #endregion

        #region Work Order Settings

        public WorkOrderSettings CreateWorkOrderSettings(WorkOrderSettings workOrderSettings)
        {
            try
            {
                workOrderSettings.UpdatedDate = DateTime.Now;
                workOrderSettings.IsActive = true;
                workOrderSettings.IsDeleted = false;
                if(workOrderSettings.WorkOrderSettingId>0)
                {
                    _appContext.WorkOrderSettings.Update(workOrderSettings);
                }
                else
                {
                    workOrderSettings.CreatedDate = DateTime.Now;
                    _appContext.WorkOrderSettings.Add(workOrderSettings);
                }
                _appContext.SaveChanges();
                return workOrderSettings;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public WorkOrderSettings GetWorkOrderSettings(int masterCompanyId,int? workOrderTypeId)
        {
            try
            {
                if (workOrderTypeId != null && workOrderTypeId > 0)
                {
                    return _appContext.WorkOrderSettings.Where(p => p.MasterCompanyId == masterCompanyId
                    && p.WorkOrderTypeId == workOrderTypeId).FirstOrDefault();
                }
                else
                {
                    return _appContext.WorkOrderSettings.Where(p => p.MasterCompanyId == masterCompanyId).FirstOrDefault();
                }
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

        //public IEnumerable<object> GetWorkOrderNos(long customerId)
        //{
        //    try
        //    {

        //        var workOrderNos = (from wo in _appContext.WorkOrder
        //                            join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
        //                            join c in _appContext.Customer on wo.CustomerId equals c.CustomerId
        //                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
        //                            join ws in _appContext.WorkScope on wop.WorkOrderScopeId equals ws.WorkScopeId
        //                            join wowf in _appContext.WorkOrderWorkFlow on wo.WorkOrderId equals wowf.WorkOrderId

        //                            where wo.IsDeleted == false && wo.IsActive == true
        //                                  && wo.CustomerId == customerId
        //                             && wo.WorkOrderStatusId == 2 //Closed
        //                            select new
        //                            {
        //                                wo.WorkOrderNum,
        //                                wo.WorkOrderId,
        //                                WorkOrderPartNumberId = wop.ID,
        //                                wowf.WorkFlowWorkOrderId,
        //                                CustomerName = c.Name,
        //                                im.PartNumber,
        //                                im.PartDescription,
        //                                WorkScope = ws.Description,

        //                            }).Distinct().ToList();

        //        return workOrderNos;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        public IEnumerable<object> GetHistoricalWorkOrders(Common.Filters<HistoricalWOFilter> woFilters)
        {
            if (woFilters.filters == null)
                woFilters.filters = new HistoricalWOFilter();
            var pageNumber = woFilters.first + 1;
            var pageSize = woFilters.rows;


            string sortColumn = string.Empty;

            int totalRecords = 0;
            var sorts = new Sorts<HistoricalWOFilter>();
            var filters = new EntityFrameworkPaginate.Filters<HistoricalWOFilter>();

            if (string.IsNullOrEmpty(woFilters.SortField))
            {
                sortColumn = "createdDate";
                woFilters.SortOrder = -1;
                sorts.Add(sortColumn == "createdDate", x => x.createdDate, true);
            }
            else
            {
                sortColumn = woFilters.SortField;
            }

            var propertyInfo = typeof(HistoricalWOFilter).GetProperty(sortColumn);

            if (woFilters.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }

            filters.Add(!string.IsNullOrEmpty(woFilters.filters.workOrderNum), x => x.workOrderNum.ToLower().Contains(woFilters.filters.workOrderNum.ToLower()));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.customerName), x => x.customerName.ToLower().Contains(woFilters.filters.customerName.ToLower()));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.customerCode), x => x.customerCode.ToLower().Contains(woFilters.filters.customerCode.ToLower()));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.woType), x => x.woType.ToLower().Contains(woFilters.filters.woType.ToLower()));
            filters.Add(woFilters.filters.openDate != null, x => x.openDate == woFilters.filters.openDate);
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.partNo), x => x.partNo.Contains(woFilters.filters.partNo));
            filters.Add(!string.IsNullOrEmpty(woFilters.filters.pnDescription), x => x.pnDescription.Contains(woFilters.filters.pnDescription));
            filters.Add(woFilters.filters.promisedDate != null, x => x.promisedDate == woFilters.filters.promisedDate);
            filters.Add(woFilters.filters.estimatedCompletionDate != null, x => x.estimatedCompletionDate == woFilters.filters.estimatedCompletionDate);
            filters.Add(woFilters.filters.estimatedShipDate != null, x => x.estimatedShipDate == woFilters.filters.estimatedShipDate);
            filters.Add(woFilters.filters.statusId == 1, x => x.customerId == woFilters.filters.customerId);
            filters.Add(woFilters.filters.ItemMasterId > 0, x => x.ItemMasterId == woFilters.filters.ItemMasterId);
            filters.Add(woFilters.filters.WorkScopeId > 0, x => x.WorkScopeId == woFilters.filters.WorkScopeId);

            try
            {

                totalRecords = (from wo in _appContext.WorkOrder
                                join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                                join wowf in _appContext.WorkOrderWorkFlow on wop.ID equals wowf.WorkOrderPartNoId
                                join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                                join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                                where wo.IsDeleted == false && wo.WorkOrderStatusId == 2 // Closed
                                select new HistoricalWOFilter()
                                {
                                    WorkOrderId = wo.WorkOrderId,
                                    workOrderNum = wo.WorkOrderNum,
                                    customerName = cust.Name,
                                    customerCode = cust.CustomerCode,
                                    woType = wo.WorkOrderTypeId == 1 ? "Customer" : (wo.WorkOrderTypeId == 2 ? "Internal" : (wo.WorkOrderTypeId == 3 ? "Tear Down" : "Shop Services")),
                                    openDate = wo.OpenDate.Date,
                                    promisedDate = wop.PromisedDate,
                                    estimatedCompletionDate = wop.EstimatedCompletionDate,
                                    estimatedShipDate = wop.EstimatedShipDate,
                                    customerId = wo.CustomerId,
                                    partNo = im.PartNumber,
                                    pnDescription = im.PartDescription,
                                    createdDate = wo.CreatedDate,
                                    WorkScopeId = wop.WorkOrderScopeId,
                                    ItemMasterId = wop.MasterPartId
                                }
                      ).Distinct()
                      .Paginate(pageNumber, pageSize, sorts, filters).RecordCount;

                var list = (from wo in _appContext.WorkOrder
                            join wop in _appContext.WorkOrderPartNumber on wo.WorkOrderId equals wop.WorkOrderId
                            join wowf in _appContext.WorkOrderWorkFlow on wop.ID equals wowf.WorkOrderPartNoId
                            join cust in _appContext.Customer on wo.CustomerId equals cust.CustomerId
                            join im in _appContext.ItemMaster on wop.MasterPartId equals im.ItemMasterId
                            where wo.IsDeleted == false && wo.WorkOrderStatusId == 2
                            select new HistoricalWOFilter()
                            {
                                WorkOrderId = wo.WorkOrderId,
                                workOrderNum = wo.WorkOrderNum,
                                customerName = cust.Name,
                                customerCode = cust.CustomerCode,
                                woType = wo.WorkOrderTypeId == 1 ? "Customer" : (wo.WorkOrderTypeId == 2 ? "Internal" : (wo.WorkOrderTypeId == 3 ? "Tear Down" : "Shop Services")),
                                openDate = wo.OpenDate.Date,
                                promisedDate = wop.PromisedDate,
                                estimatedCompletionDate = wop.EstimatedCompletionDate,
                                estimatedShipDate = wop.EstimatedShipDate,
                                customerId = wo.CustomerId,
                                partNo = im.PartNumber,
                                pnDescription = im.PartDescription,
                                createdDate = wo.CreatedDate,
                                WorkScopeId = wop.WorkOrderScopeId,
                                ItemMasterId = wop.MasterPartId,
                                TotalRecords = totalRecords,
                            }
                      ).Distinct()
                      .Paginate(pageNumber, pageSize, sorts, filters).Results;
                return list;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<object> GetWorkOrderPartDetails(long customerId)
        {
            try
            {
                var list = (from rc in _appContext.ReceivingCustomerWork
                            join sl in _appContext.StockLine on rc.StockLineId equals sl.StockLineId
                            join im in _appContext.ItemMaster on rc.ItemMasterId equals im.ItemMasterId
                            join con in _appContext.Condition on rc.ConditionId equals con.ConditionId
                            where rc.IsActive == true && rc.IsDeleted == false// && sl.WorkOrderId==null
                            && rc.CustomerId == customerId
                            select new
                            {
                                rc.ReceivingCustomerWorkId,
                                sl.ItemMasterId,
                                im.PartNumber,
                                im.PartDescription,
                                im.DER,
                                PMA = im.isPma,
                                RevisedPartId = im.RevisedPartId == null ? 0 : im.RevisedPartId,
                                RevisedPartNo = im.RevisedPartId == null ? "" : (_appContext.ItemMaster.Where(p => p.ItemMasterId == im.RevisedPartId).Select(p => p.PartNumber).FirstOrDefault().ToString()),
                                Condition = con.Description,
                                sl.StockLineNumber,
                                rc.SerialNumber,
                                rc.StockLineId,
                                rc.ConditionId,
                                rc.Reference,
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
                var data = (
                            from stage in _appContext.WorkOrderStage
                            join ws in _appContext.WorkOrderStatus on stage.StatusId equals ws.Id
                            where stage.IsActive == true && stage.IsDeleted == false
                            select new
                            {
                                WorkOrderStage = stage.Stage,
                                WorkOrderStageId = stage.WorkOrderStageId,
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
                            && im.ItemMasterId == itemMasterId
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
                    workOrderMaterial.IsDeferred = item.IsDeferred;

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
                workOrderMaterial.IsDeferred = false;
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
                workOrderMaterial.IsDeferred = false;
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

        //private ItemMaster WorkOrderPartDetails(long itemMasterId)
        //{
        //    try
        //    {
        //        return _appContext.ItemMaster.Where(p => p.ItemMasterId == itemMasterId).FirstOrDefault();
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        private ReceivingCustomerWork WorkOrderPartDetails(long workOrderId, long workOrderPartId)
        {
            try
            {
                var data = (from rc in _appContext.ReceivingCustomerWork
                            join sl in _appContext.StockLine on rc.StockLineId equals sl.StockLineId
                            join im in _appContext.ItemMaster on rc.ItemMasterId equals im.ItemMasterId
                            join con in _appContext.Condition on rc.ConditionId equals con.ConditionId
                            join wo in _appContext.WorkOrder on rc.WorkOrderId equals wo.WorkOrderId
                            join wop in _appContext.WorkOrderPartNumber on rc.WorkOrderId equals wop.WorkOrderId
                            where rc.IsActive == true && rc.IsDeleted == false
                            && rc.WorkOrderId == workOrderId && wop.ID == workOrderPartId
                            select new ReceivingCustomerWork()
                            {
                                ReceivingCustomerWorkId = rc.ReceivingCustomerWorkId,
                                PartNumber = im.PartNumber,
                                PartDescription = im.PartDescription,
                                RevisePartId = im.RevisedPartId == null ? 0 : im.RevisedPartId,
                                RevisedPartNo = im.RevisedPartId == null ? "" : (_appContext.ItemMaster.Where(p => p.ItemMasterId == im.RevisedPartId).Select(p => p.PartNumber).FirstOrDefault().ToString()),
                                Condition = con.Description,
                                StockLineNumber = sl.StockLineNumber,
                                SerialNumber = rc.SerialNumber,
                            }).FirstOrDefault();



                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private ReceivingCustomerWork RecevingPartDetails(long receivingCustmoerId)
        {
            try
            {
                var data = (from rc in _appContext.ReceivingCustomerWork
                            join sl in _appContext.StockLine on rc.StockLineId equals sl.StockLineId
                            join im in _appContext.ItemMaster on rc.ItemMasterId equals im.ItemMasterId
                            join con in _appContext.Condition on rc.ConditionId equals con.ConditionId
                            where rc.IsActive == true && rc.IsDeleted == false
                            && rc.ReceivingCustomerWorkId == receivingCustmoerId
                            select new ReceivingCustomerWork()
                            {
                                ReceivingCustomerWorkId = rc.ReceivingCustomerWorkId,
                                PartNumber = im.PartNumber,
                                PartDescription = im.PartDescription,
                                RevisePartId = im.RevisedPartId == null ? 0 : im.RevisedPartId,
                                RevisedPartNo = im.RevisedPartId == null ? "" : (_appContext.ItemMaster.Where(p => p.ItemMasterId == im.RevisedPartId).Select(p => p.PartNumber).FirstOrDefault().ToString()),
                                Condition = con.Description,
                                StockLineNumber = sl.StockLineNumber,
                                SerialNumber = rc.SerialNumber,
                            }).FirstOrDefault();



                return data;
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
            //customer.PrimarySalesPersonId = workOrder.CSR;
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