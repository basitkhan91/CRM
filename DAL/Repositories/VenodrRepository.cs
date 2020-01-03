
using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{

    public class VenodrRepository : Repository<Vendor>, IVendor
    {
        List<Vendor> iList = new List<Vendor>();
        public VenodrRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<object> GetVendorsList(Filters<VendorFilters> vendorFilters)
        {
            if (vendorFilters.filters == null)
                vendorFilters.filters = new VendorFilters();
            var pageNumber = vendorFilters.first + 1;
            var take = vendorFilters.rows;
            var skip = take * (pageNumber - 1);

            short statusId = 2;


            if (!string.IsNullOrEmpty(vendorFilters.filters.Status))
            {
                if (vendorFilters.filters.Status.ToLower() == "inactive")
                {
                    statusId = 0;
                }
                else if (vendorFilters.filters.Status.ToLower() == "active")
                {
                    statusId = 1;
                }
                else
                {
                    statusId = 2;
                }

            }
            var totalRecords = (from t in _appContext.Vendor
                                join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                                from vt in vtt.DefaultIfEmpty()
                                    //join ct in _appContext.CreditTerms on t.CreditTermsId equals ct.CreditTermsId into crd
                                    //from ct in crd.DefaultIfEmpty()
                                    //join cu in _appContext.Currency on t.CurrencyId equals cu.CurrencyId into curr
                                    //from cu in curr.DefaultIfEmpty()
                                    //join di in _appContext.Discount on t.DiscountId equals di.DiscountId into dis
                                    //from di in dis.DefaultIfEmpty()
                                join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                                from vc in vcd.DefaultIfEmpty()
                                join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                                from vca in vcad.DefaultIfEmpty()
                                where (t.IsDelete == false || t.IsDelete == null)
                                  && t.VendorName.Contains(!String.IsNullOrEmpty(vendorFilters.filters.VendorName) ? vendorFilters.filters.VendorName : t.VendorName)
                                  && t.VendorCode.Contains(!String.IsNullOrEmpty(vendorFilters.filters.VendorCode) ? vendorFilters.filters.VendorCode : t.VendorCode)
                                  && t.VendorEmail.Contains(!String.IsNullOrEmpty(vendorFilters.filters.VendorEmail) ? vendorFilters.filters.VendorEmail : t.VendorEmail)
                                  //&& t.IsActive == (statusId != 2 ? Convert.ToBoolean(statusId) : t.IsActive)
                                  && t.IsActive == (statusId == 2 ? t.IsActive : (statusId == 0 ? false :  true))
                                  && ad.City.Contains(!String.IsNullOrEmpty(vendorFilters.filters.City) ? vendorFilters.filters.City : ad.City)
                                  && ad.StateOrProvince.Contains(!String.IsNullOrEmpty(vendorFilters.filters.StateOrProvince) ? vendorFilters.filters.StateOrProvince : ad.StateOrProvince)
                                  //&& vc.ClassificationName.Contains(!String.IsNullOrEmpty(vendorFilters.filters.ClassificationName) ? vendorFilters.filters.ClassificationName : vc.ClassificationName)
                                  //&& vca.capabilityDescription.Contains(!String.IsNullOrEmpty(vendorFilters.filters.VendorCapabilityName) ? vendorFilters.filters.VendorCapabilityName : vca.capabilityDescription)
                                  && t.VendorPhone.Contains(!String.IsNullOrEmpty(vendorFilters.filters.VendorPhoneContact) ? vendorFilters.filters.VendorPhoneContact : t.VendorPhone)
                                 // && vt.Description.Contains(!String.IsNullOrEmpty(vendorFilters.filters.Description) ? vendorFilters.filters.Description : vt.Description)
                                select new
                                {
                                    t.VendorId,

                                }
                         ).Distinct().Count();

            var list = (from t in _appContext.Vendor
                        join ad in _appContext.Address on t.AddressId equals ad.AddressId
                        join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                        from vt in vtt.DefaultIfEmpty()
                            //join ct in _appContext.CreditTerms on t.CreditTermsId equals ct.CreditTermsId into crd
                            //from ct in crd.DefaultIfEmpty()
                            //join cu in _appContext.Currency on t.CurrencyId equals cu.CurrencyId into curr
                            //from cu in curr.DefaultIfEmpty()
                            //join di in _appContext.Discount on t.DiscountId equals di.DiscountId into dis
                            //from di in dis.DefaultIfEmpty()
                        join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                        from vc in vcd.DefaultIfEmpty()
                        join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                        from vca in vcad.DefaultIfEmpty()
                        where (t.IsDelete == false || t.IsDelete == null)
                          && t.VendorName.Contains(!String.IsNullOrEmpty(vendorFilters.filters.VendorName) ? vendorFilters.filters.VendorName : t.VendorName)
                          && t.VendorCode.Contains(!String.IsNullOrEmpty(vendorFilters.filters.VendorCode) ? vendorFilters.filters.VendorCode : t.VendorCode)
                          && t.VendorEmail.Contains(!String.IsNullOrEmpty(vendorFilters.filters.VendorEmail) ? vendorFilters.filters.VendorEmail : t.VendorEmail)
                           && t.IsActive == (statusId == 2 ? t.IsActive : (statusId == 0 ? false : true))
                          && ad.City.Contains(!String.IsNullOrEmpty(vendorFilters.filters.City) ? vendorFilters.filters.City : ad.City)
                          && ad.StateOrProvince.Contains(!String.IsNullOrEmpty(vendorFilters.filters.StateOrProvince) ? vendorFilters.filters.StateOrProvince : ad.StateOrProvince)
                          //&& vc.ClassificationName.Contains(!String.IsNullOrEmpty(vendorFilters.filters.ClassificationName) ? vendorFilters.filters.ClassificationName : vc.ClassificationName)
                          //&& vca.capabilityDescription.Contains(!String.IsNullOrEmpty(vendorFilters.filters.VendorCapabilityName) ? vendorFilters.filters.VendorCapabilityName : vca.capabilityDescription)
                          && t.VendorPhone.Contains(!String.IsNullOrEmpty(vendorFilters.filters.VendorPhoneContact) ? vendorFilters.filters.VendorPhoneContact : t.VendorPhone)
                          //&& vt.Description.Contains(!String.IsNullOrEmpty(vendorFilters.filters.Description) ? vendorFilters.filters.Description : vt.Description)
                        select new
                        {
                            t.VendorId,
                            t.VendorName,
                            t.VendorCode,
                            t.VendorEmail,
                            t.IsActive,
                            vt.Description,
                            ad.City,
                            ad.StateOrProvince,
                            vc.ClassificationName,
                            VendorCapabilityName = vca.capabilityDescription,
                            VendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt,
                            t.CreatedDate,
                            TotalRecords = totalRecords,
                        }).Distinct()
                          .OrderByDescending(p => p.CreatedDate)
                          .Skip(skip)
                          .Take(take)
                          .ToList();

            if (!string.IsNullOrEmpty(vendorFilters.SortOrder) && !string.IsNullOrEmpty(vendorFilters.SortColumn))
            {
                if (vendorFilters.SortOrder.ToLower() == "desc")
                {
                    switch (vendorFilters.SortColumn)
                    {
                        case "VendorName":
                            return list.OrderByDescending(p => p.VendorName).ToList();
                        case "VendorCode":
                            return list.OrderByDescending(p => p.VendorCode).ToList();
                        case "Description":
                            return list.OrderByDescending(p => p.Description).ToList();
                        case "ClassificationName":
                            return list.OrderByDescending(p => p.ClassificationName).ToList();
                        case "VendorCapabilityName":
                            return list.OrderByDescending(p => p.VendorCapabilityName).ToList();
                        case "Status":
                            return list.OrderByDescending(p => p.IsActive).ToList();
                        case "VendorEmail":
                            return list.OrderByDescending(p => p.VendorEmail).ToList();
                        case "City":
                            return list.OrderByDescending(p => p.City).ToList();
                        case "StateOrProvince":
                            return list.OrderByDescending(p => p.StateOrProvince).ToList();
                        case "VendorPhoneContact":
                            return list.OrderByDescending(p => p.VendorPhoneContact).ToList();

                    }
                }
                else
                {
                    switch (vendorFilters.SortColumn)
                    {
                        case "VendorName":
                            return list.OrderBy(p => p.VendorName).ToList();
                        case "VendorCode":
                            return list.OrderBy(p => p.VendorCode).ToList();
                        case "Description":
                            return list.OrderBy(p => p.Description).ToList();
                        case "ClassificationName":
                            return list.OrderBy(p => p.ClassificationName).ToList();
                        case "VendorCapabilityName":
                            return list.OrderBy(p => p.VendorCapabilityName).ToList();
                        case "IsActive":
                            return list.OrderBy(p => p.IsActive).ToList();
                        case "VendorEmail":
                            return list.OrderBy(p => p.VendorEmail).ToList();
                        case "City":
                            return list.OrderBy(p => p.City).ToList();
                        case "StateOrProvince":
                            return list.OrderBy(p => p.StateOrProvince).ToList();
                        case "VendorPhoneContact":
                            return list.OrderBy(p => p.VendorPhoneContact).ToList();

                    }
                }
            }
            return list;



            // return null;
        }


        public IEnumerable<Vendor> GetVendors()
        {
            return _appContext.Vendor.Where(c => (c.IsDelete == false || c.IsDelete == null) && (c.IsActive == true)).OrderByDescending(c => c.VendorId).ToList();
        }

        public IEnumerable<object> GetVendorsAuditHistory(long vendorId)
        {
            var retData = (from t in _appContext.VendorAudit
                           join ad in _appContext.Address on t.AddressId equals ad.AddressId
                           join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                           from vt in vtt.DefaultIfEmpty()
                           join ct in _appContext.CreditTerms on t.CreditTermsId equals ct.CreditTermsId into crd
                           from ct in crd.DefaultIfEmpty()
                           join cu in _appContext.Currency on t.CurrencyId equals cu.CurrencyId into curr
                           from cu in curr.DefaultIfEmpty()
                           join di in _appContext.Discount on t.DiscountId equals di.DiscountId into dis
                           from di in dis.DefaultIfEmpty()
                           join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                           from vc in vcd.DefaultIfEmpty()
                           join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                           from vca in vcad.DefaultIfEmpty()
                           where t.VendorId == vendorId
                           select new
                           {
                               t.AuditVendorId,
                               t.VendorId,
                               t,
                               t.VendorEmail,
                               t.IsActive,
                               Address1 = ad.Line1,
                               Address2 = ad.Line2,
                               Address3 = ad.Line3,
                               t.VendorCode,
                               t.VendorName,
                               ad.City,
                               ad.StateOrProvince,
                               vt.Description,
                               t.CreatedDate,
                               t.CreatedBy,
                               t.UpdatedBy,
                               t.UpdatedDate,
                               ad.AddressId,
                               ad.Country,
                               ad.PostalCode,
                               t.EDI,
                               t.EDIDescription,
                               t.CreditLimit,
                               CurrencyId = cu.Code,
                               CreditTermsId = ct.Name,
                               DiscountLevel = di == null ? 0 : di.DiscontValue,
                               vc.ClassificationName,
                               VendorCapabilityName = vca.capabilityDescription,
                               VendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt
                           }).OrderByDescending(c => c.AuditVendorId).ToList();

            return retData;


        }
        public IEnumerable<Vendor> GetVendorsLite()
        {
            return _appContext.Vendor.Where(v => v.IsActive == true && v.IsDelete == false).Select(v => new Vendor { VendorId = v.VendorId, VendorName = v.VendorName }).OrderBy(c => c.VendorName).ToList();
        }

        public IEnumerable<object> GetVendorListDetails(bool isActive)
        {

            {
                var data = (from t in _appContext.Vendor
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                            from vt in vtt.DefaultIfEmpty()
                            join ct in _appContext.CreditTerms on t.CreditTermsId equals ct.CreditTermsId into crd
                            from ct in crd.DefaultIfEmpty()
                            join cu in _appContext.Currency on t.CurrencyId equals cu.CurrencyId into curr
                            from cu in curr.DefaultIfEmpty()
                            join di in _appContext.Discount on t.DiscountId equals di.DiscountId into dis
                            from di in dis.DefaultIfEmpty()
                            join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                            from vc in vcd.DefaultIfEmpty()
                            join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                            from vca in vcad.DefaultIfEmpty()
                            where t.IsDelete != true
                            && t.IsActive == (isActive == true ? true : t.IsActive)
                            select new
                            {
                                t.VendorId,
                                t,
                                t.VendorEmail,
                                t.IsActive,
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                                t.VendorCode,
                                t.VendorName,
                                ad.City,
                                ad.StateOrProvince,
                                vt.Description,
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                ad.PostalCode,
                                t.EDI,
                                t.EDIDescription,
                                t.CreditLimit,
                                CurrencyId = cu.Code,
                                CreditTermsId = ct.Name,
                                DiscountLevel = di == null ? 0 : di.DiscontValue,
                                vc.ClassificationName,
                                VendorCapabilityName = vca.capabilityDescription,
                                VendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt,
                                VendorClassifications = string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId)
                                .Select(p => p.vc.ClassificationName)),

                            })/*.Where(t => t.IsActive == true)*/.OrderByDescending(c => c.CreatedDate).ToList();
                return data;

                //old query
                /*
                 var data = (from t in _appContext.Vendor
                                  join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                  join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId
                                  join currency in _appContext.Currency on t.CurrencyId equals currency.CurrencyId into curr
                            from currency in curr.DefaultIfEmpty()
                            join creditterms in _appContext .CreditTerms on t.CreditTermsId equals creditterms.CreditTermsId into cred
                            from creditterms in cred.DefaultIfEmpty()
                            join vendorclassification in _appContext.VendorClassification on t.VendorClassificationId equals vendorclassification.VendorClassificationId into venclass
                            from vendorclassification in venclass.DefaultIfEmpty()
                            where t.IsDelete==true || t.IsDelete==null
                                 // select new { t, ad, vt }).ToList();
                            select new { t.CreditTermsId,t.VendorId,t,t.VendorEmail,t.IsActive,
                                creditterms,
                                currency,
                                vendorclassification,
                                vendorclassification.ClassificationName,
                                Address1 =ad.Line1, Address2=ad.Line2, Address3=ad.Line3,t.VendorCode, t.VendorName, ad.City, ad.StateOrProvince,vt.Description ,t.CreatedDate,t.CreatedBy,t.UpdatedBy,t.UpdatedDate,ad.AddressId,ad.Country,ad.PostalCode}).ToList();
                return data;
                 */

            }

        }

        public IEnumerable<object> GetVendorListByName(string Vendorname)
        {

            {
                var data = (from t in _appContext.Vendor
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId
                            where t.IsActive == true && t.VendorName == Vendorname
                            // select new { t, ad, vt }).ToList();
                            select new
                            {
                                t.VendorId,
                                t,
                                t.VendorEmail,
                                t.IsActive,
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                                t.VendorCode,
                                t.VendorName,
                                ad.City,
                                ad.StateOrProvince,
                                t.VendorPhone,
                                //ad.PostalCode,
                                t.VendorClassificationId,
                                t.VendorContractReference,
                                t.IsPreferredVendor,
                                t.LicenseNumber,
                                t.VendorURL,
                                t.Parent,
                                t.CreatedDate,
                                postal = ad.PostalCode,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                ad.PostalCode,

                            }).ToList();
                return data;

            }

        }
        public IEnumerable<object> GetVendorWithid(long vendorId)
        {

            {
                var data = (from t in _appContext.Vendor
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId

                            where t.VendorId == vendorId
                            // select new { t, ad, vt }).ToList();
                            select new
                            {
                                t.VendorId,
                                t,
                                t.VendorEmail,
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                                t.VendorCode,
                                t.VendorName,
                                ad.City,
                                ad.StateOrProvince,
                                vt.Description,
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                ad.PostalCode
                            }).ToList();
                return data;

            }

        }

        public IEnumerable<object> GetvendorPurchaseOrderList(long id)
        {

            {

                var data = (from po in _appContext.PurchaseOrder
                            join pop in _appContext.PurchaseOrderPart on po.PurchaseOrderId equals pop.PurchaseOrderId into purpart
                            from pop in purpart.DefaultIfEmpty()
                            join v in _appContext.Vendor on po.VendorId equals v.VendorId into ve
                            from v in ve.DefaultIfEmpty()
                            join im in _appContext.ItemMaster on pop.ItemMasterId equals im.ItemMasterId into item
                            from im in item.DefaultIfEmpty()
                                //join p in _appContext.Part on im.PartId equals p.PartId into part
                                //from p in part.DefaultIfEmpty()
                            join mf in _appContext.Manufacturer on im.ManufacturerId equals mf.ManufacturerId into gj
                            from x in gj.DefaultIfEmpty()

                            join uom in _appContext.UnitOfMeasure on im.PurchaseUnitOfMeasureId equals uom.UnitOfMeasureId into um
                            from uom in um.DefaultIfEmpty()

                            join sto in _appContext.StockLine on pop.PurchaseOrderId equals sto.PurchaseOrderId into sto
                            from st in sto.DefaultIfEmpty()

                            join mf in _appContext.Manufacturer on im.ManufacturerId equals mf.ManufacturerId
                            where po.PurchaseOrderId == id

                            select new
                            {
                                v.VendorName,
                                v.VendorCode,
                                po.CreditLimit,
                                po.Terms,
                                po.BillToAddressId,
                                po.ShipToAddressId,
                                po.PurchaseOrderId,
                                po.PurchaseOrderNumber,
                                po.ReferenceId,
                                po.PriorityId,
                                po.RequestedBy,
                                po.OpenDate,
                                po.ApproverId,
                                po.DeferredReceiver,
                                po.Resale,
                                po.DateApproved,
                                po.NeedByDate,
                                pop.NonInventory,
                                pop.POPartSplitAddress1,
                                pop.POPartSplitAddress2,
                                pop.POPartSplitAddress3,
                                pop.POPartSplitCity,
                                pop.POPartSplitPostalCode,
                                pop.POPartSplitState,
                                pop.POPartSplitUserTypeId,
                                pop.QuantityOrdered,
                                po.MasterCompanyId,
                                po.StatusId,
                                po.EmployeeId,
                                po.VendorId,
                                po.VendorContactId,
                                po.ShipToCompanyId,
                                po.ShipViaAccountId,
                                pop,
                                im.ItemMasterId,
                                im.PartNumber,
                                im.PartDescription,
                                im.ItemTypeId,
                                im.ManufacturerId,
                                x.Name,
                                im.GLAccountId,
                                //im.SerialNumber,
                                //pop.ConditionCode,
                                //pop.UOMId,
                                pop.UnitCost,
                                pop.PurchaseOrderPartRecordId,
                                po.ShipToUserType,
                                po.ShipToUserId,
                                po.ShipToContactId,
                                po.ShipToMemo,
                                po.BillToUserType,
                                po.BillToUserId,
                                po.BillToContactName,
                                po.BillToMemo,
                                uom.ShortName,
                                v.VendorContact,
                                v.VendorContractReference,
                                im.Manufacturer,
                                im.PMA,
                                im.DER,
                                im.SalesDiscountPercent,
                                purchaseOrderPartPurchaseOrderId = pop.PurchaseOrderId
                                // sto

                            }).ToList();

                return data;

            }

        }



        public IEnumerable<object> GetPayments()
        {
            return _appContext.InternationalWirePayment.OrderByDescending(c => c.InternationalWirePaymentId);
        }

        public IEnumerable<object> Getvendorrepairunit(long vendorId)
        {

            {


                var data = (from po in _appContext.RepairOrder
                            join pop in _appContext.RepairOrderPart on po.RepairOrderId equals pop.RepairOrderId into purpart
                            from pop in purpart.DefaultIfEmpty()
                            join v in _appContext.Vendor on po.VendorId equals v.VendorId into ve
                            from v in ve.DefaultIfEmpty()
                            join im in _appContext.ItemMaster on pop.ItemMasterId equals im.ItemMasterId into item
                            from im in item.DefaultIfEmpty()
                                //join p in _appContext.Part on im.PartId equals p.PartId into part
                                //from p in part.DefaultIfEmpty()

                            join mf in _appContext.Manufacturer on im.ManufacturerId equals mf.ManufacturerId into gj
                            from x in gj.DefaultIfEmpty()

                            join uom in _appContext.UnitOfMeasure on im.PurchaseUnitOfMeasureId equals uom.UnitOfMeasureId into um
                            from uom in um.DefaultIfEmpty()
                                //join mf in _appContext.Manufacturer on im.ManufacturerId equals mf.ManufacturerId
                            where po.RepairOrderId == vendorId

                            select new
                            {
                                v.VendorName,
                                v.VendorCode,
                                po.CreditLimit,
                                //po.Terms,
                                po.BillToAddressId,
                                po.ShipToAddressId,
                                po.RepairOrderId,
                                po.RepairOrderNumber,
                                //po.ReferenceId,
                                po.PriorityId,
                                //po.RequestedBy,
                                //po.DateRequested,
                                //po.Approver,
                                po.DeferredReceiver,
                                po.Resale,
                                //po.DateApprovied,
                                po.NeedByDate,
                                //pop.NeedByDate,
                                //pop.NonInventory,
                                //pop.POPartSplitAddress1,
                                //pop.POPartSplitAddress2,
                                //pop.POPartSplitAddress3,
                                //pop.POPartSplitCity,
                                //pop.POPartSplitPostalCode,
                                //pop.POPartSplitState,
                                //pop.POPartSplitUserName,
                                //pop.POPartSplitUserTypeId,
                                //pop.QuantityOrdered,
                                //po.MasterCompanyId,
                                po.StatusId,
                                //po.EmployeeId,
                                po.VendorId,
                                po.VendorContactId,
                                //po.ShipToCompanyId,
                                //po.ShipViaAccountId,
                                pop,
                                im.ItemMasterId,
                                im.PartNumber,
                                im.PartDescription,
                                im.ItemTypeId,
                                im.ManufacturerId,
                                x.Name,
                                im.GLAccountId,
                                //pop.ConditionCode,
                                //pop.UOMId,
                                pop.UnitCost,
                                pop.RepairOrderPartRecordId,
                                //po.ShipToUserType,
                                //po.ShipToUserName,
                                //po.ShipToContactName,
                                po.ShipToMemo,
                                //po.BillToUserType,
                                //po.BillToUserName,
                                //po.BillToContactName,
                                po.BillToMemo,
                                uom.ShortName



                            }).ToList();
                return data;

            }

        }


        public IEnumerable<object> GetmanagementSiteList(long companyId)
        {
            {


                var data = (from ms in _appContext.ManagementStructure
                            join msite in _appContext.ManagementSite on ms.ManagementStructureId equals msite.ManagementStructureId
                            join site in _appContext.Site on msite.SiteId equals site.SiteId
                            join ad in _appContext.Address on site.AddressId equals ad.AddressId

                            where ms.ManagementStructureId == companyId

                            select new
                            {
                                siteName = site.Name,
                                site.SiteId,
                                ms.ManagementStructureId,
                                msite.ManagementSiteId,
                                ad.AddressId,

                                ad.City,
                                ad.Country,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.PostalCode,


                            }).ToList();
                return data;

            }


        }

        public IEnumerable<object> vendorCapabilityTypeGet(long id)
        {

            {
                var data = (from vc in _appContext.vendorCapabilityType
                            where vc.VendorCapabilityId == id

                            select new
                            {
                                vc.VendorCapabilityId,
                                vc.VendorCapabilityTypeId,
                                vc.CapabilityTypeId

                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> getVendorCapabilityData(long id)
        {

            {
                var data = (from vc in _appContext.ATASubChapter
                            where vc.ATAChapterId == id

                            select new
                            {
                                vc.ATASubChapterCode,
                                vc.Description,
                                vc.ATASubChapterId,
                                vc.ATAChapterId

                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> vendorAircraftManufacturerGet(long id)
        {

            {
                var data = (from vc in _appContext.vendorCapabilityAircraftType
                            where vc.VendorCapabilityId == id

                            select new
                            {
                                vc.VendorCapabilityId,
                                vc.VendorCapabilityAircraftTypeId,
                                vc.AircraftTypeId,

                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> vendorAircraftManufacturerModelGet(long id)
        {

            {
                var data = (from vc in _appContext.vendorCapabiltiyAircraftModel
                            where vc.VendorCapabilityId == id

                            select new
                            {
                                vc.VendorCapabilityId,
                                vc.VendorCapabilityAircraftModelId,
                                vc.AircraftModelId,
                                vc.DashNumber,
                                vc.isSelected

                            }).ToList();
                return data;
            }
        }

        public long CreateVendorBillingAddress(VendorBillingAddress billingAddress)
        {
            try
            {
                Address address = new Address();

                address.City = billingAddress.City;
                address.Country = billingAddress.Country;



                address.Line1 = billingAddress.Address1;
                address.Line2 = billingAddress.Address2;
                address.Line3 = billingAddress.Address3;
                address.MasterCompanyId = billingAddress.MasterCompanyId;
                address.PostalCode = billingAddress.PostalCode;
                address.StateOrProvince = billingAddress.StateOrProvince;

                address.IsActive = true;
                address.UpdatedDate = address.CreatedDate = DateTime.Now;
                address.CreatedBy = billingAddress.CreatedBy;
                address.UpdatedBy = billingAddress.UpdatedBy;

                if (billingAddress.AddressId > 0)
                {
                    address.CreatedDate = billingAddress.CreatedDate;
                    address.AddressId = billingAddress.AddressId;
                    _appContext.Address.Update(address);
                }
                else
                {
                    address.CreatedDate = DateTime.Now;
                    _appContext.Address.Add(address);
                }

                _appContext.SaveChanges();


                billingAddress.AddressId = Convert.ToInt64(address.AddressId);

                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.IsActive = true;
                billingAddress.IsDeleted = false;
                //billingAddress.IsPrimary = false;
                if (billingAddress.IsPrimary == null)
                {
                    billingAddress.IsPrimary = false;
                }
                else
                {
                    billingAddress.IsPrimary = billingAddress.IsPrimary;
                }


                if (billingAddress.IsPrimary == true)
                {
                    var vendorConcatData = _appContext.VendorBillingAddress.Where(p => p.VendorId == billingAddress.VendorId).ToList();

                    foreach (var objContactdata in vendorConcatData)
                    {
                        objContactdata.IsPrimary = false;
                        _appContext.VendorBillingAddress.Update(objContactdata);
                    }
                    _appContext.SaveChanges();
                }

                if (billingAddress.VendorBillingAddressId > 0)
                {
                    _appContext.VendorBillingAddress.Update(billingAddress);
                }
                else
                {
                    billingAddress.CreatedDate = DateTime.Now;
                    _appContext.VendorBillingAddress.Add(billingAddress);
                }

                _appContext.SaveChanges();

                return billingAddress.VendorBillingAddressId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateVendorBillingAddress(VendorBillingAddress billingAddress)
        {
            try
            {
                billingAddress.UpdatedDate = DateTime.Now;
                _appContext.VendorBillingAddress.Update(billingAddress);
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteVendorBillingAddress(long billingAddressId, string updatedBy)
        {
            try
            {
                VendorBillingAddress billingAddress = new VendorBillingAddress();
                billingAddress.VendorBillingAddressId = billingAddressId;
                billingAddress.IsDeleted = true;
                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.UpdatedBy = updatedBy;

                _appContext.VendorBillingAddress.Attach(billingAddress);

                _appContext.Entry(billingAddress).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteVendorShippingAddress(long shippingAddressId, string updatedBy)
        {
            try
            {
                //var vsha = _appContext.VendorShippingAddress.Where(x => x.VendorShippingAddressId == shippingAddressId).FirstOrDefault();
                //if (vsha != null)
                //{
                //    _appContext.VendorShippingAddress.Remove(vsha);
                //    _appContext.SaveChanges();
                //}
                VendorShippingAddress shippingAddress = new VendorShippingAddress();
                shippingAddress.VendorShippingAddressId = shippingAddressId;
                shippingAddress.UpdatedDate = DateTime.Now;
                shippingAddress.UpdatedBy = updatedBy;
                shippingAddress.IsDelete = true;

                _appContext.VendorShippingAddress.Attach(shippingAddress);

                _appContext.Entry(shippingAddress).Property(p => p.IsDelete).IsModified = true;
                _appContext.Entry(shippingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(shippingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteVendorShippingViaAddress(long vendorShippingId, string updatedBy)
        {
            bool result = false;
            try
            {

                var vendorShippingDetails = _appContext.VendorShipping.Where(x => x.VendorShippingId == vendorShippingId).FirstOrDefault();
                if (vendorShippingDetails != null)
                {
                    vendorShippingDetails.UpdatedBy = updatedBy;
                    vendorShippingDetails.UpdatedDate = DateTime.Now;
                    vendorShippingDetails.IsDelete = true;
                    _appContext.VendorShipping.Update(vendorShippingDetails);
                    _appContext.SaveChanges();
                    result = true;
                }
                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public void VendorBillingAddressStatus(long billingAddressId, bool status, string updatedBy)
        {
            try
            {
                VendorBillingAddress billingAddress = new VendorBillingAddress();
                billingAddress.VendorBillingAddressId = billingAddressId;
                billingAddress.IsActive = status;
                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.UpdatedBy = updatedBy;

                _appContext.VendorBillingAddress.Attach(billingAddress);

                _appContext.Entry(billingAddress).Property(p => p.IsActive).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetVendorBillingAddress()
        {
            try
            {
                var list = (from vba in _appContext.VendorBillingAddress
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.IsDeleted == false
                            select new
                            {
                                vba.SiteName,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.City,
                                ad.StateOrProvince,
                                ad.PostalCode,
                                ad.Country,
                                vba.CreatedDate
                            }).OrderByDescending(p => p.CreatedDate).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetVendorBillingSiteNames(long vendorId)
        {
            try
            {
                var list = (from vba in _appContext.VendorBillingAddress
                            where vba.IsDeleted == false && vba.VendorId == vendorId
                            select new
                            {
                                vba.VendorBillingAddressId,
                                vba.SiteName
                            }).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object VendorBillingAddressById(long billingAddressId)
        {
            try
            {
                var data = (from vba in _appContext.VendorBillingAddress
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.VendorBillingAddressId == billingAddressId
                            select new
                            {
                                vba,
                                ad.City,
                                ad.Country,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.PostalCode,
                                ad.StateOrProvince
                            }
                          ).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //get Vendor Capability List



        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public IEnumerable<object> getVendorByID(long vendorId, bool isDefaultContact)
        {
            var data = (from it in _appContext.VendorContact
                        where it.VendorId == vendorId && it.IsActive == true && it.IsDefaultContact == isDefaultContact
                        select new
                        {
                            it.VendorContactId,
                            it.VendorId,
                            it.ContactId,
                            it.IsDefaultContact,
                            it.MasterCompanyId,
                            it.CreatedDate,
                            it.CreatedBy,
                            it.UpdatedDate,
                            it.UpdatedBy,
                            it.IsActive
                        }).ToList();
            return data;
        }

        public IEnumerable<Vendor> getVendorsForDropdown()
        {
            return _appContext.Vendor.Where(x =>
            (x.IsActive != null && x.IsActive == true) &&
            (x.IsDelete == null || x.IsDelete == false));
        }

        public IEnumerable<object> GetVendorBillingAddressAudit(long vendorId, long vendorBillingaddressId)
        {
            try
            {
                var list = (from vba in _appContext.VendorBillingAddressAudit
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.VendorId == vendorId && vba.VendorBillingAddressId == vendorBillingaddressId
                            select new
                            {
                                vba.SiteName,
                                vba.AuditVendorBillingAddressId,
                                vba.VendorBillingAddressId,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.City,
                                ad.StateOrProvince,
                                ad.PostalCode,
                                ad.Country,
                                vba.CreatedDate,
                                vba.UpdatedBy,
                                vba.UpdatedDate,
                                vba.CreatedBy,
                                vba.IsActive
                            }).OrderByDescending(p => p.AuditVendorBillingAddressId).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetVendorPOMemoList(long vendorId)
        {
            try
            {
                var list = (from po in _appContext.PurchaseOrder
                            where po.IsDeleted == false && po.IsActive == true && po.VendorId == vendorId
                            select new
                            {
                                Module = "PO",
                                OrderNumberId = po.PurchaseOrderId,
                                OrderNumber = po.PurchaseOrderNumber,
                                po.Notes
                            }).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetVendorROMemoList(long vendorId)
        {
            try
            {
                var list = (from ro in _appContext.RepairOrder
                            where ro.IsDeleted == false && ro.IsActive == true && ro.VendorId == vendorId
                            select new
                            {
                                Module = "RO",
                                OrderNumberId = ro.RepairOrderId,
                                OrderNumber = ro.RepairOrderNumber,
                                Notes = ro.RoMemo
                            }).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateVendorMemoText(long id, string type, string memoText, string updatedBy)
        {
            if (type == "PO")
            {
                PurchaseOrder purchaseOrder = new PurchaseOrder();
                purchaseOrder.PurchaseOrderId = id;
                purchaseOrder.UpdatedDate = DateTime.Now;
                purchaseOrder.UpdatedBy = updatedBy;
                purchaseOrder.Notes = memoText;

                _appContext.PurchaseOrder.Attach(purchaseOrder);
                _appContext.Entry(purchaseOrder).Property(x => x.Notes).IsModified = true;
                _appContext.Entry(purchaseOrder).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(purchaseOrder).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            else if (type == "RO")
            {
                RepairOrder repairOrder = new RepairOrder();
                repairOrder.RepairOrderId = id;
                repairOrder.UpdatedDate = DateTime.Now;
                repairOrder.UpdatedBy = updatedBy;
                repairOrder.RoMemo = memoText;

                _appContext.RepairOrder.Attach(repairOrder);
                _appContext.Entry(repairOrder).Property(x => x.RoMemo).IsModified = true;
                _appContext.Entry(repairOrder).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(repairOrder).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
        }

        public VendorDocumentDetails GetVendorDocumentDetailById(long id)
        {
            try
            {
                return _appContext.VendorDocumentDetails.Where(p => p.IsActive == true && p.VendorDocumentDetailId == id).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetVendorProcessList(int companyId)
        {
            var list = (from m in _appContext.Master1099
                        where m.MasterCompanyId == companyId && m.IsDeleted != true
                        select m).Distinct().ToList();
            return list;

        }

        public List<VendorDocumentDetailsAudit> GetVendorDocumentDetailsAudit(long id)
        {
            try
            {
                return _appContext.VendorDocumentDetailsAudit.Where(p => p.IsActive == true && p.VendorDocumentDetailId == id).OrderByDescending(p => p.UpdatedDate).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<object> GetVendorCapabilityAudit(long VendorCapabilityId, long VendorId)
        {
            try
            {
                var list = (from vca in _appContext.VendorCapabiliyAudit
                            join v in _appContext.Vendor on vca.VendorId equals v.VendorId
                            into vcc
                            from v in vcc.DefaultIfEmpty()
                            join vct in _appContext.vendorCapabilityType on vca.VendorCapabilityId equals vct.VendorCapabilityId
                            into vctt
                            from vct in vctt.DefaultIfEmpty()
                            join vcat in _appContext.capabilityType on Convert.ToInt32(vca.CapabilityId) equals vcat.CapabilityTypeId
                            into vcatt
                            from vcat in vcatt.DefaultIfEmpty()

                            join itm in _appContext.ItemMaster on vca.ItemMasterId equals itm.ItemMasterId into itmm
                            from itm in itmm.DefaultIfEmpty()
                            where vca.VendorCapabilityId == VendorCapabilityId && vca.VendorId == VendorId
                            select new
                            {
                                vca.AuditVendorCapabilityId,
                                v.VendorName,
                                v.VendorCode,
                                vca.VendorCapabilityId,
                                vca.VendorId,
                                vca.VendorRanking,
                                vca.PMA_DER,
                                vca.ItemMasterId,
                                vca.TAT,
                                vca.Cost,
                                vca.AlternatePartId,
                                vca.ATAChapterId,
                                vca.ATASubchapterId,
                                vca.Memo,
                                vca.CreatedDate,
                                vca.UpdatedDate,
                                vca.CreatedBy,
                                vca.UpdatedBy,
                                vca.capabilityDescription,
                                vca.IsActive,
                                CapabilityType = vcat.Description,
                                itm.PartNumber,
                                itm.PartDescription

                            }).OrderByDescending(p => p.AuditVendorCapabilityId).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public IEnumerable<object> GetAllBillingAddressDetails(long id)
        {
            var data = (from v in _appContext.VendorBillingAddress
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        where (v.IsDeleted == false && (v.VendorId == id))
                        select new
                        {
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            ad.AddressId,
                            ad.Country,
                            ad.PostalCode,
                            ad.City,
                            ad.StateOrProvince,
                            v.SiteName,
                            v.VendorBillingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.VendorId,
                            v.IsActive,
                            v.IsPrimary

                        }).ToList();
            return data;
        }

        public void VendorProcess1099Save(Master1099 vendorProcess1099)
        {
            vendorProcess1099.CreatedDate = DateTime.Now;
            vendorProcess1099.UpdatedDate = DateTime.Now;
            vendorProcess1099.IsDeleted = false;
            if (vendorProcess1099.Master1099Id > 0)
            {
                _appContext.Master1099.Attach(vendorProcess1099);
                _appContext.Entry(vendorProcess1099).Property(x => x.Description).IsModified = true;
                _appContext.Entry(vendorProcess1099).Property(x => x.Memo).IsModified = true;
                _appContext.Entry(vendorProcess1099).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(vendorProcess1099).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.Entry(vendorProcess1099).Property(x => x.IsActive).IsModified = true;

            }
            else
            {
                _appContext.Master1099.Add(vendorProcess1099);
            }
            _appContext.SaveChanges();
        }
        public void VendorProcess1099StatusUpdate(long id, bool status, string updatedBy)
        {
            Master1099 vMaster1099 = new Master1099();
            vMaster1099.Master1099Id = id;
            vMaster1099.UpdatedDate = DateTime.Now;
            vMaster1099.UpdatedBy = updatedBy;
            vMaster1099.IsActive = status;

            _appContext.Master1099.Attach(vMaster1099);
            _appContext.Entry(vMaster1099).Property(x => x.IsActive).IsModified = true;
            _appContext.Entry(vMaster1099).Property(x => x.UpdatedDate).IsModified = true;
            _appContext.Entry(vMaster1099).Property(x => x.UpdatedBy).IsModified = true;
            _appContext.SaveChanges();
        }

        public void VendorProcess1099Delete(long id, string updatedBy)
        {
            Master1099 vMaster1099 = new Master1099();
            vMaster1099.Master1099Id = id;
            vMaster1099.UpdatedDate = DateTime.Now;
            vMaster1099.UpdatedBy = updatedBy;
            vMaster1099.IsDeleted = true;

            _appContext.Master1099.Attach(vMaster1099);
            _appContext.Entry(vMaster1099).Property(x => x.IsDeleted).IsModified = true;
            _appContext.Entry(vMaster1099).Property(x => x.UpdatedDate).IsModified = true;
            _appContext.Entry(vMaster1099).Property(x => x.UpdatedBy).IsModified = true;
            _appContext.SaveChanges();
        }

        public IEnumerable<object> GetVendorGeneralDocumentDetailById(long id, int moduleId)
        {
            var result = (from at in _appContext.Attachment
                          join atd in _appContext.AttachmentDetails on at.AttachmentId equals atd.AttachmentId
                          where at.ReferenceId == id && at.ModuleId == moduleId && atd.IsActive == true && atd.IsDeleted == false
                          select atd).ToList();

            return result;

        }
        public bool GetVendorGeneralDocumentDelete(long id, string updatedBy)
        {
            bool result = false;
            try
            {
                AttachmentDetails attachmentDetails = new AttachmentDetails();
                attachmentDetails.AttachmentDetailId = id;
                attachmentDetails.UpdatedDate = DateTime.Now;
                attachmentDetails.UpdatedBy = updatedBy;
                attachmentDetails.IsDeleted = true;

                _appContext.AttachmentDetails.Attach(attachmentDetails);
                _appContext.Entry(attachmentDetails).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(attachmentDetails).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(attachmentDetails).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;

        }


        public List<Master1099Audit> GetVendorProcess1099Audit(long id)
        {
            try
            {
                return _appContext.Master1099Audit.Where(p => p.Master1099Id == id).OrderByDescending(p => p.UpdatedDate).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<object> GetVendorProcessListForFinance(int companyId)
        {
            var list = (from m in _appContext.Master1099
                        where m.MasterCompanyId == companyId && m.IsDeleted != true && m.IsActive == true
                        select m).Distinct().ToList();
            return list;

        }
        public IEnumerable<object> GetVendorProcessListFromTransaction(long vendorId)
        {
            var list = (from mst in _appContext.Master1099
                        join m in _appContext.VendorProcess1099 on mst.Master1099Id equals m.Master1099Id
                          into master
                        from m in master.DefaultIfEmpty()

                        where m.VendorId == vendorId && m.IsDeleted != true && m.IsActive == true
                        select new
                        {
                            m.VendorProcess1099Id,
                            m.Master1099Id,
                            m.IsDefaultCheck,
                            m.IsDefaultRadio,
                            mst.Description
                        }).Distinct().ToList();


            return list;

        }
        public IEnumerable<VendorCapabilityAircraft> VendorAircraft(VendorCapabilityAircraft[] vendorAircraftMapping)
        {

            if (vendorAircraftMapping != null && vendorAircraftMapping.Length > 0)
            {
                foreach (var airData in vendorAircraftMapping)
                {
                    airData.CreatedDate = DateTime.Now;
                    airData.UpdatedDate = DateTime.Now;
                    airData.IsActive = true;
                    airData.IsDeleted = false;
                    _appContext.VendorCapabilityAircraft.Add(airData);
                    _appContext.SaveChanges();
                }
            }

            return vendorAircraftMapping;
        }

        public IEnumerable<object> VendorAircraftDataByCapsId(long vendorCapabilityId)
        {
            var data = (from vc in _appContext.VendorCapabilityAircraft
                            //join cy in _appContext.capabilityType on vc.CapabilityId equals cy.CapabilityTypeId into cyt
                            //from cy in cyt.DefaultIfEmpty()
                        join art in _appContext.AircraftType on vc.AircraftTypeId equals art.AircraftTypeId into artt
                        from art in artt.DefaultIfEmpty()
                        join arm in _appContext.AircraftModel on vc.AircraftModelId equals arm.AircraftModelId into armd
                        from arm in armd.DefaultIfEmpty()
                        join ard in _appContext.AircraftDashNumber on vc.DashNumberId equals ard.DashNumberId into ardd
                        from ard in ardd.DefaultIfEmpty()
                        where vc.VendorCapabilityId == vendorCapabilityId && vc.IsActive == true && vc.IsDeleted == false
                        select new
                        {
                            vc.VendorCapabilityAirCraftId,
                            vc.VendorCapabilityId,
                            vc.AircraftTypeId,
                            AircraftType = art.Description,
                            vc.AircraftModelId,
                            vc.DashNumberId,
                            AircraftModel = arm.ModelName,
                            ard.DashNumber,
                            //vc.PartNumber,                           
                            //vc.AircraftModel,
                            vc.Memo
                        }).ToList();
            return data;
        }

        public bool EditVendorAircraft(long id, string memo, string updatedBy)
        {
            bool result = false;
            try
            {
                VendorCapabilityAircraft airCraftDetails = new VendorCapabilityAircraft();
                airCraftDetails.VendorCapabilityAirCraftId = id;
                airCraftDetails.UpdatedDate = DateTime.Now;
                airCraftDetails.UpdatedBy = updatedBy;
                airCraftDetails.Memo = memo;

                _appContext.VendorCapabilityAircraft.Attach(airCraftDetails);
                _appContext.Entry(airCraftDetails).Property(x => x.Memo).IsModified = true;
                _appContext.Entry(airCraftDetails).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(airCraftDetails).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;

        }
        public bool DeleteVendorAircraft(long id, string updatedBy)
        {
            bool result = false;
            try
            {
                VendorCapabilityAircraft airCraftDetails = new VendorCapabilityAircraft();
                airCraftDetails.VendorCapabilityAirCraftId = id;
                airCraftDetails.UpdatedDate = DateTime.Now;
                airCraftDetails.UpdatedBy = updatedBy;
                airCraftDetails.IsDeleted = true;

                _appContext.VendorCapabilityAircraft.Attach(airCraftDetails);
                _appContext.Entry(airCraftDetails).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(airCraftDetails).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(airCraftDetails).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;

        }

        public IEnumerable<object> searchItemAircraftMappingDataByMultiTypeIdModelIDDashID(long VendorCapabilityId, string AircraftTypeId, string AircraftModelId, string DashNumberId)
        {
            long[] myAircraftTypeId = null;
            long[] myAircraftModelId = null;
            long[] myDashNumberId = null;
            if (AircraftTypeId != null && AircraftTypeId != "")
                myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (AircraftModelId != null && AircraftModelId != "")
                myAircraftModelId = AircraftModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            if (DashNumberId != null && DashNumberId != "")
                myDashNumberId = DashNumberId.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId != null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()

                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId) && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = acd.DashNumber, AircraftType = acy.Description, AircraftModel = acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = acd.DashNumber, AircraftType = acy.Description, AircraftModel = acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId == null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftTypeId.Contains(it.AircraftTypeId) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = acd.DashNumber, AircraftType = acy.Description, AircraftModel = acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftTypeId.Contains(it.AircraftTypeId) && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = acd.DashNumber, AircraftType = acy.Description, AircraftModel = acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && AircraftModelId != null && myDashNumberId != null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftModelId.Contains(it.AircraftModelId) && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = acd.DashNumber, AircraftType = acy.Description, AircraftModel = acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && AircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftModelId.Contains(it.AircraftModelId) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = acd.DashNumber, AircraftType = acy.Description, AircraftModel = acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = acd.DashNumber, AircraftType = acy.Description, AircraftModel = acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = acd.DashNumber, AircraftType = acy.Description, AircraftModel = acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
        }


        public IEnumerable<object> GetVendorsCheckAuditHistory(long id)
        {
            var retData = (from t in _appContext.CheckPaymentAudit
                           join ad in _appContext.Address on t.AddressId equals ad.AddressId
                           where t.CheckPaymentId == id
                           select new
                           {
                               t.AuditCheckPaymentId,
                               t.CheckPaymentId,
                               t.AddressId,
                               t.MasterCompanyId,
                               t.SiteName,
                               t.IsActive,
                               t.AccountNumber,
                               t.RoutingNumber,
                               Address1 = ad.Line1,
                               Address2 = ad.Line2,
                               Address3 = ad.Line3,
                               ad.City,
                               ad.StateOrProvince,
                               ad.PostalCode,
                               ad.Country,
                               t.CreatedBy,
                               t.UpdatedBy,
                               t.CreatedDate,
                               t.UpdatedDate

                           }).OrderByDescending(c => c.AuditCheckPaymentId).ToList();

            return retData;


        }
    }
}
