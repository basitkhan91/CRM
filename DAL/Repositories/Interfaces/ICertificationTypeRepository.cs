using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{
     public interface ICertificationTypeRepository : IRepository<DAL.Models.CertificationType>
    {
        IEnumerable<DAL.Models.CertificationType> GetAllCertificationTypeData();

    }
}

