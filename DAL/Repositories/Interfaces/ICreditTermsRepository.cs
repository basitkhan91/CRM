﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface ICreditTermsRepository : IRepository<CreditTerms>
    {
        IEnumerable<CreditTerms> GetAllCreditTermsData();
        IEnumerable<CreditTermsAudit> GetAuditDetails(long id);
    }
}
