
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


        public IEnumerable<object> GetVendorListDetails()
        {

            {
                var data = (from t in _appContext.Vendor
                                  join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                  join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId
                            where t.IsDelete==true || t.IsDelete==null
                                 // select new { t, ad, vt }).ToList();
                            select new { t.CreditTermsId,t.VendorId,t,t.VendorEmail,t.IsActive,
                                Address1=ad.Line1, Address2=ad.Line2, Address3=ad.Line3,t.VendorCode, t.VendorName, ad.City, ad.StateOrProvince,vt.Description ,t.CreatedDate,t.CreatedBy,t.UpdatedBy,t.UpdatedDate,ad.AddressId,ad.Country,ad.PostalCode}).ToList();
                return data;

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
                                ad.PostalCode
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

        public IEnumerable<object> Getvendorunit(long id)
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
                                //join mf in _appContext.Manufacturer on im.ManufacturerId equals mf.ManufacturerId
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
                                po.DateRequested,
                                po.Approver,
                                po.DeferredReceiver,
                                po.Resale,
                                po.DateApprovied,
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
                                im.SerialNumber,
                                //pop.ConditionCode,
                                //pop.UOMId,
                                pop.UnitCost,
                                pop.PurchaseOrderPartRecordId,
                                po.ShipToUserType,
                                po.ShipToUserName,
                                po.ShipToContactName,
                                po.ShipToMemo,
                                po.BillToUserType,
                                po.BillToUserName,
                                po.BillToContactName,
                                po.BillToMemo,
                                uom.ShortName



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
                                po.Terms,
                                po.BillToAddressId,
                                po.ShipToAddressId,
                                po.RepairOrderId,
                                po.RepairOrderNumber,
                                po.ReferenceId,
                                po.PriorityId,
                                po.RequestedBy,
                                po.DateRequested,
                                po.Approver,
                                po.DeferredReceiver,
                                po.Resale,
                                po.DateApprovied,
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
                                im.SerialNumber,
                                //pop.ConditionCode,
                                //pop.UOMId,
                                pop.UnitCost,
                                pop.RepairOrderPartRecordId,
                                po.ShipToUserType,
                                po.ShipToUserName,
                                po.ShipToContactName,
                                po.ShipToMemo,
                                po.BillToUserType,
                                po.BillToUserName,
                                po.BillToContactName,
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

        //get Vendor Capability List



        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
