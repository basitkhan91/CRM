SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[LegalEntityBillingAddressAudit](
	[LegalEntityBillingAddressAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[LegalEntityBillingAddressId] [bigint] NOT NULL,
	[LegalEntityId] [bigint] NOT NULL,
	[AddressId] [bigint] NOT NULL,
	[IsPrimary] [bit] NOT NULL,
	[SiteName] [varchar](100) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL DEFAULT(1),
	[IsDeleted] [bit] NOT NULL DEFAULT(0),
 CONSTRAINT [PK_LegalEntityBillingAddressAudit] PRIMARY KEY CLUSTERED 
(
	[LegalEntityBillingAddressAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


