using AutoMapper;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class PercentageController: Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
 

        public PercentageController(IUnitOfWork unitOfWork, ILogger<PercentageController> logger )
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
           
        }
        [HttpGet("Get")]
        [Produces(typeof(List<PercentageViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.PercentageRepository.GetPercentages();
            var resul1 = Mapper.Map<IEnumerable<PercentageViewModel>>(result);
            return Ok(resul1);
           
        }

    }
}
