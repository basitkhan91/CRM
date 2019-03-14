using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class BinComponentController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;

        public BinComponentController(IUnitOfWork unitOfWork, ILogger<WorkflowActionController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }


        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<BinViewModel>))]
        public IActionResult Get()
        {

            try
            {
                var result = _unitOfWork.Bins.GetAllBinData();

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpGet("GetManagementShelf/{id}")]
        [Produces(typeof(List<BinViewModel>))]
        public IActionResult GetManagementShelf(long id)
        {
            try
            {
                var result = _unitOfWork.Bins.GetManagementShelf(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        //change
        [HttpGet("GetMangementBin/{id}")]
        [Produces(typeof(List<ManagementBinViewModel>))]
        public IActionResult GetMangementBin(long id)
        {
            var result = _unitOfWork.managementBin.GetAllManagementBinData(id); //GetAllSite Information
            return Ok(result);
        }

        [HttpGet("GetAddress/{id}")]
        [Produces(typeof(List<AuditAddressViewModel>))]
        public IActionResult GetAddress(long id)
        {

            try
            {
                var result = _unitOfWork.Bins.GetAllAddressData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }


        [HttpGet("GetWarehouse/{id}")]
        [Produces(typeof(List<WarehouseViewModel>))]
        public IActionResult GetWarehouse(long id)
        {
            //var result = _unitOfWork.Warehouses.GetAllWarehouseData(); //.GetAllCustomersData();


            try
            {
                var result = _unitOfWork.Bins.GetAllWarehouseData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }


        [HttpGet("GetLocations/{id}")]
        [Produces(typeof(List<LocationViewModel>))]
        public IActionResult GetLocation(long id)
        {
            //var result = _unitOfWork.Warehouses.GetAllWarehouseData(); //.GetAllCustomersData();


            try
            {
                var result = _unitOfWork.Bins.GetAllLocationData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        //Adding
        [HttpGet("GetShelfs/{id}")]
        [Produces(typeof(List<ShelfViewModel>))]
        public IActionResult GetShelf(long id)
        {
            //var result = _unitOfWork.Warehouses.GetAllWarehouseData(); //.GetAllCustomersData();


            try
            {
                var result = _unitOfWork.Bins.GetAllShelfData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }


        //Adding
        [HttpGet("GetBins/{id}")]
        [Produces(typeof(List<ShelfViewModel>))]
        public IActionResult GetBins(long id)
        {
            //var result = _unitOfWork.Warehouses.GetAllWarehouseData(); //.GetAllCustomersData();


            try
            {
                var result = _unitOfWork.Bins.GetAllBinDataById(id);

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        //
        [HttpGet("ataauditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Location", id); //.GetAllCustomersData();


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


        [HttpPost("binPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] BinViewModel binViewModel, Address address)
        {
            if (ModelState.IsValid)
            {
                if (binViewModel == null)
                    return BadRequest($"{nameof(binViewModel)} cannot be null");

                DAL.Models.Bin binobject = new DAL.Models.Bin();
                binViewModel.MasterCompanyId = 1;
                binobject.BinId = binViewModel.BinId;
                binobject.ShelfId = binViewModel.ShelfId;
                //shelfobject.LocationId = binViewModel.LocationId;
                binobject.Name = binViewModel.Name;
                binobject.Memo = binViewModel.Memo;
                binobject.MasterCompanyId = binViewModel.MasterCompanyId;
                binobject.IsActive = binViewModel.IsActive;
                binobject.CreatedDate = DateTime.Now;
                binobject.UpdatedDate = DateTime.Now;
                binobject.CreatedBy = binViewModel.CreatedBy;
                binobject.UpdatedBy = binViewModel.UpdatedBy;
                _unitOfWork.Bins.Add(binobject);
                _unitOfWork.SaveChanges();
                return Ok(binobject);

            }

            return Ok(ModelState);
        }

        [HttpPost("managementBinPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateManagementBinAction([FromBody] ManagementBinViewModel managementBinViewModel)
        {
            if (ModelState.IsValid)
            {
                if (managementBinViewModel == null)
                    return BadRequest($"{nameof(managementBinViewModel)} cannot be null");

                DAL.Models.ManagementBin managementbinobject = new DAL.Models.ManagementBin();
                managementBinViewModel.MasterCompanyId = 1;
                // managementsiteobject.ManagementSiteId = managementSiteViewModel.ManagementSiteId;
                managementbinobject.BinId = managementBinViewModel.BinId;
                managementbinobject.ManagementStructureId = managementBinViewModel.ManagementStructureId;
                managementbinobject.MasterCompanyId = managementBinViewModel.MasterCompanyId;
                managementbinobject.IsActive = managementBinViewModel.IsActive;
                managementbinobject.CreatedDate = DateTime.Now;
                managementbinobject.UpdatedDate = DateTime.Now;
                managementbinobject.IsDelete = false;//Externally we are dong for create
                managementbinobject.CreatedBy = managementBinViewModel.CreatedBy;
                managementbinobject.UpdatedBy = managementBinViewModel.UpdatedBy;
                _context.ManagementBin.Add(managementbinobject);
                _context.SaveChanges();
                return Ok(managementbinobject);

            }

            return Ok(ModelState);
        }

        [HttpPut("binPost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] BinViewModel binViewModel)
        {

            if (ModelState.IsValid)
            {
                if (binViewModel == null)
                    return BadRequest($"{nameof(binViewModel)} cannot be null");

                var existingResult = _unitOfWork.Bins.GetSingleOrDefault(c => c.BinId == id);
                //var address = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == existingResult.AddressId);
                //
                binViewModel.MasterCompanyId = 1;
                existingResult.BinId = binViewModel.BinId;
                existingResult.ShelfId = binViewModel.ShelfId;
                existingResult.Name = binViewModel.Name;
                //existingResult.LocationId = binViewModel.LocationId;
                existingResult.MasterCompanyId = binViewModel.MasterCompanyId;
                existingResult.Memo = binViewModel.Memo;
                existingResult.IsActive = binViewModel.IsActive;
                existingResult.CreatedDate = DateTime.Now;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.CreatedBy = binViewModel.CreatedBy;
                existingResult.UpdatedBy = binViewModel.UpdatedBy;
                _unitOfWork.SaveChanges();
                _unitOfWork.Bins.Update(existingResult);
                _unitOfWork.SaveChanges();
                return Ok(existingResult);
            }

            return Ok(ModelState);
        }


        [HttpDelete("binPost/{id}")]
        [Produces(typeof(BinViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Bins.GetSingleOrDefault(c => c.BinId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Bins.Update(existingResult);
            //_unitOfWork.ATAMains.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        //// GET: api/values
        //[HttpGet("GetBinRow/{id}")]
        //[Produces(typeof(List<BinViewModel>))]
        //public IActionResult GetBinRow()
        //{

        //    try
        //    {
        //        var result = _unitOfWork.Bins.GetBinDataforStock();

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }
        //}

        [HttpDelete("managementBinPost/{id}")]
        [Produces(typeof(ManagementBinViewModel))]
        public IActionResult DeleteManagementAction(long id)
        {
            var existingResult = _context.ManagementBin.Where(c => c.BinId == id).ToList();
            //in this we are removing complete Management Site Data based on SiteId after that we will call update method to add Data 
            for (var i = 0; i < existingResult.Count; i++)
            {
                _unitOfWork.managementBin.Remove(existingResult[i]);
                _unitOfWork.SaveChanges();
            }
            //existingResult.IsDelete = true;
            //_unitOfWork.managementSite.Update(existingResult);
            return Ok(id);
        }
    }
}
