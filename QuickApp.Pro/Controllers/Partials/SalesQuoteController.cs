using QuickApp.Pro.ViewModels;
using System.Linq;
using QuickApp.Pro.ViewModels.SalesViews;

namespace QuickApp.Pro.Controllers
{
    public partial class SalesQuoteController
    {
        private SalesQuoteViewModel BindDefaultDataSources(SalesQuoteViewModel model)
        {
            var customer = this.UnitOfWork.Customer.Get(model.CustomerId);
            var priorities = this.UnitOfWork.Priority.GetAll();
            var quoteTypes = this.UnitOfWork.MasterSalesOrderQuoteTypesRepository.GetAll();
            var customerTypes = this.UnitOfWork.customerType.GetAll();
            var creditTerms = this.UnitOfWork.MasterSalesCreditTermsRepository.GetAll();
            var salesProbabilities = this.UnitOfWork.MasterSalesProbablityRepository.GetAll();
            var leadSources = this.UnitOfWork.MasterSalesLeadSourcesRepository.GetAll(); 
            
            if (customer != null)
            {
                model.CustomerId = customer.CustomerId;
                model.CustomerName = customer.Name;
                model.CustomerCode = customer.CustomerCode;
                //if (customer.CustomerContact != null) {
                //    var contact = UnitOfWork.ContactRepository.Get(customer.CustomerContact.ContactId);
                //    model.CustomerContactId = contact.ContactId;
                //    model.CustomerContactName = contact.FirstName;
                //}
            }

            if (quoteTypes.Any())
            {
                model.SalesQuoteTypes = quoteTypes.Select(type => new MasterSalesQuoteTypesViewModel
                {
                    Id = type.Id,
                    Name = type.Name
                });
            }

            if (priorities.Any())
            {
                model.Priorities = priorities.Where(p => p.IsDeleted == false).Select(p => new PriorityViewModel
                {
                    PriorityId = p.PriorityId,
                    Description = p.Description
                }).OrderBy(p => p.Description);
            }

            if (customerTypes.Any())
            {
                model.CustomerTypes = customerTypes.Select(ct => new CustomerTypeViewModel
                {
                    Id = ct.CustomerTypeId,
                    Name = ct.Description
                }).OrderBy(ct => ct.Name);
            }

            if (creditTerms.Any())
            {
                model.CreditTerms = creditTerms.Select(ct => new MasterSalesCreditTermsViewModel
                {
                    Id = ct.Id,
                    Name = ct.Name
                });
            }

            if (leadSources.Any())
            {
                model.LeadSources = leadSources.Select( ls => new MasterSalesLeadSourcesViewModel
                {
                    Id = ls.Id,
                    Name = ls.Name
                });
            }

            if (salesProbabilities.Any())
            {
                model.SalesProbablity = salesProbabilities.Select(sp => new MasterSalesProbablityViewModel
                {
                    Id = sp.Id,
                    Value = sp.Value.ToString()
                });
            }

            return model;
        }

        private SalesQuoteView BindDefaultDataSources(SalesQuoteView model)
        {
            var customer = this.UnitOfWork.Customer.Get(model.SalesOrderQuote.CustomerId);
            var priorities = this.UnitOfWork.Priority.GetAll();
            var quoteTypes = this.UnitOfWork.MasterSalesOrderQuoteTypesRepository.GetAll();
            var customerTypes = this.UnitOfWork.customerType.GetAll();
            var creditTerms = this.UnitOfWork.MasterSalesCreditTermsRepository.GetAll();
            var salesProbabilities = this.UnitOfWork.MasterSalesProbablityRepository.GetAll();
            var leadSources = this.UnitOfWork.MasterSalesLeadSourcesRepository.GetAll();
            var status = this.UnitOfWork.MasterSalesOrderQuoteStatusRepository.GetAll();

            if (customer != null)
            {
                model.SalesOrderQuote.CustomerName = customer.Name;
                model.SalesOrderQuote.CustomerCode = customer.CustomerCode;
            }

            if (quoteTypes.Any())
            {
                model.SalesQuoteTypes = quoteTypes.Select(type => new MasterSalesQuoteTypesViewModel
                {
                    Id = type.Id,
                    Name = type.Name
                });
            }

            if (priorities.Any())
            {
                model.Priorities = priorities.Where(p => p.IsDeleted == false).Select(p => new PriorityViewModel
                {
                    PriorityId = p.PriorityId,
                    Description = p.Description
                }).OrderBy(p => p.Description);
            }

            if (customerTypes.Any())
            {
                model.CustomerTypes = customerTypes.Select(ct => new CustomerTypeViewModel
                {
                    Id = ct.CustomerTypeId,
                    Name = ct.Description
                }).OrderBy(ct => ct.Name);
            }

            if (creditTerms.Any())
            {
                model.CreditTerms = creditTerms.Select(ct => new MasterSalesCreditTermsViewModel
                {
                    Id = ct.Id,
                    Name = ct.Name
                });
            }

            if (leadSources.Any())
            {
                model.LeadSources = leadSources.Select(ls => new MasterSalesLeadSourcesViewModel
                {
                    Id = ls.Id,
                    Name = ls.Name
                });
            }

            if (salesProbabilities.Any())
            {
                model.SalesProbablity = salesProbabilities.Select(sp => new MasterSalesProbablityViewModel
                {
                    Id = sp.Id,
                    Value = sp.Value.ToString()
                });
            }

            if (status.Any())
            {
                model.Status = status.Select(s => new MasterSalesOrderQuoteStatusView
                {
                    Id = s.Id, 
                    Name = s.Name,  
                    DisplayInDropdown = s.DisplayInDropdown,  
                    Description = s.Description
                });
            }
            return model;
        }
    }
}
