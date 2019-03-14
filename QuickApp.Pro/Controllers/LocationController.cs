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
    public class LocationController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public LocationController(IUnitOfWork unitOfWork, ILogger<WorkflowActionController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<LocationViewModel>))]
        public IActionResult Get()
        {
            //var result = _unitOfWork.Locations.GetAllLocationData(); //.GetAllCustomersData();
            try
            {
                var result = _unitOfWork.Locations.GetAllLocationData();

                return Ok(result); 
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        
        //new Add

        [HttpGet("GetManagementWareHouse/{id}")]
        [Produces(typeof(List<LocationViewModel>))]
        public IActionResult GetManagementWareHouse(long id)
        {
            try
            {
                var result = _unitOfWork.Locations.GetManagementWareHouse(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //new Add

        [HttpGet("GetLocationStockData/{id}")]
        [Produces(typeof(List<LocationViewModel>))]
        public IActionResult GetLocationStockData(long id)
        {
            try
            {
                var result = _unitOfWork.Locations.GetLocationStockData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        //change
        [HttpGet("GetMangementLocation/{id}")]
        [Produces(typeof(List<ManagementLocationViewModel>))]
        public IActionResult GetMangementLocation(long id)
        {
            var result = _unitOfWork.managementLocation.GetAllManagementLocationData(id); //GetAllSite Information
            return Ok(result);


        }


        [HttpGet("GetAddress/{id}")]
        [Produces(typeof(List<AuditAddressViewModel>))]
        public IActionResult GetAddress(long id)
        {
            //var result = _unitOfWork.Warehouses.GetAllWarehouseData(); //.GetAllCustomersData();


            try
            {
                var result = _unitOfWork.Locations.GetAllAddressData(id);

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
                var result = _unitOfWork.Locations.GetAllWarehouseData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        //[HttpGet("GetcountryList")]

        //[Produces(typeof(List<Countries>))]
        //public IActionResult GetcountryList()
        //{
        //    var allcustomertype = _context.Countries.OrderByDescending(c => c.countries_id).ToList();
        //    return Ok(allcustomertype);

        //}

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

        [HttpPost("locationPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] LocationViewModel locationViewModel, Address address)
        {
            if (ModelState.IsValid)
            {
                if (locationViewModel == null)
                    return BadRequest($"{nameof(locationViewModel)} cannot be null");

                DAL.Models.Location locationobject = new DAL.Models.Location();
                locationViewModel.MasterCompanyId = 1;
                locationobject.LocationId = locationViewModel.LocationId;
                locationobject.Name = locationViewModel.Name;
                locationobject.WarehouseId = locationViewModel.WarehouseId;
                
                locationobject.Memo = locationViewModel.Memo;
                locationobject.MasterCompanyId = locationViewModel.MasterCompanyId;
                locationobject.IsActive = locationViewModel.IsActive;
                locationobject.CreatedDate = DateTime.Now;
                locationobject.UpdatedDate = DateTime.Now;
                locationobject.CreatedBy = locationViewModel.CreatedBy;
                locationobject.UpdatedBy = locationViewModel.UpdatedBy;
                _unitOfWork.Locations.Add(locationobject);
                _unitOfWork.SaveChanges();
                return Ok(locationobject);

            }

            return Ok(ModelState);
        }

        //change
        [HttpPost("managementLocationPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateManagementLocationAction([FromBody] ManagementLocationViewModel managementLocationViewModel)
        {
            if (ModelState.IsValid)
            {
                if (managementLocationViewModel == null)
                    return BadRequest($"{nameof(managementLocationViewModel)} cannot be null");

                DAL.Models.ManagementLocation managementlocationobject = new DAL.Models.ManagementLocation();
                managementLocationViewModel.MasterCompanyId = 1;
                // managementsiteobject.ManagementSiteId = managementSiteViewModel.ManagementSiteId;
                managementlocationobject.LocationId = managementLocationViewModel.LocationId;
                managementlocationobject.ManagementStructureId = managementLocationViewModel.ManagementStructureId;
                managementlocationobject.MasterCompanyId = managementLocationViewModel.MasterCompanyId;
                managementlocationobject.IsActive = managementLocationViewModel.IsActive;
                managementlocationobject.CreatedDate = DateTime.Now;
                managementlocationobject.UpdatedDate = DateTime.Now;
                managementlocationobject.IsDelete = false;//Externally we are dong for create
                managementlocationobject.CreatedBy = managementLocationViewModel.CreatedBy;
                managementlocationobject.UpdatedBy = managementLocationViewModel.UpdatedBy;
                _context.ManagementLocation.Add(managementlocationobject);
                _context.SaveChanges();
                return Ok(managementlocationobject);

            }

            return Ok(ModelState);
        }

        //public IActionResult AddAddress(SiteViewModel siteViewModel)
        //{
        //    Address address = new Address();
        //    address.Line1 = siteViewModel.Address1;
        //    address.Line2 = siteViewModel.Address2;
        //    address.Line3 = siteViewModel.Address3;
        //    address.PostalCode = siteViewModel.PostalCode;
        //    address.StateOrProvince = siteViewModel.StateOrProvince;
        //    address.City = siteViewModel.City;
        //    address.Country = siteViewModel.Country;
        //    address.MasterCompanyId = 1;
        //    address.RecordCreateDate = DateTime.Now;
        //    address.CreatedBy = siteViewModel.CreatedBy;
        //    address.UpdatedBy = siteViewModel.UpdatedBy;
        //    address.CreatedDate = DateTime.Now;
        //    address.UpdatedDate = DateTime.Now;
        //    _unitOfWork.Address.Add(address);
        //    _unitOfWork.SaveChanges();
        //    siteViewModel.AddressId = address.AddressId.Value;
        //    return Ok(ModelState);
        //}

        [HttpPut("locationPost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] LocationViewModel locationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (locationViewModel == null)
                    return BadRequest($"{nameof(locationViewModel)} cannot be null");

                var existingResult = _unitOfWork.Locations.GetSingleOrDefault(c => c.LocationId == id);
                //var address = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == existingResult.AddressId);
                //
                locationViewModel.MasterCompanyId = 1;
                existingResult.LocationId = locationViewModel.LocationId;
                existingResult.Name = locationViewModel.Name;
                existingResult.WarehouseId = locationViewModel.WarehouseId;
                existingResult.MasterCompanyId = locationViewModel.MasterCompanyId;
                existingResult.Memo = locationViewModel.Memo;
                existingResult.IsActive = locationViewModel.IsActive;
                existingResult.CreatedDate = DateTime.Now;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.CreatedBy = locationViewModel.CreatedBy;
                existingResult.UpdatedBy = locationViewModel.UpdatedBy;

                //address.Line1 = siteViewModel.Address1;
                //address.Line2 = siteViewModel.Address2;
                //address.Line3 = siteViewModel.Address3;
                //address.PostalCode = siteViewModel.PostalCode;
                //address.StateOrProvince = siteViewModel.StateOrProvince;
                //address.City = siteViewModel.City;
                //address.Country = siteViewModel.Country;
                //address.MasterCompanyId = 1;
                //address.RecordCreateDate = DateTime.Now;
                //address.CreatedBy = siteViewModel.CreatedBy;
                //address.UpdatedBy = siteViewModel.UpdatedBy;
                //address.CreatedDate = DateTime.Now;
                //address.UpdatedDate = DateTime.Now;
                //

                //_unitOfWork.Address.Update(address);
                _unitOfWork.SaveChanges();
                _unitOfWork.Locations.Update(existingResult);
                _unitOfWork.SaveChanges();
                return Ok(existingResult);
            }

            return Ok(ModelState);
        }


        [HttpDelete("locationPost/{id}")]
        [Produces(typeof(LocationViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Locations.GetSingleOrDefault(c => c.LocationId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Locations.Update(existingResult);
            //_unitOfWork.ATAMains.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        //change 

        [HttpDelete("managementLocationPost/{id}")]
        [Produces(typeof(ManagementLocationViewModel))]
        public IActionResult DeleteManagementAction(long id)
        {
            var existingResult = _context.ManagementLocation.Where(c => c.LocationId == id).ToList();
            //in this we are removing complete Management Site Data based on SiteId after that we will call update method to add Data 
            for (var i = 0; i < existingResult.Count; i++)
            {
                _unitOfWork.managementLocation.Remove(existingResult[i]);
                _unitOfWork.SaveChanges();
            }
            //existingResult.IsDelete = true;
            //_unitOfWork.managementSite.Update(existingResult);
            return Ok(id);
        }
    }

}