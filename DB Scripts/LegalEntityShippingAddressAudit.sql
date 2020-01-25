SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[LegalEntityShippingAddressAudit](
	[AuditLegalEntityShippingAddressId] [bigint] IDENTITY(1,1) NOT NULL,
	[LegalEntityShippingAddressId] [bigint] NOT NULL,
	[LegalEntityId] [bigint] NOT NULL,
	[AddressId] [bigint] NOT NULL,
	[SiteName] [varchar](100) NULL,
	[ExportLicenseNumber] [varchar](30) NULL,
	[Description] [varchar](100) NULL,
	[StartDate] [datetime2](7) NULL,
	[ExpirationDate] [datetime2](7) NULL,
	[Amount] [decimal](18, 2) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
	[IsPrimary] [bit] NOT NULL,
 CONSTRAINT [PK_LegalEntityShippingAddressAudit] PRIMARY KEY CLUSTERED 
(
	[AuditLegalEntityShippingAddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


