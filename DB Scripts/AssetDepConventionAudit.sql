USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetDepConventionAudit]    Script Date: 9/17/2019 5:16:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetDepConventionAudit](
	[AssetDepConventionAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetDepConventionId] [bigint] NOT NULL,
	[AssetDepConventionCode] [varchar](30) NULL,
	[AssetDepConventionName] [varchar](50) NULL,
	[AssetDepConventionMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AssetDepConventionAudit] PRIMARY KEY CLUSTERED 
(
	[AssetDepConventionAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetDepConventionAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetDepConventionAudit_AssetDepConvention] FOREIGN KEY([AssetDepConventionId])
REFERENCES [dbo].[AssetDepConvention] ([AssetDepConventionId])
GO

ALTER TABLE [dbo].[AssetDepConventionAudit] CHECK CONSTRAINT [FK_AssetDepConventionAudit_AssetDepConvention]
GO

