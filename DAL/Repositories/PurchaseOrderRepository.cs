using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
  public  class PurchaseOrderRepository : Repository<DAL.Models.PurchaseOrder>, IPurchaseOrder
    {
        public PurchaseOrderRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.PurchaseOrder> GetPurchaseOrderlist()
        {
            var purchaseOrderList = _appContext.PurchaseOrder.Include("PurchaseOderPart").Include("Vendor").OrderByDescending(c => c.PurchaseOrderId).ToList();
            purchaseOrderList.ForEach(x => {
                if (x.Vendor != null)
                {
                    x.Vendor.VendorContact = _appContext.VendorContact.Include("Contact").Where(vendorContact => vendorContact.VendorId == x.VendorId).ToList();
                }
            });

            return purchaseOrderList;
        }

        public int GetLastIdNumber(long puchaseOrderId, long purchaseOrderPartId)
        {
            var stockLine = _appContext.StockLine.Where(x => x.PurchaseOrderId == puchaseOrderId && x.PurchaseOrderPartRecordId == purchaseOrderPartId).OrderByDescending(x => x.StockLineId).FirstOrDefault();
            if (stockLine != null)
            {
                return Convert.ToInt32(stockLine.IdNumber);
            }
            else
            {
                return 0;
            }
        }


        public long CreatePOApprovers(PurchaseOrderApprover poApprover)
        {
            try
            {
                _appContext.PurchaseOrderApprover.Add(poApprover);
                _appContext.SaveChanges();

                return poApprover.POApproverId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdatePOApprovers(PurchaseOrderApprover poApprover)
        {
            try
            {
                _appContext.PurchaseOrderApprover.Update(poApprover);
                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }



        public void UpdatePOApproversStatus(long poApproverListId,int statusId, string updatedBy)
        {
            try
            {
                PurchaseOrderApproverList approver = new PurchaseOrderApproverList();
                approver.POApproverListId = poApproverListId;
                approver.StatusId = statusId;
                approver.UpdatedDate = DateTime.Now;
                approver.UpdatedBy = updatedBy;

                _appContext.PurchaseOrderApproverList.Attach(approver);

                _context.Entry(approver).Property(p => p.StatusId).IsModified = true;
                _context.Entry(approver).Property(p => p.UpdatedDate).IsModified = true;
                _context.Entry(approver).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetPoApproversList(long purchaseOrderId)
        {
            try
            {
                var list = (from pa in _appContext.PurchaseOrderApprover
                            join pal in _appContext.PurchaseOrderApproverList on pa.POApproverId equals pal.POApproverId
                            join emp in _appContext.Employee on pal.EmployeeId equals emp.EmployeeId
                            where pa.PurchaseOrderId == purchaseOrderId
                            select new
                            {
                               emp.EmployeeId,
                               EmployeeName= emp.FirstName+' '+emp.LastName,
                               emp.EmployeeCode,
                               emp.Email,
                               pal.StatusId,
                               pal.Level
                            }
                            ).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

