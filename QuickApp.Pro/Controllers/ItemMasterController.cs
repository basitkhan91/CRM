using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{

    [Route("api/[controller]")]
    public class ItemMasterController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        private const string GetActionByIdActionName = "GetActionById";
        public ItemMasterController(IUnitOfWork unitOfWork, ILogger<ItemMasterController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        
        [HttpGet("Get")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult Get()
        {
            var allTaxrateInfo = _unitOfWork.itemMaster.getAlldata(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<ItemMasterViewModel>>(allTaxrateInfo));

        }

        [HttpGet("GetRolesData")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult GetRolesData()
        {
            var allTaxrateInfo = _unitOfWork.itemMaster.getRolesData(); //.GetAllCustomersData();
            return Ok(allTaxrateInfo);

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("ItemMaster", id); //.GetAllCustomersData();


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

        [HttpGet("GetCountries")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult cusTypeGet(ItemMasterViewModel itemMasterViewModel)
        {
            var allcustomertype = _unitOfWork.Countries.GetCountries(); //.GetAllCustomersData();
            return Ok(allcustomertype);

        }
        

        [HttpGet("GetitemList/{value}")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult itemlist(string  value,ItemMasterViewModel itemMasterViewModel)
        {
            if (value == "Stock")
            {
                var stocklist = _unitOfWork.itemMaster.getAllItemMasterStockdata(); //.GetAllCustomersData();
                return Ok(stocklist);
            }
            else if (value == "Non-stock")
            {
                var nonstocklist = _unitOfWork.itemMaster.getAllItemMasterNonstockdata(); //.GetAllCustomersData();
                return Ok(nonstocklist);
            }
            else if (value == "Equipment")
            {
                var equipmentlist = _unitOfWork.itemMaster.getAllItemMasterequipmentdata(); //.GetAllCustomersData();
                return Ok(equipmentlist);
            }
            //var allitemslist = _unitOfWork.itemMaster.getAllItemMasterdata(); //.GetAllCustomersData();
            return Ok(ModelState);
            
        }


        [HttpGet("GetRolesDatayRoleId/{value}")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult GetRolesByRoleId(long value)
        {           
                var stocklist = _unitOfWork.itemMaster.getRolesDatayRoleId(value); //.GetAllCustomersData();
                return Ok(stocklist);
           
            
        }
        [HttpGet("GetItemStocklist")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult itemstocklist(ItemMasterViewModel itemMasterViewModel)
        {
            var allitemslist = _unitOfWork.itemMaster.getAllItemMasterStockdata(); //.GetAllCustomersData();
            return Ok(allitemslist);

        }


        [HttpGet("GetItemnonstocklist")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult itemnonstocklist(ItemMasterViewModel itemMasterViewModel)
        {
            var allitemslist = _unitOfWork.itemMaster.getAllItemMasterNonstockdata(); //.GetAllCustomersData();
            return Ok(allitemslist);

        }

        [HttpGet("GetEquipmentlist")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult itemEquipmentlist(ItemMasterViewModel itemMasterViewModel)
        {
            var allitemslist = _unitOfWork.itemMaster.getAllItemMasterequipmentdata(); //.GetAllCustomersData();
            return Ok(allitemslist);

        }

        [HttpGet("getwarning")]
        [Produces(typeof(List<WarningViewModel>))]
        public IActionResult warnTypeGet(WarningViewModel warningViewModel)
        {
            var allcustomertype = _unitOfWork.warning.GetAllData(); //.GetAllCustomersData();
            return Ok(allcustomertype);

        }


        [HttpGet("GetManfacturerDetails")]
        [Produces(typeof(List<Manufacturer>))]
        public IActionResult GetManfacturerDetails()
        {

            var obj = _context.Manufacturer.OrderByDescending(c => c.ManufacturerId).Where(c => c.IsDelete == false || c.IsDelete == null).ToList();
            return Ok(obj);
        }

        [HttpGet("GetParntnumberlist")]
        [Produces(typeof(List<Manufacturer>))]
        public IActionResult GetParntnumberlist()
        {

            var obj = _context.ItemMaster.Where(a=>a.IsDelete == true || a.IsDelete == null).OrderByDescending(c => c.ItemMasterId).ToList();
            return Ok(obj);
          
        }

        [HttpGet("getEquipmentlist")]
       [Produces(typeof(List<Equipment>))]
        public IActionResult getEquipmentlist()
        {

            var obj = _context.Equipment.OrderByDescending(c => c.EquipmentId).ToList();
            return Ok(obj);
        }


        [HttpDelete("itemmaster/{id}")]
        [Produces(typeof(ItemMasterViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.itemMaster.GetSingleOrDefault(c => c.ItemMasterId == id);

            _unitOfWork.itemMaster.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("aircraftTypeGet/{id}")]
        [Produces(typeof(List<AircraftModelViewModel>))]
        public IActionResult aircraft(string id, AircraftModelViewModel aircraftModelViewModel)
        {


            var allcustomertype = _unitOfWork.aircraftModel.GetAllAircraftModelData(id); //.GetAllCustomersData();
            return Ok(allcustomertype);

        }

        [HttpGet("aircraftManufacturerGet/{id}")]
        [Produces(typeof(List<ItemMasterAircraftManufacturerViewModel>))]
        public IActionResult aircraftManufacturerGet(int id)
        {
            var aircraft = _unitOfWork.itemMaster.aircraftManufacturerData(id); //.GetAllCustomersData();
            return Ok(aircraft);

            //var aircraft = _unitOfWork.ItemMasterAircraftManafacturerRepository.GetAll();
            //var aircraftManufacturer = aircraft.Where(a => a.ItemMasterId == id).ToList();
            //return Ok(aircraftManufacturer);

        }

        [HttpGet("GetAircarftmodelsdata/{id}")]
        [Produces(typeof(List<AircraftModelViewModel>))]
        public IActionResult GetAircarftmodelsdata(long id)
        {


            var allseectedaircarftmodels = _unitOfWork.aircraftModel.GetSelectedAircraftModeldata(id); //.GetAllCustomersData();
            return Ok(allseectedaircarftmodels);

        }

        //[HttpGet("aircraftManufacturerGet/{id}")]
        //[Produces(typeof(List<ItemMasterAircraftManufacturerViewModel>))]
        //public IActionResult aircraftManufacturerDataGet(int id)
        //{
        //    var aircraft = _unitOfWork.ItemMasterAircraftManafacturerRepository.GetAll();
        //    var aircraftManufacturer = aircraft.Where(a => a.ItemMasterAircraftManufacturerId == id).ToList();
        //    return Ok(aircraftManufacturer);

        //}

        


        [HttpGet("GetCapesDatawithMasterId/{id}")]
        [Produces(typeof(List<AircraftModelViewModel>))]
        public IActionResult GetCapesDatawithMasterId(long id, CapesInfoViewModel capesInfoViewModel)
        {


            var allseectedaircarftmodels = _unitOfWork.aircraftModel.GetCapesWithMasterid(id); //.GetAllCustomersData();
            return Ok(allseectedaircarftmodels);

        }
        [HttpGet("Aircraftget")]
        [Produces(typeof(List<AircraftTypeViewModel>))]
        public IActionResult aircraftGet(AircraftTypeViewModel aircraftTypeViewModel)
        {
            var allatachapter = _unitOfWork.aircraftType.getAircraftTypeData(); //.GetAllCustomersData();
            return Ok(allatachapter);

        }

        [HttpPost("warning")]
        public IActionResult CreateContact([FromBody] WarningViewModel warningViewModel)
        {
            if (ModelState.IsValid)
            {
                if (warningViewModel == null)
                    return BadRequest($"{nameof(warningViewModel)} cannot be null");
                Warning contactObj = new Warning();
                warningViewModel.MasterCompanyId = 1;
                contactObj.MasterCompanyId = warningViewModel.MasterCompanyId;
                contactObj.IsActive = true;
                contactObj.Description = warningViewModel.Description;
                contactObj.CreatedDate = DateTime.Now;
                contactObj.UpdatedDate = DateTime.Now;
                contactObj.CreatedBy = warningViewModel.CreatedBy;
                contactObj.UpdatedBy = warningViewModel.UpdatedBy;
                _unitOfWork.warning.Add(contactObj);
                _unitOfWork.SaveChanges();
                return Ok(contactObj);
            }

            return Ok(ModelState);
        }
       
        [HttpPost("manufacturerpost")]
        public IActionResult manufacturer([FromBody] Manufacturer itemMasterViewModel)
        {
            if (ModelState.IsValid)
            {
                if (itemMasterViewModel == null)
                    return BadRequest($"{nameof(itemMasterViewModel)} cannot be null");
                Manufacturer itemmaserObj = new Manufacturer();
                itemmaserObj.Name = itemMasterViewModel.Name;
                itemmaserObj.MasterCompanyId = 1;
                itemmaserObj.IsActive = true;
                itemmaserObj.CreatedDate = DateTime.Now;
                itemmaserObj.UpdatedDate = DateTime.Now;
                itemmaserObj.CreatedBy = itemMasterViewModel.CreatedBy;
                itemmaserObj.UpdatedBy = itemMasterViewModel.UpdatedBy;
                _context.Manufacturer.Add(itemmaserObj);
                _unitOfWork.SaveChanges();
                return Ok(itemmaserObj);
            }

            return Ok(ModelState);
        }



        [HttpPost("Aircraftpost")]
        public IActionResult CreateAircraftmodelspot([FromBody] ItemMasterAircraftModel itemMasterAircraftModel)
        {
            if (ModelState.IsValid)
            {
                if (_context.ItemMasterAircraftModel.Any(o => o.AircraftModelId == itemMasterAircraftModel.AircraftModelId))
                {
                    // return BadRequest($"{nameof(capesInfoViewModel)} cannot be null");
                    var existingresule = _context.ItemMasterAircraftModel.Where(c => c.AircraftModelId == itemMasterAircraftModel.AircraftModelId).FirstOrDefault();
                    existingresule.AircraftModelId = itemMasterAircraftModel.AircraftModelId;
                   
                    existingresule.ItemMasterId = itemMasterAircraftModel.ItemMasterId;
                    existingresule.DashNumber = itemMasterAircraftModel.DashNumber;
                    existingresule.CreatedBy = itemMasterAircraftModel.CreatedBy;
                    existingresule.UpdatedBy = itemMasterAircraftModel.UpdatedBy;
                    existingresule.MasterCompanyId = 1;
                    existingresule.CreatedDate = DateTime.Now;
                    existingresule.UpdatedDate = DateTime.Now;
                    _context.ItemMasterAircraftModel.Update(existingresule);
                    _context.SaveChanges();
                }
                else
                {
                    ItemMasterAircraftModel cp = new ItemMasterAircraftModel();
                    cp.AircraftModelId = itemMasterAircraftModel.AircraftModelId;
                    cp.AircraftModelId = itemMasterAircraftModel.AircraftModelId;
                    cp.ItemMasterId = itemMasterAircraftModel.ItemMasterId;
                    cp.DashNumber = itemMasterAircraftModel.DashNumber;
                    cp.MasterCompanyId = 1;
                    cp.CreatedBy = itemMasterAircraftModel.CreatedBy;
                    cp.UpdatedBy = itemMasterAircraftModel.UpdatedBy;
                    cp.CreatedDate = DateTime.Now;
                    cp.UpdatedDate = DateTime.Now;
                    _context.ItemMasterAircraftModel.Add(cp);
                    _context.SaveChanges();
                    //long returnid = cp.CapabilityId;
                    //saveItemcapes(returnid, itemMasterAircraftModel.itemId);

                }
                }
                return Ok(itemMasterAircraftModel);
                // return Ok(ModelState);
            }


        //[HttpPost("Mancapespost")]
        //public IActionResult CreateManCappost([FromBody] CapesInfoViewModel capesInfoViewModel)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (_context.Capability.Any(o => o.CapabilityId == capesInfoViewModel.CapabilityId))
        //        {
        //            // return BadRequest($"{nameof(capesInfoViewModel)} cannot be null");
        //            var existingresule = _context.Capability.Where(c => c.CapabilityId == capesInfoViewModel.CapabilityId).FirstOrDefault();
        //            existingresule.AircraftManufacturer = capesInfoViewModel.AircraftManufacturer;
        //            existingresule.AircraftModelId = capesInfoViewModel.AircraftModelId;
        //            existingresule.AircraftTypeId = capesInfoViewModel.AircraftTypeId;
        //            existingresule.ATAMainId = capesInfoViewModel.atcChapterId1;
        //            existingresule.CapabilityTypeId = capesInfoViewModel.CapabilityTypeId;
        //            existingresule.AircraftManufacturer = capesInfoViewModel.Description;
        //            existingresule.MasterCompanyId = 1;
        //            existingresule.CreatedDate = DateTime.Now;
        //            existingresule.UpdatedDate = DateTime.Now;
        //            existingresule.DateVerified = capesInfoViewModel.dateVerified1;
        //            existingresule.Description = capesInfoViewModel.modelname1;
        //            existingresule.EntryDate = capesInfoViewModel.dateVerified1;
        //            existingresule.PartId = capesInfoViewModel.PartId;
        //            existingresule.IsCMMExist = capesInfoViewModel.isCMMExist1;
        //            existingresule.Memo = capesInfoViewModel.memo1;
        //            existingresule.CompanyId = capesInfoViewModel.MasterComapnyId1;
        //            existingresule.BuisinessUnitId = capesInfoViewModel.Buid1;
        //            existingresule.DepartmentId = capesInfoViewModel.Depid1;
        //            existingresule.DivisionId = capesInfoViewModel.Divid1;
        //            existingresule.ManufacturerId = capesInfoViewModel.ManufacturerId;
        //            existingresule.VerifiedBy = capesInfoViewModel.verifiedBy1;
        //            existingresule.IsActive = true;
        //            existingresule.IsDelete = true;
        //            existingresule.IsVerified = capesInfoViewModel.isVerified1;
        //            _context.Capability.Update(existingresule);
        //            _context.SaveChanges();

        //        }
        //        else {


        //            Capability cp = new Capability();
        //            cp.AircraftManufacturer = capesInfoViewModel.AircraftManufacturer;
        //            cp.AircraftModelId = capesInfoViewModel.AircraftModelId;
        //            cp.AircraftTypeId = capesInfoViewModel.AircraftTypeId;
        //            cp.ATAMainId = capesInfoViewModel.atcChapterId1;
        //            cp.CapabilityTypeId = capesInfoViewModel.CapabilityTypeId;
        //            cp.AircraftManufacturer = capesInfoViewModel.Description;
        //            cp.MasterCompanyId = 1;
        //            cp.CreatedDate = DateTime.Now;
        //            cp.UpdatedDate = DateTime.Now;
        //            cp.DateVerified = capesInfoViewModel.dateVerified1;
        //            cp.Description = capesInfoViewModel.modelname1;
        //            cp.EntryDate = capesInfoViewModel.dateVerified1;
        //            cp.PartId = capesInfoViewModel.PartId;
        //            cp.IsCMMExist = capesInfoViewModel.isCMMExist1;
        //            cp.Memo = capesInfoViewModel.memo1;
        //            cp.VerifiedBy = capesInfoViewModel.verifiedBy1;
        //            cp.IsActive = true;
        //            cp.IsDelete = true;
        //            cp.CompanyId = capesInfoViewModel.MasterComapnyId1;
        //            cp.BuisinessUnitId = capesInfoViewModel.Buid1;
        //            cp.DepartmentId = capesInfoViewModel.Depid1;
        //            cp.DivisionId = capesInfoViewModel.Divid1;
        //            cp.IsVerified = capesInfoViewModel.isVerified1;
        //            cp.ManufacturerId = capesInfoViewModel.ManufacturerId;
        //            _context.Capability.Add(cp);
        //            _context.SaveChanges();
        //            long returnid = cp.CapabilityId;
        //            saveItemcapes(returnid, capesInfoViewModel.itemId);
        //            return Ok(capesInfoViewModel);


        //        }
        //    }
        //    return Ok(capesInfoViewModel);
        //    // return Ok(ModelState);
        //}
        [HttpPost("Mancapespost")]
        public IActionResult addCharges([FromBody] Capability capability)
        {
            if (ModelState.IsValid)
            {
                capability.CapabilityId = 0;
                capability.MasterCompanyId = 1;
                capability.CreatedDate = DateTime.Now;
                _unitOfWork.Repository<Capability>().Add(capability);
                _unitOfWork.SaveChanges();
            }
            return Ok();
        }
        public void saveItemcapes(long returnid,long itemid) {

            ItemMasterCapes imc = new ItemMasterCapes();

            imc.CapabilityId = returnid;
            imc.ItemMasterId = itemid;
            imc.MasterCompanyId = 1;
            imc.CreatedDate = DateTime.Now;
            imc.UpdatedDate = DateTime.Now;
            imc.IsActive = true;
            _context.ItemMasterCapes.Add(imc);
            _context.SaveChanges();



          
        }

        [HttpPost("itemMasterpost")]
        public IActionResult CreateContact([FromBody] ItemMasterViewModel itemMasterViewModel,Part part, Manufacturer manufacturer,Equipment equipment)
        {
            if (ModelState.IsValid)
            {
                if (itemMasterViewModel == null)
                    return BadRequest($"{nameof(itemMasterViewModel)} cannot be null");
                ItemMaster itemmaserObj = new ItemMaster();
                part.MasterCompanyId = 1;
                itemmaserObj.MasterCompanyId = 1;
                itemmaserObj.IsActive = true;
                itemmaserObj.PartNumber = itemMasterViewModel.PartNumber;
                itemmaserObj.PartDescription = itemMasterViewModel.Partdescription;
                part.ParentPartId = itemMasterViewModel.ParentPartId;
                equipment.Description = itemMasterViewModel.EquipmentDescription;
                manufacturer.Name = itemMasterViewModel.Name;
                //itemMasterViewModel.MasterCompanyId = 1;
                itemmaserObj.ItemMasterId = itemMasterViewModel.ItemMasterId;
                //itemmaserObj.ItemCategoryId = itemMasterViewModel.ItemCategoryId;
                itemmaserObj.ItemTypeId = itemMasterViewModel.ItemTypeId;
               // itemmaserObj.PartId = itemMasterViewModel.PartId;
                itemmaserObj.NHA = itemMasterViewModel.NHA;
                itemmaserObj.TurnTimeOverhaulHours = itemMasterViewModel.TurnTimeOverhaulHours;
                itemmaserObj.TurnTimeRepairHours = itemMasterViewModel.TurnTimeRepairHours;
                itemmaserObj.CoreValue = itemMasterViewModel.CoreValue;
                itemmaserObj.ExchangeListPrice = itemMasterViewModel.ExchangeListPrice;
                itemmaserObj.OverheadCost = itemMasterViewModel.OverheadCost;
                itemmaserObj.PartListPrice = itemMasterViewModel.PartListPrice;
                itemmaserObj.POCoreCharge = itemMasterViewModel.POCoreCharge;
                itemmaserObj.SOCoreCharge = itemMasterViewModel.SOCoreCharge;
               // itemmaserObj.AlterPartNumber = itemMasterViewModel.AlterPartNumber;
              //  itemmaserObj.PartAlternatePartId = itemMasterViewModel.PartAlternatePartId;
                itemmaserObj.IsAlternatePartChecked = itemMasterViewModel.IsAlternatePartChecked;
                if (itemMasterViewModel.IsSerialized == null)
                {
                    itemMasterViewModel.IsSerialized = false;
                }
                else {
                    itemmaserObj.IsSerialized = itemMasterViewModel.IsSerialized;
                }
               
                itemmaserObj.SerialNumber = itemMasterViewModel.SerialNumber;
                itemmaserObj.CertifiedBy = itemMasterViewModel.CertifiedBy;
                itemmaserObj.TagDate = itemMasterViewModel.TagDate;
                itemmaserObj.TagType = itemMasterViewModel.TagType;
                itemmaserObj.PartsCertNum = itemMasterViewModel.PartsCertNum;
                itemmaserObj.ItemGroupId = itemMasterViewModel.ItemGroupId;
                itemmaserObj.ItemClassificationId = itemMasterViewModel.ItemClassificationId;
                itemmaserObj.AssetNumber = itemMasterViewModel.AssetNumber;
                itemmaserObj.IsAcquiredMethodBuy = itemMasterViewModel.IsAcquiredMethodBuy;
                itemmaserObj.IsHazardousMaterial = itemMasterViewModel.IsHazardousMaterial;
                itemmaserObj.IsExpirationDateAvailable = itemMasterViewModel.IsExpirationDateAvailable;
                itemmaserObj.ExpirationDate = itemMasterViewModel.ExpirationDate;
                itemmaserObj.IsReceivedDateAvailable = itemMasterViewModel.IsReceivedDateAvailable;
                itemmaserObj.DaysReceived = itemMasterViewModel.DaysReceived;
                itemmaserObj.IsManufacturingDateAvailable = itemMasterViewModel.IsManufacturingDateAvailable;
                itemmaserObj.ManufacturingDays = itemMasterViewModel.ManufacturingDays;
                itemmaserObj.IsTagDateAvailable = itemMasterViewModel.IsTagDateAvailable;
                itemmaserObj.TagDays = itemMasterViewModel.TagDays;
                itemmaserObj.IsOpenDateAvailable = itemMasterViewModel.IsOpenDateAvailable;
                itemmaserObj.OpenDays = itemMasterViewModel.OpenDays;
                itemmaserObj.IsShippedDateAvailable = itemMasterViewModel.IsShippedDateAvailable;
                itemmaserObj.ShippedDays = itemMasterViewModel.ShippedDays;
                itemmaserObj.IsOtherDateAvailable = itemMasterViewModel.IsOtherDateAvailable;
                itemmaserObj.OtherDays = itemMasterViewModel.OtherDays;
                itemmaserObj.ActiveFlag = itemMasterViewModel.ActiveFlag;
                itemmaserObj.ProvisionId = itemMasterViewModel.ProvisionId;
                itemmaserObj.ManufacturerId = itemMasterViewModel.ManufacturerId;
                //itemmaserObj.AircraftTypeId = itemMasterViewModel.AircraftTypeId;
                itemmaserObj.PMA = itemMasterViewModel.PMA;
                itemmaserObj.DER = itemMasterViewModel.DER;
                itemmaserObj.ATAChapterId = itemMasterViewModel.ATAChapterId;
                itemmaserObj.ATASubChapterId = itemMasterViewModel.ATASubChapterId;
                itemmaserObj.ATAMainSub2Id = itemMasterViewModel.ATAMainSub2Id;
                itemmaserObj.NationalStockNumber = itemMasterViewModel.NationalStockNumber;
                itemmaserObj.IsSchematic = itemMasterViewModel.IsSchematic;
                //itemmaserObj.FileSystemId = itemMasterViewModel.FileSystemId;
                itemmaserObj.OverhaulHours = itemMasterViewModel.OverhaulHours;
                itemmaserObj.RPHours = itemMasterViewModel.RPHours;
                itemmaserObj.TestHours = itemMasterViewModel.TestHours;
                itemmaserObj.CSE = itemMasterViewModel.CSE;
                itemmaserObj.RFQTracking = itemMasterViewModel.RFQTracking;
                itemmaserObj.GLAccountId = itemMasterViewModel.GLAccountId;
                itemmaserObj.PurchaseLastListPriceDate = itemMasterViewModel.PurchaseLastListPriceDate;
                itemmaserObj.SalesLastSalePriceDate = itemMasterViewModel.SalesLastSalePriceDate;
                itemmaserObj.PurchaseUnitOfMeasureId = itemMasterViewModel.PurchaseUnitOfMeasureId;
                itemmaserObj.ExportUomId = itemMasterViewModel.ExportUomId;
                itemmaserObj.PurchaseLastDiscountPercentDate = itemMasterViewModel.PurchaseLastDiscountPercentDate;
                itemmaserObj.PurchaseLastListPriceAfterDiscountDate = itemMasterViewModel.PurchaseLastListPriceAfterDiscountDate;
                itemmaserObj.SalesLastMarkUpPercentOnListPriceDate = itemMasterViewModel.SalesLastMarkUpPercentOnListPriceDate;
                itemmaserObj.SalesLastMakUpPercentOnListPriceAfterDiscDate = itemMasterViewModel.SalesLastMakUpPercentOnListPriceAfterDiscDate;
                itemmaserObj.SalesLastBaselineSalesPriceDate = itemMasterViewModel.SalesLastBaselineSalesPriceDate;
                itemmaserObj.SalesLastSalesDiscountPercentDate = itemMasterViewModel.SalesLastSalesDiscountPercentDate;
                itemmaserObj.StockUnitOfMeasureId = itemMasterViewModel.StockUnitOfMeasureId;
                itemmaserObj.ConsumeUnitOfMeasureId = itemMasterViewModel.ConsumeUnitOfMeasureId;
                itemmaserObj.LeadTimeDays = itemMasterViewModel.LeadTimeDays;
                itemmaserObj.LeadTimeHours = itemMasterViewModel.LeadTimeHours;
                itemmaserObj.ReorderQuantiy = itemMasterViewModel.ReorderQuantiy;
                itemmaserObj.ReorderPoint = itemMasterViewModel.ReorderPoint;
                itemmaserObj.MinimumOrderQuantity = itemMasterViewModel.MinimumOrderQuantity;
                itemmaserObj.IsExchangeInfoAvailable = itemMasterViewModel.IsExchangeInfoAvailable;
                itemmaserObj.CoreValue = itemMasterViewModel.CoreValue;
                itemmaserObj.OverheadCost = itemMasterViewModel.OverheadCost;
                itemmaserObj.PartListPrice = itemMasterViewModel.PartListPrice;
                itemmaserObj.POCoreCharge = itemMasterViewModel.POCoreCharge;
                itemmaserObj.SOCoreCharge = itemMasterViewModel.SOCoreCharge;
                itemmaserObj.PriorityId = itemMasterViewModel.PriorityId;
               // itemmaserObj.IntegrationPortalId = itemMasterViewModel.IntegrationPortalId;
                itemmaserObj.WarningId = itemMasterViewModel.WarningId;
                itemmaserObj.Memo = itemMasterViewModel.Memo;
                itemmaserObj.ExportCountryId = itemMasterViewModel.ExportCountryId;
                itemmaserObj.ExportValue = itemMasterViewModel.ExportValue;
                itemmaserObj.ExportCurrencyId = itemMasterViewModel.ExportCurrencyId;
                itemmaserObj.ExportWeight = itemMasterViewModel.ExportWeight;
                itemmaserObj.ExportWeightUnit = itemMasterViewModel.ExportWeightUnit;
                itemmaserObj.ExportSizeLength = itemMasterViewModel.ExportSizeLength;
                itemmaserObj.ExportSizeWidth = itemMasterViewModel.ExportSizeWidth;
                itemmaserObj.ExportSizeHeight = itemMasterViewModel.ExportSizeHeight;
                itemmaserObj.ExportSizeUnit = itemMasterViewModel.ExportSizeUnit;
                itemmaserObj.ExportClassificationId = itemMasterViewModel.ExportClassificationId;
                itemmaserObj.PurchaseListPrice = itemMasterViewModel.PurchaseListPrice;
                itemmaserObj.PurchaseDiscountOffListPrice = itemMasterViewModel.PurchaseDiscountOffListPrice;
                itemmaserObj.PurchaseListPriceAfterDiscount = itemMasterViewModel.PurchaseListPriceAfterDiscount;
                itemmaserObj.PurchaseCurrencyId = itemMasterViewModel.PurchaseCurrencyId;
                itemmaserObj.SalesMarkUpOnPurchaseListPriceActive = itemMasterViewModel.SalesMarkUpOnPurchaseListPriceActive;
                itemmaserObj.SalesMarkUpOnListPrice = itemMasterViewModel.SalesMarkUpOnListPrice;
                itemmaserObj.SalesDiscountPercent = itemMasterViewModel.SalesDiscountPercent;
                itemmaserObj.SalesMarkUpOnPurchaseListPriceActive = itemMasterViewModel.SalesMarkUpOnPurchaseListPriceActive;
                itemmaserObj.SalesMarkUpOnListPriceAfterDisc = itemMasterViewModel.SalesMarkUpOnListPriceAfterDisc;
                itemmaserObj.SalesBaselineSalesPrice = itemMasterViewModel.SalesBaselineSalesPrice;
                itemmaserObj.SalesBaselineSalesPrice = itemMasterViewModel.SalesBaselineSalesPrice;
                
                itemmaserObj.SalesDiscountPercent = itemMasterViewModel.SalesDiscountPercent;
                //itemmaserObj.SalesPriceActive = itemMasterViewModel.SalesPriceActive;
                //itemmaserObj.SalesPrice = itemMasterViewModel.SalesPrice;
                itemmaserObj.SalesCurrencyId = itemMasterViewModel.SalesCurrencyId;
                itemmaserObj.SalesMarkUpOnPurchaseListPriceActive = itemMasterViewModel.SalesMarkUpOnPurchaseListPriceActive;
                itemmaserObj.SalesMarkUpOnListPrice = itemMasterViewModel.SalesMarkUpOnListPrice;
                itemmaserObj.SalesDiscountPercent = itemMasterViewModel.SalesDiscountPercent;
                itemmaserObj.SalesMarkUpOnPurchaseListPriceActive = itemMasterViewModel.SalesMarkUpOnPurchaseListPriceActive;
                itemmaserObj.SalesMarkUpOnListPriceAfterDisc = itemMasterViewModel.SalesMarkUpOnListPriceAfterDisc;
                itemmaserObj.SalesBaselineSalesPrice = itemMasterViewModel.SalesBaselineSalesPrice;
                itemmaserObj.SalesBaselineSalesPrice = itemMasterViewModel.SalesBaselineSalesPrice;

                itemmaserObj.SalesPrice = itemMasterViewModel.SalesPrice;
                itemmaserObj.StandAloneEquipment = itemMasterViewModel.StandAloneEquipment;
                itemmaserObj.ComponentEquipment = itemMasterViewModel.ComponentEquipment;
                itemmaserObj.EquipmentId = itemMasterViewModel.EquipmentId;
                itemmaserObj.EquipmentUOMId = itemMasterViewModel.EquipmentUOMId;
                itemmaserObj.AssetId = itemMasterViewModel.AssetId;
                itemmaserObj.CalibrationRequired = itemMasterViewModel.CalibrationRequired;
                itemmaserObj.FrequencyTypeMonths = itemMasterViewModel.FrequencyTypeMonths;
                itemmaserObj.FrequencyTypeDays = itemMasterViewModel.FrequencyTypeDays;
                itemmaserObj.CertificationRequired = itemMasterViewModel.CertificationRequired;
                itemmaserObj.CertificationFrequency = itemMasterViewModel.CertificationFrequency;
                itemmaserObj.EquipmentTypeId = itemMasterViewModel.EquipmentTypeId;
                itemmaserObj.EquipmentValidationTypeId = itemMasterViewModel.EquipmentValidationTypeId;
                itemmaserObj.UnitCost = itemMasterViewModel.UnitCost;
                itemmaserObj.CapabilityVerifiedBy = itemMasterViewModel.CapabilityVerifiedBy;
                itemmaserObj.CapabilityVerificationDate = itemMasterViewModel.CapabilityVerificationDate;
                itemmaserObj.ManufacturingDate = itemMasterViewModel.ManufacturingDate;
                itemmaserObj.IsShelfLifeAvailable = itemMasterViewModel.IsShelfLifeAvailable;
                itemmaserObj.OpenDate = itemMasterViewModel.OpenDate;
                itemmaserObj.IsProvisioned = itemMasterViewModel.IsProvisioned;
                itemmaserObj.IsCapesAvailable = itemMasterViewModel.IsCapesAvailable;
                itemmaserObj.EntryDate = itemMasterViewModel.EntryDate;
                itemmaserObj.IsCMMExist = itemMasterViewModel.IsCMMExist;
                itemmaserObj.CMMLink = itemMasterViewModel.CMMLink;
                itemmaserObj.IsVerified = itemMasterViewModel.IsVerified;
                itemmaserObj.CapesMemo = itemMasterViewModel.CapesMemo;
                itemmaserObj.ManufacturingDescription = itemMasterViewModel.ManufacturingDescription;
                itemmaserObj.OverhaulDescription = itemMasterViewModel.OverhaulDescription;
                itemmaserObj.DistributeDescription = itemMasterViewModel.DistributeDescription;
                itemmaserObj.CertifiedDescription = itemMasterViewModel.CertifiedDescription;
                itemmaserObj.RepairDescription = itemMasterViewModel.RepairDescription;
                itemmaserObj.ExchangeDescription = itemMasterViewModel.ExchangeDescription;
                itemmaserObj.VerifiedBy = itemMasterViewModel.VerifiedBy;
                itemmaserObj.DateVerified = itemMasterViewModel.DateVerified;
                //itemmaserObj.PlatformId = itemMasterViewModel.PlatformId;
                itemmaserObj.SchematicDiagramFile = itemMasterViewModel.SchematicDiagramFile;
                itemmaserObj.ListPrice = itemMasterViewModel.ListPrice;
                itemmaserObj.PriceDate = itemMasterViewModel.PriceDate;
                itemmaserObj.IsRFQTracking = itemMasterViewModel.IsRFQTracking;
                itemmaserObj.SoldUnitOfMeasureId = itemMasterViewModel.SoldUnitOfMeasureId;
                itemmaserObj.CurrencyId = itemMasterViewModel.CurrencyId;
                itemmaserObj.MarkUpPercent = itemMasterViewModel.MarkUpPercent;
                itemmaserObj.DiscountPurchasePercent = itemMasterViewModel.DiscountPurchasePercent;
                itemmaserObj.DiscounSalesPercent = itemMasterViewModel.DiscounSalesPercent;
                itemmaserObj.StoredUOM = itemMasterViewModel.StoredUOM;
                itemmaserObj.ConsumeUOM = itemMasterViewModel.ConsumeUOM;
                itemmaserObj.StockLevel = itemMasterViewModel.StockLevel;
                itemmaserObj.LeadTime = itemMasterViewModel.LeadTime;
                itemmaserObj.Notes = itemMasterViewModel.Notes;
                itemmaserObj.ToleranceMinimum = itemMasterViewModel.ToleranceMinimum;
                itemmaserObj.ToleranceMaximum = itemMasterViewModel.ToleranceMaximum;
                itemmaserObj.ToleranceExpected = itemMasterViewModel.ToleranceExpected;
                itemmaserObj.IntegrateWith = itemMasterViewModel.IntegrateWith;
                itemmaserObj.Findings = itemMasterViewModel.Findings;
                itemmaserObj.CompanyId = itemMasterViewModel.CompanyId;
                itemmaserObj.BusinessUnitId = itemMasterViewModel.BusinessUnitId;
                itemmaserObj.DivisionId = itemMasterViewModel.DivisionId;
                itemmaserObj.DepartmentId = itemMasterViewModel.DepartmentId;
                itemmaserObj.SalesIsFixedPrice = itemMasterViewModel.SalesIsFixedPrice;
                itemmaserObj.IsTimeLife = itemMasterViewModel.IsTimeLife;
                itemmaserObj.MasterCompanyId = itemMasterViewModel.MasterCompanyId;
                //itemmaserObj.IsActive = itemMasterViewModel.IsActive;
                itemmaserObj.CreatedDate = DateTime.Now;
                itemmaserObj.UpdatedDate = DateTime.Now;
                itemmaserObj.CreatedBy = itemMasterViewModel.CreatedBy;
                itemmaserObj.UpdatedBy = itemMasterViewModel.UpdatedBy;
                //if (part.PartNumber != null) {
                //    _context.Part.Add(part);
                //    _unitOfWork.SaveChanges();
                //    itemmaserObj.PartId = part.PartId;
                //}
                if (manufacturer.Comments != null) {
                    _context.Manufacturer.Add(manufacturer);
                    _unitOfWork.SaveChanges();
                    itemmaserObj.ManufacturerId = manufacturer.ManufacturerId;
                }
                if (equipment.Description != null)
                {
                    _context.Equipment.Add(equipment);
                    _unitOfWork.SaveChanges();
                    itemmaserObj.EquipmentId = equipment.EquipmentId;
                }
                if (itemMasterViewModel.ATAChapterId == null)
                {
                    itemmaserObj.ATAChapterId = null;
                }
                if (itemMasterViewModel.ATASubChapterId == null)
                {
                    itemmaserObj.ATASubChapterId = null;
                }
                if (itemMasterViewModel.ATAMainSub2Id == null)
                {
                    itemmaserObj.ATAMainSub2Id = null;
                }
                if (itemMasterViewModel.AircraftTypeId == null)
                {
                    itemmaserObj.AircraftTypeId = null;
                }
                if (itemMasterViewModel.StockUnitOfMeasureId == null)
                {
                    itemmaserObj.StockUnitOfMeasureId = null;
                }
                if (itemMasterViewModel.PurchaseUnitOfMeasureId == null)
                {
                    itemmaserObj.PurchaseUnitOfMeasureId = null;
                }
                if (itemMasterViewModel.ExportUomId == null)
                {
                    itemmaserObj.ExportUomId = null;
                }

                if (itemMasterViewModel.ConsumeUnitOfMeasureId == null)
                {
                    itemmaserObj.ConsumeUnitOfMeasureId = null;
                }
                if (itemMasterViewModel.PriorityId == null)
                {
                    itemmaserObj.PriorityId = null;
                }
                if (itemMasterViewModel.IntegrationPortalId == null)
                {
                    itemmaserObj.IntegrationPortalId = null;
                }
                if (itemMasterViewModel.WarningId == null)
                {
                    itemmaserObj.WarningId = null;
                }
                if (itemMasterViewModel.ExportCountryId == null)
                {
                    itemmaserObj.ExportCountryId = null;
                }
                if (itemMasterViewModel.ExportCurrencyId == null)
                {
                    itemmaserObj.ExportCurrencyId = null;
                }
                if (itemMasterViewModel.ExportClassificationId == null)
                {
                    itemmaserObj.ExportClassificationId = null;
                }
                if (itemMasterViewModel.PurchaseCurrencyId == null)
                {
                    itemmaserObj.PurchaseCurrencyId = null;
                }
                if (itemMasterViewModel.SalesCurrencyId == null)
                {
                    itemmaserObj.SalesCurrencyId = null;
                }
                if (itemMasterViewModel.EquipmentTypeId == null)
                {
                    itemmaserObj.EquipmentTypeId = null;
                }
                if (itemMasterViewModel.EquipmentValidationTypeId == null)
                {
                    itemmaserObj.EquipmentValidationTypeId = null;
                }
                if (itemMasterViewModel.PlatformId == null)
                {
                    itemmaserObj.PlatformId = null;
                }
                if (itemMasterViewModel.MasterCompanyId == null)
                {
                    itemmaserObj.MasterCompanyId = null;
                }
                if (itemMasterViewModel.CurrencyId == null)
                {
                    itemmaserObj.CurrencyId = null;
                }
                if (itemMasterViewModel.BusinessUnitId == null)
                {
                    itemmaserObj.BusinessUnitId = null;
                }
                if (itemMasterViewModel.DepartmentId == null)
                {
                    itemmaserObj.DepartmentId = null;

                }
                if (itemMasterViewModel.DivisionId == null)
                {
                    itemmaserObj.DivisionId = null;
                }
                if (itemMasterViewModel.CompanyId == null)
                {
                    itemmaserObj.CompanyId = null;

                }
                if (itemMasterViewModel.ProvisionId == null)
                {
                    itemmaserObj.ProvisionId = null;
                }
                _unitOfWork.itemMaster.Add(itemmaserObj);
                _unitOfWork.SaveChanges();
                return Ok(itemmaserObj);
            }
            return Ok(itemMasterViewModel);
            // return Ok(ModelState);
        }


        [HttpPut("itemMasterpost/{id}")]
        public IActionResult updateItems(long id,[FromBody] ItemMasterViewModel itemMasterViewModel)
        {
            if (ModelState.IsValid)
            {
                if (itemMasterViewModel == null)
                    return BadRequest($"{nameof(itemMasterViewModel)} cannot be null");
                var itemmaserObj = _unitOfWork.itemMaster.GetSingleOrDefault(c => c.ItemMasterId == id);
                itemMasterViewModel.MasterCompanyId = 1;
               // var partExistingresult = _context.Part.Where(c => c.PartId == itemMasterViewModel.PartId).FirstOrDefault();
               //var manfacture = _context.Manufacturer.Where(a => a.ManufacturerId == itemMasterViewModel.ManufacturerId).FirstOrDefault();
               //partExistingresult.PartNumber = itemMasterViewModel.PartNumber;
               //partExistingresult.Description = itemMasterViewModel.Partdescription;
               //partExistingresult.ParentPartId = itemMasterViewModel.ParentPartId;
               // itemmaserObj.IsActive = true;
                itemmaserObj.PartNumber = itemMasterViewModel.PartNumber;
                itemmaserObj.PartDescription = itemMasterViewModel.Partdescription;
                itemmaserObj.ExchangeListPrice = itemMasterViewModel.ExchangeListPrice;
                itemmaserObj.OverheadCost = itemMasterViewModel.OverheadCost;
                itemmaserObj.IsAlternatePartChecked = itemMasterViewModel.IsAlternatePartChecked;
                itemmaserObj.TurnTimeOverhaulHours = itemMasterViewModel.TurnTimeOverhaulHours;
                itemmaserObj.TurnTimeRepairHours = itemMasterViewModel.TurnTimeRepairHours;
              //  itemmaserObj.AlterPartNumber = itemMasterViewModel.AlterPartNumber;
                //itemmaserObj.PartAlternatePartId = itemMasterViewModel.PartAlternatePartId;
                itemmaserObj.IsSerialized = itemMasterViewModel.IsSerialized;
                itemmaserObj.SerialNumber = itemMasterViewModel.SerialNumber;
                itemmaserObj.CertifiedBy = itemMasterViewModel.CertifiedBy;
                itemmaserObj.TagDate = itemMasterViewModel.TagDate;
                itemmaserObj.TagType = itemMasterViewModel.TagType;
                itemmaserObj.PartsCertNum = itemMasterViewModel.PartsCertNum;
                itemmaserObj.ItemGroupId = itemMasterViewModel.ItemGroupId;
              //  itemmaserObj.itemGroupName = itemMasterViewModel.itemGroupName;
                itemmaserObj.ItemClassificationId = itemMasterViewModel.ItemClassificationId;
                itemmaserObj.AssetNumber = itemMasterViewModel.AssetNumber;
                itemmaserObj.IsAcquiredMethodBuy = itemMasterViewModel.IsAcquiredMethodBuy;
                itemmaserObj.IsHazardousMaterial = itemMasterViewModel.IsHazardousMaterial;
                itemmaserObj.IsExpirationDateAvailable = itemMasterViewModel.IsExpirationDateAvailable;
                itemmaserObj.ExpirationDate = itemMasterViewModel.ExpirationDate;
                itemmaserObj.IsReceivedDateAvailable = itemMasterViewModel.IsReceivedDateAvailable;
                itemmaserObj.DaysReceived = itemMasterViewModel.DaysReceived;
                itemmaserObj.IsManufacturingDateAvailable = itemMasterViewModel.IsManufacturingDateAvailable;
                itemmaserObj.ManufacturingDays = itemMasterViewModel.ManufacturingDays;
                itemmaserObj.IsTagDateAvailable = itemMasterViewModel.IsTagDateAvailable;
                itemmaserObj.TagDays = itemMasterViewModel.TagDays;
                itemmaserObj.IsOpenDateAvailable = itemMasterViewModel.IsOpenDateAvailable;
                itemmaserObj.OpenDays = itemMasterViewModel.OpenDays;
                itemmaserObj.IsShippedDateAvailable = itemMasterViewModel.IsShippedDateAvailable;
                itemmaserObj.ShippedDays = itemMasterViewModel.ShippedDays;
                itemmaserObj.IsOtherDateAvailable = itemMasterViewModel.IsOtherDateAvailable;
                itemmaserObj.OtherDays = itemMasterViewModel.OtherDays;
                itemmaserObj.ActiveFlag = itemMasterViewModel.ActiveFlag;
                itemmaserObj.ProvisionId = itemMasterViewModel.ProvisionId;
                itemmaserObj.ManufacturerId = itemMasterViewModel.ManufacturerId;
                itemmaserObj.PurchaseLastListPriceDate = itemMasterViewModel.PurchaseLastListPriceDate;
                itemmaserObj.SalesLastSalePriceDate = itemMasterViewModel.SalesLastSalePriceDate;
                itemmaserObj.PurchaseLastDiscountPercentDate = itemMasterViewModel.PurchaseLastDiscountPercentDate;
                itemmaserObj.PurchaseLastListPriceAfterDiscountDate = itemMasterViewModel.PurchaseLastListPriceAfterDiscountDate;
                itemmaserObj.SalesLastMarkUpPercentOnListPriceDate = itemMasterViewModel.SalesLastMarkUpPercentOnListPriceDate;
                itemmaserObj.SalesLastMakUpPercentOnListPriceAfterDiscDate = itemMasterViewModel.SalesLastMakUpPercentOnListPriceAfterDiscDate;
                itemmaserObj.SalesLastBaselineSalesPriceDate = itemMasterViewModel.SalesLastBaselineSalesPriceDate;
                itemmaserObj.SalesLastSalesDiscountPercentDate = itemMasterViewModel.SalesLastSalesDiscountPercentDate;
                //itemmaserObj.AircraftTypeId = itemMasterViewModel.AircraftTypeId;
                itemmaserObj.PMA = itemMasterViewModel.PMA;
                itemmaserObj.DER = itemMasterViewModel.DER;
                itemmaserObj.ATAChapterId = itemMasterViewModel.ATAChapterId;
                itemmaserObj.ATASubChapterId = itemMasterViewModel.ATASubChapterId;
                itemmaserObj.ATAMainSub2Id = itemMasterViewModel.ATAMainSub2Id;
                itemmaserObj.NationalStockNumber = itemMasterViewModel.NationalStockNumber;
                itemmaserObj.IsSchematic = itemMasterViewModel.IsSchematic;

                itemmaserObj.SalesIsFixedPrice = itemMasterViewModel.SalesIsFixedPrice;

                //itemmaserObj.FileSystemId = itemMasterViewModel.FileSystemId;
                itemmaserObj.OverhaulHours = itemMasterViewModel.OverhaulHours;
                itemmaserObj.RPHours = itemMasterViewModel.RPHours;
                itemmaserObj.SalesPrice = itemMasterViewModel.SalesPrice;
                itemmaserObj.SalesCurrencyId = itemMasterViewModel.SalesCurrencyId;
                itemmaserObj.TestHours = itemMasterViewModel.TestHours;
                itemmaserObj.CSE = itemMasterViewModel.CSE;
                itemmaserObj.RFQTracking = itemMasterViewModel.RFQTracking;
                itemmaserObj.GLAccountId = itemMasterViewModel.GLAccountId;
                itemmaserObj.PurchaseUnitOfMeasureId = itemMasterViewModel.PurchaseUnitOfMeasureId;
                itemmaserObj.ExportUomId = itemMasterViewModel.ExportUomId;
                itemmaserObj.StockUnitOfMeasureId = itemMasterViewModel.StockUnitOfMeasureId;
                itemmaserObj.ConsumeUnitOfMeasureId = itemMasterViewModel.ConsumeUnitOfMeasureId;
                itemmaserObj.SoldUnitOfMeasureId = itemMasterViewModel.SoldUnitOfMeasureId;
                itemmaserObj.LeadTimeDays = itemMasterViewModel.LeadTimeDays;
                itemmaserObj.LeadTimeHours = itemMasterViewModel.LeadTimeHours;
                itemmaserObj.ReorderQuantiy = itemMasterViewModel.ReorderQuantiy;
                itemmaserObj.ReorderPoint = itemMasterViewModel.ReorderPoint;
                itemmaserObj.MinimumOrderQuantity = itemMasterViewModel.MinimumOrderQuantity;
                itemmaserObj.IsExchangeInfoAvailable = itemMasterViewModel.IsExchangeInfoAvailable;
                itemmaserObj.CoreValue = itemMasterViewModel.CoreValue;
                itemmaserObj.OverheadCost = itemMasterViewModel.OverheadCost;
                itemmaserObj.PartListPrice = itemMasterViewModel.PartListPrice;
                itemmaserObj.POCoreCharge = itemMasterViewModel.POCoreCharge;
                itemmaserObj.SOCoreCharge = itemMasterViewModel.SOCoreCharge;
                itemmaserObj.PriorityId = itemMasterViewModel.PriorityId;
               // itemmaserObj.IntegrationPortalId = itemMasterViewModel.IntegrationPortalId;
                itemmaserObj.WarningId = itemMasterViewModel.WarningId;
                itemmaserObj.Memo = itemMasterViewModel.Memo;
                itemmaserObj.ExportCountryId = itemMasterViewModel.ExportCountryId;
                itemmaserObj.ExportValue = itemMasterViewModel.ExportValue;
                itemmaserObj.ExportCurrencyId = itemMasterViewModel.ExportCurrencyId;
                itemmaserObj.ExportWeight = itemMasterViewModel.ExportWeight;
                itemmaserObj.ExportWeightUnit = itemMasterViewModel.ExportWeightUnit;
                itemmaserObj.ExportSizeLength = itemMasterViewModel.ExportSizeLength;
                itemmaserObj.ExportSizeWidth = itemMasterViewModel.ExportSizeWidth;
                itemmaserObj.ExportSizeHeight = itemMasterViewModel.ExportSizeHeight;
                itemmaserObj.ExportSizeUnit = itemMasterViewModel.ExportSizeUnit;
                itemmaserObj.ExportClassificationId = itemMasterViewModel.ExportClassificationId;
                itemmaserObj.PurchaseListPrice = itemMasterViewModel.PurchaseListPrice;
                itemmaserObj.PurchaseDiscountOffListPrice = itemMasterViewModel.PurchaseDiscountOffListPrice;
                itemmaserObj.PurchaseListPriceAfterDiscount = itemMasterViewModel.PurchaseListPriceAfterDiscount;
                itemmaserObj.PurchaseCurrencyId = itemMasterViewModel.PurchaseCurrencyId;
                itemmaserObj.SalesMarkUpOnPurchaseListPriceActive = itemMasterViewModel.SalesMarkUpOnPurchaseListPriceActive;
                itemmaserObj.SalesMarkUpOnListPrice = itemMasterViewModel.SalesMarkUpOnListPrice;
                itemmaserObj.SalesDiscountPercent = itemMasterViewModel.SalesDiscountPercent;
                itemmaserObj.SalesMarkUpOnPurchaseListPriceActive = itemMasterViewModel.SalesMarkUpOnPurchaseListPriceActive;
                itemmaserObj.SalesMarkUpOnListPriceAfterDisc = itemMasterViewModel.SalesMarkUpOnListPriceAfterDisc;
                itemmaserObj.SalesBaselineSalesPrice = itemMasterViewModel.SalesBaselineSalesPrice;
                itemmaserObj.SalesBaselineSalesPrice = itemMasterViewModel.SalesBaselineSalesPrice;
                itemmaserObj.SalesIsFixedPrice = itemMasterViewModel.SalesIsFixedPrice;
                itemmaserObj.SalesDiscountPercent = itemMasterViewModel.SalesDiscountPercent;
                //itemmaserObj.SalesPriceActive = itemMasterViewModel.SalesPriceActive;
                //itemmaserObj.SalesPrice = itemMasterViewModel.SalesPrice;
                itemmaserObj.SalesCurrencyId = itemMasterViewModel.SalesCurrencyId;
                //itemmaserObj.SalesLastMarkUpOnPurchListDate = itemMasterViewModel.SalesLastMarkUpOnPurchListDate;
                //itemmaserObj.SalesLastMarkUpOnPurchLessDiscountDate = itemMasterViewModel.SalesLastMarkUpOnPurchLessDiscountDate;
                //itemmaserObj.SalesLastSalesListPriceDate = itemMasterViewModel.SalesLastSalesListPriceDate;
                //itemmaserObj.SalesLastSalesDiscountDate = itemMasterViewModel.SalesLastSalesDiscountDate;
                //itemmaserObj.SalesLastSalesPriceDate = itemMasterViewModel.SalesLastSalesPriceDate;
                itemmaserObj.StandAloneEquipment = itemMasterViewModel.StandAloneEquipment;
                itemmaserObj.ComponentEquipment = itemMasterViewModel.ComponentEquipment;
                itemmaserObj.EquipmentId = itemMasterViewModel.EquipmentId;
                itemmaserObj.AssetId = itemMasterViewModel.AssetId;
                itemmaserObj.EquipmentUOMId = itemMasterViewModel.EquipmentUOMId;
                itemmaserObj.CalibrationRequired = itemMasterViewModel.CalibrationRequired;
                itemmaserObj.FrequencyTypeMonths = itemMasterViewModel.FrequencyTypeMonths;
                itemmaserObj.FrequencyTypeDays = itemMasterViewModel.FrequencyTypeDays;
                itemmaserObj.CertificationRequired = itemMasterViewModel.CertificationRequired;
                itemmaserObj.CertificationFrequency = itemMasterViewModel.CertificationFrequency;
                itemmaserObj.EquipmentTypeId = itemMasterViewModel.EquipmentTypeId;
                itemmaserObj.EquipmentValidationTypeId = itemMasterViewModel.EquipmentValidationTypeId;
                itemmaserObj.UnitCost = itemMasterViewModel.UnitCost;
                itemmaserObj.CapabilityVerifiedBy = itemMasterViewModel.CapabilityVerifiedBy;
                itemmaserObj.CapabilityVerificationDate = itemMasterViewModel.CapabilityVerificationDate;
                itemmaserObj.ManufacturingDate = itemMasterViewModel.ManufacturingDate;
                itemmaserObj.IsShelfLifeAvailable = itemMasterViewModel.IsShelfLifeAvailable;
                itemmaserObj.OpenDate = itemMasterViewModel.OpenDate;
                itemmaserObj.IsProvisioned = itemMasterViewModel.IsProvisioned;
                itemmaserObj.NHA = itemMasterViewModel.NHA;
                itemmaserObj.IsCapesAvailable = itemMasterViewModel.IsCapesAvailable;
                itemmaserObj.EntryDate = itemMasterViewModel.EntryDate;
                itemmaserObj.IsCMMExist = itemMasterViewModel.IsCMMExist;
                itemmaserObj.CMMLink = itemMasterViewModel.CMMLink;
                itemmaserObj.IsVerified = itemMasterViewModel.IsVerified;
                itemmaserObj.CapesMemo = itemMasterViewModel.CapesMemo;
                itemmaserObj.ManufacturingDescription = itemMasterViewModel.ManufacturingDescription;
                itemmaserObj.OverhaulDescription = itemMasterViewModel.OverhaulDescription;
                itemmaserObj.DistributeDescription = itemMasterViewModel.DistributeDescription;
                itemmaserObj.CertifiedDescription = itemMasterViewModel.CertifiedDescription;
                itemmaserObj.RepairDescription = itemMasterViewModel.RepairDescription;
                itemmaserObj.ExchangeDescription = itemMasterViewModel.ExchangeDescription;
                itemmaserObj.VerifiedBy = itemMasterViewModel.VerifiedBy;
                itemmaserObj.DateVerified = itemMasterViewModel.DateVerified;
                itemmaserObj.PlatformId = itemMasterViewModel.PlatformId;
                itemmaserObj.SchematicDiagramFile = itemMasterViewModel.SchematicDiagramFile;
                itemmaserObj.ListPrice = itemMasterViewModel.ListPrice;
                itemmaserObj.PriceDate = itemMasterViewModel.PriceDate;
                itemmaserObj.IsRFQTracking = itemMasterViewModel.IsRFQTracking;
                itemmaserObj.CurrencyId = itemMasterViewModel.CurrencyId;
                itemmaserObj.MarkUpPercent = itemMasterViewModel.MarkUpPercent;
                itemmaserObj.DiscountPurchasePercent = itemMasterViewModel.DiscountPurchasePercent;
                //itemmaserObj.EquipId = itemMasterViewModel.EquipId;
                itemmaserObj.DiscounSalesPercent = itemMasterViewModel.DiscounSalesPercent;
                itemmaserObj.StoredUOM = itemMasterViewModel.StoredUOM;
                
                itemmaserObj.ConsumeUOM = itemMasterViewModel.ConsumeUOM;
                itemmaserObj.StockLevel = itemMasterViewModel.StockLevel;
                itemmaserObj.LeadTime = itemMasterViewModel.LeadTime;
                itemmaserObj.Notes = itemMasterViewModel.Notes;
                itemmaserObj.ToleranceMinimum = itemMasterViewModel.ToleranceMinimum;
                itemmaserObj.ToleranceMaximum = itemMasterViewModel.ToleranceMaximum;
                itemmaserObj.ToleranceExpected = itemMasterViewModel.ToleranceExpected;
                itemmaserObj.IntegrateWith = itemMasterViewModel.IntegrateWith;
                itemmaserObj.Findings = itemMasterViewModel.Findings;
                itemmaserObj.CompanyId = itemMasterViewModel.CompanyId;
                itemmaserObj.BusinessUnitId = itemMasterViewModel.BusinessUnitId;
                itemmaserObj.DivisionId = itemMasterViewModel.DivisionId;
                itemmaserObj.DepartmentId = itemMasterViewModel.DepartmentId;
                itemmaserObj.MasterCompanyId = itemMasterViewModel.MasterCompanyId;
                itemmaserObj.IsTimeLife = itemMasterViewModel.IsTimeLife;

                    if (itemMasterViewModel.AircraftTypeId != null)
                    {
                        var aircraftTypeList = _unitOfWork.ItemMasterAircraftManafacturerRepository.GetAllData().ToList();
                        aircraftTypeList.Where(a => a.ItemMasterId == id).ToList().ForEach(a => _unitOfWork.ItemMasterAircraftManafacturerRepository.Remove(a));
                        _unitOfWork.SaveChanges();

                    foreach (string s in itemMasterViewModel.AircraftTypeId)
                    {
                        if (s != "")
                        {
                            var aircraftType = new ItemMasterAircraftManufacturer();
                            aircraftType.AircraftTypeId = Convert.ToInt32(s);
                            aircraftType.ItemMasterId = id;
                            aircraftType.MasterCompanyId = 1;
                            aircraftType.CreatedBy = itemMasterViewModel.CreatedBy;
                            aircraftType.UpdatedBy = itemMasterViewModel.UpdatedBy;
                            aircraftType.CreatedDate = DateTime.Now;
                            aircraftType.UpdatedDate = DateTime.Now;
                            aircraftType.IsActive = true;
                            _unitOfWork.ItemMasterAircraftManafacturerRepository.Add(aircraftType);
                            _unitOfWork.SaveChanges();
                        }
                    }
                    }
                if (itemMasterViewModel.IntegrationPortalId != null)
                {
                    var integrationList = _unitOfWork.ItemMasterIntegrationPortalRepository.GetAllData().ToList();
                    integrationList.Where(a => a.ItemMasterId == id).ToList().ForEach(a => _unitOfWork.ItemMasterIntegrationPortalRepository.Remove(a));
                    _unitOfWork.SaveChanges();
                    foreach (string s in itemMasterViewModel.IntegrationPortalId)
                    {
                        if (s != "")
                        {
                            var integrationTypes = new ItemMasterIntegrationPortal();
                            integrationTypes.IntegrationPortalId = Convert.ToByte(s);
                            integrationTypes.ItemMasterId = id;
                            integrationTypes.MasterCompanyId = 1;
                            integrationTypes.CreatedBy = itemMasterViewModel.CreatedBy;
                            integrationTypes.UpdatedBy = itemMasterViewModel.UpdatedBy;
                            integrationTypes.CreatedDate = DateTime.Now;
                            integrationTypes.UpdatedDate = DateTime.Now;
                            integrationTypes.IsActive = true;
                            _unitOfWork.ItemMasterIntegrationPortalRepository.Add(integrationTypes);
                            _unitOfWork.SaveChanges();
                        }
                    }
                }



                //itemmaserObj.IsActive = itemMasterViewModel.IsActive;
                itemmaserObj.CreatedDate = DateTime.Now;
                itemmaserObj.UpdatedDate = DateTime.Now;
                itemmaserObj.CreatedBy = itemMasterViewModel.CreatedBy;
                itemmaserObj.UpdatedBy = itemMasterViewModel.UpdatedBy;
                if (itemMasterViewModel.ATAChapterId == null)
                {
                    itemmaserObj.ATAChapterId = null;
                }
                if (itemMasterViewModel.ATASubChapterId == null)
                {
                    itemmaserObj.ATASubChapterId = null;
                }
                if (itemMasterViewModel.ATAMainSub2Id == null)
                {
                    itemmaserObj.ATAMainSub2Id = null;
                }
                if (itemMasterViewModel.AircraftTypeId == null)
                {
                    itemmaserObj.AircraftTypeId = null;
                }
                if (itemMasterViewModel.StockUnitOfMeasureId == null)
                {
                    itemmaserObj.StockUnitOfMeasureId = null;
                }
                if (itemMasterViewModel.PurchaseUnitOfMeasureId == null)
                {
                    itemmaserObj.PurchaseUnitOfMeasureId = null;
                }
                if (itemMasterViewModel.ExportUomId == null)
                {
                    itemmaserObj.ExportUomId = null;
                }
                if (itemMasterViewModel.ConsumeUnitOfMeasureId == null)
                {
                    itemmaserObj.ConsumeUnitOfMeasureId = null;
                }
                if (itemMasterViewModel.PriorityId == null)
                {
                    itemmaserObj.PriorityId = null;
                }
                if (itemMasterViewModel.IntegrationPortalId == null)
                {
                    itemmaserObj.IntegrationPortalId = null;
                }
                if (itemMasterViewModel.WarningId == null)
                {
                    itemmaserObj.WarningId = null;
                }
                if (itemMasterViewModel.ExportCountryId == null)
                {
                    itemmaserObj.ExportCountryId = null;
                }
                if (itemMasterViewModel.ExportCurrencyId == null)
                {
                    itemmaserObj.ExportCurrencyId = null;
                }
                if (itemMasterViewModel.ExportClassificationId == null)
                {
                    itemmaserObj.ExportClassificationId = null;
                }
                if (itemMasterViewModel.PurchaseCurrencyId == null)
                {
                    itemmaserObj.PurchaseCurrencyId = null;
                }
                if (itemMasterViewModel.SalesCurrencyId == null)
                {
                    itemmaserObj.SalesCurrencyId = null;
                }
                if (itemMasterViewModel.EquipmentTypeId == null)
                {
                    itemmaserObj.EquipmentTypeId = null;
                }
                if (itemMasterViewModel.EquipmentValidationTypeId == null)
                {
                    itemmaserObj.EquipmentValidationTypeId = null;
                }
                if (itemMasterViewModel.PlatformId == null)
                {
                    itemmaserObj.PlatformId = null;
                }
                if (itemMasterViewModel.MasterCompanyId == null)
                {
                    itemmaserObj.MasterCompanyId = null;
                }
                if (itemMasterViewModel.CurrencyId == null)
                {
                    itemmaserObj.CurrencyId = null;
                }
                if (itemMasterViewModel.BusinessUnitId == null)
                {
                    itemmaserObj.BusinessUnitId = null;
                }
                if (itemMasterViewModel.DepartmentId == null)
                {
                    itemmaserObj.DepartmentId = null;

                }
                if (itemMasterViewModel.DivisionId == null)
                {
                    itemmaserObj.DivisionId = null;
                }
                if (itemMasterViewModel.CompanyId == null)
                {
                    itemmaserObj.CompanyId = null;

                }
                if (itemMasterViewModel.ProvisionId == null)
                {
                    itemmaserObj.ProvisionId = null;
                }
                //_context.Part.Update(partExistingresult);
                //_unitOfWork.SaveChanges();

                _unitOfWork.itemMaster.Update(itemmaserObj);
                _unitOfWork.SaveChanges();
                return Ok(itemmaserObj);
            }


            return Ok(ModelState);
        }

        [HttpPut("updateDeleteStatus/{id}")]
        public IActionResult DeleteItem(long id, [FromBody] ItemMasterViewModel itemMasterViewModel)
        {
            if (ModelState.IsValid)
            {
                if (itemMasterViewModel == null)
                    return BadRequest($"{nameof(itemMasterViewModel)} cannot be null");
                var itemmaserObj = _unitOfWork.itemMaster.GetSingleOrDefault(c => c.ItemMasterId == id);
                itemmaserObj.IsDelete = false;

                _unitOfWork.itemMaster.Update(itemmaserObj);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpPost("savemultiintegrationTypes")]
        public IActionResult createmultiLeaves([FromBody] ItemMasterIntegrationPortalViewModel itemMasterIntegrationPortalViewModel)
        {
            if (ModelState.IsValid)
            {
                if (_context.ItemMasterIntegrationPortal.Any(o => o.IntegrationPortalId == itemMasterIntegrationPortalViewModel.IntegrationPortalId))
                {
                    // return BadRequest($"{nameof(capesInfoViewModel)} cannot be null");
                    var existingresule = _context.ItemMasterIntegrationPortal.Where(c => c.IntegrationPortalId == itemMasterIntegrationPortalViewModel.IntegrationPortalId).FirstOrDefault();
                    existingresule.IntegrationPortalId = itemMasterIntegrationPortalViewModel.IntegrationPortalId;

                    existingresule.ItemMasterId = itemMasterIntegrationPortalViewModel.ItemMasterId;
                    existingresule.CreatedBy = itemMasterIntegrationPortalViewModel.CreatedBy;
                    existingresule.UpdatedBy = itemMasterIntegrationPortalViewModel.UpdatedBy;
                    existingresule.MasterCompanyId = 1;
                    existingresule.CreatedDate = DateTime.Now;
                    existingresule.UpdatedDate = DateTime.Now;
                    _context.ItemMasterIntegrationPortal.Update(existingresule);
                    _context.SaveChanges();
                }
                else
                {
                    ItemMasterIntegrationPortal cp = new ItemMasterIntegrationPortal();
                    cp.IntegrationPortalId = itemMasterIntegrationPortalViewModel.IntegrationPortalId;
                    cp.ItemMasterId = itemMasterIntegrationPortalViewModel.ItemMasterId;
                    cp.MasterCompanyId = 1;
                    cp.CreatedBy = itemMasterIntegrationPortalViewModel.CreatedBy;
                    cp.UpdatedBy = itemMasterIntegrationPortalViewModel.UpdatedBy;
                    cp.CreatedDate = DateTime.Now;
                    cp.UpdatedDate = DateTime.Now;
                    _context.ItemMasterIntegrationPortal.Add(cp);
                    _context.SaveChanges();
                }
            }
            return Ok(itemMasterIntegrationPortalViewModel);
            // return Ok(ModelState);
        }

        [HttpGet("IntegrationGet/{id}")]
        [Produces(typeof(List<ItemMasterIntegrationPortalViewModel>))]
        public IActionResult integrationGet(int id)
        {
            var integrationportal = _unitOfWork.itemMaster.getIntegrationData(id); //.GetAllCustomersData();
            return Ok(integrationportal);

        }


        [HttpGet("GetDescriptionbypart/{partNumber}")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult Getdescriptionbypart(string partNumber, ItemMasterViewModel itemMasterViewModel)
        {
            var descriptionbypart = _unitOfWork.itemMaster.Getdescriptionbypart(partNumber); //.GetAllCustomersData();
            return Ok(descriptionbypart);

        }
        //[HttpPost("itemMasterpost")]
        //public IActionResult equipmentlist([FromBody] ItemMasterViewModel itemMasterViewModel,  Manufacturer manufacturer, Equipment equipment)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (itemMasterViewModel == null)
        //            return BadRequest($"{nameof(itemMasterViewModel)} cannot be null");
        //        ItemmasterEquipment itemmaserObj = new ItemmasterEquipment();



        //        itemmaserObj.CreatedDate = DateTime.Now;
        //        itemmaserObj.UpdatedDate = DateTime.Now;
        //        itemmaserObj.CreatedBy = itemMasterViewModel.CreatedBy;
        //        itemmaserObj.UpdatedBy = itemMasterViewModel.UpdatedBy;

        //        _context.Equipment.Add(equipment);
        //        _unitOfWork.SaveChanges();
        //        itemmaserObj.EquipmentId = equipment.EquipmentId;


        //        _unitOfWork.itemMaster.Add(itemmaserObj);
        //        _unitOfWork.SaveChanges();
        //        return Ok(itemmaserObj);
        //    }

        //    return Ok(ModelState);
        //}
        [HttpPut("itemstockUpdateforActive/{id}")]
        public IActionResult customersUpdateforActive(long id, [FromBody]ItemMasterViewModel itemMasterViewModel)
        {
           
                var CustomerObj = _unitOfWork.itemMaster.GetSingleOrDefault(a => a.ItemMasterId == id);
            // itemMasterViewModel.MasterCompanyId = 1;
            //  CustomerObj.IsActive = true;
            CustomerObj.IsActive = itemMasterViewModel.IsActive;
                CustomerObj.UpdatedDate = DateTime.Now;
                //CustomerObj.UpdatedBy = itemMasterViewModel.UpdatedBy;
               // CustomerObj.ItemMasterId = itemMasterViewModel.ItemMasterId;
                _unitOfWork.itemMaster.Update(CustomerObj);
                _unitOfWork.SaveChanges();
                return Ok(CustomerObj);
           
           
        }

        [HttpPost("saveItemmasteraircraftdata")]
        public IActionResult SaveItemMasteraircraft([FromBody]  ItemMasterAircraftManufacturerViewModel itemMasterAircraftManufacturerViewModel)
        {
            //var existsobj = _context.ItemMasterAircraftManufacturer.Where(a=>a.ItemMasterId==itemMasterAircraftManufacturerViewModel.ItemMasterId).ToList();
            //if (existsobj.Count > 0) {

            //    long[] terms = new long[existsobj.Count];
            //    for (int runs = 0; runs < 400; runs++)
            //    {
            //        terms[runs] = existsobj[runs].ItemMasterAircraftManufacturerId;
            //    }
            //    var result = string.Join(",", terms);
            //}

            

            if (ModelState.IsValid)
            {
                if (itemMasterAircraftManufacturerViewModel == null)
                    return BadRequest($"{nameof(itemMasterAircraftManufacturerViewModel)} cannot be null");
                ItemMasterAircraftManufacturer CustomerObject = new ItemMasterAircraftManufacturer();

                itemMasterAircraftManufacturerViewModel.MasterCompanyId = 1;
                CustomerObject.ItemMasterId = itemMasterAircraftManufacturerViewModel.ItemMasterId;
                CustomerObject.AircraftTypeId = itemMasterAircraftManufacturerViewModel.AircraftTypeId;
                CustomerObject.MasterCompanyId = itemMasterAircraftManufacturerViewModel.MasterCompanyId;
                //CustomerObject.IsActive = true;
                CustomerObject.IsActive = itemMasterAircraftManufacturerViewModel.IsActive;
                CustomerObject.CreatedDate = DateTime.Now;
                CustomerObject.UpdatedDate = DateTime.Now;
                CustomerObject.CreatedBy = itemMasterAircraftManufacturerViewModel.CreatedBy;
                CustomerObject.UpdatedBy = itemMasterAircraftManufacturerViewModel.UpdatedBy;
                _unitOfWork.ItemMasterAircraftManafacturerRepository.Add(CustomerObject);
                _unitOfWork.SaveChanges();
                return Ok(CustomerObject);
            }

            return Ok(ModelState);
        }

        [HttpGet("GetListforCapes")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult GetListforCapes()
        {
            //  var allTaxrateInfo = _context.ItemMaster.Include("Manufacturer").Include("Provision").Include("Priority").Include("ItemClassification").Include("Currency").Include("ExportClassification").Where(a=>a.ItemTypeId==1 && a.IsActive == true || a.ItemTypeId==3  && a.IsActive == true).ToList(); //.GetAllCustomersData();
            var allTaxrateInfo = _context.ItemMaster.Include("Manufacturer").Include("Provision").Include("Priority").Include("ItemClassification").Include("Currency").Include("ExportClassification").Where(a => a.ItemTypeId == 1 && (a.IsDelete == true || a.IsDelete == null) || a.ItemTypeId == 3 && (a.IsDelete == true || a.IsDelete == null)).ToList(); //.GetAllCustomersData();
            return Ok(allTaxrateInfo);

        }
    }





}