using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployeeTrainingTypeRepository : IRepository<EmployeeTrainingType>
    {
        IEnumerable<EmployeeTrainingType> GetAllEmployeeTrainingType();


        //  void CreateAction(DAL.Models.Action action);

    }
}