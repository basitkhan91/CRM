using System;
using System.Collections.Generic;
using System.Linq;
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
                workOrder.CreatedDate = workOrder.UpdatedDate =DateTime.Now;
                workOrder.CreatedBy = workOrder.UpdatedBy = "admin";
                workOrder.IsActive = true;
                workOrder.IsDeleted = false;
                workOrder.MasterCompanyId = 1;
                _appContext.WorkOrder.Add(workOrder);
                _appContext.SaveChanges();
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

        public void WorkOrderStatus(long workOrderId,bool status)
        {
            WorkOrder workOrder = new WorkOrder();
            try
            {
                workOrder.UpdatedDate = DateTime.Now;
                workOrder.UpdatedBy = "admin";
                workOrder.IsActive = status;

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

        public GetData<WorkOrderList> GetWorkOrdersList(WorkOrderList workOrderList)
        {
            var totalRecords = 0;
            try
            {
                GetData<WorkOrderList> getData = new GetData<WorkOrderList>();
                
                WorkOrderList workOrder;
                var pageNumber = (workOrderList.first / workOrderList.rows) + 1;
                var take = workOrderList.rows;
                var skip = take * (pageNumber - 1);

                totalRecords = _appContext.WorkOrder
                    .Join(_appContext.Customer,
                           wo => wo.CustomerId,
                           cust => cust.CustomerId,
                           (wo, cust) => new { wo, cust })
                    .Join(_appContext.WorkOrderPartNumber,
                           wo1 => wo1.wo.ID,
                           wop => wop.WorkOrderId,
                           (wo1, wop) => new { wo1, wop })
                    .Join(_appContext.ItemMaster,
                           wop1 => wop1.wop.ItemMasterId,
                           im => im.ItemMasterId,
                           (wop1, im) => new { wop1, im })
                    .Join(_appContext.Workflow,
                           wop2 => wop2.wop1.wop.WorkflowId,
                           wf => wf.WorkflowId,
                           (wop2, wf) => new { wop2, wf })
                    .Join(_appContext.WorkOrderType,
                           wo3 => wo3.wop2.wop1.wo1.wo.WorkOrderTypeId,
                           wt => wt.Id,
                           (wo3, wt) => new { wo3, wt })
                    .Select(z => new
                    {
                        WorkOrderId = z.wo3.wop2.wop1.wo1.wo.ID,
                        WorkOrderNo = z.wo3.wop2.wop1.wo1.wo.WorkOrderNum,
                        CustomerName = z.wo3.wop2.wop1.wo1.cust.Name,
                        CustomerCode = z.wo3.wop2.wop1.wo1.cust.CustomerCode,
                        WorkOrderType = z.wt.Description,
                        Quantity = z.wo3.wop2.wop1.wop.Quantity,
                        OpenDate = z.wo3.wop2.wop1.wo1.wo.OpenDate,
                        PromiseDate = z.wo3.wop2.wop1.wop.PromisedDate,
                        WorkFlowNo = z.wo3.wf.WorkOrderNumber,
                        PartNumber = z.wo3.wop2.im.PartNumber,
                        PartDescription = z.wo3.wop2.im.PartDescription,
                        RevisedPin = z.wo3.wop2.im.PartNumber,
                        UpdatedDate = z.wo3.wop2.wop1.wo1.wo.UpdatedDate,
                        IsDeleted = z.wo3.wop2.wop1.wo1.wo.IsDeleted,
                        IsActive = z.wo3.wop2.wop1.wo1.wo.IsActive
                    })
                    .Where(p => p.IsDeleted == false)
                    .Count();

                var tempList = _appContext.WorkOrder
                    .Join(_appContext.Customer,
                           wo => wo.CustomerId,
                           cust => cust.CustomerId,
                           (wo,cust) => new {wo,cust})
                    .Join(_appContext.WorkOrderPartNumber,
                           wo1 => wo1.wo.ID,
                           wop => wop.WorkOrderId,
                           (wo1, wop) => new { wo1, wop })
                    .Join(_appContext.ItemMaster,
                           wop1 => wop1.wop.ItemMasterId,
                           im => im.ItemMasterId,
                           (wop1, im) => new { wop1, im })
                    .Join(_appContext.Workflow,
                           wop2 => wop2.wop1.wop.WorkflowId,
                           wf => wf.WorkflowId,
                           (wop2, wf) => new { wop2, wf })
                    .Join(_appContext.WorkOrderType,
                           wo3 => wo3.wop2.wop1.wo1.wo.WorkOrderTypeId,
                           wt => wt.Id,
                           (wo3, wt) => new { wo3, wt })
                    .Select(z => new
                    {
                        WorkOrderId = z.wo3.wop2.wop1.wo1.wo.ID,
                        WorkOrderNo = z.wo3.wop2.wop1.wo1.wo.WorkOrderNum,
                        CustomerName = z.wo3.wop2.wop1.wo1.cust.Name,
                        CustomerCode = z.wo3.wop2.wop1.wo1.cust.CustomerCode,
                        WorkOrderType = z.wt.Description,
                        Quantity = z.wo3.wop2.wop1.wop.Quantity,
                        OpenDate = z.wo3.wop2.wop1.wo1.wo.OpenDate,
                        PromiseDate = z.wo3.wop2.wop1.wop.PromisedDate,
                        WorkFlowNo = z.wo3.wf.WorkOrderNumber,
                        PartNumber = z.wo3.wop2.im.PartNumber,
                        PartDescription = z.wo3.wop2.im.PartDescription,
                        RevisedPin = z.wo3.wop2.im.PartNumber,
                        UpdatedDate= z.wo3.wop2.wop1.wo1.wo.UpdatedDate,
                        IsDeleted = z.wo3.wop2.wop1.wo1.wo.IsDeleted,
                        IsActive = z.wo3.wop2.wop1.wo1.wo.IsActive
                    })
                    .Where(p => p.IsDeleted == false)
                    .OrderByDescending(p => p.UpdatedDate)
                    .Skip(skip)
                    .Take(take)
                    .ToList();

                if (tempList != null && tempList.Count() > 0)
                {
                    foreach(var item in tempList)
                    {
                        workOrder = new WorkOrderList();
                        workOrder.CustomerCode = item.CustomerCode;
                        workOrder.CustomerName = item.CustomerName;
                        workOrder.IsActive = item.IsActive;
                        workOrder.IsDeleted = item.IsDeleted;
                        workOrder.OpenDate = item.OpenDate;
                        workOrder.PartDescription = item.PartDescription;
                        workOrder.PartNumber = item.PartNumber;
                        workOrder.PromiseDate = item.PromiseDate;
                        workOrder.Quantity = item.Quantity;
                        workOrder.RevisedPin = item.RevisedPin;
                        workOrder.UpdatedDate = item.UpdatedDate;
                        workOrder.WorkFlowNo = item.WorkFlowNo;
                        workOrder.WorkOrderId = item.WorkOrderId;
                        workOrder.WorkOrderNo = item.WorkOrderNo;
                        workOrder.WorkOrderType = item.WorkOrderType;
                        getData.PaginationList.Add(workOrder);
                    }
                    
                    getData.TotalRecordsCount = totalRecords;
                }
                else
                {
                    getData.PaginationList = new List<WorkOrderList>();
                    getData.TotalRecordsCount = totalRecords;
                }


                return getData;
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
                var workOrder = _appContext.Set<WorkOrder>().Include("WorkOrderType").Include("WorkOrderStatus").Include("Customer").Where(x => x.ID == workOrderId).FirstOrDefault();
                if (workOrder != null)
                {
                    workOrder.PartNumbers= _appContext.Set<WorkOrderPartNumber>().Where(x => x.WorkOrderId == workOrderId && (x.IsDelete == null || x.IsDelete != true)).OrderBy(x => x.ID).ToList();
                }
                    return workOrder;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Dictionary<long,string> GetWorkFlowNos(long partId,long workScopeId)
        {
            Dictionary<long, string> workFlowNos = new Dictionary<long, string>();
            try
            {
                var result=_appContext.Workflow
                    .Join(_appContext.ItemMaster,
                           wf => wf.ItemMasterId,
                           im => im.ItemMasterId,
                           (wf, im) => new { wf, im })
                    .Join(_appContext.WorkScope,
                           wf1 => wf1.wf.WorkScopeId,
                           ws => ws.WorkScopeId,
                           (wf1, ws) => new { wf1, ws })
                    .Select(z => new
                    {
                        WorkFlowNo = z.wf1.wf.WorkOrderNumber,
                        WorkFlowId = z.wf1.wf.WorkflowId,
                        UpdatedDate = z.wf1.wf.UpdatedDate,
                        IsDeleted = z.wf1.wf.IsDelete,
                        IsActive = z.wf1.wf.IsActive,
                        ItemMasterId = z.wf1.im.ItemMasterId,
                        WorkScopeId = z.ws.WorkScopeId
                    })
                    .Where(p=>p.IsDeleted==false && p.ItemMasterId==partId && p.WorkScopeId==workScopeId)
                    .OrderByDescending(p => p.UpdatedDate)
                    .ToList();


                if(result!=null && result.Count>0)
                {
                    foreach(var item in result)
                    {
                        workFlowNos.Add(item.WorkFlowId, item.WorkFlowNo);
                    }
                }

                return workFlowNos;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

     

    }
}
