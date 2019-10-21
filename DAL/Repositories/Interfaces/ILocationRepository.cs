﻿using System;
using DAL.Models;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace DAL.Repositories.Interfaces
{
    public interface ILocationRepository : IRepository<Location>, IBulkUpload<Location>
    {
        IEnumerable<object> GetAllLocationData();

        IEnumerable<object> GetAllAddressData(long id);

        IEnumerable<object> GetAllWarehouseData(long id);

        IEnumerable<object> GetManagementWareHouse(long id);
        IEnumerable<object>  GetLocationStockData(long id);
    }
}
