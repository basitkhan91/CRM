USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetStatusAudit]    Script Date: 9/17/2019 5:17:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetStatusAudit](
	[AssetStatusAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetStatusId] [bigint] NOT NULL,
	[Code] [varchar](100) NULL,
	[Name] [varchar](100) NULL,
	[Memo] [varchar](256) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](30) NULL,
	[UpdatedBy] [varchar](30) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AssetStatusAudit] PRIMARY KEY CLUSTERED 
(
	[AssetStatusAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetStatusAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetStatusAudit_AssetStatus] FOREIGN KEY([AssetStatusId])
REFERENCES [dbo].[AssetStatus] ([AssetStatusId])
GO

ALTER TABLE [dbo].[AssetStatusAudit] CHECK CONSTRAINT [FK_AssetStatusAudit_AssetStatus]
GO

