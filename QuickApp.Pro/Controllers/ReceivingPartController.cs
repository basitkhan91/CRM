using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{

    [Route("api/receivingPart")]
    public class ReceivingPartController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public ReceivingPartController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var assets = unitOfWork.Repository<AssetDepConventionType>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDepConventionTypeId);
            return Ok(assets);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getItemMasterDataById(long id)
        {
            var itemMasterData = unitOfWork.Repository<ItemMaster>().Find(x => x.ItemMasterId == id && x.IsDelete != true);
            return Ok(itemMasterData);
        }

        [HttpPost("add")]
        public IActionResult addAssetDep([FromBody]AssetDepConventionType assetDep)
        {
            if (assetDep != null)
            {
                if (ModelState.IsValid)
                {
                    assetDep.IsActive = true;
                    assetDep.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetDepConventionType>().Add(assetDep);
                    unitOfWork.SaveChanges();
                    return Ok(assetDep);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPost("update")]
        public IActionResult updateAssetDep([FromBody]AssetDepConventionType assetDep)
        {
            if (assetDep != null)
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.Repository<AssetDepConventionType>().Update(assetDep);
                    unitOfWork.SaveChanges();
                    return Ok(assetDep);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeAssetDepById(long id)
        {
            var assetDep = unitOfWork.Repository<AssetDepConventionType>().Find(x => x.AssetDepConventionTypeId == id).FirstOrDefault();
            if (assetDep != null)
            {
                assetDep.IsDelete = true;
                unitOfWork.Repository<AssetDepConventionType>().Update(assetDep);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("addStocklineMapperData")]
        public IActionResult addStocklineMapperData([FromBody]PartStockLineMapper stocklineMapper)
        {
            if (stocklineMapper != null)
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.Repository<PartStockLineMapper>().Add(stocklineMapper);
                    unitOfWork.SaveChanges();
                    return Ok(stocklineMapper);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet("GetReceivingPurchaseList/{receivingId}")]
        [Produces(typeof(List<PurchaseOrderViewModel>))]
        public IActionResult GetReceivingPurchaseOrderListById(long receivingId)
        {
            var receivingData = unitOfWork.PartStockLineMapper.GetReceivingPurchaseOrderList(receivingId);
            return Ok(receivingData);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}