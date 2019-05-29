using DAL;
using Microsoft.AspNetCore.Mvc;


namespace QuickApp.Pro.Controllers
{
    [Route("api/Company")]
    public class CompanyController : Controller
    {
        private IUnitOfWork _unitOfWork;

        private readonly ApplicationDbContext _context;
        public CompanyController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/values

        [HttpGet("Get/{companyId}")]
        public IActionResult Get(int companyId)
        {
            var company = _unitOfWork.company.Get(companyId);
            return Ok(company);
        }

    }
}

   

