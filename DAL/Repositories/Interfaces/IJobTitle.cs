using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IJobTitle : IRepository<DAL.Models.JobTitle>
    {
        IEnumerable<DAL.Models.JobTitle> GetAllJobTitles();


        //  void CreateAction(DAL.Models.Action action);

    }
}
