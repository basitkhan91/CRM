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
        public IActionResult getAllGLAccountNode()
        {
            var glAccountNodes = unitOfWork.GLAccountNode.GetAllGLAccount();

            foreach (var node in glAccountNodes)
            {
                if (node.ParentNode != null)
                {
                    node.ParentNode.ParentNode = null;

                }
            }

            return Ok(glAccountNodes);
        }
        [HttpGet("getAllLeafNode")]
        public IActionResult getAllGLAccountLeafNode()
        {
            var glAccountNodes = unitOfWork.GLAccountNode.GetAllGLAccountLeafNode();

            foreach (var node in glAccountNodes)
            {
                if (node.ParentNode != null)
                {
                    node.ParentNode.ParentNode = null;

                }
            }

            return Ok(glAccountNodes);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getNodeById(long id)
        {
            var node = unitOfWork.Repository<GLAccountNode>().Find(x => x.GLAccountNodeId == id && x.IsDelete != true);
            return Ok(node);
        }


        [HttpGet("shareWithOtherEntityById/{id}")]
        [Produces(typeof(List<GLAccountNodeShareWithEntityMapper>))]
        public IActionResult getShareWithEntityNodeById(long id)
        {
            var node = unitOfWork.GLAccountClass.getShareWithEntityNodeById(id);
            return Ok(node);

        }

        [HttpPost("add")]
        public IActionResult addNode([FromBody]GLAccountNode node)
        {
            if (node != null)
            {
                if (ModelState.IsValid)
                {
                    node.MasterCompanyId = 1;
                    node.CreatedDate = DateTime.Now;
                    node.UpdatedDate = DateTime.Now;
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

        [HttpPost("addEntityMapper")]
        public IActionResult addEntityMapper([FromBody]GLAccountNodeShareWithEntityMapper node)
        {
            if (node != null)
            {
                if (ModelState.IsValid)
                {
                    node.CreatedDate = DateTime.Now;
                    node.UpdatedDate = DateTime.Now;
                    node.MasterCompanyId = 1;
                    unitOfWork.Repository<GLAccountNodeShareWithEntityMapper>().Add(node);
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
                    node.UpdatedDate = DateTime.Now;
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
            var node = unitOfWork.Repository<GLAccountNode>().Find(x => x.GLAccountNodeId == id).FirstOrDefault();
            if (node != null)
            {
                node.IsDelete = true;
                unitOfWork.Repository<GLAccountNode>().Update(node);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        //[HttpGet("updateIsActive/{glAccountNodeId)}")]
        //public ActionResult updateIsActive(long glAccountNodeId)
        //{
        //    var glAccountNode = unitOfWork.Repository<GLAccountNode>().getById(glAccountNodeId);
        //    glAccountNode.IsActive = !glAccountNode.IsActive;
        //    unitOfWork.Repository<GLAccountNode>().Update(glAccountNode);
        //    return Ok(glAccountNode);
        //}

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}
