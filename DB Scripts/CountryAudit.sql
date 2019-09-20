USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CountryAudit]    Script Date: 9/17/2019 5:22:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CountryAudit](
	[CountyAuditId] [bigint] NOT NULL,
	[CountyId] [smallint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](64) NULL,
	[NiceName] [varchar](64) NULL,
	[IsoCode] [varchar](2) NULL,
	[Iso3] [varchar](10) NULL,
	[Numcode] [varchar](10) NULL,
	[IsdCode] [varchar](7) NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_CountryAudit] PRIMARY KEY CLUSTERED 
(
	[CountyAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CountryAudit]  WITH CHECK ADD  CONSTRAINT [FK_CountryAudit_Country] FOREIGN KEY([CountyId])
REFERENCES [dbo].[Country] ([CountyId])
GO

ALTER TABLE [dbo].[CountryAudit] CHECK CONSTRAINT [FK_CountryAudit_Country]
GO

