using AutoMapper;
using DAL;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;

using RepairOrderPartDto = QuickApp.Pro.ViewModels.RepairOrderPartDto;

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
        private readonly IOptions<SmtpConfig> _smtpConfig;

        public VendorController(IUnitOfWork unitOfWork, ILogger<VendorController> logger, IEmailer emailer, ApplicationDbContext context, IOptions<SmtpConfig> smtpConfig)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
            _smtpConfig = smtpConfig;
        }


        [HttpPost("vendorlist")]
        public IActionResult GetVendorsList([FromBody]Filters<VendorFilters> vendorFilters)
        {
            try
            {
                var result = _unitOfWork.Vendor.GetVendorsList(vendorFilters);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
        }

        [HttpGet("vendorglobalsearch")]
        public IActionResult VendorGlobalSearch(string filterText, int pageNumber = 0, int pageSize = 10, bool isActive = false)
        {
            try
            {
                var result = _unitOfWork.Vendor.VendorGlobalSearch(filterText, pageNumber, pageSize, isActive);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
           
        }

        [HttpGet("getvendordatabyid/{vendorId}")]
        public IActionResult GetVendorDataById(long vendorId)
        {
            try
            {
                var allVendorlistDetails = _unitOfWork.Vendor.GetVendorDataById(vendorId);
                return Ok(allVendorlistDetails);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }           

        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult Get()
        {
            try
            {
                var allActions = _unitOfWork.Vendor.GetVendors(); //.GetAllCustomersData();
                return Ok(allActions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
           
        }

        [HttpGet("GetVendorAuditHistory/{vendorId}")]
        public IActionResult GetVendorAuditListDetails(long vendorId)
        {
            try
            {
                var allVendorlistDetails = _unitOfWork.Vendor.GetVendorsAuditHistory(vendorId);
                return Ok(allVendorlistDetails);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }         

        }

        /// <summary>
        /// Method that gets basic info namely id and name only
        /// </summary>
        /// <returns>List with basic info</returns>
        [HttpGet("basic")]
        [Produces(typeof(List<VendorBaseViewModel>))]
        public IActionResult GetBasicList()
        {
            try
            {
                var basicvendorList = _unitOfWork.Vendor.GetVendorsLite();
                var mappedList = Mapper.Map<IEnumerable<VendorBaseViewModel>>(basicvendorList);
                return Ok(mappedList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }            
        }

        [HttpGet("GetmanagementSiteList/{companyId}")]
        [Produces(typeof(List<SiteViewModel>))]

        public IActionResult GetmanagementSiteList(long companyId)
        {
            try
            {
                var allActions = _unitOfWork.Vendor.GetmanagementSiteList(companyId); //.GetAllCustomersData();
                return Ok(allActions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }          

        }

        [HttpGet("GetcountryList")]

        [Produces(typeof(List<Countries>))]
        public IActionResult GetcountryList()
        {
            try
            {
                var allvendortype = _context.Countries.OrderByDescending(c => c.countries_id).ToList();
                return Ok(allvendortype);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }           

        }

        [HttpGet("capabilityTypeList")]
        [Produces(typeof(List<CapabilityType>))]

        public IActionResult capabilityTypeList()
        {
            try
            {
                var allActions = _unitOfWork.capabilityTypeRepository.GetAllCapabilityListData(); //.GetAllCustomersData();
                return Ok(allActions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }           
        }


        [HttpPost("polist")]
        public IActionResult polist([FromBody]Filters<PurchaseOrderFilters> poFilters)
        {
            try
            {
                var allActions = _unitOfWork.purchaseOrder.GetPurchaseOrderlist(poFilters); //.GetAllCustomersData();
                return Ok(allActions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
           
        }

        [HttpGet("stocklinePOList")]
        public IActionResult stocklinePOList()
        {
            try
            {
                var allActions = _unitOfWork.purchaseOrder.StockLinePOList(); //.GetAllCustomersData();
                return Ok(allActions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
           
        }

        //[HttpGet("POListById")]
        //public IActionResult POListById(int itemMasterId)
        //{
        //    var result = _unitOfWork.purchaseOrder.POListByMasterItemId(itemMasterId); //.GetAllCustomersData();
        //    return Ok(result);
        //}

        [HttpGet("recevingpolist")]
        public IActionResult RecevingPolist()
        {
            try
            {
                var allActions = _unitOfWork.purchaseOrder.RecevingPolist(); //.GetAllCustomersData();
                return Ok(allActions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
           
        }

        [HttpGet("recevingRoList")]
        public IActionResult RecevingRolist()
        {
            try
            {
                var roList = _unitOfWork.repairOrder.RecevingRolist();
                return Ok(roList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
           
        }

        [HttpGet("rolist")]
        [Produces(typeof(List<RepairOrderViewModel>))]

        public IActionResult rolist()
        {
            try
            {
                var allActions = _context.RepairOrder
               .Where(x => x.IsDeleted == false)
               .OrderByDescending(c => c.RepairOrderId).ToList();
                return Ok(allActions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
           

        }

        [HttpPost("roListWithFilters")]
        public IActionResult rolist([FromBody]Filters<RepairOrderFilters> roFilters)
        {
            try
            {
                var allActions = _unitOfWork.repairOrder.GetRepairOrderlist(roFilters);
                return Ok(allActions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
           
        }

        [HttpGet("BencusAddress")]
        [Produces(typeof(List<VendorViewModel>))]

        public IActionResult BencusGet()
        {
            try
            {
                var allActions = _unitOfWork.Vendor.GetPayments(); //.GetAllCustomersData();
                return Ok(allActions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }          

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
            try
            {
                var obj = _context.Capability.OrderByDescending(c => c.CapabilityId).ToList();
                return Ok(obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
           
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
        public IActionResult GetVendorListDetails(bool isActive = false)
        {
            var allVendorlistDetails = _unitOfWork.Vendor.GetVendorListDetails(isActive); //.GetAllCustomersData();
            return Ok(allVendorlistDetails);

        }
        [HttpGet("GetVendorDetailsWithData")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult GetVendorDetailsWithData(bool isActive = false)
        {
            try
            {
                var allVendorlistDetails = _unitOfWork.Vendor.GetVendorListDetails(isActive); //.GetAllCustomersData();
                return Ok(allVendorlistDetails);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
           

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
            var vendorDtails = (from vp in _context.VendorPayment
                                join vpm in _context.VendorPaymentMethod on vp.DefaultPaymentMethod equals vpm.VendorPaymentMethodId into vpmm
                                from vpm in vpmm.DefaultIfEmpty()
                                where (vp.VendorId == vendorId)
                                select new
                                {
                                    vp.BankAddressId,
                                    vp.BankName,
                                    vp.CreatedBy,
                                    vp.CreatedDate,
                                    vp.DefaultPaymentMethod,
                                    //vp.IsActive,
                                    vp.MasterCompanyId,
                                    vp.UpdatedBy,
                                    vp.UpdatedDate,
                                    vp.Vendor,
                                    vp.VendorId,
                                    vp.VendorPaymentId,
                                    PaymentType = vpm.Description
                                }).FirstOrDefault();



            //var vendorDtails = _context.VendorPayment.Where(a => a.VendorId == vendorId).FirstOrDefault(); //.GetAllCustomersData();
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
            var allPartDetails = _context.ItemMaster.Where(a => a.IsDeleted == false || a.IsDeleted == null).OrderByDescending(a => a.ItemMasterId).ToList(); //.GetAllCustomersData();
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
        public IActionResult GetvendorCapabilityList(string status = "all", long vendorId = 0)
        {
            if (status.ToLower() == "all")
            {

                if (vendorId > 0)
                {
                    var data = (from vc in _context.VendorCapabiliy
                                join v in _context.Vendor on vc.VendorId equals v.VendorId
                                join im in _context.ItemMaster on vc.ItemMasterId equals im.ItemMasterId into imm
                                from im in imm.DefaultIfEmpty()
                                join vct in _context.vendorCapabilityType on vc.VendorCapabilityId equals vct.VendorCapabilityId into vctt
                                from vct in vctt.DefaultIfEmpty()
                                join vcat in _context.capabilityType on Convert.ToInt32(vc.CapabilityId) equals vcat.CapabilityTypeId into vcatt
                                from vcat in vcatt.DefaultIfEmpty()
                                where vc.IsDeleted != true && vc.VendorId == vendorId
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
                                    vc.IsActive,
                                    CapabilityType = vcat.Description,
                                    vc.CapabilityId,
                                    vc.IsPMA,
                                    vc.IsDER,
                                    //vct.CapabilityTypeId,
                                    //vcat.AircraftTypeId,
                                    //vcam.AircraftModelId

                                }).OrderByDescending(p => p.CreatedDate).ToList();

                    return Ok(data);
                }
                else
                {
                    var data = (from vc in _context.VendorCapabiliy
                                join v in _context.Vendor on vc.VendorId equals v.VendorId
                                join im in _context.ItemMaster on vc.ItemMasterId equals im.ItemMasterId into imm
                                from im in imm.DefaultIfEmpty()
                                join vct in _context.vendorCapabilityType on vc.VendorCapabilityId equals vct.VendorCapabilityId into vctt
                                from vct in vctt.DefaultIfEmpty()
                                join vcat in _context.capabilityType on Convert.ToInt32(vc.CapabilityId) equals vcat.CapabilityTypeId into vcatt
                                from vcat in vcatt.DefaultIfEmpty()
                                where vc.IsDeleted != true
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
                                    vc.IsActive,
                                    CapabilityType = vcat.Description,
                                    vc.CapabilityId,
                                    vc.IsPMA,
                                    vc.IsDER,
                                    //vct.CapabilityTypeId,
                                    //vcat.AircraftTypeId,
                                    //vcam.AircraftModelId

                                }).OrderByDescending(p => p.CreatedDate).ToList();

                    return Ok(data);
                }


            }
            else
            {
                bool sStatus = false;
                if (status.ToLower() == "active")
                {
                    sStatus = true;
                }

                if (vendorId > 0)
                {
                    var data = (from vc in _context.VendorCapabiliy
                                join v in _context.Vendor on vc.VendorId equals v.VendorId
                                join im in _context.ItemMaster on vc.ItemMasterId equals im.ItemMasterId into imm
                                from im in imm.DefaultIfEmpty()
                                join vct in _context.vendorCapabilityType on vc.VendorCapabilityId equals vct.VendorCapabilityId into vctt
                                from vct in vctt.DefaultIfEmpty()
                                join vcat in _context.capabilityType on Convert.ToInt32(vc.CapabilityId) equals vcat.CapabilityTypeId into vcatt
                                from vcat in vcatt.DefaultIfEmpty()
                                where vc.IsDeleted != true && vc.IsActive == sStatus && vc.VendorId == vendorId
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
                                    vc.IsActive,
                                    CapabilityType = vcat.Description,
                                    vc.CapabilityId,
                                    vc.IsPMA,
                                    vc.IsDER,
                                    //vct.CapabilityTypeId,
                                    //vcat.AircraftTypeId,
                                    //vcam.AircraftModelId

                                }).OrderByDescending(p => p.CreatedDate).ToList();

                    return Ok(data);
                }
                else
                {
                    var data = (from vc in _context.VendorCapabiliy
                                join v in _context.Vendor on vc.VendorId equals v.VendorId
                                join im in _context.ItemMaster on vc.ItemMasterId equals im.ItemMasterId into imm
                                from im in imm.DefaultIfEmpty()
                                join vct in _context.vendorCapabilityType on vc.VendorCapabilityId equals vct.VendorCapabilityId into vctt
                                from vct in vctt.DefaultIfEmpty()
                                join vcat in _context.capabilityType on Convert.ToInt32(vc.CapabilityId) equals vcat.CapabilityTypeId into vcatt
                                from vcat in vcatt.DefaultIfEmpty()
                                where vc.IsDeleted != true && vc.IsActive == sStatus
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
                                    vc.IsActive,
                                    CapabilityType = vcat.Description,
                                    vc.CapabilityId,
                                    vc.IsPMA,
                                    vc.IsDER,
                                    //vct.CapabilityTypeId,
                                    //vcat.AircraftTypeId,
                                    //vcam.AircraftModelId

                                }).OrderByDescending(p => p.CreatedDate).ToList();

                    return Ok(data);
                }



            }


        }

        [HttpGet("getVendorCapabilitybyId/{id}")]
        public IActionResult GetvendorCapabilityById(long id)
        {
            {
                var data = (from vc in _context.VendorCapabiliy
                            join v in _context.Vendor on vc.VendorId equals v.VendorId
                            join im in _context.ItemMaster on vc.ItemMasterId equals im.ItemMasterId into imm
                            from im in imm.DefaultIfEmpty()
                            join vct in _context.vendorCapabilityType on vc.VendorCapabilityId equals vct.VendorCapabilityId into vctt
                            from vct in vctt.DefaultIfEmpty()
                            join vcat in _context.capabilityType on vc.CapabilityId equals Convert.ToInt64(vcat.CapabilityTypeId) into vcatt
                            from vcat in vcatt.DefaultIfEmpty()
                            where vc.VendorCapabilityId == id
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
                                vc.IsActive,
                                vc.CapabilityId,
                                vc.IsPMA,
                                vc.IsDER,
                                CapabilityType = vcat.Description

                            }).FirstOrDefault();
                // return data;
                return Ok(data);
            }
        }

        [HttpGet("getVendorCapabilityByVendorId")]
        [Produces(typeof(List<VendorCapabiliy>))]
        public IActionResult GetvendorCapabilityListByVendorId(long vendorid)
        {
            var allCapabilities = _unitOfWork.VendorCapabilities.GetvendorCapabilityListByVendorId(vendorid);
            return Ok(allCapabilities);
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
                   // poViewModel.PurchaseOrderNumber = Guid.NewGuid().ToString();
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
            actionobject.OpenDate = poViewModel.OpenDate;
            actionobject.ClosedDate = poViewModel.ClosedDate;

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

            actionobject.Notes = poViewModel.PoMemo;

            actionobject.ShipToSiteName = poViewModel.ShipToSiteName;
            actionobject.BillToSiteName = poViewModel.BillToSiteName;
            actionobject.ShippingCost = poViewModel.ShippingCost;
            actionobject.HandlingCost = poViewModel.HandlingCost;
            actionobject.BillToContactId = poViewModel.BillToContactId;
            actionobject.ShipViaId = poViewModel.ShipViaId;
            actionobject.ShipToSiteId = poViewModel.ShipToSiteId;
            actionobject.BillToSiteId = poViewModel.BillToSiteId;
            actionobject.ShipVia = poViewModel.ShipVia;
            actionobject.ShippingAccountNo = poViewModel.ShippingAcctNum;
            actionobject.ShippingId = poViewModel.ShippingId;
            actionobject.ShippingURL = poViewModel.ShippingURL;
            actionobject.ShipToContact = poViewModel.ShipToContact;
            actionobject.BillToContact = poViewModel.BillToContact;
            actionobject.ShipToAddress1 = poViewModel.ShipToAddress1;
            actionobject.ShipToAddress2 = poViewModel.ShipToAddress2;
            actionobject.ShipToAddress3 = poViewModel.ShipToAddress3;
            actionobject.ShipToCity = poViewModel.ShipToCity;
            actionobject.ShipToState = poViewModel.ShipToStateOrProvince;

            actionobject.ShipToPostalCode = poViewModel.ShipToPostalCode;
            actionobject.ShipToCountry = poViewModel.ShipToCountry;
            actionobject.BillToAddress1 = poViewModel.BillToAddress1;
            actionobject.BillToAddress2 = poViewModel.BillToAddress2;
            actionobject.BillToAddress3 = poViewModel.BillToAddress3;
            actionobject.BillToCity = poViewModel.BillToCity;
            actionobject.BillToState = poViewModel.BillToStateOrProvince;

            actionobject.BillToPostalCode = poViewModel.BillToPostalCode;
            actionobject.BillToCountry = poViewModel.BillToCountry;





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
            actionobject.POPartSplitAddressId = poPartSplit.POPartSplitAddressId;


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
            actionobject.DiscountAmount = poViewModel.DiscountAmount;
            actionobject.DiscountPercent = poViewModel.DiscountPercent;
            actionobject.DiscountPerUnit = poViewModel.DiscountPerUnit;
            actionobject.ExtendedCost = poViewModel.ExtendedCost;
            actionobject.ReportCurrencyId = poViewModel.ReportCurrencyId;
            actionobject.FunctionalCurrencyId = poViewModel.FunctionalCurrencyId;
            actionobject.ForeignExchangeRate = poViewModel.ForeignExchangeRate;
            actionobject.WorkOrderId = poViewModel.WorkOrderId;
            actionobject.RepairOrderId = poViewModel.RepairOrderId;
            actionobject.SalesOrderId = poViewModel.SalesOrderId;
            actionobject.GeneralLedgerAccounId = poViewModel.GLAccounId;
            actionobject.Memo = poViewModel.Memo;



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
                            popSplitEnt.ParentId = poViewModel.PurchaseOrderPartRecordId;
                            _context.PurchaseOrderPart.Add(popSplitEnt);

                        }
                        else
                        {
                            MapAddress(poPartSplit);
                            popSplitEnt.isParent = false;
                            MapPOPSplitVMtoEntity(poPartSplit, poViewModel, popSplitEnt);
                            actionobject.ParentId = poViewModel.PurchaseOrderPartRecordId;
                            _context.PurchaseOrderPart.Update(actionobject);
                        }
                        _unitOfWork.SaveChanges();
                        poPartSplit.PurchaseOrderPartRecordId = popSplitEnt.PurchaseOrderPartRecordId;
                    }
                }


                if (poViewModels != null && poViewModels.Count() > 0)
                {
                    var statusId = (from po in _context.PurchaseOrder.Where(p => p.PurchaseOrderId == poViewModels.FirstOrDefault().PurchaseOrderId)
                                    select new
                                    {
                                        po.StatusId
                                    }).FirstOrDefault().StatusId;

                    if (statusId != null && statusId == 1)
                    {
                        string lintText = "more details.";
                        SendPoEmail(poViewModels.FirstOrDefault().PurchaseOrderId, "Your Purchase Order has been created successfully", "PO Initiator", _smtpConfig.Value.POInitiatorEmail, "Purchase Order Creation -", lintText);
                    }
                    else if (statusId != null && statusId == 2)
                    {
                        string lintText = "Approve.";

                        SendPoEmail(poViewModels.FirstOrDefault().PurchaseOrderId, "Purchase Order requires your approval", "PO Approver", _smtpConfig.Value.POApproverEmail, "Purchase Order Approval -", lintText);
                    }
                }


                return Ok(poViewModels);
            }
            return Ok(ModelState);
        }

        [HttpPost("saveVendorRepairOrder")]
        public IActionResult SaveVendorRepairOrder([FromBody] RepairOrderViewModel roViewModel, Address address, VendorType vt)
        {
            if (ModelState.IsValid)
            {
                if (roViewModel == null)
                {
                    return BadRequest($"{nameof(roViewModel)} cannot be null");
                }

                if (_context.RepairOrder.Any(o => o.RepairOrderId == roViewModel.RepairOrderId))
                {
                    var repairOrderModel = _context.RepairOrder.Where(a => a.RepairOrderId == roViewModel.RepairOrderId).SingleOrDefault();

                    // UPDATE data.
                    repairOrderModel = FillRepairOrder(repairOrderModel, roViewModel);
                    repairOrderModel.UpdatedDate = DateTime.Now;
                    repairOrderModel.UpdatedBy = roViewModel.UpdatedBy;
                    if (roViewModel.IsActive != null)
                    {
                        repairOrderModel.IsActive = roViewModel.IsActive;
                    }
                    repairOrderModel.IsDeleted = roViewModel.IsDeleted;
                    _context.SaveChanges();
                    return Ok(repairOrderModel);
                }
                else
                {
                    vt.VendorTypeId = 1;

                    // SAVE data.
                    var repairOrderModel = new RepairOrder();
                    repairOrderModel = FillRepairOrder(repairOrderModel, roViewModel);
                    repairOrderModel.CreatedDate = DateTime.Now;
                    repairOrderModel.IsActive = true;
                    repairOrderModel.IsDeleted = false;

                    var vendor = _context.Vendor.Where(x => x.VendorId == repairOrderModel.VendorId).FirstOrDefault();
                    if (vendor != null)
                    {
                        repairOrderModel.VendorName = vendor.VendorName;
                        repairOrderModel.VendorCode = vendor.VendorCode;
                    }

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

        private RepairOrder FillRepairOrder(RepairOrder repairOrderModel, RepairOrderViewModel roViewModel)
        {
            repairOrderModel.RepairOrderNumber = roViewModel.RepairOrderNumber;
            repairOrderModel.OpenDate = roViewModel.OpenDate;
            repairOrderModel.ClosedDate = roViewModel.ClosedDate;
            repairOrderModel.NeedByDate = roViewModel.NeedByDate;
            repairOrderModel.PriorityId = roViewModel.PriorityId;
            repairOrderModel.DeferredReceiver = roViewModel.DeferredReceiver;
            repairOrderModel.VendorId = roViewModel.VendorId;
            repairOrderModel.VendorContactId = roViewModel.VendorContactId;
            repairOrderModel.VendorContactPhone = roViewModel.VendorContactPhone;
            repairOrderModel.CreditLimit = roViewModel.CreditLimit;
            repairOrderModel.CreditTermsId = roViewModel.CreditTermsId;
            repairOrderModel.RequisitionerId = roViewModel.RequisitionerId;
            repairOrderModel.ApproverId = roViewModel.ApproverId;
            repairOrderModel.ApprovedDate = roViewModel.ApprovedDate;
            repairOrderModel.StatusId = roViewModel.StatusId;
            repairOrderModel.Resale = roViewModel.Resale;
            repairOrderModel.ManagementStructureId = roViewModel.ManagementStructureId;
            repairOrderModel.RoMemo = roViewModel.RoMemo;
            repairOrderModel.ShipToUserId = roViewModel.ShipToUserId;
            repairOrderModel.ShipToUserTypeId = roViewModel.ShipToUserTypeId;
            repairOrderModel.ShipToAddressId = roViewModel.ShipToAddressId;
            repairOrderModel.ShipToContactId = roViewModel.ShipToContactId;
            repairOrderModel.ShipViaId = roViewModel.ShipViaId;
            repairOrderModel.ShippingCost = roViewModel.ShippingCost;
            repairOrderModel.HandlingCost = roViewModel.HandlingCost;
            repairOrderModel.ShipVia = roViewModel.ShipVia;
            repairOrderModel.ShippingAcctNum = roViewModel.ShippingAcctNum;
            repairOrderModel.ShippingId = roViewModel.ShippingId;
            repairOrderModel.ShippingUrl = roViewModel.ShippingUrl;
            repairOrderModel.ShipToMemo = roViewModel.ShipToMemo;
            repairOrderModel.ShipToSiteId = roViewModel.ShipToSiteId;
            repairOrderModel.ShipToSiteName = roViewModel.ShipToSiteName;
            repairOrderModel.BillToSiteId = roViewModel.BillToSiteId;
            repairOrderModel.BillToSiteName = roViewModel.BillToSiteName;
            repairOrderModel.BillToUserTypeId = roViewModel.BillToUserTypeId;
            repairOrderModel.BillToUserId = roViewModel.BillToUserId;
            repairOrderModel.BillToAddressId = roViewModel.BillToAddressId;
            repairOrderModel.BillToContactId = roViewModel.BillToContactId;
            repairOrderModel.BillToMemo = roViewModel.BillToMemo;
            repairOrderModel.CreatedBy = roViewModel.CreatedBy;
            repairOrderModel.UpdatedBy = roViewModel.UpdatedBy;
            //  SHIIPING ADDRESS
            repairOrderModel.ShipToAddress1 = roViewModel.ShipToAddress1;
            repairOrderModel.ShipToAddress2 = roViewModel.ShipToAddress2;
            repairOrderModel.ShipToAddress3 = roViewModel.ShipToAddress3;
            repairOrderModel.ShipToCity = roViewModel.ShipToCity;
            repairOrderModel.ShipToStateOrProvince = roViewModel.ShipToStateOrProvince;
            repairOrderModel.ShipToPostalCode = roViewModel.ShipToPostalCode;
            repairOrderModel.ShipToCountry = roViewModel.ShipToCountry;
            // BILLING ADDRESS
            repairOrderModel.BillToAddress1 = roViewModel.BillToAddress1;
            repairOrderModel.BillToAddress2 = roViewModel.BillToAddress2;
            repairOrderModel.BillToAddress3 = roViewModel.BillToAddress3;
            repairOrderModel.BillToCity = roViewModel.BillToCity;
            repairOrderModel.BillToStateOrProvince = roViewModel.BillToStateOrProvince;
            repairOrderModel.BillToPostalCode = roViewModel.BillToPostalCode;
            repairOrderModel.BillToCountry = roViewModel.BillToCountry;

            return repairOrderModel;
        }

        private Address GetAddress(long? addressId)
        {
            var addressModel = _context.Address.Where(a => a.AddressId == addressId).SingleOrDefault();
            return addressModel;
        }

        [HttpPost("saveVendorRepairPart")]
        public IActionResult SaveVendorRepairPart([FromBody] List<RepairOrderPartViewModel> roViewModels, Address address, VendorType vt)
        {
            if (ModelState.IsValid)
            {
                if (roViewModels == null || roViewModels.Count == 0)
                {
                    return BadRequest($"{nameof(roViewModels)} cannot be null or need atleast one content.");
                }

                var returnObjects = new List<RepairOrderPartDto>();
                foreach (var roViewModel in roViewModels)
                {
                    if (_context.RepairOrderPart.Any(o => o.RepairOrderPartRecordId == roViewModel.RepairOrderPartRecordId))
                    {
                        var roPartModel = _context.RepairOrderPart
                                                .Where(a => a.RepairOrderPartRecordId == roViewModel.RepairOrderPartRecordId)
                                                .SingleOrDefault();
                        roPartModel = FillRepairOrderPart(roPartModel, roViewModel);
                        UpdateRepairOrderPart(roPartModel);

                        if (roViewModel.RoPartSplits != null && roViewModel.RoPartSplits.Any())
                        {
                            foreach (var roPartSplit in roViewModel.RoPartSplits)
                            {
                                var repairOrderPartObj = _context.RepairOrderPart
                                                                .Where(a => a.RepairOrderPartRecordId == roPartSplit.RepairOrderPartRecordId)
                                                                .SingleOrDefault();
                                if (repairOrderPartObj == null)
                                {
                                    var roPartModel2 = new RepairOrderPart();
                                    roPartModel2 = FillRepairOrderSplitPart(roPartModel2, roPartSplit);
                                    roPartModel2.ParentId = roViewModel.RepairOrderPartRecordId;
                                    SaveRepairOrderPart(roPartModel2);
                                    if (roPartSplit.RepairOrderPartRecordId == 0)
                                    {
                                        roPartSplit.RepairOrderPartRecordId = roPartModel2.RepairOrderPartRecordId;
                                    }
                                }
                                else
                                {
                                    repairOrderPartObj = FillRepairOrderSplitPart(repairOrderPartObj, roPartSplit);
                                    repairOrderPartObj.ParentId = roPartModel.ParentId;
                                    UpdateRepairOrderPart(repairOrderPartObj);
                                }
                            }
                        }
                    }
                    else
                    {
                        var roPartModel = new RepairOrderPart();
                        roPartModel = FillRepairOrderPart(roPartModel, roViewModel);
                        SaveRepairOrderPart(roPartModel);
                        roViewModel.RepairOrderPartRecordId = roPartModel.RepairOrderPartRecordId;

                        if (roPartModel.ParentId == null || roPartModel.ParentId == 0)
                        {
                            var exists = _context.RepairOrderPart.Where(rop => rop.RepairOrderPartRecordId == roPartModel.RepairOrderPartRecordId).SingleOrDefault();
                            exists.ParentId = roPartModel.RepairOrderPartRecordId;
                            _context.RepairOrderPart.Update(exists);
                            _context.SaveChanges();
                        }

                        if (roViewModel.RoPartSplits != null && roViewModel.RoPartSplits.Any())
                        {
                            for (int i = 0, roViewModelRoPartSplitsCount = roViewModel.RoPartSplits.Count; i < roViewModelRoPartSplitsCount; i++)
                            {
                                var roPartSplit = roViewModel.RoPartSplits[i];
                                var repairOrderPartObj = new RepairOrderPart();
                                repairOrderPartObj = FillRepairOrderSplitPart(repairOrderPartObj, roPartSplit);
                                repairOrderPartObj.ParentId = roPartModel.RepairOrderPartRecordId;
                                SaveRepairOrderPart(repairOrderPartObj);
                                roViewModel.RoPartSplits[i].RepairOrderPartRecordId = repairOrderPartObj.RepairOrderPartRecordId;
                            }
                        }
                    }
                    var roPartDto = FillRepairOrderPartDto(roViewModel);
                    returnObjects.Add(roPartDto);
                }
                return Ok(returnObjects);
            }

            return Ok(ModelState);
        }

        private RepairOrderPart FillRepairOrderPart(RepairOrderPart roPartModel, RepairOrderPartViewModel roViewModel)
        {
            roPartModel.RepairOrderId = roViewModel.RepairOrderId;
            roPartModel.IsParent = roViewModel.IsParent;
            roPartModel.ItemMasterId = roViewModel.ItemMasterId;
            roPartModel.AssetId = roViewModel.AssetId;
            roPartModel.PartNumberId = roViewModel.PartNumberId;
            roPartModel.AltPartNumberId = roViewModel.AltPartNumberId;
            roPartModel.ItemTypeId = roViewModel.ItemTypeId;
            roPartModel.GlAccountId = roViewModel.GlAccountId;
            roPartModel.ManufacturerId = roViewModel.ManufacturerId;
            roPartModel.UOMId = roViewModel.UOMId;
            roPartModel.NeedByDate = roViewModel.NeedByDate;
            roPartModel.ConditionId = roViewModel.ConditionId;
            roPartModel.QuantityOrdered = roViewModel.QuantityOrdered;
            roPartModel.UnitCost = roViewModel.UnitCost;
            roPartModel.DiscountAmount = roViewModel.DiscountAmount;
            roPartModel.DiscountPercent = roViewModel.DiscountPercent;
            roPartModel.DiscountPerUnit = roViewModel.DiscountPerUnit;
            roPartModel.ExtendedCost = roViewModel.ExtendedCost;
            roPartModel.ForeignExchangeRate = roViewModel.ForeignExchangeRate;
            roPartModel.FunctionalCurrencyId = roViewModel.FunctionalCurrencyId;
            roPartModel.ReportCurrencyId = roViewModel.ReportCurrencyId;
            roPartModel.WorkOrderId = roViewModel.WorkOrderId;
            roPartModel.SalesOrderId = roViewModel.SalesOrderId;
            roPartModel.ManagementStructureId = roViewModel.ManagementStructureId;
            roPartModel.MasterCompanyId = roViewModel.MasterCompanyId;
            roPartModel.Memo = roViewModel.Memo;
            roPartModel.CreatedBy = roViewModel.CreatedBy;
            roPartModel.UpdatedBy = roViewModel.UpdatedBy;
            roPartModel.ParentId = roViewModel.RepairOrderPartRecordId;
            roPartModel.StockLineId = roViewModel.StockLineId;

            return roPartModel;
        }

        private RepairOrderPart FillRepairOrderSplitPart(RepairOrderPart roPartModel, ViewModels.RoPartSplits roPartSplit)
        {
            roPartModel.RepairOrderId = roPartSplit.RepairOrderId;
            roPartModel.ItemMasterId = roPartSplit.ItemMasterId;
            roPartModel.AssetId = roPartSplit.AssetId;
            roPartModel.PartNumberId = roPartSplit.PartNumberId;
            roPartModel.RoPartSplitUserTypeId = roPartSplit.RoPartSplitUserTypeId;
            roPartModel.RoPartSplitUserId = roPartSplit.RoPartSplitUserId;
            roPartModel.RoPartSplitAddressId = roPartSplit.RoPartSplitAddressId;
            roPartModel.RoPartSplitAddress1 = roPartSplit.RoPartSplitAddress1;
            roPartModel.RoPartSplitAddress2 = roPartSplit.RoPartSplitAddress2;
            roPartModel.RoPartSplitAddress3 = roPartSplit.RoPartSplitAddress3;
            roPartModel.RoPartSplitCity = roPartSplit.RoPartSplitCity;
            roPartModel.RoPartSplitStateOrProvince = roPartSplit.RoPartSplitStateOrProvince;
            roPartModel.RoPartSplitPostalCode = roPartSplit.RoPartSplitPostalCode;
            roPartModel.RoPartSplitCountry = roPartSplit.RoPartSplitCountry;
            roPartModel.UOMId = roPartSplit.UOMId;
            roPartModel.QuantityOrdered = roPartSplit.QuantityOrdered;
            roPartModel.NeedByDate = roPartSplit.NeedByDate;
            roPartModel.ManagementStructureId = roPartSplit.ManagementStructureId;
            roPartModel.IsParent = false;
            roPartModel.StockLineId = roPartSplit.StockLineId;

            return roPartModel;
        }

        private void SaveRepairOrderPart(RepairOrderPart roPartModel)
        {
            _context.RepairOrderPart.Add(roPartModel);
            _unitOfWork.SaveChanges();
        }

        private void UpdateRepairOrderPart(RepairOrderPart roPartModel)
        {
            _context.RepairOrderPart.Update(roPartModel);
            _unitOfWork.SaveChanges();
        }

        private RepairOrderPartDto FillRepairOrderPartDto(RepairOrderPartViewModel roViewModel)
        {
            var roPartDto = new RepairOrderPartDto
            {
                RepairOrderId = roViewModel.RepairOrderId,
                RepairOrderPartRecordId = roViewModel.RepairOrderPartRecordId,
                IsParent = roViewModel.IsParent,
                ItemMasterId = roViewModel.ItemMasterId,
                AssetId = roViewModel.AssetId,
                PartNumberId = roViewModel.PartNumberId,
                AltPartNumberId = roViewModel.AltPartNumberId,
                ItemTypeId = roViewModel.ItemTypeId,
                ManufacturerId = roViewModel.ManufacturerId,
                GlAccountId = roViewModel.GlAccountId,
                UOMId = roViewModel.UOMId,
                NeedByDate = roViewModel.NeedByDate,
                ConditionId = roViewModel.ConditionId,
                QuantityOrdered = roViewModel.QuantityOrdered,
                UnitCost = roViewModel.UnitCost,
                DiscountAmount = roViewModel.DiscountAmount,
                DiscountPercent = roViewModel.DiscountPercent,
                DiscountPerUnit = roViewModel.DiscountPerUnit,
                ExtendedCost = roViewModel.ExtendedCost,
                ForeignExchangeRate = roViewModel.ForeignExchangeRate,
                FunctionalCurrencyId = roViewModel.FunctionalCurrencyId,
                ReportCurrencyId = roViewModel.ReportCurrencyId,
                WorkOrderId = roViewModel.WorkOrderId,
                SalesOrderId = roViewModel.SalesOrderId,
                ManagementStructureId = roViewModel.ManagementStructureId,
                Memo = roViewModel.Memo,
                MasterCompanyId = roViewModel.MasterCompanyId,
                CreatedBy = roViewModel.CreatedBy,
                UpdatedBy = roViewModel.UpdatedBy,
                StockLineId = roViewModel.StockLineId
            };

            if (roViewModel.RoPartSplits != null && roViewModel.RoPartSplits.Any())
            {
                roPartDto.RoPartSplits = new List<ViewModels.RoPartSplits>();
                foreach (var roSplit in roViewModel.RoPartSplits)
                {
                    var roPartSplitObj = new ViewModels.RoPartSplits()
                    {
                        RepairOrderId = roSplit.RepairOrderId,
                        RepairOrderPartRecordId = roSplit.RepairOrderPartRecordId,
                        ItemMasterId = roSplit.ItemMasterId,
                        AssetId = roSplit.AssetId,
                        PartNumberId = roSplit.PartNumberId,
                        RoPartSplitUserId = roSplit.RoPartSplitUserId,
                        RoPartSplitUserTypeId = roSplit.RoPartSplitUserTypeId,
                        RoPartSplitAddressId = roSplit.RoPartSplitAddressId,
                        RoPartSplitAddress1 = roSplit.RoPartSplitAddress1,
                        RoPartSplitAddress2 = roSplit.RoPartSplitAddress2,
                        RoPartSplitAddress3 = roSplit.RoPartSplitAddress3,
                        RoPartSplitCity = roSplit.RoPartSplitCity,
                        RoPartSplitCountry = roSplit.RoPartSplitCountry,
                        RoPartSplitPostalCode = roSplit.RoPartSplitPostalCode,
                        RoPartSplitStateOrProvince = roSplit.RoPartSplitStateOrProvince,
                        QuantityOrdered = roSplit.QuantityOrdered,
                        UOMId = roSplit.UOMId,
                        ManagementStructureId = roSplit.ManagementStructureId,
                        NeedByDate = roSplit.NeedByDate,
                        StockLineId = roSplit.StockLineId,
                    };
                    roPartDto.RoPartSplits.Add(roPartSplitObj);
                }
            }

            return roPartDto;
        }

        [HttpPost("vendorPost")]
        public IActionResult CreateAction([FromBody][FromForm] VendorViewModel vendorViewModel, Address address, VendorType vt)
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

                if (vendorViewModel.VendorClassificationIds != null)
                {
                    actionobject.VendorClassificationId = vendorViewModel.VendorClassificationIds[0] ?? null;
                }
                //actionobject.VendorClassificationId = vendorViewModel.VendorClassificationId;
                actionobject.capabilityId = vendorViewModel.capabilityId;
                actionobject.VendorPhone = vendorViewModel.VendorPhone;
                actionobject.VendorPhoneExt = vendorViewModel.VendorPhoneExt;
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
                actionobject.IsDeleted = vendorViewModel.IsDeleted;
                actionobject.CreditTermsId = vendorViewModel.CreditTermsId;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = vendorViewModel.CreatedBy;
                actionobject.UpdatedBy = vendorViewModel.UpdatedBy;
                actionobject.IsAddressForBilling = vendorViewModel.IsAddressForBilling;
                actionobject.IsAddressForShipping = vendorViewModel.IsAddressForShipping;
                actionobject.VendorParentId = vendorViewModel.VendorParentId;

                if (vendorViewModel.IsAllowNettingAPAR == null)
                {
                    actionobject.IsAllowNettingAPAR = false;
                }
                else
                {
                    actionobject.IsAllowNettingAPAR = vendorViewModel.IsAllowNettingAPAR;
                }

                //actionobject.vendorc
                AddAddress(vendorViewModel);
                actionobject.AddressId = vendorViewModel.AddressId.Value;
                _unitOfWork.Vendor.Add(actionobject);
                _unitOfWork.SaveChanges();

                if (actionobject.VendorId > 0)
                {
                    vendorViewModel.VendorId = actionobject.VendorId;
                    AddContact(vendorViewModel);
                }

                if (vendorViewModel.VendorClassificationIds != null)
                {
                    List<ClassificationMapping> listofEClassificationMappings = vendorViewModel
                        .VendorClassificationIds
                        .Select(item => new ClassificationMapping() { ClasificationId = item.Value }
                        ).ToList();
                    _unitOfWork.CommonRepository.CreateClassificationMappings(listofEClassificationMappings, Convert.ToInt32(ModuleEnum.Vendor),
                        actionobject.VendorId, actionobject.CreatedBy);
                }

                if (vendorViewModel.IntegrationPortalIds != null)
                {
                    List<IntegrationPortalMapping> listofIntegrationMappings = vendorViewModel
                        .IntegrationPortalIds
                        .Select(item => new IntegrationPortalMapping() { IntegrationPortalId = item.Value }
                        ).ToList();
                    _unitOfWork.CommonRepository.CreateIntegrationMappings(listofIntegrationMappings, Convert.ToInt32(ModuleEnum.Vendor),
                        actionobject.VendorId, actionobject.CreatedBy);
                }


                if (actionobject.VendorId > 0)
                {
                    if (Convert.ToBoolean(actionobject.IsAddressForShipping))
                    {
                        //_appContext.CustomerShippingAddress.detch
                        VendorShippingAddress data = _context.VendorShippingAddress.AsNoTracking().Where(p => p.AddressId == actionobject.AddressId && p.VendorId == actionobject.VendorId).FirstOrDefault();
                        //_appContext.CustomerShippingAddress.detach(objCustomerShippingAddress);
                        if (data != null)
                        {
                            if (data.VendorShippingAddressId > 0)
                            {
                                data.VendorId = actionobject.VendorId;
                                data.AddressId = actionobject.AddressId;
                                data.MasterCompanyId = actionobject.MasterCompanyId;
                                data.SiteName = actionobject.VendorCode;
                                data.CreatedDate = DateTime.Now;
                                data.UpdatedDate = DateTime.Now;
                                data.CreatedBy = actionobject.CreatedBy;
                                data.UpdatedBy = actionobject.UpdatedBy;
                                data.IsActive = actionobject.IsActive;
                                data.IsPrimary = true;
                                data.IsDeleted = false;
                                _unitOfWork.VendorShippingAddress.Update(data);
                                _context.SaveChanges();
                                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(data.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(data.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), data.UpdatedBy);

                            }
                        }
                        else
                        {
                            VendorShippingAddress objVendorrShippingAddress = new VendorShippingAddress();

                            objVendorrShippingAddress.VendorId = actionobject.VendorId;
                            objVendorrShippingAddress.AddressId = actionobject.AddressId;
                            objVendorrShippingAddress.MasterCompanyId = actionobject.MasterCompanyId;
                            objVendorrShippingAddress.SiteName = actionobject.VendorCode;
                            objVendorrShippingAddress.CreatedDate = DateTime.Now;
                            objVendorrShippingAddress.UpdatedDate = DateTime.Now;
                            objVendorrShippingAddress.CreatedBy = actionobject.CreatedBy;
                            objVendorrShippingAddress.UpdatedBy = actionobject.UpdatedBy;
                            objVendorrShippingAddress.IsActive = actionobject.IsActive;
                            objVendorrShippingAddress.IsPrimary = true;
                            objVendorrShippingAddress.IsDeleted = false;

                            _context.VendorShippingAddress.Add(objVendorrShippingAddress);
                            _context.SaveChanges();
                            _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objVendorrShippingAddress.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(objVendorrShippingAddress.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), objVendorrShippingAddress.UpdatedBy);

                        }

                        _context.SaveChanges();
                    }

                    if (Convert.ToBoolean(actionobject.IsAddressForBilling))
                    {
                        VendorBillingAddress data = _context.VendorBillingAddress.AsNoTracking().Where(p => p.AddressId == actionobject.AddressId && p.VendorId == actionobject.VendorId).FirstOrDefault();

                        if (data != null)
                        {
                            if (data.VendorBillingAddressId > 0)
                            {
                                data.VendorId = actionobject.VendorId;
                                data.MasterCompanyId = actionobject.MasterCompanyId;
                                data.AddressId = Convert.ToInt64(actionobject.AddressId);
                                data.SiteName = actionobject.VendorCode;
                                data.CreatedDate = DateTime.Now;
                                data.UpdatedDate = DateTime.Now;
                                data.CreatedBy = actionobject.CreatedBy;
                                data.UpdatedBy = actionobject.UpdatedBy;
                                data.IsPrimary = true;
                                data.IsActive = true;
                                data.IsDeleted = false;
                                _context.VendorBillingAddress.Update(data);
                                _context.SaveChanges();
                                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(data.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(data.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), data.UpdatedBy);

                            }
                        }
                        else
                        {
                            VendorBillingAddress objVendorBillingAddress = new VendorBillingAddress();

                            objVendorBillingAddress.VendorId = actionobject.VendorId;
                            objVendorBillingAddress.MasterCompanyId = actionobject.MasterCompanyId;
                            objVendorBillingAddress.AddressId = Convert.ToInt64(actionobject.AddressId);
                            objVendorBillingAddress.SiteName = actionobject.VendorCode;
                            objVendorBillingAddress.CreatedDate = DateTime.Now;
                            objVendorBillingAddress.UpdatedDate = DateTime.Now;
                            objVendorBillingAddress.CreatedBy = actionobject.CreatedBy;
                            objVendorBillingAddress.UpdatedBy = actionobject.UpdatedBy;
                            objVendorBillingAddress.IsPrimary = true;
                            objVendorBillingAddress.IsActive = true;
                            objVendorBillingAddress.IsDeleted = false;

                            _context.VendorBillingAddress.Add(objVendorBillingAddress);
                            _context.SaveChanges();
                            _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objVendorBillingAddress.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(objVendorBillingAddress.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), objVendorBillingAddress.UpdatedBy);

                        }

                        _context.SaveChanges();
                    }

                    if (Convert.ToBoolean(actionobject.IsVendorAlsoCustomer))
                    {
                        DAL.Models.Customer customerObject = new DAL.Models.Customer();

                        customerObject.CustomerAffiliationId = vendorViewModel.VendorTypeId;
                        customerObject.CurrencyId = vendorViewModel.CurrencyId;
                        customerObject.CreditTermsId = vendorViewModel.CreditTermsId;
                        customerObject.Name = vendorViewModel.VendorName;
                        customerObject.Parent = 0;
                        customerObject.Email = vendorViewModel.VendorEmail; ;
                        customerObject.CustomerPhone = vendorViewModel.VendorPhone;
                        customerObject.CustomerPhoneExt = vendorViewModel.VendorPhoneExt;
                        //customerObject.AnnualQuota = vendorViewModel.AnnualQuota;
                        //customerObject.AnnualRevenuePotential = vendorViewModel.AnnualRevenuePotential;
                        customerObject.CustomerParentName = vendorViewModel.VendorParentName;
                        //customerObject.ScanDocuments = vendorViewModel.ScanDocuments;
                        //customerObject.PBHCustomerMemo = vendorViewModel.PBHCustomerMemo;
                        //customerObject.RestrictPMA = vendorViewModel.RestrictPMA;
                        customerObject.IsAddressForBilling = vendorViewModel.IsAddressForBilling;
                        customerObject.IsAddressForShipping = vendorViewModel.IsAddressForShipping;
                        //customerObject.EDI = vendorViewModel.EDI;
                        //customerObject.IsAeroExchange = vendorViewModel.IsAeroExchange;
                        customerObject.AeroExchangeDescription = vendorViewModel.AeroExchangeDescription;
                        customerObject.EDIDescription = vendorViewModel.EDIDescription;
                        if (vendorViewModel.IsAllowNettingAPAR != null)
                        {
                            customerObject.AllowNettingOfAPAR = vendorViewModel.IsAllowNettingAPAR;
                        }
                        else
                        {
                            customerObject.AllowNettingOfAPAR = false;
                        }

                        //customerObject.CustomerClassificationId = 0;
                        //customerObject.RestrictBERMemo = vendorViewModel.RestrictBERMemo;
                        var CustClassficationData = _context.CustomerClassification.Where(p => p.IsActive == true).OrderBy(p => p.CustomerClassificationId).FirstOrDefault();

                        if (CustClassficationData != null)
                        {
                            customerObject.CustomerClassificationId = CustClassficationData.CustomerClassificationId;
                        }

                        //if (vendorViewModel.CustomerClassificationIds != null)
                        //{ 
                        //    customerObject.CustomerClassificationId = vendorViewModel.CustomerClassificationIds[0] ?? null; 
                        //}

                        customerObject.CustomerTypeId = vendorViewModel.VendorTypeId;
                        //customerObject.CustomerType = CustomerType;
                        customerObject.IsCustomerAlsoVendor = vendorViewModel.IsVendorAlsoCustomer;
                        //customerObject.IsPBHCustomer = vendorViewModel.IsPBHCustomer;
                        customerObject.CustomerCode = vendorViewModel.VendorCode;
                        //customerObject.ContractReference = vendorViewModel.ContractReference;
                        //customerObject.DoingBuinessAsName = vendorViewModel.DoingBuinessAsName;
                        customerObject.CustomerURL = vendorViewModel.VendorURL;
                        //customerObject.CustomerClassification = vendorViewModel.CustomerClassification;
                        //customerObject.CustomerAddress = vendorViewModel.CustomerAddress;
                        //customerObject.RestrictBER = vendorViewModel.RestrictBER;
                        //customerObject.RestrictPMA = vendorViewModel.RestrictPMA;
                        //customerObject.CustomerBillingAddress = vendorViewModel.CustomerBillingAddress;
                        //customerObject.RestrictPMAMemo = vendorViewModel.RestrictPMAMemo;
                        customerObject.MasterCompanyId = vendorViewModel.MasterCompanyId;

                        //customerObject.ATAChapterId = vendorViewModel.ATAChapterId;
                        //customerObject.GeneralCurrencyId = vendorViewModel.CurrencyId;
                        //customerObject.ataSubChapterId = vendorViewModel.ataSubChapterId;
                        customerObject.CreatedDate = DateTime.Now;
                        customerObject.UpdatedDate = DateTime.Now;
                        customerObject.CreatedBy = vendorViewModel.CreatedBy;
                        customerObject.UpdatedBy = vendorViewModel.UpdatedBy;
                        customerObject.IsActive = true;
                        customerObject.IsDeleted = false;
                        customerObject.AddressId = actionobject.AddressId;
                        _context.Customer.Add(customerObject);
                        _context.SaveChanges();

                        if (customerObject.CustomerId > 0)
                        {
                            if (Convert.ToBoolean(customerObject.IsAddressForShipping))
                            {
                                _unitOfWork.Customer.AddCustomerShippingAddress(customerObject);
                            }

                            if (Convert.ToBoolean(customerObject.IsAddressForBilling))
                            {
                                _unitOfWork.Customer.AddCustomerBillinggAddress(customerObject);
                            }
                        }
                    }
                }


                //if (Request.Form.Files.Count > 0)
                //{
                //    actionobject.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, actionobject.VendorId, Convert.ToInt32(ModuleEnum.Vendor), Convert.ToString(ModuleEnum.Vendor), actionobject.UpdatedBy, actionobject.MasterCompanyId);
                //}


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
        public IActionResult UpdateVendorList(long id, [FromBody][FromForm] VendorViewModel vendorViewModel, VendorType vt)
        {
            if (ModelState.IsValid)
            {
                if (vendorViewModel == null)
                    return BadRequest($"{nameof(vendorViewModel)} cannot be null");
                var actionobject = _unitOfWork.Vendor.GetSingleOrDefault(c => c.VendorId == id);
                var address = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == actionobject.AddressId);

                //vt.VendorTypeId = 1;
                vendorViewModel.MasterCompanyId = 1;
                actionobject.VendorId = vendorViewModel.VendorId;
                actionobject.VendorName = vendorViewModel.VendorName;
                actionobject.VendorPhoneExt = vendorViewModel.VendorPhoneExt;
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
                actionobject.IsAddressForBilling = vendorViewModel.IsAddressForBilling;
                actionobject.IsAddressForShipping = vendorViewModel.IsAddressForShipping;
                actionobject.VendorParentId = vendorViewModel.VendorParentId;

                if (vendorViewModel.IsAllowNettingAPAR == null)
                {
                    actionobject.IsAllowNettingAPAR = false;
                }
                else
                {
                    actionobject.IsAllowNettingAPAR = vendorViewModel.IsAllowNettingAPAR;
                }

                address.Line1 = vendorViewModel.Address1;
                address.Line2 = vendorViewModel.Address2;
                address.Line3 = vendorViewModel.Address3;
                address.PostalCode = vendorViewModel.PostalCode;
                //address.VendorPhone = vendorViewModel.VendorPhone;
                address.StateOrProvince = vendorViewModel.StateOrProvince;
                address.City = vendorViewModel.City;
                address.Country = vendorViewModel.Country;
                address.MasterCompanyId = 1;
                address.CreatedBy = vendorViewModel.CreatedBy ?? "Admin"; //Hotfix
                address.UpdatedBy = vendorViewModel.UpdatedBy ?? "Admin";//Hotfix
                address.CreatedDate = DateTime.Now;

                _unitOfWork.Vendor.Update(actionobject);
                _unitOfWork.SaveChanges();

                if (actionobject.VendorId > 0)
                {
                    vendorViewModel.VendorId = actionobject.VendorId;
                    AddContact(vendorViewModel);
                }

                address.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(address);
                _unitOfWork.SaveChanges();


                if (vendorViewModel.VendorClassificationIds != null)
                {
                    var classificationList = _context.ClassificationMapping.Where(a => a.ReferenceId == id && a.ModuleId == Convert.ToInt32(ModuleEnum.Vendor)).ToList();

                    if (classificationList.Count > 0)
                    {
                        foreach (var objData in classificationList)
                        {
                            _context.ClassificationMapping.Remove(objData);
                            _unitOfWork.SaveChanges();
                        }
                    }

                    List<ClassificationMapping> listofEClassificationMappings = vendorViewModel
                        .VendorClassificationIds
                        .Select(item => new ClassificationMapping() { ClasificationId = item.Value }
                        ).ToList();
                    _unitOfWork.CommonRepository.CreateClassificationMappings(listofEClassificationMappings, Convert.ToInt32(ModuleEnum.Vendor),
                        actionobject.VendorId, actionobject.CreatedBy);
                }

                if (vendorViewModel.IntegrationPortalIds != null)
                {
                    var integrationPortalList = _context.IntegrationPortalMapping.Where(a => a.ReferenceId == id && a.ModuleId == Convert.ToInt32(ModuleEnum.Vendor)).ToList();

                    if (integrationPortalList.Count > 0)
                    {
                        foreach (var objData in integrationPortalList)
                        {
                            _context.IntegrationPortalMapping.Remove(objData);
                            _unitOfWork.SaveChanges();
                        }
                    }

                    List<IntegrationPortalMapping> listofIntegrationMappings = vendorViewModel
                        .IntegrationPortalIds
                        .Select(item => new IntegrationPortalMapping() { IntegrationPortalId = item.Value }
                        ).ToList();
                    _unitOfWork.CommonRepository.CreateIntegrationMappings(listofIntegrationMappings, Convert.ToInt32(ModuleEnum.Vendor),
                        actionobject.VendorId, actionobject.CreatedBy);
                }


                if (actionobject.VendorId > 0)
                {
                    if (Convert.ToBoolean(actionobject.IsAddressForShipping))
                    {
                        //_appContext.CustomerShippingAddress.detch
                        VendorShippingAddress data = _context.VendorShippingAddress.AsNoTracking().Where(p => p.AddressId == actionobject.AddressId && p.VendorId == actionobject.VendorId).FirstOrDefault();
                        //_appContext.CustomerShippingAddress.detach(objCustomerShippingAddress);
                        if (data != null)
                        {
                            if (data.VendorShippingAddressId > 0)
                            {
                                data.VendorId = actionobject.VendorId;
                                data.AddressId = actionobject.AddressId;
                                data.MasterCompanyId = actionobject.MasterCompanyId;
                                data.SiteName = actionobject.VendorCode;
                                data.CreatedDate = DateTime.Now;
                                data.UpdatedDate = DateTime.Now;
                                data.CreatedBy = actionobject.CreatedBy;
                                data.UpdatedBy = actionobject.UpdatedBy;
                                data.IsActive = actionobject.IsActive;
                                //data.IsPrimary = true;
                                data.IsDeleted = false;
                                _unitOfWork.VendorShippingAddress.Update(data);
                                _context.SaveChanges();
                                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(actionobject.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(data.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), actionobject.UpdatedBy);

                            }
                        }
                        else
                        {
                            VendorShippingAddress objVendorrShippingAddress = new VendorShippingAddress();

                            objVendorrShippingAddress.VendorId = actionobject.VendorId;
                            objVendorrShippingAddress.AddressId = actionobject.AddressId;
                            objVendorrShippingAddress.MasterCompanyId = actionobject.MasterCompanyId;
                            objVendorrShippingAddress.SiteName = actionobject.VendorCode;
                            objVendorrShippingAddress.CreatedDate = DateTime.Now;
                            objVendorrShippingAddress.UpdatedDate = DateTime.Now;
                            objVendorrShippingAddress.CreatedBy = actionobject.CreatedBy;
                            objVendorrShippingAddress.UpdatedBy = actionobject.UpdatedBy;
                            objVendorrShippingAddress.IsActive = actionobject.IsActive;
                            //objVendorrShippingAddress.IsPrimary = true;
                            objVendorrShippingAddress.IsDeleted = false;

                            _context.VendorShippingAddress.Add(objVendorrShippingAddress);
                            _context.SaveChanges();
                            _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(actionobject.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(objVendorrShippingAddress.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), actionobject.UpdatedBy);

                        }

                        _context.SaveChanges();
                    }

                    if (Convert.ToBoolean(actionobject.IsAddressForBilling))
                    {
                        var shippingList = _context.VendorBillingAddress.AsNoTracking().Where(p => p.VendorId == actionobject.VendorId).ToList();
                        var custShipping = shippingList.Where(p => p.IsPrimary == true).FirstOrDefault();

                        VendorBillingAddress data = _context.VendorBillingAddress.AsNoTracking().Where(p => p.AddressId == actionobject.AddressId && p.VendorId == actionobject.VendorId).FirstOrDefault();

                        if (data != null)
                        {
                            if (custShipping != null && data != null && custShipping.VendorBillingAddressId != data.VendorBillingAddressId)
                            {
                                custShipping.IsPrimary = false;

                                VendorBillingAddress ba = new VendorBillingAddress();

                                ba.VendorBillingAddressId = custShipping.VendorBillingAddressId;
                                ba.UpdatedDate = DateTime.Now;
                                ba.UpdatedBy = actionobject.UpdatedBy;
                                ba.IsPrimary = false;

                                _context.VendorBillingAddress.Attach(ba);
                                _context.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                                _context.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                _context.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                                _context.SaveChanges();


                                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(actionobject.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(custShipping.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), actionobject.UpdatedBy);
                            }
                            if (data.VendorBillingAddressId > 0)
                            {
                                data.VendorId = actionobject.VendorId;
                                data.MasterCompanyId = actionobject.MasterCompanyId;
                                data.AddressId = Convert.ToInt64(actionobject.AddressId);
                                data.SiteName = actionobject.VendorCode;
                                data.CreatedDate = DateTime.Now;
                                data.UpdatedDate = DateTime.Now;
                                data.CreatedBy = actionobject.CreatedBy;
                                data.UpdatedBy = actionobject.UpdatedBy;
                                data.IsPrimary = true;
                                data.IsActive = true;
                                data.IsDeleted = false;
                                _context.VendorBillingAddress.Update(data);
                                _context.SaveChanges();
                                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(actionobject.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(data.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), actionobject.UpdatedBy);

                            }
                        }
                        else
                        {
                            if (custShipping != null)
                            {
                                VendorBillingAddress ba = new VendorBillingAddress();

                                ba.VendorBillingAddressId = custShipping.VendorBillingAddressId;
                                ba.UpdatedDate = DateTime.Now;
                                ba.UpdatedBy = actionobject.UpdatedBy;
                                ba.IsPrimary = false;

                                _context.VendorBillingAddress.Attach(ba);
                                _context.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                                _context.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                _context.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                                _context.SaveChanges();
                                //custShipping.IsPrimary = false;
                                //_appContext.CustomerShippingAddress.Update(custShipping);
                                //_appContext.SaveChanges();
                                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(actionobject.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(custShipping.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), actionobject.UpdatedBy);
                            }
                            VendorBillingAddress objVendorBillingAddress = new VendorBillingAddress();

                            objVendorBillingAddress.VendorId = actionobject.VendorId;
                            objVendorBillingAddress.MasterCompanyId = actionobject.MasterCompanyId;
                            objVendorBillingAddress.AddressId = Convert.ToInt64(actionobject.AddressId);
                            objVendorBillingAddress.SiteName = actionobject.VendorCode;
                            objVendorBillingAddress.CreatedDate = DateTime.Now;
                            objVendorBillingAddress.UpdatedDate = DateTime.Now;
                            objVendorBillingAddress.CreatedBy = actionobject.CreatedBy;
                            objVendorBillingAddress.UpdatedBy = actionobject.UpdatedBy;
                            objVendorBillingAddress.IsPrimary = true;
                            objVendorBillingAddress.IsActive = true;
                            objVendorBillingAddress.IsDeleted = false;

                            _context.VendorBillingAddress.Add(objVendorBillingAddress);
                            _context.SaveChanges();
                            _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(actionobject.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(objVendorBillingAddress.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), actionobject.UpdatedBy);

                        }

                        _context.SaveChanges();
                    }

                    var custData = _context.Customer.Where(p => p.Name.ToLower() == vendorViewModel.VendorName.ToLower()).FirstOrDefault();
                    if (custData == null)
                    {
                        if (Convert.ToBoolean(actionobject.IsVendorAlsoCustomer))
                        {
                            DAL.Models.Customer customerObject = new DAL.Models.Customer();

                            customerObject.CustomerAffiliationId = vendorViewModel.VendorTypeId;
                            customerObject.CurrencyId = vendorViewModel.CurrencyId;
                            customerObject.CreditTermsId = vendorViewModel.CreditTermsId;
                            customerObject.Name = vendorViewModel.VendorName;
                            customerObject.Parent = 0;
                            customerObject.Email = vendorViewModel.VendorEmail; ;
                            customerObject.CustomerPhone = vendorViewModel.VendorPhone;
                            customerObject.CustomerPhoneExt = vendorViewModel.VendorPhoneExt;
                            //customerObject.AnnualQuota = vendorViewModel.AnnualQuota;
                            //customerObject.AnnualRevenuePotential = vendorViewModel.AnnualRevenuePotential;
                            customerObject.CustomerParentName = vendorViewModel.VendorParentName;
                            //customerObject.ScanDocuments = vendorViewModel.ScanDocuments;
                            //customerObject.PBHCustomerMemo = vendorViewModel.PBHCustomerMemo;
                            //customerObject.RestrictPMA = vendorViewModel.RestrictPMA;
                            customerObject.IsAddressForBilling = vendorViewModel.IsAddressForBilling;
                            customerObject.IsAddressForShipping = vendorViewModel.IsAddressForShipping;
                            //customerObject.EDI = vendorViewModel.EDI;
                            //customerObject.IsAeroExchange = vendorViewModel.IsAeroExchange;
                            customerObject.AeroExchangeDescription = vendorViewModel.AeroExchangeDescription;
                            customerObject.EDIDescription = vendorViewModel.EDIDescription;
                            if (vendorViewModel.IsAllowNettingAPAR != null)
                            {
                                customerObject.AllowNettingOfAPAR = vendorViewModel.IsAllowNettingAPAR;
                            }
                            else
                            {
                                customerObject.AllowNettingOfAPAR = false;
                            }


                            var CustClassficationData = _context.CustomerClassification.Where(p => p.IsActive == true).OrderBy(p => p.CustomerClassificationId).FirstOrDefault();

                            if (CustClassficationData != null)
                            {
                                customerObject.CustomerClassificationId = CustClassficationData.CustomerClassificationId;
                            }

                            customerObject.CustomerTypeId = vendorViewModel.VendorTypeId;
                            //customerObject.CustomerType = CustomerType;
                            customerObject.IsCustomerAlsoVendor = vendorViewModel.IsVendorAlsoCustomer;
                            //customerObject.IsPBHCustomer = vendorViewModel.IsPBHCustomer;
                            customerObject.CustomerCode = vendorViewModel.VendorCode;
                            //customerObject.ContractReference = vendorViewModel.ContractReference;
                            //customerObject.DoingBuinessAsName = vendorViewModel.DoingBuinessAsName;
                            customerObject.CustomerURL = vendorViewModel.VendorURL;

                            customerObject.MasterCompanyId = vendorViewModel.MasterCompanyId;

                            //customerObject.ATAChapterId = vendorViewModel.ATAChapterId;
                            //customerObject.GeneralCurrencyId = vendorViewModel.CurrencyId;
                            //customerObject.ataSubChapterId = vendorViewModel.ataSubChapterId;
                            customerObject.CreatedDate = DateTime.Now;
                            customerObject.UpdatedDate = DateTime.Now;
                            customerObject.CreatedBy = vendorViewModel.CreatedBy;
                            customerObject.UpdatedBy = vendorViewModel.UpdatedBy;
                            customerObject.IsActive = true;
                            customerObject.IsDeleted = false;
                            customerObject.AddressId = actionobject.AddressId;
                            _context.Customer.Add(customerObject);
                            _context.SaveChanges();

                            if (customerObject.CustomerId > 0)
                            {
                                if (Convert.ToBoolean(customerObject.IsAddressForShipping))
                                {
                                    _unitOfWork.Customer.AddCustomerShippingAddress(customerObject);
                                }

                                if (Convert.ToBoolean(customerObject.IsAddressForBilling))
                                {
                                    _unitOfWork.Customer.AddCustomerBillinggAddress(customerObject);
                                }
                            }
                        }
                    }


                }



                //if (Request.Form.Files.Count > 0)
                //{
                //    actionobject.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, actionobject.VendorId, Convert.ToInt32(ModuleEnum.Vendor), Convert.ToString(ModuleEnum.Vendor), actionobject.UpdatedBy, actionobject.MasterCompanyId);
                //}
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public void AddContact(VendorViewModel vendorViewModel)
        {
            try
            {

                VendorContact vdata = _context.VendorContact.AsNoTracking().Where(p => p.VendorId == vendorViewModel.VendorId).FirstOrDefault();
                if (vdata == null)
                {
                    Contact contactObj = new Contact();

                    contactObj.Email = vendorViewModel.VendorEmail;
                    contactObj.FirstName = vendorViewModel.VendorName;
                    contactObj.LastName = "NA";
                    contactObj.WorkPhone = vendorViewModel.VendorPhone;
                    contactObj.WorkPhoneExtn = vendorViewModel.VendorPhoneExt;
                    contactObj.MasterCompanyId = vendorViewModel.MasterCompanyId;
                    contactObj.IsActive = true;
                    contactObj.CreatedDate = DateTime.Now;
                    contactObj.UpdatedDate = DateTime.Now;
                    contactObj.CreatedBy = vendorViewModel.CreatedBy;
                    contactObj.UpdatedBy = vendorViewModel.UpdatedBy;

                    _unitOfWork.ContactRepository.Add(contactObj);
                    _unitOfWork.SaveChanges();

                    VendorContact vendorContactObj = new VendorContact();

                    vendorContactObj.ContactId = contactObj.ContactId;
                    vendorContactObj.VendorId = vendorViewModel.VendorId;
                    vendorContactObj.IsDefaultContact = true;
                    vendorContactObj.RecordCreateDate = DateTime.Now; ;
                    vendorContactObj.MasterCompanyId = vendorViewModel.MasterCompanyId;
                    vendorContactObj.IsActive = true;
                    vendorContactObj.CreatedDate = DateTime.Now;
                    vendorContactObj.UpdatedDate = DateTime.Now;
                    vendorContactObj.CreatedBy = vendorViewModel.CreatedBy;
                    vendorContactObj.UpdatedBy = vendorViewModel.UpdatedBy;
                    vendorContactObj.IsDeleted = false;
                    _unitOfWork.vendorContactRepository.Add(vendorContactObj);
                    _unitOfWork.SaveChanges();
                    _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(vendorContactObj.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorContactObj.VendorContactId), vendorContactObj.UpdatedBy);

                }

            }
            catch (Exception)
            {

                throw;
            }
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
                discObj.CreatedDate = DateTime.Now;
                discObj.IsActive = true;
                discObj.IsDeleted = false;
                discObj.MasterCompanyId = 1;
                discObj.UpdatedDate = DateTime.Now;
                discObj.CreatedBy = discountViewModel.CreatedBy;
                discObj.UpdatedBy = discountViewModel.UpdatedBy;


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
                contactObj.IsDefaultContact = contactViewModel.IsDefaultContact;
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
                contactObj.WorkPhoneExtn = contactViewModel.WorkPhoneExtn;
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
                contactObj.IsDeleted = false;

                if (vendorContactViewModel.IsDefaultContact == true)
                {
                    var vendorConcatData = _unitOfWork.vendorContactRepository.GetAll().Where(p => p.VendorId == contactObj.VendorId && p.IsDefaultContact == true).FirstOrDefault();

                    if (vendorConcatData != null)
                    {
                        vendorConcatData.IsDefaultContact = false;
                        vendorConcatData.UpdatedBy = vendorContactViewModel.UpdatedBy;
                        vendorConcatData.UpdatedDate = DateTime.Now;
                        _unitOfWork.vendorContactRepository.Update(vendorConcatData);

                        _unitOfWork.SaveChanges();
                        _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(vendorConcatData.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorConcatData.VendorContactId), vendorConcatData.UpdatedBy);
                    }

                }

                _unitOfWork.vendorContactRepository.Add(contactObj);
                _unitOfWork.SaveChanges();
                _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(contactObj.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(contactObj.VendorContactId), contactObj.UpdatedBy);



            }

            return Ok(ModelState);
        }

        [HttpPut("vendorUpdateforActive/{id}")]
        public IActionResult vendorsUpdateforActive(long id, [FromBody]VendorViewModel vendorViewModel)
        {
            if (ModelState.IsValid)
            {
                var VendorrObj = _unitOfWork.Vendor.GetSingleOrDefault(a => a.VendorId == id);
                if (VendorrObj != null)
                {
                    //vendorViewModel.MasterCompanyId = 1;
                    VendorrObj.IsActive = vendorViewModel.IsActive;
                    VendorrObj.UpdatedDate = DateTime.Now;
                    VendorrObj.UpdatedBy = vendorViewModel.UpdatedBy;
                    VendorrObj.VendorId = vendorViewModel.VendorId;
                    _unitOfWork.Vendor.Update(VendorrObj);
                    _unitOfWork.SaveChanges();
                }

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
                var contactObj = _unitOfWork.vendorContactRepository.GetSingleOrDefault(a => a.ContactId == id);
                _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(contactObj.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(contactObj.VendorContactId), VendorcontactObj.UpdatedBy);

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
                VendorpaymenttObj.IsActive = Convert.ToBoolean(vendorPaymentViewModel.IsActive);
                VendorpaymenttObj.UpdatedDate = DateTime.Now;
                VendorpaymenttObj.UpdatedBy = vendorPaymentViewModel.UpdatedBy;
                VendorpaymenttObj.CheckPaymentId = vendorPaymentViewModel.CheckPaymentId;
                _unitOfWork.vendorCheckPaymentRepository.Update(VendorpaymenttObj);
                _unitOfWork.SaveChanges();

                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(VendorpaymenttObj.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(VendorpaymenttObj.CheckPaymentId), Convert.ToInt32(AddressTypeEnum.CheckPayment), VendorpaymenttObj.UpdatedBy);

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
                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(VendorshippingObj.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(VendorshippingObj.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), VendorshippingObj.UpdatedBy);

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
                contactObj.WorkPhoneExtn = contactViewModel.WorkPhoneExtn;
                _unitOfWork.ContactRepository.Update(contactObj);
                _unitOfWork.SaveChanges();
                var vendorContactObj = _unitOfWork.vendorContactRepository.GetVendorContactsbyContctId(id);



                if (Convert.ToBoolean(contactViewModel.IsDefaultContact) == true)
                {
                    var vendorConcatData = _unitOfWork.vendorContactRepository.GetAll().Where(p => p.VendorId == vendorContactObj.VendorId && p.IsDefaultContact == true).FirstOrDefault();

                    if (vendorConcatData != null && vendorConcatData.VendorContactId != vendorContactObj.VendorContactId)
                    {
                        vendorConcatData.IsDefaultContact = false;
                        vendorConcatData.UpdatedDate = DateTime.Now;
                        vendorConcatData.UpdatedBy = contactViewModel.UpdatedBy;
                        _unitOfWork.vendorContactRepository.Update(vendorConcatData);

                        _unitOfWork.SaveChanges();
                        _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(vendorConcatData.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorConcatData.VendorContactId), vendorConcatData.UpdatedBy);
                    }
                }
                vendorContactObj.IsDefaultContact = Convert.ToBoolean(contactViewModel.IsDefaultContact);

                _unitOfWork.vendorContactRepository.Update(vendorContactObj);
                _unitOfWork.SaveChanges();
                _unitOfWork.CommonRepository.ContactsHistory(Convert.ToInt64(vendorContactObj.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorContactObj.VendorContactId), vendorContactObj.UpdatedBy);


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
                if (vendorViewModel.Master1099s.Count > 0)
                {
                    foreach (var item in vendorViewModel.Master1099s)
                    {
                        VendorProcess1099 vendorprocess = new VendorProcess1099();
                        vendorprocess.IsActive = true;
                        vendorprocess.VendorId = id;
                        vendorprocess.Master1099Id = item.Master1099Id;
                        if (item.VendorProcess1099Id != 0)
                        {
                            vendorprocess.VendorProcess1099Id = item.VendorProcess1099Id;
                        }
                        vendorprocess.CreatedBy = vendorViewModel.CreatedBy;
                        vendorprocess.UpdatedBy = vendorViewModel.UpdatedBy;
                        vendorprocess.CreatedDate = DateTime.Now;
                        vendorprocess.UpdatedDate = DateTime.Now;
                        vendorprocess.IsDefaultRadio = item.IsDefaultRadio;
                        vendorprocess.IsDefaultCheck = item.IsDefaultCheck;
                        if (vendorprocess.VendorProcess1099Id > 0)
                        {
                            _context.VendorProcess1099.Update(vendorprocess);
                        }
                        else
                            _context.VendorProcess1099.Add(vendorprocess);

                    }
                }

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
                address.CreatedBy = vendorshipping.CreatedBy ?? "Admin"; //Hotfix
                address.UpdatedBy = vendorshipping.UpdatedBy ?? "Admin";//Hotfix

                address.UpdatedDate = DateTime.Now;
                if (vendorshipping.AddressId > 0)
                {
                    address.CreatedDate = vendorshipping.CreatedDate;
                    address.AddressId = vendorshipping.AddressId;
                    _context.Address.Update(address);

                }
                else
                {
                    address.CreatedDate = DateTime.Now;
                    _context.Address.Add(address);
                }
                _context.SaveChanges();
                updateVendorShippingAddress(vendorShippingAdressViewModel, address.AddressId, vendorshipping, address);
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

                if (vendorshipping.IsPrimary == true)
                {
                    var vendorConcatData = _unitOfWork.VendorShippingAddress.GetAll().Where(p => p.VendorId == vendorshipping.VendorId).ToList();

                    foreach (var objContactdata in vendorConcatData)
                    {
                        objContactdata.IsPrimary = false;
                        _unitOfWork.VendorShippingAddress.Update(objContactdata);

                        _unitOfWork.SaveChanges();
                        _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objContactdata.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(objContactdata.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), objContactdata.UpdatedBy);
                    }
                }
                VendorShippingAddress vendorShippingAddressObj = new VendorShippingAddress();
                vendorShippingAddressObj.IsActive = true;
                vendorShippingAddressObj.VendorId = vendorshipping.VendorId;
                vendorShippingAddressObj.SiteName = vendorshipping.SiteName;
                vendorShippingAddressObj.MasterCompanyId = 1;
                vendorShippingAddressObj.IsActive = vendorshippingAddressViewModel.IsActive;
                vendorShippingAddressObj.AddressId = id;
                vendorShippingAddressObj.UpdatedDate = DateTime.Now;
                vendorShippingAddressObj.CreatedBy = vendorshipping.CreatedBy;
                vendorShippingAddressObj.UpdatedBy = vendorshipping.UpdatedBy;
                vendorShippingAddressObj.IsPrimary = vendorshipping.IsPrimary;
                if (vendorshipping.VendorShippingAddressId > 0)
                {
                    vendorShippingAddressObj.CreatedDate = vendorshipping.CreatedDate;
                    vendorShippingAddressObj.VendorShippingAddressId = vendorshipping.VendorShippingAddressId;
                    _unitOfWork.VendorShippingAddress.Update(vendorShippingAddressObj);
                    _unitOfWork.SaveChanges();
                    _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(vendorShippingAddressObj.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorShippingAddressObj.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), vendorShippingAddressObj.UpdatedBy);

                }
                else
                {
                    vendorShippingAddressObj.CreatedDate = DateTime.Now;
                    _unitOfWork.VendorShippingAddress.Add(vendorShippingAddressObj);
                    _unitOfWork.SaveChanges();
                    _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(vendorShippingAddressObj.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorShippingAddressObj.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), vendorShippingAddressObj.UpdatedBy);

                }

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
                address.CreatedBy = checkPaymentViewModel.CreatedBy ?? "Admin"; //HotFix
                address.UpdatedBy = checkPaymentViewModel.UpdatedBy ?? "Admin"; //HotFix
                address.CreatedDate = DateTime.Now;
                address.UpdatedDate = DateTime.Now;
                address.IsActive = true;
                _unitOfWork.Address.Add(address);
                _unitOfWork.SaveChanges();
                checkPaymentObj.AddressId = address.AddressId.Value;

                if (checkPaymentViewModel.IsPrimayPayment == true)
                {
                    var vendorConcatData = (from cp in _context.CheckPayment
                                            join vcp in _context.VendorCheckPayment on cp.CheckPaymentId equals vcp.CheckPaymentId
                                            where cp.IsPrimayPayment == true && vcp.VendorId == checkPaymentViewModel.VendorId
                                            select cp).FirstOrDefault();

                    if (vendorConcatData != null)
                    {

                        vendorConcatData.IsPrimayPayment = false;
                        _unitOfWork.vendorPaymentRepository.Update(vendorConcatData);
                        _unitOfWork.SaveChanges();
                        _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(checkPaymentViewModel.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorConcatData.CheckPaymentId), Convert.ToInt32(AddressTypeEnum.CheckPayment), vendorConcatData.UpdatedBy);

                    }
                }

                _unitOfWork.vendorPaymentRepository.Add(checkPaymentObj);
                _unitOfWork.SaveChanges();
                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(checkPaymentViewModel.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(checkPaymentObj.CheckPaymentId), Convert.ToInt32(AddressTypeEnum.CheckPayment), checkPaymentObj.UpdatedBy);

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
                addressObj.CreatedBy = checkPaymentViewModel.CreatedBy;
                addressObj.UpdatedBy = checkPaymentViewModel.UpdatedBy;
                addressObj.CreatedDate = DateTime.Now;
                addressObj.UpdatedDate = DateTime.Now;
                _unitOfWork.Address.Update(addressObj);

                if (checkPaymentViewModel.IsPrimayPayment == true)
                {
                    var vendorConcatData = (from cp in _context.CheckPayment
                                            join vcp in _context.VendorCheckPayment on cp.CheckPaymentId equals vcp.CheckPaymentId
                                            where cp.IsPrimayPayment == true && vcp.VendorId == checkPaymentViewModel.VendorId
                                            select cp).FirstOrDefault();

                    if (vendorConcatData != null && vendorConcatData.CheckPaymentId != checkPaymentObj.CheckPaymentId)
                    {
                        vendorConcatData.IsPrimayPayment = false;
                        vendorConcatData.UpdatedBy = checkPaymentViewModel.UpdatedBy;
                        vendorConcatData.UpdatedDate = DateTime.Now;
                        _unitOfWork.vendorPaymentRepository.Update(vendorConcatData);
                        _unitOfWork.SaveChanges();
                        _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(checkPaymentViewModel.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorConcatData.CheckPaymentId), Convert.ToInt32(AddressTypeEnum.CheckPayment), vendorConcatData.UpdatedBy);


                    }
                }
                checkPaymentObj.IsPrimayPayment = checkPaymentViewModel.IsPrimayPayment;

                _unitOfWork.vendorPaymentRepository.Update(checkPaymentObj);
                _unitOfWork.SaveChanges();
                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(checkPaymentViewModel.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(checkPaymentObj.CheckPaymentId), Convert.ToInt32(AddressTypeEnum.CheckPayment), checkPaymentObj.UpdatedBy);

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
                address.StateOrProvince = internationalWirePaymentmodel.StateOrProvince;
                address.City = internationalWirePaymentmodel.City;
                address.Country = internationalWirePaymentmodel.Country;
                address.MasterCompanyId = 1;
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
                //vendorCheckPaymentobj.IsActive = true;
                vendorCheckPaymentobj.VendorId = vendorDomesticWirePaymentViewModel.VendorId;
                vendorCheckPaymentobj.MasterCompanyId = 1;
                //vendorCheckPaymentobj.IsActive = vendorDomesticWirePaymentViewModel.IsActive;
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
                address.StateOrProvince = internationalWirePaymentViewModel.StateOrProvince;
                address.City = internationalWirePaymentViewModel.City;
                address.Country = internationalWirePaymentViewModel.Country;
                address.MasterCompanyId = 1;
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
                //defaultPaymentObj.IsActive = true;
                defaultPaymentObj.MasterCompanyId = 1;
                //defaultPaymentObj.IsActive = vendorPaymentViewModel.IsActive;
                defaultPaymentObj.DefaultPaymentMethod = vendorPaymentViewModel.DefaultPaymentMethod;
                defaultPaymentObj.VendorId = vendorPaymentViewModel.VendorId;
                defaultPaymentObj.CreatedDate = DateTime.Now;
                defaultPaymentObj.UpdatedDate = DateTime.Now;
                defaultPaymentObj.CreatedBy = vendorPaymentViewModel.CreatedBy;
                defaultPaymentObj.UpdatedBy = vendorPaymentViewModel.UpdatedBy;
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
                //defaultObj.IsActive = vendorPaymentViewModel.IsActive;
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
                //vendorInternationalPaymentobj.IsActive = true;
                vendorInternationalPaymentobj.VendorId = vendorInternationlWirePaymentViewModel.VendorId;
                vendorInternationalPaymentobj.MasterCompanyId = 1;
                //vendorInternationalPaymentobj.IsActive = vendorInternationlWirePaymentViewModel.IsActive;
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


                if (vendorShippingViewModel.IsPrimary == true)
                {
                    var vendorConcatData = _unitOfWork.VendorShippingAddress.GetAll().Where(p => p.VendorId == vendorShippingViewModel.VendorId && p.IsPrimary == true).FirstOrDefault();

                    if (vendorConcatData != null && vendorConcatData.VendorShippingAddressId != checkPaymentObj.VendorShippingAddressId)
                    {
                        vendorConcatData.IsPrimary = false;
                        _unitOfWork.VendorShippingAddress.Update(vendorConcatData);

                        _unitOfWork.SaveChanges();
                        _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(vendorConcatData.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorConcatData.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), vendorConcatData.UpdatedBy);
                    }
                }


                if (checkPaymentObj != null)
                {
                    var addressObj = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == checkPaymentObj.AddressId);
                    checkPaymentObj.IsActive = true;
                    checkPaymentObj.MasterCompanyId = 1;
                    checkPaymentObj.IsActive = vendorShippingViewModel.IsActive;
                    checkPaymentObj.SiteName = vendorShippingViewModel.SiteName;
                    checkPaymentObj.CreatedDate = DateTime.Now;
                    checkPaymentObj.UpdatedDate = DateTime.Now;
                    checkPaymentObj.CreatedBy = vendorShippingViewModel.CreatedBy;
                    checkPaymentObj.UpdatedBy = vendorShippingViewModel.UpdatedBy;
                    checkPaymentObj.MasterCompanyId = vendorShippingViewModel.MasterCompanyId;
                    checkPaymentObj.IsPrimary = vendorShippingViewModel.IsPrimary;
                    //checkPaymentObj.VendorShippingAddressId = vendorShippingViewModel.VendorShippingAddressId;
                    _unitOfWork.VendorShippingAddress.Update(checkPaymentObj);

                    _unitOfWork.SaveChanges();
                    if (addressObj != null)
                    {
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
                        _unitOfWork.SaveChanges();
                    }
                    _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(checkPaymentObj.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(checkPaymentObj.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), checkPaymentObj.UpdatedBy);


                }

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
                actionobject.Memo = vendorShippingDetailsViewModel.Memo;
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
                checkPaymentObj.IsDeleted = true;
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
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
            }



        }
        [HttpGet("getCheckPayHist/{id}")]
        public IActionResult getCheckPayHist(long id)
        {

            try
            {
                //var allVendorCheckDetails = _unitOfWork.Vendor.GetVendorsCheckAuditHistory(id);

                var data = _context.VendorCheckPayment.Where(p => p.CheckPaymentId == id).FirstOrDefault();
                var allVendorCheckDetails = _unitOfWork.CommonRepository.GetShippingBillingAddressAudit(data.VendorId, id, Convert.ToInt32(AddressTypeEnum.CheckPayment), Convert.ToInt32(ModuleEnum.Vendor));

                return Ok(allVendorCheckDetails);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
            }



        }

        [HttpGet("getShipViaHistory/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetShipviaHistory(long id)

        {
            var result = _unitOfWork.Vendor.getVendorShipVia(id);
            return Ok(result);
            //var result = _unitOfWork.AuditHistory.GetAllHistory("Vendorshipping", id); //.GetAllCustomersData();


            //try
            //{
            //    var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

            //    return Ok(resul1);
            //}
            //catch (Exception ex)
            //{
            //    return BadRequest(ex.Message);
            //}



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
                //vendorObject.IsActive = vendorWarningViewModel.IsActive;
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
                // vendorObject.IsActive = vendorWarningViewModel.IsActive;
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



                vendorObject.IsDeleted = vendor.IsDeleted;

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
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("vendorCapabilityPost")]
        public IActionResult addCharges([FromBody] VendorCapabiliy vendorCapability) //it is for Model we will pass
        {
            if (vendorCapability != null)
            {
                // caps.WorkflowChargesListId = 0;
                vendorCapability.MasterCompanyId = 1;
                //vendorCapability.IsActive = true;
                vendorCapability.CreatedDate = DateTime.Now;
                vendorCapability.UpdatedDate = DateTime.Now;
                if (vendorCapability.VendorCapabilityId > 0)
                {
                    _unitOfWork.Repository<VendorCapabiliy>().Update(vendorCapability);
                    updateRanking(Convert.ToInt32(vendorCapability.VendorRanking));
                    _unitOfWork.SaveChanges();
                }
                else
                {
                    //vendorCapability.IsDeleted = false;
                    _unitOfWork.Repository<VendorCapabiliy>().Add(vendorCapability);
                    updateRanking(Convert.ToInt32(vendorCapability.VendorRanking));
                    _unitOfWork.SaveChanges();
                }

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

        [HttpPost("VendorAircraftPost")]
        public IActionResult VendorAircraft([FromBody] VendorCapabilityAircraft[] vendorAircraftMapping)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    for (int i = 0; i < vendorAircraftMapping.Length; i++)
                    {
                        var aircraftData = _unitOfWork.Repository<VendorCapabilityAircraft>().GetSingleOrDefault(c => c.AircraftTypeId == Convert.ToInt32(vendorAircraftMapping[i].AircraftTypeId) && (c.AircraftModelId == vendorAircraftMapping[i].AircraftModelId) && (c.DashNumberId == vendorAircraftMapping[i].DashNumberId) && (c.CapabilityId == vendorAircraftMapping[i].CapabilityId) && (c.VendorId == vendorAircraftMapping[i].VendorId));
                        if (aircraftData == null)
                        {

                            var aircraft = _unitOfWork.Vendor.VendorAircraft(vendorAircraftMapping[i]);
                            //_unitOfWork.VendorCapabilityAircraft.Add(vendorAircraftMapping[i]);
                            //        _appContext.SaveChanges();

                        }
                        else
                        {
                            return BadRequest("Record already exist with these details");
                        }
                    }


                    //var aircraft = _unitOfWork.Vendor.VendorAircraft(vendorAircraftMapping);
                }
                catch (Exception ex)
                {
                    throw;
                }


            }
            else
            {
                return BadRequest($"{nameof(vendorAircraftMapping)} cannot be null");
            }

            return Ok(ModelState);
        }

        [HttpGet("VendorAircraftGetDataByCapsId/{vendorCapabilityId}")]
        public IActionResult VendorAircraftDataByCapsId(long vendorCapabilityId)
        {

            var aircraftData = _unitOfWork.Vendor.VendorAircraftDataByCapsId(vendorCapabilityId);
            return Ok(aircraftData);
        }

        [HttpPut("vendorAircraftupdateMemo")]
        public IActionResult EditVendorAircraft(long id, string memo, string updatedBy)
        {
            var result = _unitOfWork.Vendor.EditVendorAircraft(id, memo, updatedBy);
            return Ok(result);
        }

        [HttpPut("vendorAircrafDelete")]
        public IActionResult DeleteVendorAircraft(long id, string updatedBy)
        {
            var result = _unitOfWork.Vendor.DeleteVendorAircraft(id, updatedBy);
            return Ok(result);
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
            disc.IsPMA = vendorCapability.IsPMA;
            disc.IsDER = vendorCapability.IsDER;
            disc.UpdatedBy = vendorCapability.UpdatedBy;
            disc.UpdatedDate = DateTime.Now;
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
            var deleteVendorCapabilityTyperecord = _context.vendorCapabilityType.Where(a => a.VendorCapabilityId == capabilityid).SingleOrDefault();
            if (deleteVendorCapabilityTyperecord != null)
            {
                _context.Remove(deleteVendorCapabilityTyperecord);
                _context.SaveChanges();
            }

            var deleteVendorCapabilityAircraftTyperecord = _context.vendorCapabilityAircraftType.Where(a => a.VendorCapabilityId == capabilityid).SingleOrDefault();
            if (deleteVendorCapabilityAircraftTyperecord != null)
            {
                _context.Remove(deleteVendorCapabilityAircraftTyperecord);
                _context.SaveChanges();
            }


            var deleteVendorCapabiltiyAircraftModelrecord = _context.vendorCapabiltiyAircraftModel.Where(a => a.VendorCapabilityId == capabilityid).SingleOrDefault();
            if (deleteVendorCapabiltiyAircraftModelrecord != null)
            {
                _context.Remove(deleteVendorCapabiltiyAircraftModelrecord);
                _context.SaveChanges();
            }


            var deleterecord = _context.VendorCapabiliy.Where(a => a.VendorCapabilityId == capabilityid).SingleOrDefault();
            if (deleterecord != null)
            {
                _context.Remove(deleterecord);
                _context.SaveChanges();
            }
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

        [HttpGet("roHistory")]
        public IActionResult RoHistory(int repairOrderId)
        {
            if (repairOrderId == 0)
            {
                return BadRequest(new Exception("Please pass valid RepairOrderId."));
            }

            var roHistoryList = _unitOfWork.repairOrder.RoHistoryList(repairOrderId);
            return Ok(roHistoryList);

        }

        [HttpDelete("deleteRo")]
        public IActionResult DeleteRepairOrder(int repairOrderId, string updatedBy)
        {
            if (repairOrderId == 0 || string.IsNullOrEmpty(updatedBy))
            {
                return BadRequest(new Exception("Please pass valid RepairOrderId to delete RO."));
            }

            if (ModelState.IsValid)
            {
                var repairOrderModel = _context
                    .RepairOrder
                    .Where(a => a.RepairOrderId == repairOrderId)
                    .SingleOrDefault();

                if (repairOrderModel != null)
                {
                    repairOrderModel.UpdatedBy = updatedBy;
                    repairOrderModel.IsDeleted = true;
                    repairOrderModel.UpdatedDate = DateTime.Now;
                }

                _context.RepairOrder.Update(repairOrderModel);
                _unitOfWork.SaveChanges();

                return Ok();

            }

            return Ok(ModelState);
        }

        [HttpGet("roApproversList")]
        public IActionResult GetRoApproversList(long repairOrderId)
        {
            var result = _unitOfWork.repairOrder.GetRoApproversList(repairOrderId);
            return Ok(result);
        }

        [HttpGet("roViewById")]
        public IActionResult RepairOrderView(long repairOrderId)
        {
            var result = _unitOfWork.repairOrder.RepairOrderView(repairOrderId);
            return Ok(result);
        }

        [HttpPut("roStatus")]
        public IActionResult RepairOrderStatus(long repairOrderId, bool isActive, string updatedBy)
        {
            var repairOrderModel = _context.RepairOrder.Where(a => a.RepairOrderId == repairOrderId).SingleOrDefault();

            if (repairOrderModel == null)
            {
                return BadRequest($"No matching record found for RepairOrderid={repairOrderId}.");
            }

            repairOrderModel.IsActive = isActive;
            repairOrderModel.UpdatedBy = updatedBy;
            repairOrderModel.UpdatedDate = DateTime.Now;
            _context.RepairOrder.Update(repairOrderModel);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("roById")]
        public IActionResult RepairOrderById(long repairOrderId)
        {
            var result = _unitOfWork.repairOrder.RepairOrderById(repairOrderId);
            return Ok(result);
        }

        [HttpGet("roPartsById")]
        public IActionResult RepairOrderPartsById(long repairOrderId, long workOrderPartNoId = 0)
        {
            var result = _unitOfWork.repairOrder.RepairOrderPartsById(repairOrderId, workOrderPartNoId);
            return Ok(result);
        }

        [HttpGet("POListByMasterItemId")]
        public IActionResult POListByMasterItemId(int itemMasterId)
        {
            var result = _unitOfWork.purchaseOrder.POListByMasterItemId(itemMasterId).Distinct();
            return Ok(result);
        }

        [HttpGet("ROListByMasterItemId")]
        public IActionResult ROListByMasterItemId(int itemMasterId)
        {
            var result = _unitOfWork.repairOrder.ROListByMasterItemId(itemMasterId).Distinct();
            return Ok(result);
        }

        [HttpPost("createRoApprover")]
        public IActionResult CreateRoApprover([FromBody]RepairOrderApproverViewModel roApproverViewModel)
        {
            if (roApproverViewModel == null)
            {
                return BadRequest($"RO Approver cannot be null.");
            }

            var roApprovar = new RepairOrderApprover();
            roApprovar = FillRepairOrderApproverSave(roApprovar, roApproverViewModel);
            SaveRepairOrderApprover(roApprovar);

            return Ok(roApprovar);
        }

        private RepairOrderApprover FillRepairOrderApproverSave(RepairOrderApprover roApprover, RepairOrderApproverViewModel roApproverViewModel)
        {
            roApprover.RepairOrderId = roApproverViewModel.RepairOrderId;
            if (roApproverViewModel.RepairOrderApproverList != null &&
                roApproverViewModel.RepairOrderApproverList.Any())
            {
                roApprover.RepairOrderApproverList = new List<RepairOrderApproverList>();
                foreach (var roApproverObj in roApproverViewModel.RepairOrderApproverList)
                {
                    var repairOrderApproverList = new RepairOrderApproverList
                    {
                        EmployeeId = roApproverObj.EmployeeId,
                        Level = roApproverObj.Level,
                        StatusId = roApproverObj.StatusId,
                        CreatedBy = roApproverObj.CreatedBy,
                        CreatedDate = DateTime.Now
                    };
                    roApprover.RepairOrderApproverList.Add(repairOrderApproverList);
                }
            }
            return roApprover;
        }

        [HttpPut("updateRoApprover")]
        public IActionResult UpdateRoApprover([FromBody] RepairOrderApprover roApprover)
        {
            if (roApprover == null)
            {
                return BadRequest($"RO Approver cannot be null.");
            }

            //var roApprover = _context.RepairOrderApprover
            //    .Where(roa => roa.RoApproverId == roApproverViewModel.RoApproverId).FirstOrDefault();

            //// UPDATE RepairOrderId
            //roApprover.RepairOrderId = roApprover.RepairOrderId;

            //var roApprovarList = _context.RepairOrderApproverList
            //    .Where(x => x.RoApproverId == roApproverViewModel.RoApproverId).ToList();

            //roApprover.RepairOrderApproverList = roApprovarList;

            //// UPDATE RepairOrderApproverList
            //roApprover = FillRepairOrderApproverUpdate(roApprover, roApproverViewModel);

            //_context.RepairOrderApprover.Update(roApprover);
            //_context.SaveChanges();

            _context.RepairOrderApprover.Update(roApprover);
            _context.SaveChanges();

            return Ok(roApprover);

        }

        private RepairOrderApprover FillRepairOrderApproverUpdate(RepairOrderApprover roApprover, RepairOrderApproverViewModel roApproverViewModel)
        {
            roApprover.RepairOrderId = roApproverViewModel.RepairOrderId;
            if (roApproverViewModel.RepairOrderApproverList != null &&
                roApproverViewModel.RepairOrderApproverList.Any())
            {
                roApprover.RepairOrderApproverList = new List<RepairOrderApproverList>();
                foreach (var roApproverObj in roApproverViewModel.RepairOrderApproverList)
                {
                    var repairOrderApproverList = new RepairOrderApproverList
                    {
                        RoApproverId = roApproverObj.RoApproverId,
                        RoApproverListId = roApproverObj.RoApproverListId,
                        EmployeeId = roApproverObj.EmployeeId,
                        Level = roApproverObj.Level,
                        StatusId = roApproverObj.StatusId,
                        UpdatedBy = roApproverObj.UpdatedBy,
                        UpdatedDate = DateTime.Now,
                        CreatedBy = roApproverObj.CreatedBy,
                        CreatedDate = roApproverObj.CreatedDate
                    };
                    roApprover.RepairOrderApproverList.Add(repairOrderApproverList);
                }
            }
            return roApprover;
        }
        private void SaveRepairOrderApprover(RepairOrderApprover roApprover)
        {
            _context.RepairOrderApprover.Add(roApprover);
            _context.SaveChanges();
        }

        [HttpGet("roPartsViewById")]
        public IActionResult GetRepairOrderPartsView(long repairOrderId)
        {
            var list = _unitOfWork.repairOrder.GetRepairOrderPartsView2(repairOrderId);
            return Ok(list);
        }

        [HttpGet("getvendorContactByVendorID/{vendorid}/{isDContact}")]
        [Produces(typeof(List<VendorCapabiltiyAircraftModel>))]
        public IActionResult GetVendorByID(long vendorid, bool isDContact)
        {
            var vendorcontactdata = _unitOfWork.Vendor.getVendorByID(vendorid, isDContact);
            return Ok(vendorcontactdata);

        }

        [HttpGet("getVendorBillingHistory")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetAllVendorBillingAddressAudit(long vendorId, long vendorBillingaddressId)
        {
            var allVendorBillingDetails = _unitOfWork.CommonRepository.GetShippingBillingAddressAudit(vendorId, vendorBillingaddressId, Convert.ToInt32(AddressTypeEnum.BillingAddress), Convert.ToInt32(ModuleEnum.Vendor));

            //var allVendorBillingDetails = _unitOfWork.Vendor.GetVendorBillingAddressAudit(vendorId, vendorBillingaddressId);
            return Ok(allVendorBillingDetails);
        }

        [HttpGet("getVendorShippingHistory")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetAllVendorrShippingAddressAudit(long vendorId, long vendorShippingAddressId)
        {
            var allVendorShippingDetails = _unitOfWork.CommonRepository.GetShippingBillingAddressAudit(vendorId, vendorShippingAddressId, Convert.ToInt32(AddressTypeEnum.ShippingAddress), Convert.ToInt32(ModuleEnum.Vendor));

            // var allVendorShippingDetails = _unitOfWork.VendorShippingAddress.GetVendorShippingAddressAudit(vendorId, vendorShippingAddressId);
            return Ok(allVendorShippingDetails);
        }

        [HttpGet("getVendorContactHistory")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetAllVendorrContactAddressAudit(long vendorId, long vendorContactId)
        {
            var contact = _context.VendorContact.Where(p => p.ContactId == vendorContactId && p.VendorId == vendorId).FirstOrDefault();

            var allVendorShippingDetails = _unitOfWork.CommonRepository.GetContactAudit(vendorId, Convert.ToInt32(ModuleEnum.Vendor), contact.VendorContactId);
            //var allVendorShippingDetails = _unitOfWork.ContactRepository.GetVendorContactsAudit(vendorId, vendorContactId);
            return Ok(allVendorShippingDetails);
        }

        [HttpGet("vendorpomemolist")]
        public IActionResult GetVendorPOMemoList(long vendorId)
        {
            var result = _unitOfWork.Vendor.GetVendorPOMemoList(vendorId);
            return Ok(result);
        }

        [HttpGet("vendorromemolist")]
        public IActionResult GetVendorROMemoList(long vendorId)
        {
            var result = _unitOfWork.Vendor.GetVendorROMemoList(vendorId);
            return Ok(result);
        }

        [HttpPut("updatevendormemotext")]
        public IActionResult UpdateVendorMemoText(long id, string type, string memoText, string updatedBy)
        {
            _unitOfWork.Vendor.UpdateVendorMemoText(id, type, memoText, updatedBy);
            return Ok();
        }

        [HttpGet("getVendorProcess1099List")]
        public IActionResult GetVendorProcess(int companyId)
        {
            var result = _unitOfWork.Vendor.GetVendorProcessList(companyId);
            return Ok(result);
        }

        [HttpPost("vendorProcessSave")]
        public IActionResult VendorProcessSave([FromBody]Master1099 vendorProcess1099)
        {
            _unitOfWork.Vendor.VendorProcess1099Save(vendorProcess1099);
            return Ok();
        }

        [HttpPut("vendorProcessStatus")]
        public IActionResult VendorProcesStatusUpdate(long id, bool status, string updatedBy)
        {
            _unitOfWork.Vendor.VendorProcess1099StatusUpdate(id, status, updatedBy);
            return Ok();
        }

        [HttpPut("vendorProcessDelete")]
        public IActionResult VendorProcesDelete(long id, string updatedBy)
        {
            _unitOfWork.Vendor.VendorProcess1099Delete(id, updatedBy);
            return Ok();
        }

        [HttpGet("getVendorProcess1099ListForFinance")]
        public IActionResult GetVendorProcessList(int companyId)
        {
            var result = _unitOfWork.Vendor.GetVendorProcessListForFinance(companyId);
            return Ok(result);
        }
        [HttpGet("getVendorProcess1099ListFromTransaction")]
        public IActionResult GetVendorProcessListFromTransaction(long vendorId)
        {
            var result = _unitOfWork.Vendor.GetVendorProcessListFromTransaction(vendorId);
            return Ok(result);
        }

        [HttpGet("roglobalsearch")]
        public IActionResult RepairOrderGlobalSearch(string filterText, int pageNumber = 0, int pageSize = 10, long vendorId = 0)
        {
            var result = _unitOfWork.repairOrder.RepairOrderGlobalSearch(filterText, pageNumber, pageSize, vendorId);
            return Ok(result);

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

        [HttpGet("searchForGetAirCraftByVendorCapsId/{vendorCapabilityId}")]

        public IActionResult orAirMappedMultiDashId(long vendorCapabilityId, string aircraftTypeID, string aircraftModelID, string dashNumberId, string memo)
        {
            var result = _unitOfWork.Vendor.searchItemAircraftMappingDataByMultiTypeIdModelIDDashID(vendorCapabilityId, aircraftTypeID, aircraftModelID, dashNumberId, memo);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpGet("GetListforCapes")]
        [Produces(typeof(List<VendorViewModel>))]
        public IActionResult GetListforCapes()
        {
            var allTaxrateInfo = _context.Vendor.Include("Manufacturer").Include("Provision").Include("Priority")
                .Include("ItemClassification").Include("Currency").Include("ExportClassification")
                    .Where(a => a.VendorTypeId == 1
                                && (a.IsDeleted == true || a.IsDeleted == null) || a.VendorTypeId == 1 && (a.IsDeleted == true || a.IsDeleted == null))
                                    .ToList();
            return Ok(allTaxrateInfo);

        }

        [HttpPost("createvendorbillingaddress")]
        public IActionResult CreateVendorBillingAddress([FromBody] VendorBillingAddress billingAddress)
        {

            if (ModelState.IsValid)
            {
                if (billingAddress == null)
                    return BadRequest($"{nameof(billingAddress)} cannot be null");
                Address address = new Address();
                address.Line1 = billingAddress.Address1;
                address.Line2 = billingAddress.Address2;
                address.Line3 = billingAddress.Address3;
                address.PostalCode = billingAddress.PostalCode;
                address.StateOrProvince = billingAddress.StateOrProvince;
                address.City = billingAddress.City;
                address.Country = billingAddress.Country;
                address.MasterCompanyId = 1;
                address.IsActive = true;
                address.CreatedBy = billingAddress.CreatedBy ?? "Admin"; //Hotfix
                address.UpdatedBy = billingAddress.UpdatedBy ?? "Admin";//Hotfix

                address.UpdatedDate = DateTime.Now;
                if (billingAddress.AddressId > 0)
                {
                    address.CreatedDate = billingAddress.CreatedDate;
                    address.AddressId = billingAddress.AddressId;
                    _context.Address.Update(address);

                }
                else
                {
                    address.CreatedDate = DateTime.Now;
                    _context.Address.Add(address);
                }


                _context.SaveChanges();
                _unitOfWork.Vendor.CreateVendorBillingAddress(billingAddress);

                return Ok(billingAddress);
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        //[HttpPost("updatevendorbillingaddress")]
        //public IActionResult UpdateVendorBillingAddress([FromBody] VendorBillingAddress billingAddress)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _unitOfWork.Vendor.UpdateVendorBillingAddress(billingAddress);
        //        return Ok(billingAddress);
        //    }
        //    return BadRequest(ModelState);
        //}
        [HttpGet("vendorBillingAddressGet/{id}")]
        [Produces(typeof(List<VendorBillingAddress>))]
        public IActionResult VendorBillingAddressGet(long id, VendorBillingAddress vendorBillingAddress)
        {
            var allVendBillinghdetails = _unitOfWork.Vendor.GetAllBillingAddressDetails(id);
            return Ok(allVendBillinghdetails);

        }




        [HttpPut("updatevendorbillingaddress/{id}")]
        public IActionResult UpdateVendorBillingAddress(long id, [FromBody] VendorBillingAddress billingAddress)
        {
            if (ModelState.IsValid)
            {
                VendorBillingAddress billingAddressData = _context.VendorBillingAddress.Where(c => c.VendorBillingAddressId == id).FirstOrDefault();

                Address address = new Address();
                address.Line1 = billingAddress.Address1;
                address.Line2 = billingAddress.Address2;
                address.Line3 = billingAddress.Address3;
                address.PostalCode = billingAddress.PostalCode;
                address.StateOrProvince = billingAddress.StateOrProvince;
                address.City = billingAddress.City;
                address.Country = billingAddress.Country;
                address.MasterCompanyId = 1;
                address.IsActive = true;
                address.CreatedBy = billingAddress.CreatedBy ?? "Admin"; //Hotfix
                address.UpdatedBy = billingAddress.UpdatedBy ?? "Admin";//Hotfix

                address.UpdatedDate = DateTime.Now;
                if (billingAddress.AddressId > 0)
                {
                    address.CreatedDate = billingAddress.CreatedDate;
                    address.AddressId = billingAddress.AddressId;
                    _context.Address.Update(address);

                }
                else
                {
                    address.CreatedDate = DateTime.Now;
                    _context.Address.Add(address);
                }
                _context.SaveChanges();

                if (billingAddress.IsPrimary == true)
                {
                    var vendorConcatData = _context.VendorBillingAddress.Where(p => p.VendorId == billingAddress.VendorId && p.IsPrimary == true).FirstOrDefault();

                    if (vendorConcatData != null && vendorConcatData.VendorBillingAddressId != billingAddressData.VendorBillingAddressId)
                    {
                        vendorConcatData.IsPrimary = false;
                        _context.VendorBillingAddress.Update(vendorConcatData);

                        _context.SaveChanges();
                        _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(vendorConcatData.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorConcatData.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), vendorConcatData.UpdatedBy);
                    }
                }

                billingAddressData.AddressId = billingAddress.AddressId;
                billingAddressData.VendorId = billingAddress.VendorId;
                billingAddressData.SiteName = billingAddress.SiteName;
                billingAddressData.IsPrimary = billingAddress.IsPrimary;
                billingAddressData.UpdatedBy = billingAddress.UpdatedBy;
                billingAddressData.UpdatedDate = billingAddress.UpdatedDate;
                billingAddressData.IsActive = billingAddress.IsActive;
                billingAddressData.IsDeleted = billingAddress.IsDeleted;


                _unitOfWork.Vendor.UpdateVendorBillingAddress(billingAddressData);
                _context.SaveChanges();
                _unitOfWork.CommonRepository.ShippingBillingAddressHistory(Convert.ToInt64(billingAddressData.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(billingAddressData.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), billingAddressData.UpdatedBy);

                return Ok(billingAddress);
            }
            return BadRequest(ModelState);
        }


        [HttpGet("deletevendorbillingaddress")]
        public IActionResult DeleteVendorBillingAddress(long billingAddressId, string updatedBy)
        {
            _unitOfWork.Vendor.DeleteVendorBillingAddress(billingAddressId, updatedBy);
            return Ok();
        }

        [HttpDelete("deletevendorshippingaddress/{vendorShippingAddressId}")]
        public IActionResult DeleteVendorShippingAddress(long vendorShippingAddressId)
        {
            _unitOfWork.Vendor.DeleteVendorShippingAddress(vendorShippingAddressId, "");
            return Ok();
        }

        [HttpDelete("deletevendorshippingviaaddress/{vendorShippingId}")]
        public IActionResult DeleteVendorShippingViaAddress(long vendorShippingId, string updatedBy)
        {
            var response = _unitOfWork.Vendor.DeleteVendorShippingViaAddress(vendorShippingId, updatedBy);
            return Ok(response);
        }

        [HttpGet("vendorbillingaddressstatus")]
        public IActionResult VendorBillingAddressStatus(long billingAddressId, bool status, string updatedBy)
        {
            _unitOfWork.Vendor.VendorBillingAddressStatus(billingAddressId, status, updatedBy);
            return Ok();
        }

        [HttpGet("vendorbillingaddress")]
        public IActionResult GetVendorBillingAddress()
        {
            var result = _unitOfWork.Vendor.GetVendorBillingAddress();
            return Ok(result);
        }

        [HttpGet("vendorbillingsitenames")]
        public IActionResult GetVendorBillingSiteNames(long vendorId)
        {
            var result = _unitOfWork.Vendor.GetVendorBillingSiteNames(vendorId);
            return Ok(result);
        }



        [HttpGet("vendorbillingaddressbyid")]
        public IActionResult VendorBillingAddressById(long billingAddressId)
        {
            var result = _unitOfWork.Vendor.VendorBillingAddressById(billingAddressId);
            return Ok(result);
        }

        [HttpGet("GetVendorsForDropDown")]
        public IActionResult GetVendorsForDropDown()
        {

            var vendors = _unitOfWork.Vendor.getVendorsForDropdown()
                .Select(x => new
                {
                    VendorId = x.VendorId,
                    VendorName = x.VendorName
                }).ToList();

            if (vendors == null || vendors.Count() == 0)
                return NoContent();

            return Ok(vendors);
        }

        #endregion


        #region VendorDocument    


        [HttpPost("vendorGeneralDocumentUpload")]
        [Produces("application/json")]
        public IActionResult VendorDocumentUploadAction()
        {

            try
            {
                VendorDocumentDetails objVendorDocumentDetail = new VendorDocumentDetails();
                if (ModelState.IsValid)
                {
                    if (Request.Form == null)
                        return BadRequest($"{nameof(objVendorDocumentDetail)} cannot be null");
                    objVendorDocumentDetail.MasterCompanyId = 1;
                    objVendorDocumentDetail.UpdatedBy = Request.Form["UpdatedBy"];
                    objVendorDocumentDetail.VendorId = Convert.ToInt64(Request.Form["VendorId"]);

                    if (objVendorDocumentDetail.VendorId > 0)
                    {
                        var attachmentData = _context.Attachment.Where(p => p.ReferenceId == objVendorDocumentDetail.VendorId && p.ModuleId == Convert.ToInt32(ModuleEnum.Vendor)).FirstOrDefault();

                        if (attachmentData != null)
                        {
                            objVendorDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objVendorDocumentDetail.VendorId,
                                                         Convert.ToInt32(ModuleEnum.Vendor), Convert.ToString(ModuleEnum.Vendor), objVendorDocumentDetail.UpdatedBy, objVendorDocumentDetail.MasterCompanyId, attachmentData.AttachmentId);


                        }
                        else
                        {
                            objVendorDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objVendorDocumentDetail.VendorId,
                                                                       Convert.ToInt32(ModuleEnum.Vendor), Convert.ToString(ModuleEnum.Vendor), objVendorDocumentDetail.UpdatedBy, objVendorDocumentDetail.MasterCompanyId);

                        }

                    }

                    return Ok(objVendorDocumentDetail);
                }
                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getVendorGeneralDocumentDetail/{id}")]
        public IActionResult GetVendorGeneralDocumentDetail(long id, int moduleId)
        {
            var allvendorsGenralDocs = _unitOfWork.Vendor.GetVendorGeneralDocumentDetailById(id, moduleId);
            return Ok(allvendorsGenralDocs);
        }

        [HttpDelete("vendorAttachmentDelete/{id}")]
        public IActionResult GetVendorGeneralDocumentDelete(long id, string updatedBy)
        {
            var deleteStatus = _unitOfWork.Vendor.GetVendorGeneralDocumentDelete(id, updatedBy);
            return Ok(deleteStatus);
        }

        [HttpPost("vendorDocumentUpload")]
        [Produces("application/json")]
        public IActionResult DocumentUploadAction()
        {

            try
            {
                VendorDocumentDetails objVendorDocumentDetail = new VendorDocumentDetails();
                if (ModelState.IsValid)
                {
                    long attachmentId = 0;
                    long documentDeatailId = 0;

                    if (Request.Form == null)
                        return BadRequest($"{nameof(objVendorDocumentDetail)} cannot be null");

                    long VendorDocumentDetailId = Convert.ToInt64(Request.Form["VendorDocumentDetailId"]);

                    if (VendorDocumentDetailId > 0)
                    {
                        var vendorDocObj = _unitOfWork.Vendor.GetVendorDocumentDetailById(VendorDocumentDetailId);
                        //objVendorDocumentDetail.MasterCompanyId = 1;      
                        vendorDocObj.VendorId = Convert.ToInt64(Request.Form["VendorId"]);
                        vendorDocObj.UpdatedBy = Request.Form["UpdatedBy"];
                        vendorDocObj.DocName = Request.Form["DocName"];
                        vendorDocObj.DocMemo = Request.Form["DocMemo"];
                        vendorDocObj.DocDescription = Request.Form["DocDescription"];
                        //vendorDocObj.CreatedDate = DateTime.Now;
                        vendorDocObj.UpdatedDate = DateTime.Now;
                        if (vendorDocObj.AttachmentId > 0)
                        {
                            _unitOfWork.VendorDocumentDetails.Update(vendorDocObj);
                            _unitOfWork.SaveChanges();
                            vendorDocObj.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, vendorDocObj.VendorId,
                                                         Convert.ToInt32(ModuleEnum.Vendor), Convert.ToString(ModuleEnum.Vendor), vendorDocObj.UpdatedBy, vendorDocObj.MasterCompanyId, vendorDocObj.AttachmentId);

                        }
                        else
                        {
                            vendorDocObj.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, vendorDocObj.VendorId,
                             Convert.ToInt32(ModuleEnum.Vendor), Convert.ToString(ModuleEnum.Vendor), vendorDocObj.UpdatedBy, vendorDocObj.MasterCompanyId);
                            _unitOfWork.VendorDocumentDetails.Update(vendorDocObj);
                            _unitOfWork.SaveChanges();

                        }
                        attachmentId = vendorDocObj.AttachmentId;
                        documentDeatailId = vendorDocObj.VendorDocumentDetailId;


                    }
                    else
                    {
                        objVendorDocumentDetail.VendorId = Convert.ToInt64(Request.Form["VendorId"]);
                        objVendorDocumentDetail.MasterCompanyId = 1;
                        objVendorDocumentDetail.CreatedBy = Request.Form["CreatedBy"];
                        objVendorDocumentDetail.UpdatedBy = Request.Form["UpdatedBy"];
                        objVendorDocumentDetail.DocName = Request.Form["DocName"];
                        objVendorDocumentDetail.DocMemo = Request.Form["DocMemo"];
                        objVendorDocumentDetail.DocDescription = Request.Form["DocDescription"];
                        objVendorDocumentDetail.IsActive = true;
                        objVendorDocumentDetail.IsDeleted = false;
                        objVendorDocumentDetail.CreatedDate = DateTime.Now;
                        objVendorDocumentDetail.UpdatedDate = DateTime.Now;
                        objVendorDocumentDetail.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objVendorDocumentDetail.VendorId,
                                                                            Convert.ToInt32(ModuleEnum.Vendor), Convert.ToString(ModuleEnum.Vendor), objVendorDocumentDetail.UpdatedBy, objVendorDocumentDetail.MasterCompanyId);
                        _unitOfWork.VendorDocumentDetails.Add(objVendorDocumentDetail);
                        _unitOfWork.SaveChanges();
                        documentDeatailId = objVendorDocumentDetail.VendorDocumentDetailId;

                        attachmentId = objVendorDocumentDetail.AttachmentId;
                    }
                    if (documentDeatailId != null)
                    {
                        DocumentsAudit obj = new DocumentsAudit();

                        obj.UpdatedDate = obj.CreatedDate = DateTime.Now;
                        obj.CreatedBy = obj.UpdatedBy = Request.Form["UpdatedBy"];
                        obj.MasterCompanyId = 1;
                        obj.ModuleId = Convert.ToInt32(ModuleEnum.Vendor);
                        obj.ReferenceId = Convert.ToInt64(Request.Form["VendorId"]);
                        obj.AttachmentId = documentDeatailId;
                        obj.DocDescription = Request.Form["DocDescription"];
                        obj.DocMemo = Request.Form["DocMemo"];
                        obj.DocName = Request.Form["DocName"];
                        obj.IsActive = true;
                        if (attachmentId != null)
                        {
                            var data = _context.AttachmentDetails.AsNoTracking().Where(p => p.AttachmentId == attachmentId).OrderByDescending(p => p.AttachmentDetailId).FirstOrDefault();
                            if (data != null)
                            {

                                obj.FileName = data.FileName;
                                obj.Link = data.Link;
                                obj.Description = data.Description;

                            }
                        }
                        _context.DocumentsAudit.Add(obj);
                        _context.SaveChanges();

                    }
                    return Ok(objVendorDocumentDetail);
                }
                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("vendorDocumentUpdate/{id}")]
        public IActionResult VendorDocumentUpdate(long id)
        {
            VendorDocumentDetails objVendorDocumentDetail = new VendorDocumentDetails();
            if (ModelState.IsValid)
            {
                if (Request.Form == null)
                    return BadRequest($"{nameof(objVendorDocumentDetail)} cannot be null");
                long VendorDocumentDetailId = Convert.ToInt64(Request.Form["VendorDocumentDetailId"]);
                objVendorDocumentDetail.VendorId = Convert.ToInt64(Request.Form["VendorId"]);
                if (VendorDocumentDetailId > 0)
                {
                    var vendorDocObj = _unitOfWork.Vendor.GetVendorDocumentDetailById(VendorDocumentDetailId);
                    //objVendorDocumentDetail.MasterCompanyId = 1;               
                    vendorDocObj.UpdatedBy = Request.Form["UpdatedBy"];
                    vendorDocObj.DocName = Request.Form["DocName"];
                    vendorDocObj.DocMemo = Request.Form["DocMemo"];
                    vendorDocObj.DocDescription = Request.Form["DocDescription"];
                    vendorDocObj.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objVendorDocumentDetail.VendorId,
                        Convert.ToInt32(ModuleEnum.Vendor), Convert.ToString(ModuleEnum.Vendor), vendorDocObj.UpdatedBy, vendorDocObj.MasterCompanyId);
                    _unitOfWork.VendorDocumentDetails.Update(objVendorDocumentDetail);
                    _unitOfWork.SaveChanges();
                }



                return Ok(objVendorDocumentDetail);
            }
            return Ok(ModelState);
        }


        [HttpGet("getVendorDocumentDetailList/{id}")]
        [Produces(typeof(List<VendorDocumentDetails>))]
        public IActionResult GetVendorDocumentDetail(long id, VendorDocumentDetails vendorDocumentDetail)
        {
            var allvendorsDoc = _unitOfWork.VendorDocumentDetails.GetAllDataById(id);
            return Ok(allvendorsDoc);

        }

        [HttpGet("getVendorDocumentDetail/{id}")]
        [Produces(typeof(VendorDocumentDetails))]
        public IActionResult GetCustomerDocumentDetail(long id)
        {
            var allvendorsDoc = _unitOfWork.Vendor.GetVendorDocumentDetailById(id);
            return Ok(allvendorsDoc);

        }

        [HttpDelete("vendorDocumentDelete/{id}")]
        [Produces(typeof(VendorDocumentDetails))]
        public IActionResult DeleteDocumentAction(long id)
        {
            var existingResult = _context.VendorDocumentDetails.ToList().Where(p => p.VendorDocumentDetailId == id).FirstOrDefault();
            if (existingResult != null)
            {
                existingResult.IsDeleted = true;
                _unitOfWork.VendorDocumentDetails.Update(existingResult);
                _unitOfWork.SaveChanges();
            }

            return Ok(id);
        }

        [HttpGet("getVendorDocumentAudit/{id}")]
        [Produces(typeof(VendorDocumentDetailsAudit))]
        public IActionResult GetCustomerDocumentDetailAudit(long id)
        {
            var data = _context.VendorDocumentDetails.Where(p => p.VendorDocumentDetailId == id).FirstOrDefault();
            var allvendorsDoc = _unitOfWork.CreateDocumentDetails.GetAllAudotHistoryById(id, data.VendorId, Convert.ToInt32(ModuleEnum.Vendor));

            //var allvendorsDoc = _unitOfWork.Vendor.GetVendorDocumentDetailsAudit(id);
            return Ok(allvendorsDoc);

        }
        [HttpGet("getVendorProcess1099Audit")]
        [Produces(typeof(Master1099Audit))]
        public IActionResult GetVendorProcess1099Audit(long id)
        {
            var allvendorsDoc = _unitOfWork.Vendor.GetVendorProcess1099Audit(id);
            return Ok(allvendorsDoc);

        }


        #endregion

        #region Vendor Internation shipping

        [HttpPost("createinternationalshipping")]
        [Produces(typeof(VendorInternationalShipping))]
        public IActionResult CreateVendorInternationalShipping([FromBody] VendorInternationalShipping model)
        {
            if (ModelState.IsValid)
            {
                if (model == null)
                    return BadRequest($"{nameof(model)} cannot be null");
                var result = _unitOfWork.Vendor.CreateVendorInternationalShippingDetails(model);
                return Ok(result);
            }
            return Ok(ModelState);
        }

        [HttpGet("internationalshippingdetailsbyid/{id}")]
        [Produces(typeof(VendorInternationalShipping))]
        public IActionResult VendorInternationalShippingDetailsById(long id)
        {
            var result = _unitOfWork.Vendor.VendorInternationalShippingDetailsById(id);
            return Ok(result);
        }

        [HttpPut("internationalshippingstatusupdate")]
        public IActionResult VendorInternationalShippingDetailsStatus(long id, bool status, string updatedBy)
        {
            _unitOfWork.Vendor.VendorInternationalShippingDetailsStatus(id, status, updatedBy);
            return Ok();
        }



        [HttpDelete("deleteinternationalshipping")]
        public IActionResult DeleteVendorInternationalShippingDetails(long id, string updatedBy)
        {
            _unitOfWork.Vendor.DeleteVendorInternationalShippingDetails(id, updatedBy);
            return Ok();
        }



        [HttpGet("internationalshippingdetaillist")]
        public IActionResult GetVendorInternationalShippingDetails(long VendorId)
        {
            var result = _unitOfWork.Vendor.GetVendorInternationalShippingDetails(VendorId);
            return Ok(result);
        }

        [HttpGet("internationalshippingaudit/{vendorInternationalShippingId}")]
        public IActionResult GetVendorInternationalShippingDetailsAudit(long vendorInternationalShippingId)
        {
            var result = _unitOfWork.Vendor.GetVendorInternationalShippingDetailsAudit(vendorInternationalShippingId);
            return Ok(result);
        }

        #endregion

        #region Vendor International shipVia


        [HttpPost("createinternationalshipvia")]
        [Produces(typeof(VendorInternationalShipViaDetails))]
        public IActionResult CreateVendorInternationalShipVia([FromBody] VendorInternationalShipViaDetails model)
        {
            if (ModelState.IsValid)
            {
                if (model == null)
                    return BadRequest($"{nameof(model)} cannot be null");
                var result = _unitOfWork.Vendor.CreateVendorInternationalShipViaDetails(model);
                return Ok(result);
            }
            return Ok(ModelState);
        }

        [HttpGet("internationalshipviadetailsbyid/{id}")]
        [Produces(typeof(VendorInternationalShipViaDetails))]
        public IActionResult VendorInternationalShipViaDetailsById(long id)
        {
            var result = _unitOfWork.Vendor.VendorInternationalShipViaDetailsById(id);
            return Ok(result);
        }

        [HttpPut("internationalshipviastatusupdate")]
        public IActionResult VendorInternationalShipViaDetailsStatus(long id, bool status, string updatedBy)
        {
            _unitOfWork.Vendor.VendorInternationalShipViaDetailsStatus(id, status, updatedBy);
            return Ok();
        }



        [HttpDelete("deleteinternationalshipvia")]
        public IActionResult DeleteVendorInternationalShipViaDetails(long id, string updatedBy)
        {
            _unitOfWork.Vendor.DeleteVendorInternationalShipViaDetails(id, updatedBy);
            return Ok();
        }



        [HttpGet("internationalshipviadetaillist")]
        public IActionResult GetVendorInternationalShipViaDetails(long VendorInternationalShippingId)
        {
            var result = _unitOfWork.Vendor.GetVendorInternationalShipViaDetails(VendorInternationalShippingId);
            return Ok(result);
        }

        [HttpGet("internationalshipviaaudit/{VendorInternationalShipViaDetailsId}")]
        public IActionResult GetVendorInternationalShipViaDetailsAudit(long VendorInternationalShipViaDetailsId)
        {
            var result = _unitOfWork.Vendor.GetVendorInternationalShipViaDetailsAudit(VendorInternationalShipViaDetailsId);
            return Ok(result);
        }

        #endregion

        #region Excel Uploads

        [HttpPost("uploadvendorbillingaddress")]
        public IActionResult UploadBillingCustomData(long vendorId)
        {
            var result = _unitOfWork.Vendor.UploadVendorBillingAddressCustomData(Request.Form.Files[0], vendorId);
            return Ok(result);
        }


        [HttpPost("uploadvendorshippingaddress")]
        public IActionResult UploadShippingCustomData(long vendorId)
        {
            var result = _unitOfWork.Vendor.UploadVendorShippingAddressCustomData(Request.Form.Files[0], vendorId);
            return Ok(result);
        }

        [HttpPost("uploadvendorrcontacts")]
        public IActionResult UploadContactsCustomData(long vendorId)
        {
            _unitOfWork.Vendor.UploadVendorContactsCustomData(Request.Form.Files[0], vendorId);
            return Ok();
        }

        [HttpPost("uploadvendorpaymentaddress")]
        public IActionResult UploadPaymentCustomData(long vendorId)
        {
            var result = _unitOfWork.Vendor.UploadVendorPaymentAddressCustomData(Request.Form.Files[0], vendorId);
            return Ok(result);
        }

        [HttpPost("uploadvendorinternationalshipping")]
        public IActionResult UploadInternationalCustomData(long vendorId)
        {
            var result = _unitOfWork.Vendor.UploadVendorInternationalCustomData(Request.Form.Files[0], vendorId);
            return Ok(result);
        }

        #endregion

    
        #region Vendor Contact ATA Mapping
        [HttpGet("getVendorContactATAMapped/{contactId}")]
        [Produces(typeof(List<VendorContactATAMapping>))]
        public IActionResult ataContactMapped(long contactId)
        {
            var result = _unitOfWork.Vendor.GetATAContactMapped(contactId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost("VendorContactATAPost")]
        public IActionResult InsertVendorContactATA([FromBody] VendorContactATAMapping[] vendorContactATAMapping)
        {
            if (ModelState.IsValid)
            {
                for (int i = 0; i < vendorContactATAMapping.Length; i++)
                {

                    var atachapter = _unitOfWork.Repository<VendorContactATAMapping>().GetSingleOrDefault(c => c.VendorContactId == vendorContactATAMapping[i].VendorContactId && (c.ATAChapterId == vendorContactATAMapping[i].ATAChapterId) && (c.ATASubChapterId == vendorContactATAMapping[i].ATASubChapterId) && (c.MasterCompanyId == vendorContactATAMapping[i].MasterCompanyId));
                    if (atachapter == null)
                    {

                        foreach (var vendorContactAtaMapping in vendorContactATAMapping)
                        {
                            _unitOfWork.Repository<VendorContactATAMapping>().Add(vendorContactAtaMapping);
                            _unitOfWork.SaveChanges();
                        }
                    }
                    else
                    {

                        return BadRequest("Record already exist with these details");
                    }
                }
            }
            else
            {
                return BadRequest($"{nameof(vendorContactATAMapping)} cannot be null");
            }

            return Ok(ModelState);

        }

        [HttpPut("VendorContactATAUpdate/{id}")]
        public IActionResult UpdateVendorContactATA(long id, [FromBody] VendorContactATAMapping vendorContactAtaMapping)
        {
            if (ModelState.IsValid)
            {

                var custATAData = _context.VendorContactATAMapping.Where(c => c.VendorContactATAMappingId == id).FirstOrDefault();
                if (custATAData != null)
                {
                    custATAData.VendorContactId = vendorContactAtaMapping.VendorContactId;
                    custATAData.VendorId = vendorContactAtaMapping.VendorId;
                    custATAData.ATAChapterId = vendorContactAtaMapping.ATAChapterId;
                    custATAData.ATASubChapterId = vendorContactAtaMapping.ATASubChapterId;
                    custATAData.ATAChapterCode = vendorContactAtaMapping.ATAChapterCode;
                    custATAData.ATAChapterName = vendorContactAtaMapping.ATAChapterName;
                    custATAData.ATASubChapterDescription = vendorContactAtaMapping.ATASubChapterDescription;
                    custATAData.UpdatedBy = vendorContactAtaMapping.UpdatedBy;
                    custATAData.UpdatedDate = DateTime.Now;

                    _unitOfWork.Repository<VendorContactATAMapping>().Update(custATAData);
                    _unitOfWork.SaveChanges();

                }
                else
                {

                    return BadRequest("Record already exist with these details");
                }
            }


            return Ok(ModelState);

        }

        [HttpDelete("DeleteVendorContactATAMapping/{id}")]
        public IActionResult DeleteVendorContactATA(long id)
        {
            var existingResult = _unitOfWork.Repository<VendorContactATAMapping>().GetSingleOrDefault(c => c.VendorContactATAMappingId == id);
            existingResult.IsDeleted = true;
            _unitOfWork.Repository<VendorContactATAMapping>().Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("getVendorATAMappedAudit/{VendorContactATAMappingId}")]
        [Produces(typeof(List<CustomerATAMapping>[]))]
        public IActionResult ataMappedAudit(long VendorContactATAMappingId)
        {
            var result = _unitOfWork.Vendor.GetATAContactMappedAudit(VendorContactATAMappingId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }

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
                            var nextRank = (index + 1) <= vendorCapes.Count ? Convert.ToInt32(vendorCapes[index].VendorRanking) : 0;
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

        //[HttpGet("sendpoemail")]
        private async Task<bool> SendPoEmail(long purchaseOrderId, string content, string recepientName, string recepientEmail, string subject, string lintText = "")
        {

            string emailTemplatePath = @"c:\\EmailTemplates\\PO_Email.txt";
            string emailContent = string.Empty;
            StringBuilder parts = new StringBuilder();

            var purchaseorder = _unitOfWork.purchaseOrder.PurchaseOrderEmail(purchaseOrderId);
            string s = purchaseorder.VendorName;
            var purchaseorderPart = _unitOfWork.purchaseOrder.GetPurchaseOrderPartsView(purchaseOrderId);

            var fileStream = new FileStream(emailTemplatePath, FileMode.Open, FileAccess.Read);
            using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
            {
                emailContent = streamReader.ReadToEnd();
            }

            emailContent = emailContent.Replace("{PONumber}", purchaseorder.PurchaseOrderNumber);
            emailContent = emailContent.Replace("{PODate}", purchaseorder.PoDate);
            emailContent = emailContent.Replace("{Vendor}", purchaseorder.VendorName);
            emailContent = emailContent.Replace("{ShipToUserName}", purchaseorder.ShipToUser);
            emailContent = emailContent.Replace("{BillToUserName}", purchaseorder.BillToUser);
            emailContent = emailContent.Replace("{Content}", content);
            emailContent = emailContent.Replace("{LintText}", lintText);
            emailContent = emailContent.Replace("{WebsiteUrl}", _smtpConfig.Value.WebsiteURL);





            if (purchaseorder.PurchaseOrderParts != null && purchaseorder.PurchaseOrderParts.Count > 0)
            {
                foreach (var item in purchaseorder.PurchaseOrderParts)
                {
                    parts.Append("<tr><td>" + item.PartNumber + "</td>");
                    parts.Append("<td>" + item.QuantityOrdered + "</td>");
                    parts.Append("<td>" + item.UnitCost + "</td>");
                    parts.Append("<td>" + item.DiscountAmount + "</td>");
                    parts.Append("<td>" + item.ExtendedCost + "</td></tr>");
                }
            }
            emailContent = emailContent.Replace("{PartsData}", parts.ToString());

            Emailer emailer = new Emailer(_smtpConfig);
            var result = await emailer.SendEmailAsync(recepientName, recepientEmail, subject + purchaseorder.PurchaseOrderNumber, emailContent, null, true);
            return result.success;
        }

        [HttpGet("getVendorCapabilityHistory")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult GetAllVendorCapabilityAudit(long VendorCapabilityId, long VendorId)
        {

            var allVendorBillingDetails = _unitOfWork.Vendor.GetVendorCapabilityAudit(VendorCapabilityId, VendorId);
            return Ok(allVendorBillingDetails);
        }

        #endregion Private Methods

    }
}
