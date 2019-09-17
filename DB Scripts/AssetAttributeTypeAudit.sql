USE [PAS_DESIGN]
GO

/****** Object:  Table [dbo].[AssetAttributeTypeAudit]    Script Date: 9/17/2019 12:41:48 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetAttributeTypeAudit](
	[AssetAttributeTypeAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetAttributeTypeId] [bigint] NOT NULL,
	[AssetTypeId] [bigint] NULL,
	[AssetAttributeTypeName] [varchar](30) NULL,
	[Description] [varchar](100) NULL,
	[AssetDepConventionId] [bigint] NULL,
	[AssetDepreciationMethodId] [bigint] NULL,
	[ResidualPercentage] [decimal](18, 2) NULL,
	[ResidualValue] [decimal](18, 2) NULL,
	[AssetLifeYears] [int] NULL,
	[AsetDepreciationIntervalId] [bigint] NULL,
	[AcquiredGLAccountId] [bigint] NULL,
	[DeprExpenseGLAccountId] [bigint] NULL,
	[AdDepsGLAccountId] [bigint] NULL,
	[AssetSaleGLAccountId] [bigint] NULL,
	[AssetWriteOffGLAccountId] [bigint] NULL,
	[AssetWriteDownGLAccountId] [bigint] NULL,
	[ManagementStructureId] [bigint] NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AssetAttributeTypeAudit] PRIMARY KEY CLUSTERED 
(
	[AssetAttributeTypeAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetAttributeTypeAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeTypeAudit_AssetAttributeType] FOREIGN KEY([AssetAttributeTypeId])
REFERENCES [dbo].[AssetAttributeType] ([AssetAttributeTypeId])
GO

ALTER TABLE [dbo].[AssetAttributeTypeAudit] CHECK CONSTRAINT [FK_AssetAttributeTypeAudit_AssetAttributeType]
GO

