using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployeeTraining : IRepository<DAL.Models.EmployeeTraining>
    {
        IEnumerable<EmployeeTraining> GetEmployeeTrainingData();
    }
}
