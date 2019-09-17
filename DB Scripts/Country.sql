USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[Country]    Script Date: 9/17/2019 5:22:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Country](
	[CountyId] [smallint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](64) NOT NULL,
	[NiceName] [varchar](64) NULL,
	[IsoCode] [varchar](2) NOT NULL,
	[Iso3] [varchar](10) NULL,
	[Numcode] [varchar](10) NULL,
	[IsdCode] [varchar](7) NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK__Countrie__671B21A98A4E395F] PRIMARY KEY CLUSTERED 
(
	[CountyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Country] ADD  CONSTRAINT [DF__Countries__count__2739D489]  DEFAULT (NULL) FOR [IsdCode]
GO

ALTER TABLE [dbo].[Country] ADD  CONSTRAINT [DF_Countries_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[Country] ADD  CONSTRAINT [DF_Countries_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

