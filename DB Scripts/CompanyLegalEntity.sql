USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CompanyLegalEntity]    Script Date: 9/17/2019 5:21:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CompanyLegalEntity](
	[CompanyLegalEntityId] [bigint] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](100) NULL,
	[Name] [varchar](100) NULL,
	[Description] [varchar](200) NULL,
	[Alias] [varchar](100) NULL,
	[ParentLegalEntityId] [bigint] NULL,
	[DoingBusinessAs] [varchar](50) NULL,
	[AddressId] [bigint] NULL,
	[FunctionalCurrencyId] [int] NULL,
	[ReportingCurrencyId] [int] NULL,
	[IsBalancingEntity] [bit] NULL,
	[CageCode] [varchar](50) NULL,
	[FAALicense] [varchar](50) NULL,
	[TaxId] [varchar](30) NULL,
	[IsLastLevel] [bit] NULL,
	[LockBoxAddressId] [bigint] NULL,
	[DomesticWirePaymentId] [bigint] NULL,
	[InternationalWirePaymentId] [bigint] NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [nchar](10) NULL,
 CONSTRAINT [PK_CompanyLegalEntity] PRIMARY KEY CLUSTERED 
(
	[CompanyLegalEntityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CompanyLegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_CompanyLegalEntity_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO

ALTER TABLE [dbo].[CompanyLegalEntity] CHECK CONSTRAINT [FK_CompanyLegalEntity_Address]
GO

ALTER TABLE [dbo].[CompanyLegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_CompanyLegalEntity_DomesticWirePayment] FOREIGN KEY([DomesticWirePaymentId])
REFERENCES [dbo].[DomesticWirePayment] ([DomesticWirePaymentId])
GO

ALTER TABLE [dbo].[CompanyLegalEntity] CHECK CONSTRAINT [FK_CompanyLegalEntity_DomesticWirePayment]
GO

ALTER TABLE [dbo].[CompanyLegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_CompanyLegalEntity_FunctionalCurrency] FOREIGN KEY([FunctionalCurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[CompanyLegalEntity] CHECK CONSTRAINT [FK_CompanyLegalEntity_FunctionalCurrency]
GO

ALTER TABLE [dbo].[CompanyLegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_CompanyLegalEntity_InternationalWirePayment] FOREIGN KEY([InternationalWirePaymentId])
REFERENCES [dbo].[InternationalWirePayment] ([InternationalWirePaymentId])
GO

ALTER TABLE [dbo].[CompanyLegalEntity] CHECK CONSTRAINT [FK_CompanyLegalEntity_InternationalWirePayment]
GO

ALTER TABLE [dbo].[CompanyLegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_CompanyLegalEntity_LockboxAddress] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO

ALTER TABLE [dbo].[CompanyLegalEntity] CHECK CONSTRAINT [FK_CompanyLegalEntity_LockboxAddress]
GO

ALTER TABLE [dbo].[CompanyLegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_CompanyLegalEntity_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[CompanyLegalEntity] CHECK CONSTRAINT [FK_CompanyLegalEntity_MasterCompany]
GO

ALTER TABLE [dbo].[CompanyLegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_CompanyLegalEntity_ParentCompanyLegalEntity] FOREIGN KEY([ParentLegalEntityId])
REFERENCES [dbo].[CompanyLegalEntity] ([CompanyLegalEntityId])
GO

ALTER TABLE [dbo].[CompanyLegalEntity] CHECK CONSTRAINT [FK_CompanyLegalEntity_ParentCompanyLegalEntity]
GO

ALTER TABLE [dbo].[CompanyLegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_CompanyLegalEntity_ReportingCurrency] FOREIGN KEY([ReportingCurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[CompanyLegalEntity] CHECK CONSTRAINT [FK_CompanyLegalEntity_ReportingCurrency]
GO

