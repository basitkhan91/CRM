
IF EXISTS ( SELECT 1 FROM sys.tables WHERE name = 'SalesOrderQuotePart' )
BEGIN 
 DROP TABLE [SalesOrderQuotePart]
END 
/****** Object:  Table [dbo].[SalesOrderQuotePart]    Script Date: 02-12-2019 01:38:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SalesOrderQuotePart](
	[SalesOrderQuotePartId] [bigint] IDENTITY(1,1) NOT NULL,
	[SalesOrderQuoteId] [bigint] NOT NULL,
	[ItemMasterId] [bigint] NOT NULL,
	[StockLineId] [bigint]  NULL,
	[FxRate] [numeric](9,4) NULL,
	[QtyQuoted] [int] NOT NULL, 
	[UnitSalePrice] [numeric](9,2) NOT NULL,
	[MarkUpPercentage] [int],
	[SalesBeforeDiscount] [numeric](9,2) NOT NULL,  
	[Discount] [int],
	[DiscountAmount] [numeric](9,2),
	[NetSales] [numeric](9,2),
	[MasterCompanyId] [int] NOT NULL,  
	[CreatedBy] [varchar](256) NOT NULL,  
	[CreatedOn] [datetime2] NOT NULL,  
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedOn] [datetime2] NULL,
	[IsDeleted] [bit] NOT NULL DEFAULT 0

 CONSTRAINT [PK_SalesOrderQuotePart] PRIMARY KEY CLUSTERED 
(
	[SalesOrderQuotePartId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


ALTER TABLE [dbo].[SalesOrderQuotePart]
ADD CONSTRAINT FK_SalesOrderQuote_SalesOrderQuoteId FOREIGN KEY (SalesOrderQuoteId)
REFERENCES [dbo].[SalesOrderQuote](SalesOrderQuoteId)


ALTER TABLE [dbo].[SalesOrderQuotePart]
ADD CONSTRAINT FK_SalesOrderQuote_ItemMasterId FOREIGN KEY (ItemMasterId)
REFERENCES [dbo].[ItemMaster](ItemMasterId)

ALTER TABLE [dbo].[SalesOrderQuotePart]
ADD CONSTRAINT FK_SalesOrderQuote_StockLineId FOREIGN KEY (StockLineId)
REFERENCES [dbo].[StockLine](StockLineId)