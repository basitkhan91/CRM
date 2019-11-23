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
                _appContext.WorkOrder.Update(workOrder);
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

                var customer = _appContext.Customer.Where(p => p.CustomerId == workOrder.CustomerId).FirstOrDefault();

                if (customer != null)
                {
                    workOrder.CustomerDetails = new CustomerDetails();
                    var emp = _appContext.Employee.Where(p => p.EmployeeId == customer.CsrId).FirstOrDefault();

                    var customerContact = (from cust in _appContext.Customer
                                           join cc in _appContext.CustomerContact on cust.CustomerId equals cc.CustomerId into custcc
                                           from cc in custcc.DefaultIfEmpty()

                                           join con in _appContext.Contact on cc.ContactId equals con.ContactId into custcon
                                           from con in custcon.DefaultIfEmpty()
                                           where cust.CustomerId == workOrder.CustomerId
                                           select new
                                           {
                                               con
                                           }).FirstOrDefault();


                    workOrder.CustomerDetails.CustomerName = customer.Name;
                    workOrder.CustomerDetails.CreditLimit = workOrder.CreditLimit;
                    workOrder.CustomerDetails.CreditTermsId = workOrder.CreditTermsId;
                    if (emp != null)
                        workOrder.CustomerDetails.CSRName = emp.FirstName;
                    else
                        workOrder.CustomerDetails.CSRName = string.Empty;

                    workOrder.CustomerDetails.CustomerId = workOrder.CustomerId;
                    workOrder.CustomerDetails.CustomerName = customer.Name;
                    workOrder.CustomerDetails.CustomerRef = customer.ContractReference;
                    if (customerContact != null && customerContact.con != null)
                        workOrder.CustomerDetails.CustomerContact = customerContact.con.FirstName;
                    else
                        workOrder.CustomerDetails.CustomerContact = string.Empty;
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
            // WorkOrderLaborHeader workFlowLabourHeader = new WorkOrderLaborHeader();
            //  WorkOrderLaborList workOrderLaborList = null;
            //int count = 0;

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
                                 where lh.IsDeleted == false && (lh.WorkFlowWorkOrderId == wfwoId || lh.WorkOrderId == workOrderId)
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
                                     wfwo.WorkFlowWorkOrderNo,
                                     DataEnteredByName = deby.FirstName,
                                     ExpertiseType = exp.Description,
                                     EmployeeName = emp.FirstName,
                                     LaborList = (from wol in _appContext.WorkOrderLabor
                                                  join exp in _appContext.ExpertiseType on wol.ExpertiseId equals exp.ExpertiseTypeId into wolexp
                                                  from exp in wolexp.DefaultIfEmpty()
                                                  join emp in _appContext.Employee on wol.EmployeeId equals emp.EmployeeId into wolemp
                                                  from emp in wolemp.DefaultIfEmpty()
                                                  where wol.WorkOrderLaborHeaderId == lh.WorkOrderLaborHeaderId
                                                  select new
                                                  {
                                                      wol,
                                                      ExpertiseType = exp.Description,
                                                      EmployeeName=emp.FirstName
                                                  }
                                                 ).ToList()
                                     // _appContext.WorkOrderLabor.Where(p => p.WorkOrderLaborHeaderId == lh.WorkOrderLaborHeaderId).ToList()
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

        public List<WorkOrderAssets> CreateWorkOrderAssets(List<WorkOrderAssets> workOrderAssets)
        {
            try
            {
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

        public void DeleteWorkOrderAsset(long WorkOrderAssetId, string updatedBy)
        {
            try
            {
                WorkOrderAssets workOrderAsset = new WorkOrderAssets();
                workOrderAsset.WorkOrderAssetId = WorkOrderAssetId;
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

        public void SaveAssetCheckedIn(long WorkOrderAssetId, long? checkedInById, DateTime? checkedInDate, string updatedBy)
        {
            try
            {
                WorkOrderAssets workOrderAsset = new WorkOrderAssets();
                workOrderAsset.WorkOrderAssetId = WorkOrderAssetId;
                workOrderAsset.UpdatedDate = DateTime.Now;
                workOrderAsset.CheckedInById = checkedInById;
                workOrderAsset.CheckedInDate = checkedInDate;
                workOrderAsset.UpdatedBy = updatedBy;

                _appContext.WorkOrderAssets.Attach(workOrderAsset);
                _appContext.Entry(workOrderAsset).Property(x => x.CheckedInById).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.CheckedInDate).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void SaveAssetCheckedOut(long WorkOrderAssetId, long? checkedoutById, DateTime? checkedoutDate, string updatedBy)
        {
            try
            {
                WorkOrderAssets workOrderAsset = new WorkOrderAssets();
                workOrderAsset.WorkOrderAssetId = WorkOrderAssetId;
                workOrderAsset.UpdatedDate = DateTime.Now;
                workOrderAsset.CheckedOutById = checkedoutById;
                workOrderAsset.CheckedOutDate = checkedoutDate;
                workOrderAsset.UpdatedBy = updatedBy;

                _appContext.WorkOrderAssets.Attach(workOrderAsset);
                _appContext.Entry(workOrderAsset).Property(x => x.CheckedOutById).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.CheckedOutDate).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(workOrderAsset).Property(x => x.UpdatedBy).IsModified = true;
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

        public IEnumerable<WorkOrderExclusions> GetWorkFlowWorkOrderExclusionsList(long workOrderId = 0, long wfwoId = 0)
        {
            List<WorkOrderExclusions> workOrderExclusionsList = new List<WorkOrderExclusions>();
            WorkOrderExclusions workOrderExclusions;

            try
            {

                var result = (from we in _appContext.WorkOrderExclusions
                              join im in _appContext.ItemMaster on we.ItemMasterId equals im.ItemMasterId
                              join eo in _appContext.ExclusionEstimatedOccurances on we.EstOcuuranceId equals eo.Id into weeo
                              from eo in weeo.DefaultIfEmpty()
                              join mp in _appContext.MarkUpPercentage on we.MarkUpPercentageId equals mp.MarkUpPercentageId into wemp
                              from mp in wemp.DefaultIfEmpty()
                              where we.IsDeleted == false && (we.WorkFlowWorkOrderId == wfwoId || we.WorkOrderId == workOrderId)
                              select new
                              {
                                  WorkOrderExclusions = we,
                                  Epn = im.PartNumber,
                                  EpnDescription = im.PartDescription,
                                  Source = string.Empty,
                                  EstOcuurance = eo.Name,
                                  MarkUpPercentage = mp.MarkUpValue
                              }).Distinct()
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
				if(workOrderMaterials!=null && workOrderMaterials.Count>0)
				{
					var flag = workOrderMaterials.Any(p => p.WorkFlowWorkOrderId > 0);
					if (!flag)
					{
						WorkOrderWorkFlow workOrderWorkFlow = new WorkOrderWorkFlow();
						workOrderWorkFlow.WorkOrderId = workOrderMaterials.FirstOrDefault().WorkOrderId;
						workOrderWorkFlow.MasterCompanyId = 1;
						workOrderWorkFlow.UpdatedBy = workOrderWorkFlow.CreatedBy = "admin";
						workOrderWorkFlow.UpdatedDate = workOrderWorkFlow.CreatedDate = DateTime.Now;
						workOrderWorkFlow.IsActive = true;
						workOrderWorkFlow.IsDeleted = false;
						_appContext.WorkOrderWorkFlow.Add(workOrderWorkFlow);
						_appContext.SaveChanges();
						workOrderMaterials.ForEach(p => p.WorkFlowWorkOrderId = workOrderWorkFlow.WorkFlowWorkOrderId);
					}
				}
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

                            where wom.IsDeleted == false && wom.IsActive == true && (wom.IsAltPart == false || wom.IsAltPart == false)

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

                                _appContext.WorkOrderWorkFlow.Add(workFlowWorkOrder);
                                _appContext.SaveChanges();

                                workFlowWorkOrder.WorkFlowWorkOrderNo = "WOWF" + workFlowWorkOrder.WorkFlowWorkOrderId;
                                _appContext.WorkOrderWorkFlow.Update(workFlowWorkOrder);
                                _appContext.SaveChanges();

                                workFlowWorkOrderId = workFlowWorkOrder.WorkFlowWorkOrderId;

                                if (workOrderLaborHeader != null)
                                {
                                    workOrderLaborHeader.LaborList.ForEach(p => p.IsFromWorkFlow = true);
                                    workOrderLaborHeader.WorkFlowWorkOrderId = workFlowWorkOrderId;
                                    _appContext.WorkOrderLaborHeader.Add(workOrderLaborHeader);
                                    _appContext.SaveChanges();
                                }


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
                    workOrderCharge.ChargesTypeId = 1;
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
        #endregion

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
