using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using DAL;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using Microsoft.AspNetCore.Http;


namespace QuickApp.Pro.Controllers

{


    [Route("api/[controller]")]
    public class PublicationController : Controller
    {
        private IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";
        ApplicationDbContext db;


        public PublicationController(IUnitOfWork unitOfWork, ILogger<PublicationController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        // GET: api/values
        [HttpGet("getpublicationslist")]
        [Produces(typeof(List<PublicationViewModel>))]
        public IActionResult Get(string publicationId="", string description="", int publicationTypeId=0, string publishedBy="", long employeeId=0, string location="", int pageNumber=0, int pageSize=10)
        {
            //var allpublicationinfo = _unitOfWork.Publication.GetPublications(); //.GetAllCustomersData();
            var allpublicationinfo = _unitOfWork.Publication.GetPublicationsList(publicationId, description, publicationTypeId, publishedBy, employeeId, location, pageNumber, pageSize); //.GetAllCustomersData();

            return Ok((allpublicationinfo));

        }

        [HttpGet("GetPublicationById/{id}")]
        [Produces(typeof(List<PublicationViewModel>))]
        public IActionResult GetByID(long id)
        {
            var allpublicationinfo = _unitOfWork.Publication.GetPublicationsById(id); //.GetAllCustomersData();
            return Ok((allpublicationinfo));

        }
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Publication", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }

        }
        [HttpPost("publicationpost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction()
        {

            try
            {
                var updatedBy = HttpContext.Session.GetString("UserId");

                DAL.Models.Publication publicationobject = new DAL.Models.Publication();
                if (ModelState.IsValid)
                {

                    if (Request.Form == null)
                        return BadRequest($"{nameof(publicationobject)} cannot be null");

                    publicationobject.PublicationId = Request.Form["PublicationId"];
                    publicationobject.Description = Request.Form["Description"];
                    publicationobject.MasterCompanyId =Convert.ToInt32(Request.Form["MasterCompanyId"]);
                    publicationobject.IsActive = true;
                    publicationobject.IsDeleted = false;
                    publicationobject.EntryDate = Request.Form["EntryDate"].ToString()==""? DateTime.Now : DateTime.ParseExact(Request.Form["EntryDate"].ToString(), "dd/MM/yyyy", null);
                    publicationobject.RevisionDate = Request.Form["revisionDate"].ToString() == "" ? DateTime.Now : DateTime.ParseExact(Request.Form["revisionDate"].ToString(), "dd/MM/yyyy", null);
                    publicationobject.NextReviewDate = Request.Form["nextreviewDate"].ToString() == "" ? DateTime.Now : DateTime.ParseExact(Request.Form["nextreviewDate"].ToString(), "dd/MM/yyyy", null);
                    publicationobject.ASD = Request.Form["ASD"];
                    publicationobject.Publishby = Request.Form["publishby"];
                    publicationobject.Location = Request.Form["location"];
                    publicationobject.VerifiedBy = Request.Form["verifiedby"];
                    publicationobject.VerifiedDate = Request.Form["verifieddate"].ToString() == "" ? DateTime.Now : DateTime.ParseExact(Request.Form["verifieddate"].ToString(), "dd/MM/yyyy", null);
                    publicationobject.EmployeeId = Convert.ToInt32(Request.Form["EmployeeId"]);
                    publicationobject.CreatedDate = DateTime.Now;
                    publicationobject.UpdatedDate = DateTime.Now;
                    publicationobject.CreatedBy = Request.Form["CreatedBy"];
                    publicationobject.UpdatedBy = Request.Form["UpdatedBy"];
                    publicationobject.PublicationTypeId = Request.Form["PublicationTypeId"].ToString()=="" ? 0 : Convert.ToInt32(Request.Form["PublicationTypeId"].ToString());
                    publicationobject.Sequence = Request.Form["Sequence"];
                    publicationobject.ExpirationDate = Request.Form["ExpirationDate"].ToString() == "" ? DateTime.Now : DateTime.ParseExact(Request.Form["ExpirationDate"].ToString(), "dd/MM/yyyy", null);

                    _unitOfWork.Publication.Add(publicationobject);
                    _unitOfWork.SaveChanges();


                    publicationobject.AttachmentId= _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, publicationobject.PublicationRecordId, Convert.ToInt32(ModuleEnum.Publication), Convert.ToString(ModuleEnum.Publication), publicationobject.UpdatedBy, publicationobject.MasterCompanyId);


                    return Ok(publicationobject);
                }
                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPut("publicationpost")]
        public IActionResult UpdateAction()
        {

            if (ModelState.IsValid)
            {
                DAL.Models.Publication publicationobject = new DAL.Models.Publication();
                if (Request.Form == null)
                    return BadRequest($"{nameof(publicationobject)} cannot be null");
               // var existingResult = _unitOfWork.Publication.GetSingleOrDefault(c => c.PublicationRecordId == Convert.ToInt64(Request.Form["PublicationRecordId"]));

                publicationobject.PublicationRecordId = Convert.ToInt64(Request.Form["PublicationRecordId"]);
                publicationobject.PublicationId = Request.Form["PublicationId"];
                publicationobject.Description = Request.Form["Description"];
                publicationobject.MasterCompanyId = Convert.ToInt32(Request.Form["MasterCompanyId"]);
                publicationobject.IsActive = Convert.ToBoolean(Request.Form["IsActive"]);
                publicationobject.IsDeleted = Convert.ToBoolean(Request.Form["IsDeleted"]); ;
                publicationobject.EntryDate = Request.Form["EntryDate"].ToString() == "" ? DateTime.Now : DateTime.ParseExact(Request.Form["EntryDate"].ToString(), "dd/MM/yyyy", null);
                publicationobject.RevisionDate = Request.Form["revisionDate"].ToString() == "" ? DateTime.Now : DateTime.ParseExact(Request.Form["revisionDate"].ToString(), "dd/MM/yyyy", null);
                publicationobject.NextReviewDate = Request.Form["nextreviewDate"].ToString() == "" ? DateTime.Now : DateTime.ParseExact(Request.Form["nextreviewDate"].ToString(), "dd/MM/yyyy", null);
                publicationobject.ASD = Request.Form["ASD"];
                publicationobject.Publishby = Request.Form["publishby"];
                publicationobject.Location = Request.Form["location"];
                publicationobject.VerifiedBy = Request.Form["verifiedby"];
                publicationobject.VerifiedDate = Request.Form["verifieddate"].ToString() == "" ? DateTime.Now : DateTime.ParseExact(Request.Form["verifieddate"].ToString(), "dd/MM/yyyy", null);
                publicationobject.EmployeeId =Convert.ToInt32(Request.Form["EmployeeId"]);
                publicationobject.CreatedDate = Convert.ToDateTime(Request.Form["CreatedDate"]);
                publicationobject.UpdatedDate = DateTime.Now;
                publicationobject.CreatedBy = Request.Form["CreatedBy"];
                publicationobject.UpdatedBy = Request.Form["UpdatedBy"];
                publicationobject.PublicationTypeId = Request.Form["PublicationTypeId"].ToString() == "" ? 0 : Convert.ToInt32(Request.Form["PublicationTypeId"].ToString());
                publicationobject.Sequence = Request.Form["Sequence"];
                publicationobject.ExpirationDate = Request.Form["ExpirationDate"].ToString() == "" ? DateTime.Now : DateTime.ParseExact(Request.Form["ExpirationDate"].ToString(), "dd/MM/yyyy", null);

                _unitOfWork.Publication.Update(publicationobject);
                _unitOfWork.SaveChanges();

                _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, publicationobject.PublicationRecordId, Convert.ToInt32(ModuleEnum.Publication), Convert.ToString(ModuleEnum.Publication), publicationobject.UpdatedBy, publicationobject.MasterCompanyId);

            }
            return Ok(ModelState);
        }
        [HttpDelete("publicationpost/{id}")]
        [Produces(typeof(PublicationViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Publication.GetSingleOrDefault(c => c.PublicationRecordId == id);

            existingResult.IsDeleted = true;
            _unitOfWork.Publication.Update(existingResult);
            //_unitOfWork.Publication.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<PublicationAudit>()
                .Find(x => x.PublicationRecordId == id)
                .OrderByDescending(x => x.PublicationAuditId);

            var auditResult = new List<AuditResult<PublicationAudit>>();

            auditResult.Add(new AuditResult<PublicationAudit> { AreaName = "Publication", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpPost("PubPNACMappingPost")]
        public IActionResult InsertPNACMapping([FromBody] PublicationPNACMappingModel PnAcMapping)
        {

            if (ModelState.IsValid)
            {
                if (PnAcMapping == null)
                    return BadRequest($"{nameof(PnAcMapping)} cannot be null");

                DAL.Models.PublicationPNACMappingModel pnacbject = new DAL.Models.PublicationPNACMappingModel();
                pnacbject.PublicationId = PnAcMapping.PublicationId;
                pnacbject.PartNumber = PnAcMapping.PartNumber;
                pnacbject.DashNumberId = PnAcMapping.DashNumberId;
                pnacbject.DashNumber = PnAcMapping.DashNumber;
                pnacbject.AircraftTypeId = PnAcMapping.AircraftTypeId;
                pnacbject.AircraftModelId = PnAcMapping.AircraftModelId;
                pnacbject.AircraftModel = PnAcMapping.AircraftModel;
                pnacbject.AircraftType = PnAcMapping.AircraftType;
                pnacbject.MasterCompanyId = PnAcMapping.MasterCompanyId;
                pnacbject.IsActive = PnAcMapping.IsActive;
                pnacbject.IsDeleted = PnAcMapping.IsDeleted;
                pnacbject.CreatedDate = DateTime.Now;
                pnacbject.UpdatedDate = DateTime.Now;
                pnacbject.CreatedBy = PnAcMapping.CreatedBy;
                pnacbject.UpdatedBy = PnAcMapping.UpdatedBy;
                _context.PublicationPNACMappingModel.Add(pnacbject);
                _context.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPost("PubPNATAMappingPost")]
        public IActionResult InsertPNATAMapping([FromBody] PublicationPNATAMappingModel PnAtaMapping)
        {
            if (ModelState.IsValid)
            {
                if (PnAtaMapping == null)
                    return BadRequest($"{nameof(PnAtaMapping)} cannot be null");
                DAL.Models.PublicationPNATAMappingModel pnatabject = new DAL.Models.PublicationPNATAMappingModel();
                pnatabject.PublicationId = PnAtaMapping.PublicationId;
                pnatabject.PartNumber = PnAtaMapping.PartNumber;
                pnatabject.ATAChapterId = PnAtaMapping.ATAChapterId;
                pnatabject.ATAChapterCode = PnAtaMapping.ATAChapterCode;
                pnatabject.ATASubChapterId = PnAtaMapping.ATASubChapterId;
                pnatabject.ATAChapterName = PnAtaMapping.ATAChapterName;
                pnatabject.ATASubChapterDescription = PnAtaMapping.ATASubChapterDescription;

                pnatabject.MasterCompanyId = PnAtaMapping.MasterCompanyId;
                pnatabject.IsActive = PnAtaMapping.IsActive;
                pnatabject.CreatedDate = DateTime.Now;
                pnatabject.UpdatedDate = DateTime.Now;
                pnatabject.CreatedBy = PnAtaMapping.CreatedBy;
                pnatabject.UpdatedBy = PnAtaMapping.UpdatedBy;
                _context.PublicationPNATAMappingModel.Add(pnatabject);
                _context.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpGet("GetPubPNMappedDataByPublicationRecordIds/{PublicationRecordIds}")]
        public IActionResult PubPNMappedDetails(string PublicationRecordIds)
        {

            var result = _unitOfWork.Publication.GetPubPNMappingData(PublicationRecordIds);
            return Ok(result);

        }

        [HttpPost("PNIMMappingPost")]
        public IActionResult CreatePNIMast([FromBody] PublicationItemMasterMapping[] IMPNMapping)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (IMPNMapping == null)
                        return BadRequest($"{nameof(IMPNMapping)} cannot be null");
                    for (int i = 0; i <= IMPNMapping.Length - 1; i++)
                    {
                        PublicationItemMasterMapping cp = new PublicationItemMasterMapping();
                        cp.ItemMasterId = IMPNMapping[i].ItemMasterId;
                        cp.PublicationRecordId = IMPNMapping[i].PublicationRecordId;
                        cp.MasterCompanyId = IMPNMapping[i].MasterCompanyId;
                        cp.CreatedBy = IMPNMapping[i].CreatedBy;
                        cp.UpdatedBy = IMPNMapping[i].UpdatedBy;
                        cp.CreatedDate = DateTime.Now;
                        cp.UpdatedDate = DateTime.Now;
                        cp.IsActive = IMPNMapping[i].IsActive;
                        cp.IsDeleted = IMPNMapping[i].IsDeleted;
                        _context.PublicationItemMasterMapping.Add(cp);
                        _context.SaveChanges();
                    }

                }

                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("getItemAircraftMappedByPublcationID/{PublicationId}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult aircraftMapped(long PublicationId)
        {
            var result = _unitOfWork.Publication.GetAircraftMappingDataById(PublicationId);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getItemATAMappedByPublcationID/{PublicationId}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult ataMapped(long PublicationId)
        {
            var result = _unitOfWork.Publication.GetATAMappingDataById(PublicationId);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getItemAirMappedByPublicationIdMultiTypeID/{PublicationId}/{AircraftTypeId}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult AirMappedMultiTypeId(long PublicationId, string AircraftTypeId)
        {
            var result = _unitOfWork.Publication.GetAircraftMappingDataByMultiTypeId(PublicationId, AircraftTypeId);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getItemAirMappedByPublicationIdMultiModelID/{PublicationId}/{AircraftModelID}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult AirMappedMultiModelId(long PublicationId, string AircraftModelID)
        {
            var result = _unitOfWork.Publication.GetAircraftMappingDataByMultiModelId(PublicationId, AircraftModelID);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getItemAirMappedByPublicationIdMultiDashID/{PublicationId}/{DashNumberId}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult AirMappedMultiDashId(long PublicationId, string DashNumberId)
        {
            var result = _unitOfWork.Publication.GetAircraftMappingDataByMultiDashId(PublicationId, DashNumberId);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        //Publication and AircraftTypeId and AircraftModelId search 
        [HttpGet("getItemAirMappedByPublicationIdMultiTypeIDModelID/{PublicationId}/{AircraftTypeID}/{AircraftModelID}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult AirMappedMultiDashId(long PublicationId, string AircraftTypeID, string AircraftModelID)
        {
            var result = _unitOfWork.Publication.GetAircraftMappingDataByMultiTypeIdModelID(PublicationId, AircraftTypeID, AircraftModelID);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getItemAirMappedByPublicationIdMultiTypeIDModelIDDashID/{PublicationId}/{AircraftTypeID}/{AircraftModelID}/{DashNumberId}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult AirMappedMultiDashId(long PublicationId, string AircraftTypeID, string AircraftModelID, string DashNumberId)
        {
            var result = _unitOfWork.Publication.GetAircraftMappingDataByMultiTypeIdModelIDDashID(PublicationId, AircraftTypeID, AircraftModelID, DashNumberId);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getItemATAMappedByPublicationIdMultiATAIDSubChapterID/{PublicationId}/{ATAChapterID}/{SubATAChapterID}")]
        [Produces(typeof(List<ItemMasterATAMapping>))]
        public IActionResult ATAMappedMultiATASubId(long PublicationId, string ATAChapterID, string SubATAChapterID)
        {
            var result = _unitOfWork.Publication.GetATAMappingDataByMultiATAIdSUBATAID(PublicationId, ATAChapterID, SubATAChapterID);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpGet("getItemATAMappedByPublicationIdMultiChapterID/{PublicationId}/{ATAChapterID}")]
        [Produces(typeof(List<ItemMasterATAMapping>))]
        public IActionResult ATAMappedMultiATAId(long PublicationId, string ATAChapterID)
        {
            var result = _unitOfWork.Publication.GetATAMappingDataByMultiATAId(PublicationId, ATAChapterID);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("getItemATAMappedByPublicationIdMultiSubChapterID/{PublicationId}/{SubChapterID}")]
        [Produces(typeof(List<ItemMasterATAMapping>))]
        public IActionResult ATAMappedMultiSubChapterId(long PublicationId, string SubChapterID)
        {
            var result = _unitOfWork.Publication.GetATAMappingDataByMultiATAId(PublicationId, SubChapterID);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        //Delete
        [HttpPost("deletePublicationItemMasterMapping/{id}")]
        public IActionResult PublicationItemMasterMappingDelete(long id)
        {
            try
            {

                    var existingResult = _context.PublicationItemMasterMapping.Where(c => c.PublicationItemMasterMappingId == id).FirstOrDefault();
                    existingResult.UpdatedDate = DateTime.Now;
                    existingResult.IsDeleted = true;
                    _unitOfWork.Repository<PublicationItemMasterMapping>().Update(existingResult);
                    _unitOfWork.SaveChanges();
     
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok(ModelState);
        }
        [HttpGet("searchGetItemAirMappedByPublicationIdMultiTypeIDModelIDDashID/{PublicationId}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult SearchAirMappedMultiDashId(long PublicationId, string AircraftTypeId, string AircraftModelId, string DashNumberId)
        {
            var result = _unitOfWork.Publication.searchgetAircraftMappingDataByMultiTypeIdModelIDDashID(PublicationId, AircraftTypeId, AircraftModelId, DashNumberId);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet("searchGetItemATAMappedByPublicationIdMultiATAIDSubChapterID/{PublicationId}")]
        [Produces(typeof(List<ItemMasterAircraftMapping>))]
        public IActionResult SearchATArMappedMultiDashId(long PublicationId, string ATAChapterId, string ATASubChapterID)
        {
            var result = _unitOfWork.Publication.searchGetATAMappingDataByMultiATAIdSUBATAID(PublicationId, ATAChapterId, ATASubChapterID);

            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }


        // GET: api/values
        [HttpGet("publicationsglobalsearch")]
        [Produces(typeof(List<Publication>))]
        public IActionResult PublicationsGlobalSearch(long? ataChapterId, long? ataSubChapterId, long? airCraftId, long? modelId, long? dashNumberId, int pageNumber, int pageSize)
        {
            var allpublicationinfo = _unitOfWork.Publication.PublicationsGlobalSearch(ataChapterId, ataSubChapterId, airCraftId, modelId, dashNumberId, pageNumber, pageSize); 
            return Ok((allpublicationinfo));

        }

        // GET: api/values
        [HttpGet("publicationview/{publicationRecordId}")]
        public IActionResult PublicationView(long publicationRecordId)
        {
            var allpublicationinfo = _unitOfWork.Publication.PublicationView(publicationRecordId);
            return Ok((allpublicationinfo));

        }

        [HttpGet("publicationstatus")]
        public IActionResult PublicationStatus(long publicationRecordId, bool status, string updatedBy)
        {
            _unitOfWork.Publication.PublicationStatus(publicationRecordId,status,updatedBy);
            return Ok();

        }
    }
}