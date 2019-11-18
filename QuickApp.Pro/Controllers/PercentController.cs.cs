using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class PercentController : Controller
    {
        #region Private Members

        private IUnitOfWork _unitOfWork;

        #endregion Private Members

        #region Constructor

        public PercentController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("GetAll")]
        public IActionResult GetAllPercent()
        {

            var percentages = _unitOfWork.Repository<Percent>().GetAll().OrderBy(x => x.PercentValue);
            if (percentages == null)
                return NoContent();

            return Ok(percentages);
        }

        #endregion Public Methods
    }
}