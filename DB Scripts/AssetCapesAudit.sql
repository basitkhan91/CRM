USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetCapesAudit]    Script Date: 9/17/2019 5:15:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetCapesAudit](
	[AssetCapesAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetCapesId] [bigint] NOT NULL,
	[AssetRecordId] [bigint] NULL,
	[CapabilityId] [bigint] NULL,
	[AircraftTypeId] [int] NULL,
	[AircraftModelId] [bigint] NULL,
	[AircraftDashNumberId] [bigint] NULL,
	[AircraftType] [varchar](256) NULL,
	[AircraftModel] [varchar](256) NULL,
	[AircraftDashNumber] [varchar](256) NULL,
	[Memo] [varchar](256) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AssetCapesAudit] PRIMARY KEY CLUSTERED 
(
	[AssetCapesAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetCapesAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetCapesAudit_AssetCapes] FOREIGN KEY([AssetCapesId])
REFERENCES [dbo].[AssetCapes] ([AssetCapesId])
GO

ALTER TABLE [dbo].[AssetCapesAudit] CHECK CONSTRAINT [FK_AssetCapesAudit_AssetCapes]
GO

