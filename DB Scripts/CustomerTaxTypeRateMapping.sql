ALTER TABLE [dbo].[CustomerTaxTypeRateMapping] DROP CONSTRAINT [FK_CustomerTaxTypeRateMapping_MasterCompany]
GO

ALTER TABLE [dbo].[CustomerTaxTypeRateMapping] DROP CONSTRAINT [FK_CustomerTaxTypeRateMapping_Customer]
GO

/****** Object:  Table [dbo].[CustomerTaxTypeRateMapping]    Script Date: 10/20/2019 7:39:09 PM ******/
DROP TABLE [dbo].[CustomerTaxTypeRateMapping]
GO

/****** Object:  Table [dbo].[CustomerTaxTypeRateMapping]    Script Date: 10/20/2019 7:39:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CustomerTaxTypeRateMapping](
	[CustomerTaxTypeRateMappingId] [bigint] IDENTITY(1,1) NOT NULL,
	[CustomerId] [bigint] NOT NULL,
	[TaxType] [varchar](256) NOT NULL,
	[TaxRate] [varchar](256) NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_CTTRMapping] PRIMARY KEY CLUSTERED 
(
	[CustomerTaxTypeRateMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [CustomerTaxTypeRateMappingConstrain] UNIQUE NONCLUSTERED 
(
	[CustomerId] ASC,
	[MasterCompanyId] ASC,
	[TaxType] ASC,
	[TaxRate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CustomerTaxTypeRateMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerTaxTypeRateMapping_Customer] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customer] ([CustomerId])
GO

ALTER TABLE [dbo].[CustomerTaxTypeRateMapping] CHECK CONSTRAINT [FK_CustomerTaxTypeRateMapping_Customer]
GO

ALTER TABLE [dbo].[CustomerTaxTypeRateMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerTaxTypeRateMapping_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[CustomerTaxTypeRateMapping] CHECK CONSTRAINT [FK_CustomerTaxTypeRateMapping_MasterCompany]
GO


