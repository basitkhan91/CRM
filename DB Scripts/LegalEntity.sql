/****** Object:  Table [dbo].[LegalEntity]    Script Date: 12/22/2019 9:35:38 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[LegalEntity](
	[LegalEntityId] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[Description] [varchar](200) NULL,
	[DoingLegalAs] [varchar](50) NULL,
	[AddressId] [bigint] NULL,
	[PhoneNumber1] [varchar](30) NULL,
	[PhoneNumber2] [varchar](30) NULL,
	[PhoneNumber3] [varchar](30) NULL,
	[FaxNumber] [varchar](30) NULL,
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
	[ACHId] [bigint] NULL,
	[ParentId] [bigint] NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[ManagementStructureId] [bigint] NULL,
	[IsDeleted] [bit] NULL,
	[IsBankingInfo] [bit] NULL,
	[LedgerName] VARCHAR(50) NULL,
 CONSTRAINT [PK_LegalEntity] PRIMARY KEY CLUSTERED 
(
	[LegalEntityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[LegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_LegalEntity_ACH] FOREIGN KEY([ACHId])
REFERENCES [dbo].[ACH] ([ACHId])
GO

ALTER TABLE [dbo].[LegalEntity] CHECK CONSTRAINT [FK_LegalEntity_ACH]
GO

ALTER TABLE [dbo].[LegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_LegalEntity_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO

ALTER TABLE [dbo].[LegalEntity] CHECK CONSTRAINT [FK_LegalEntity_Address]
GO

ALTER TABLE [dbo].[LegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_LegalEntity_FunctionalCurrency] FOREIGN KEY([FunctionalCurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[LegalEntity] CHECK CONSTRAINT [FK_LegalEntity_FunctionalCurrency]
GO

ALTER TABLE [dbo].[LegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_LegalEntity_ManagementStructure] FOREIGN KEY([ManagementStructureId])
REFERENCES [dbo].[ManagementStructure] ([ManagementStructureId])
GO

ALTER TABLE [dbo].[LegalEntity] CHECK CONSTRAINT [FK_LegalEntity_ManagementStructure]
GO

ALTER TABLE [dbo].[LegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_LegalEntity_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[LegalEntity] CHECK CONSTRAINT [FK_LegalEntity_MasterCompany]
GO

ALTER TABLE [dbo].[LegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_LegalEntity_Parent] FOREIGN KEY([ParentId])
REFERENCES [dbo].[LegalEntity] ([LegalEntityId])
GO

ALTER TABLE [dbo].[LegalEntity] CHECK CONSTRAINT [FK_LegalEntity_Parent]
GO

ALTER TABLE [dbo].[LegalEntity]  WITH CHECK ADD  CONSTRAINT [FK_LegalEntity_ReportingCurrency] FOREIGN KEY([ReportingCurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[LegalEntity] CHECK CONSTRAINT [FK_LegalEntity_ReportingCurrency]
GO


