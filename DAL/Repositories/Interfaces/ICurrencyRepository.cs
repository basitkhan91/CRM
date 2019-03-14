﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface ICurrencyRepository : IRepository<Currency>
    {
        IEnumerable<Currency> GetAllCurrencyData();
    }
}
