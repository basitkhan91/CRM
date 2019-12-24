using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployeeExpertiseRepository  : IRepository<DAL.Models.EmployeeExpertise>
    {
        IEnumerable<DAL.Models.EmployeeExpertise> getAllEmployeeExpertiseInfo();



        IEnumerable<DAL.Models.EmployeeExpertise> UploadEmployeeExpertiseCustomData(IFormFile file);
    }
}
