USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[Contact]    Script Date: 9/17/2019 5:21:24 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Contact](
	[ContactId] [bigint] IDENTITY(1,1) NOT NULL,
	[Prefix] [varchar](20) NULL,
	[FirstName] [varchar](30) NOT NULL,
	[LastName] [varchar](30) NOT NULL,
	[MiddleName] [varchar](30) NULL,
	[Suffix] [varchar](20) NULL,
	[ContactTitle] [varchar](30) NULL,
	[WorkPhone] [varchar](20) NOT NULL,
	[WorkPhoneExtn] [varchar](10) NULL,
	[MobilePhone] [varchar](20) NULL,
	[AlternatePhone] [varchar](20) NULL,
	[Fax] [varchar](20) NULL,
	[Email] [varchar](30) NOT NULL,
	[WebsiteURL] [varchar](30) NULL,
	[Notes] [varchar](300) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED 
(
	[ContactId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Contact]  WITH CHECK ADD  CONSTRAINT [FK_Contact_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[Contact] CHECK CONSTRAINT [FK_Contact_MasterCompany]
GO

