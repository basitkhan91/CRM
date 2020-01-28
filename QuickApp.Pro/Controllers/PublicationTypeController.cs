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
    [Route("api/[controller]")]
    public class PublicationTypeController : Controller
    {

        private IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        public PublicationTypeController(IUnitOfWork unitOfWork, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        // GET: api/values
        [HttpGet("publicationtypeslist")]
        public IActionResult GetPublicationTypesList()
        {
            var allpublicationinfo = _unitOfWork.PublicationTypeRepository.GetPublicationTypesList();

            return Ok((allpublicationinfo));

        }

        [HttpGet("publicationtypebyid")]
        public IActionResult GetPublicationTypeById(long publicationTypeId)
        {
            var allpublicationinfo = _unitOfWork.PublicationTypeRepository.GetPublicationTypeById(publicationTypeId);
            return Ok((allpublicationinfo));

        }

        [HttpPost("createpublicationtype")]
        public IActionResult CreatePublicationType(PublicationType publicationType)
        {
            if (ModelState.IsValid)
            {
                var result = _unitOfWork.PublicationTypeRepository.CreatePublicationType(publicationType);
                return Ok(result);
            }
            return Ok(ModelState);
        }

        [HttpPost("updatepublicationtype")]
        public IActionResult UpdatePublicationType(PublicationType publicationType)
        {
            if (ModelState.IsValid)
            {
                IDictionary<string, object> keyValuePairs = new Dictionary<string, object>();
                var dbResult =(PublicationType) _unitOfWork.PublicationTypeRepository.GetPublicationTypeById(publicationType.PublicationTypeId);
                dbResult = _unitOfWork.CommonRepository.UpdateEntity(publicationType, dbResult, ref keyValuePairs);
                if (keyValuePairs != null && keyValuePairs.Count > 0)
                {
                    _context.PublicationType.Attach(dbResult);
                    foreach (var item in keyValuePairs)
                    {
                        _context.Entry(dbResult).Property(item.Key).IsModified = true;
                    }

                    dbResult.UpdatedDate = DateTime.Now;
                    dbResult.UpdatedBy = HttpContext.Session.GetString("UserId");

                    _context.Entry(dbResult).Property(x => x.UpdatedDate).IsModified = true;
                    _context.Entry(dbResult).Property(x => x.UpdatedBy).IsModified = true;

                    _context.SaveChanges();
                }
                return Ok(publicationType);
            }
            return Ok(ModelState);
        }

        [HttpGet("deletepublicationtype")]
        public IActionResult DeletePublicationType(long publicationTypeId, string updatedBy)
        {
            _unitOfWork.PublicationTypeRepository.DeletePublicationType(publicationTypeId, updatedBy);
            return Ok();

        }

        [HttpGet("publicationtypestatus")]
        public IActionResult PublicationTypeStatus(long publicationTypeId,bool status, string updatedBy)
        {
            _unitOfWork.PublicationTypeRepository.PublicationTypeStatus(publicationTypeId, status, updatedBy);
            return Ok();

        }

        [HttpGet("publicationtypehistory")]
        public IActionResult PublicationTypeHistory(long publicationTypeId)
        {
           var result= _unitOfWork.PublicationTypeRepository.PublicationTypeHistory(publicationTypeId);
            return Ok(result);

        }

        [HttpPost("uploadpublicationtypecustomdata")]
        public IActionResult UploadCustomData()
        {
            var result = _unitOfWork.PublicationTypeRepository.UploadCustomData(Request.Form.Files[0]);
            return Ok(result);
        }
    }
}