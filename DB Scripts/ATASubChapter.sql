USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[ATASubChapter]    Script Date: 9/17/2019 5:18:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ATASubChapter](
	[ATASubChapterId] [bigint] IDENTITY(1,1) NOT NULL,
	[ATASubChapterCode] [varchar](50) NOT NULL,
	[Description] [varchar](256) NOT NULL,
	[Memo] [varchar](5000) NULL,
	[ATAChapterId] [bigint] NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_ATASubChapter] PRIMARY KEY CLUSTERED 
(
	[ATASubChapterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ATASubChapter] ADD  CONSTRAINT [DF__ATASubCha__ATACh__0EAEE938]  DEFAULT ((0)) FOR [ATAChapterId]
GO

ALTER TABLE [dbo].[ATASubChapter] ADD  CONSTRAINT [DF_ATASubChapter_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[ATASubChapter] ADD  CONSTRAINT [DF_ATASubChapter_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[ATASubChapter]  WITH CHECK ADD  CONSTRAINT [FK_ATASubChapter_ATAChapter] FOREIGN KEY([ATAChapterId])
REFERENCES [dbo].[ATAChapter] ([ATAChapterId])
GO

ALTER TABLE [dbo].[ATASubChapter] CHECK CONSTRAINT [FK_ATASubChapter_ATAChapter]
GO

ALTER TABLE [dbo].[ATASubChapter]  WITH CHECK ADD  CONSTRAINT [FK_ATASubChapter_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[ATASubChapter] CHECK CONSTRAINT [FK_ATASubChapter_MasterCompany]
GO

