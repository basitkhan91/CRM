using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class PurchaseOrderRepository : Repository<DAL.Models.PurchaseOrder>, IPurchaseOrder
    {
        public PurchaseOrderRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<object> GetPurchaseOrderlist(Filters<PurchaseOrderFilters> poFilters)
        {
            //var purchaseOrderList = _appContext.PurchaseOrder.Include("PurchaseOderPart").Include("Vendor").OrderByDescending(c => c.PurchaseOrderId).ToList();
            //purchaseOrderList.ForEach(x =>
            //{
            //    if (x.Vendor != null)
            //    {
            //        x.Vendor.VendorContact = _appContext.VendorContact.Include("Contact").Where(vendorContact => vendorContact.VendorId == x.VendorId).ToList();
            //    }
            //});

            if (poFilters.filters == null)
                poFilters.filters = new PurchaseOrderFilters();
            var pageNumber = poFilters.first + 1;
            var take = poFilters.rows;
            var skip = take * (pageNumber - 1);

            var totalRecords = (from po in _appContext.PurchaseOrder
                                join emp in _appContext.Employee on po.RequestedBy equals emp.EmployeeId
                                join v in _appContext.Vendor on po.VendorId equals v.VendorId
                                join appr in _appContext.Employee on po.ApproverId equals appr.EmployeeId
                                where po.IsDeleted == false
                                && po.PurchaseOrderNumber.Contains(!String.IsNullOrEmpty(poFilters.filters.PurchaseOrderNo) ? poFilters.filters.PurchaseOrderNo : po.PurchaseOrderNumber)
                                && Convert.ToString(po.OpenDate).Contains(!String.IsNullOrEmpty(Convert.ToString(poFilters.filters.OpenDate)) ? Convert.ToString(poFilters.filters.OpenDate) : Convert.ToString(po.OpenDate))
                                && Convert.ToString(po.ClosedDate).Contains(!String.IsNullOrEmpty(Convert.ToString(poFilters.filters.ClosedDate)) ? Convert.ToString(poFilters.filters.ClosedDate) : Convert.ToString(po.ClosedDate))
                                && v.VendorName.Contains(!String.IsNullOrEmpty(poFilters.filters.VendorName) ? poFilters.filters.VendorName : v.VendorName)
                                && v.VendorCode.Contains(!String.IsNullOrEmpty(poFilters.filters.VendorCode) ? poFilters.filters.VendorCode : v.VendorCode)
                                && po.StatusId == (poFilters.filters.StatusId > 0 ? poFilters.filters.StatusId : po.StatusId)
                                && emp.FirstName.Contains(!String.IsNullOrEmpty(poFilters.filters.ApprovedBy) ? poFilters.filters.ApprovedBy : emp.FirstName)
                                select new
                                {
                                    po.PurchaseOrderId

                                }).Distinct()
                                    .Count();

            var purchaseOrderList = (from po in _appContext.PurchaseOrder
                                     join emp in _appContext.Employee on po.RequestedBy equals emp.EmployeeId
                                     join v in _appContext.Vendor on po.VendorId equals v.VendorId
                                     join appr in _appContext.Employee on po.ApproverId equals appr.EmployeeId
                                     where po.IsDeleted == false
                                     && po.PurchaseOrderNumber.Contains(!String.IsNullOrEmpty(poFilters.filters.PurchaseOrderNo) ? poFilters.filters.PurchaseOrderNo : po.PurchaseOrderNumber)
                                     && Convert.ToString(po.OpenDate).Contains(!String.IsNullOrEmpty(Convert.ToString(poFilters.filters.OpenDate)) ? Convert.ToString(poFilters.filters.OpenDate) : Convert.ToString(po.OpenDate))
                                     && Convert.ToString(po.ClosedDate).Contains(!String.IsNullOrEmpty(Convert.ToString(poFilters.filters.ClosedDate)) ? Convert.ToString(poFilters.filters.ClosedDate) : Convert.ToString(po.ClosedDate))
                                     && v.VendorName.Contains(!String.IsNullOrEmpty(poFilters.filters.VendorName) ? poFilters.filters.VendorName : v.VendorName)
                                     && v.VendorCode.Contains(!String.IsNullOrEmpty(poFilters.filters.VendorCode) ? poFilters.filters.VendorCode : v.VendorCode)
                                     && po.StatusId == (poFilters.filters.StatusId > 0 ? poFilters.filters.StatusId : po.StatusId)
                                     && emp.FirstName.Contains(!String.IsNullOrEmpty(poFilters.filters.ApprovedBy) ? poFilters.filters.ApprovedBy : emp.FirstName)
                                     select new
                                     {
                                         po.PurchaseOrderId,
                                         po.PurchaseOrderNumber,
                                         OpenDate = po.OpenDate,
                                         ClosedDate = po.ClosedDate,
                                         v.VendorName,
                                         v.VendorCode,
                                         Status = po.StatusId == 1 ? "Open" : (po.StatusId == 2 ? "Pending" : (po.StatusId == 3 ? "Fulfilling" : "Closed")),
                                         RequestedBy = emp.FirstName,
                                         ApprovedBy = appr.FirstName,
                                         po.CreatedDate,
                                         po.IsActive,
                                         TotalRecords = totalRecords
                                     }).Distinct().OrderByDescending(p => p.CreatedDate)
                                     .Skip(skip)
                                    .Take(take)
                                    .ToList();



            return purchaseOrderList;
        }

        public IEnumerable<DAL.Models.PurchaseOrder> GetPurchaseOrderListLite()
        {
            var purchaseOrderList = _appContext.PurchaseOrder.Where(c => c.IsActive == true).OrderByDescending(c => c.PurchaseOrderId)
                .Select(c => new PurchaseOrder { PurchaseOrderId = c.PurchaseOrderId, PurchaseOrderNumber = c.PurchaseOrderNumber }).ToList();
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

        public void UpdatePOApproversStatus(long poApproverListId, int statusId, string updatedBy)
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
                                EmployeeName = emp.FirstName + ' ' + emp.LastName,
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

        public long CreatePurchaseOrderAddress(PurchaseOrderAddress poAddress)
        {
            try
            {
                _appContext.PurchaseOrderAddress.Add(poAddress);
                _appContext.SaveChanges();

                return poAddress.POAddressId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdatePurchaseOrderAddress(PurchaseOrderAddress poAddress)
        {
            try
            {
                _appContext.PurchaseOrderAddress.Update(poAddress);
                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetPurchaseOrderAddress(long purchaseOrderId, int userType, int addressType)
        {
            try
            {
                // Customer Billing Address
                if (userType == 1 && addressType == 1)
                {
                    var data = (from pa in _appContext.PurchaseOrderAddress
                                join pbsa in _appContext.POBillingShippingAddress on pa.POAddressId equals pbsa.POAddressId
                                join ad in _appContext.Address on pbsa.AddressId equals ad.AddressId
                                join con in _appContext.Contact on pbsa.ContactId equals con.ContactId
                                join po in _appContext.PurchaseOrder on pa.PurchaseOrderId equals po.PurchaseOrderId
                                where pa.PurchaseOrderId == purchaseOrderId
                                       && pbsa.UserType == userType
                                       && pbsa.AddressType == addressType
                                select new
                                {
                                    po.BillToSiteName,
                                    ad.Line1,
                                    ad.Line2,
                                    ad.Line3,
                                    ad.City,
                                    ad.StateOrProvince,
                                    ad.PostalCode,
                                    ad.Country,
                                    pbsa.ContactId,
                                    con.FirstName,
                                    pbsa.Memo
                                }
                     ).FirstOrDefault();

                    return data;
                }

                // Customer Shipping Address
                else if (userType == 1 && addressType == 2)
                {
                    var data = (from pa in _appContext.PurchaseOrderAddress
                                join pbsa in _appContext.POBillingShippingAddress on pa.POAddressId equals pbsa.POAddressId
                                join ad in _appContext.Address on pbsa.AddressId equals ad.AddressId
                                join con in _appContext.Contact on pbsa.ContactId equals con.ContactId
                                join po in _appContext.PurchaseOrder on pa.PurchaseOrderId equals po.PurchaseOrderId
                                where pa.PurchaseOrderId == purchaseOrderId
                                       && pbsa.UserType == userType
                                       && pbsa.AddressType == addressType
                                select new
                                {
                                    po.ShipToSiteName,
                                    ad.Line1,
                                    ad.Line2,
                                    ad.Line3,
                                    ad.City,
                                    ad.StateOrProvince,
                                    ad.PostalCode,
                                    ad.Country,
                                    pbsa.ContactId,
                                    con.FirstName,
                                    pbsa.Memo
                                }
                     ).FirstOrDefault();

                    return data;
                }

                // Vendor Billing Address
                else if (userType == 2 && addressType == 1)
                {
                    var data = (from pa in _appContext.PurchaseOrderAddress
                                join pbsa in _appContext.POBillingShippingAddress on pa.POAddressId equals pbsa.POAddressId
                                join ad in _appContext.Address on pbsa.AddressId equals ad.AddressId
                                join con in _appContext.Contact on pbsa.ContactId equals con.ContactId
                                join po in _appContext.PurchaseOrder on pa.PurchaseOrderId equals po.PurchaseOrderId
                                where pa.PurchaseOrderId == purchaseOrderId
                                       && pbsa.UserType == userType
                                       && pbsa.AddressType == addressType
                                select new
                                {
                                    po.BillToSiteName,
                                    ad.Line1,
                                    ad.Line2,
                                    ad.Line3,
                                    ad.City,
                                    ad.StateOrProvince,
                                    ad.PostalCode,
                                    ad.Country,
                                    pbsa.ContactId,
                                    con.FirstName,
                                    pbsa.Memo
                                }
                     ).FirstOrDefault();

                    return data;
                }

                // Vendor Shipping Address
                else if (userType == 2 && addressType == 2)
                {
                    var data = (from pa in _appContext.PurchaseOrderAddress
                                join pbsa in _appContext.POBillingShippingAddress on pa.POAddressId equals pbsa.POAddressId
                                join ad in _appContext.Address on pbsa.AddressId equals ad.AddressId
                                join con in _appContext.Contact on pbsa.ContactId equals con.ContactId
                                join po in _appContext.PurchaseOrder on pa.PurchaseOrderId equals po.PurchaseOrderId
                                where pa.PurchaseOrderId == purchaseOrderId
                                       && pbsa.UserType == userType
                                       && pbsa.AddressType == addressType
                                select new
                                {
                                    po.ShipToSiteName,
                                    ad.Line1,
                                    ad.Line2,
                                    ad.Line3,
                                    ad.City,
                                    ad.StateOrProvince,
                                    ad.PostalCode,
                                    ad.Country,
                                    pbsa.ContactId,
                                    con.FirstName,
                                    pbsa.Memo
                                }
                     ).FirstOrDefault();

                    return data;
                }

                // Need to implement Company Billing Address

                // Need to implement  Company Shipping Address

                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public long CreatePurchaseOrderShipvia(PurchaseOrderShipVia poShipvia)
        {
            try
            {
                _appContext.PurchaseOrderShipVia.Add(poShipvia);
                _appContext.SaveChanges();

                return poShipvia.POShipViaId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdatePurchaseOrderShipvia(PurchaseOrderShipVia poShipvia)
        {
            try
            {
                _appContext.PurchaseOrderShipVia.Update(poShipvia);
                _appContext.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetPurchaseOrderShipvia(long purchaseOrderId, int userType)
        {
            try
            {
                var data = (from ps in _appContext.PurchaseOrderShipVia
                            join sv in _appContext.ShippingVia on ps.ShipViaId equals sv.ShippingViaId
                            join po in _appContext.PurchaseOrder on ps.PurchaseOrderId equals po.PurchaseOrderId
                            where ps.PurchaseOrderId == purchaseOrderId && ps.UserType == userType
                            select new
                            {
                                sv.ShippingAccountInfo,
                                sv.ShippingId,
                                sv.ShippingURL,
                                ps.HandlingCost,
                                ps.ShippingCost
                            }
                 ).FirstOrDefault();

                return data;
            }

            catch (Exception)
            {

                throw;
            }
        }


        public IEnumerable<object> GetVendorCapabilities(long vendorId)
        {
            try
            {
                var list = (from vc in _appContext.VendorCapabiliy
                            join vct in _appContext.vendorCapabilityType on vc.VendorCapabilityId equals vct.VendorCapabilityId
                            join c in _appContext.capabilityType on vct.CapabilityTypeId equals c.CapabilityTypeId
                            join im in _appContext.ItemMaster on vc.ItemMasterId equals im.ItemMasterId
                            join mp in _appContext.MasterParts on im.MasterPartId equals mp.MasterPartId
                            join ma in _appContext.Manufacturer on mp.ManufacturerId equals ma.ManufacturerId
                            select new
                            {
                                VCId = vc.VendorCapabilityId,
                                Ranking = vc.VendorRanking == null ? "" : vc.VendorRanking,
                                mp.PartNumber,
                                PartDescription = mp.Description,
                                CapabilityType = c.Description,
                                vc.Cost,
                                TAT = vc.TAT == null ? 0 : vc.TAT,
                                ma.Name

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

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

