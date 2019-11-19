
/****** Object:  Table [dbo].[ATASubChapterAudit]    Script Date: 9/17/2019 5:18:48 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ATASubChapterAudit](
	[ATASubChapterAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[ATASubChapterId] [bigint] NOT NULL,
	[ATASubChapterCode] [varchar](50) NULL,
	[Description] [varchar](256) NULL,
	[Memo] [varchar](5000) NULL,
	[ATAChapterId] [bigint] NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_ATASubChapterAudit] PRIMARY KEY CLUSTERED 
(
	[ATASubChapterAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ATASubChapterAudit]  WITH CHECK ADD  CONSTRAINT [FK_ATASubChapterAudit_ATASubChapter] FOREIGN KEY([ATASubChapterId])
REFERENCES [dbo].[ATASubChapter] ([ATASubChapterId])
GO

ALTER TABLE [dbo].[ATASubChapterAudit] CHECK CONSTRAINT [FK_ATASubChapterAudit_ATASubChapter]
GO

