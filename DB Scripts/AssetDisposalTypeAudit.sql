USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetDisposalTypeAudit]    Script Date: 9/17/2019 5:16:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetDisposalTypeAudit](
	[AssetDisposalTypeAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetDisposalTypeId] [bigint] NOT NULL,
	[AssetDisposalCode] [varchar](30) NULL,
	[AssetDisposalName] [varchar](50) NULL,
	[AssetDisposalMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AssetDisposalTypeAudit] PRIMARY KEY CLUSTERED 
(
	[AssetDisposalTypeAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetDisposalTypeAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetDisposalTypeAudit_AssetDisposalType] FOREIGN KEY([AssetDisposalTypeId])
REFERENCES [dbo].[AssetDisposalType] ([AssetDisposalTypeId])
GO

ALTER TABLE [dbo].[AssetDisposalTypeAudit] CHECK CONSTRAINT [FK_AssetDisposalTypeAudit_AssetDisposalType]
GO

