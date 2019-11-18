ALTER TABLE [dbo].[RestrictedParts] DROP CONSTRAINT [DF__Restricted__Memo__1883378C]
GO

/****** Object:  Table [dbo].[RestrictedParts]    Script Date: 10/21/2019 1:39:07 PM ******/
DROP TABLE [dbo].[RestrictedParts]
GO

/****** Object:  Table [dbo].[RestrictedParts]    Script Date: 10/21/2019 1:39:07 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RestrictedParts](
	[RestrictedPartId] [bigint] IDENTITY(1,1) NOT NULL,
	[ModuleId] [bigint] NOT NULL,
	[ReferenceId] [bigint] NOT NULL,
	[MasterPartId] [bigint] NOT NULL,
	[PartNumber] [varchar](100) NULL,
	[PartType] [varchar](20) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[UpdatedBy] [varchar](256) NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
	[Memo] [varchar](255) NULL,
 CONSTRAINT [PK_RestrictedParts] PRIMARY KEY CLUSTERED 
(
	[RestrictedPartId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[RestrictedParts] ADD  DEFAULT ('') FOR [Memo]
GO

