USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[ContactAudit]    Script Date: 9/17/2019 5:21:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ContactAudit](
	[ContactAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[ContactId] [bigint] NOT NULL,
	[Prefix] [varchar](20) NULL,
	[FirstName] [varchar](30) NULL,
	[LastName] [varchar](30) NULL,
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
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK__ContactA__F80F366E67C2FEF7] PRIMARY KEY CLUSTERED 
(
	[ContactAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ContactAudit]  WITH CHECK ADD  CONSTRAINT [FK_ContactAudit_Contact] FOREIGN KEY([ContactId])
REFERENCES [dbo].[Contact] ([ContactId])
GO

ALTER TABLE [dbo].[ContactAudit] CHECK CONSTRAINT [FK_ContactAudit_Contact]
GO

