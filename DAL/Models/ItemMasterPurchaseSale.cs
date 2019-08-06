﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{

    public partial class ItemMasterPurchaseSale
    {

        [Key]
        public long ItemMasterPurchaseSaleId { get; set; }
        [ForeignKey("ItemMasterId")]
        public long ItemMasterId { get; set; }
        public string PartNumber { get; set; }
        public string Condition { get; set; }
        [ForeignKey("PP_UOMId")]
        public long PP_UOMId { get; set; }
        [ForeignKey("PP_CurrencyId")]
        public int PP_CurrencyId { get; set; }
        public decimal PP_FXRatePerc { get; set; }
        public decimal PP_VendorListPrice { get; set; }
        public DateTime PP_LastListPriceDate { get; set; }
        public decimal PP_PurchaseDiscPerc { get; set; }
        public decimal PP_PurchaseDiscAmount { get; set; }
        public DateTime PP_LastPurchaseDiscDate { get; set; }
        public decimal PP_UnitPurchasePrice { get; set; }
        [ForeignKey("SP_FSP_UOMId")]
        public long SP_FSP_UOMId { get; set; }
        [ForeignKey("SP_FSP_CurrencyId")]
        public int SP_FSP_CurrencyId { get; set; }
        public decimal SP_FSP_FXRatePerc { get; set; }
        public decimal SP_FSP_FlatPriceAmount { get; set; }
        public DateTime SP_FSP_LastFlatPriceDate { get; set; }
        public decimal SP_CalSPByPP_MarkUpPercOnListPrice { get; set; }
        public decimal SP_CalSPByPP_MarkUpAmount { get; set; }
        public DateTime SP_CalSPByPP_LastMarkUpDate { get; set; }
        public decimal SP_CalSPByPP_BaseSalePrice { get; set; }
        public decimal SP_CalSPByPP_SaleDiscPerc { get; set; }
        public decimal SP_CalSPByPP_SaleDiscAmount { get; set; }
        public DateTime SP_CalSPByPP_LastSalesDiscDate { get; set; }
        public decimal SP_CalSPByPP_UnitSalePrice { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }

    }
}
