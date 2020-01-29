SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[LegalEntityInternationalShippingAudit](
	[LegalEntityInternationalShippingAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[InternationalShippingId] [bigint] NOT NULL,
	[LegalEntityId] [bigint] NOT NULL,
	[ExportLicense] [varchar](200) NULL,
	[StartDate] [datetime] NULL,
	[Amount] [decimal](18, 3) NULL,
	[IsPrimary] [bit] NULL,
	[Description] [varchar](250) NULL,
	[ExpirationDate] [datetime] NULL,
	[ShipToCountryId] [bigint] NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_LegalEntityInternationalShippingAudit] PRIMARY KEY CLUSTERED 
(
	[LegalEntityInternationalShippingAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


