using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class CapabilityTypeController : Controller
    {
        private readonly ApplicationDbContext _context;
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public CapabilityTypeController(IUnitOfWork unitOfWork, ILogger<CapabilityTypeController> logger, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _context = context;
        }

        [HttpGet("Get")]
        public IActionResult Get()
        {
            var allActions = _unitOfWork.capabilityTypeRepository.GetAllCapabilityListData();
            return Ok(allActions);
        }

       

    }
}