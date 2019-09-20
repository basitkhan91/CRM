USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetIntangibleAttributeTypeAudit]    Script Date: 9/17/2019 5:17:10 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetIntangibleAttributeTypeAudit](
	[AssetIntangibleAttributeTypeAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetIntangibleAttributeTypeId] [bigint] NOT NULL,
	[AssetIntangibleTypeId] [bigint] NULL,
	[AssetDepreciationMethodId] [bigint] NULL,
	[IntangibleLifeYears] [int] NULL,
	[AssetAmortizationIntervalId] [bigint] NULL,
	[IntangibleGLAccountId] [bigint] NULL,
	[AmortExpenseGLAccountId] [bigint] NULL,
	[AccAmortDeprGLAccountId] [bigint] NULL,
	[IntangibleWriteDownGLAccountId] [bigint] NULL,
	[IntangibleWriteOffGLAccountId] [bigint] NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL
) ON [PRIMARY]
GO

