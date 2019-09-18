USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetDepreciationMethodAudit]    Script Date: 9/17/2019 5:16:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetDepreciationMethodAudit](
	[AssetDepreciationMethodAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetDepreciationMethodId] [bigint] NOT NULL,
	[AssetDepreciationMethodCode] [varchar](30) NULL,
	[AssetDepreciationMethodName] [varchar](30) NULL,
	[AssetDepreciationMethodBasis] [varchar](20) NULL,
	[AssetDepreciationMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK__AssetDep__A7A30B2107A197AA] PRIMARY KEY CLUSTERED 
(
	[AssetDepreciationMethodAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetDepreciationMethodAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetDepreciationMethodAudit_AssetDepreciationMethod] FOREIGN KEY([AssetDepreciationMethodId])
REFERENCES [dbo].[AssetDepreciationMethod] ([AssetDepreciationMethodId])
GO

ALTER TABLE [dbo].[AssetDepreciationMethodAudit] CHECK CONSTRAINT [FK_AssetDepreciationMethodAudit_AssetDepreciationMethod]
GO

