USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[ATAChapterAudit]    Script Date: 9/17/2019 5:18:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ATAChapterAudit](
	[ATAChapterAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[ATAChapterId] [bigint] NOT NULL,
	[ATAChapterCode] [varchar](50) NULL,
	[ATAChapterName] [varchar](256) NULL,
	[ATAChapterCategory] [varchar](100) NULL,
	[MasterCompanyId] [int] NULL,
	[Memo] [varchar](max) NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_ATAChapterAudit] PRIMARY KEY CLUSTERED 
(
	[ATAChapterAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[ATAChapterAudit]  WITH CHECK ADD  CONSTRAINT [FK_ATAChapterAudit_ATAChapter] FOREIGN KEY([ATAChapterId])
REFERENCES [dbo].[ATAChapter] ([ATAChapterId])
GO

ALTER TABLE [dbo].[ATAChapterAudit] CHECK CONSTRAINT [FK_ATAChapterAudit_ATAChapter]
GO

