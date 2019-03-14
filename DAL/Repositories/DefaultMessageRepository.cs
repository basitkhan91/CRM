using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
namespace DAL.Repositories
{
  public  class DefaultMessageRepository : Repository<DefaultMessage>, IDefaultMessage
    {
        public DefaultMessageRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.DefaultMessage> GetAllDefaultMessageData()
        {
            return _appContext.DefaultMessage.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.DefaultMessageId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
