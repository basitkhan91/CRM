USE [PAS_DESIGN]
GO

/****** Object:  Table [dbo].[AssetAcquisitionTypeAudit]    Script Date: 9/17/2019 12:45:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetAcquisitionTypeAudit](
	[AssetAcquisitionTypeAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetAcquisitionTypeId] [tinyint] NOT NULL,
	[Name] [varchar](50) NULL,
	[Memo] [varchar](2000) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK__AssetAcq__D5B0C0933E21B7E6] PRIMARY KEY CLUSTERED 
(
	[AssetAcquisitionTypeAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetAcquisitionTypeAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetAcquisitionTypeAudit_AssetAcquisitionType] FOREIGN KEY([AssetAcquisitionTypeId])
REFERENCES [dbo].[AssetAcquisitionType] ([AssetAcquisitionTypeId])
GO

ALTER TABLE [dbo].[AssetAcquisitionTypeAudit] CHECK CONSTRAINT [FK_AssetAcquisitionTypeAudit_AssetAcquisitionType]
GO

