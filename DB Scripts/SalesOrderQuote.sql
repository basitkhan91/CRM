IF EXISTS ( SELECT 1 FROM sys.tables WHERE name = 'SalesOrderQuote' )
BEGIN 
 DROP TABLE [SalesOrderQuote]
END 
/****** Object:  Table [dbo].[SalesOrderQuote]    Script Date: 02-12-2019 01:38:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SalesOrderQuote](
	[SalesOrderQuoteId] [bigint] IDENTITY(1,1) NOT NULL,
	[QuoteTypeId] [int] NOT NULL,
	[OpenDate] [datetime2] NOT NULL,
	[CustomerRequestDate] [datetime2] NOT NULL,
	[PromisedDate] [datetime2] NOT NULL,
	[EstimatedShipDate] [datetime2] NOT NULL,
	[ValidForDays] [int] NOT NULL,
	[QuoteExpireDate] [datetime2] NOT NULL,
	[PriorityId] [bigint] NOT NULL,
	[AccountTypeId] [int] NOT NULL,
	[CustomerId] [bigint] NOT NULL,
	[CustomerContactId] [int] NOT NULL,
	[CustomerReference] [varchar](100) NOT NULL,
	[ContractReference] [varchar](100) NULL,
	[SalesPersonId] [bigint] NULL,
	[AgentName] [varchar](50) NULL,
	[CustomerSeviceRepId] [bigint] NULL,
	[ProbabilityId] [int] NULL,
	[LeadSourceId] [int] NULL,
	[CreditLimit] [numeric](9,2) NULL,
	[CreditTermId] [smallint] NULL,
	[EmployeeId] [bigint] NULL,
	[RestrictPMA] [bit] NULL,
	[RestrictDER] [bit] NULL,
	[QuoteApprovedById] [int] NULL,
	[ApprovedDate] [datetime2] NULL,
	[CurrencyId] [int] NULL,
	[CustomerWarningId] [bigint] NULL,
	[Memo] [varchar](max) NULL,
	[Notes] [varchar](max) NULL,
	[ShipToSiteName] [varchar](100) NULL,
	[ShipToAddress1] [varchar](100) NULL,
	[ShipToAddress2] [varchar](100) NULL,
	[ShipToAddress3] [varchar](100) NULL,
	[ShipToCity] [varchar](50) NULL,
	[ShipToState] [varchar](50) NULL,
	[ShipToPostalCode] [varchar](30) NULL,
	[ShipToCountry] [varchar](50) NULL,
	[ShipToContactId] [bigint] NULL,
	[ShipViaName] [nvarchar](200) NOT NULL,
	[ShipViaShippingAccountInfo] [varchar](256) NOT NULL,
	[ShippingId] [varchar](256),
	[ShippingURL] [varchar](256),
	[ShipViaMemo] [nvarchar](2000) NULL,
	[ShipViaShippingURL] [varchar](256) NOT NULL,
	[BillToSiteName] [varchar](100) NULL,
	[BillToAddress1] [varchar](100) NULL,
	[BillToAddress2] [varchar](100) NULL,
	[BillToAddress3] [varchar](100) NULL,
	[BillToCity] [varchar](50) NULL,
	[BillToState] [varchar](50) NULL,
	[BillToPostalCode] [varchar](30) NULL,
	[BillToCountry] [varchar](50) NULL,
	[BillToContactId] [bigint] NULL,
	[BillToMemo] [nvarchar](2000) NULL,
	[MasterCompanyId] [int] NULL,  
	[CreatedBy] [varchar](256) NOT NULL,  
	[CreatedOn] [datetime2] NOT NULL,  
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedOn] [datetime2] NULL,  
	[IsDeleted] [bit] NOT NULL DEFAULT 0,
	[StatusId] [int] NOT NULL DEFAULT 1

 CONSTRAINT [PK_SalesOrderQuote] PRIMARY KEY CLUSTERED 
(
	[SalesOrderQuoteId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] 
GO


--# Commented for time being will be fixing it in upcoming releases  
-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_QuoteTypeId FOREIGN KEY (QuoteTypeId)
-- REFERENCES [dbo].[MasterSalesOrderQuoteTypes](Id)


-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_PriorityId FOREIGN KEY (PriorityId)
-- REFERENCES [dbo].[Priority](PriorityId)
	
-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_CustomerId FOREIGN KEY (CustomerId)
-- REFERENCES [dbo].[Customer](CustomerId)
	
	
-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_SalesPersonId FOREIGN KEY (SalesPersonId)
-- REFERENCES [dbo].[Employee](EmployeeId)
	
-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_CustomerSeviceRepId FOREIGN KEY (CustomerSeviceRepId)
-- REFERENCES [dbo].[Employee](EmployeeId)

-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_ProbabilityId FOREIGN KEY (ProbabilityId)
-- REFERENCES [dbo].[MasterSalesProbablity](Id)

-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_LeadSourceId FOREIGN KEY (LeadSourceId)
-- REFERENCES [dbo].[MasterSalesLeadSources](Id)
	
-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_CreditTermId FOREIGN KEY (CreditTermId)
-- REFERENCES [dbo].[CreditTerms](CreditTermsId)

-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_EmployeeId FOREIGN KEY (EmployeeId)
-- REFERENCES [dbo].[Employee](EmployeeId)

-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_CurrencyId FOREIGN KEY (CurrencyId)
-- REFERENCES [dbo].[Currency](CurrencyId)

-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_CustomerWarningId FOREIGN KEY (CustomerWarningId)
-- REFERENCES [dbo].[CustomerWarning](CustomerWarningId)

-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_ShipToContactId FOREIGN KEY (ShipToContactId)
-- REFERENCES [dbo].[Employee](EmployeeId)

-- ALTER TABLE [dbo].[SalesOrderQuote]
-- ADD CONSTRAINT FK_SalesOrderQuote_BillToContactId FOREIGN KEY (BillToContactId)
-- REFERENCES [dbo].[Employee](EmployeeId)


