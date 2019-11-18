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
    public class WarehouseController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public WarehouseController(IUnitOfWork unitOfWork, ILogger<WorkflowActionController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<WarehouseViewModel>))]
        public IActionResult Get()
        {
            try
            {
                var result = _unitOfWork.Warehouses.GetAllWarehouseData();

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //new Add

        [HttpGet("GetManagementSite/{id}")]
        [Produces(typeof(List<WarehouseViewModel>))]
        public IActionResult GetManagementSite(long id)
        {
            try
            {
                var result = _unitOfWork.Warehouses.GetManagementSite(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("GetAllWareHouseData/{id}")]
        [Produces(typeof(List<WarehouseViewModel>))]
        public IActionResult GetAllWareHouseData(long id)
        {
            try
            {
                var result = _unitOfWork.Warehouses.GetAllWareHouseData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("GetMangementWarehouse/{id}")]
        [Produces(typeof(List<ManagementWarehouseViewModel>))]
        public IActionResult GetMangementWarehouse(long id)
        {
            var result = _unitOfWork.managementWarehouse.GetAllManagementWarehouseData(id); //GetAllSite Information
            return Ok(result);
        }

        [HttpGet("GetAddress/{id}")]
        [Produces(typeof(List<AuditAddressViewModel>))]
        public IActionResult GetAddress(long id)
        {
            //var result = _unitOfWork.Warehouses.GetAllWarehouseData(); //.GetAllCustomersData();


            try
            {
                var result = _unitOfWork.Warehouses.GetAllAddressData(id);

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
            var result = _unitOfWork.AuditHistory.GetAllHistory("Warehouse", id); //.GetAllCustomersData();


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

        [HttpPost("managementWarehousePost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateManagementWarehouseAction([FromBody] ManagementWarehouseViewModel managementWarehouseViewModel)
        {
            if (ModelState.IsValid)
            {
                if (managementWarehouseViewModel == null)
                    return BadRequest($"{nameof(managementWarehouseViewModel)} cannot be null");

                DAL.Models.ManagementWarehouse managementwarehouseobject = new DAL.Models.ManagementWarehouse();
                managementWarehouseViewModel.MasterCompanyId = 1;
                // managementsiteobject.ManagementSiteId = managementSiteViewModel.ManagementSiteId;
                managementwarehouseobject.WarehouseId = managementWarehouseViewModel.WarehouseId;
                managementwarehouseobject.ManagementStructureId = managementWarehouseViewModel.ManagementStructureId;
                managementwarehouseobject.MasterCompanyId = managementWarehouseViewModel.MasterCompanyId;
                managementwarehouseobject.IsActive = managementWarehouseViewModel.IsActive;
                managementwarehouseobject.CreatedDate = DateTime.Now;
                managementwarehouseobject.UpdatedDate = DateTime.Now;
                managementwarehouseobject.IsDelete = false;//Externally we are dong for create
                managementwarehouseobject.CreatedBy = managementWarehouseViewModel.CreatedBy;
                managementwarehouseobject.UpdatedBy = managementWarehouseViewModel.UpdatedBy;
                _unitOfWork.managementWarehouse.Add(managementwarehouseobject);
                _unitOfWork.SaveChanges();
                return Ok(managementwarehouseobject);

            }

            return Ok(ModelState);
        }

        [HttpPost("wareHousePost")]
        public IActionResult CreateAction([FromBody] WarehouseViewModel warehouseViewModel, Address address)
        {
            if (ModelState.IsValid)
            {
                if (warehouseViewModel == null)
                    return BadRequest($"{nameof(warehouseViewModel)} cannot be null");

                DAL.Models.Warehouse warehouseobject = new DAL.Models.Warehouse();
                warehouseViewModel.MasterCompanyId = 1;
                warehouseobject.WarehouseId = warehouseViewModel.WarehouseId;
                warehouseobject.Name = warehouseViewModel.Name;
                warehouseobject.SiteId = warehouseViewModel.SiteId;
                warehouseobject.Memo = warehouseViewModel.Memo;
                warehouseobject.MasterCompanyId = warehouseViewModel.MasterCompanyId;
                warehouseobject.IsActive = warehouseViewModel.IsActive;
                warehouseobject.CreatedDate = DateTime.Now;
                warehouseobject.UpdatedDate = DateTime.Now;
                warehouseobject.CreatedBy = warehouseViewModel.CreatedBy;
                warehouseobject.UpdatedBy = warehouseViewModel.UpdatedBy;
                _unitOfWork.Warehouses.Add(warehouseobject);
                _unitOfWork.SaveChanges();
                return Ok(warehouseobject);
            }
            return Ok(ModelState);
        }

       



        [HttpPut("wareHousePost/{id}")] //edit
        public IActionResult UpdateAction(long id, [FromBody] WarehouseViewModel warehouseViewModel)
        {

            if (ModelState.IsValid)
            {
                if (warehouseViewModel == null)
                    return BadRequest($"{nameof(warehouseViewModel)} cannot be null");

                var existingResult = _unitOfWork.Warehouses.GetSingleOrDefault(c => c.WarehouseId == id);
                //var address = _unitOfWork.Address.GetSingleOrDefault(c => c.AddressId == existingResult.AddressId);
                //
                warehouseViewModel.MasterCompanyId = 1;
                existingResult.WarehouseId = warehouseViewModel.WarehouseId;
                existingResult.Name = warehouseViewModel.Name;
                existingResult.SiteId = warehouseViewModel.SiteId;
                existingResult.MasterCompanyId = warehouseViewModel.MasterCompanyId;
                existingResult.Memo = warehouseViewModel.Memo;
                existingResult.IsActive = warehouseViewModel.IsActive;
                existingResult.CreatedDate = DateTime.Now;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.CreatedBy = warehouseViewModel.CreatedBy;
                existingResult.UpdatedBy = warehouseViewModel.UpdatedBy;

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
                _unitOfWork.Warehouses.Update(existingResult);
                _unitOfWork.SaveChanges();
                return Ok(existingResult);
            }

            return Ok(ModelState);
        }


        [HttpDelete("wareHousePost/{id}")]
        [Produces(typeof(WarehouseViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Warehouses.GetSingleOrDefault(c => c.WarehouseId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Warehouses.Update(existingResult);
            //_unitOfWork.ATAMains.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpDelete("managementWarehousePost/{id}")]
        [Produces(typeof(ManagementWarehouseViewModel))]
        public IActionResult DeleteManagementAction(long id)
        {
            var existingResult = _context.ManagementWarehouse.Where(c => c.WarehouseId == id).ToList();
            //in this we are removing complete Management Site Data based on SiteId after that we will call update method to add Data 
            for (var i = 0; i < existingResult.Count; i++)
            {
                _unitOfWork.managementWarehouse.Remove(existingResult[i]);
                _unitOfWork.SaveChanges();
            }
            //existingResult.IsDelete = true;
            //_unitOfWork.managementSite.Update(existingResult);


            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<WarehouseAudit>()
                .Find(x => x.WarehouseId == id)
                .OrderByDescending(x => x.WarehouseAuditId);

            var auditResult = new List<AuditResult<WarehouseAudit>>();

            auditResult.Add(new AuditResult<WarehouseAudit> { AreaName = "Warehouse ", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpPost("bulkupload")]
        public IActionResult BulkUpload()
        {
            var result = _unitOfWork.Warehouses.BulkUpload(Request.Form.Files[0]);

            return Ok(result);
        }
    }

}