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
    public class ShelfController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;

        public ShelfController(IUnitOfWork unitOfWork, ILogger<WorkflowActionController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }


        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<ShelfViewModel>))]
        public IActionResult Get()
        {
            try
            {
                var result = _unitOfWork.Shelfs.GetAllShelfData();

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpGet("GetManagementLocation/{id}")]
        [Produces(typeof(List<ShelfViewModel>))]
        public IActionResult GetManagementLocation(long id)
        {
            try
            {
                var result = _unitOfWork.Shelfs.GetManagementLocation(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("GetAllShelfStockData/{id}")]
        [Produces(typeof(List<ShelfViewModel>))]
        public IActionResult GetAllShelfStockData(long id)
        {
            try
            {
                var result = _unitOfWork.Shelfs.GetAllShelfStockData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //change
        [HttpGet("GetMangementShelf/{id}")]
        [Produces(typeof(List<ManagementShelfViewModel>))]
        public IActionResult GetMangementShelf(long id)
        {
            var result = _unitOfWork.managementShelf.GetAllManagementShelfData(id); //GetAllSite Information
            return Ok(result);
        }

        [HttpDelete("managementShelfPost/{id}")]
        [Produces(typeof(ManagementShelfViewModel))]
        public IActionResult DeleteManagementAction(long id)
        {
            var existingResult = _context.ManagementShelf.Where(c => c.ShelfId == id).ToList();
            //in this we are removing complete Management Site Data based on SiteId after that we will call update method to add Data 
            for (var i = 0; i < existingResult.Count; i++)
            {
                _unitOfWork.managementShelf.Remove(existingResult[i]);
                _unitOfWork.SaveChanges();
            }
            //existingResult.IsDelete = true;
            //_unitOfWork.managementSite.Update(existingResult);
            return Ok(id);
        }

        [HttpGet("GetAddress/{id}")]
        [Produces(typeof(List<AuditAddressViewModel>))]
        public IActionResult GetAddress(long id)
        {

            try
            {
                var result = _unitOfWork.Shelfs.GetAllAddressData(id);

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
                var result = _unitOfWork.Shelfs.GetAllWarehouseData(id);

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
                var result = _unitOfWork.Shelfs.GetAllLocationData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

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


        [HttpPost("shelfPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ShelfViewModel shelfViewModel, Address address)
        {
            if (ModelState.IsValid)
            {
                if (shelfViewModel == null)
                    return BadRequest($"{nameof(shelfViewModel)} cannot be null");

                DAL.Models.Shelf shelfobject = new DAL.Models.Shelf();
                shelfViewModel.MasterCompanyId = 1;
                shelfobject.ShelfId = shelfViewModel.ShelfId;
                shelfobject.LocationId = shelfViewModel.LocationId;
                shelfobject.Name = shelfViewModel.Name;
                shelfobject.Memo = shelfViewModel.Memo;
                shelfobject.MasterCompanyId = shelfViewModel.MasterCompanyId;
                shelfobject.IsActive = shelfViewModel.IsActive;
                shelfobject.CreatedDate = DateTime.Now;
                shelfobject.UpdatedDate = DateTime.Now;
                shelfobject.CreatedBy = shelfViewModel.CreatedBy;
                shelfobject.UpdatedBy = shelfViewModel.UpdatedBy;
                _unitOfWork.Shelfs.Add(shelfobject);
                _unitOfWork.SaveChanges();
                return Ok(shelfobject);

            }

            return Ok(ModelState);
        }

        [HttpPost("GetMangementShelf")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateManagementShelfAction([FromBody] ManagementShelfViewModel managementShelfViewModel)
        {
            if (ModelState.IsValid)
            {
                if (managementShelfViewModel == null)
                    return BadRequest($"{nameof(managementShelfViewModel)} cannot be null");

                DAL.Models.ManagementShelf managementshelfobject = new DAL.Models.ManagementShelf();
                managementShelfViewModel.MasterCompanyId = 1;
                // managementsiteobject.ManagementSiteId = managementSiteViewModel.ManagementSiteId;
                managementshelfobject.ShelfId = managementShelfViewModel.ShelfId;
                managementshelfobject.ManagementStructureId = managementShelfViewModel.ManagementStructureId;
                managementshelfobject.MasterCompanyId = managementShelfViewModel.MasterCompanyId;
                managementshelfobject.IsActive = managementShelfViewModel.IsActive;
                managementshelfobject.CreatedDate = DateTime.Now;
                managementshelfobject.UpdatedDate = DateTime.Now;
                managementshelfobject.IsDelete = false;//Externally we are dong for create
                managementshelfobject.CreatedBy = managementShelfViewModel.CreatedBy;
                managementshelfobject.UpdatedBy = managementShelfViewModel.UpdatedBy;
                _context.ManagementShelf.Add(managementshelfobject);
                _context.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("shelfPost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ShelfViewModel shelfViewModel)
        {

            if (ModelState.IsValid)
            {
                if (shelfViewModel == null)
                    return BadRequest($"{nameof(shelfViewModel)} cannot be null");

                var existingResult = _unitOfWork.Shelfs.GetSingleOrDefault(c => c.ShelfId == id);
                //var address = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == existingResult.AddressId);
                //
                shelfViewModel.MasterCompanyId = 1;
                existingResult.ShelfId = shelfViewModel.ShelfId;
                existingResult.Name = shelfViewModel.Name;
                existingResult.LocationId = shelfViewModel.LocationId;
                existingResult.MasterCompanyId = shelfViewModel.MasterCompanyId;
                existingResult.Memo = shelfViewModel.Memo;
                existingResult.IsActive = shelfViewModel.IsActive;
                existingResult.CreatedDate = DateTime.Now;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.CreatedBy = shelfViewModel.CreatedBy;
                existingResult.UpdatedBy = shelfViewModel.UpdatedBy;
                _unitOfWork.SaveChanges();
                _unitOfWork.Shelfs.Update(existingResult);
                _unitOfWork.SaveChanges();
                return Ok(existingResult);
            }

            return Ok(ModelState);
        }


        [HttpDelete("shelfPost/{id}")]
        [Produces(typeof(ShelfViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Shelfs.GetSingleOrDefault(c => c.ShelfId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Shelfs.Update(existingResult);
            //_unitOfWork.ATAMains.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ShelfAudit>()
                .Find(x => x.ShelfId == id)
                .OrderByDescending(x => x.ShelfAuditId);

            var auditResult = new List<AuditResult<ShelfAudit>>();

            auditResult.Add(new AuditResult<ShelfAudit> { AreaName = "Shelf ", Result = audits.ToList() });

            return Ok(auditResult);
        }



    }
}