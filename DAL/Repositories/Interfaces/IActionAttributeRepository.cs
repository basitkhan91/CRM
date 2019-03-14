
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IActionAttributeRepository : IRepository<DAL.Models.ActionAttribute>
    {
       IEnumerable<DAL.Models.ActionAttribute> GetActionAttributes();

    }


}
