
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
using DAL.Models.Sales.SalesOrderQuote;


namespace DAL.Repositories
{
    public class SalesOrderQuoteRepository : Repository<SalesOrderQuote>, ISalesOrderQuoteRepository
    {
        private ApplicationDbContext Context => (ApplicationDbContext)_context;

        public SalesOrderQuoteRepository(ApplicationDbContext context) : base(context)
        {
        }

        public SalesOrderQuote Create(SalesOrderQuote quote)
        {
            try
            {
                Context.SalesOrderQuote.Add(quote);
                Context.SaveChanges();
            }
            catch (Exception e)
            {
                throw;
            }
            return quote;
        }

        public IEnumerable<SalesOrderQuote> GetAllSalesQuotes()
        {
            return null;
        }

        /*
        * Don't delete the data which is already saved in the system
        * We may need it for auditing purpose 
        * Just mark IsDeleted column to true ( 1 ) 
        */
        public bool Delete(long id)
        {
            var quote = this.Context.SalesOrderQuote.Where(q => q.SalesOrderQuoteId == id).FirstOrDefault();

            if (quote != null)
            {

                quote.IsDeleted = true;

                this.Context.Update(quote);

                this.Context.SaveChanges();

            }
            return true;
        }

        public SalesOrderQuote UpdateSalesQuote(SalesOrderQuote quote)
        {
            this.Context.Update(quote);
            
            this.Context.SaveChanges();
            
            return quote;
        }

        public SalesOrderQuote Get(long id, bool enableTracking = true)
        {
            return  enableTracking  ? this.Context.SalesOrderQuote.Where(q => q.SalesOrderQuoteId == id).FirstOrDefault() 
                    : this.Context.SalesOrderQuote.AsNoTracking().Where(q => q.SalesOrderQuoteId == id).FirstOrDefault() ;
        }
    }
}
