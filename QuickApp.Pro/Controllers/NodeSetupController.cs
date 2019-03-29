using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace QuickApp.Pro.Controllers
{
    [Route("api/NodeSetup")]
    public class NodeSetupController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public NodeSetupController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var nodes = unitOfWork.Repository<GLAccountNode>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.Id);
            return Ok(nodes);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getNodeById(long id)
        {
            var node = unitOfWork.Repository<GLAccountNode>().Find(x => x.Id == id && x.IsDeleted != true);
            return Ok(node);
        }

        [HttpPost("add")]
        public IActionResult addNode([FromBody]GLAccountNode node)
        {
            if (node != null)
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.Repository<GLAccountNode>().Add(node);
                    unitOfWork.SaveChanges();
                    return Ok(node);
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
        public IActionResult updateNode([FromBody]GLAccountNode node)
        {
            if (node != null)
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.Repository<GLAccountNode>().Update(node);
                    unitOfWork.SaveChanges();
                    return Ok(node);
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
        public IActionResult removeAssetById(long id)
        {
            var node = unitOfWork.Repository<GLAccountNode>().Find(x => x.Id == id).FirstOrDefault();
            if (node != null)
            {
                node.IsDeleted = true;
                unitOfWork.Repository<GLAccountNode>().Update(node);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}
