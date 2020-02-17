using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using QuickApp.Pro.ViewModels.SalesViews;


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

        [HttpGet("Get/{itemMasterId}")]
        public IActionResult GetItemById(long itemMasterId)
        {
            //var item = _unitOfWork.Repository<ItemMaster>().getItemMasterData(itemMasterId);
            var item = _unitOfWork.itemMaster.getByID(itemMasterId);

            if (item == null)
            {
                return BadRequest();
            }

            return Ok(item);
        }

        [HttpGet("Get")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult Get()
        {
            var allPartDetails = _context.ItemMaster.Where(a => a.IsActive == null && a.IsActive == true && a.IsDeleted == false || a.IsDeleted == null).OrderByDescending(a => a.ItemMasterId).ToList(); //.GetAllCustomersData();
            return Ok(allPartDetails);
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
                return BadRequest(ex.Message);
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
        public IActionResult itemlist(string value, ItemMasterViewModel itemMasterViewModel)
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


        [HttpGet("GetitemDatabyId/{value}/{id}")]
        [Produces(typeof(ItemMasterViewModel))]
        public IActionResult itemById(string value, long id)
        {
            if (value == "Stock")
            {
                var stockData = _unitOfWork.itemMaster.getAllItemMasterStockdataById(id);
                return Ok(stockData);
            }
            else if (value == "Non-stock")
            {
                var nonstockData = _unitOfWork.itemMaster.getAllItemMasterNonstockdataById(id);
                return Ok(nonstockData);
            }
            else if (value == "Equipment")
            {
                var equipmentData = _unitOfWork.itemMaster.getAllItemMasterequipmentdataById(id);
                return Ok(equipmentData);
            }

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

            //var obj = _context.Manufacturer.OrderByDescending(c => c.ManufacturerId).Where(c => c.IsDeleted == false || c.IsDeleted == null).ToList();
            var obj = _context.Manufacturer.Where(c => (c.IsActive == true && c.IsDeleted == false)).OrderByDescending(c => c.ManufacturerId).ToList();
            return Ok(obj);
        }

        [HttpGet("GetParntnumberlist")]
        [Produces(typeof(List<Manufacturer>))]
        public IActionResult GetParntnumberlist()
        {
            var obj = _context.ItemMaster.Where(a => (a.IsActive == null || a.IsActive == true) && (a.IsDeleted == false || a.IsDeleted == null) && (a.PartDescription != null) && (a.PartNumber != null)).OrderByDescending(c => c.ItemMasterId).ToList();
            return Ok(obj);
        }

        // [HttpGet("getEquipmentlist")]
        //[Produces(typeof(List<Equipment>))]
        // public IActionResult getEquipmentlist()
        // {

        //     //var obj = _context.Equipment.OrderByDescending(c => c.EquipmentId).ToList();
        //     //return Ok(obj);
        // }


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

        [HttpGet("exchangeloan/{id}")]
        [Produces(typeof(ExchangeLoandViewModel))]
        public IActionResult GetExchangeAndLoan(long id)
        {


            var itemMasterExchangeLoan = _unitOfWork.ItemMasterExchangeLoan.GetSingleOrDefault(c => c.ItemMasterId == id);
            var itemMasterExchangeLoanVM = Mapper.Map<ExchangeLoandViewModel>(itemMasterExchangeLoan);

            return Ok(itemMasterExchangeLoanVM);

        }

        [HttpPost("exchangeloan")]
        public IActionResult CreateExchangeLoan([FromBody] ExchangeLoandViewModel exchangeLoandViewModel)
        {


            if (ModelState.IsValid)
            {
                if (exchangeLoandViewModel == null)
                    return BadRequest($"{nameof(exchangeLoandViewModel)} cannot be null");
                ItemMasterExchangeLoan itemMasterExchangeLoan = new ItemMasterExchangeLoan();


                itemMasterExchangeLoan.ItemMasterId = exchangeLoandViewModel.ItemMasterId;
                itemMasterExchangeLoan.MasterCompanyId = exchangeLoandViewModel.MasterCompanyId;
                itemMasterExchangeLoan.IsActive = exchangeLoandViewModel.IsActive;
                itemMasterExchangeLoan.IsDeleted = exchangeLoandViewModel.IsDeleted;
                itemMasterExchangeLoan.IsExchange = exchangeLoandViewModel.IsExchange;
                itemMasterExchangeLoan.IsLoan = exchangeLoandViewModel.IsLoan;
                itemMasterExchangeLoan.LoanCurrencyId = exchangeLoandViewModel.LoanCurrencyId;
                itemMasterExchangeLoan.ExchangeListPrice = exchangeLoandViewModel.ExchangeListPrice;
                itemMasterExchangeLoan.ExchangeCorePrice = exchangeLoandViewModel.ExchangeCorePrice;
                itemMasterExchangeLoan.ExchangeOverhaulPrice = exchangeLoandViewModel.ExchangeOverhaulPrice;
                itemMasterExchangeLoan.ExchangeOutrightPrice = exchangeLoandViewModel.ExchangeOutrightPrice;
                itemMasterExchangeLoan.ExchangeCoreCost = exchangeLoandViewModel.ExchangeCoreCost;
                itemMasterExchangeLoan.LoanCorePrice = exchangeLoandViewModel.LoanCorePrice;
                itemMasterExchangeLoan.LoanOutrightPrice = exchangeLoandViewModel.LoanOutrightPrice;
                itemMasterExchangeLoan.LoanFees = exchangeLoandViewModel.LoanFees;
                itemMasterExchangeLoan.ExchangeCurrencyId = exchangeLoandViewModel.ExchangeCurrencyId;
                itemMasterExchangeLoan.CreatedDate = DateTime.Now;
                itemMasterExchangeLoan.UpdatedDate = DateTime.Now;
                itemMasterExchangeLoan.CreatedBy = exchangeLoandViewModel.CreatedBy;
                itemMasterExchangeLoan.UpdatedBy = exchangeLoandViewModel.UpdatedBy;
                _unitOfWork.ItemMasterExchangeLoan.Add(itemMasterExchangeLoan);
                _unitOfWork.SaveChanges();
                return Ok(itemMasterExchangeLoan);

            }

            return Ok(ModelState);

        }

        [HttpPut("exchangeloan/{id}")]
        public IActionResult UpdateExchangeLoan(long id, [FromBody] ExchangeLoandViewModel exchangeLoandViewModel)
        {

            if (ModelState.IsValid)
            {
                if (exchangeLoandViewModel == null)
                    return BadRequest($"{nameof(exchangeLoandViewModel)} cannot be null");

                var existingResult = _unitOfWork.ItemMasterExchangeLoan.GetSingleOrDefault(c => c.ItemMasterId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = exchangeLoandViewModel.UpdatedBy;
                existingResult.IsActive = exchangeLoandViewModel.IsActive;
                existingResult.IsDeleted = exchangeLoandViewModel.IsDeleted;
                existingResult.IsExchange = exchangeLoandViewModel.IsExchange;
                existingResult.IsLoan = exchangeLoandViewModel.IsLoan;
                existingResult.LoanCurrencyId = exchangeLoandViewModel.LoanCurrencyId;
                existingResult.ExchangeListPrice = exchangeLoandViewModel.ExchangeListPrice;
                existingResult.ExchangeCorePrice = exchangeLoandViewModel.ExchangeCorePrice;
                existingResult.ExchangeOverhaulPrice = exchangeLoandViewModel.ExchangeOverhaulPrice;
                existingResult.ExchangeOutrightPrice = exchangeLoandViewModel.ExchangeOutrightPrice;
                existingResult.ExchangeCoreCost = exchangeLoandViewModel.ExchangeCoreCost;
                existingResult.LoanCorePrice = exchangeLoandViewModel.LoanCorePrice;
                existingResult.LoanOutrightPrice = exchangeLoandViewModel.LoanOutrightPrice;
                existingResult.LoanFees = exchangeLoandViewModel.LoanFees;
                existingResult.ExchangeCurrencyId = exchangeLoandViewModel.ExchangeCurrencyId;

                _unitOfWork.ItemMasterExchangeLoan.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }

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
            var aircraftManufacturer = _unitOfWork.aircraftType.getAircraftTypeData().Where(x => x.IsDeleted != true && x.IsActive == true).OrderBy(p=>p.Description);
            return Ok(aircraftManufacturer);

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


        [HttpPost("Mancapespost")]
        public IActionResult addCharges([FromBody] List<ItemMasterCapes> capability)
        {
            if (ModelState.IsValid)
            {
                for (var i = 0; i < capability.Count(); i++)
                {
                }
            }
            return Ok(capability);
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public void saveItemcapes(long returnid, long itemid)
        {
            ItemMasterCapes imc = new ItemMasterCapes();

            //imc.CapabilityId = returnid;
            imc.ItemMasterId = itemid;
            imc.MasterCompanyId = 1;
            imc.CreatedDate = DateTime.Now;
            imc.UpdatedDate = DateTime.Now;
            imc.IsActive = true;
            _context.ItemMasterCapes.Add(imc);
            _context.SaveChanges();
        }

        [HttpPost("itemMasterpost")]
        public IActionResult CreateContact([FromBody] ItemMasterViewModel itemMasterViewModel, Part part, Manufacturer manufacturer, Equipment equipment)
        {
            try
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
                    itemmaserObj.RevisedPartId = itemMasterViewModel.RevisedPartId;

                    itemmaserObj.SiteId = itemMasterViewModel.SiteId;
                    itemmaserObj.WarehouseId = itemMasterViewModel.WarehouseId;
                    itemmaserObj.LocationId = itemMasterViewModel.LocationId;
                    itemmaserObj.ShelfId = itemMasterViewModel.ShelfId;
                    itemmaserObj.BinId = itemMasterViewModel.BinId;



                    itemmaserObj.oemPNId = itemMasterViewModel.oemPNId;
                    itemmaserObj.PartDescription = itemMasterViewModel.Partdescription;
                    itemmaserObj.ItemTypeId = itemMasterViewModel.ItemTypeId;
                    part.ParentPartId = itemMasterViewModel.ParentPartId;
                    equipment.Description = itemMasterViewModel.EquipmentDescription;
                    manufacturer.Name = itemMasterViewModel.Name;
                    //itemmaserObj.ItemMasterId = itemMasterViewModel.ItemMasterId;
                    itemmaserObj.NHA = itemMasterViewModel.NHA;
                    itemmaserObj.TurnTimeOverhaulHours = itemMasterViewModel.TurnTimeOverhaulHours;
                    itemmaserObj.TurnTimeRepairHours = itemMasterViewModel.TurnTimeRepairHours;
                    itemmaserObj.CoreValue = itemMasterViewModel.CoreValue;
                    itemmaserObj.ExchangeListPrice = itemMasterViewModel.ExchangeListPrice;
                    itemmaserObj.OverheadCost = itemMasterViewModel.OverheadCost;
                    itemmaserObj.PartListPrice = itemMasterViewModel.PartListPrice;
                    itemmaserObj.POCoreCharge = itemMasterViewModel.POCoreCharge;
                    itemmaserObj.SOCoreCharge = itemMasterViewModel.SOCoreCharge;
                    itemmaserObj.IsAlternatePartChecked = itemMasterViewModel.IsAlternatePartChecked;
                    //itemmaserObj.PartAlternatePartId = itemMasterViewModel.PartAlternatePartId;
                    if (itemMasterViewModel.IsSerialized == null)
                    {
                        itemMasterViewModel.IsSerialized = false;
                    }
                    else
                    {
                        itemmaserObj.IsSerialized = itemMasterViewModel.IsSerialized;
                    }
                    itemmaserObj.IsHotItem = itemMasterViewModel.IsHotItem;
                    itemmaserObj.ItemGroupId = itemMasterViewModel.ItemGroupId;
                    itemmaserObj.ItemClassificationId = itemMasterViewModel.ItemClassificationId;
                    //itemmaserObj.IsAcquiredMethodBuy = itemMasterViewModel.IsAcquiredMethodBuy;
                    itemmaserObj.AssetAcquistionTypeId = itemMasterViewModel.AssetAcquistionTypeId;
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
                    itemmaserObj.ProvisionId = itemMasterViewModel.ProvisionId;
                    itemmaserObj.ShelfLife = itemMasterViewModel.ShelfLife;
                    itemmaserObj.ManufacturerId = itemMasterViewModel.ManufacturerId;
                    itemmaserObj.PMA = itemMasterViewModel.PMA;
                    itemmaserObj.DER = itemMasterViewModel.DER;
                    itemmaserObj.ATAChapterId = itemMasterViewModel.ATAChapterId;
                    itemmaserObj.ATASubChapterId = itemMasterViewModel.ATASubChapterId;
                    itemmaserObj.NationalStockNumber = itemMasterViewModel.NationalStockNumber;
                    itemmaserObj.IsSchematic = itemMasterViewModel.IsSchematic;
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
                    itemmaserObj.SoldUnitOfMeasureId = itemMasterViewModel.SoldUnitOfMeasureId;
                    itemmaserObj.CurrencyId = itemMasterViewModel.CurrencyId;
                    itemmaserObj.SalesIsFixedPrice = itemMasterViewModel.SalesIsFixedPrice;
                    itemmaserObj.IsTimeLife = itemMasterViewModel.IsTimeLife;
                    itemmaserObj.MasterCompanyId = itemMasterViewModel.MasterCompanyId;
                    itemmaserObj.ListPrice = itemMasterViewModel.ListPrice;
                    itemmaserObj.PriceDate = itemMasterViewModel.PriceDate;
                    itemmaserObj.UnitCost = itemMasterViewModel.UnitCost;
                    itemmaserObj.DiscountPurchasePercent = itemMasterViewModel.DiscountPurchasePercent;
                    itemmaserObj.CreatedDate = DateTime.Now;
                    itemmaserObj.UpdatedDate = DateTime.Now;
                    itemmaserObj.StockLevel = itemMasterViewModel.StockLevel;
                    itemmaserObj.CreatedBy = itemMasterViewModel.CreatedBy;
                    itemmaserObj.ItemNonStockClassificationId = itemMasterViewModel.ItemNonStockClassificationId;
                    itemmaserObj.ShelfLifeAvailable = itemMasterViewModel.ShelfLifeAvailable;
                    itemmaserObj.isPma = itemMasterViewModel.isPma;
                    itemmaserObj.mfgHours = itemMasterViewModel.mfgHours;
                    itemmaserObj.turnTimeMfg = itemMasterViewModel.turnTimeMfg;
                    itemmaserObj.turnTimeBenchTest = itemMasterViewModel.turnTimeBenchTest;
                    itemmaserObj.IsExportUnspecified = itemMasterViewModel.IsExportUnspecified;
                    itemmaserObj.IsExportNONMilitary = itemMasterViewModel.IsExportNONMilitary;
                    itemmaserObj.IsExportMilitary = itemMasterViewModel.IsExportMilitary;
                    itemmaserObj.IsExportDual = itemMasterViewModel.IsExportDual;
                    itemmaserObj.UpdatedBy = itemMasterViewModel.UpdatedBy;

                    if (manufacturer.Comments != null)
                    {
                        _context.Manufacturer.Add(manufacturer);
                        _unitOfWork.SaveChanges();
                        itemmaserObj.ManufacturerId = manufacturer.ManufacturerId;
                    }

                    if (itemMasterViewModel.ATAChapterId == null)
                    {
                        itemmaserObj.ATAChapterId = null;
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
                    //if (itemMasterViewModel.IntegrationPortalId == null)
                    //{
                    //    itemmaserObj.IntegrationPortalId = null;
                    //}
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

                    if (itemMasterViewModel.MasterCompanyId == null)
                    {
                        itemmaserObj.MasterCompanyId = null;
                    }
                    if (itemMasterViewModel.CurrencyId == null)
                    {
                        itemmaserObj.CurrencyId = null;
                    }

                    if (itemMasterViewModel.ProvisionId == null)
                    {
                        itemmaserObj.ProvisionId = null;
                    }


                    /*Master Item Parts */
                    MasterParts masterParts = new MasterParts();
                    masterParts.Description = itemmaserObj.PartDescription;
                    masterParts.PartNumber = itemmaserObj.PartNumber;
                    masterParts.ManufacturerId = itemmaserObj.ManufacturerId;
                    masterParts.MasterCompanyId = itemmaserObj.MasterCompanyId;
                    masterParts.UpdatedBy = masterParts.CreatedBy = itemmaserObj.CreatedBy;
                    masterParts.UpdatedDate = masterParts.CreatedDate = itemmaserObj.CreatedDate;
                    masterParts.IsActive = true;
                    masterParts.IsDeleted = false;

                    var masterPartId = _unitOfWork.CommonRepository.CreateMasterParts(masterParts);
                    itemmaserObj.MasterPartId = masterPartId;

                    _unitOfWork.itemMaster.Add(itemmaserObj);
                    _unitOfWork.SaveChanges();



                    try
                    {
                        if (itemMasterViewModel.IntegrationPortalId != null)
                        {
                            foreach (string s in itemMasterViewModel.IntegrationPortalId)
                            {
                                if (s != "")
                                {
                                    var integrationTypes = new ItemMasterIntegrationPortal();
                                    integrationTypes.IntegrationPortalId = Convert.ToInt32(s);
                                    integrationTypes.ItemMasterId = itemmaserObj.ItemMasterId.Value;
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
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                    var MfgName = _unitOfWork.Manufacturer.GetSingleOrDefault(c => c.ManufacturerId == itemmaserObj.ManufacturerId);
                    itemmaserObj.Manufacturer.Name = MfgName.Name;
                    return Ok(itemmaserObj);
                }

                // return Ok(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(itemMasterViewModel);
        }


        [HttpPut("itemMasterpost/{id}")]
        public IActionResult updateItems(long id, [FromBody] ItemMasterViewModel itemMasterViewModel)
        {
            if (ModelState.IsValid)
            {
                if (itemMasterViewModel == null)
                    return BadRequest($"{nameof(itemMasterViewModel)} cannot be null");
                var itemmaserObj = _unitOfWork.itemMaster.GetSingleOrDefault(c => c.ItemMasterId == id);

                itemMasterViewModel.IsActive = itemmaserObj.IsActive;

                IDictionary<string, object> keyValuePairs = new Dictionary<string, object>();
                itemmaserObj = _unitOfWork.CommonRepository.UpdateEntity(itemMasterViewModel, itemmaserObj, ref keyValuePairs);

                if (keyValuePairs != null && keyValuePairs.Count > 0)
                {
                    _context.ItemMaster.Attach(itemmaserObj);
                    foreach (var item in keyValuePairs)
                    {
                        _context.Entry(itemmaserObj).Property(item.Key).IsModified = true;
                    }

                    itemmaserObj.UpdatedDate = DateTime.Now;
                    itemmaserObj.UpdatedBy = HttpContext.Session.GetString("UserId");

                    _context.Entry(itemmaserObj).Property(x => x.UpdatedDate).IsModified = true;
                    _context.Entry(itemmaserObj).Property(x => x.UpdatedBy).IsModified = true;

                    _context.SaveChanges();
                }

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


                /*Master Item Parts */
                MasterParts masterParts = new MasterParts();
                masterParts.MasterPartId = itemmaserObj.MasterPartId;
                masterParts.Description = itemmaserObj.PartDescription;
                masterParts.PartNumber = itemmaserObj.PartNumber;
                masterParts.ManufacturerId = itemmaserObj.ManufacturerId;
                masterParts.MasterCompanyId = itemmaserObj.MasterCompanyId;
                masterParts.CreatedBy = itemmaserObj.CreatedBy;
                masterParts.UpdatedBy = itemmaserObj.UpdatedBy;
                masterParts.CreatedDate = itemmaserObj.CreatedDate;
                //masterParts.UpdatedDate = Convert.ToDateTime(itemmaserObj.UpdatedDate); 
                masterParts.IsActive = true;
                masterParts.IsDeleted = false;

                _unitOfWork.CommonRepository.UpdateMasterParts(masterParts);



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
                itemmaserObj.IsDeleted = true;

                _unitOfWork.CommonRepository.DeleteMasterParts(itemmaserObj.MasterPartId, itemmaserObj.UpdatedBy);

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
        }

        [HttpGet("IntegrationGet/{id}")]
        [Produces(typeof(List<ItemMasterIntegrationPortalViewModel>))]
        public IActionResult integrationGet(int id)
        {
            var integrationportal = _unitOfWork.itemMaster.getIntegrationData(id); //.GetAllCustomersData();
            return Ok(integrationportal);

        }

        [HttpGet("itemMasterDataById/{id}")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult itemMasterDataById(int id)
        {
            var integrationportal = _unitOfWork.itemMaster.getItemMasterData(id); //.GetAllCustomersData();
            return Ok(integrationportal);

        }

        [HttpGet("GetDescriptionbypart/{partNumber}")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult Getdescriptionbypart(string partNumber, ItemMasterViewModel itemMasterViewModel)
        {
            var descriptionbypart = _unitOfWork.itemMaster.Getdescriptionbypart(partNumber); //.GetAllCustomersData();
            return Ok(descriptionbypart);

        }

        [HttpPut("itemstockUpdateforActive/{id}")]
        public IActionResult customersUpdateforActive(long id, [FromBody]ItemMasterViewModel itemMasterViewModel)
        {

            var CustomerObj = _unitOfWork.itemMaster.GetSingleOrDefault(a => a.ItemMasterId == id);

            CustomerObj.IsActive = itemMasterViewModel.IsActive;
            CustomerObj.UpdatedDate = DateTime.Now; ;

            //  MasterPartsStatus(long masterPartId, bool status, string updatedBy)

            _unitOfWork.CommonRepository.MasterPartsStatus(CustomerObj.MasterPartId, Convert.ToBoolean(itemMasterViewModel.IsActive), itemMasterViewModel.UpdatedBy);

            _unitOfWork.itemMaster.Update(CustomerObj);
            _unitOfWork.SaveChanges();
            return Ok(CustomerObj);


        }

        [HttpPost("saveItemmasteraircraftdata")]
        public IActionResult SaveItemMasteraircraft([FromBody]  ItemMasterAircraftManufacturerViewModel itemMasterAircraftManufacturerViewModel)
        {

            if (ModelState.IsValid)
            {
                if (itemMasterAircraftManufacturerViewModel == null)
                    return BadRequest($"{nameof(itemMasterAircraftManufacturerViewModel)} cannot be null");
                ItemMasterAircraftManufacturer CustomerObject = new ItemMasterAircraftManufacturer();

                itemMasterAircraftManufacturerViewModel.MasterCompanyId = 1;
                CustomerObject.ItemMasterId = itemMasterAircraftManufacturerViewModel.ItemMasterId;
                CustomerObject.AircraftTypeId = itemMasterAircraftManufacturerViewModel.AircraftTypeId;
                CustomerObject.MasterCompanyId = itemMasterAircraftManufacturerViewModel.MasterCompanyId;
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
            //var allTaxrateInfo = _context.ItemMaster.Include("Manufacturer").Include("Provision").Include("Priority").Include("ItemClassification").Include("Currency").Include("ExportClassification").Where(a => a.ItemTypeId == 1 && (a.IsDeleted == true || a.IsDeleted == null) || a.ItemTypeId == 3 && (a.IsDeleted == true || a.IsDeleted == null)).ToList(); //.GetAllCustomersData();
            var data = (from iM in _context.ItemMasterCapes
                        where iM.IsDeleted != true

                        select new
                        {
                            iM.ItemMasterCapesId,
                            iM.ItemMasterId,
                            //iM.CapabilityId,
                            iM.MasterCompanyId,
                            iM.CreatedBy,
                            iM.UpdatedBy,
                            iM.CreatedDate,
                            iM.UpdatedDate,
                            iM.IsActive,
                            iM.ManagementStructureId,
                            //iM.ManufacturerId,
                            //iM.AircraftTypeId,
                            //iM.AircraftModelId,
                            //iM.AircraftDashNumberId,
                            //iM.Description,
                            //iM.ATAChapterId,
                            //iM.ATASubChapterId,
                            //iM.EntryDate,
                            //iM.CMMId,
                            //iM.isIntegrateWith,
                            // iM.IntegrateWith,
                            iM.IsVerified,
                            // iM.VerifiedBy,
                            //  iM.DateVerified,
                            //   iM.ntehrs,
                            //  iM.TAT,
                            iM.Memo,
                            iM.IsDeleted
                        }).ToList();
            return Ok(data);

        }

        [HttpGet("capabilityGet/{id}")]
        public IActionResult capabilityGet(int id)
        {
            //var capabilityData = _unitOfWork.itemMaster.getCapabilityData(id); //.GetAllCustomersData();
            var capabilityData = (from iM in _context.ItemMasterCapes
                                  where iM.ItemMasterCapesId != id

                                  select new
                                  {
                                      iM.ItemMasterCapesId,
                                      iM.ItemMasterId,
                                      // iM.CapabilityId,
                                      iM.MasterCompanyId,
                                      iM.CreatedBy,
                                      iM.UpdatedBy,
                                      iM.CreatedDate,
                                      iM.UpdatedDate,
                                      iM.IsActive,
                                      iM.ManagementStructureId,
                                      // iM.ManufacturerId,
                                      //iM.AircraftTypeId,
                                      //iM.AircraftModelId,
                                      //iM.AircraftDashNumberId,
                                      //iM.Description,
                                      //iM.ATAChapterId,
                                      ///iM.ATASubChapterId,
                                      //iM.EntryDate,
                                      // iM.CMMId,
                                      //iM.isIntegrateWith,
                                      //iM.IntegrateWith,
                                      iM.IsVerified,
                                      // iM.VerifiedBy,
                                      // iM.DateVerified,
                                      // iM.ntehrs,
                                      //iM.TAT,
                                      iM.Memo,
                                      iM.IsDeleted
                                  }).ToList();
            return Ok(capabilityData);

        }

        [HttpGet("GetNonStockClsiifications")]
        public IActionResult getAll()
        {
            var nonStockClsiifications = _unitOfWork.Repository<ItemNonStockClassification>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.ItemNonStockClassificationId);
            return Ok(nonStockClsiifications);
        }

        [HttpPost("itemNonStockclasspost")]
        public IActionResult addAsset([FromBody]ItemNonStockClassification itemNonStockClassification)
        {
            if (itemNonStockClassification != null)
            {
                if (ModelState.IsValid)
                {
                    itemNonStockClassification.IsActive = true;
                    itemNonStockClassification.CreatedDate = DateTime.Now;
                    itemNonStockClassification.MasterCompanyId = 1;
                    _unitOfWork.Repository<ItemNonStockClassification>().Add(itemNonStockClassification);
                    _unitOfWork.SaveChanges();
                    return Ok(itemNonStockClassification);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest(ModelState);
            }

        }
        [HttpPut("itemNonStockclasspost/{id}")]
        public IActionResult updateAsset([FromBody]ItemNonStockClassification itemNonStockClassification)
        {
            if (itemNonStockClassification != null)
            {
                if (ModelState.IsValid)
                {
                    itemNonStockClassification.UpdatedDate = DateTime.Now;
                    _unitOfWork.Repository<ItemNonStockClassification>().Update(itemNonStockClassification);
                    _unitOfWork.SaveChanges();
                    return Ok(itemNonStockClassification);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        [HttpGet("GetSpecificInfo")]
        public IActionResult getSpecificInfo()
        {
            var itemMasters = _unitOfWork.Repository<ItemMaster>()
                .GetAll()
                .Where(x => x.IsDeleted == true || x.IsDeleted == false)
                .Select(x =>
                new ItemMaster
                {
                    ItemMasterId = x.ItemMasterId,
                    PartNumber = x.PartNumber,
                    PartDescription = x.PartDescription
                })
                .ToList();
            return Ok(itemMasters);
        }

        //To Insert Aircraft Info in Item Master Aricraft Mapping
        [HttpPost("ItemMasterAircraftPost")]
        public IActionResult InsertItemmasterAircraft([FromBody] ItemMasterAircraftMapping[] itemMasterAircraftMapping)
        {
            if (ModelState.IsValid)
            {
                for (int i = 0; i < itemMasterAircraftMapping.Length; i++)
                {
                    itemMasterAircraftMapping[i].CreatedDate = DateTime.Now;
                    itemMasterAircraftMapping[i].UpdatedDate = DateTime.Now;
                    _unitOfWork.Repository<ItemMasterAircraftMapping>().Add(itemMasterAircraftMapping[i]);
                    _unitOfWork.SaveChanges();
                }
            }
            else
            {
                return BadRequest($"{nameof(itemMasterAircraftMapping)} cannot be null");
            }

            return Ok(ModelState);
        }
       
        [HttpGet("getItemMasterAircraftMappedAudit")]
       
        public IActionResult AircraftMappedAudit(long itemMasterAircraftMappingId)
        {
            try
            {
                var result = _unitOfWork.itemMaster.GetAircraftMappedAudit(itemMasterAircraftMappingId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }

        }
        //To post data in ATA Chapter Tab in Item Master
        [HttpPost("ItemMasterATAPost")]
        public IActionResult InsertItemmasterATA([FromBody] ItemMasterATAMapping[] itemMasterATAMapping)
        {
            if (ModelState.IsValid)
            {
                for (int i = 0; i < itemMasterATAMapping.Length; i++)
                {
                    _unitOfWork.Repository<ItemMasterATAMapping>().Add(itemMasterATAMapping[i]);
                    _unitOfWork.SaveChanges();
                }
            }
            else
            {
                return BadRequest($"{nameof(itemMasterATAMapping)} cannot be null");
            }

            return Ok(ModelState);

        }


        //To post data in Purchase Sale Tab in Item Master
        [HttpPost("ItemMasterPurcSalePost")]
        public IActionResult InsertItemmasterPurcSale([FromBody] ItemMasterPurchaseSale[] itemMasterPurchaseSale)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    for (int i = 0; i < itemMasterPurchaseSale.Length; i++)
                    {
                        _unitOfWork.Repository<ItemMasterPurchaseSale>().Add(itemMasterPurchaseSale[i]);
                        _unitOfWork.SaveChanges();
                    }

                }
                else
                {


                    return BadRequest($"{nameof(itemMasterPurchaseSale)} cannot be null");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(ModelState);
        }

        //To GET data From ItemMasterAircraftMapping with ItemMasterId
        [HttpGet("getAircraftMapped/{ItemMasterid}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult aircraftMapped(long ItemmasterId)
        {
            var result = _unitOfWork.itemMaster.GetAircraftMapped(ItemmasterId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpGet("getAircraftMappedById")]
        public IActionResult ItemMasterAircraftMappedById(long itemMasterId,long itemMasterAircraftMappingId)
        {
            var result = _unitOfWork.itemMaster.ItemMasterAircraftMappedById(itemMasterId, itemMasterAircraftMappingId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getATAMapped/{ItemmasterId}")]
        [Produces(typeof(List<ItemMasterATAMapping>))]
        public IActionResult ataMapped(long ItemmasterId)
        {
            var result = _unitOfWork.itemMaster.GetATAMapped(ItemmasterId);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }

        }
        
        [HttpPost("ExportInfoPostBy_IMastID/{id}")]
        public IActionResult ExportInfoupdate(long id, [FromBody] ItemMasterViewModel itemMasterViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_context.ItemMaster.Any(o => o.ItemMasterId == itemMasterViewModel.ItemMasterId))
                    {
                        var existingresule = _context.ItemMaster.Where(c => c.ItemMasterId == itemMasterViewModel.ItemMasterId).FirstOrDefault();
                        existingresule.UpdatedDate = DateTime.Now;
                        existingresule.ExportCountryId = itemMasterViewModel.ExportCountryId;
                        existingresule.ITARNumber = itemMasterViewModel.ITARNumber;
                        existingresule.ExportSizeHeight = itemMasterViewModel.ExportSizeHeight;
                        existingresule.ExportSizeLength = itemMasterViewModel.ExportSizeLength;
                        existingresule.ExportSizeUnit = itemMasterViewModel.ExportSizeUnit;
                        existingresule.ExportSizeWidth = itemMasterViewModel.ExportSizeWidth;
                        existingresule.ExportUomId = itemMasterViewModel.ExportUomId;
                        existingresule.ExportValue = itemMasterViewModel.ExportValue;
                        existingresule.ExportECCN = itemMasterViewModel.ExportECCN;
                        //existingresule.ExportClassification = itemMasterViewModel.ExportClassification;
                        existingresule.ExportWeight = itemMasterViewModel.ExportWeight;
                        existingresule.ExportWeightUnit = itemMasterViewModel.ExportWeightUnit;
                        existingresule.ExportCurrencyId = itemMasterViewModel.ExportCurrencyId;
                        existingresule.ExportClassificationId = itemMasterViewModel.ExportClassificationId;
                        existingresule.IsExportUnspecified = itemMasterViewModel.IsExportUnspecified;
                        existingresule.IsExportNONMilitary = itemMasterViewModel.IsExportNONMilitary;
                        existingresule.IsExportMilitary = itemMasterViewModel.IsExportMilitary;
                        existingresule.IsExportDual = itemMasterViewModel.IsExportDual;
                        existingresule.UpdatedBy = itemMasterViewModel.UpdatedBy;
                        _unitOfWork.Repository<ItemMaster>().Update(existingresule);
                        _unitOfWork.SaveChanges();
                        return Ok(itemMasterViewModel);
                    }
                    else
                    {
                        return BadRequest($"{nameof(itemMasterViewModel)} cannot be null");
                    }

                }
                else
                {
                    return BadRequest($"{nameof(itemMasterViewModel)} cannot be null");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //updates
        [HttpPut("ItemMasterAircraftUpdate/{id}")]
        public IActionResult UpdateItemmasterAircraft([FromBody] ItemMasterAircraftMapping itemMasterAircraftMapping, long id)
        {
            if (ModelState.IsValid)
            {
                if (_context.ItemMasterAircraftMapping.Any(o => o.ItemMasterAircraftMappingId == id))
                {
                    var existingresule = _context.ItemMasterAircraftMapping.Where(c => c.ItemMasterAircraftMappingId == id).FirstOrDefault();
                    existingresule.PartNumber = itemMasterAircraftMapping.PartNumber;
                    existingresule.AircraftModel = itemMasterAircraftMapping.AircraftModel;
                    existingresule.AircraftModelId = itemMasterAircraftMapping.AircraftModelId;
                    existingresule.AircraftType = itemMasterAircraftMapping.AircraftType;
                    existingresule.AircraftTypeId = itemMasterAircraftMapping.AircraftTypeId;
                    existingresule.UpdatedDate = DateTime.Now;
                    //existingresule.CreatedDate = itemMasterAircraftMapping.CreatedDate;
                    existingresule.DashNumber = itemMasterAircraftMapping.DashNumber;
                    existingresule.DashNumberId = itemMasterAircraftMapping.DashNumberId;
                    existingresule.IsActive = itemMasterAircraftMapping.IsActive;
                    existingresule.IsDeleted = itemMasterAircraftMapping.IsDeleted;
                    existingresule.ItemMasterId = itemMasterAircraftMapping.ItemMasterId;
                    existingresule.Memo = itemMasterAircraftMapping.Memo;
                    existingresule.UpdatedBy = itemMasterAircraftMapping.UpdatedBy;

                    _unitOfWork.Repository<ItemMasterAircraftMapping>().Update(existingresule);
                    _unitOfWork.SaveChanges();
                    return Ok(itemMasterAircraftMapping);
                }
            }
            else
            {
                return BadRequest($"{nameof(itemMasterAircraftMapping)} cannot be null");
            }

            return Ok(ModelState);
        }
        [HttpPut("ItemMasterAtaUpdate/{id}")]
        public IActionResult UpdateItemmasterATA([FromBody] ItemMasterATAMapping itemMasterATAMapping, long id)
        {
            if (ModelState.IsValid)
            {

                if (_context.ItemMasterAircraftMapping.Any(o => o.ItemMasterId == id))
                {
                    var existingresule = _context.ItemMasterATAMapping.Where(c => c.ItemMasterATAMappingId == id).FirstOrDefault();
                    existingresule.PartNumber = itemMasterATAMapping.PartNumber;
                    existingresule.ItemMasterId = itemMasterATAMapping.ItemMasterId;
                    existingresule.ATAChapterId = itemMasterATAMapping.ATAChapterId;
                    existingresule.ATAChapterCode = itemMasterATAMapping.ATAChapterCode;
                    existingresule.ATAChapterName = itemMasterATAMapping.ATAChapterName;
                    existingresule.ATASubChapterId = itemMasterATAMapping.ATASubChapterId;
                    existingresule.IsDeleted = itemMasterATAMapping.IsDeleted;
                    existingresule.IsActive = itemMasterATAMapping.IsActive;
                    existingresule.ATASubChapterDescription = itemMasterATAMapping.ATASubChapterDescription;
                    existingresule.UpdatedDate = DateTime.Now;
                    existingresule.UpdatedBy = itemMasterATAMapping.UpdatedBy;
                    _unitOfWork.Repository<ItemMasterATAMapping>().Update(existingresule);
                    _unitOfWork.SaveChanges();
                    return Ok(itemMasterATAMapping);
                }
            }
            else
            {
                return BadRequest($"{nameof(itemMasterATAMapping)} cannot be null");
            }

            return Ok(ModelState);
        }
        [HttpPut("ItemMasterPurcSaleUpdate/{id}")]
        public IActionResult UpdateItemmasterPurcSale([FromBody] ItemMasterPurchaseSale[] itemMasterPurchaseSale, long id)
        {
            if (ModelState.IsValid)
            {
                if (itemMasterPurchaseSale.Length > 0)
                {
                    for (int i = 0; i < itemMasterPurchaseSale.Length; i++)
                    {
                        //if (_context.ItemMasterPurchaseSale.Any(o => o.ItemMasterPurchaseSaleId == itemMasterPurchaseSale[i].ItemMasterPurchaseSaleId))
                        //{
                        var existingresule = _context.ItemMasterPurchaseSale.Where(c => c.ItemMasterPurchaseSaleId == itemMasterPurchaseSale[i].ItemMasterPurchaseSaleId).FirstOrDefault();
                        if (existingresule != null)
                        {
                            existingresule.ItemMasterId = itemMasterPurchaseSale[i].ItemMasterId;
                            existingresule.PartNumber = itemMasterPurchaseSale[i].PartNumber;
                            existingresule.PP_CurrencyId = itemMasterPurchaseSale[i].PP_CurrencyId;
                            existingresule.PP_FXRatePerc = itemMasterPurchaseSale[i].PP_FXRatePerc;
                            existingresule.PP_LastListPriceDate = itemMasterPurchaseSale[i].PP_LastListPriceDate;
                            existingresule.PP_LastPurchaseDiscDate = itemMasterPurchaseSale[i].PP_LastPurchaseDiscDate;
                            existingresule.PP_PurchaseDiscAmount = itemMasterPurchaseSale[i].PP_PurchaseDiscAmount;
                            existingresule.PP_PurchaseDiscPerc = itemMasterPurchaseSale[i].PP_PurchaseDiscPerc;
                            existingresule.PP_UnitPurchasePrice = itemMasterPurchaseSale[i].PP_UnitPurchasePrice;
                            existingresule.PP_UOMId = itemMasterPurchaseSale[i].PP_UOMId;
                            existingresule.PP_VendorListPrice = itemMasterPurchaseSale[i].PP_VendorListPrice;
                            existingresule.SP_CalSPByPP_BaseSalePrice = itemMasterPurchaseSale[i].SP_CalSPByPP_BaseSalePrice;
                            existingresule.SP_CalSPByPP_LastMarkUpDate = itemMasterPurchaseSale[i].SP_CalSPByPP_LastMarkUpDate;
                            existingresule.SP_CalSPByPP_LastSalesDiscDate = itemMasterPurchaseSale[i].SP_CalSPByPP_LastSalesDiscDate;
                            existingresule.SP_CalSPByPP_MarkUpAmount = itemMasterPurchaseSale[i].SP_CalSPByPP_MarkUpAmount;
                            existingresule.SP_CalSPByPP_MarkUpPercOnListPrice = itemMasterPurchaseSale[i].SP_CalSPByPP_MarkUpPercOnListPrice;
                            existingresule.SP_CalSPByPP_SaleDiscAmount = itemMasterPurchaseSale[i].SP_CalSPByPP_SaleDiscAmount;

                            existingresule.SP_CalSPByPP_SaleDiscPerc = itemMasterPurchaseSale[i].SP_CalSPByPP_SaleDiscPerc;
                            existingresule.SP_CalSPByPP_UnitSalePrice = itemMasterPurchaseSale[i].SP_CalSPByPP_UnitSalePrice;
                            existingresule.SP_FSP_CurrencyId = itemMasterPurchaseSale[i].SP_FSP_CurrencyId;
                            existingresule.SP_FSP_FlatPriceAmount = itemMasterPurchaseSale[i].SP_FSP_FlatPriceAmount;

                            existingresule.SP_FSP_FXRatePerc = itemMasterPurchaseSale[i].SP_FSP_FXRatePerc;
                            existingresule.SP_FSP_LastFlatPriceDate = itemMasterPurchaseSale[i].SP_FSP_LastFlatPriceDate;
                            existingresule.SP_FSP_UOMId = itemMasterPurchaseSale[i].SP_FSP_UOMId;

                            existingresule.UpdatedDate = DateTime.Now;
                            existingresule.UpdatedBy = itemMasterPurchaseSale[i].UpdatedBy;
                            existingresule.IsActive = itemMasterPurchaseSale[i].IsActive;
                            if (itemMasterPurchaseSale[i].IsDeleted == true)
                            {
                                var history = _context.ItemMasterPurchaseSaleAudit.Where(c => c.ItemMasterPurchaseSaleId == itemMasterPurchaseSale[i].ItemMasterPurchaseSaleId);
                                if (history != null)
                                {
                                    existingresule.IsDeleted = itemMasterPurchaseSale[i].IsDeleted;

                                }
                                else
                                {

                                }
                                var existingResult = _unitOfWork.Repository<ItemMasterPurchaseSale>().GetSingleOrDefault(c => c.ItemMasterPurchaseSaleId == itemMasterPurchaseSale[i].ItemMasterPurchaseSaleId);

                                _unitOfWork.Repository<ItemMasterPurchaseSale>().Remove(existingResult);
                                _unitOfWork.SaveChanges();
                            }
                            else
                            {
                                _unitOfWork.Repository<ItemMasterPurchaseSale>().Update(existingresule);
                                _unitOfWork.SaveChanges();
                            }

                            //_unitOfWork.Repository<ItemMasterPurchaseSale>().Update(existingresule);
                            //_unitOfWork.SaveChanges();


                        }
                        else
                        {
                            itemMasterPurchaseSale[i].CreatedDate = DateTime.Now;
                            itemMasterPurchaseSale[i].UpdatedDate = DateTime.Now;


                            _unitOfWork.Repository<ItemMasterPurchaseSale>().Add(itemMasterPurchaseSale[i]);
                            _unitOfWork.SaveChanges();



                        }



                    }
                    return Ok(itemMasterPurchaseSale);
                }
                return Ok(ModelState);
            }


            else
            {
                return BadRequest($"{nameof(itemMasterPurchaseSale)} cannot be null");
            }

           
        }

        [HttpGet("getItemAirMappedByItemMasterIDMultiTypeIDModelIDDashID/{ItemMasterID}/{AircraftTypeID}/{AircraftModelID}/{DashNumberId}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult AirMappedMultiDashId(long ItemMasterID, string AircraftTypeID, string AircraftModelID, string DashNumberId)
        {
            var result = _unitOfWork.itemMaster.getItemAircraftMappingDataByMultiTypeIdModelIDDashID(ItemMasterID, AircraftTypeID, AircraftModelID, DashNumberId);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getItemATAMappedByItemMasterIDMultiATAIDATASubID/{ItemMasterID}/{ATAID}/{ATASubID}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult ATAMappedMultiATASUBId(long ItemMasterID, string ATAID, string ATASubID)
        {
            var result = _unitOfWork.itemMaster.getItemATAMappingDataByMultiTypeIdATAIDATASUBID(ItemMasterID, ATAID, ATASubID);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }

        //DELETES
        //To Delete Aircraft Info in Item Master Aircraft Mapping
        [HttpPost("UpdateItemMasterAtaDeleteStatus/{id}")]
        public IActionResult DeleteItemmasterATA(long id)
        {
            if (ModelState.IsValid)
            {
                var existingresule = _context.ItemMasterATAMapping.Where(c => c.ItemMasterATAMappingId == id).FirstOrDefault();
                existingresule.IsDeleted = true;
                existingresule.UpdatedDate = DateTime.Now;
                _unitOfWork.Repository<ItemMasterATAMapping>().Update(existingresule);
                _unitOfWork.SaveChanges();
            }
            else
            {
                //return BadRequest($"{nameof(itemMasterATAMapping)} cannot be null");
            }

            return Ok(ModelState);
        }

        [HttpPost("UpdateItemMasterAircraftDeleteStatus/{id}")]
        public IActionResult DeleteItemmasterAircraft(long id)
        {
            if (ModelState.IsValid)
            {
                var existingresule = _context.ItemMasterAircraftMapping.Where(c => c.ItemMasterAircraftMappingId == id).FirstOrDefault();
                existingresule.UpdatedDate = DateTime.Now;
                existingresule.IsDeleted = true;
                _unitOfWork.Repository<ItemMasterAircraftMapping>().Update(existingresule);
                _unitOfWork.SaveChanges();
            }
            return Ok(ModelState);
        }
        [HttpPost("UpdateItemMasterPurcSaletDeleteStatus/{id}")]
        public IActionResult DeleteItemmasterPurcSale(long id)
        {
            if (ModelState.IsValid)
            {
                var existingresule = _context.ItemMasterPurchaseSale.Where(c => c.ItemMasterPurchaseSaleId == id).FirstOrDefault();
                existingresule.IsDeleted = true;
                existingresule.UpdatedDate = DateTime.Now;
                _unitOfWork.Repository<ItemMasterPurchaseSale>().Update(existingresule);
                _unitOfWork.SaveChanges();
            }
            return Ok(ModelState);
        }

        [HttpGet("searchGetItemAirMappedByItemMasterIDMultiTypeIDModelIDDashID/{ItemMasterID}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult orAirMappedMultiDashId(long ItemMasterID, string AircraftTypeID, string AircraftModelID, string DashNumberId)
        {
            var result = _unitOfWork.itemMaster.searchItemAircraftMappingDataByMultiTypeIdModelIDDashID(ItemMasterID, AircraftTypeID, AircraftModelID, DashNumberId);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("searchGetItemATAMappedByItemMasterIDMultiATAIDATASubID/{ItemMasterID}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult orATAMappedMultiATASUBId(long ItemMasterID, string ATAChapterId, string ATASubChapterID)
        {
            var result = _unitOfWork.itemMaster.searchgetItemATAMappingDataByMultiTypeIdATAIDATASUBID(ItemMasterID, ATAChapterId, ATASubChapterID);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getItemMasterPurchSaleByItemMasterID/{ItemMasterID}")]
        [Produces(typeof(List<ItemMasterPurchaseSale>))]
        public IActionResult getItemMasterPurchaseSaleByItemMasterID(long ItemMasterID)
        {
            var result = _unitOfWork.itemMaster.gePurcSaleByItemMasterID(ItemMasterID);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getAuditHistoryItemMasterPurchSaleByID/{itemMasterPurchaseSaleId}")]
        [Produces(typeof(List<ItemMasterPurchaseSale>))]
        public IActionResult getAuditHistoryItemMasterPurchaseSaleByItemMasterID(long itemMasterPurchaseSaleId)
        {
            var result = _unitOfWork.itemMaster.geAuditHistoryPurcSaleByItemMasterID(itemMasterPurchaseSaleId);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("itemMasterSerialized/{itemMasterId}/{active}")]
        public IActionResult updateIsSerialized(long itemMasterId, bool active)
        {
            var item = _unitOfWork.Repository<ItemMaster>().Get(itemMasterId);
            item.IsSerialized = active;
            _unitOfWork.Repository<ItemMaster>().Update(item);
            _unitOfWork.SaveChanges();

            return Ok();
        }

        [HttpGet("itemMasterTimeLife/{itemMasterId}/{active}")]
        public IActionResult updateTimeLife(long itemMasterId, bool active)
        {
            var item = _unitOfWork.Repository<ItemMaster>().Get(itemMasterId);
            item.IsTimeLife = active;
            _unitOfWork.Repository<ItemMaster>().Update(item);
            _unitOfWork.SaveChanges();

            return Ok();
        }


        [HttpPost("createnhatlaaltequpart")]
        public IActionResult CreateNhaTlaAltEquPart([FromBody]Nha_Tla_Alt_Equ_ItemMapping model)
        {
            if (ModelState.IsValid)
            {
                if (model == null)
                    return BadRequest($"{nameof(model)} cannot be null");

                var result = _unitOfWork.itemMaster.CreateNhaTlaAltEquPart(model);
                return Ok(result);
            }
            return Ok(ModelState);
        }

        [HttpPost("updatenhatlaaltequpart")]
        public IActionResult UpdateNhaTlaAltEquPart([FromBody]Nha_Tla_Alt_Equ_ItemMapping model)
        {
            if (ModelState.IsValid)
            {
                if (model == null)
                    return BadRequest($"{nameof(model)} cannot be null");

                var result = _unitOfWork.itemMaster.UpdateNhaTlaAltEquPart(model);
                return Ok(result);
            }
            return Ok(ModelState);
        }

        [HttpPost("nhatlaaltequpartlist")]
        public IActionResult NhaTlaAltEquPartList([FromBody]Filters<NhaAltEquFilters> filters)
        {
            var result = _unitOfWork.itemMaster.NhaTlaAltEquPartList(filters);
            return Ok(result);
        }

        [HttpGet("deletenhatlaaltequpart")]
        public IActionResult DeleteNhaTlaAltEquPart(long mappingId, string updatedBy)
        {
            _unitOfWork.itemMaster.DeleteNhaTlaAltEquPart(mappingId, updatedBy);
            return Ok();
        }

        [HttpGet("nhatlaaltequpartstatus")]
        public IActionResult NhaTlaAltEquPartStatus(long mappingId, bool status, string updatedBy)
        {
            _unitOfWork.itemMaster.NhaTlaAltEquPartStatus(mappingId, status, updatedBy);
            return Ok();
        }

        [HttpGet("getalterqquparts")]
        public IActionResult GetAlterEquParts(long itemMasterId)
        {
            var result = _unitOfWork.itemMaster.GetAlterEquParts(itemMasterId);
            return Ok(result);
        }

        [HttpPost("createequivalencypart")]
        public IActionResult CreateEquivalencyPart()
        {
            Nha_Tla_Alt_Equ_ItemMapping model = new Nha_Tla_Alt_Equ_ItemMapping();

            model.UpdatedBy = model.CreatedBy = Request.Form["CreatedBy"];
            model.UpdatedDate = model.CreatedDate = DateTime.Now;
            model.IsActive = true;
            model.IsDeleted = false;
            model.ItemMappingId = Convert.ToInt64(Request.Form["ItemMappingId"]);
            model.ItemMasterId = Convert.ToInt64(Request.Form["ItemMasterId"]);
            model.MappingItemMasterId = Convert.ToInt64(Request.Form["MappingItemMasterId"]);
            model.MappingType = Convert.ToInt32(Request.Form["MappingType"]);
            model.MasterCompanyId = Convert.ToInt32(Request.Form["MasterCompanyId"]);
            model.Memo = string.Empty;


            var result = _unitOfWork.itemMaster.CreateEquivalencyPart(model);

            model.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, result.ItemMappingId, Convert.ToInt32(ModuleEnum.NhaTlaAltEquItemMapping), Convert.ToString(ModuleEnum.NhaTlaAltEquItemMapping), model.UpdatedBy, model.MasterCompanyId);

            return Ok(result);
        }

        [HttpPost("updateequivalencypart")]
        public IActionResult UpdateEquivalencyPart()
        {
            Nha_Tla_Alt_Equ_ItemMapping model = new Nha_Tla_Alt_Equ_ItemMapping();

            model.UpdatedBy = model.CreatedBy = Request.Form["CreatedBy"];
            model.UpdatedDate = model.CreatedDate = DateTime.Now;
            model.IsActive = true;
            model.IsDeleted = false;
            model.ItemMappingId = Convert.ToInt64(Request.Form["ItemMappingId"]);
            model.ItemMasterId = Convert.ToInt64(Request.Form["ItemMasterId"]);
            model.MappingItemMasterId = Convert.ToInt64(Request.Form["MappingItemMasterId"]);
            model.MappingType = Convert.ToInt32(Request.Form["MappingType"]);
            model.MasterCompanyId = Convert.ToInt32(Request.Form["MasterCompanyId"]);
            model.Memo = string.Empty;


            var result = _unitOfWork.itemMaster.CreateEquivalencyPart(model);

            var attachmentData = _context.Attachment.Where(p => p.ReferenceId == model.ItemMappingId && p.ModuleId == Convert.ToInt32(ModuleEnum.NhaTlaAltEquItemMapping)).FirstOrDefault();

            if (attachmentData != null)
            {
                model.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, model.ItemMappingId,
                                             Convert.ToInt32(ModuleEnum.NhaTlaAltEquItemMapping), Convert.ToString(ModuleEnum.NhaTlaAltEquItemMapping), model.UpdatedBy, model.MasterCompanyId, attachmentData.AttachmentId);
            }
            else
            {
                model.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, model.ItemMappingId,
                                                           Convert.ToInt32(ModuleEnum.NhaTlaAltEquItemMapping), Convert.ToString(ModuleEnum.NhaTlaAltEquItemMapping), model.UpdatedBy, model.MasterCompanyId);
            }

            return Ok(result);
        }

        [HttpPost("equivalencypartlist")]
        public IActionResult EquivalencyPartList([FromBody]Filters<NhaAltEquFilters> filters)
        {
            var result = _unitOfWork.itemMaster.EquivalencyPartList(filters);
            return Ok(result);
        }

        [HttpGet("nhatlaaltequparthistory")]
        public IActionResult NhaTlaAltEquPartHistory(long itemMappingId)
        {
            var result = _unitOfWork.itemMaster.NhaTlaAltEquPartHistory(itemMappingId);
            return Ok(result);
        }



        [HttpGet("GetpartdetailsWithid/{partsList}")]
        public Object getPartwithid(string partsList)
        {
            MultiPart result = new MultiPart();
            PartsNotFound partsNotFound;
            MultiPartList multiPart;

            List<MultiPartList> multiPartList = new List<MultiPartList>();
            List<PartsNotFound> partsNotFoundList = new List<PartsNotFound>();

            result.MultiParts = new List<MultiPartList>();
            result.PartsNotFound = new List<PartsNotFound>();

            if (!string.IsNullOrEmpty(partsList))
            {
                var parts = partsList.Split(',');

                foreach (var partNo in parts)
                {
                    var data = (from IM in _context.ItemMaster
                                join MF in _context.Manufacturer on IM.ManufacturerId equals MF.ManufacturerId into mfg
                                from MF in mfg.DefaultIfEmpty()
                                join IMA in _context.ItemMasterAircraftMapping on IM.ItemMasterId equals IMA.ItemMasterId into imap
                                from IMA in imap.DefaultIfEmpty()
                                join AC in _context.AircraftType on IMA.AircraftTypeId equals AC.AircraftTypeId into act
                                from AC in act.DefaultIfEmpty()
                                join P in _context.Priority on IM.PriorityId equals P.PriorityId into pir
                                from P in pir.DefaultIfEmpty()
                                where (
                                IM.PartNumber.ToLower().Contains(partNo.ToLower()) && IM.IsActive == true && IM.IsDeleted == false
                                )
                                select new
                                {
                                    IM.PartNumber,
                                    IM.PartAlternatePartId,
                                    IM.PartDescription,
                                    IM.ManufacturerId,
                                    Manufacturer = MF.Name,
                                    IM.ReorderQuantiy,
                                    IM.ItemTypeId,
                                    IM.ItemMasterId,
                                    IM.IsHazardousMaterial,
                                    IM.PriorityId,
                                    AircraftTypeId = AC == null ? 0 : AC.AircraftTypeId,
                                    NSN = IM.NationalStockNumber,
                                    Priority = P == null ? "" : P.Description,
                                    AircraftType = AC == null ? "" : AC.Description


                                }).Distinct().ToList();

                    if (data != null && data.Count > 0)
                    {

                        foreach (var item in data)
                        {
                            var flag = multiPartList.Any(p => p.PartNumber == item.PartNumber && p.AircraftType == item.AircraftType);
                            if (!flag)
                            {
                                multiPart = new MultiPartList();
                                multiPart.AircraftType = item.AircraftType;
                                multiPart.AircraftTypeId = item.AircraftTypeId;
                                multiPart.IsHazardousMaterial = item.IsHazardousMaterial;
                                multiPart.ItemMasterId = item.ItemMasterId;
                                multiPart.ItemTypeId = item.ItemTypeId;
                                multiPart.Manufacturer = item.Manufacturer;
                                multiPart.ManufacturerId = item.ManufacturerId;
                                multiPart.NSN = item.NSN;
                                multiPart.PartAlternatePartId = item.PartAlternatePartId;
                                multiPart.PartDescription = item.PartDescription;
                                multiPart.PartNumber = item.PartNumber;
                                multiPart.Priority = item.Priority;
                                multiPart.PriorityId = item.PriorityId;
                                multiPart.ReorderQuantiy = item.ReorderQuantiy;

                                multiPartList.Add(multiPart);
                            }
                        }
                    }
                    else
                    {
                        partsNotFound = new PartsNotFound();
                        partsNotFound.PartNumber = partNo;
                        partsNotFoundList.Add(partsNotFound);
                    }

                }

                result.MultiParts = multiPartList;
                result.PartsNotFound = partsNotFoundList;

            }

            return result;
        }

        [HttpGet("GetPartDetailsDropDown")]
        public IActionResult GetPartDetailsDropDown()
        {
            var allPartDetails = _context.ItemMaster.Where(a => (a.IsActive == null || a.IsActive == true) && (a.IsDeleted == false || a.IsDeleted == null))
                .Select(x => new
                {
                    ItemMasterId = x.ItemMasterId,
                    PartNumber = x.PartNumber,
                    PartDescription = x.PartDescription

                }).OrderByDescending(a => a.ItemMasterId).ToList();
            return Ok(allPartDetails);
        }

        [HttpGet("searchpartnumber/{partNumber}")]
        public IActionResult SearchPartNumber(string partNumber)
        {
            if (partNumber == null && partNumber.Trim() == string.Empty)
            {
                return BadRequest(new Exception("Part Number cannot be empty."));
            }

            var partDetails = _context.ItemMaster
                                .Where(a =>
                                    (a.IsActive == null || a.IsActive == true)
                                    && (a.IsDeleted == false || a.IsDeleted == null)
                                    && a.PartNumber.Trim().ToLower().Contains(partNumber.Trim().ToLower()))
                                    .Select(x => new
                                    {
                                        partId = x.ItemMasterId,
                                        partNumber = x.PartNumber,
                                        partDescription = x.PartDescription

                                    }).OrderBy(a => a.partNumber).ToList();

            return Ok(partDetails);
        }

        [HttpPost("searchpartnumberadvanced")]
        public IActionResult SearchPartNumberAdvanced([FromBody] PartSearchParamters partSearchParamters)
        {
            if (partSearchParamters == null || partSearchParamters.partNumber == null || partSearchParamters.partNumber.Trim() == string.Empty)
            {
                return BadRequest(new Exception("Part Number cannot be empty."));
            }

            List<SearchPartView> partDetails = _context.ItemMaster
                                .Where(a =>
                                    (a.IsActive == null || a.IsActive == true)
                                    && (a.IsDeleted == false || a.IsDeleted == null)
                                    && a.PartNumber.Trim().ToLower().Contains(partSearchParamters.partNumber.Trim().ToLower()))
                                    .Select(x => new SearchPartView
                                    {
                                        partId = x.ItemMasterId,
                                        partNumber = x.PartNumber,
                                        partDescription = x.PartDescription

                                    }).OrderBy(a => a.partNumber).ToList<SearchPartView>();

            if( partDetails.Any() && partSearchParamters.customerId.HasValue && ( ( partSearchParamters.restrictPMA.HasValue && partSearchParamters.restrictPMA.Value ) ||  ( partSearchParamters.restrictDER.HasValue && partSearchParamters.restrictDER.Value ) ) )
            {
                var customer  =  _context.Customer.Where( c => c.CustomerId == partSearchParamters.customerId.Value).FirstOrDefault();
                if(customer != null){
                    
                    partSearchParamters.restrictDER = partSearchParamters.restrictDER.HasValue ? partSearchParamters.restrictDER.Value && customer.RestrictBER.Value : false;  
                    partSearchParamters.restrictPMA = partSearchParamters.restrictPMA.HasValue ? partSearchParamters.restrictPMA.Value  && customer.RestrictPMA : false;

                    if( ( partSearchParamters.restrictDER.HasValue && partSearchParamters.restrictPMA.Value ) 
                        || ( partSearchParamters.restrictDER.HasValue &&  partSearchParamters.restrictDER.Value))
                    {
                        var restrictedParts = _context.RestrictedParts.Where( rp => 
                                                        rp.ReferenceId == partSearchParamters.customerId.Value 
                                                        && rp.IsActive 
                                                        && rp.IsDeleted == false 
                                                        && ( (partSearchParamters.restrictPMA.Value && rp.PartType == "PMA") || ( partSearchParamters.restrictDER.Value && rp.PartType == "DER") ));
                        

                        if(restrictedParts.Any()){
                            partDetails = partDetails.Where( p => !restrictedParts.Any( rp=> rp.ItemMasterId == p.partId)).ToList<SearchPartView>();
                        }
                    }
                }

            }
            return Ok(partDetails);
        }


        [HttpPost("search")]
        public IActionResult SearchItemMaster([FromBody]ItemMasterSearchViewModel searchView)
        {
            if (searchView == null
                   || searchView.partSearchParamters == null
                   || !searchView.partSearchParamters.partId.HasValue)
            {
                return BadRequest(new Exception("Invalid request parameter, partId not passed"));
            }

            IEnumerable<object> results = GetPartDetails(searchView.partSearchParamters.partId, searchView.partSearchParamters.conditionId, searchView.partSearchParamters.customerId);

            if (results.Any() && ( searchView.partSearchParamters.includeAlternatePartNumber || searchView.partSearchParamters.includeEquivalentPartNumber ))
            {
                results = results.Concat(GetMappedPartNumbers(searchView.partSearchParamters));
            }

            var pageCount = (searchView.first / searchView.rows) + 1;

            var searchData = new GetSearchData<object>();

            searchData.Data = DAL.Common.PaginatedList<object>.Create(results.AsQueryable<object>(), pageCount, searchView.rows);

            return Ok(searchData);
        }


        [HttpPost("multisearch")]
        public IActionResult MultiSearchItemMaster([FromBody]MultiItemMasterSearchViewModel searchViews)
        {
            if (searchViews == null
                   || searchViews.multiPartSearchParamters == null
                   || !searchViews.multiPartSearchParamters.Any())
            {
                return BadRequest(new Exception("Invalid request parameter, Atleast one part number should be sent"));
            }


            IEnumerable<object> results = Enumerable.Empty<object>();

            foreach(var partSearchParamters in searchViews.multiPartSearchParamters)
            {
                results = results.Concat(GetPartDetails(partSearchParamters.partId, partSearchParamters.conditionId, partSearchParamters.customerId));

                if (results.Any() && ( partSearchParamters.includeAlternatePartNumber || partSearchParamters.includeEquivalentPartNumber ))
                {
                    results = results.Concat(GetMappedPartNumbers(partSearchParamters));
                }
            }

            var pageCount = (searchViews.first / searchViews.rows) + 1;

            var searchData = new GetSearchData<object>();

            searchData.Data = DAL.Common.PaginatedList<object>.Create(results.AsQueryable<object>(), pageCount, searchViews.rows);

            return Ok(searchData);
        }


        private IEnumerable<object> GetMappedPartNumbers(PartSearchParamters partSearchParamters)
        {
            IEnumerable<object> results = Enumerable.Empty<object>();

            if (partSearchParamters.includeAlternatePartNumber || partSearchParamters.includeEquivalentPartNumber)
            {
                var alternatePartNumbers =
                (from mp in _context.Nha_Tla_Alt_Equ_ItemMapping
                 join im in _context.ItemMaster on mp.ItemMasterId equals im.ItemMasterId
                 where mp.ItemMasterId == partSearchParamters.partId.Value
                         && mp.IsActive
                         && im.IsActive.HasValue && im.IsActive.Value
                         && ( ( partSearchParamters.includeAlternatePartNumber &&  mp.MappingType == 1 )
                                || ( partSearchParamters.includeEquivalentPartNumber && mp.MappingType == 2) )
                         && im.MasterCompanyId == 1
                         && mp.MasterCompanyId == 1
                 select new MappedPartsView
                 {
                     ItemMasterId = im.ItemMasterId,
                     PartNumber = im.PartNumber,
                     MappingItemMasterId = mp.MappingItemMasterId,
                     MappingType = mp.MappingType
                     
                 }).ToList<MappedPartsView>();

                if (alternatePartNumbers.Any())
                {
                    foreach (var pn in alternatePartNumbers)
                    {
                        results = results.Concat(GetPartDetails(pn.MappingItemMasterId, partSearchParamters.conditionId, partSearchParamters.customerId, pn.PartNumber, pn.MappingType));
                    }
                }
            }

            return results;
        }
        private IEnumerable<object> GetPartDetails(long? partId, long? conditionId, long? customerId, string alternateFor = "", int mappingType=-1)
        {
            var result = Enumerable.Empty<object>();

            var condition = _context.Condition.Where(c => c.ConditionId == conditionId).FirstOrDefault();
            
            var itemQuantityDetails = from item in _context.ItemMaster
                                      join stock in _context.StockLine on item.ItemMasterId equals stock.ItemMasterId into itemMasterStocks
                                      from itemStock in itemMasterStocks.DefaultIfEmpty()
                                      join po in _context.PurchaseOrder on itemStock.PurchaseOrderId equals po.PurchaseOrderId into stockpo
                                      from spo in stockpo.DefaultIfEmpty()
                                      join pop in _context.PurchaseOrderPart
                                       on new { poid = spo.PurchaseOrderId ?? 0, imid = item.ItemMasterId ?? 0 }
                                       equals new { poid = pop.PurchaseOrderId, imid = pop.ItemMasterId }
                                       into stockpop
                                      from spop in stockpop.DefaultIfEmpty()
                                      where (item.IsActive.HasValue && item.IsActive.Value == true)
                                         && (item.IsDeleted.HasValue && !item.IsDeleted == true || !item.IsDeleted.HasValue)
                                         && (item.MasterCompanyId.HasValue && item.MasterCompanyId.Value == 1)
                                         && item.ItemMasterId == partId
                                         && ( itemStock.ConditionId.HasValue ? itemStock.ConditionId == conditionId : true  )
                                      select new
                                      {
                                          partNumber = item.PartNumber,
                                          qtyOnHand = itemStock.QuantityOnHand ?? 0,
                                          qtyAvailable = itemStock.QuantityAvailable ?? 0,
                                          qtyOnOrder = spop.QuantityOrdered ?? 0,
                                          unitCost = itemStock.CoreUnitCost ?? 0
                                      };


            var query = from iqd in itemQuantityDetails
                        group iqd by iqd.partNumber into g
                        select new
                        {
                            partNumber = g.Key,
                            qtyOnHand = g.Sum(qh => qh.qtyOnHand),
                            qtyAvailable = g.Sum(qh => qh.qtyAvailable),
                            qtyOnOrder = g.Sum(qh => qh.qtyOnOrder),
                            unitCost = g.Max(qh => qh.unitCost)
                        };

            var itemQuantity = query.FirstOrDefault();

            if (itemQuantity == null) return result;

            var itemMasterSale = GetItemMasterPurchaseSale(customerId, partId);  

            result = from item in _context.ItemMaster
                     join uom in _context.UnitOfMeasure on item.ConsumeUnitOfMeasureId equals uom.UnitOfMeasureId into iuom
                     from iu in iuom.DefaultIfEmpty()
                     join currency in _context.Currency on item.CurrencyId equals currency.CurrencyId into itemcurrecy
                     from ic in itemcurrecy.DefaultIfEmpty()
                     where item.IsActive.HasValue && item.IsActive.Value == true
                            && (item.IsDeleted.HasValue && !item.IsDeleted == true || !item.IsDeleted.HasValue)
                            && (item.MasterCompanyId.HasValue && item.MasterCompanyId.Value == 1)
                            && item.ItemMasterId == partId

                     select new
                     {
                         methodType = "I",
                         method = "Item Master",
                         itemId = item.ItemMasterId,
                         partNumber = item.PartNumber,
                         alternatePartId = item.PartAlternatePartId,
                         alternateFor = alternateFor,
                         description = item.PartDescription,
                         conditionType = string.Empty,
                         uomDescription = iu.Description,
                         unitCost = itemQuantity.unitCost,
                         unitListPrice = item.ListPrice,
                         qtyAvailable =  itemQuantity.qtyAvailable,
                         qtyOnHand = itemQuantity.qtyOnHand,
                         qtyToOrder = 0,
                         qtyOnOrder = itemQuantity.qtyOnOrder,
                         itemClassification = item.ItemClassification,
                         itemGroup = string.Empty,
                         pma = item.PMA,
                         der = item.DER,
                         manufacturer = item.Manufacturer,
                         customerRef = string.Empty,
                         currency = item.Currency,
                         coreUnitPrice = item.CoreValue,
                         glAccount = item.GLAccount,
                         itar = item.ITARNumber,
                         eccn = item.ExportECCN,
                         memo = item.Memo,
                         conditionId = condition != null ? condition.ConditionId : -1,
                         conditionDescription = condition != null ? condition.Description : string.Empty,
                         currencyId = ic != null ? ic.CurrencyId : -1,
                         currencyDescription = ic != null ? ic.DisplayName : string.Empty,  
                         mappingType = mappingType,
                         itemMasterSale = itemMasterSale
                     };


            return result.ToList<object>();
        }

        [HttpGet("GetParntnumberlistwithManufacturer")]
        [Produces(typeof(List<Manufacturer>))]
        public IActionResult GetParntnumberlistwithManufacturer()
        {
            // var obj = _context.ItemMaster.Where(a => (a.IsActive == null || a.IsActive == true) && (a.IsDeleted == false || a.IsDeleted == null) && (a.PartDescription != null) && (a.PartNumber != null)).OrderByDescending(c => c.ItemMasterId).ToList();

            var parDetails = _unitOfWork.itemMaster.GetPartnumberList(); //.GetAllCustomersData();

            return Ok(parDetails);
        }

        [HttpPost("createitemmastercapes")]
        public IActionResult CreateItemMasterCapes([FromBody]List<ItemMasterCapes> itemMasterCapes)
        {
            if (ModelState.IsValid)
            {
                var result = _unitOfWork.itemMaster.CreateItemMasterCapes(itemMasterCapes);
                return Ok(result);
            }
            return Ok(ModelState);
        }

        [HttpGet("ItemMasterCapsById/{itemMasterCapesId}")]
        public IActionResult ItemMasterCapesById(long itemMasterCapesId)
        {
            if (ModelState.IsValid)
            {
                var result = _unitOfWork.itemMaster.ItemMasterCapesById(itemMasterCapesId);
                return Ok(result);
            }
            return Ok(ModelState);
        }

        [HttpGet("deleteitemmastercapes")]
        public IActionResult DeleteItemMasterCapes(long itemMasterCapesId, string updatedBy)
        {
            _unitOfWork.itemMaster.DeleteItemMasterCapes(itemMasterCapesId, updatedBy);
            return Ok();
        }

        [HttpGet("itemmastercapesAudit/{itemMasterCapesId}")]
        public IActionResult ItemMasterCapsAudit(long itemMasterCapesId)
        {
            var result = _unitOfWork.itemMaster.ItemMasterCapsAudit(itemMasterCapesId);
            return Ok(result);
        }

        [HttpPost("getitemmastercapes")]
        public IActionResult GetItemMasterCapes([FromBody]Filters<ItemMasterCapesFilters> capesFilters)
        {
            var result = _unitOfWork.itemMaster.GetItemMasterCapes(capesFilters);
            return Ok(result);
        }

        [HttpGet("itemmastercapesglobalsearch")]
        public IActionResult ItemMasterCapesGlobalSearch(long itemMasterId, string filterText, int pageNumber = 1, int pageSize = 10)
        {
            var result = _unitOfWork.itemMaster.ItemMasterCapesGlobalSearch(itemMasterId, filterText, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpPost("itemmasterdata")]
        public IActionResult ItemMasterData([FromBody]Filters<ItemMasterDataFilters> capesFilters)
        {
            var result = _unitOfWork.itemMaster.ItemMasterData(capesFilters);
            return Ok(result);
        }

        [HttpPost("searchmultipleparts")]
        public IActionResult SearchMultipleParts([FromBody] MultiPartSearchParameters partSearchParamters)
        {
            if (partSearchParamters == null || partSearchParamters.Parts == null || !partSearchParamters.Parts.Any())
            {
                return BadRequest(new Exception("No part numbers provided"));
            }

            var parts = Enumerable.Empty<SearchPartView>();
            
            parts = from part in partSearchParamters.Parts  
                    join im in _context.ItemMaster on part.ToLower() equals im.PartNumber.ToLower()  into itemMasterParts 
                    from imp in itemMasterParts.DefaultIfEmpty()  
                    select new SearchPartView{
                        partId = imp != null ? imp?.ItemMasterId : null,
                        partNumber = imp != null ? imp?.PartNumber : part,
                        partDescription = imp != null ? imp?.PartDescription : null,
                        Exist = imp != null  && imp.ItemMasterId.HasValue, 
                    };


            if( parts.Any()  
                && partSearchParamters.CustomerId.HasValue 
                && ( partSearchParamters.RestrictPMA 
                    || partSearchParamters.RestrictDER))
            {
                var customer  =  _context.Customer.Where( c => c.CustomerId == partSearchParamters.CustomerId.Value).FirstOrDefault();
                if(customer != null){
                    
                    partSearchParamters.RestrictDER = partSearchParamters.RestrictDER ? partSearchParamters.RestrictDER && customer.RestrictBER.Value : false;  
                    partSearchParamters.RestrictPMA = partSearchParamters.RestrictPMA  ? partSearchParamters.RestrictPMA && customer.RestrictPMA : false;

                    if( partSearchParamters.RestrictDER  ||  partSearchParamters.RestrictDER )
                    {
                        var restrictedParts = _context.RestrictedParts.Where( rp => 
                                                        rp.ReferenceId == partSearchParamters.CustomerId.Value 
                                                        && rp.IsActive 
                                                        && rp.IsDeleted == false 
                                                        && ( (partSearchParamters.RestrictPMA && rp.PartType == "PMA") || ( partSearchParamters.RestrictDER && rp.PartType == "DER")));
                        

                        if(restrictedParts.Any()){
                            parts = parts.Select ( p => { 
                               p.Restricted = restrictedParts.Any( rp => rp.PartNumber == p.partNumber);
                               return p;
                            });
                        }
                    }
                }
            }

            return Ok(parts);
        }

        private ItemMasterSaleViewModel GetItemMasterPurchaseSale(long? customerId, long? partId)
        { 
            
            ItemMasterSaleViewModel itemMasterSale = null;  

            if( customerId.HasValue)
            { 
                Customer customer  = _unitOfWork.Customer.Get(customerId); 
                
                if(customer != null)
                { 
                    IEnumerable<ItemMasterPurchaseSale> itemMasterPurchaseSales = _unitOfWork.itemMaster.gePurcSaleByItemMasterID(partId.Value);
                
                    if(itemMasterPurchaseSales.Any())
                    {
                
                        itemMasterSale = itemMasterPurchaseSales.Where( imps => imps.SP_FSP_CurrencyId == customer.CurrencyId).Select( sales => new ItemMasterSaleViewModel{
                            ItemMasterPurchaseSaleId = sales.ItemMasterPurchaseSaleId,
                            Condition = sales.Condition,
                            UomId  = sales.SP_FSP_UOMId,
                            CurrencyId = sales.SP_FSP_CurrencyId,
                            FxRate = sales.SP_FSP_FXRatePerc,
                            BaseSalePrice = sales.SP_CalSPByPP_BaseSalePrice,
                            DiscountPercentage = sales.SP_CalSPByPP_SaleDiscPerc,
                            DiscountAmount = sales.SP_CalSPByPP_SaleDiscAmount,
                            UnitSalePrice = sales.SP_CalSPByPP_UnitSalePrice
                        }).FirstOrDefault();  
                    }
                } 
            }

            return itemMasterSale;
        }
    }
}