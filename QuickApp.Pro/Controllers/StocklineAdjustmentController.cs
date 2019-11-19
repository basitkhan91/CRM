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
    public class StocklineAdjustmentController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;

        public StocklineAdjustmentController(IUnitOfWork unitOfWork, ILogger<WorkflowActionController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        
        [HttpGet("Get")]
        [Produces(typeof(List<StocklineAdjustmentDateTypeViewModel>))]
        public IActionResult Get()
        {

            try
            {
                var result = _unitOfWork.stocklineAdjustmentRepository.GetAllStockLineAdjustmentDataTypeData();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
