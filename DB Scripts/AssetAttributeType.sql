USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetAttributeType]    Script Date: 9/17/2019 5:14:59 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetAttributeType](
	[AssetAttributeTypeId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetTypeId] [bigint] NOT NULL,
	[AssetAttributeTypeName] [varchar](30) NOT NULL,
	[Description] [varchar](100) NULL,
	[AssetDepConventionId] [bigint] NOT NULL,
	[AssetDepreciationMethodId] [bigint] NOT NULL,
	[ResidualPercentage] [decimal](18, 2) NOT NULL,
	[ResidualValue] [decimal](18, 2) NOT NULL,
	[AssetLifeYears] [int] NOT NULL,
	[AsetDepreciationIntervalId] [bigint] NOT NULL,
	[AcquiredGLAccountId] [bigint] NOT NULL,
	[DeprExpenseGLAccountId] [bigint] NOT NULL,
	[AdDepsGLAccountId] [bigint] NOT NULL,
	[AssetSaleGLAccountId] [bigint] NOT NULL,
	[AssetWriteOffGLAccountId] [bigint] NOT NULL,
	[AssetWriteDownGLAccountId] [bigint] NOT NULL,
	[ManagementStructureId] [bigint] NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AssetAttributeType] PRIMARY KEY CLUSTERED 
(
	[AssetAttributeTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetAttributeType] ADD  CONSTRAINT [DF_AssetAttributeType_ResidualPercentage]  DEFAULT ((0)) FOR [ResidualPercentage]
GO

ALTER TABLE [dbo].[AssetAttributeType] ADD  CONSTRAINT [DF_AssetAttributeType_AssetLifeYears]  DEFAULT ((0)) FOR [AssetLifeYears]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeType_AssetDepConvention] FOREIGN KEY([AssetDepConventionId])
REFERENCES [dbo].[AssetDepConvention] ([AssetDepConventionId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeType_AssetDepConvention]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeType_AssetDepreciationInterval] FOREIGN KEY([AsetDepreciationIntervalId])
REFERENCES [dbo].[AssetDepreciationInterval] ([AssetDepreciationIntervalId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeType_AssetDepreciationInterval]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeType_AssetDepreciationMethod] FOREIGN KEY([AssetDepreciationMethodId])
REFERENCES [dbo].[AssetDepreciationMethod] ([AssetDepreciationMethodId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeType_AssetDepreciationMethod]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeType_AssetType] FOREIGN KEY([AssetTypeId])
REFERENCES [dbo].[AssetType] ([AssetTypeId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeType_AssetType]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeType_GLAccount] FOREIGN KEY([AssetSaleGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeType_GLAccount]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeType_GLAccount1] FOREIGN KEY([AssetWriteOffGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeType_GLAccount1]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeType_GLAccount2] FOREIGN KEY([AssetWriteDownGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeType_GLAccount2]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeType_ManagementStructure] FOREIGN KEY([ManagementStructureId])
REFERENCES [dbo].[ManagementStructure] ([ManagementStructureId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeType_ManagementStructure]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeType_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeType_MasterCompany]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeTypeAcq_GLAccount] FOREIGN KEY([AcquiredGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeTypeAcq_GLAccount]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeTypeDeprExp_GLAccount] FOREIGN KEY([DeprExpenseGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeTypeDeprExp_GLAccount]
GO

ALTER TABLE [dbo].[AssetAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetAttributeTypeDeps_GLAccount] FOREIGN KEY([AdDepsGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetAttributeType] CHECK CONSTRAINT [FK_AssetAttributeTypeDeps_GLAccount]
GO

