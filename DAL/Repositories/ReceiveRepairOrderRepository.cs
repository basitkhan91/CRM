using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace DAL.Repositories
{
    public class ReceiveRepairOrderRepository : Repository<ReceiveRepairOrderRepository>, IReceiveRepairOrderRepository
    {
        #region Private Members
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        #endregion Private Members

        public ReceiveRepairOrderRepository(ApplicationDbContext context) : base(context)
        {
        }

        public object GetRepairOrderHeader(long repairOrderId)
        {
            var repairOrderHeader = (from ro in _appContext.RepairOrder
                                     join emp in _appContext.Employee on ro.RequisitionerId equals emp.EmployeeId
                                     join term in _appContext.CreditTerms on ro.CreditTermsId equals term.CreditTermsId
                                     into leftTerm
                                     from term in leftTerm.DefaultIfEmpty()
                                     join prio in _appContext.Priority on ro.PriorityId equals prio.PriorityId
                                     into leftPrio
                                     from prio in leftPrio.DefaultIfEmpty()
                                     join apprEmp in _appContext.Employee on ro.ApproverId equals apprEmp.EmployeeId
                                     into leftAppEmp
                                     from apprEmp in leftAppEmp.DefaultIfEmpty()
                                     join vend in _appContext.Vendor on ro.VendorId equals vend.VendorId
                                     join vencont in _appContext.VendorContact on vend.VendorId equals vencont.VendorId
                                     into leftVencont
                                     from venCont in leftVencont.DefaultIfEmpty()
                                     join cont in _appContext.Contact on venCont.ContactId equals cont.ContactId
                                     into leftCont
                                     from cont in leftCont.DefaultIfEmpty()
                                     where ro.RepairOrderId == repairOrderId
                                     orderby venCont.IsDefaultContact descending
                                     select new
                                     {
                                         RepairOrderId = ro.RepairOrderId,
                                         RepairOrderNumber = ro.RepairOrderNumber,
                                         StatusId = ro.StatusId,
                                         VendorName = vend.VendorName,
                                         VendorCode = vend.VendorCode,
                                         VendorContact = cont != null ? cont.FirstName + " " + cont.LastName : "",
                                         VendorPhone = cont != null ? cont.MobilePhone : "",
                                         RequestedBy = emp != null ? emp.FirstName + " " + emp.LastName : "",
                                         OpenDate = ro.OpenDate,
                                         ClosedDate = ro.ClosedDate,
                                         NeedByDate = ro.NeedByDate,
                                         DateApproved = ro.ApprovedDate,
                                         Approver = apprEmp != null ? apprEmp.FirstName + " " + apprEmp.LastName : "",
                                         CreditLimit = ro.CreditLimit,
                                         Terms = term != null ? term.Percentage : 0,
                                         Priority = prio != null ? prio.Description : "",
                                         DeferredReceiver = ro.DeferredReceiver,
                                         Resale = ro.Resale,
                                         ManagementStructureId = ro.ManagementStructureId,
                                         Memo = ro.RoMemo
                                     }).FirstOrDefault();

            return repairOrderHeader;
        }

        public object GetRepairOrderPartsByRepairOrderId(long repairOrderId)
        {
            var repairOrderParts = (from rop in _appContext.RepairOrderPart
                                    join itm in _appContext.ItemMaster on rop.ItemMasterId equals itm.ItemMasterId
                                    join manf in _appContext.Manufacturer on itm.ManufacturerId equals manf.ManufacturerId
                                    into leftManf
                                    from manf in leftManf.DefaultIfEmpty()
                                    where rop.RepairOrderId == repairOrderId
                                    select new
                                    {
                                        RepairOrderPartRecordId = rop.RepairOrderPartRecordId,
                                        RepairOrderId = rop.RepairOrderId,
                                        PartNumberId = rop.PartNumberId,
                                        ItemTypeId = rop.ItemTypeId,
                                        QuantityToRepair = rop.QuantityOrdered,
                                        QuantityRepaired = _appContext.StockLine.Count(s =>  s.RepairOrderPartRecordId == rop.RepairOrderPartRecordId && s.RepairOrderId == rop.RepairOrderId),
                                        ConditionId = rop.ConditionId,
                                        DiscountAmount = rop.DiscountAmount,
                                        DiscountPercent = rop.DiscountPercent,
                                        DiscountPerUnit = rop.DiscountPerUnit,
                                        ExtendedCost = rop.ExtendedCost,
                                        ForeignExchangeRate = rop.ForeignExchangeRate,
                                        FunctionalCurrencyId = rop.FunctionalCurrencyId,
                                        GlAccountId = rop.GlAccountId,
                                        IsParent = rop.IsParent,
                                        ItemMasterId = rop.ItemMasterId,
                                        ManagementStructureId = rop.ManagementStructureId,
                                        ManufacturerId = rop.ManufacturerId,
                                        MasterCompanyId = rop.MasterCompanyId,
                                        Memo = rop.Memo,
                                        NeedByDate = rop.NeedByDate,
                                        ReportCurrencyId = rop.ReportCurrencyId,
                                        SalesOrderId = rop.SalesOrderId,
                                        UnitCost = rop.UnitCost,
                                        UOMId = rop.UOMId,
                                        UpdatedBy = rop.UpdatedBy,
                                        WorkOrderId = rop.WorkOrderId,
                                        CreatedDate = rop.CreatedDate,
                                        UpdatedDate = rop.UpdatedDate,
                                        RoPartSplitUserTypeId = rop.RoPartSplitUserTypeId,
                                        RoPartSplitUserId = rop.RoPartSplitUserId,
                                        RoPartSplitAddressId = rop.RoPartSplitAddressId,
                                        RoPartSplitAddress1 = rop.RoPartSplitAddress1,
                                        RoPartSplitAddress2 = rop.RoPartSplitAddress2,
                                        RoPartSplitAddress3 = rop.RoPartSplitAddress3,
                                        RoPartSplitCity = rop.RoPartSplitCity,
                                        RoPartSplitStateOrProvince = rop.RoPartSplitStateOrProvince,
                                        RoPartSplitPostalCode = rop.RoPartSplitPostalCode,
                                        RoPartSplitCountry = rop.RoPartSplitCountry,
                                        StockLine = new {
                                            StockLineId = 1,
                                            ControlNumber = "CTRL-1",
                                            PurchaseOrderNumber = "PO1",
                                            StockLineNumber = "STL-1"
                                        },
                                        POPartSplitAddress = new { 
                                            rop.RoPartSplitAddressId
                                        },
                                        ItemMaster = new
                                        {
                                            PartNumber = itm.PartNumber,
                                            PartDescription = itm.PartDescription,
                                            GLAccountId = itm.GLAccountId,
                                            IsTimeLife = itm.IsTimeLife,
                                            IsSerialized = itm.IsSerialized,
                                            ManufacturerId = itm.ManufacturerId,
                                            IsPma = itm.isPma,
                                            IsDer = itm.DER,
                                            Manufacturer = manf != null ?  new
                                            {
                                                ManufacturerId = manf.ManufacturerId,
                                                Name = manf.Name,
                                            } : null
                                        }
                                    }).ToList();

            return repairOrderParts;

        }

        public int GetLastIdNumber(long repairOrderId, long repairOrderPartId)
        {
            var stockLine = _appContext.StockLine.Where(x => x.RepairOrderId == repairOrderId && x.RepairOrderPartRecordId == repairOrderPartId).OrderByDescending(x => x.StockLineId).FirstOrDefault();
            if (stockLine != null)
            {
                return Convert.ToInt32(stockLine.IdNumber);
            }
            else
            {
                return 0;
            }
        }

    }
}
