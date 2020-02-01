SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[LegalEntityAudit](
	[LegalEntityAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[LegalEntityId] [bigint] NOT NULL,
	[Name] [varchar](100) NULL,
	[Description] [varchar](200) NULL,
	[DoingLegalAs] [varchar](50) NULL,
	[AddressId] [bigint] NULL,
	[PhoneNumber1] [varchar](30) NULL,
	[FaxNumber] [varchar](30) NULL,
	[FunctionalCurrencyId] [int] NULL,
	[ReportingCurrencyId] [int] NULL,
	[IsBalancingEntity] [bit] NULL,
	[CageCode] [varchar](50) NULL,
	[FAALicense] [varchar](50) NULL,
	[TaxId] [varchar](30) NULL,
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
	[LedgerName] [varchar](50) NULL,
 CONSTRAINT [PK_LegalEntityAudit] PRIMARY KEY CLUSTERED 
(
	[LegalEntityAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO