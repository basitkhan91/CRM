using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IJobType : IRepository<DAL.Models.JobType>
    {
        IEnumerable<DAL.Models.JobType> GetAllJobTypes();


        //  void CreateAction(DAL.Models.Action action);

    }
}
