USE [PAS_DEV]
GO

ALTER TABLE [dbo].[CustomerATAMapping] DROP CONSTRAINT [FK_CustomerATAMapping_MasterCompany]
GO

ALTER TABLE [dbo].[CustomerATAMapping] DROP CONSTRAINT [FK_CustomerATAMapping_Customer]
GO

ALTER TABLE [dbo].[CustomerATAMapping] DROP CONSTRAINT [FK_CustomerATAMapping_ATASubChapter]
GO

ALTER TABLE [dbo].[CustomerATAMapping] DROP CONSTRAINT [FK_CustomerATAMapping_ATAChapter]
GO

/****** Object:  Table [dbo].[CustomerATAMapping]    Script Date: 8/28/2019 2:50:23 PM ******/
DROP TABLE [dbo].[CustomerATAMapping]
GO

/****** Object:  Table [dbo].[CustomerATAMapping]    Script Date: 8/28/2019 2:50:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CustomerATAMapping](
	[CustomerATAMappingId] [bigint] IDENTITY(1,1) NOT NULL,
	[CustomerId] [bigint] NOT NULL,
	[PartNumber] [varchar](50) NOT NULL,
	[ATAChapterId] [bigint] NOT NULL,
	[ATAChapterCode] [int] NOT NULL,
	[ATAChapterName] [varchar](250) NOT NULL,
	[ATASubChapterId] [bigint] NOT NULL,
	[ATASubChapterDescription] [varchar](250) NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_CATAMapping] PRIMARY KEY CLUSTERED 
(
	[CustomerATAMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [CustomerATAMappingConstraint] UNIQUE NONCLUSTERED 
(
	[CustomerId] ASC,
	[ATAChapterId] ASC,
	[ATASubChapterId] ASC,
	[MasterCompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CustomerATAMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerATAMapping_ATAChapter] FOREIGN KEY([ATAChapterId])
REFERENCES [dbo].[ATAChapter] ([ATAChapterId])
GO

ALTER TABLE [dbo].[CustomerATAMapping] CHECK CONSTRAINT [FK_CustomerATAMapping_ATAChapter]
GO

ALTER TABLE [dbo].[CustomerATAMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerATAMapping_ATASubChapter] FOREIGN KEY([ATASubChapterId])
REFERENCES [dbo].[ATASubChapter] ([ATASubChapterId])
GO

ALTER TABLE [dbo].[CustomerATAMapping] CHECK CONSTRAINT [FK_CustomerATAMapping_ATASubChapter]
GO

ALTER TABLE [dbo].[CustomerATAMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerATAMapping_Customer] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customer] ([CustomerId])
GO

ALTER TABLE [dbo].[CustomerATAMapping] CHECK CONSTRAINT [FK_CustomerATAMapping_Customer]
GO

ALTER TABLE [dbo].[CustomerATAMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerATAMapping_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[CustomerATAMapping] CHECK CONSTRAINT [FK_CustomerATAMapping_MasterCompany]
GO


