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

        [HttpGet("getNodeAuditById/{id}")]
        public IActionResult getNodeAuditById(long id)
        {
            var node = unitOfWork.Repository<GLAccountNodeAudit>().Find(x => x.GLAccountNodeId == id);
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
                    GLAccountNode node1 = new GLAccountNode();

                    node1.CreatedDate = DateTime.Now;
                    node1.UpdatedDate = DateTime.Now;
                    node1.CreatedBy = node.CreatedBy;
                    node1.Description = node.Description;
                    node1.FSType = node.FSType;
                    node1.GLAccountNodeType = node.GLAccountNodeType;
                    node1.IsActive = node.IsActive;
                    node1.IsDelete = node.IsDelete;
                    node1.LeafNodeCheck = node.LeafNodeCheck;
                    node1.LedgerName = node.LedgerName;
                    node1.LedgerNameMgmStructureId = node.LedgerNameMgmStructureId;
                    node1.MasterCompanyId = node.MasterCompanyId;
                    node1.NodeCode = node.NodeCode;
                    node1.NodeName = node.NodeName;
                    node1.ParentNode = node.ParentNode;
                    node1.ParentNodeId = node.ParentNodeId;
                    node1.UpdatedBy = node.UpdatedBy;
                    unitOfWork.Repository<GLAccountNode>().Add(node1);
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
