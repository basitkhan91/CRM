USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetTypeAudit]    Script Date: 9/17/2019 5:18:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetTypeAudit](
	[AssetTypeAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetTypeId] [bigint] NOT NULL,
	[AssetTypeCode] [varchar](30) NULL,
	[AssetTypeName] [varchar](30) NULL,
	[AssetTypeMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AssetTypeAudit] PRIMARY KEY CLUSTERED 
(
	[AssetTypeAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetTypeAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetTypeAudit_AssetType] FOREIGN KEY([AssetTypeId])
REFERENCES [dbo].[AssetType] ([AssetTypeId])
GO

ALTER TABLE [dbo].[AssetTypeAudit] CHECK CONSTRAINT [FK_AssetTypeAudit_AssetType]
GO

