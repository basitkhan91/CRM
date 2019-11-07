
/****** Object:  Table [dbo].[ATAChapter]    Script Date: 9/17/2019 5:18:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ATAChapter](
	[ATAChapterId] [bigint] IDENTITY(1,1) NOT NULL,
	[ATAChapterCode] [varchar](50) NOT NULL,
	[ATAChapterName] [varchar](256) NOT NULL,
	[ATAChapterCategory] [varchar](100) NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[Memo] [varchar](max) NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [ATA_Chapter] PRIMARY KEY CLUSTERED 
(
	[ATAChapterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[ATAChapter] ADD  CONSTRAINT [DF_ATAChapter_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[ATAChapter] ADD  CONSTRAINT [DF_ATAChapter_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[ATAChapter]  WITH CHECK ADD  CONSTRAINT [FK_ATAChapter_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[ATAChapter] CHECK CONSTRAINT [FK_ATAChapter_MasterCompany]
GO

