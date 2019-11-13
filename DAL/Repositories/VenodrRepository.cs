
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;

namespace DAL.Repositories
{
    
    public class VenodrRepository : Repository<Vendor>, IVendor
    {
        List<Vendor> iList = new List<Vendor>();
        public VenodrRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Vendor> GetVendors()
        {
            return _appContext.Vendor.OrderByDescending(c => c.VendorId).ToList();
        }

        public IEnumerable<Vendor> GetVendorsLite()
        {
            return _appContext.Vendor.Where(v => v.IsActive == true && v.IsDelete == false).Select(v => new  Vendor{ VendorId= v.VendorId, VendorName=v.VendorName }).OrderBy(c=>c.VendorName).ToList();
        }

        public IEnumerable<object> GetVendorListDetails()
        {

            {
                var data = (from t in _appContext.Vendor
                                  join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                  join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId
                            where t.IsDelete != true
                            select new { t.VendorId,t,t.VendorEmail,t.IsActive,
                                Address1 =ad.Line1, Address2=ad.Line2, Address3=ad.Line3,t.VendorCode, t.VendorName, ad.City, ad.StateOrProvince,vt.Description ,t.CreatedDate,t.CreatedBy,t.UpdatedBy,t.UpdatedDate,ad.AddressId,ad.Country,ad.PostalCode}).ToList();
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
                            where t.IsActive == true && t.VendorName==Vendorname
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
                                postal=ad.PostalCode,
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

                            where t.VendorId==vendorId
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

                                join sto in _appContext.StockLine on pop.PurchaseOrderId equals sto.PurchaseOrderId  into sto
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
                billingAddress.IsPrimary = false;

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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteVendorBillingAddress(long billingAddressId,string updatedBy)
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
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteVendorShippingAddress(long shippingAddressId, string updatedBy)
        {
            try
            {
                var vsha = _appContext.VendorShippingAddress.Where(x => x.VendorShippingAddressId == shippingAddressId).FirstOrDefault();
                if(vsha != null)
                {
                    _appContext.VendorShippingAddress.Remove(vsha);
                    _appContext.SaveChanges();
                }
                //VendorShippingAddress shippingAddress = new VendorShippingAddress();
                //shippingAddress.VendorShippingAddressId = billingAddressId;
                //shippingAddress.UpdatedDate = DateTime.Now;
                //shippingAddress.UpdatedBy = updatedBy;

                //_appContext.VendorShippingAddress.Attach(shippingAddress);

                //_appContext.Entry(shippingAddress).Property(p => p.UpdatedDate).IsModified = true;
                //_appContext.Entry(shippingAddress).Property(p => p.UpdatedBy).IsModified = true;

                //_appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void VendorBillingAddressStatus(long billingAddressId,bool status, string updatedBy)
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
            catch (Exception)
            {

                throw;
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
                            }).OrderByDescending(p=>p.CreatedDate).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetVendorBillingSiteNames(long vendorId)
        {
            try
            {
                var list = (from vba in _appContext.VendorBillingAddress
                            where vba.IsDeleted == false && vba.VendorId == vendorId
                            select new {
                                vba.VendorBillingAddressId,
                                vba.SiteName
                            }).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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

        public IEnumerable<Vendor> getVendorsForDropdown() {
            return _appContext.Vendor.Where(x => 
            (x.IsActive != null && x.IsActive == true) && 
            (x.IsDelete == null || x.IsDelete == false));
        }

    }
}
