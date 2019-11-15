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

            short statusId = 0;
            if(poFilters.filters.Status=="Open")
            {
                statusId = 1;
            }
            else if(poFilters.filters.Status == "Pending")
            {
                statusId = 2;
            }
            else if (poFilters.filters.Status == "Fulfilling")
            {
                statusId = 3;
            }
            else if (poFilters.filters.Status == "Closed")
            {
                statusId = 4;
            }

            var totalRecords = (from po in _appContext.PurchaseOrder
                                join emp in _appContext.Employee on po.RequestedBy equals emp.EmployeeId
                                join v in _appContext.Vendor on po.VendorId equals v.VendorId
                                join appr in _appContext.Employee on po.ApproverId equals appr.EmployeeId into approver
                                from appr in approver.DefaultIfEmpty()
                                where po.IsDeleted == false
                                && po.PurchaseOrderNumber.Contains(!String.IsNullOrEmpty(poFilters.filters.PurchaseOrderNo) ? poFilters.filters.PurchaseOrderNo : po.PurchaseOrderNumber)
                                //&& Convert.ToString(po.OpenDate) == (Convert.ToString(poFilters.filters.OpenDate) == "1/1/0001 12:00:00 AM" ? Convert.ToString(po.OpenDate) : Convert.ToString(poFilters.filters.OpenDate))
                                //&& Convert.ToString(po.ClosedDate) == (Convert.ToString(poFilters.filters.ClosedDate) == "1/1/0001 12:00:00 AM" ? Convert.ToString(po.ClosedDate) : Convert.ToString(poFilters.filters.ClosedDate))
                                && v.VendorName.Contains(!String.IsNullOrEmpty(poFilters.filters.VendorName) ? poFilters.filters.VendorName : v.VendorName)
                                && v.VendorCode.Contains(!String.IsNullOrEmpty(poFilters.filters.VendorCode) ? poFilters.filters.VendorCode : v.VendorCode)
                                && po.StatusId == (statusId > 0 ? statusId : po.StatusId)
                                && emp.FirstName.Contains(!String.IsNullOrEmpty(poFilters.filters.ApprovedBy) ? poFilters.filters.ApprovedBy : emp.FirstName)
                                select new
                                {
                                    po.PurchaseOrderId

                                }).Distinct()
                                    .Count();

            var purchaseOrderList = (from po in _appContext.PurchaseOrder
                                     join emp in _appContext.Employee on po.RequestedBy equals emp.EmployeeId
                                     join v in _appContext.Vendor on po.VendorId equals v.VendorId
                                     join appr in _appContext.Employee on po.ApproverId equals appr.EmployeeId into approver
                                     from appr in approver.DefaultIfEmpty()
                                     where po.IsDeleted == false
                                     && po.PurchaseOrderNumber.Contains(!String.IsNullOrEmpty(poFilters.filters.PurchaseOrderNo) ? poFilters.filters.PurchaseOrderNo : po.PurchaseOrderNumber)
                                     //&& Convert.ToString(po.OpenDate) == (Convert.ToString(poFilters.filters.OpenDate) == "1/1/0001 12:00:00 AM" ? Convert.ToString(po.OpenDate) : Convert.ToString(poFilters.filters.OpenDate))
                                     //&& Convert.ToString(po.ClosedDate) == (Convert.ToString(poFilters.filters.ClosedDate) == "1/1/0001 12:00:00 AM" ? Convert.ToString(po.ClosedDate) : Convert.ToString(poFilters.filters.ClosedDate))
                                     && v.VendorName.Contains(!String.IsNullOrEmpty(poFilters.filters.VendorName) ? poFilters.filters.VendorName : v.VendorName)
                                     && v.VendorCode.Contains(!String.IsNullOrEmpty(poFilters.filters.VendorCode) ? poFilters.filters.VendorCode : v.VendorCode)
                                     && po.StatusId == (statusId > 0 ? statusId : po.StatusId)
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
                                         ApprovedBy = appr==null?"": appr.FirstName,
                                         po.CreatedDate,
                                         po.IsActive,
                                         TotalRecords = totalRecords
                                     }).Distinct().OrderByDescending(p => p.CreatedDate)
                                     .Skip(skip)
                                    .Take(take)
                                    .ToList();



            return purchaseOrderList;
        }

        public IEnumerable<object> RecevingPolist()
        {
            

            var purchaseOrderList = (from po in _appContext.PurchaseOrder
                                     join emp in _appContext.Employee on po.RequestedBy equals emp.EmployeeId
                                     join v in _appContext.Vendor on po.VendorId equals v.VendorId
                                     join appr in _appContext.Employee on po.ApproverId equals appr.EmployeeId into approver
                                     from appr in approver.DefaultIfEmpty()
                                     where po.IsDeleted == false
                                     select new
                                     {
                                         po.PurchaseOrderId,
                                         po.PurchaseOrderNumber,
                                         OpenDate = po.OpenDate,
                                         ClosedDate = po.ClosedDate,
                                         v.VendorName,
                                         v.VendorCode,
                                         Status = po.StatusId == 1 ? "Open" : (po.StatusId == 2 ? "Pending" : (po.StatusId == 3 ? "Fulfilling" : "Closed")),
                                         StatusId = po.StatusId,
                                         RequestedBy = emp.FirstName,
                                         ApprovedBy = appr == null ? "" : appr.FirstName,
                                         po.CreatedDate,
                                         po.IsActive,
                                     }).Distinct().OrderByDescending(p => p.CreatedDate)
                                    .ToList();



            return purchaseOrderList;
        }

        public IEnumerable<DAL.Models.PurchaseOrder> GetPurchaseOrderListLite()
        {
            var purchaseOrderList = _appContext.PurchaseOrder.Where(c => c.IsActive == true).OrderByDescending(c => c.PurchaseOrderId)
                .Select(c => new PurchaseOrder { PurchaseOrderId = c.PurchaseOrderId, PurchaseOrderNumber = c.PurchaseOrderNumber }).ToList();
            return purchaseOrderList;
        }

        public IEnumerable<PurchaseOrder> StockLinePOList()
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
                                pal.Level,
                                pa.POApproverId,
                                pal.POApproverListId
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
                            //join ma in _appContext.Manufacturer on mp.ManufacturerId equals ma.ManufacturerId
                            join ma in _appContext.Manufacturer on mp.ManufacturerId equals ma.ManufacturerId into manu
                            from ma in manu.DefaultIfEmpty()
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

        public object PurchaseOrderById(long purchaseOrderId)
        {
            var data = (from po in _appContext.PurchaseOrder
                        join v in _appContext.Vendor on po.VendorId equals v.VendorId
                        join vc in _appContext.VendorContact on v.VendorId equals vc.VendorId
                        join con in _appContext.Contact on vc.ContactId equals con.ContactId
                        where po.PurchaseOrderId == purchaseOrderId
                        select new
                        {
                            po
                        }).FirstOrDefault();

            return data;
        }

        public List<PurchaseOrderPart> GetPurchaseOrderParts(long purchaseOrderId)
        {
            List<PurchaseOrderPart> purchaseOrderParts = new List<PurchaseOrderPart>();
            List<PurchaseOrderSplitParts> purchaseOrderSplitParts = new List<PurchaseOrderSplitParts>();
            
            PurchaseOrderPart purchaseOrderPart=null;
            PurchaseOrderSplitParts purchaseOrderSplitPart;
            try
            {
                var list = (from pop in _appContext.PurchaseOrderPart
                            join po in _appContext.PurchaseOrder on pop.PurchaseOrderId equals po.PurchaseOrderId
                            where pop.PurchaseOrderId==purchaseOrderId 
                            select new
                            {
                                pop
                            }).ToList();

                if(list!=null && list.Count>0)
                {
                    foreach(var part in list)
                    {
                        if (part.pop.isParent)
                        {
                            purchaseOrderPart = new PurchaseOrderPart();
                            purchaseOrderPart.PurchaseOrderPartRecordId = part.pop.PurchaseOrderPartRecordId;
                            purchaseOrderPart.PurchaseOrderId = part.pop.PurchaseOrderId;
                            purchaseOrderPart.isParent = true;
                            purchaseOrderPart.SerialNumber = part.pop.SerialNumber;
                            purchaseOrderPart.ItemMasterId = part.pop.ItemMasterId;
                            purchaseOrderPart.ManufacturerId = part.pop.ManufacturerId;
                            purchaseOrderPart.GeneralLedgerAccounId = part.pop.GeneralLedgerAccounId;
                            purchaseOrderPart.UOMId = part.pop.UOMId;
                            purchaseOrderPart.NeedByDate = part.pop.NeedByDate;
                            purchaseOrderPart.ConditionId = part.pop.ConditionId;
                            purchaseOrderPart.QuantityOrdered = part.pop.QuantityOrdered;
                            purchaseOrderPart.UnitCost = part.pop.UnitCost;
                            purchaseOrderPart.DiscountAmount = part.pop.DiscountAmount;
                            purchaseOrderPart.DiscountPercent = part.pop.DiscountPercent;
                            purchaseOrderPart.ExtendedCost = part.pop.ExtendedCost;
                            purchaseOrderPart.FunctionalCurrencyId = part.pop.FunctionalCurrencyId;
                            purchaseOrderPart.ReportCurrencyId = part.pop.ReportCurrencyId;
                            purchaseOrderPart.ForeignExchangeRate = part.pop.ForeignExchangeRate;
                            purchaseOrderPart.WorkOrderId = part.pop.WorkOrderId;
                            purchaseOrderPart.RepairOrderId = part.pop.RepairOrderId;
                            purchaseOrderPart.SalesOrderId = part.pop.SalesOrderId;
                            purchaseOrderPart.ManagementStructureId = part.pop.ManagementStructureId;
                            purchaseOrderPart.Memo = part.pop.Memo;
                            purchaseOrderPart.MasterCompanyId = part.pop.MasterCompanyId;
                            purchaseOrderPart.CreatedBy = part.pop.CreatedBy;
                            purchaseOrderPart.CreatedDate = part.pop.CreatedDate;
                            purchaseOrderPart.UpdatedBy = part.pop.UpdatedBy;
                            purchaseOrderPart.UpdatedDate = part.pop.UpdatedDate;
                            purchaseOrderPart.IsActive = part.pop.IsActive;
                            purchaseOrderPart.DiscountPerUnit = part.pop.DiscountPerUnit;
                            

                            purchaseOrderParts.Add(purchaseOrderPart);
                        }
                        else
                        {
                            purchaseOrderPart.PurchaseOrderSplitParts = new List<PurchaseOrderSplitParts>();
                            purchaseOrderSplitPart = new PurchaseOrderSplitParts();
                            var splitParts = list.Where(p => p.pop.ParentId == part.pop.ParentId).ToList();

                            if(splitParts != null && splitParts.Count>0)
                            {
                                foreach(var splitPart in splitParts)
                                {
                                    purchaseOrderSplitPart.AssetId = 0;
                                    purchaseOrderSplitPart.isParent = false;
                                    purchaseOrderSplitPart.ItemMasterId = splitPart.pop.ItemMasterId;
                                    purchaseOrderSplitPart.ManagementStructureId = splitPart.pop.ManagementStructureId;
                                    purchaseOrderSplitPart.NeedByDate = splitPart.pop.NeedByDate;
                                    purchaseOrderSplitPart.PartNumberId = splitPart.pop.ItemMasterId;
                                    purchaseOrderSplitPart.POPartSplitAddressId = splitPart.pop.POPartSplitAddressId;
                                    purchaseOrderSplitPart.POPartSplitUserId = splitPart.pop.POPartSplitUserId;
                                    purchaseOrderSplitPart.POPartSplitUserTypeId = splitPart.pop.POPartSplitUserTypeId;
                                    purchaseOrderSplitPart.PurchaseOrderId = splitPart.pop.PurchaseOrderId;
                                    purchaseOrderSplitPart.PurchaseOrderPartRecordId = splitPart.pop.PurchaseOrderPartRecordId;
                                    purchaseOrderSplitPart.QuantityOrdered = splitPart.pop.QuantityOrdered;
                                    purchaseOrderSplitPart.SerialNumber = splitPart.pop.SerialNumber;
                                    purchaseOrderSplitPart.UOMId = splitPart.pop.UOMId;
                                    purchaseOrderSplitPart.POPartSplitAddress1 = splitPart.pop.POPartSplitAddress1;
                                    purchaseOrderSplitPart.POPartSplitAddress2 = splitPart.pop.POPartSplitAddress2;
                                    purchaseOrderSplitPart.POPartSplitAddress3 = splitPart.pop.POPartSplitAddress3;
                                    purchaseOrderSplitPart.POPartSplitCity = splitPart.pop.POPartSplitCity;
                                    purchaseOrderSplitPart.POPartSplitState = splitPart.pop.POPartSplitState;
                                    purchaseOrderSplitPart.POPartSplitCountry = splitPart.pop.POPartSplitCountry;
                                    purchaseOrderSplitPart.POPartSplitPostalCode = splitPart.pop.POPartSplitPostalCode;
                                    purchaseOrderSplitPart.POPartSplitAddressId = splitPart.pop.POPartSplitAddressId;

                                    purchaseOrderPart.PurchaseOrderSplitParts.Add(purchaseOrderSplitPart);
                                }
                               // purchaseOrderParts.Add(purchaseOrderPart);


                            }
                        }



                        
                    }
                }

                return purchaseOrderParts;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeletePurchaseOrder(long purchaseOrderId,string updatedBy)
        {
            try
            {
                PurchaseOrder purchaseOrder = new PurchaseOrder();
                purchaseOrder.PurchaseOrderId = purchaseOrderId;
                purchaseOrder.IsDeleted = true;
                purchaseOrder.UpdatedDate = DateTime.Now;
                purchaseOrder.UpdatedBy = updatedBy;

                _appContext.PurchaseOrder.Attach(purchaseOrder);

                _context.Entry(purchaseOrder).Property(p => p.IsDeleted).IsModified = true;
                _context.Entry(purchaseOrder).Property(p => p.UpdatedDate).IsModified = true;
                _context.Entry(purchaseOrder).Property(p => p.UpdatedBy).IsModified = true;

                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void PurchaseOrderStatus(long purchaseOrderId,bool status, string updatedBy)
        {
            try
            {
                PurchaseOrder purchaseOrder = new PurchaseOrder();
                purchaseOrder.PurchaseOrderId = purchaseOrderId;
                purchaseOrder.IsActive = status;
                purchaseOrder.UpdatedDate = DateTime.Now;
                purchaseOrder.UpdatedBy = updatedBy;

                _appContext.PurchaseOrder.Attach(purchaseOrder);

                _context.Entry(purchaseOrder).Property(p => p.IsActive).IsModified = true;
                _context.Entry(purchaseOrder).Property(p => p.UpdatedDate).IsModified = true;
                _context.Entry(purchaseOrder).Property(p => p.UpdatedBy).IsModified = true;

                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetPurchaseOrderlistByVendor(long vendorId,int pageNo,int pageSize)
        {
            var pageNumber = pageNo + 1;
            var take = pageSize;
            var skip = take * (pageNumber - 1);

            var totalRecords = (from po in _appContext.PurchaseOrder
                                join emp in _appContext.Employee on po.RequestedBy equals emp.EmployeeId
                                join v in _appContext.Vendor on po.VendorId equals v.VendorId
                                join appr in _appContext.Employee on po.ApproverId equals appr.EmployeeId into approver
                                from appr in approver.DefaultIfEmpty()
                                where po.IsDeleted == false && po.VendorId==vendorId
                               
                                select new
                                {
                                    po.PurchaseOrderId

                                }).Distinct()
                                  .Count();

            var purchaseOrderList = (from po in _appContext.PurchaseOrder
                                     join emp in _appContext.Employee on po.RequestedBy equals emp.EmployeeId
                                     join v in _appContext.Vendor on po.VendorId equals v.VendorId
                                     join appr in _appContext.Employee on po.ApproverId equals appr.EmployeeId into approver
                                     from appr in approver.DefaultIfEmpty()
                                     where po.IsDeleted == false && po.VendorId == vendorId
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
                                         ApprovedBy = appr == null ? "" : appr.FirstName,
                                         po.CreatedDate,
                                         po.IsActive,
                                         TotalRecords = totalRecords
                                     }).Distinct().OrderByDescending(p => p.CreatedDate)
                                     .Skip(skip)
                                    .Take(take)
                                    .ToList();



            return purchaseOrderList;
        }


        public IEnumerable<object> GetPurchaseOrderHistory(long purchaseOrderId)
        {
            try
            {
                var purchaseOrderList = (from po in _appContext.PurchaseOrderAudit
                                         join emp in _appContext.Employee on po.RequestedBy equals emp.EmployeeId
                                         join v in _appContext.Vendor on po.VendorId equals v.VendorId
                                         join appr in _appContext.Employee on po.ApproverId equals appr.EmployeeId into approver
                                         from appr in approver.DefaultIfEmpty()
                                         where po.IsDeleted == false && po.PurchaseOrderId==purchaseOrderId
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
                                             ApprovedBy = appr == null ? "-" : appr.FirstName,
                                             po.UpdatedDate,
                                             po.IsActive,
                                         }).OrderByDescending(p => p.UpdatedDate)
                                    .ToList();



                return purchaseOrderList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public dynamic PurchaseOrderView(long purchaseOrderId)
        {
            try
            {
                var data = (from po in _appContext.PurchaseOrder
                            join v in _appContext.Vendor on po.VendorId equals v.VendorId
                            join req in _appContext.Employee on po.RequestedBy equals req.EmployeeId

                            join app in _appContext.Employee on po.ApproverId equals app.EmployeeId into approver
                            from app in approver.DefaultIfEmpty()

                            join pr in _appContext.Priority on po.PriorityId equals pr.PriorityId
                            join vc in _appContext.VendorContact on v.VendorId equals vc.VendorId
                            join con in _appContext.Contact on vc.ContactId equals con.ContactId
                            join ct in _appContext.CreditTerms on v.CreditTermsId equals ct.CreditTermsId
                            join shcust in _appContext.Customer on po.ShipToUserId equals shcust.CustomerId into shipToCust
                            from shcust in shipToCust.DefaultIfEmpty()
                            join shcomp in _appContext.LegalEntity on po.ShipToUserId equals shcomp.LegalEntityId into shipToComp
                            from shcomp in shipToComp.DefaultIfEmpty()
                            join shv in _appContext.Vendor on po.ShipToUserId equals shv.VendorId into shipToVen
                            from shv in shipToVen.DefaultIfEmpty()
                            join blcust in _appContext.Customer on po.ShipToUserId equals blcust.CustomerId into billToCust
                            from blcust in billToCust.DefaultIfEmpty()
                            join blcomp in _appContext.LegalEntity on po.ShipToUserId equals blcomp.LegalEntityId into billToComp
                            from blcomp in billToComp.DefaultIfEmpty()
                            join blv in _appContext.Vendor on po.ShipToUserId equals blv.VendorId into billToVen
                            from blv in billToVen.DefaultIfEmpty()

                            where po.PurchaseOrderId == purchaseOrderId
                            select new
                            {
                                po.PurchaseOrderNumber,
                                v.VendorName,
                                Requisitioner = req.FirstName,
                                po.OpenDate, 
                                v.VendorCode,
                                Approver = app.FirstName,
                                po.ClosedDate,
                                con.WorkPhone,
                                Status = po.StatusId == 1 ? "Open" : (po.StatusId == 2 ? "Pending" : (po.StatusId == 3 ? "Fulfilling" : "Closed")),
                                pr.Description,
                                v.CreditLimit,
                                CreditTerm = ct.Name,
                                po.Resale,
                                po.Notes,
                                po.DeferredReceiver,
                                ShipToUserType = po.ShipToUserType == 1 ? "Customer" : (po.ShipToUserType == 2 ? "Vendor" : "Company"),
                                ShipToUser = po.ShipToUserType == 1 ? shcust.Name : (po.ShipToUserType == 2 ? shv.VendorName : shcomp.Name),
                                po.ShipToSiteName,
                                po.ShipToAddress1,
                                po.ShipToAddress2,
                                po.ShipToAddress3,
                                po.ShipToCity,
                                po.ShipToState,
                                po.ShipToCountry,
                                po.ShipToPostalCode,
                                po.ShipToContact,
                                po.ShipToMemo,
                                po.ShipVia,
                                po.ShippingCost,
                                po.HandlingCost,
                                po.ShippingAccountNo,
                                po.ShippingId,
                                po.ShippingURL,

                                BillToToUserType = po.BillToUserType == 1 ? "Customer" : (po.BillToUserType == 2 ? "Vendor" : "Company"),
                                BillToUser = po.BillToUserType == 1 ? blcust.Name : (po.BillToUserType == 2 ? blv.VendorName : blcomp.Name),
                                po.BillToSiteName,
                                po.BillToAddress1,
                                po.BillToAddress2,
                                po.BillToAddress3,
                                po.BillToCity,
                                po.BillToState,
                                po.BillToCountry,
                                po.BillToPostalCode,
                                po.BillToContact,
                                po.BillToMemo,
                                po.VendorId,
                                po.ManagementStructureId,
                                po.NeedByDate,
                                po.DateApproved
                            }).FirstOrDefault();

                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<PurchaseOrderPart> GetPurchaseOrderPartsView(long purchaseOrderId)
        {
            List<PurchaseOrderPart> purchaseOrderParts = new List<PurchaseOrderPart>();
            List<PurchaseOrderSplitParts> purchaseOrderSplitParts = new List<PurchaseOrderSplitParts>();

            PurchaseOrderPart purchaseOrderPart = null;
            PurchaseOrderSplitParts purchaseOrderSplitPart;
            try
            {
                var list = (from pop in _appContext.PurchaseOrderPart
                            join po in _appContext.PurchaseOrder on pop.PurchaseOrderId equals po.PurchaseOrderId
                            join im in _appContext.ItemMaster on pop.ItemMasterId equals im.ItemMasterId
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            join gla in _appContext.GLAccount on im.GLAccountId equals gla.GLAccountId into glacc
                            from gla in glacc.DefaultIfEmpty()
                            join uom in _appContext.UnitOfMeasure on im.PurchaseUnitOfMeasureId equals uom.UnitOfMeasureId into uoms
                            from uom in uoms.DefaultIfEmpty()
                            join cond in _appContext.Condition on pop.ConditionId equals cond.ConditionId
                            join fcurr in _appContext.Currency on pop.FunctionalCurrencyId equals fcurr.CurrencyId
                            join rcurr in _appContext.Currency on pop.ReportCurrencyId equals rcurr.CurrencyId

                            join wo in _appContext.WorkOrder on pop.WorkOrderId equals wo.WorkOrderId into won
                            from wo in won.DefaultIfEmpty()
                                //join wo in _appContext.SalesOrder on pop.SalesOrderId equals wo.WorkOrderId into won
                                //from wo in won.DefaultIfEmpty()
                            //join ro in _appContext.RepairOrder on pop.RepairOrderId equals ro.RepairOrderId into ron
                            //from ro in ron.DefaultIfEmpty()
                            join shcust in _appContext.Customer on po.ShipToUserId equals shcust.CustomerId into shipToCust
                            from shcust in shipToCust.DefaultIfEmpty()
                            join shcomp in _appContext.LegalEntity on po.ShipToUserId equals shcomp.LegalEntityId into shipToComp
                            from shcomp in shipToComp.DefaultIfEmpty()
                            join shv in _appContext.Vendor on po.ShipToUserId equals shv.VendorId into shipToVen
                            from shv in shipToVen.DefaultIfEmpty()

                            where pop.PurchaseOrderId == purchaseOrderId
                            select new
                            {
                                pop,
                                im.PartNumber,
                                im.PartAlternatePartId,
                                im.PartDescription,
                                Manufacturer = man.Name,
                                GLAccount = gla.AccountName,
                                UnitOfMeasure = uom.Description,
                                Condition = cond.Description,
                                FunctionalCurrency = fcurr.DisplayName,
                                ReportCurrency = rcurr.DisplayName,
                                WorkOrderNo = wo.WorkOrderNum,
                                SalesOrderNo = "",
                               // ReapairOrderNo=ro.RepairOrderNumber,
                                CustomerName=shcust.Name,
                                VendorName=shv.VendorName,
                                ComapnyName=shcomp.Name

                            }).ToList();

                if (list != null && list.Count > 0)
                {
                    foreach (var part in list)
                    {
                        if (part.pop.isParent)
                        {
                            purchaseOrderPart = new PurchaseOrderPart();

                            purchaseOrderPart.PartNumber = part.PartNumber;
                            purchaseOrderPart.AltPartNumber = "";
                            purchaseOrderPart.PartDescription = part.PartDescription;
                            purchaseOrderPart.Manufacturer = part.Manufacturer;
                            purchaseOrderPart.GLAccount = part.GLAccount;
                            purchaseOrderPart.UnitOfMeasure = part.UnitOfMeasure;
                            purchaseOrderPart.NeedByDate = part.pop.NeedByDate;
                            purchaseOrderPart.Condition = part.Condition;
                            purchaseOrderPart.QuantityOrdered = part.pop.QuantityOrdered;
                            purchaseOrderPart.UnitCost = part.pop.UnitCost;
                            purchaseOrderPart.DiscountAmount = part.pop.DiscountAmount;
                            purchaseOrderPart.DiscountPercent = part.pop.DiscountPercent;
                            purchaseOrderPart.DiscountPerUnit = part.pop.DiscountPerUnit;
                            purchaseOrderPart.ExtendedCost = part.pop.ExtendedCost;
                            purchaseOrderPart.FunctionalCurrency = part.FunctionalCurrency;
                            purchaseOrderPart.ForeignExchangeRate = part.pop.ForeignExchangeRate;
                            purchaseOrderPart.ReportCurrency = part.ReportCurrency;
                            purchaseOrderPart.WorkOrderNo = part.WorkOrderNo;
                            purchaseOrderPart.SalesOrderNo = part.SalesOrderNo;
                            //  purchaseOrderPart.ReapairOrderNo = part.ReapairOrderNo;
                            purchaseOrderPart.Memo = part.pop.Memo;
                            purchaseOrderPart.isParent=true;
                            purchaseOrderPart.PurchaseOrderPartRecordId = part.pop.PurchaseOrderPartRecordId;
                            purchaseOrderPart.ParentId = part.pop.ParentId;
                            purchaseOrderPart.ManagementStructureId = part.pop.ManagementStructureId;


                            purchaseOrderParts.Add(purchaseOrderPart);
                        }
                        else
                        {
                            purchaseOrderPart.PurchaseOrderSplitParts = new List<PurchaseOrderSplitParts>();
                            purchaseOrderSplitPart = new PurchaseOrderSplitParts();
                            var splitParts = list.Where(p => p.pop.ParentId == part.pop.ParentId).ToList();

                            if (splitParts != null && splitParts.Count > 0)
                            {
                                foreach (var splitPart in splitParts)
                                {
                                    purchaseOrderSplitPart.AssetId = 0;
                                    purchaseOrderSplitPart.isParent = false;
                                    purchaseOrderSplitPart.AltPartNumber = "";
                                    purchaseOrderSplitPart.PartDescription = part.PartDescription;
                                    purchaseOrderSplitPart.Manufacturer = part.Manufacturer;
                                    purchaseOrderSplitPart.UserType = splitPart.pop.POPartSplitUserTypeId == 1 ? "Customer" : (splitPart.pop.POPartSplitUserTypeId == 2 ? "Vendor" : "Company");
                                    purchaseOrderSplitPart.User = splitPart.pop.POPartSplitUserId == 1 ? splitPart.CustomerName : (splitPart.pop.POPartSplitUserId == 2 ? splitPart.VendorName : splitPart.ComapnyName);
                                    purchaseOrderSplitPart.POPartSplitAddress1 = splitPart.pop.POPartSplitAddress1;
                                    purchaseOrderSplitPart.POPartSplitAddress2 = splitPart.pop.POPartSplitAddress2;
                                    purchaseOrderSplitPart.POPartSplitAddress3 = splitPart.pop.POPartSplitAddress3;
                                    purchaseOrderSplitPart.POPartSplitCity = splitPart.pop.POPartSplitCity;
                                    purchaseOrderSplitPart.POPartSplitState = splitPart.pop.POPartSplitState;
                                    purchaseOrderSplitPart.POPartSplitCountry = splitPart.pop.POPartSplitCountry;
                                    purchaseOrderSplitPart.POPartSplitPostalCode = splitPart.pop.POPartSplitPostalCode;
                                    purchaseOrderSplitPart.NeedByDate = splitPart.pop.NeedByDate;
                                    purchaseOrderSplitPart.QuantityOrdered = splitPart.pop.QuantityOrdered;
                                    purchaseOrderSplitPart.UnitOfMeasure = splitPart.UnitOfMeasure;
                                    purchaseOrderSplitPart.SerialNumber = splitPart.pop.SerialNumber;
                                    purchaseOrderSplitPart.PurchaseOrderId = splitPart.pop.PurchaseOrderId;
                                    purchaseOrderSplitPart.PurchaseOrderPartRecordId = splitPart.pop.PurchaseOrderPartRecordId;
                                    purchaseOrderSplitPart.ManagementStructureId = splitPart.pop.ManagementStructureId;
                                    purchaseOrderSplitPart.POPartSplitAddressId = splitPart.pop.POPartSplitAddressId;

                                    purchaseOrderPart.PurchaseOrderSplitParts.Add(purchaseOrderSplitPart);
                                }
                                // purchaseOrderParts.Add(purchaseOrderPart);


                            }
                        }




                    }
                }

                return purchaseOrderParts;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public PurchaseOrderEmail PurchaseOrderEmail(long purchaseOrderId)
        {
            PurchaseOrderEmail purchaseOrderEmail = new PurchaseOrderEmail();
            try
            {
                var data = (from po in _appContext.PurchaseOrder
                            join v in _appContext.Vendor on po.VendorId equals v.VendorId
                            join shcust in _appContext.Customer on po.ShipToUserId equals shcust.CustomerId into shipToCust
                            from shcust in shipToCust.DefaultIfEmpty()
                            join shcomp in _appContext.LegalEntity on po.ShipToUserId equals shcomp.LegalEntityId into shipToComp
                            from shcomp in shipToComp.DefaultIfEmpty()
                            join shv in _appContext.Vendor on po.ShipToUserId equals shv.VendorId into shipToVen
                            from shv in shipToVen.DefaultIfEmpty()
                            join blcust in _appContext.Customer on po.ShipToUserId equals blcust.CustomerId into billToCust
                            from blcust in billToCust.DefaultIfEmpty()
                            join blcomp in _appContext.LegalEntity on po.ShipToUserId equals blcomp.LegalEntityId into billToComp
                            from blcomp in billToComp.DefaultIfEmpty()
                            join blv in _appContext.Vendor on po.ShipToUserId equals blv.VendorId into billToVen
                            from blv in billToVen.DefaultIfEmpty()

                            where po.PurchaseOrderId == purchaseOrderId
                            select new
                            {
                                po.PurchaseOrderId,
                                po.PurchaseOrderNumber,
                                v.VendorName,
                               PODate= po.OpenDate==null?"":po.OpenDate.ToString("ddMMMyyyy"),
                                ShipToUser = po.ShipToUserType == 1 ? shcust.Name : (po.ShipToUserType == 2 ? shv.VendorName : shcomp.Name),
                                BillToUser = po.BillToUserType == 1 ? blcust.Name : (po.BillToUserType == 2 ? blv.VendorName : blcomp.Name),
                            }).FirstOrDefault();

                if(data!=null)
                {
                    purchaseOrderEmail.PurchaseOrderId = data.PurchaseOrderId;
                    purchaseOrderEmail.PurchaseOrderNumber = data.PurchaseOrderNumber;
                    purchaseOrderEmail.VendorName = data.VendorName;
                    purchaseOrderEmail.PoDate = data.PODate;
                    purchaseOrderEmail.ShipToUser = data.ShipToUser;
                    purchaseOrderEmail.BillToUser = data.BillToUser;

                }

                var list = (from pop in _appContext.PurchaseOrderPart
                            join im in _appContext.ItemMaster on pop.ItemMasterId equals im.ItemMasterId
                            where pop.PurchaseOrderId == purchaseOrderId
                            select new
                            {
                                im.PartNumber,
                                pop.QuantityOrdered,
                                pop.UnitCost,
                                pop.DiscountAmount,
                                pop.ExtendedCost
                            }).ToList();

                if(list!=null && list.Count>0)
                {
                    purchaseOrderEmail.PurchaseOrderParts = new List<PurchaseOrderPart>();
                    foreach (var item in list)
                    {
                        PurchaseOrderPart purchaseOrderPart = new PurchaseOrderPart();
                        purchaseOrderPart.PartNumber = item.PartNumber;
                        purchaseOrderPart.QuantityOrdered = item.QuantityOrdered;
                        purchaseOrderPart.UnitCost = item.UnitCost;
                        purchaseOrderPart.DiscountAmount = item.DiscountAmount;
                        purchaseOrderPart.ExtendedCost = item.ExtendedCost;
                        purchaseOrderEmail.PurchaseOrderParts.Add(purchaseOrderPart);
                    }
                }

                return purchaseOrderEmail;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }

    
}

