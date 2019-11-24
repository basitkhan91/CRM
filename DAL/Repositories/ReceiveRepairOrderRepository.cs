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
                                     orderby venCont.IsDefaultContact
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
                                         Terms = term != null?  term.Percentage : 0,
                                         Priority = prio != null ? prio.Description : "",
                                         DeferredReceiver = ro.DeferredReceiver,
                                         Resale = ro.Resale,
                                         ManagementStructureId = ro.ManagementStructureId,
                                         Memo = ro.RoMemo
                                     }).FirstOrDefault();

            return repairOrderHeader;
        }



    }
}
