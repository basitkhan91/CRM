﻿using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories
{
   public interface ICustomerContactRepository : IRepository<CustomerContact>
    {
        IEnumerable<CustomerContact> GetCustomerContact();


        //  void CreateAction(DAL.Models.Action action);

    }
}
   