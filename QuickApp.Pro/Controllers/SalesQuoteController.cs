using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace QuickApp.Pro.Controllers
{
    [Produces("application/json")]
    [Route("api/SalesQuote")]
    public partial class SalesQuoteController : Controller
    {
        private IUnitOfWork UnitOfWork { get; set; }
        private ILogger Logger { get; set; }
        private IEmailer Emailer { get; set; }
        private ApplicationDbContext Context { get; set; }

        public SalesQuoteController(IUnitOfWork unitOfWork
            , ILogger<SalesQuoteController> logger
            , IEmailer emailer, ApplicationDbContext context)
        {
            this.UnitOfWork = unitOfWork;
            this.Logger = logger;
            this.Emailer = emailer;
            this.Context = context;

        }
            // GET: api/SalesQuote
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/SalesQuote/5
        [HttpGet("new/{customerId}")]
        public IActionResult New(long customerId)
        {
            var model = new SalesQuoteViewModel
            {
                CustomerId = customerId
            };

            model = BindDefaultDataSources(model);

            return Ok(model);
        }
        
        // POST: api/SalesQuote
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/SalesQuote/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
