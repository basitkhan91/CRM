using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace QuickApp.Pro.Controllers
{

    [Route("api/[controller]")]
    public class VendorController : Controller
    {
        private readonly ApplicationDbContext _context;
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";


        public VendorController(IUnitOfWork unitOfWork, ILogger<VendorController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<VendorViewModel>))]

        public IActionResult Get()
        {
            var allActions = _unitOfWork.Vendor.GetVendors(); //.GetAllCustomersData();
            return Ok(allActions);

        }


        [HttpGet("GetmanagementSiteList/{companyId}")]
        [Produces(typeof(List<SiteViewModel>))]

        public IActionResult GetmanagementSiteList(long companyId)
        {
            var allActions = _unitOfWork.Vendor.GetmanagementSiteList(companyId); //.GetAllCustomersData();
            return Ok(allActions);

        }

        [HttpGet("GetcountryList")]

        [Produces(typeof(List<Countries>))]
        public IActionResult GetcountryList()
        {
            var allvendortype = _context.Countries.OrderByDescending(c => c.countries_id).ToList();
            return Ok(allvendortype);

        }

        [HttpGet("capabilityTypeList")]
        [Produces(typeof(List<CapabilityType>))]

        public IActionResult capabilityTypeList()
        {
            var allActions = _unitOfWork.capabilityTypeRepository.GetAllCapabilityListData(); //.GetAllCustomersData();
            return Ok(allActions);

        }


        [HttpGet("polist")]
        [Produces(typeof(List<PurchaseOrderViewModel>))]

        public IActionResult polist()
        {
            var allActions = _unitOfWork.purchaseOrder.GetPurchaseOrderlist(); //.GetAllCustomersData();
            return Ok(allActions);

        }
        [HttpGet("rolist")]
        [Produces(typeof(List<RepairOrderViewModel>))]

        public IActionResult rolist()
        {
            var allActions = _context.RepairOrder.OrderByDescending(c => c.RepairOrderId).ToList(); //.GetAllCustomersData();
            return Ok(allActions);

        }

        [HttpGet("BencusAddress")]
        [Produces(typeof(List<VendorViewModel>))]

        public IActionResult BencusGet()
        {
            var allActions = _unitOfWork.Vendor.GetPayments(); //.GetAllCustomersData();
            return Ok(allActions);

        }

        [HttpGet("contactEmptyObj")]
        [Produces(typeof(List<ContactViewModel>))]
        public IActionResult getContactEmptyObj(ContactViewModel contactViewModel)
        {
            //.GetAllCustomersData();
            ContactViewModel contactViewModel1 = new ContactViewModel();
            return Ok(contactViewModel1);

        }
        [HttpGet("fianlEmptyObj")]
        [Produces(typeof(List<ContactViewModel>))]
        public IActionResult getFianlEmptyObj(VendorViewModel vendorViewModel)
        {
            //.GetAllCustomersData();
            return Ok(vendorViewModel);

        }

        [HttpGet("GetCapabilityList")]
        [Produces(typeof(List<Capability>))]
        public IActionResult GetCapabilityList()
        {

            var obj = _context.Capability.OrderByDescending(c => c.CapabilityId).ToList();
            return Ok(obj);
        }


        [HttpGet("generalEmptyObj")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult getGeneralEmptyObj(VendorViewModel vendorViewModel)
        {
            //.GetAllCustomersData();
            return Ok(vendorViewModel);

        }
        [HttpGet("paymentEmptyObj")]
        [Produces(typeof(List<ContactViewModel>))]
        public IActionResult getPaymentEmptyObj(ContactViewModel contactViewModel)
        {
            //.GetAllCustomersData();
            return Ok(contactViewModel);

        }
        [HttpGet("GetListDetails")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult GetVendorListDetails(Object data)
        {
            var allVendorlistDetails = _unitOfWork.Vendor.GetVendorListDetails(); //.GetAllCustomersData();
            return Ok(allVendorlistDetails);

        }
        [HttpGet("GetVendorDetailsWithData")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult GetVendorDetailsWithData()
        {
            var allVendorlistDetails = _unitOfWork.Vendor.GetVendorListDetails(); //.GetAllCustomersData();
            return Ok(allVendorlistDetails);

        }
        [HttpGet("GetVendorsListwithId/{vendorId}")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult GetVendorWithId(long vendorId)
        {
            var vendorDtails = _unitOfWork.Vendor.GetVendorWithid(vendorId); //.GetAllCustomersData();
            return Ok(vendorDtails);

        }
        [HttpGet("GetDomesticWithVedor/{vendorId}")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult GetVendorDomstic(long vendorId)
        {
            var vendorDtails = _unitOfWork.vendorPaymentRepository.GetDomesticWithVendor(vendorId); //.GetAllCustomersData();
            return Ok(vendorDtails);

        }
        [HttpGet("GetInternationalWithVedor/{vendorId}")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult GetVendorInternational(long vendorId)
        {
            var vendorDtails = _unitOfWork.vendorPaymentRepository.GetInterWithVedor(vendorId); //.GetAllCustomersData();
            return Ok(vendorDtails);

        }
        [HttpGet("GetdefaultListVedor/{vendorId}")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult GetVendorDefault(long vendorId)
        {
            var vendorDtails = _context.VendorPayment.Where(a => a.VendorId == vendorId).SingleOrDefault(); //.GetAllCustomersData();
            return Ok(vendorDtails);

        }



        [HttpGet("ContactGet/{contactId}")]
        [Produces(typeof(List<Contact>))]
        public IActionResult Contactget(long contactId)
        {
            var allContacts = _unitOfWork.ContactRepository.GetContacts(contactId); //.GetAllCustomersData();
            return Ok(allContacts);

        }
        [HttpGet("ContactCompleteGet")]
        [Produces(typeof(List<Contact>))]
        public IActionResult ContactCompleteget()
        {
            var allContacts = _unitOfWork.ContactRepository.GetCompleteContacts(); //.GetAllCustomersData();
            return Ok(allContacts);

        }

        [HttpGet("AddressGet")]
        [Produces(typeof(List<Address>))]
        public IActionResult GetAddress()
        {
            var alladdresses = _unitOfWork.Address.GetAddresses(); //.GetAllCustomersData();
            return Ok(alladdresses);
        }

        [HttpGet("Getpartdetails")]
        public IActionResult Getpartdetails()
        {
            var allPartDetails = _context.ItemMaster.Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.ItemMasterId).ToList(); //.GetAllCustomersData();
            return Ok(allPartDetails);
        }

        [HttpGet("getSitesAddress")]
        [Produces(typeof(List<Address>))]
        public IActionResult getSitesAddress()
        {
            var allPartDetails = (from st in _context.Site

                                  join ad in _context.Address on st.AddressId equals ad.AddressId
                                  select new
                                  {

                                      st.SiteId,
                                      st.AddressId,
                                      st.Name,
                                      ad.Line1,
                                      ad.Line2,
                                      ad.Line3,
                                      ad.City,
                                      ad.StateOrProvince,
                                      ad.PostalCode,
                                      ad.Country,

                                  });

            _context.Site.Include("Address").OrderByDescending(c => c.SiteId).ToList(); ; //.GetAllCustomersData();
            return Ok(allPartDetails);

        }

        [HttpGet("getVendorCapabilityList")]
        [Produces(typeof(List<VendorCapabiliy>))]
        public IActionResult GetvendorCapabilityList()
        {
            {
                var data = (from vc in _context.VendorCapabiliy
                            join v in _context.Vendor on vc.VendorId equals v.VendorId
                            join im in _context.ItemMaster on vc.ItemMasterId equals im.ItemMasterId
                            //join vct in _appContext.vendorCapabilityType on vc.VendorCapabilityId equals vct.VendorCapabilityId
                            //join vcat in _appContext.vendorCapabilityAircraftType on vc.VendorCapabilityId equals vcat.VendorCapabilityId
                            //join vcam in _appContext.vendorCapabiltiyAircraftModel on vc.VendorCapabilityId equals vcam.VendorCapabilityId
                            select new
                            {
                                v.VendorName,
                                v.VendorCode,

                                im.PartNumber,
                                im.PartDescription,

                                im.ManufacturerId,
                                manufacturerName = im.Manufacturer.Name,

                                vc.VendorCapabilityId,
                                vc.VendorId,
                                vc.VendorRanking,
                                vc.PMA_DER,
                                vc.ItemMasterId,
                                vc.TAT,
                                vc.Cost,
                                vc.AlternatePartId,
                                vc.ATAChapterId,
                                vc.ATASubchapterId,
                                vc.Memo,
                                vc.CreatedDate,
                                vc.UpdatedDate,
                                vc.capabilityDescription,
                                vc.IsActive
                                //vct.CapabilityTypeId,

                                //vcat.AircraftTypeId,

                                //vcam.AircraftModelId


                            }).ToList();
                // return data;
                return Ok(data);
            }
        }




        [HttpGet("GetpartdetailsWithidForSinglePart/{partid}")]
        public Object getPartwithid(long partid)
        {


            var data = (from IM in _context.ItemMaster

                            //join PT in _context.Part on IM.PartId equals PT.PartId into pt

                            //from PT in pt.DefaultIfEmpty()
                        join MF in _context.Manufacturer on IM.ManufacturerId equals MF.ManufacturerId into mfg

                        from MF in mfg.DefaultIfEmpty()

                        join PS in _context.UnitOfMeasure on IM.PurchaseUnitOfMeasureId equals PS.UnitOfMeasureId into pro

                        from PS in pro.DefaultIfEmpty()
                        where (

                        IM.ItemMasterId == partid

                        )
                        select new
                        {

                            IM.PartNumber,
                            IM.PartAlternatePartId,
                            IM.PartDescription,
                            //it.Description,
                            IM.ManufacturerId,
                            MF.Name,

                            IM.PurchaseDiscountOffListPrice,
                            IM.PurchaseListPriceAfterDiscount,





                            IM.ReorderQuantiy,
                            IM.ItemTypeId,
                            IM.ItemMasterId,
                            IM.IsHazardousMaterial,
                            IM.PriorityId,
                            IM.GLAccountId,
                            IM.PurchaseUnitOfMeasureId,
                            PS.ShortName

                        }).ToList();
            return data;


        }

        



        [HttpGet("CheckAddress/{id}")]
        [Produces(typeof(List<CheckPayment>))]
        public IActionResult GetCheckAddress(long id)
        {
            var checkAddress = _unitOfWork.Address.GetCheckAddress(id); //.GetAllCustomersData();
            return Ok(checkAddress);

        }

        //[HttpGet("vendorAddressGet/{id}")]
        //[Produces(typeof(List<VendorShippingAddress>))]
        //public IActionResult AllVendorAddressGet(long id)
        //{
        //    var allAddresses = _unitOfWork.VendorShippingAddress.GetAllShippingAddressDetails(id); //.GetAllCustomersData();
        //    return Ok(allAddresses);
        //}

        [HttpGet("getVendorShipViaDetails/{Selectedrow}")]
        [Produces(typeof(List<VendorShipping>))]
        public IActionResult getVendorShipViaDetails(long Selectedrow)
        {
            var allShipViaDetails = _unitOfWork.VendorShippingAddress.GetAllShipViaDetails(Selectedrow); //.GetAllCustomersData();
            return Ok(allShipViaDetails);
        }

        [HttpGet("cusshippingGetwithid/{Selectedrow}")]
        [Produces(typeof(List<VendorShipping>))]
        public IActionResult cusshippingGetwithid(long Selectedrow)
        {

            var allShipViaDetails = (from CS in _context.CustomerShippingAddress
                                     join ad in _context.Address on CS.AddressId equals ad.AddressId
                                     where (CS.CustomerShippingAddressId == Selectedrow)
                                     select new
                                     {
                                         CS,
                                         ad
                                     });



            return Ok(allShipViaDetails);

        }

        [HttpGet("venshippingGetwithid/{Selectedrow}")]
        [Produces(typeof(List<VendorShipping>))]
        public IActionResult venshippingGetwithid(long Selectedrow)
        {

            var allShipViaDetails = (from CS in _context.VendorShippingAddress
                                     join ad in _context.Address on CS.AddressId equals ad.AddressId
                                     where (CS.VendorShippingAddressId == Selectedrow)
                                     select new { CS, ad });



            return Ok(allShipViaDetails);

        }
        [HttpGet("vendorWarningsget/{Selectedrow}")]
        [Produces(typeof(List<VendorShipping>))]
        public IActionResult getVendorWarningsWithid(long Selectedrow)
        {

            var allShipViaDetails = _unitOfWork.VendorWarning.GetVendorwarningWithid(Selectedrow); //.GetAllCustomersData();
            return Ok(allShipViaDetails);

        }

        [HttpGet("Getdiscount")]
        [Produces(typeof(List<DiscountViewModel>))]
        public IActionResult Getdiscount()

        {
            var result = _unitOfWork.Discount.GetAllDiscountData(); //.GetAllCustomersData();


            return Ok(result);



        }
        [HttpGet("GetvendorList/{vendorName}")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult GetVendorListByVendorName(string vendorName, [FromBody]  VendorViewModel VendorViewModel)
        {
            var vendorList = _unitOfWork.Vendor.GetVendorListByName(vendorName);
            return Ok(vendorList);

        }

        [HttpGet("GetvendorpurchaseList/{vendorId}")]
        [Produces(typeof(List<PurchaseOrderViewModel>))]
        public IActionResult GetPurchaseListByVendor(long vendorId)
        {
            var vendorList = _unitOfWork.Vendor.GetvendorPurchaseOrderList(vendorId);
            return Ok(vendorList);

        }

        [HttpGet("GetvendorrepairList/{vendorId}")]
        [Produces(typeof(List<RepairOrderViewModel>))]
        public IActionResult GetvendorrepairList(long vendorId)
        {
            var vendorList = _unitOfWork.Vendor.Getvendorrepairunit(vendorId);
            return Ok(vendorList);

        }
        [HttpDelete("deletePoPart/{popid}")]
        [Produces(typeof(List<RepairOrderViewModel>))]
        public IActionResult deletePoPart(long popid)
        {
            var deleterecord = _context.PurchaseOrderPart.Where(a => a.PurchaseOrderPartRecordId == popid).SingleOrDefault();

            _context.Remove(deleterecord);
            _context.SaveChanges();
            return Ok(deleterecord);

        }
        [HttpDelete("deleteRoPart/{repPopid}")]
        [Produces(typeof(List<RepairOrderViewModel>))]
        public IActionResult deleteRoPart(long repPopid)
        {
            var deleterecord = _context.RepairOrderPart.Where(a => a.RepairOrderPartRecordId == repPopid).SingleOrDefault();

            _context.Remove(deleterecord);
            _context.SaveChanges();
            return Ok(deleterecord);

        }


        [HttpPost("saveVendorpurchases")]
        public IActionResult saveVendorpurchases([FromBody] PurchaseOrderViewModel poViewModel)//, Address address, VendorType vt)
        {
            if (!ModelState.IsValid)
            {
                string messages = string.Join("; ", ModelState.Values
                                        .SelectMany(x => x.Errors)
                                        .Select(x => x.ErrorMessage));
                Console.WriteLine(messages);
            }

            if (ModelState.IsValid)
            {

                if (_context.PurchaseOrder.Any(o => o.PurchaseOrderId == poViewModel.PurchaseOrderId))

                {
                    if (poViewModel == null)
                        return BadRequest($"{nameof(poViewModel)} cannot be null");
                    var actionobject = _context.PurchaseOrder.Where(a => a.PurchaseOrderId == poViewModel.PurchaseOrderId).SingleOrDefault();
                    //// DAL.Models.PurchaseOrder actionobject = new DAL.Models.PurchaseOrder();
                    ////vt.VendorTypeId = 1;
                    ////poViewModel.MasterCompanyId = 1;
                    ///
                    poViewModel.PurchaseOrderNumber = Guid.NewGuid().ToString();
                    poViewModel.MasterCompanyId = 1;
                    MapPOVMToEntity(poViewModel, actionobject);

                    _context.PurchaseOrder.Update(actionobject);
                    _unitOfWork.SaveChanges();
                    poViewModel.PurchaseOrderId = actionobject.PurchaseOrderId != null ? (long)actionobject.PurchaseOrderId : 0;
                    poViewModel.PurchaseOrderNumber = actionobject.PurchaseOrderNumber;
                    return Ok(poViewModel);
                }
                else
                {
                    if (poViewModel == null)
                        return BadRequest($"{nameof(poViewModel)} cannot be null");
                    DAL.Models.PurchaseOrder actionobject = new DAL.Models.PurchaseOrder();
                    poViewModel.PurchaseOrderNumber = Guid.NewGuid().ToString();
                    //vt.VendorTypeId = 1;
                    poViewModel.MasterCompanyId = 1;

                    MapPOVMToEntity(poViewModel, actionobject);

                    _context.PurchaseOrder.Add(actionobject);
                    _unitOfWork.SaveChanges();
                    if (actionobject.PurchaseOrderId != 0)
                    {
                        var exists = _context.PurchaseOrder.Where(a => a.PurchaseOrderId == actionobject.PurchaseOrderId).SingleOrDefault();
                        exists.PurchaseOrderNumber = "PO" + actionobject.PurchaseOrderId;
                        _context.PurchaseOrder.Update(exists);
                        _context.SaveChanges();
                        poViewModel.PurchaseOrderNumber = exists.PurchaseOrderNumber;

                    }
                    poViewModel.PurchaseOrderId = actionobject.PurchaseOrderId != null ? (long)actionobject.PurchaseOrderId : 0;
                    poViewModel.PurchaseOrderNumber = actionobject.PurchaseOrderNumber;
                    return Ok(poViewModel);

                }
            }



            return Ok(ModelState);
        }

        private string GetCreditTems(Int16? creditTermsId)
        {
            return _context.CreditTerms.Where(x => x.CreditTermsId == (int)creditTermsId).FirstOrDefault()?.Memo;
        }


        private void MapPOVMToEntity(PurchaseOrderViewModel poViewModel, PurchaseOrder actionobject)
        {
            actionobject.PriorityId = poViewModel.PriorityId;
            actionobject.DateRequested = poViewModel.OpenDate;

            actionobject.PurchaseOrderNumber = poViewModel.PurchaseOrderNumber;
            actionobject.RequestedBy = poViewModel.RequisitionerId;
            actionobject.ApproverId = poViewModel.ApproverId;
            actionobject.MasterCompanyId = poViewModel.MasterCompanyId;
            actionobject.BillToContactName = poViewModel.BillToContactName;

            actionobject.DateApproved = poViewModel.ApprovedDate;
            actionobject.NeedByDate = poViewModel.NeedByDate;
            actionobject.StatusId = poViewModel.StatusId;

            actionobject.VendorId = poViewModel.VendorId;
            actionobject.VendorContactId = poViewModel.VendorContactId;
            actionobject.CreditLimit = poViewModel.CreditLimit;
            actionobject.EmployeeId = poViewModel.EmployeeId;
            actionobject.SiteId = poViewModel.SiteId;
            actionobject.WarehouseId = poViewModel.WarehouseId;
            actionobject.LocationId = poViewModel.LocationId;
            actionobject.CreditTermsId = poViewModel.CreditTermsId;
            actionobject.Terms = poViewModel.Terms;
            actionobject.Notes = poViewModel.Notes;
            actionobject.ShipToCompanyId = poViewModel.ShipToCompanyId;
            actionobject.ShipToContactId = poViewModel.ShipToContactId;

            actionobject.IsActive = true;
            actionobject.ShipViaAccountId = poViewModel.ShipViaAccountId;
            actionobject.ManagementStructureId = poViewModel.ManagementStructureId;

            ////actionobject.IssuedToAddressId = poViewModel.IssuedToAddressId;
            ////actionobject.IssuedToContactName = poViewModel.IssuedToContactName;
            ////actionobject.IssuedToMemo = poViewModel.IssuedToMemo;
            actionobject.ShipToAddressId = poViewModel.ShipToAddressId;

            actionobject.ShipToMemo = poViewModel.ShipToMemo;
            actionobject.BillToAddressId = poViewModel.BillToAddressId;

            actionobject.BillToMemo = poViewModel.BillToMemo;
            actionobject.ShipToUserType = poViewModel.ShipToUserTypeId;
            actionobject.BillToUserType = poViewModel.BillToUserTypeId;
            actionobject.ShipToUserId = poViewModel.ShipToUserId;
            actionobject.BillToUserId = poViewModel.BillToUserId;
            actionobject.DeferredReceiver = poViewModel.DeferredReceiver;
            actionobject.Resale = poViewModel.Resale;
            actionobject.CreatedDate = DateTime.Now;
            actionobject.UpdatedDate = DateTime.Now;
            actionobject.CreatedBy = "admin";
            actionobject.UpdatedBy = "admin";

            actionobject.IsActive = true;

        }

        private void MapPOPSplitVMtoEntity(PurchaseOrderPartSplit poPartSplit, PurchaseOrderPartViewModel poViewModel, PurchaseOrderPart actionobject)
        {
            MapPOPVMtoEntity(poViewModel, actionobject);
            actionobject.isParent = false;
            actionobject.SerialNumber = poPartSplit.SerialNumber;
            actionobject.POPartSplitUserTypeId = poPartSplit.POPartSplitUserTypeId;
            actionobject.POPartSplitUserId = poPartSplit.POPartSplitUserId;
            actionobject.POPartSplitAddress1 = poPartSplit.POPartSplitAddress1;
            actionobject.POPartSplitAddress2 = poPartSplit.POPartSplitAddress2;
            actionobject.POPartSplitAddress3 = poPartSplit.POPartSplitAddress3;
            actionobject.POPartSplitCity = poPartSplit.POPartSplitCity;
            actionobject.POPartSplitCountry = poPartSplit.POPartSplitCountry;
            actionobject.POPartSplitPostalCode = poPartSplit.POPartSplitPostalCode;
            actionobject.UOMId = poPartSplit.UOMId;
            actionobject.NeedByDate = poPartSplit.NeedByDate;
            actionobject.QuantityOrdered = poPartSplit.QuantityOrdered;
            actionobject.ItemMasterId = poPartSplit.ItemMasterId;

            actionobject.ManagementStructureId = poPartSplit.ManagementStructureId;
        }

        private void MapPOPVMtoEntity(PurchaseOrderPartViewModel poViewModel, PurchaseOrderPart actionobject)
        {
            actionobject.PurchaseOrderId = poViewModel.PurchaseOrderId;
            actionobject.ItemMasterId = poViewModel.ItemMasterId;
            actionobject.SerialNumber = poViewModel.SerialNumber;
            //actionobject.NonInventory = poViewModel.NonInventory;
            //actionobject.RequisitionedBy = poViewModel.RequisitionedBy;
            //actionobject.RequisitionedDate = poViewModel.RequisitionedDate;
            //actionobject.POPartSplitAddressId = poViewModel.POPartSplitAddressId;
            actionobject.MasterCompanyId = poViewModel.MasterCompanyId;
            actionobject.ManagementStructureId = poViewModel.ManagementStructureId;

            actionobject.NeedByDate = poViewModel.NeedByDate;
            //actionobject.Approver = poViewModel.Approver;
            //actionobject.ApprovedDate = poViewModel.ApprovedDate;
            actionobject.NeedByDate = poViewModel.NeedByDate;
            actionobject.ManufacturerId = poViewModel.ManufacturerId;
            //actionobject.Status = poViewModel.Status;
            //actionobject.Trace = poViewModel.Trace;
            actionobject.ConditionId = poViewModel.ConditionId;
            //actionobject.isParent = poViewModel.isParent;
            actionobject.QuantityOrdered = poViewModel.QuantityOrdered;
            actionobject.UnitCost = poViewModel.UnitCost;
            actionobject.DiscountCostPerUnit = poViewModel.DiscountAmount;
            actionobject.DiscountPerUnit = poViewModel.DiscountPerUnit;
            actionobject.ExtendedCost = poViewModel.ExtendedCost;
            actionobject.TransactionalCurrencyId = poViewModel.ReportCurrencyId;
            actionobject.FunctionalCurrencyId = poViewModel.FunctionalCurrencyId;
            actionobject.ForeignExchangeRate = poViewModel.ForeignExchangeRate;
            actionobject.WorkOrderId = poViewModel.WorkOrderId;
            actionobject.RepairOrderId = poViewModel.RepairOrderId;
            actionobject.SalesOrderId = poViewModel.SalesOrderId;
            actionobject.GeneralLedgerAccounId = poViewModel.GLAccounId;
            actionobject.Memo = poViewModel.Memo;
            actionobject.DiscountPerUnit = poViewModel.DiscountPerUnit;


            actionobject.UOMId = poViewModel.UOMId;
            actionobject.CreatedDate = poViewModel.CreatedDate;
            actionobject.UpdatedDate = DateTime.Now;
            actionobject.CreatedBy = poViewModel.CreatedBy;
            actionobject.UpdatedBy = poViewModel.UpdatedBy;
            actionobject.IsActive = true;
        }


        private string IsNull(string val)
        {
            return string.IsNullOrEmpty(val) ? string.Empty : val;
        }
        private void MapAddress(PurchaseOrderPartSplit poSplit)
        {
            var address = _context.Address.Where(a => a.AddressId == poSplit.POPartSplitAddressId).FirstOrDefault();
            if (address != null)
            {
                poSplit.POPartSplitAddress1 = (IsNull(address?.PoBox) + " " + IsNull(address.Line1)).Trim();
                poSplit.POPartSplitAddress2 = address.Line2;
                poSplit.POPartSplitAddress3 = address.Line3;
                poSplit.POPartSplitCity = address.City;
                poSplit.POPartSplitState = address.StateOrProvince;
                poSplit.POPartSplitCountry = address.Country;
                poSplit.POPartSplitPostalCode = address.PostalCode;
            }
        }

        [HttpPost("saveVendorpurchasespart")]
        public IActionResult saveVendorpurchasespart([FromBody] IEnumerable<PurchaseOrderPartViewModel> poViewModels)//, Address address, VendorType vt)
        {
            if (ModelState.IsValid)
            {
                foreach (var poViewModel in poViewModels)
                {
                    var actionobject = _context.PurchaseOrderPart.Where(o => o.PurchaseOrderPartRecordId == poViewModel.PurchaseOrderPartRecordId).FirstOrDefault();
                    if (actionobject != null)
                    {
                        if (poViewModel == null)
                            return BadRequest($"{nameof(poViewModel)} cannot be null");
                        actionobject.isParent = poViewModel.isParent;
                        MapPOPVMtoEntity(poViewModel, actionobject);
                        _context.PurchaseOrderPart.Update(actionobject);
                        _unitOfWork.SaveChanges();
                    }
                    else
                    {
                        actionobject = new DAL.Models.PurchaseOrderPart();
                        actionobject.isParent = poViewModel.isParent;
                        poViewModel.CreatedDate = DateTime.Now;
                        poViewModel.CreatedBy = "admin";
                        poViewModel.UpdatedBy = "admin";
                        poViewModel.IsActive = true;
                        MapPOPVMtoEntity(poViewModel, actionobject);
                        _context.PurchaseOrderPart.Add(actionobject);
                        _unitOfWork.SaveChanges();
                    }
                    poViewModel.PurchaseOrderPartRecordId = actionobject.PurchaseOrderPartRecordId;
                    foreach (var poPartSplit in poViewModel.POPartSplits)
                    {
                        var popSplitEnt = _context.PurchaseOrderPart.Where(o => o.PurchaseOrderPartRecordId == poPartSplit.PurchaseOrderPartRecordId).FirstOrDefault();
                        if (popSplitEnt == null)
                        {
                            popSplitEnt = new PurchaseOrderPart();
                            popSplitEnt.isParent = false;

                            MapAddress(poPartSplit);
                            MapPOPSplitVMtoEntity(poPartSplit, poViewModel, popSplitEnt);
                            _context.PurchaseOrderPart.Add(popSplitEnt);
                            
                        }
                        else
                        {
                            MapAddress(poPartSplit);
                            popSplitEnt.isParent = false;
                            MapPOPSplitVMtoEntity(poPartSplit, poViewModel, popSplitEnt);
                            _context.PurchaseOrderPart.Update(actionobject);
                        }
                        _unitOfWork.SaveChanges();
                        poPartSplit.PurchaseOrderPartRecordId = popSplitEnt.PurchaseOrderPartRecordId;
                    }                   
                }
                return Ok(poViewModels);
            }
            return Ok(ModelState);
        }

        [HttpPost("saveVendorrepaire")]
        public IActionResult saveVendorrepaire([FromBody] RepairOrderViewModel poViewModel, Address address, VendorType vt)
        {
            if (ModelState.IsValid)
            {
                if (poViewModel == null)
                {
                    return BadRequest($"{nameof(poViewModel)} cannot be null");
                }
                   

                if (_context.RepairOrder.Any(o => o.RepairOrderId == poViewModel.RepairOrderId))
                {
                    
                    var repairOrderModel = _context.RepairOrder.Where(a => a.RepairOrderId == poViewModel.RepairOrderId).SingleOrDefault();

                    repairOrderModel.RepairOrderNumber = poViewModel.RepairOrderNumber;
                    repairOrderModel.OpenDate = poViewModel.OpenDate;
                    repairOrderModel.NeedByDate = poViewModel.NeedByDate;
                    repairOrderModel.PriorityId = poViewModel.PriorityId;
                    repairOrderModel.DeferredReceiver = poViewModel.DeferredReceiver;
                    repairOrderModel.VendorId = poViewModel.VendorId;
                    repairOrderModel.VendorName = poViewModel.VendorName;
                    repairOrderModel.VendorCode = poViewModel.VendorCode;
                    repairOrderModel.VendorContactId = poViewModel.VendorContactId;
                    repairOrderModel.VendorContactPhone = poViewModel.VendorContactPhone;
                    repairOrderModel.CreditLimit = poViewModel.CreditLimit;
                    repairOrderModel.CreditTermsId = poViewModel.CreditTermsId;
                    repairOrderModel.RequisitionerId = poViewModel.RequisitionerId;
                    repairOrderModel.ApproverId = poViewModel.ApproverId;
                    repairOrderModel.ApprovedDate = poViewModel.ApprovedDate;
                    repairOrderModel.StatusId = poViewModel.StatusId;
                    repairOrderModel.Resale = poViewModel.Resale;
                    repairOrderModel.ManagementStructureId = poViewModel.ManagementStructureId;
                    repairOrderModel.RoMemo = poViewModel.RoMemo;
                    repairOrderModel.ShipToUserId = poViewModel.ShipToUserId;
                    repairOrderModel.ShipToAddressId = poViewModel.ShipToAddressId;
                    repairOrderModel.ShipToContactId = poViewModel.ShipToContactId;
                    repairOrderModel.ShipViaId = poViewModel.ShipViaId;
                    repairOrderModel.ShippingCost = poViewModel.ShippingCost;
                    repairOrderModel.HandlingCost = poViewModel.HandlingCost;
                    repairOrderModel.ShippingId = poViewModel.ShippingId;
                    repairOrderModel.ShippingUrl = poViewModel.ShippingUrl;
                    repairOrderModel.ShipToMemo = poViewModel.ShipToMemo;
                    repairOrderModel.BillToUserTypeId = poViewModel.BillToUserTypeId;
                    repairOrderModel.BillToUserId = poViewModel.BillToUserId;
                    repairOrderModel.BillToAddressId = poViewModel.BillToAddressId;
                    repairOrderModel.BillToContactId = poViewModel.BillToContactId;
                    repairOrderModel.BillToMemo = poViewModel.BillToMemo;
                    repairOrderModel.CreatedBy = "admin";
                    repairOrderModel.UpdatedBy = "admin";
                    _context.SaveChanges();
                    return Ok(repairOrderModel);
                }
                else
                {
                    RepairOrder repairOrderModel = new RepairOrder();
                    vt.VendorTypeId = 1;
                    repairOrderModel.RepairOrderNumber = poViewModel.RepairOrderNumber;
                    repairOrderModel.OpenDate = poViewModel.OpenDate;
                    repairOrderModel.NeedByDate = poViewModel.NeedByDate;
                    repairOrderModel.PriorityId = poViewModel.PriorityId;
                    repairOrderModel.DeferredReceiver = poViewModel.DeferredReceiver;
                    repairOrderModel.VendorId = poViewModel.VendorId;
                    repairOrderModel.VendorName = poViewModel.VendorName;
                    repairOrderModel.VendorCode = poViewModel.VendorCode;
                    repairOrderModel.VendorContactId = poViewModel.VendorContactId;
                    repairOrderModel.VendorContactPhone = poViewModel.VendorContactPhone;
                    repairOrderModel.CreditLimit = poViewModel.CreditLimit;
                    repairOrderModel.CreditTermsId = poViewModel.CreditTermsId;
                    repairOrderModel.RequisitionerId = poViewModel.RequisitionerId;
                    repairOrderModel.ApproverId = poViewModel.ApproverId;
                    repairOrderModel.ApprovedDate = poViewModel.ApprovedDate;
                    repairOrderModel.StatusId = poViewModel.StatusId;
                    repairOrderModel.Resale = poViewModel.Resale;
                    repairOrderModel.ManagementStructureId = poViewModel.ManagementStructureId;
                    repairOrderModel.RoMemo = poViewModel.RoMemo;
                    repairOrderModel.ShipToUserId = poViewModel.ShipToUserId;
                    repairOrderModel.ShipToAddressId = poViewModel.ShipToAddressId;
                    repairOrderModel.ShipToContactId = poViewModel.ShipToContactId;
                    repairOrderModel.ShipViaId = poViewModel.ShipViaId;
                    repairOrderModel.ShippingCost = poViewModel.ShippingCost;
                    repairOrderModel.HandlingCost = poViewModel.HandlingCost;
                    repairOrderModel.ShippingId = poViewModel.ShippingId;
                    repairOrderModel.ShippingUrl = poViewModel.ShippingUrl;
                    repairOrderModel.ShipToMemo = poViewModel.ShipToMemo;
                    repairOrderModel.BillToUserTypeId = poViewModel.BillToUserTypeId;
                    repairOrderModel.BillToUserId = poViewModel.BillToUserId;
                    repairOrderModel.BillToAddressId = poViewModel.BillToAddressId;
                    repairOrderModel.BillToContactId = poViewModel.BillToContactId;
                    repairOrderModel.BillToMemo = poViewModel.BillToMemo;
                    repairOrderModel.CreatedBy = "admin";
                    repairOrderModel.UpdatedBy = "admin";
                    _context.RepairOrder.Add(repairOrderModel);
                    _context.SaveChanges();

                    if (repairOrderModel.RepairOrderId != 0)
                    {
                        var exists = _context.RepairOrder.Where(a => a.RepairOrderId == repairOrderModel.RepairOrderId).SingleOrDefault();
                        exists.RepairOrderNumber = "RO" + repairOrderModel.RepairOrderId;
                        _context.RepairOrder.Update(exists);
                        _context.SaveChanges();
                    }
                    return Ok(repairOrderModel);

                }
            }
            return Ok(ModelState);
        }

        [HttpPost("saveVendorrepairpart")]
        public IActionResult saveVendorrepairpart([FromBody] RepairOrderPartViewModel poViewModel, Address address, VendorType vt)
        {
            if (ModelState.IsValid)
            {
                if (_context.RepairOrderPart.Any(o => o.RepairOrderPartRecordId == poViewModel.RepairOrderPartRecordId))

                {
                    if (poViewModel == null)
                        return BadRequest($"{nameof(poViewModel)} cannot be null");
                    var actionobject = _context.RepairOrderPart.Where(a => a.RepairOrderPartRecordId == poViewModel.RepairOrderPartRecordId).SingleOrDefault();
                    //DAL.Models.PurchaseOrderPart actionobject = new DAL.Models.PurchaseOrderPart();

                    actionobject.RepairOrderId = poViewModel.RepairOrderId;
                    actionobject.ItemMasterId = poViewModel.ItemMasterId;
                    actionobject.SerialNumber = poViewModel.SerialNumber;
                    actionobject.NonInventory = poViewModel.NonInventory;
                    actionobject.RequisitionedBy = poViewModel.RequisitionedBy;
                    actionobject.RequisitionedDate = poViewModel.RequisitionedDate;

                    actionobject.Approver = poViewModel.Approver;
                    actionobject.ApprovedDate = poViewModel.ApprovedDate;
                    actionobject.NeedByDate = poViewModel.NeedByDate;
                    actionobject.Manufacturer = poViewModel.Manufacturer;
                    actionobject.Status = poViewModel.Status;
                    actionobject.Trace = poViewModel.Trace;
                    actionobject.ConditionCode = poViewModel.ConditionCode;
                    actionobject.isParent = poViewModel.isParent;
                    actionobject.QuantityOrdered = poViewModel.QuantityOrdered;
                    actionobject.UnitCost = poViewModel.UnitCost;
                    actionobject.DiscountCostPerUnit = poViewModel.DiscountCostPerUnit;
                    actionobject.DiscountPerUnit = poViewModel.DiscountPerUnit;
                    actionobject.ExtendedCost = poViewModel.ExtendedCost;
                    actionobject.TransactionalCurrencyId = poViewModel.TransactionalCurrencyId;
                    actionobject.FunctionalCurrencyId = poViewModel.FunctionalCurrencyId;
                    actionobject.ForeignExchangeRate = poViewModel.ForeignExchangeRate;
                    actionobject.WorkOrderId = poViewModel.WorkOrderId;
                    actionobject.RepairOrderId = poViewModel.RepairOrderId;
                    actionobject.SalesOrderId = poViewModel.SalesOrderId;
                    actionobject.GeneralLedgerAccounId = poViewModel.GeneralLedgerAccounId;
                    actionobject.Memo = poViewModel.Memo;
                    actionobject.ROPartSplitUserTypeId = poViewModel.ROPartSplitUserTypeId;
                    actionobject.ROPartSplitUserName = poViewModel.ROPartSplitUserName;
                    actionobject.DiscountPerUnit = poViewModel.DiscountPerUnit;
                    actionobject.ROPartSplitAddress1 = poViewModel.ROPartSplitAddress1;
                    actionobject.ROPartSplitAddress2 = poViewModel.ROPartSplitAddress2;
                    actionobject.ROPartSplitAddress3 = poViewModel.ROPartSplitAddress3;
                    actionobject.ROPartSplitCity = poViewModel.ROPartSplitCity;
                    actionobject.ROPartSplitCountry = poViewModel.ROPartSplitCountry;
                    actionobject.ROPartSplitPostalCode = poViewModel.ROPartSplitPostalCode;
                    actionobject.ManagementStructureId = poViewModel.ManagementStructureId;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.RepairOrderPart.Update(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);
                }

                else
                {
                    DAL.Models.RepairOrderPart actionobject = new DAL.Models.RepairOrderPart();

                    actionobject.RepairOrderId = poViewModel.RepairOrderId;
                    actionobject.ItemMasterId = poViewModel.ItemMasterId;
                    actionobject.SerialNumber = poViewModel.SerialNumber;
                    actionobject.NonInventory = poViewModel.NonInventory;
                    actionobject.RequisitionedBy = poViewModel.RequisitionedBy;
                    actionobject.RequisitionedDate = poViewModel.RequisitionedDate;

                    actionobject.Approver = poViewModel.Approver;
                    actionobject.ApprovedDate = poViewModel.ApprovedDate;
                    actionobject.NeedByDate = poViewModel.NeedByDate;
                    actionobject.Manufacturer = poViewModel.Manufacturer;
                    actionobject.Status = poViewModel.Status;
                    actionobject.Trace = poViewModel.Trace;
                    actionobject.ConditionCode = poViewModel.ConditionCode;
                    actionobject.isParent = poViewModel.isParent;
                    actionobject.QuantityOrdered = poViewModel.QuantityOrdered;
                    actionobject.UnitCost = poViewModel.UnitCost;
                    actionobject.DiscountCostPerUnit = poViewModel.DiscountCostPerUnit;
                    actionobject.DiscountPerUnit = poViewModel.DiscountPerUnit;
                    actionobject.ExtendedCost = poViewModel.ExtendedCost;
                    actionobject.TransactionalCurrencyId = poViewModel.TransactionalCurrencyId;
                    actionobject.FunctionalCurrencyId = poViewModel.FunctionalCurrencyId;
                    actionobject.ForeignExchangeRate = poViewModel.ForeignExchangeRate;
                    actionobject.WorkOrderId = poViewModel.WorkOrderId;
                    actionobject.RepairOrderId = poViewModel.RepairOrderId;
                    actionobject.SalesOrderId = poViewModel.SalesOrderId;
                    actionobject.GeneralLedgerAccounId = poViewModel.GeneralLedgerAccounId;
                    actionobject.Memo = poViewModel.Memo;
                    actionobject.ROPartSplitUserTypeId = poViewModel.ROPartSplitUserTypeId;
                    actionobject.ROPartSplitUserName = poViewModel.ROPartSplitUserName;
                    actionobject.DiscountPerUnit = poViewModel.DiscountPerUnit;
                    actionobject.ROPartSplitAddress1 = poViewModel.ROPartSplitAddress1;
                    actionobject.ROPartSplitAddress2 = poViewModel.ROPartSplitAddress2;
                    actionobject.ROPartSplitAddress3 = poViewModel.ROPartSplitAddress3;
                    actionobject.ROPartSplitCity = poViewModel.ROPartSplitCity;
                    actionobject.ROPartSplitCountry = poViewModel.ROPartSplitCountry;
                    actionobject.ROPartSplitPostalCode = poViewModel.ROPartSplitPostalCode;
                    actionobject.ManagementStructureId = poViewModel.ManagementStructureId;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.RepairOrderPart.Add(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);

                }
            }

            return Ok(ModelState);
        }

        //[HttpPost("vendor")]
        //public IActionResult CreateAction([FromBody] VendorViewModel vendorViewModel, Address address, VendorType vt)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (vendorViewModel == null)
        //            return BadRequest($"{nameof(vendorViewModel)} cannot be null");
        //        DAL.Models.Vendor actionobject = new DAL.Models.Vendor();
        //        vt.VendorTypeId = 1;
        //        vendorViewModel.MasterCompanyId = 1;
        //        actionobject.VendorId = vendorViewModel.VendorId;
        //        actionobject.VendorName = vendorViewModel.VendorName;
        //        actionobject.LicenseNumber = vendorViewModel.LicenseNumber;
        //        actionobject.VendorClassificationId = vendorViewModel.VendorClassificationId;
        //        actionobject.capabilityId = vendorViewModel.capabilityId;
        //        actionobject.VendorPhone = vendorViewModel.VendorPhone;
        //        actionobject.VendorTypeId = vendorViewModel.VendorTypeId;
        //        actionobject.IsPreferredVendor = vendorViewModel.IsPreferredVendor;
        //        actionobject.Parent = vendorViewModel.Parent;
        //        actionobject.IsVendorAlsoCustomer = vendorViewModel.IsVendorAlsoCustomer;
        //        actionobject.VendorEmail = vendorViewModel.VendorEmail;
        //        actionobject.VendorCode = vendorViewModel.VendorCode;
        //        actionobject.VendorContractReference = vendorViewModel.VendorContractReference;
        //        actionobject.DoingBusinessAsName = vendorViewModel.DoingBusinessAsName;
        //        actionobject.VendorURL = vendorViewModel.VendorURL;
        //        actionobject.IsCertified = vendorViewModel.IsCertified;
        //        actionobject.VendorAudit = vendorViewModel.VendorAudit;
        //        actionobject.MasterCompanyId = vendorViewModel.MasterCompanyId;
        //        actionobject.IsActive = true;
        //        actionobject.CreditTermsId = vendorViewModel.CreditTermsId;
        //        actionobject.CreatedDate = DateTime.Now;
        //        actionobject.UpdatedDate = DateTime.Now;
        //        actionobject.CreatedBy = vendorViewModel.CreatedBy;
        //        actionobject.UpdatedBy = vendorViewModel.UpdatedBy;
        //        //actionobject.vendorc
        //        AddAddress(vendorViewModel);
        //        actionobject.AddressId = vendorViewModel.AddressId.Value;
        //        _unitOfWork.Vendor.Add(actionobject);
        //        _unitOfWork.SaveChanges();
        //        return Ok(actionobject);
        //    }

        //    return Ok(ModelState);
        //}

        [HttpPost("vendorPost")]
        public IActionResult CreateAction([FromBody] VendorViewModel vendorViewModel, Address address, VendorType vt)
        {
            if (ModelState.IsValid)
            {
                if (vendorViewModel == null)
                    return BadRequest($"{nameof(vendorViewModel)} cannot be null");
                DAL.Models.Vendor actionobject = new DAL.Models.Vendor();
                vt.VendorTypeId = 1;
                vendorViewModel.MasterCompanyId = 1;
                actionobject.VendorId = vendorViewModel.VendorId;
                actionobject.VendorName = vendorViewModel.VendorName;
                actionobject.LicenseNumber = vendorViewModel.LicenseNumber;
                actionobject.VendorClassificationId = vendorViewModel.VendorClassificationId;
                actionobject.capabilityId = vendorViewModel.capabilityId;
                actionobject.VendorPhone = vendorViewModel.VendorPhone;
                actionobject.VendorTypeId = vendorViewModel.VendorTypeId;
                actionobject.IsPreferredVendor = vendorViewModel.IsPreferredVendor;
                actionobject.Parent = vendorViewModel.Parent;
                actionobject.IsVendorAlsoCustomer = vendorViewModel.IsVendorAlsoCustomer;
                actionobject.VendorEmail = vendorViewModel.VendorEmail;
                actionobject.VendorCode = vendorViewModel.VendorCode;
                actionobject.VendorContractReference = vendorViewModel.VendorContractReference;
                actionobject.DoingBusinessAsName = vendorViewModel.DoingBusinessAsName;
                actionobject.VendorURL = vendorViewModel.VendorURL;
                actionobject.IsCertified = vendorViewModel.IsCertified;
                actionobject.VendorAudit = vendorViewModel.VendorAudit;
                actionobject.MasterCompanyId = vendorViewModel.MasterCompanyId;
                actionobject.IsActive = true;
                actionobject.CreditTermsId = vendorViewModel.CreditTermsId;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = vendorViewModel.CreatedBy;
                actionobject.UpdatedBy = vendorViewModel.UpdatedBy;
                //actionobject.vendorc
                AddAddress(vendorViewModel);
                actionobject.AddressId = vendorViewModel.AddressId.Value;
                _unitOfWork.Vendor.Add(actionobject);
                _unitOfWork.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }
        [HttpPost("getVendorForPo")]
        public Object VendorDetailsForPo([FromBody] VendorPoViewModel vendorViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorViewModel.VendorName != null)
                {

                    var data = (from IM in _context.Vendor

                                join PT in _context.VendorContact on IM.VendorId equals PT.VendorId into pt

                                from PT in pt.DefaultIfEmpty()
                                join MF in _context.Contact on PT.ContactId equals MF.ContactId into mfg

                                from MF in mfg.DefaultIfEmpty()

                                join PS in _context.Address on IM.AddressId equals PS.AddressId into pro

                                from PS in pro.DefaultIfEmpty()
                                where (
                                IM.VendorName.Contains(vendorViewModel.VendorName) && IM.VendorCode.Contains(vendorViewModel.VendorCode) &&
                                  PS.City.Contains(vendorViewModel.City) && PS.StateOrProvince.Contains(vendorViewModel.State) &&
                                   PS.PostalCode.Contains(vendorViewModel.PostalCode) && MF.FirstName.Contains(vendorViewModel.VendorContact)
                                   && MF.WorkPhone.Contains(vendorViewModel.ContactPhone)

                                )
                                select new
                                {

                                    PS,
                                    IM,
                                    IM.VendorTypeId,
                                    IM.VendorId,
                                    IM.VendorName,
                                    IM.VendorCode,
                                    PS.StateOrProvince,
                                    PS.City,
                                    MF.Email,
                                    MF.FirstName,
                                    MF.WorkPhone,
                                    IM.CreditLimit/*,IM.CreditTermsId,*/


                                }).ToList();
                    return data;
                }

            }

            return Ok(ModelState);
        }

        [HttpPut("vendorUpdate/{id}")]
        public IActionResult UpdateVendorList(long id, [FromBody] VendorViewModel vendorViewModel, VendorType vt)
        {
            if (ModelState.IsValid)
            {
                if (vendorViewModel == null)
                    return BadRequest($"{nameof(vendorViewModel)} cannot be null");
                var actionobject = _unitOfWork.Vendor.GetSingleOrDefault(c => c.VendorId == id);
                var address = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == actionobject.AddressId);

                vt.VendorTypeId = 1;
                vendorViewModel.MasterCompanyId = 1;
                actionobject.VendorId = vendorViewModel.VendorId;
                actionobject.VendorName = vendorViewModel.VendorName;
                actionobject.LicenseNumber = vendorViewModel.LicenseNumber;
                actionobject.VendorPhone = vendorViewModel.VendorPhone;
                actionobject.VendorClassificationId = vendorViewModel.VendorClassificationId;
                actionobject.capabilityId = vendorViewModel.capabilityId;
                actionobject.VendorParentName = vendorViewModel.VendorParentName;
                actionobject.VendorTypeId = vendorViewModel.VendorTypeId;
                actionobject.IsPreferredVendor = vendorViewModel.IsPreferredVendor;
                actionobject.Parent = vendorViewModel.Parent;
                actionobject.VendorCode = vendorViewModel.VendorCode;
                actionobject.IsVendorAlsoCustomer = vendorViewModel.IsVendorAlsoCustomer;
                actionobject.VendorContractReference = vendorViewModel.VendorContractReference;
                actionobject.DoingBusinessAsName = vendorViewModel.DoingBusinessAsName;
                actionobject.VendorURL = vendorViewModel.VendorURL;
                actionobject.IsCertified = vendorViewModel.IsCertified;
                actionobject.VendorAudit = vendorViewModel.VendorAudit;
                actionobject.VendorEmail = vendorViewModel.VendorEmail;
                actionobject.MasterCompanyId = vendorViewModel.MasterCompanyId;
                actionobject.IsActive = vendorViewModel.IsActive;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = vendorViewModel.CreatedBy;
                actionobject.CreditTermsId = vendorViewModel.CreditTermsId;
                actionobject.UpdatedBy = vendorViewModel.UpdatedBy;
                address.Line1 = vendorViewModel.Address1;
                address.Line2 = vendorViewModel.Address2;
                address.Line3 = vendorViewModel.Address3;
                address.PostalCode = vendorViewModel.PostalCode;
                //address.VendorPhone = vendorViewModel.VendorPhone;
                address.StateOrProvince = vendorViewModel.StateOrProvince;
                address.City = vendorViewModel.City;
                address.Country = vendorViewModel.Country;
                address.MasterCompanyId = 1;
                address.RecordCreateDate = DateTime.Now;
                address.CreatedBy = vendorViewModel.CreatedBy ?? "Admin"; //Hotfix
                address.UpdatedBy = vendorViewModel.UpdatedBy ?? "Admin";//Hotfix
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(address);
                _unitOfWork.SaveChanges();

                _unitOfWork.Vendor.Update(actionobject);
                _unitOfWork.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }

        [HttpPost("insertDiscount")]
        public IActionResult CreateAction([FromBody] DiscountViewModel discountViewModel)
        {
            if (ModelState.IsValid)
            {
                if (discountViewModel == null)
                    return BadRequest($"{nameof(DiscountViewModel)} cannot be null");

                DAL.Models.DiscountModel discObj = new DAL.Models.DiscountModel();
                discObj.DiscontValue = discountViewModel.DiscontValue;
                _unitOfWork.Discount.Add(discObj);
                _unitOfWork.SaveChanges();
            }
            return Ok(ModelState);
        }


        [HttpPut("updatediscount/{id}")]
        public IActionResult UpdateDiscont(long id, DiscountViewModel discountViewModel)
        {
            var disc = _context.Discount.First(a => a.DiscountId == id);
            disc.DiscontValue = discountViewModel.DiscontValue;
            _context.Discount.Add(disc);
            _context.SaveChanges();
            return Ok(disc);


        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult AddAddress(VendorViewModel vendorViewModel)
        {
            Address address = new Address();
            address.Line1 = vendorViewModel.Address1;
            address.Line2 = vendorViewModel.Address2;
            address.Line3 = vendorViewModel.Address3;
            address.PostalCode = vendorViewModel.PostalCode;
            address.StateOrProvince = vendorViewModel.StateOrProvince;

            address.City = vendorViewModel.City;
            address.Country = vendorViewModel.Country;
            address.MasterCompanyId = 1;
            address.IsActive = true;
            address.RecordCreateDate = DateTime.Now;
            address.CreatedBy = vendorViewModel.CreatedBy ?? "Admin"; //Hotfix
            address.UpdatedBy = vendorViewModel.UpdatedBy ?? "Admin"; //Hotfix
            address.CreatedDate = DateTime.Now;
            address.UpdatedDate = DateTime.Now;
            _unitOfWork.Address.Add(address);
            _unitOfWork.SaveChanges();
            vendorViewModel.AddressId = address.AddressId.Value;
            return Ok(ModelState);
        }

        [HttpPost("vendorContactPost")]
        public IActionResult CreateContact([FromBody] ContactViewModel contactViewModel)
        {
            if (ModelState.IsValid)
            {
                if (contactViewModel == null)
                    return BadRequest($"{nameof(contactViewModel)} cannot be null");
                Contact contactObj = new Contact();
                contactViewModel.MasterCompanyId = 1;
                contactViewModel.ContactId = null;
                contactObj.ContactId = contactViewModel.ContactId;
                contactObj.ContactTitle = contactViewModel.ContactTitle;
                contactObj.AlternatePhone = contactViewModel.AlternatePhone;
                // contactObj.IsDefaultContact = contactViewModel.IsDefaultContact;
                contactObj.Email = contactViewModel.Email;
                contactObj.Prefix = contactViewModel.Prefix;
                contactObj.Suffix = contactViewModel.Suffix;
                contactObj.Fax = contactViewModel.Fax;
                contactObj.FirstName = contactViewModel.FirstName;
                contactObj.LastName = contactViewModel.LastName;
                contactObj.MiddleName = contactViewModel.MiddleName;
                contactObj.ContactTitle = contactViewModel.ContactTitle;
                contactObj.MobilePhone = contactViewModel.MobilePhone;
                contactObj.Notes = contactViewModel.Notes;
                contactObj.WorkPhone = contactViewModel.WorkPhone;
                contactObj.WebsiteURL = contactViewModel.WebsiteURL;
                contactObj.MasterCompanyId = contactViewModel.MasterCompanyId;
                contactObj.IsActive = true;
                // contactObj.IsActive = contactViewModel.IsActive;
                contactObj.CreatedDate = DateTime.Now;
                contactObj.UpdatedDate = DateTime.Now;
                contactObj.CreatedBy = contactViewModel.CreatedBy;
                contactObj.UpdatedBy = contactViewModel.UpdatedBy;
                _unitOfWork.ContactRepository.Add(contactObj);
                _unitOfWork.SaveChanges();
                return Ok(contactObj);
            }

            return Ok(ModelState);
        }
        [HttpPost("ContactPost")]
        public IActionResult CreateVendorContact([FromBody] VendorContactViewModel vendorContactViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorContactViewModel == null)
                    return BadRequest($"{nameof(vendorContactViewModel)} cannot be null");
                VendorContact contactObj = new VendorContact();
                vendorContactViewModel.MasterCompanyId = 1;
                contactObj.ContactId = vendorContactViewModel.ContactId;
                contactObj.VendorId = vendorContactViewModel.VendorId;
                contactObj.IsDefaultContact = vendorContactViewModel.IsDefaultContact;
                contactObj.RecordCreateDate = DateTime.Now; ;
                contactObj.MasterCompanyId = vendorContactViewModel.MasterCompanyId;
                contactObj.IsActive = true;
                //contactObj.IsActive = vendorContactViewModel.IsActive;
                contactObj.CreatedDate = DateTime.Now;
                contactObj.UpdatedDate = DateTime.Now;
                contactObj.CreatedBy = vendorContactViewModel.CreatedBy;
                contactObj.UpdatedBy = vendorContactViewModel.UpdatedBy;
                _unitOfWork.vendorContactRepository.Add(contactObj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("vendorUpdateforActive/{id}")]
        public IActionResult vendorsUpdateforActive(long id, [FromBody]VendorViewModel vendorViewModel)
        {
            if (ModelState.IsValid)
            {
                var VendorrObj = _unitOfWork.Vendor.GetSingleOrDefault(a => a.VendorId == id);
                vendorViewModel.MasterCompanyId = 1;
                VendorrObj.IsActive = vendorViewModel.IsActive;
                VendorrObj.UpdatedDate = DateTime.Now;
                VendorrObj.UpdatedBy = vendorViewModel.UpdatedBy;
                VendorrObj.VendorId = vendorViewModel.VendorId;
                _unitOfWork.Vendor.Update(VendorrObj);
                _unitOfWork.SaveChanges();
                return Ok(VendorrObj);
            }

            return Ok(ModelState);
        }
        [HttpPut("vendorUpdateforActiveforcontact/{id}")]
        public IActionResult vendorcontactUpdateforActive(long id, [FromBody]ContactViewModel contactViewModel)
        {
            if (ModelState.IsValid)
            {
                var VendorcontactObj = _unitOfWork.ContactRepository.GetSingleOrDefault(a => a.ContactId == id);
                contactViewModel.MasterCompanyId = 1;
                VendorcontactObj.IsActive = contactViewModel.IsActive;
                VendorcontactObj.UpdatedDate = DateTime.Now;
                VendorcontactObj.UpdatedBy = contactViewModel.UpdatedBy;
                VendorcontactObj.ContactId = contactViewModel.ContactId;
                _unitOfWork.ContactRepository.Update(VendorcontactObj);
                _unitOfWork.SaveChanges();
                return Ok(VendorcontactObj);
            }

            return Ok(ModelState);
        }
        [HttpPut("vendorUpdateforActiveforpayment/{id}")]
        public IActionResult vendorpaymentUpdateforActive(long id, [FromBody]CheckPaymentViewModel vendorPaymentViewModel)
        {
            if (ModelState.IsValid)
            {
                var VendorpaymenttObj = _unitOfWork.vendorCheckPaymentRepository.GetSingleOrDefault(a => a.CheckPaymentId == id);
                vendorPaymentViewModel.MasterCompanyId = 1;
                VendorpaymenttObj.IsActive = vendorPaymentViewModel.IsActive;
                VendorpaymenttObj.UpdatedDate = DateTime.Now;
                VendorpaymenttObj.UpdatedBy = vendorPaymentViewModel.UpdatedBy;
                VendorpaymenttObj.CheckPaymentId = vendorPaymentViewModel.CheckPaymentId;
                _unitOfWork.vendorCheckPaymentRepository.Update(VendorpaymenttObj);
                _unitOfWork.SaveChanges();
                return Ok(VendorpaymenttObj);
            }

            return Ok(ModelState);
        }

        [HttpPut("vendorUpdateforActiveforshipping/{id}")]
        public IActionResult vendorsUpdateforActiveforshipping(long id, [FromBody]VendorShippingAdressViewModel vendorShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                var VendorshippingObj = _unitOfWork.VendorShippingAddress.GetSingleOrDefault(a => a.VendorShippingAddressId == id);
                vendorShippingViewModel.MasterCompanyId = 1;
                VendorshippingObj.IsActive = vendorShippingViewModel.IsActive;
                VendorshippingObj.UpdatedDate = DateTime.Now;
                VendorshippingObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;
                VendorshippingObj.VendorShippingAddressId = vendorShippingViewModel.VendorShippingAddressId;
                _unitOfWork.VendorShippingAddress.Update(VendorshippingObj);
                _unitOfWork.SaveChanges();
                return Ok(VendorshippingObj);
            }

            return Ok(ModelState);
        }

        //[HttpPut("vendorUpdateforActiveforshipviaDetails/{id}")]
        //public IActionResult vendorUpdateforActiveforshipviaDetails(long id, [FromBody] VendorShippingViewModel vendorShippingViewModel)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var VendorshippingObj = _unitOfWork.VendorShippingVia.GetSingleOrDefault(a => a.VendorShippingId == id);
        //        vendorShippingViewModel.MasterCompanyId = 1;
        //        VendorshippingObj.IsActive = vendorShippingViewModel.IsActive;
        //        VendorshippingObj.UpdatedDate = DateTime.Now;
        //        VendorshippingObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;
        //        VendorshippingObj.VendorShippingId = vendorShippingViewModel.VendorShippingId;
        //        _unitOfWork.VendorShippingVia.Update(VendorshippingObj);
        //        _unitOfWork.SaveChanges();
        //        return Ok(VendorshippingObj);
        //    }

        //    return Ok(ModelState);
        //}


        [HttpPut("vendorContactPost/{id}")]
        public IActionResult updateContact(long id, [FromBody] ContactViewModel contactViewModel)
        {

            if (ModelState.IsValid)
            {
                if (contactViewModel == null)
                    return BadRequest($"{nameof(contactViewModel)} cannot be null");
                var contactObj = _unitOfWork.ContactRepository.GetSingleOrDefault(c => c.ContactId == id);
                contactViewModel.MasterCompanyId = 1;
                contactObj.ContactId = contactViewModel.ContactId;
                contactObj.ContactTitle = contactViewModel.ContactTitle;
                contactObj.AlternatePhone = contactViewModel.AlternatePhone;
                contactObj.Email = contactViewModel.Email;
                contactObj.Prefix = contactViewModel.Prefix;
                contactObj.Suffix = contactViewModel.Suffix;
                contactObj.Fax = contactViewModel.Fax;
                contactObj.FirstName = contactViewModel.FirstName;
                contactObj.LastName = contactViewModel.LastName;
                contactObj.MiddleName = contactViewModel.MiddleName;
                contactObj.ContactTitle = contactViewModel.ContactTitle;
                contactObj.MobilePhone = contactViewModel.MobilePhone;
                //contactObj.IsDefaultContact = contactViewModel.IsDefaultContact;
                contactObj.Notes = contactViewModel.Notes;
                contactObj.WorkPhone = contactViewModel.WorkPhone;
                contactObj.WebsiteURL = contactViewModel.WebsiteURL;
                contactObj.MasterCompanyId = contactViewModel.MasterCompanyId;
                contactObj.IsActive = contactViewModel.IsActive;
                contactObj.CreatedDate = DateTime.Now;
                contactObj.UpdatedDate = DateTime.Now;
                contactObj.CreatedBy = contactViewModel.CreatedBy;
                contactObj.UpdatedBy = contactViewModel.UpdatedBy;
                _unitOfWork.ContactRepository.Update(contactObj);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }

        [HttpPut("vendorFinancePost/{id}")]
        public IActionResult Updatefinance(long id, [FromBody] VendorViewModel vendorViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorViewModel == null)
                    return BadRequest($"{nameof(vendorViewModel)} cannot be null");
                var vendorObj = _unitOfWork.Vendor.GetSingleOrDefault(c => c.VendorId == id);
                vendorViewModel.MasterCompanyId = 1;
                vendorObj.EDI = vendorViewModel.EDI;
                vendorObj.EDIDescription = vendorViewModel.EDIDescription;
                vendorObj.AeroExchange = vendorViewModel.AeroExchange;
                vendorObj.AeroExchangeDescription = vendorViewModel.AeroExchangeDescription;
                vendorObj.CreditLimit = vendorViewModel.CreditLimit;
                vendorObj.CreditTermsId = vendorViewModel.CreditTermsId;
                vendorObj.CurrencyId = vendorViewModel.CurrencyId;
                vendorObj.Is1099Required = vendorViewModel.Is1099Required;
                vendorObj.v1099Rent = vendorViewModel.v1099Rent;
                vendorObj.v1099RentDefault = vendorViewModel.v1099RentDefault;
                vendorObj.v1099Royalties = vendorViewModel.v1099Royalties;
                vendorObj.v1099RoyaltiesDefault = vendorViewModel.v1099RoyaltiesDefault;
                vendorObj.v1099OtherIncome = vendorViewModel.v1099OtherIncome;
                vendorObj.v1099OtherIncomeDefault = vendorViewModel.v1099OtherIncomeDefault;
                vendorObj.v1099MedicalHealthPayments = vendorViewModel.v1099MedicalHealthPayments;
                vendorObj.v1099MedicalHealthPaymentsDefault = vendorViewModel.v1099MedicalHealthPaymentsDefault;
                vendorObj.v1099NonEmployeeComp = vendorViewModel.v1099NonEmployeeComp;
                vendorObj.v1099NonEmployeeCompDefault = vendorViewModel.v1099NonEmployeeCompDefault;
                vendorObj.v1099GoldenParachute = vendorViewModel.v1099GoldenParachute;
                vendorObj.v1099GoldenParachuteDefault = vendorViewModel.v1099GoldenParachuteDefault;
                vendorObj.v1099GrossProceedsPaidToAttorney = vendorViewModel.v1099GrossProceedsPaidToAttorney;
                vendorObj.v1099GrossProceedsPaidToAttorneyDefault = vendorViewModel.v1099GrossProceedsPaidToAttorneyDefault;
                vendorObj.DiscountLevel = vendorViewModel.DiscountLevel;
                vendorObj.DiscountId = vendorViewModel.DiscountId;
                vendorObj.MasterCompanyId = vendorViewModel.MasterCompanyId;
                vendorObj.IsActive = vendorViewModel.IsActive;
                vendorObj.CreatedDate = DateTime.Now;
                vendorObj.UpdatedDate = DateTime.Now;
                vendorObj.CreatedBy = vendorViewModel.CreatedBy;
                vendorObj.UpdatedBy = vendorViewModel.UpdatedBy;
                _unitOfWork.Vendor.Update(vendorObj);
                _unitOfWork.SaveChanges();
                return Ok(vendorObj);
            }

            return Ok(ModelState);
        }

        [HttpPost("vendorShippingPost")]
        public IActionResult CreateShipping([FromBody] VendorShippingViewModel vendorshipping, Address address, long? vendAddressid, VendorShippingAdressViewModel vendorShippingAdressViewModel)
        {


            if (ModelState.IsValid)
            {
                if (vendorshipping == null)
                    return BadRequest($"{nameof(vendorshipping)} cannot be null");

                vendorshipping.MasterCompanyId = 1;
                vendorshipping.IsActive = true;
                vendorShippingAdressViewModel.IsActive = true;
                vendorshipping.CreatedBy = vendorshipping.CreatedBy;
                vendorshipping.UpdatedBy = vendorshipping.UpdatedBy;
                vendorshipping.CreatedDate = DateTime.Now;
                vendorshipping.UpdatedDate = DateTime.Now;
                address.Line1 = vendorshipping.Address1;
                address.Line2 = vendorshipping.Address2;
                address.Line3 = vendorshipping.Address3;
                address.PostalCode = vendorshipping.PostalCode;
                address.StateOrProvince = vendorshipping.StateOrProvince;
                address.City = vendorshipping.City;
                address.Country = vendorshipping.Country;
                address.MasterCompanyId = 1;
                address.IsActive = true;
                address.RecordCreateDate = DateTime.Now;
                address.CreatedBy = vendorshipping.CreatedBy ?? "Admin"; //Hotfix
                address.UpdatedBy = vendorshipping.UpdatedBy ?? "Admin";//Hotfix
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                _context.Address.Add(address);
                _context.SaveChanges();
                long? id = address.AddressId;
                updateVendorShippingAddress(vendorShippingAdressViewModel, id, vendorshipping, address);
                return Ok(vendorshipping);
            }

            return Ok(ModelState);
        }

        [HttpPost("updateShipping")]
        public IActionResult updateShipping([FromBody] VendorShippingViewModel vendorshipping, Address address, long? vendAddressid, VendorShippingAdressViewModel vendorShippingAdressViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorshipping == null)
                    return BadRequest($"{nameof(vendorshipping)} cannot be null");
                VendorShipping vendorObj = new VendorShipping();
                vendorshipping.MasterCompanyId = 1;
                vendorObj.ShipVia = vendorshipping.ShipVia;
                vendorObj.ShippingURL = vendorshipping.ShippingURL;
                vendorObj.ShippingId = vendorshipping.ShippingId;
                vendorObj.MasterCompanyId = vendorshipping.MasterCompanyId;
                //vendorObj.IsActive = true;
                vendorObj.IsActive = vendorshipping.IsActive;
                vendorObj.CreatedDate = DateTime.Now;
                vendorObj.UpdatedDate = DateTime.Now;
                vendorObj.CreatedBy = vendorshipping.CreatedBy;
                vendorObj.UpdatedBy = vendorshipping.UpdatedBy;
                vendorObj.VendorShippingAddressId = vendorshipping.VendorShippingAddressId;
                vendorObj.VendorId = vendorshipping.VendorId;
                //updateVendorShippingAddress(vendorShippingAdressViewModel, id, vendorshipping, address);
                _unitOfWork.Shipping.Add(vendorObj);
                _unitOfWork.SaveChanges();
                return Ok(vendorObj);
            }

            return Ok(ModelState);
        }

        [HttpPost("vendorShippingAddressDetails")]
        public IActionResult updateVendorShippingAddress([FromBody] VendorShippingAdressViewModel vendorshippingAddressViewModel, long? id, VendorShippingViewModel vendorshipping, Address address)
        {
            if (ModelState.IsValid)
            {
                if (vendorshippingAddressViewModel == null)
                    return BadRequest($"{nameof(vendorshippingAddressViewModel)} cannot be null");
                VendorShippingAddress vendorShippingAddressObj = new VendorShippingAddress();
                vendorShippingAddressObj.IsActive = true;
                vendorShippingAddressObj.VendorId = vendorshipping.VendorId;
                vendorShippingAddressObj.SiteName = vendorshipping.SiteName;
                vendorShippingAddressObj.MasterCompanyId = 1;
                vendorShippingAddressObj.IsActive = vendorshippingAddressViewModel.IsActive;
                vendorShippingAddressObj.AddressId = id;
                vendorShippingAddressObj.CreatedDate = DateTime.Now;
                vendorShippingAddressObj.UpdatedDate = DateTime.Now;
                vendorShippingAddressObj.CreatedBy = vendorshippingAddressViewModel.CreatedBy;
                vendorShippingAddressObj.UpdatedBy = vendorshippingAddressViewModel.UpdatedBy;
                _unitOfWork.VendorShippingAddress.Add(vendorShippingAddressObj);
                _unitOfWork.SaveChanges();
                long? venAddressid = vendorShippingAddressObj.VendorShippingAddressId;
                vendorshipping.VendorShippingAddressId = vendorShippingAddressObj.VendorShippingAddressId;
                //updateShipping(vendorshipping, address, venAddressid, vendorshippingAddressViewModel);
                return Ok(vendorShippingAddressObj);


            }

            return Ok(ModelState);
        }

        [HttpPost("paymentCheckPost")]
        public IActionResult CreatePaymentinfo([FromBody] CheckPaymentViewModel checkPaymentViewModel, Address address)
        {
            if (ModelState.IsValid)
            {
                if (checkPaymentViewModel == null)
                    return BadRequest($"{nameof(checkPaymentViewModel)} cannot be null");
                CheckPayment checkPaymentObj = new CheckPayment();
                checkPaymentObj.IsActive = true;
                checkPaymentObj.SiteName = checkPaymentViewModel.SiteName;
                checkPaymentObj.MasterCompanyId = 1;
                //checkPaymentObj.IsActive = checkPaymentViewModel.IsActive;
                checkPaymentObj.IsPrimayPayment = checkPaymentViewModel.IsPrimayPayment;
                checkPaymentObj.CreatedDate = DateTime.Now;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = checkPaymentViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = checkPaymentViewModel.UpdatedBy;
                address.Line1 = checkPaymentViewModel.Address1;
                address.Line2 = checkPaymentViewModel.Address2;
                address.Line3 = checkPaymentViewModel.Address3;
                address.PostalCode = checkPaymentViewModel.PostalCode;
                address.StateOrProvince = checkPaymentViewModel.StateOrProvince;
                address.City = checkPaymentViewModel.City;
                address.Country = checkPaymentViewModel.Country;
                address.MasterCompanyId = 1;
                address.RecordCreateDate = DateTime.Now;
                address.CreatedBy = checkPaymentViewModel.CreatedBy ?? "Admin"; //HotFix
                address.UpdatedBy = checkPaymentViewModel.UpdatedBy ?? "Admin"; //HotFix
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                address.IsActive = true;
                _unitOfWork.Address.Add(address);
                _unitOfWork.SaveChanges();
                checkPaymentObj.AddressId = address.AddressId.Value;
                _unitOfWork.vendorPaymentRepository.Add(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);
            }

            return Ok(ModelState);
        }

        [HttpPut("checkPaymentUpdate/{id}")]
        public IActionResult updateCheckPaymentInfo(long id, [FromBody] CheckPaymentViewModel checkPaymentViewModel, Address address)
        {
            if (ModelState.IsValid)
            {
                if (checkPaymentViewModel == null)
                    return BadRequest($"{nameof(checkPaymentViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.vendorPaymentRepository.GetSingleOrDefault(c => c.AddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == id);
                checkPaymentObj.IsActive = true;
                checkPaymentObj.SiteName = checkPaymentViewModel.SiteName;
                checkPaymentObj.MasterCompanyId = 1;
                // checkPaymentObj.IsActive = checkPaymentViewModel.IsActive;
                checkPaymentObj.IsPrimayPayment = checkPaymentViewModel.IsPrimayPayment;
                checkPaymentObj.CreatedDate = DateTime.Now;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = checkPaymentViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = checkPaymentViewModel.UpdatedBy;
                addressObj.Line1 = checkPaymentViewModel.Address1;
                addressObj.Line2 = checkPaymentViewModel.Address2;
                addressObj.Line3 = checkPaymentViewModel.Address3;
                addressObj.PostalCode = checkPaymentViewModel.PostalCode;
                addressObj.StateOrProvince = checkPaymentViewModel.StateOrProvince;
                addressObj.City = checkPaymentViewModel.City;
                addressObj.Country = checkPaymentViewModel.Country;
                addressObj.MasterCompanyId = 1;
                addressObj.RecordCreateDate = DateTime.Now;
                addressObj.CreatedBy = checkPaymentViewModel.CreatedBy;
                addressObj.UpdatedBy = checkPaymentViewModel.UpdatedBy;
                addressObj.CreatedDate = DateTime.Now;
                addressObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(address);
                _unitOfWork.vendorPaymentRepository.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);
            }

            return Ok(ModelState);
        }

        [HttpPost("vendorCheckPayment")]
        public IActionResult UpdateCheckpaymentToVendor([FromBody] VendorCheckPaymentViewModel vendorCheckPayment)
        {
            if (ModelState.IsValid)
            {
                if (vendorCheckPayment == null)
                    return BadRequest($"{nameof(vendorCheckPayment)} cannot be null");
                VendorCheckPayment vendorCheckPaymentobj = new VendorCheckPayment();
                vendorCheckPaymentobj.IsActive = true;
                vendorCheckPaymentobj.VendorId = vendorCheckPayment.VendorId;
                vendorCheckPaymentobj.MasterCompanyId = 1;
                // vendorCheckPaymentobj.IsActive = vendorCheckPayment.IsActive;
                vendorCheckPaymentobj.CheckPaymentId = vendorCheckPayment.CheckPaymentId;
                vendorCheckPaymentobj.CreatedDate = DateTime.Now;
                vendorCheckPaymentobj.UpdatedDate = DateTime.Now;
                vendorCheckPaymentobj.CreatedBy = vendorCheckPayment.CreatedBy;
                vendorCheckPaymentobj.UpdatedBy = vendorCheckPayment.UpdatedBy;
                _unitOfWork.vendorCheckPaymentRepository.Add(vendorCheckPaymentobj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPost("paymentDomesticPost")]
        public IActionResult CreateDomesticpaymentinfo([FromBody] DomesticWirePaymentViewModel domesticWirePaymentViewModel, Address address)
        {
            if (ModelState.IsValid)
            {
                if (domesticWirePaymentViewModel == null)
                    return BadRequest($"{nameof(domesticWirePaymentViewModel)} cannot be null");
                DomesticWirePayment domesticWirePaymentObj = new DomesticWirePayment();
                domesticWirePaymentObj.IsActive = true;
                domesticWirePaymentObj.MasterCompanyId = 1;
                domesticWirePaymentObj.IsActive = domesticWirePaymentViewModel.IsActive;
                domesticWirePaymentObj.ABA = domesticWirePaymentViewModel.ABA;
                domesticWirePaymentObj.AccountNumber = domesticWirePaymentViewModel.AccountNumber;
                domesticWirePaymentObj.BankName = domesticWirePaymentViewModel.BankName;
                domesticWirePaymentObj.CreatedDate = DateTime.Now;
                domesticWirePaymentObj.UpdatedDate = DateTime.Now;
                domesticWirePaymentObj.CreatedBy = domesticWirePaymentViewModel.CreatedBy;
                domesticWirePaymentObj.UpdatedBy = domesticWirePaymentViewModel.UpdatedBy;
                address.Line1 = domesticWirePaymentViewModel.Address1;
                address.Line2 = domesticWirePaymentViewModel.Address2;
                address.Line3 = domesticWirePaymentViewModel.Address3;
                address.PostalCode = domesticWirePaymentViewModel.PostalCode;
                address.StateOrProvince = domesticWirePaymentViewModel.StateOrProvince;
                address.City = domesticWirePaymentViewModel.City;
                address.Country = domesticWirePaymentViewModel.Country;
                address.MasterCompanyId = 1;
                address.RecordCreateDate = DateTime.Now;
                address.CreatedBy = domesticWirePaymentViewModel.CreatedBy ?? "Admin";//Hotfix
                address.UpdatedBy = domesticWirePaymentViewModel.UpdatedBy ?? "Admin";//Hotfix
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                address.IsActive = domesticWirePaymentObj.IsActive ?? true;
                _unitOfWork.Address.Add(address);
                _unitOfWork.SaveChanges();
                domesticWirePaymentObj.BankAddressId = address.AddressId.Value;
                _unitOfWork.vendorDomesticPaymentRepository.Add(domesticWirePaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(domesticWirePaymentObj);
            }

            return Ok(ModelState);
        }

        [HttpPut("domesticPaymentUpdate/{id}")]
        public IActionResult updateDomesticDetails(long id, [FromBody] DomesticWirePaymentViewModel domesticWirePaymentViewModel)
        {
            if (ModelState.IsValid)
            {
                if (domesticWirePaymentViewModel == null)
                    return BadRequest($"{nameof(domesticWirePaymentViewModel)} cannot be null");
                var domesticWirePaymentObj = _unitOfWork.vendorDomesticPaymentRepository.GetSingleOrDefault(c => c.DomesticWirePaymentId == id);
                var address = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == domesticWirePaymentObj.BankAddressId);
                domesticWirePaymentObj.IsActive = true;

                // domesticWirePaymentObj.IsActive = true;
                domesticWirePaymentObj.MasterCompanyId = 1;
                domesticWirePaymentObj.IsActive = domesticWirePaymentViewModel.IsActive;
                domesticWirePaymentObj.ABA = domesticWirePaymentViewModel.ABA;
                domesticWirePaymentObj.AccountNumber = domesticWirePaymentViewModel.AccountNumber;
                domesticWirePaymentObj.BankName = domesticWirePaymentViewModel.BankName;
                domesticWirePaymentObj.CreatedDate = DateTime.Now;
                domesticWirePaymentObj.UpdatedDate = DateTime.Now;
                domesticWirePaymentObj.CreatedBy = domesticWirePaymentViewModel.CreatedBy;
                domesticWirePaymentObj.UpdatedBy = domesticWirePaymentViewModel.UpdatedBy;
                address.Line1 = domesticWirePaymentViewModel.Address1;
                address.Line2 = domesticWirePaymentViewModel.Address2;
                address.Line3 = domesticWirePaymentViewModel.Address3;
                address.PostalCode = domesticWirePaymentViewModel.PostalCode;
                address.StateOrProvince = domesticWirePaymentViewModel.StateOrProvince;
                address.City = domesticWirePaymentViewModel.City;
                address.Country = domesticWirePaymentViewModel.Country;
                address.MasterCompanyId = 1;
                address.RecordCreateDate = DateTime.Now;
                address.CreatedBy = domesticWirePaymentViewModel.CreatedBy ?? "Admin";//Hotfix
                address.UpdatedBy = domesticWirePaymentViewModel.UpdatedBy ?? "Admin";//Hotfix
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(address);
                _unitOfWork.vendorDomesticPaymentRepository.Update(domesticWirePaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(domesticWirePaymentObj);


            }

            return Ok(ModelState);
        }

        [HttpPut("InternationalUpdate/{id}")]
        public IActionResult updateInternationalDetails(long id, [FromBody] InternationalWirePaymentViewModel internationalWirePaymentmodel)
        {
            if (ModelState.IsValid)
            {
                if (internationalWirePaymentmodel == null)
                    return BadRequest($"{nameof(internationalWirePaymentmodel)} cannot be null");
                var internationalWirePaymentObj = _unitOfWork.vendorInternationalPaymentRepository.GetSingleOrDefault(c => c.InternationalWirePaymentId == id);
                var address = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == internationalWirePaymentObj.BankAddressId);
                internationalWirePaymentObj.IsActive = true;
                internationalWirePaymentObj.MasterCompanyId = 1;
                internationalWirePaymentObj.IsActive = internationalWirePaymentmodel.IsActive;
                internationalWirePaymentObj.SwiftCode = internationalWirePaymentmodel.SwiftCode;
                internationalWirePaymentObj.BeneficiaryBankAccount = internationalWirePaymentmodel.BeneficiaryBankAccount;
                internationalWirePaymentObj.BeneficiaryBank = internationalWirePaymentmodel.BeneficiaryBank;
                internationalWirePaymentObj.BeneficiaryCustomer = internationalWirePaymentmodel.BeneficiaryCustomer;
                internationalWirePaymentObj.CreatedDate = DateTime.Now;
                internationalWirePaymentObj.UpdatedDate = DateTime.Now;
                internationalWirePaymentObj.CreatedBy = internationalWirePaymentmodel.CreatedBy;
                internationalWirePaymentObj.UpdatedBy = internationalWirePaymentmodel.UpdatedBy;
                address.Line1 = internationalWirePaymentmodel.Address1;
                address.Line2 = internationalWirePaymentmodel.Address2;
                address.Line3 = internationalWirePaymentmodel.Address3;
                address.PostalCode = internationalWirePaymentmodel.Postalcode;
                address.StateOrProvince = internationalWirePaymentmodel.StateorProvice;
                address.City = internationalWirePaymentmodel.City;
                address.Country = internationalWirePaymentmodel.Country;
                address.MasterCompanyId = 1;
                address.RecordCreateDate = DateTime.Now;
                address.CreatedBy = internationalWirePaymentmodel.CreatedBy ?? "Admin"; //Hotfix
                address.UpdatedBy = internationalWirePaymentmodel.UpdatedBy ?? "Admin"; //Hotfix
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(address);
                _unitOfWork.vendorInternationalPaymentRepository.Update(internationalWirePaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(internationalWirePaymentmodel);


            }

            return Ok(ModelState);
        }

        [HttpPost("vendorDomesticPayment")]
        public IActionResult UpdateDomesticpaymentToVendor([FromBody] VendorDomesticWirePaymentViewModel vendorDomesticWirePaymentViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorDomesticWirePaymentViewModel == null)
                    return BadRequest($"{nameof(vendorDomesticWirePaymentViewModel)} cannot be null");
                VendorDomesticWirePayment vendorCheckPaymentobj = new VendorDomesticWirePayment();
                vendorCheckPaymentobj.IsActive = true;
                vendorCheckPaymentobj.VendorId = vendorDomesticWirePaymentViewModel.VendorId;
                vendorCheckPaymentobj.MasterCompanyId = 1;
                vendorCheckPaymentobj.IsActive = vendorDomesticWirePaymentViewModel.IsActive;
                vendorCheckPaymentobj.DomesticWirePaymentId = vendorDomesticWirePaymentViewModel.DomesticWirePaymentId;
                vendorCheckPaymentobj.CreatedDate = DateTime.Now;
                vendorCheckPaymentobj.UpdatedDate = DateTime.Now;
                vendorCheckPaymentobj.CreatedBy = vendorDomesticWirePaymentViewModel.CreatedBy;
                vendorCheckPaymentobj.UpdatedBy = vendorDomesticWirePaymentViewModel.UpdatedBy;
                _unitOfWork.vendordomesticWirePaymentRepository.Add(vendorCheckPaymentobj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPost("paymentInternationalPost")]
        public IActionResult CreateInternationalpaymentinfo([FromBody] InternationalWirePaymentViewModel internationalWirePaymentViewModel, Address address)
        {
            if (ModelState.IsValid)
            {
                if (internationalWirePaymentViewModel == null)
                    return BadRequest($"{nameof(internationalWirePaymentViewModel)} cannot be null");
                InternationalwirePayment internationalWirePaymentObj = new InternationalwirePayment();
                internationalWirePaymentObj.IsActive = true;
                internationalWirePaymentObj.MasterCompanyId = 1;
                internationalWirePaymentObj.IsActive = internationalWirePaymentViewModel.IsActive;
                internationalWirePaymentObj.SwiftCode = internationalWirePaymentViewModel.SwiftCode;
                internationalWirePaymentObj.BeneficiaryBankAccount = internationalWirePaymentViewModel.BeneficiaryBankAccount;
                internationalWirePaymentObj.BeneficiaryBank = internationalWirePaymentViewModel.BeneficiaryBank;
                internationalWirePaymentObj.BeneficiaryCustomer = internationalWirePaymentViewModel.BeneficiaryCustomer;
                internationalWirePaymentObj.CreatedDate = DateTime.Now;
                internationalWirePaymentObj.UpdatedDate = DateTime.Now;
                internationalWirePaymentObj.CreatedBy = internationalWirePaymentViewModel.CreatedBy;
                internationalWirePaymentObj.UpdatedBy = internationalWirePaymentViewModel.UpdatedBy;
                address.Line1 = internationalWirePaymentViewModel.Address1;
                address.Line2 = internationalWirePaymentViewModel.Address2;
                address.Line3 = internationalWirePaymentViewModel.Address3;
                address.PostalCode = internationalWirePaymentViewModel.Postalcode;
                address.StateOrProvince = internationalWirePaymentViewModel.StateorProvice;
                address.City = internationalWirePaymentViewModel.City;
                address.Country = internationalWirePaymentViewModel.Country;
                address.MasterCompanyId = 1;
                address.RecordCreateDate = DateTime.Now;
                address.CreatedBy = internationalWirePaymentViewModel.CreatedBy ?? "Admin";
                address.UpdatedBy = internationalWirePaymentViewModel.UpdatedBy ?? "Admin";//Hotfix
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                address.IsActive = internationalWirePaymentViewModel.IsActive ?? true;//Hotfix
                _unitOfWork.Address.Add(address);
                _unitOfWork.SaveChanges();
                internationalWirePaymentObj.BankAddressId = address.AddressId.Value;
                _unitOfWork.vendorInternationalPaymentRepository.Add(internationalWirePaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(internationalWirePaymentObj);
            }

            return Ok(ModelState);
        }

        [HttpPost("paymentDefaultPost")]
        public IActionResult CreateDefaultmethod([FromBody] VendorPaymentViewModel vendorPaymentViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorPaymentViewModel == null)
                    return BadRequest($"{nameof(vendorPaymentViewModel)} cannot be null");
                VendorPayment defaultPaymentObj = new VendorPayment();
                defaultPaymentObj.IsActive = true;
                defaultPaymentObj.MasterCompanyId = 1;
                defaultPaymentObj.IsActive = vendorPaymentViewModel.IsActive;
                defaultPaymentObj.DefaultPaymentMethod = vendorPaymentViewModel.DefaultPaymentMethod;
                defaultPaymentObj.VendorId = vendorPaymentViewModel.VendorId;
                defaultPaymentObj.CreatedDate = DateTime.Now;
                defaultPaymentObj.UpdatedDate = DateTime.Now;
                defaultPaymentObj.CreatedBy = vendorPaymentViewModel.CreatedBy;
                //_unitOfWork.SaveChanges();
                _context.VendorPayment.Add(defaultPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(defaultPaymentObj);
            }

            return Ok(ModelState);
        }

        [HttpPut("defaultUpdate/{id}")]
        public IActionResult updatedefault(long id, [FromBody] VendorPaymentViewModel vendorPaymentViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorPaymentViewModel == null)
                    return BadRequest($"{nameof(vendorPaymentViewModel)} cannot be null");
                var defaultObj = _context.VendorPayment.Where(a => a.VendorPaymentId == id).SingleOrDefault();
                //_unitOfWork.vendorPaymentRepository.GetSingleOrDefault(c => c.VendorPaymentId == id);
                //defaultObj.IsActive = true;
                defaultObj.MasterCompanyId = 1;
                defaultObj.IsActive = vendorPaymentViewModel.IsActive;
                defaultObj.DefaultPaymentMethod = vendorPaymentViewModel.DefaultPaymentMethod;
                defaultObj.VendorId = vendorPaymentViewModel.VendorId;
                defaultObj.CreatedDate = DateTime.Now;
                defaultObj.UpdatedDate = DateTime.Now;
                defaultObj.CreatedBy = vendorPaymentViewModel.CreatedBy;
                defaultObj.UpdatedBy = vendorPaymentViewModel.UpdatedBy;
                _context.VendorPayment.Update(defaultObj);
                _unitOfWork.SaveChanges();
                return Ok(vendorPaymentViewModel);


            }

            return Ok(ModelState);
        }

        [HttpPost("vendorInternationalPayment")]
        public IActionResult UpdateInternationalpaymentToVendor([FromBody] VendorInternationlWirePaymentViewModel vendorInternationlWirePaymentViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorInternationlWirePaymentViewModel == null)
                    return BadRequest($"{nameof(vendorInternationlWirePaymentViewModel)} cannot be null");
                VendorInternationlWirePayment vendorInternationalPaymentobj = new VendorInternationlWirePayment();
                vendorInternationalPaymentobj.IsActive = true;
                vendorInternationalPaymentobj.VendorId = vendorInternationlWirePaymentViewModel.VendorId;
                vendorInternationalPaymentobj.MasterCompanyId = 1;
                vendorInternationalPaymentobj.IsActive = vendorInternationlWirePaymentViewModel.IsActive;
                vendorInternationalPaymentobj.InternationalWirePaymentId = vendorInternationlWirePaymentViewModel.InternationalWirePaymentId;
                //vendorInternationalPaymentobj.VendorInternationalWirePaymentId = vendorInternationlWirePaymentViewModel.VendorInternationalWirePaymentId;
                vendorInternationalPaymentobj.CreatedDate = DateTime.Now;
                vendorInternationalPaymentobj.UpdatedDate = DateTime.Now;
                vendorInternationalPaymentobj.CreatedBy = vendorInternationlWirePaymentViewModel.CreatedBy;
                vendorInternationalPaymentobj.UpdatedBy = vendorInternationlWirePaymentViewModel.UpdatedBy;

                _unitOfWork.vendorInternationalWirePaymentRepository.Add(vendorInternationalPaymentobj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }


        [HttpDelete("vendorContact/{id}")]
        [Produces(typeof(VendorContactViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.ContactRepository.GetSingleOrDefault(c => c.ContactId == id);
            var existingResultofVendorContact = _unitOfWork.vendorContactRepository.GetSingleOrDefault(c => c.ContactId == id);
            _unitOfWork.vendorContactRepository.Remove(existingResultofVendorContact);
            _unitOfWork.SaveChanges();
            _unitOfWork.ContactRepository.Remove(existingResult);
            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpDelete("deleteCheckPayment/{id}")]
        [Produces(typeof(CheckPaymentViewModel))]
        public IActionResult DeleteCheckPayment(long id)
        {
            var existingResult = _unitOfWork.vendorPaymentRepository.GetSingleOrDefault(c => c.CheckPaymentId == id);
            var existingResultofVendorContact = _unitOfWork.vendorCheckPaymentRepository.GetSingleOrDefault(c => c.CheckPaymentId == id);
            _unitOfWork.vendorCheckPaymentRepository.Remove(existingResultofVendorContact);
            _unitOfWork.SaveChanges();
            _unitOfWork.vendorPaymentRepository.Remove(existingResult);
            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpPut("updateShipAddress/{id}")]
        public IActionResult saveShipDetails(long id, [FromBody] VendorShippingAdressViewModel vendorShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorShippingViewModel == null)
                    return BadRequest($"{nameof(vendorShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.VendorShippingAddress.GetSingleOrDefault(c => c.VendorShippingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == vendorShippingViewModel.AddressId);
                checkPaymentObj.IsActive = true;

                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.IsActive = vendorShippingViewModel.IsActive;
                checkPaymentObj.SiteName = vendorShippingViewModel.SiteName;
                checkPaymentObj.CreatedDate = DateTime.Now;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = vendorShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;
                checkPaymentObj.MasterCompanyId = vendorShippingViewModel.MasterCompanyId;
                addressObj.Line1 = vendorShippingViewModel.Address1;
                addressObj.Line2 = vendorShippingViewModel.Address2;
                addressObj.Line3 = vendorShippingViewModel.Address3;
                addressObj.PostalCode = vendorShippingViewModel.PostalCode;
                addressObj.StateOrProvince = vendorShippingViewModel.stateOrProvince;
                addressObj.City = vendorShippingViewModel.City;
                addressObj.Country = vendorShippingViewModel.Country;
                addressObj.MasterCompanyId = 1;
                // addressObj.RecordCreateDate = DateTime.Now;
                addressObj.CreatedBy = vendorShippingViewModel.CreatedBy;
                addressObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;
                //addressObj.CreatedDate = DateTime.Now;
                addressObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.VendorShippingAddress.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);


            }

            return Ok(ModelState);
        }


        [HttpPut("updatevendorShipAddress/{id}")]
        public IActionResult savevendorShipDetails(long id, [FromBody] VendorShippingAdressViewModel vendorShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorShippingViewModel == null)
                    return BadRequest($"{nameof(vendorShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.VendorShippingAddress.GetSingleOrDefault(c => c.VendorShippingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == vendorShippingViewModel.AddressId);
                checkPaymentObj.IsActive = true;

                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.IsActive = vendorShippingViewModel.IsActive;
                checkPaymentObj.SiteName = vendorShippingViewModel.SiteName;
                checkPaymentObj.CreatedDate = DateTime.Now;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = vendorShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;
                //checkPaymentObj.MasterCompanyId = vendorShippingViewModel.MasterCompanyId;
                checkPaymentObj.VendorShippingAddressId = vendorShippingViewModel.VendorShippingAddressId;
                addressObj.Line1 = vendorShippingViewModel.Address1;
                addressObj.Line2 = vendorShippingViewModel.Address2;
                addressObj.Line3 = vendorShippingViewModel.Address3;
                addressObj.PostalCode = vendorShippingViewModel.PostalCode;
                addressObj.StateOrProvince = vendorShippingViewModel.stateOrProvince;
                addressObj.City = vendorShippingViewModel.City;
                addressObj.Country = vendorShippingViewModel.Country;
                addressObj.MasterCompanyId = 1;
                // addressObj.RecordCreateDate = DateTime.Now;
                addressObj.CreatedBy = vendorShippingViewModel.CreatedBy;
                addressObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;
                //addressObj.CreatedDate = DateTime.Now;
                addressObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.VendorShippingAddress.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);


            }

            return Ok(ModelState);
        }
        [HttpPost("addShipViaDetails")]
        public IActionResult CreateShipViaDetails([FromBody]  VendorShippingViewModel vendorShippingDetailsViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorShippingDetailsViewModel == null)
                    return BadRequest($"{nameof(vendorShippingDetailsViewModel)} cannot be null");
                VendorShipping actionobject = new VendorShipping();

                vendorShippingDetailsViewModel.MasterCompanyId = 1;
                actionobject.VendorId = vendorShippingDetailsViewModel.VendorId;
                actionobject.VendorShippingAddressId = vendorShippingDetailsViewModel.VendorShippingAddressId;
                actionobject.ShipVia = vendorShippingDetailsViewModel.ShipVia;
                actionobject.ShippingAccountinfo = vendorShippingDetailsViewModel.ShippingAccountinfo;
                actionobject.ShippingId = vendorShippingDetailsViewModel.ShippingId;
                actionobject.ShippingURL = vendorShippingDetailsViewModel.ShippingURL;
                actionobject.MasterCompanyId = vendorShippingDetailsViewModel.MasterCompanyId;
                //actionobject.IsActive = true;
                actionobject.IsActive = vendorShippingDetailsViewModel.IsActive;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = vendorShippingDetailsViewModel.CreatedBy;
                actionobject.UpdatedBy = vendorShippingDetailsViewModel.UpdatedBy;
                _unitOfWork.Shipping.Add(actionobject);
                _unitOfWork.SaveChanges();
                return Ok(actionobject);
            }
            return Ok(ModelState);
        }

        [HttpPut("updateShipViaDetails/{id}")]
        public IActionResult updateShipviaAddress(long id, [FromBody] VendorShippingViewModel vendorShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorShippingViewModel == null)
                    return BadRequest($"{nameof(vendorShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.Shipping.GetSingleOrDefault(c => c.VendorShippingId == id);

                checkPaymentObj.IsActive = true;
                checkPaymentObj.IsActive = vendorShippingViewModel.IsActive;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.ShipVia = vendorShippingViewModel.ShipVia;
                checkPaymentObj.ShippingAccountinfo = vendorShippingViewModel.ShippingAccountinfo;
                checkPaymentObj.ShippingId = vendorShippingViewModel.ShippingId;
                checkPaymentObj.ShippingURL = vendorShippingViewModel.ShippingURL;
                checkPaymentObj.Memo = vendorShippingViewModel.Memo;
                checkPaymentObj.CreatedDate = DateTime.Now;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = vendorShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;

                _unitOfWork.Shipping.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);


            }

            return Ok(ModelState);
        }

        [HttpPut("updateStatusVenShippingAddress/{id}")]
        public IActionResult updateStatusVenShippingAddress(long id, [FromBody] VendorShippingAdressViewModel vendorShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorShippingViewModel == null)
                    return BadRequest($"{nameof(vendorShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.VendorShippingAddress.GetSingleOrDefault(c => c.VendorShippingAddressId == id);
                var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == checkPaymentObj.AddressId);
                addressObj.IsActive = vendorShippingViewModel.AddressStatus;
                checkPaymentObj.IsActive = vendorShippingViewModel.IsActive;
                checkPaymentObj.IsDelete = true;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = vendorShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;

                addressObj.UpdatedDate = DateTime.Now;
                addressObj.CreatedBy = vendorShippingViewModel.CreatedBy;
                addressObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;
                _unitOfWork.Address.Update(addressObj);
                _unitOfWork.VendorShippingAddress.Update(checkPaymentObj);

                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);
            }

            return Ok(ModelState);
        }

        [HttpPut("updateStatusVendorShipping/{id}")]
        public IActionResult updateStatusVendorShipping(long id, [FromBody] VendorShippingViewModel vendorShippingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorShippingViewModel == null)
                    return BadRequest($"{nameof(vendorShippingViewModel)} cannot be null");
                var checkPaymentObj = _unitOfWork.Shipping.GetSingleOrDefault(c => c.VendorShippingId == id);

                //checkPaymentObj.IsActive = vendorShippingViewModel.IsActive;
                checkPaymentObj.IsActive = true;
                checkPaymentObj.MasterCompanyId = 1;
                checkPaymentObj.UpdatedDate = DateTime.Now;
                checkPaymentObj.CreatedBy = vendorShippingViewModel.CreatedBy;
                checkPaymentObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;
                _unitOfWork.Shipping.Update(checkPaymentObj);

                _unitOfWork.SaveChanges();
                return Ok(checkPaymentObj);


            }

            return Ok(ModelState);
        }

        [HttpGet("getContactHistroty/{id}", Name = "GetContactHistoryById")]
        [Produces(typeof(List<AuditHistory>))]

        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Contact", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }
        [HttpGet("getVendorHistory/{id}", Name = "getVendorHistory")]
        [Produces(typeof(List<AuditHistory>))]

        public IActionResult getVendorHistory(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Vendor", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }
        [HttpGet("getCheckPayHist/{id}", Name = "getCheckPayHist")]
        [Produces(typeof(List<AuditHistory>))]

        public IActionResult getCheckPayHist(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("CheckPayment", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }
        [HttpGet("getcheckHistory/{id}", Name = "getcheckHistory")]
        [Produces(typeof(List<AuditHistory>))]

        public IActionResult getcheckHistory(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("CheckPayment", id); //.GetAllCustomersData();
            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }
        [HttpGet("getshipaddresshistory/{id}", Name = "getshipaddresshistory")]
        [Produces(typeof(List<AuditHistory>))]

        public IActionResult getshipaddresshistory(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("VendorShippingAddress", id); //.GetAllCustomersData();
            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpGet("getShipViaHistory/{id}", Name = "GetShipViaHistory")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetShipviaHistory(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Vendorshipping", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("saveVendorWarnings")]
        public IActionResult SaveVendorWarnings([FromBody]  VendorWarningViewModel vendorWarningViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorWarningViewModel == null)
                    return BadRequest($"{nameof(vendorWarningViewModel)} cannot be null");
                VendorWarnings vendorObject = new VendorWarnings();

                vendorWarningViewModel.MasterCompanyId = 1;
                vendorObject.VendorId = vendorWarningViewModel.VendorId;
                vendorObject.Allow = vendorWarningViewModel.Allow;
                vendorObject.SourceModule = vendorWarningViewModel.SourceModule;
                vendorObject.Restrict = vendorWarningViewModel.Restrict;
                vendorObject.Warning = vendorWarningViewModel.Warning;
                vendorObject.WarningMessage = vendorWarningViewModel.WarningMessage;
                vendorObject.RestrictMessage = vendorWarningViewModel.RestrictMessage;
                vendorObject.MasterCompanyId = vendorWarningViewModel.MasterCompanyId;
                vendorObject.IsAllow = vendorWarningViewModel.IsAllow;
                vendorObject.IsRestrict = vendorWarningViewModel.IsRestrict;
                vendorObject.IsWarning = vendorWarningViewModel.IsWarning;
                vendorObject.IsActive = vendorWarningViewModel.IsActive;
                vendorObject.CreatedDate = DateTime.Now;
                vendorObject.UpdatedDate = DateTime.Now;
                vendorObject.CreatedBy = vendorWarningViewModel.CreatedBy;
                vendorObject.UpdatedBy = vendorWarningViewModel.UpdatedBy;
                _unitOfWork.VendorWarning.Add(vendorObject);
                _unitOfWork.SaveChanges();
                return Ok(vendorObject);
            }

            return Ok(ModelState);
        }

        [HttpPut("saveVendorWarnings/{id}")]
        public IActionResult SaveVendorWarningswithid(long id, [FromBody]  VendorWarningViewModel vendorWarningViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorWarningViewModel == null)
                    return BadRequest($"{nameof(vendorWarningViewModel)} cannot be null");
                var vendorObject = _unitOfWork.VendorWarning.GetSingleOrDefault(c => c.VendorWarningId == id);

                vendorWarningViewModel.MasterCompanyId = 1;
                vendorObject.VendorId = vendorWarningViewModel.VendorId;
                vendorObject.Allow = vendorWarningViewModel.Allow;
                vendorObject.SourceModule = vendorWarningViewModel.SourceModule;
                vendorObject.Restrict = vendorWarningViewModel.Restrict;
                vendorObject.Warning = vendorWarningViewModel.Warning;
                vendorObject.WarningMessage = vendorWarningViewModel.WarningMessage;
                vendorObject.RestrictMessage = vendorWarningViewModel.RestrictMessage;
                vendorObject.MasterCompanyId = vendorWarningViewModel.MasterCompanyId;
                vendorObject.IsActive = vendorWarningViewModel.IsActive;
                vendorObject.CreatedDate = DateTime.Now;
                vendorObject.UpdatedDate = DateTime.Now;
                vendorObject.CreatedBy = vendorWarningViewModel.CreatedBy;
                vendorObject.UpdatedBy = vendorWarningViewModel.UpdatedBy;
                vendorObject.IsAllow = vendorWarningViewModel.IsAllow;
                vendorObject.IsRestrict = vendorWarningViewModel.IsRestrict;
                vendorObject.IsWarning = vendorWarningViewModel.IsWarning;
                _unitOfWork.VendorWarning.Update(vendorObject);
                _unitOfWork.SaveChanges();
                return Ok(vendorObject);
            }

            return Ok(ModelState);
        }

        [HttpPut("updateVendorIsactive/{id}")]
        public IActionResult updateVendorIsatctive(long id, [FromBody]  VendorViewModel vendor)
        {
            if (ModelState.IsValid)
            {
                if (vendor == null)
                    return BadRequest($"{nameof(vendor)} cannot be null");
                var vendorObject = _unitOfWork.Vendor.GetSingleOrDefault(c => c.VendorId == id);
                vendor.MasterCompanyId = 1;
                vendorObject.VendorId = vendor.VendorId;
                vendorObject.IsDelete = vendor.IsDelete;
                //vendorObject.IsActive = vendor.IsActive;
                vendorObject.UpdatedDate = DateTime.Now;
                vendorObject.UpdatedBy = vendor.UpdatedBy;
                _unitOfWork.Vendor.Update(vendorObject);
                _unitOfWork.SaveChanges();
                return Ok(vendorObject);
            }

            return Ok(ModelState);
        }

        [HttpGet("GetATASubchapter/{id}")]
        [Produces(typeof(List<ATASubChapter>))]
        public IActionResult GetAtaSubchapterById(long id)
        {
            try
            {
                var aircraft = _unitOfWork.Vendor.getVendorCapabilityData(id); //.GetAllCustomersData();
                return Ok(aircraft);

                // var result = _unitOfWork.ATASubChapter.GetSingleOrDefault(c => c.ATAChapterId == id);

                //  return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpPost("vendorCapabilityPost")]
        public IActionResult addCharges([FromBody] VendorCapabiliy vendorCapability) //it is for Model we will pass
        {
            if (vendorCapability != null)
            {
                // caps.WorkflowChargesListId = 0;
                vendorCapability.MasterCompanyId = 1;
                vendorCapability.IsActive = true;
                vendorCapability.CreatedDate = DateTime.Now;

                _unitOfWork.Repository<VendorCapabiliy>().Add(vendorCapability);
                updateRanking(Convert.ToInt32(vendorCapability.VendorRanking));
                _unitOfWork.SaveChanges();
                //_context.VendorCapabiliy.Add(caps);

                //_context.SaveChanges();
            }
            return Ok(vendorCapability);
        }

        [HttpPost("vendorCapabilityTypePost")]
        public IActionResult addCharges([FromBody] VendorCapabilityType vendorcaptype) //it is for Model we will pass
        {
            if (vendorcaptype != null)
            {
                // caps.WorkflowChargesListId = 0;

                vendorcaptype.MasterCompanyId = 1;
                vendorcaptype.CreatedDate = DateTime.Now;

                _context.vendorCapabilityType.Add(vendorcaptype);
                _context.SaveChanges();
            }
            return Ok(vendorcaptype);
        }

        [HttpPost("vendorCapabilityAircraftTypePost")]
        public IActionResult addCharges([FromBody] VendorCapabilityAircraftType caps) //it is for Model we will pass
        {
            if (caps != null)
            {
                // caps.WorkflowChargesListId = 0;
                caps.MasterCompanyId = 1;
                caps.CreatedDate = DateTime.Now;
                _context.vendorCapabilityAircraftType.Add(caps);
                _context.SaveChanges();
            }
            return Ok(caps);
        }

        [HttpPost("vendorCapabilityAircraftModelPost")]
        public IActionResult addCharges([FromBody] VendorCapabiltiyAircraftModel caps) //it is for Model we will pass
        {
            if (caps != null)
            {
                // caps.WorkflowChargesListId = 0;
                caps.MasterCompanyId = 1;
                caps.CreatedDate = DateTime.Now;
                _context.vendorCapabiltiyAircraftModel.Add(caps);
                _context.SaveChanges();
            }
            return Ok(caps);
        }

        [HttpGet("vendorCapabilityTypeGet/{id}")]
        [Produces(typeof(List<VendorCapabilityType>))]
        public IActionResult vendorCapabilityTypeGet(int id)
        {
            var aircraft = _unitOfWork.Vendor.vendorCapabilityTypeGet(id); //.GetAllCustomersData();
            return Ok(aircraft);
        }

        [HttpGet("vendorAddressGet/{id}")]
        [Produces(typeof(List<VendorShippingAddress>))]
        public IActionResult vendorAddressGet(long id, VendorShippingAddress vendorBillingAddress)
        {
            var allVendShipdetails = _unitOfWork.VendorShippingAddress.GetAllShippingAddressDetails(id); //.GetAllCustomersData();
            return Ok(allVendShipdetails);

        }

        [HttpGet("vendorAircraftManufacturerGet/{id}")]
        [Produces(typeof(List<VendorCapabilityAircraftType>))]
        public IActionResult vendorAircraftManufacturerGet(int id)
        {
            var aircraft = _unitOfWork.Vendor.vendorAircraftManufacturerGet(id); //.GetAllCustomersData();
            return Ok(aircraft);

        }

        [HttpGet("vendorAircraftManufacturerModelGet/{id}")]
        [Produces(typeof(List<VendorCapabiltiyAircraftModel>))]
        public IActionResult vendorAircraftManufacturerModelGet(int id)
        {
            var aircraft = _unitOfWork.Vendor.vendorAircraftManufacturerModelGet(id); //.GetAllCustomersData();
            return Ok(aircraft);

        }


        [HttpPut("vendorCapabilityUpdate/{id}")]
        public IActionResult UpdateVendorCapability(long id, [FromBody] VendorCapabiliy vendorCapability)
        {
            var disc = _unitOfWork.VendorCapabilities.GetSingleOrDefault(a => a.VendorCapabilityId == id);
            //var disc1 = _unitOfWork.VendorCapabilities.GetSingleOrDefault(a => a.VendorCapabilityId == id);

            if (Convert.ToInt32(disc.VendorRanking) != Convert.ToInt32(vendorCapability.VendorRanking))
            {
                updateRanking(Convert.ToInt32(disc.VendorRanking));
            }
            //disk.State = EntityState.Detached;
            //var disc = _context.VendorCapabiliy.First(a => a.VendorCapabilityId == id);
            disc.VendorId = vendorCapability.VendorId;
            disc.capabilityDescription = vendorCapability.capabilityDescription;
            disc.VendorRanking = vendorCapability.VendorRanking;
            disc.PMA_DER = vendorCapability.PMA_DER;
            disc.ItemMasterId = vendorCapability.ItemMasterId;
            disc.TAT = vendorCapability.TAT;
            disc.Cost = vendorCapability.Cost;
            disc.AlternatePartId = vendorCapability.AlternatePartId;
            disc.ATAChapterId = vendorCapability.ATAChapterId;
            disc.ATASubchapterId = vendorCapability.ATASubchapterId;
            disc.Memo = vendorCapability.Memo;
            disc.IsActive = vendorCapability.IsActive;

            _unitOfWork.Repository<VendorCapabiliy>().Update(disc);


            //
            _unitOfWork.SaveChanges();
            //_context.VendorCapabiliy.Update(disc);
            //_context.SaveChanges();
            return Ok(vendorCapability);
        }

        [HttpDelete("deleteVendorCapabilityType/{capabilityid}")]
        [Produces(typeof(List<VendorCapabilityTypeViewModel>))]
        public IActionResult deleteVendorCapabilityType(long capabilityid)
        {
            var deleterecord = _context.vendorCapabilityType.Where(a => a.VendorCapabilityId == capabilityid).ToList();

            for (var i = 0; i < deleterecord.Count; i++)
            {
                _context.Remove(deleterecord[i]);
                _context.SaveChanges();

                // _unitOfWork.vend.Remove(deleterecord[i]);
                //_unitOfWork.SaveChanges();
            }
            // _context.Remove(deleterecord);
            // _context.SaveChanges();
            return Ok(capabilityid);

        }

        [HttpDelete("deleteVendorCapabilityAircraftManafacturer/{capabilityid}")]
        [Produces(typeof(List<VendorCapabilityAircraftTypeViewModel>))]
        public IActionResult deleteVendorCapabilityAircraftManafacturer(long capabilityid)
        {
            var deleterecord = _context.vendorCapabilityAircraftType.Where(a => a.VendorCapabilityId == capabilityid).ToList();

            for (var i = 0; i < deleterecord.Count; i++)
            {
                _context.Remove(deleterecord[i]);
                _context.SaveChanges();
            }
            //   _context.Remove(deleterecord);
            //  _context.SaveChanges();
            return Ok(deleterecord);

        }

        [HttpDelete("deleteVendorCapabilityAircraftModel/{capabilityid}")]
        [Produces(typeof(List<VendorCapabiltiyAircraftModelViewModel>))]
        public IActionResult deleteVendorCapabilityAircraftModel(long capabilityid)
        {
            var deleterecord = _context.vendorCapabiltiyAircraftModel.Where(a => a.VendorCapabilityId == capabilityid).ToList();

            for (var i = 0; i < deleterecord.Count; i++)
            {
                _context.Remove(deleterecord[i]);
                _context.SaveChanges();
            }
            //_context.Remove(deleterecord);
            // _context.SaveChanges();
            return Ok(deleterecord);
        }

        [HttpDelete("deleteVendorCapability/{capabilityid}")]
        [Produces(typeof(List<VendorCapabiliy>))]
        public IActionResult deleteVendorCapability(long capabilityid)
        {
            var deleterecord = _context.VendorCapabiliy.Where(a => a.VendorCapabilityId == capabilityid).SingleOrDefault();
            _context.Remove(deleterecord);
            _context.SaveChanges();
            return Ok(deleterecord);

        }

        [HttpPost("pagination")]
        public IActionResult GetVendor([FromBody]VendorRepairOrderSearchViewModel paginate)
        {
            var getData = new GetData();
            var vendorRepairOrderList = new List<VendorRepairOrderSearchViewModel>();
            var repairOrders = _context.RepairOrder.OrderByDescending(c => c.RepairOrderId).ToList();

            foreach (var repairOrder in repairOrders)
            {
                var vendorRepairOrder = new VendorRepairOrderSearchViewModel
                {
                    RONumber = repairOrder.RepairOrderNumber,
                    //RequestedBy = repairOrder.RequestedBy,
                    //DateApproval = repairOrder.DateApprovied,
                    //DateRequested = repairOrder.DateRequested,
                    //Approvar = repairOrder.Approver,
                    CreatedBy = repairOrder.CreatedBy,
                    UpdatedBy = repairOrder.UpdatedBy
                };

                vendorRepairOrderList.Add(vendorRepairOrder);
            }

            getData.TotalRecordsCount = vendorRepairOrderList.Count();

            var queryable = paginate.sortField != null
                            ? vendorRepairOrderList.AsQueryable().OrderBy(paginate.sortField)
                            : vendorRepairOrderList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                getData.VendorRepairOrderList = DAL.Common.PaginatedList<VendorRepairOrderSearchViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(getData);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching vendor repair order specific details."));
        }

        public class GetData
        {
            public int TotalRecordsCount { get; set; }
            public List<VendorRepairOrderSearchViewModel> VendorRepairOrderList { get; set; }
        }

        #region Capes

        [HttpGet("GetVendorCapesDatawithMasterId/{id}")]
        [Produces(typeof(List<AircraftModelViewModel>))]
        public IActionResult GetVendorCapesDatawithMasterId(long id, CapesInfoViewModel capesInfoViewModel)
        {


            var allseectedaircarftmodels = _unitOfWork.aircraftModel.GetCapesWithMasterid(id); //.GetAllCustomersData();
            return Ok(allseectedaircarftmodels);

        }

        [HttpPost("VendorMancapespost")]
        public IActionResult addCharges([FromBody] List<Capability> capability)
        {
            if (ModelState.IsValid)
            {
                for (var i = 0; i < capability.Count(); i++)
                {
                    // capability[i].CapabilityId = 0;
                    capability[i].MasterCompanyId = 1;
                    capability[i].CreatedDate = DateTime.Now;
                    if (capability[i].CapabilityId > 0)
                    {
                        _unitOfWork.Repository<Capability>().Update(capability[i]);
                    }
                    else
                    {
                        _unitOfWork.Repository<Capability>().Add(capability[i]);
                    }
                    _unitOfWork.SaveChanges();
                }
            }
            return Ok();
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public void saveItemcapes(long returnid, long itemid)
        {
            VendorCapes imc = new VendorCapes();

            imc.CapabilityId = returnid;
            imc.VendorId = itemid;
            imc.MasterCompanyId = 1;
            imc.CreatedDate = DateTime.Now;
            imc.UpdatedDate = DateTime.Now;
            imc.IsActive = true;
            _context.VendorCapes.Add(imc);
            _context.SaveChanges();
        }

        [HttpPost("Aircraftpost")]
        public IActionResult CreateAircraftmodelspot([FromBody] VendorCapabiltiyAircraftModel vendorAircraftModel)
        {
            if (ModelState.IsValid)
            {
                if (_context.VendorAircraftModel.Any(o => o.AircraftModelId == vendorAircraftModel.AircraftModelId))
                {
                    // return BadRequest($"{nameof(capesInfoViewModel)} cannot be null");
                    var existingresult = _context.VendorAircraftModel.Where(c => c.AircraftModelId == vendorAircraftModel.AircraftModelId).FirstOrDefault();
                    existingresult.AircraftModelId = vendorAircraftModel.AircraftModelId;

                    existingresult.VendorId = vendorAircraftModel.VendorId;
                    existingresult.DashNumber = vendorAircraftModel.DashNumber;
                    existingresult.CreatedBy = vendorAircraftModel.CreatedBy;
                    existingresult.UpdatedBy = vendorAircraftModel.UpdatedBy;
                    existingresult.MasterCompanyId = 1;
                    existingresult.CreatedDate = DateTime.Now;
                    existingresult.UpdatedDate = DateTime.Now;
                    _context.VendorAircraftModel.Update(existingresult);
                    _context.SaveChanges();
                }
                else
                {
                    var cp = new VendorCapabiltiyAircraftModel
                    {
                        AircraftModelId = vendorAircraftModel.AircraftModelId,
                        VendorId = vendorAircraftModel.VendorId,
                        DashNumber = vendorAircraftModel.DashNumber,
                        MasterCompanyId = 1,
                        CreatedBy = vendorAircraftModel.CreatedBy,
                        UpdatedBy = vendorAircraftModel.UpdatedBy,
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now
                    };

                    _context.VendorAircraftModel.Add(cp);
                    _context.SaveChanges();
                    //long returnid = cp.CapabilityId;
                    //saveItemcapes(returnid, vendorAircraftModel.itemId);

                }
            }
            return Ok(vendorAircraftModel);
            // return Ok(ModelState);
        }

        [HttpGet("GetListforCapes")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult GetListforCapes()
        {
            var allTaxrateInfo = _context.Vendor.Include("Manufacturer").Include("Provision").Include("Priority")
                .Include("ItemClassification").Include("Currency").Include("ExportClassification")
                    .Where(a => a.VendorTypeId == 1
                                && (a.IsDelete == true || a.IsDelete == null) || a.VendorTypeId == 1 && (a.IsDelete == true || a.IsDelete == null))
                                    .ToList();
            return Ok(allTaxrateInfo);

        }


        #endregion



        #region Private Methods

        private void updateRanking(int rankId)
        {

            var vendorCapes = _unitOfWork.Repository<VendorCapabiliy>().GetAll().Where(x => Convert.ToInt32(x.VendorRanking) >= rankId).OrderBy(x => Convert.ToInt32(x.VendorRanking)).ToList();

            if (vendorCapes != null && vendorCapes.Count > 0)
            {
                var vendorExists = vendorCapes.Any(X => Convert.ToInt32(X.VendorRanking) == rankId);
                if (vendorExists)
                {
                    var currentRank = 0;
                    var index = 0;
                    foreach (var capes in vendorCapes)
                    {
                        if (index < vendorCapes.Count)
                        {
                            currentRank = Convert.ToInt32(vendorCapes[0].VendorRanking);
                            var nextRank = (index + 1) <= vendorCapes.Count ? Convert.ToInt32(vendorCapes[index + 1].VendorRanking) : 0;
                            if ((nextRank - currentRank) == 1)
                            {
                                capes.VendorRanking = (Convert.ToInt32(capes.VendorRanking) + 1).ToString();
                                _unitOfWork.Repository<VendorCapabiliy>().Update(capes);

                            }
                            else
                            {
                                capes.VendorRanking = (Convert.ToInt32(capes.VendorRanking) + 1).ToString();
                                _unitOfWork.Repository<VendorCapabiliy>().Update(capes);
                                break;
                            }
                            index++;
                        }
                    }
                }
            }

        }

        [HttpGet("getvendorContactByVendorID/{vendorid}/{isDContact}")]
        [Produces(typeof(List<VendorCapabiltiyAircraftModel>))]
        public IActionResult GetVendorByID(long vendorid, bool isDContact)
        {
            var vendorcontactdata = _unitOfWork.Vendor.getVendorByID(vendorid, isDContact);
            return Ok(vendorcontactdata);

        }

        #endregion Private Methods

    }
    //[HttpGet("GetvendorList/{vendorName}")]
    //[Produces(typeof(List<VendorViewModel>))]
    //public IActionResult Vendorlist(string value, VendorViewModel venlist)
    //{
    //   if (ModelState.IsValid)
    //    {
    //        var vendorlist = _unot.Vendor.getAllItemMasterStockdata(); 
    //        return Ok(vendorlist);           
    //    }      
    //}

}