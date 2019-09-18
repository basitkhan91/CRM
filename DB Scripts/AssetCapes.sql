USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetCapes]    Script Date: 9/17/2019 5:15:35 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetCapes](
	[AssetCapesId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetRecordId] [bigint] NOT NULL,
	[CapabilityId] [bigint] NOT NULL,
	[AircraftTypeId] [int] NOT NULL,
	[AircraftModelId] [bigint] NULL,
	[AircraftDashNumberId] [bigint] NULL,
	[AircraftType] [varchar](256) NOT NULL,
	[AircraftModel] [varchar](256) NOT NULL,
	[AircraftDashNumber] [varchar](256) NOT NULL,
	[Memo] [varchar](256) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AssetCapes] PRIMARY KEY CLUSTERED 
(
	[AssetCapesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetCapes]  WITH CHECK ADD  CONSTRAINT [FK_AssetCapes_AircraftDashNumber] FOREIGN KEY([AircraftDashNumberId])
REFERENCES [dbo].[AircraftDashNumber] ([DashNumberId])
GO

ALTER TABLE [dbo].[AssetCapes] CHECK CONSTRAINT [FK_AssetCapes_AircraftDashNumber]
GO

ALTER TABLE [dbo].[AssetCapes]  WITH CHECK ADD  CONSTRAINT [FK_AssetCapes_AircraftModel] FOREIGN KEY([AircraftModelId])
REFERENCES [dbo].[AircraftModel] ([AircraftModelId])
GO

ALTER TABLE [dbo].[AssetCapes] CHECK CONSTRAINT [FK_AssetCapes_AircraftModel]
GO

ALTER TABLE [dbo].[AssetCapes]  WITH CHECK ADD  CONSTRAINT [FK_AssetCapes_AircraftType] FOREIGN KEY([AircraftTypeId])
REFERENCES [dbo].[AircraftType] ([AircraftTypeId])
GO

ALTER TABLE [dbo].[AssetCapes] CHECK CONSTRAINT [FK_AssetCapes_AircraftType]
GO

ALTER TABLE [dbo].[AssetCapes]  WITH CHECK ADD  CONSTRAINT [FK_AssetCapes_Asset] FOREIGN KEY([AssetRecordId])
REFERENCES [dbo].[Asset] ([AssetRecordId])
GO

ALTER TABLE [dbo].[AssetCapes] CHECK CONSTRAINT [FK_AssetCapes_Asset]
GO

ALTER TABLE [dbo].[AssetCapes]  WITH CHECK ADD  CONSTRAINT [FK_AssetCapes_Capability] FOREIGN KEY([CapabilityId])
REFERENCES [dbo].[Capability] ([CapabilityId])
GO

ALTER TABLE [dbo].[AssetCapes] CHECK CONSTRAINT [FK_AssetCapes_Capability]
GO

ALTER TABLE [dbo].[AssetCapes]  WITH CHECK ADD  CONSTRAINT [FK_AssetCapes_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AssetCapes] CHECK CONSTRAINT [FK_AssetCapes_MasterCompany]
GO

