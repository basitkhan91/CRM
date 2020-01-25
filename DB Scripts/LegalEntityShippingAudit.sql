
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[LegalEntityShippingAudit](
	[AuditLegalEntityShippingId] [bigint] IDENTITY(1,1) NOT NULL,
	[LegalEntityShippingId] [bigint] NOT NULL,
	[LegalEntityId] [bigint] NOT NULL,
	[LegalEntityShippingAddressId] [bigint] NOT NULL,
	[ShipVia] [varchar](30) NULL,
	[ShippingAccountInfo] [varchar](200) NULL,
	[ShippingId] [varchar](50) NULL,
	[ShippingURL] [varchar](50) NULL,
	[Memo] [varchar](300) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_LegalEntityShippingAudit] PRIMARY KEY CLUSTERED 
(
	[AuditLegalEntityShippingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


