USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetIntangibleAttributeType]    Script Date: 9/17/2019 5:17:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetIntangibleAttributeType](
	[AssetIntangibleAttributeTypeId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetIntangibleTypeId] [bigint] NOT NULL,
	[AssetDepreciationMethodId] [bigint] NOT NULL,
	[IntangibleLifeYears] [int] NOT NULL,
	[AssetAmortizationIntervalId] [bigint] NOT NULL,
	[IntangibleGLAccountId] [bigint] NOT NULL,
	[AmortExpenseGLAccountId] [bigint] NOT NULL,
	[AccAmortDeprGLAccountId] [bigint] NOT NULL,
	[IntangibleWriteDownGLAccountId] [bigint] NOT NULL,
	[IntangibleWriteOffGLAccountId] [bigint] NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AssetIntangibleType] PRIMARY KEY CLUSTERED 
(
	[AssetIntangibleAttributeTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] ADD  CONSTRAINT [DF_AssetIntangibleAttributeType_IntangibleLifeYears]  DEFAULT ((0)) FOR [IntangibleLifeYears]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] ADD  CONSTRAINT [DF_AssetIntangibleAttributeType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] ADD  CONSTRAINT [DF_AssetIntangibleAttributeType_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleAttributeType_AssetAmortizationInterval] FOREIGN KEY([AssetAmortizationIntervalId])
REFERENCES [dbo].[AssetAmortizationInterval] ([AssetAmortizationIntervalId])
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] CHECK CONSTRAINT [FK_AssetIntangibleAttributeType_AssetAmortizationInterval]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleAttributeType_AssetDepreciationMethod] FOREIGN KEY([AssetDepreciationMethodId])
REFERENCES [dbo].[AssetDepreciationMethod] ([AssetDepreciationMethodId])
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] CHECK CONSTRAINT [FK_AssetIntangibleAttributeType_AssetDepreciationMethod]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleAttributeType_AssetIntangibleType] FOREIGN KEY([AssetIntangibleTypeId])
REFERENCES [dbo].[AssetIntangibleType] ([AssetIntangibleTypeId])
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] CHECK CONSTRAINT [FK_AssetIntangibleAttributeType_AssetIntangibleType]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleAttributeType_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] CHECK CONSTRAINT [FK_AssetIntangibleAttributeType_MasterCompany]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleAttributeTypeAccAmort_GLAccount] FOREIGN KEY([AccAmortDeprGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] CHECK CONSTRAINT [FK_AssetIntangibleAttributeTypeAccAmort_GLAccount]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleAttributeTypeAmortExp_GLAccount] FOREIGN KEY([AmortExpenseGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] CHECK CONSTRAINT [FK_AssetIntangibleAttributeTypeAmortExp_GLAccount]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleAttributeTypeIntangible_GLAccount] FOREIGN KEY([IntangibleGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] CHECK CONSTRAINT [FK_AssetIntangibleAttributeTypeIntangible_GLAccount]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleAttributeTypeIntgWriteDown_GLAccount] FOREIGN KEY([IntangibleWriteDownGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] CHECK CONSTRAINT [FK_AssetIntangibleAttributeTypeIntgWriteDown_GLAccount]
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleAttributeTypeWriteOff_GLAccount] FOREIGN KEY([IntangibleWriteOffGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[AssetIntangibleAttributeType] CHECK CONSTRAINT [FK_AssetIntangibleAttributeTypeWriteOff_GLAccount]
GO

