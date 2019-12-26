
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace QuickApp.Pro.Controllers
{

    [Route("api/TagType")]
    public class TagTypeController : Controller
    {
        private IUnitOfWork _unitOfWork;

        public TagTypeController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("Get")]
        public IActionResult Get()
        {
            var allTagTypes = _unitOfWork.Repository<TagType>().Find(x => x.IsDeleted == null || x.IsDeleted == false);
            return Ok(allTagTypes);
        }


        [HttpPost("add")]
        public IActionResult Create([FromBody] TagType tagType)

        {
            if (ModelState.IsValid)
            {
                if (tagType == null)
                    return BadRequest($"{nameof(tagType)} cannot be null");

                _unitOfWork.Repository<TagType>().Add(tagType);
                _unitOfWork.SaveChanges();
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

            return Ok(tagType);
        }

        [HttpPost("update")]
        public IActionResult Update([FromBody] TagType tagType)

        {
            if (ModelState.IsValid)
            {
                if (tagType == null)
                    return BadRequest($"{nameof(tagType)} cannot be null");

                _unitOfWork.Repository<TagType>().Update(tagType);
                _unitOfWork.SaveChanges();
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

            return Ok(tagType);
        }


        [HttpDelete("remove/{id}")]
        public IActionResult Remove(long id)
        {
            var tagTypeToRemove = _unitOfWork.Repository<TagType>().Get(id);

            tagTypeToRemove.IsDeleted = true;
            _unitOfWork.Repository<TagType>().Update(tagTypeToRemove);
            _unitOfWork.SaveChanges();

            return Ok(id);
        }
    }
}
