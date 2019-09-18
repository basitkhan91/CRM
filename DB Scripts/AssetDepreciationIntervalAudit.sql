USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetDepreciationIntervalAudit]    Script Date: 9/17/2019 5:16:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetDepreciationIntervalAudit](
	[AssetDepreciationIntervalAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetDepreciationIntervalId] [bigint] NOT NULL,
	[AssetDepreciationIntervalCode] [varchar](30) NULL,
	[AssetDepreciationIntervalName] [varchar](50) NULL,
	[AssetDepreciationIntervalMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AssetDepreciationIntervalAudit] PRIMARY KEY CLUSTERED 
(
	[AssetDepreciationIntervalAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetDepreciationIntervalAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetDepreciationIntervalAudit_AssetDepreciationInterval] FOREIGN KEY([AssetDepreciationIntervalId])
REFERENCES [dbo].[AssetDepreciationInterval] ([AssetDepreciationIntervalId])
GO

ALTER TABLE [dbo].[AssetDepreciationIntervalAudit] CHECK CONSTRAINT [FK_AssetDepreciationIntervalAudit_AssetDepreciationInterval]
GO

