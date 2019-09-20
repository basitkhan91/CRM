USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetIntangibleTypeAudit]    Script Date: 9/17/2019 5:17:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetIntangibleTypeAudit](
	[AssetIntangibleTypeAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetIntangibleTypeId] [bigint] NOT NULL,
	[AssetIntangibleName] [varchar](30) NULL,
	[AssetIntangibleMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AssetIntangibleTypeAudit_1] PRIMARY KEY CLUSTERED 
(
	[AssetIntangibleTypeAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetIntangibleTypeAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetIntangibleTypeAudit_AssetIntangibleType] FOREIGN KEY([AssetIntangibleTypeId])
REFERENCES [dbo].[AssetIntangibleType] ([AssetIntangibleTypeId])
GO

ALTER TABLE [dbo].[AssetIntangibleTypeAudit] CHECK CONSTRAINT [FK_AssetIntangibleTypeAudit_AssetIntangibleType]
GO

