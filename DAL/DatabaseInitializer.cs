// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Core;
using DAL.Core.Interfaces;

namespace DAL
{
    public interface IDatabaseInitializer
    {
        System.Threading.Tasks.Task SeedAsync();
    }




    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly IAccountManager _accountManager;
        private readonly ILogger _logger;

        public DatabaseInitializer(ApplicationDbContext context, IAccountManager accountManager, ILogger<DatabaseInitializer> logger)
        {
            _accountManager = accountManager;
            _context = context;
            _logger = logger;
        }

        public async System.Threading.Tasks.Task SeedAsync()
        {
            await _context.Database.MigrateAsync().ConfigureAwait(false);

            if (!await _context.Users.AnyAsync())
            {
                _logger.LogInformation("Generating inbuilt accounts");

                const string adminRoleName = "administrator";
                const string userRoleName = "user";

                await EnsureRoleAsync(adminRoleName, "Default administrator", ApplicationPermissions.GetAllPermissionValues());
                await EnsureRoleAsync(userRoleName, "Default user", new string[] { });

                await CreateUserAsync("admin", "tempP@ss123", "Inbuilt Administrator", "admin@ebenmonney.com", "+1 (123) 000-0000", new string[] { adminRoleName });
                await CreateUserAsync("user", "tempP@ss123", "Inbuilt Standard User", "user@ebenmonney.com", "+1 (123) 000-0001", new string[] { userRoleName });

                _logger.LogInformation("Inbuilt account generation completed");
            }

            if (!await _context.PublicationTypes.AnyAsync())
            {
                _context.PublicationTypes.Add(new PublicationType { Id = 1, Name = "CMM" });
                _context.PublicationTypes.Add(new PublicationType { Id = 2, Name = "AD" });
                _context.PublicationTypes.Add(new PublicationType { Id = 3, Name = "SB" });
            }

            if (!await _context.PublicationAircraftManufacturers.AnyAsync())
            {
                _context.PublicationAircraftManufacturers.Add(new PublicationAircraftManufacturer { Id = 1, Name = "AirBus" });
                _context.PublicationAircraftManufacturers.Add(new PublicationAircraftManufacturer { Id = 2, Name = "Beoing" });
            }
            if (!await _context.PublicationModels.AnyAsync())
            {

                _context.PublicationModels.Add(new PublicationModel { Id = 1, Name = "Airbus-737" });
                _context.PublicationModels.Add(new PublicationModel { Id = 2, Name = "Airbus-738" });
            }
            if (!await _context.PublicationStatuses.AnyAsync())
            {
                _context.PublicationStatuses.Add(new PublicationStatus { Id = 1, Name = "Active" });
                _context.PublicationStatuses.Add(new PublicationStatus { Id = 2, Name = "InActive" });
            }

            if (!await _context.ExclusionEstimatedOccurances.AnyAsync())
            {
                _context.ExclusionEstimatedOccurances.Add(new ExclusionEstimatedOccurance { Id = 1, Name = "1" });
                _context.ExclusionEstimatedOccurances.Add(new ExclusionEstimatedOccurance { Id = 2, Name = "2" });
                _context.ExclusionEstimatedOccurances.Add(new ExclusionEstimatedOccurance { Id = 3, Name = "3" });
                _context.ExclusionEstimatedOccurances.Add(new ExclusionEstimatedOccurance { Id = 4, Name = "4" });
                _context.ExclusionEstimatedOccurances.Add(new ExclusionEstimatedOccurance { Id = 5, Name = "5" });
                _context.ExclusionEstimatedOccurances.Add(new ExclusionEstimatedOccurance { Id = 6, Name = "6" });
                _context.ExclusionEstimatedOccurances.Add(new ExclusionEstimatedOccurance { Id = 7, Name = "7" });
                _context.ExclusionEstimatedOccurances.Add(new ExclusionEstimatedOccurance { Id = 8, Name = "8" });
                _context.ExclusionEstimatedOccurances.Add(new ExclusionEstimatedOccurance { Id = 9, Name = "9" });
                _context.ExclusionEstimatedOccurances.Add(new ExclusionEstimatedOccurance { Id = 10, Name = "10" });

            }


            if (!await _context.ExpertiseTypes.AnyAsync())
            {
                _context.ExpertiseTypes.Add(new ExpertiseType { Id = 2, Name = "Engineer" });
                _context.ExpertiseTypes.Add(new ExpertiseType { Id = 3, Name = "Inspector" });
                _context.ExpertiseTypes.Add(new ExpertiseType { Id = 4, Name = "Mechanic" });
                _context.ExpertiseTypes.Add(new ExpertiseType { Id = 5, Name = "Quality" });
                _context.ExpertiseTypes.Add(new ExpertiseType { Id = 6, Name = "Receiver" });
                _context.ExpertiseTypes.Add(new ExpertiseType { Id = 7, Name = "Technician" });
                // _context.ExpertiseType.Add(new MaterialCondition { Id = 8, Name = "Technician" });
            }

            if (!await _context.MaterialConditions.AnyAsync())
            {
                _context.MaterialConditions.Add(new MaterialCondition { Id = 1, Name = "AR" });
                _context.MaterialConditions.Add(new MaterialCondition { Id = 2, Name = "AR - IS" });
                _context.MaterialConditions.Add(new MaterialCondition { Id = 3, Name = "NEW" });
                _context.MaterialConditions.Add(new MaterialCondition { Id = 4, Name = "OVH" });
                _context.MaterialConditions.Add(new MaterialCondition { Id = 5, Name = "REP" });
                _context.MaterialConditions.Add(new MaterialCondition { Id = 6, Name = "SRV" });
            }

            if (!await _context.MaterialMandatories.AnyAsync())
            {
                _context.MaterialMandatories.Add(new MaterialMandatory { Id = 1, Name = "Mandator" });
                _context.MaterialMandatories.Add(new MaterialMandatory { Id = 2, Name = "Supplemental" });
            }

            if (!await _context.MaterialUOMs.AnyAsync())
            {
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 1, Name = "Ctr" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 2, Name = "Ea" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 3, Name = "Ft" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 4, Name = "g" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 5, Name = "Gal" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 6, Name = "inch" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 7, Name = "kg" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 8, Name = "lbs" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 9, Name = "Ltr" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 10, Name = "Mtr" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 11, Name = "Oz" });
                _context.MaterialUOMs.Add(new MaterialUOM { Id = 12, Name = "Yd" });
            }

            if (!await _context.ChargesCurrencies.AnyAsync())
            {
                _context.ChargesCurrencies.Add(new ChargesCurrency { Id = 1, Name = "inr", });// Symbol = "₹" };
                _context.ChargesCurrencies.Add(new ChargesCurrency { Id = 2, Name = "usd", });// Symbol = "$" }; 
                _context.ChargesCurrencies.Add(new ChargesCurrency { Id = 3, Name = "pound", });// };//Symbol = "£" }; 
                _context.ChargesCurrencies.Add(new ChargesCurrency { Id = 4, Name = "euro", });//Symbol = "€" }; 
                _context.ChargesCurrencies.Add(new ChargesCurrency { Id = 5, Name = "usd", });// Symbol = "¥" }  

            }

            if (!await _context.ChargesTypes.AnyAsync())
            {
                _context.ChargesTypes.Add(new ChargesType { Id = 1, Name = "AOG Fee" });
                _context.ChargesTypes.Add(new ChargesType { Id = 2, Name = "Out of Scope" });
                _context.ChargesTypes.Add(new ChargesType { Id = 3, Name = "Rework" });
            }

            if (!await _context.EquipmentAssetTypes.AnyAsync())
            {
                _context.EquipmentAssetTypes.Add(new EquipmentAssetType { Id = 1, Name = "Automobile" });
                _context.EquipmentAssetTypes.Add(new EquipmentAssetType { Id = 2, Name = "Furniture & Fixturese" });
                _context.EquipmentAssetTypes.Add(new EquipmentAssetType { Id = 3, Name = "Equipment" });
                _context.EquipmentAssetTypes.Add(new EquipmentAssetType { Id = 4, Name = "Tools" });
                _context.EquipmentAssetTypes.Add(new EquipmentAssetType { Id = 5, Name = "IT Equipment" });
                _context.EquipmentAssetTypes.Add(new EquipmentAssetType { Id = 6, Name = "Building" });
                _context.EquipmentAssetTypes.Add(new EquipmentAssetType { Id = 7, Name = "Land" });
                _context.EquipmentAssetTypes.Add(new EquipmentAssetType { Id = 8, Name = "Leasehold Improvements" });
                _context.EquipmentAssetTypes.Add(new EquipmentAssetType { Id = 9, Name = "Manuals" });
                _context.EquipmentAssetTypes.Add(new EquipmentAssetType { Id = 10, Name = "CIP" });

            }

            //modelBuilder.Entity<ActionAttribute>().HasData(
            //    new ActionAttribute{Id=1,Name="Charges"},
            //    new ActionAttribute{Id=2,Name="Directions"},
            //    new ActionAttribute{Id=3,Name="Equipment"},
            //    new ActionAttribute{Id=4,Name="Exclusions"},
            //    new ActionAttribute{Id=5,Name="Expertise"},
            //    new ActionAttribute{Id=6,Name="Material List"},
            //    new ActionAttribute{Id=7,Name="Measurements"},
            //    new ActionAttribute{Id=8,Name="Publication"}
            //);

            //modelBuilder.Entity<Action>().HasData(
            //   new Action { Id = 1, Name = "Test" }
            //);






            if (!await _context.Customer.AnyAsync() && !await _context.ProductCategories.AnyAsync())
            {
                _logger.LogInformation("Seeding initial data");

                Customer cust_1 = new Customer
                {
                    Name = "Ebenezer Monney",
                    //Email = "contact@ebenmonney.com",
                    //Gender = Gender.Male,
                    //DateCreated = DateTime.UtcNow,
                    //DateModified = DateTime.UtcNow
                };

                Customer cust_2 = new Customer
                {
                    Name = "Itachi Uchiha",
                    //Email = "uchiha@narutoverse.com",
                    //PhoneNumber = "+81123456789",
                    //Address = "Some fictional Address, Street 123, Konoha",
                    //City = "Konoha",
                    //Gender = Gender.Male,
                    //DateCreated = DateTime.UtcNow,
                    //DateModified = DateTime.UtcNow
                };

                Customer cust_3 = new Customer
                {
                    Name = "John Doe",
                    //Email = "johndoe@anonymous.com",
                    //PhoneNumber = "+18585858",
                    //Address = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    //Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet",
                    //City = "Lorem Ipsum",
                    //Gender = Gender.Male,
                    //DateCreated = DateTime.UtcNow,
                    //DateModified = DateTime.UtcNow
                };

                Customer cust_4 = new Customer
                {
                    Name = "Jane Doe",
                    //Email = "Janedoe@anonymous.com",
                    //PhoneNumber = "+18585858",
                    //Address = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    //Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet",
                    //City = "Lorem Ipsum",
                    //Gender = Gender.Male,
                    //DateCreated = DateTime.UtcNow,
                    //DateModified = DateTime.UtcNow
                };



                ProductCategory prodCat_1 = new ProductCategory
                {
                    Name = "None",
                    Description = "Default category. Products that have not been assigned a category",
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };



                Product prod_1 = new Product
                {
                    Name = "BMW M6",
                    Description = "Yet another masterpiece from the world's best car manufacturer",
                    BuyingPrice = 109775,
                    SellingPrice = 114234,
                    UnitsInStock = 12,
                    IsActive = true,
                    ProductCategory = prodCat_1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                Product prod_2 = new Product
                {
                    Name = "Nissan Patrol",
                    Description = "A true man's choice",
                    BuyingPrice = 78990,
                    SellingPrice = 86990,
                    UnitsInStock = 4,
                    IsActive = true,
                    ProductCategory = prodCat_1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };



                Order ordr_1 = new Order
                {
                    Discount = 500,
                    Cashier = await _context.Users.FirstAsync(),
                    Customer = cust_1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow,
                    OrderDetails = new List<OrderDetail>()
                    {
                        new OrderDetail() {UnitPrice = prod_1.SellingPrice, Quantity=1, Product = prod_1 },
                        new OrderDetail() {UnitPrice = prod_2.SellingPrice, Quantity=1, Product = prod_2 },
                    }
                };

                Order ordr_2 = new Order
                {
                    Cashier = await _context.Users.FirstAsync(),
                    Customer = cust_2,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow,
                    OrderDetails = new List<OrderDetail>()
                    {
                        new OrderDetail() {UnitPrice = prod_2.SellingPrice, Quantity=1, Product = prod_2 },
                    }
                };


                _context.Customer.Add(cust_1);
                _context.Customer.Add(cust_2);
                _context.Customer.Add(cust_3);
                _context.Customer.Add(cust_4);

                _context.Products.Add(prod_1);
                _context.Products.Add(prod_2);

                _context.Orders.Add(ordr_1);
                _context.Orders.Add(ordr_2);

                await _context.SaveChangesAsync();

                _logger.LogInformation("Seeding initial data completed");
            }
        }



        private async System.Threading.Tasks.Task EnsureRoleAsync(string roleName, string description, string[] claims)
        {
            if ((await _accountManager.GetRoleByNameAsync(roleName)) == null)
            {
                ApplicationRole applicationRole = new ApplicationRole(roleName, description);

                var result = await this._accountManager.CreateRoleAsync(applicationRole, claims);

                if (!result.Item1)
                    throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");
            }
        }

        private async Task<ApplicationUser> CreateUserAsync(string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
        {
            ApplicationUser applicationUser = new ApplicationUser
            {
                UserName = userName,
                FullName = fullName,
                Email = email,
                PhoneNumber = phoneNumber,
                EmailConfirmed = true,
                IsEnabled = true
            };


            var result = await _accountManager.CreateUserAsync(applicationUser, roles, password);

            if (!result.Item1)
                throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");


            return applicationUser;
        }
    }
}
