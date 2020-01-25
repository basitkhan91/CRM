SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[LegalEntityContactAudit](
	[LegalEntityContactAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[LegalEntityContactId] [bigint] NOT NULL,
	[LegalEntityId] [bigint] NOT NULL,
	[ContactId] [bigint] NULL,
	[IsDefaultContact] [bit] NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[Tag] [varchar](1) NULL,
	[Prefix] [varchar](20) NULL,
	[FirstName] [varchar](30) NOT NULL,
	[LastName] [varchar](30) NOT NULL,
	[MiddleName] [varchar](30) NULL,
	[Suffix] [varchar](20) NULL,
	[ContactTitle] [varchar](30) NULL,
	[WorkPhone] [varchar](20) NULL,
	[WorkPhoneExtn] [varchar](10) NULL,
	[MobilePhone] [varchar](20) NULL,
	[AlternatePhone] [varchar](20) NULL,
	[Fax] [varchar](20) NULL,
	[Email] [varchar](30) NULL,
	[WebsiteURL] [varchar](30) NULL,
	[Notes] [varchar](300) NULL,
 CONSTRAINT [PK_LegalEntityContactAudit] PRIMARY KEY CLUSTERED 
(
	[LegalEntityContactAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


