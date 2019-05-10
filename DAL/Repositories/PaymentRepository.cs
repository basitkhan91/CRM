using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class PaymentRepository : Repository<DAL.Models.Task>, IPayment
    {
        public PaymentRepository(ApplicationDbContext context) : base(context)
        { }

        //public IEnumerable<DAL.Models.Task> GetAllPayment()
        //{
        //    return _appContext.Task.Include("MasterCompany").OrderByDescending(c => c.TaskId).ToList();
        //}

        //private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}