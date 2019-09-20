USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[Capability]    Script Date: 9/17/2019 5:19:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Capability](
	[CapabilityId] [bigint] IDENTITY(1,1) NOT NULL,
	[CapabilityTypeId] [int] NOT NULL,
	[Description] [varchar](100) NULL,
	[ItemMasterId] [bigint] NOT NULL,
	[ManufacturerId] [bigint] NOT NULL,
	[AircraftTypeId] [int] NOT NULL,
	[AircraftModelId] [bigint] NULL,
	[AircraftDashNumberId] [bigint] NULL,
	[AircraftType] [varchar](256) NOT NULL,
	[AircraftModel] [varchar](256) NULL,
	[AircraftDashNumber] [varchar](50) NULL,
	[ATAChapterId] [bigint] NULL,
	[ATASubChapterId] [bigint] NULL,
	[ATAChapter] [varchar](256) NULL,
	[ATASubChapter] [varchar](256) NULL,
	[AssetRecordId] [bigint] NULL,
	[ManagementStructureId] [bigint] NOT NULL,
	[EntryDate] [datetime2](7) NULL,
	[IsCMMExist] [bit] NULL,
	[IsVerified] [bit] NULL,
	[VerifiedBy] [varchar](256) NULL,
	[DateVerified] [datetime2](7) NULL,
	[Memo] [varchar](2000) NULL,
	[ComponentDescription] [varchar](30) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Capability] PRIMARY KEY CLUSTERED 
(
	[CapabilityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Capability] ADD  CONSTRAINT [DF_Capability_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[Capability] ADD  CONSTRAINT [DF_Capability_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_AircraftDashNumber] FOREIGN KEY([AircraftDashNumberId])
REFERENCES [dbo].[AircraftDashNumber] ([DashNumberId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_AircraftDashNumber]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_AircraftModel] FOREIGN KEY([AircraftModelId])
REFERENCES [dbo].[AircraftModel] ([AircraftModelId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_AircraftModel]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_AircraftType] FOREIGN KEY([AircraftTypeId])
REFERENCES [dbo].[AircraftType] ([AircraftTypeId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_AircraftType]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_Asset] FOREIGN KEY([AssetRecordId])
REFERENCES [dbo].[Asset] ([AssetRecordId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_Asset]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_ATAChapter] FOREIGN KEY([ATAChapterId])
REFERENCES [dbo].[ATAChapter] ([ATAChapterId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_ATAChapter]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_ATASubChapter] FOREIGN KEY([ATASubChapterId])
REFERENCES [dbo].[ATASubChapter] ([ATASubChapterId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_ATASubChapter]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_CapabilityType] FOREIGN KEY([CapabilityTypeId])
REFERENCES [dbo].[CapabilityType] ([CapabilityTypeId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_CapabilityType]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_ManagementStructure] FOREIGN KEY([ManagementStructureId])
REFERENCES [dbo].[ManagementStructure] ([ManagementStructureId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_ManagementStructure]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_Manufacturer] FOREIGN KEY([ManufacturerId])
REFERENCES [dbo].[Manufacturer] ([ManufacturerId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_Manufacturer]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_MasterCompany]
GO

ALTER TABLE [dbo].[Capability]  WITH CHECK ADD  CONSTRAINT [FK_Capability_Part] FOREIGN KEY([ItemMasterId])
REFERENCES [dbo].[ItemMaster] ([ItemMasterId])
GO

ALTER TABLE [dbo].[Capability] CHECK CONSTRAINT [FK_Capability_Part]
GO

