using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{

    [Route("api/[controller]")]
    public class PurchaseOrderController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";
        public PurchaseOrderController(IUnitOfWork unitOfWork, ILogger<PurchaseOrderController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }


        [HttpPost("Get")]
        public IActionResult Get(Filters<PurchaseOrderFilters> poFilters)
        {
            var allpurchaseInfo = _unitOfWork.purchaseOrder.GetPurchaseOrderlist(poFilters); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<PurchaseOrderViewModel>>(allpurchaseInfo));

        }

        [HttpGet("poglobalsearch")]
        public IActionResult PurchaseOrderGlobalSearch(string filterText, int pageNumber=0, int pageSize=10, long vendorId=0)
        {
            var result = _unitOfWork.purchaseOrder.PurchaseOrderGlobalSearch(filterText, pageNumber, pageSize, vendorId); 
            return Ok(result);

        }

        /// <summary>
        /// Method that gets basic info namely id and name only
        /// </summary>
        /// <returns>List with basic info</returns>
        [HttpGet("basic")]
        [Produces(typeof(List<PurchaseOrderBaseViewModel>))]
        public IActionResult GetBasicList()
        {
            var basicPOList = _unitOfWork.purchaseOrder.GetPurchaseOrderListLite();
            var mappedList = Mapper.Map<IEnumerable<PurchaseOrderBaseViewModel>>(basicPOList);
            return Ok(mappedList);
        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("PurchaseOrder", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }

        [HttpPost("createpoapprover")]
        public IActionResult CreatePOApprovers([FromBody] PurchaseOrderApprover poApprover)
        {
            if (ModelState.IsValid)
            {
                poApprover.POApproverId = _unitOfWork.purchaseOrder.CreatePOApprovers(poApprover);
                return Ok(poApprover);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("updatepoapprover")]
        public IActionResult UpdatePOApprovers([FromBody] PurchaseOrderApprover poApprover)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.purchaseOrder.UpdatePOApprovers(poApprover);
                return Ok(poApprover);
            }
            return BadRequest(ModelState);
        }

        [HttpGet("updatepoapproverstatus")]
        public IActionResult UpdatePOApproversStatus(long poApproverListId, int statusId, string updatedBy)
        {
            _unitOfWork.purchaseOrder.UpdatePOApproversStatus(poApproverListId, statusId, updatedBy);
            return Ok();
        }

        [HttpGet("poapproverslist")]
        public IActionResult GetPoApproversList(long purchaseOrderId)
        {
           var result= _unitOfWork.purchaseOrder.GetPoApproversList(purchaseOrderId);
            return Ok(result);
        }

        [HttpPost("createpoaddress")]
        public IActionResult CreatePurchaseOrderAddress([FromBody]PurchaseOrderAddress poAddress)
        {
            if (ModelState.IsValid)
            {
                poAddress.POAddressId = _unitOfWork.purchaseOrder.CreatePurchaseOrderAddress(poAddress);
                return Ok(poAddress);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("updatepoaddress")]
        public IActionResult UpdatePurchaseOrderAddress([FromBody]PurchaseOrderAddress poAddress)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.purchaseOrder.UpdatePurchaseOrderAddress(poAddress);
                return Ok(poAddress);
            }
            return BadRequest(ModelState);
        }

        [HttpGet("getpoaddress")]
        public IActionResult GetPurchaseOrderAddress(long purchaseOrderId, int userType, int addressType)
        {
            var result = _unitOfWork.purchaseOrder.GetPurchaseOrderAddress(purchaseOrderId, userType, addressType);
            return Ok(result);
        }

        [HttpPost("createposhipvia")]
        public IActionResult CreatePurchaseOrderShipvia([FromBody] PurchaseOrderShipVia poShipvia)
        {
            if (ModelState.IsValid)
            {
                poShipvia.POShipViaId = _unitOfWork.purchaseOrder.CreatePurchaseOrderShipvia(poShipvia);
                return Ok(poShipvia);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("updateposhipvia")]
        public IActionResult UpdatePurchaseOrderShipvia([FromBody] PurchaseOrderShipVia poShipvia)
        {
            if (ModelState.IsValid)
            {
                 _unitOfWork.purchaseOrder.UpdatePurchaseOrderShipvia(poShipvia);
                return Ok(poShipvia);
            }
            return BadRequest(ModelState);
        }

        [HttpGet("getposhipvia")]
        public IActionResult GetPurchaseOrderShipvia(long purchaseOrderId, int userType)
        {
            var result = _unitOfWork.purchaseOrder.GetPurchaseOrderShipvia(purchaseOrderId, userType);
            return Ok(result);
        }

        [HttpGet("vendorcapabilities")] 
        public IActionResult GetVendorCapabilities(long vendorId)
        {
            var result = _unitOfWork.purchaseOrder.GetVendorCapabilities(vendorId);
            return Ok(result);
        }

        [HttpGet("pobyid")]
        public IActionResult PurchaseOrderById(long purchaseOrderId)
        {
            var result = _unitOfWork.purchaseOrder.PurchaseOrderById(purchaseOrderId);
            return Ok(result);
        }

        [HttpGet("purchaseorderparts")]
        public IActionResult GetPurchaseOrderParts(long purchaseOrderId, long workOrderPartNoId=0)
        {
            var result = _unitOfWork.purchaseOrder.GetPurchaseOrderParts(purchaseOrderId, workOrderPartNoId);
            return Ok(result);
        }

        [HttpGet("deletepo")]
        public IActionResult DeletePurchaseOrder(long purchaseOrderId, string updatedBy)
        {
            _unitOfWork.purchaseOrder.DeletePurchaseOrder(purchaseOrderId, updatedBy);
            return Ok();
        }

        [HttpGet("postatus")]
        public IActionResult PurchaseOrderStatus(long purchaseOrderId,bool status, string updatedBy)
        {
            _unitOfWork.purchaseOrder.PurchaseOrderStatus(purchaseOrderId, status, updatedBy);
            return Ok();
        }

        [HttpGet("purchaseorderlistbyvendor")]
        public IActionResult GetPurchaseOrderlistByVendor(long vendorId, int pageNo=0, int pageSize=10)
        {
            _unitOfWork.purchaseOrder.GetPurchaseOrderlistByVendor(vendorId, pageNo, pageSize);
            return Ok();
        }

        [HttpGet("pohistory")]
        public IActionResult GetPurchaseOrderHistory(long purchaseOrderId)
        {
            var result=_unitOfWork.purchaseOrder.GetPurchaseOrderHistory(purchaseOrderId);
            return Ok(result);
        }

        [HttpGet("poview")]
        public IActionResult PurchaseOrderView(long purchaseOrderId)
        {
            var result = _unitOfWork.purchaseOrder.PurchaseOrderView(purchaseOrderId);
            return Ok(result);
        }

        [HttpGet("popartsview")]
        public IActionResult GetPurchaseOrderPartsView(long purchaseOrderId)
        {
            var result = _unitOfWork.purchaseOrder.GetPurchaseOrderPartsView(purchaseOrderId);
            return Ok(result);
        }




    }

}