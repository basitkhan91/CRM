USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetAmortizationIntervalAudit]    Script Date: 9/17/2019 5:14:46 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetAmortizationIntervalAudit](
	[AssetAmortizationIntervalAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetAmortizationIntervalId] [bigint] NOT NULL,
	[AssetAmortizationIntervalCode] [varchar](30) NULL,
	[AssetAmortizationIntervalName] [varchar](50) NULL,
	[AssetAmortizationIntervalMemo] [varchar](1000) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AssetAmortizationIntervalAudit] PRIMARY KEY CLUSTERED 
(
	[AssetAmortizationIntervalAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetAmortizationIntervalAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetAmortizationIntervalAudit_AssetAmortizationInterval] FOREIGN KEY([AssetAmortizationIntervalId])
REFERENCES [dbo].[AssetAmortizationInterval] ([AssetAmortizationIntervalId])
GO

ALTER TABLE [dbo].[AssetAmortizationIntervalAudit] CHECK CONSTRAINT [FK_AssetAmortizationIntervalAudit_AssetAmortizationInterval]
GO

