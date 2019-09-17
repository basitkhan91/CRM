USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CapabilityAudit]    Script Date: 9/17/2019 5:19:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CapabilityAudit](
	[CapabilityAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[CapabilityId] [bigint] NOT NULL,
	[CapabilityTypeId] [int] NULL,
	[Description] [varchar](100) NULL,
	[ItemMasterId] [bigint] NULL,
	[ManufacturerId] [bigint] NULL,
	[AircraftTypeId] [int] NULL,
	[AircraftModelId] [bigint] NULL,
	[AircraftDashNumberId] [bigint] NULL,
	[AircraftType] [varchar](256) NULL,
	[AircraftModel] [varchar](256) NULL,
	[AircraftDashNumber] [varchar](50) NULL,
	[ATAChapterId] [bigint] NULL,
	[ATASubChapterId] [bigint] NULL,
	[ATAChapter] [varchar](256) NULL,
	[ATASubChapter] [varchar](256) NULL,
	[AssetRecordId] [bigint] NULL,
	[ManagementStructureId] [bigint] NULL,
	[EntryDate] [datetime2](7) NULL,
	[IsCMMExist] [bit] NULL,
	[IsVerified] [bit] NULL,
	[VerifiedBy] [varchar](256) NULL,
	[DateVerified] [datetime2](7) NULL,
	[Memo] [varchar](2000) NULL,
	[ComponentDescription] [varchar](30) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_CapabilityAudit] PRIMARY KEY CLUSTERED 
(
	[CapabilityAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CapabilityAudit]  WITH CHECK ADD  CONSTRAINT [FK_CapabilityAudit_Capability] FOREIGN KEY([CapabilityId])
REFERENCES [dbo].[Capability] ([CapabilityId])
GO

ALTER TABLE [dbo].[CapabilityAudit] CHECK CONSTRAINT [FK_CapabilityAudit_Capability]
GO

