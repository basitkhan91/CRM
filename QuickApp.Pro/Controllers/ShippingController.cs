using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/Shipping")]
    public class ShippingController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public ShippingController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getShippingReference")]
        public IActionResult getAllShippingReference()
        {
            var shippingReferences = unitOfWork.Repository<ShippingReference>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.ShippingReferenceId);
            return Ok(shippingReferences);
        }

        [HttpGet("getShippingReference/{id}")]
        public IActionResult getShippingReferenceById(long id)
        {
            var shippingReference = unitOfWork.Repository<ShippingReference>().Find(x => x.ShippingReferenceId == id && x.IsDeleted != true);
            return Ok(shippingReference);
        }

        [HttpGet("getShippingVia")]
        public IActionResult getAllShippingVia()
        {
            var shippingReferences = unitOfWork.Repository<ShippingVia>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.ShippingViaId);
            return Ok(shippingReferences);
        }

        [HttpGet("getShippingVia/{id}")]
        public IActionResult getShippingViaById(long id)
        {
            var shippingReference = unitOfWork.Repository<ShippingVia>().Find(x => x.ShippingViaId == id && x.IsDeleted != true);
            return Ok(shippingReference);
        }

        [HttpGet("getShippingAccount")]
        public IActionResult getAllShippingAccounts()
        {
            var shippingReferences = unitOfWork.Repository<ShippingAccount>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.ShippingAccountId);
            return Ok(shippingReferences);
        }

        [HttpGet("getShippingAccount/{id}")]
        public IActionResult getShippingAccountById(long id)
        {
            var shippingReference = unitOfWork.Repository<ShippingAccount>().Find(x => x.ShippingAccountId == id && x.IsDeleted != true);
            return Ok(shippingReference);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }

    
}