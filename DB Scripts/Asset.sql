USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[Asset]    Script Date: 8/29/2019 6:13:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Asset](
	[AssetRecordId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetId] [varchar](30) NOT NULL,
	[AlternateAssetId] [varchar](30) NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](500) NULL,
	[ManagementStructureId] [bigint] NOT NULL,
	[CalibrationRequired] [bit] NULL,
	[CertificationRequired] [bit] NULL,
	[InspectionRequired] [bit] NULL,
	[VerificationRequired] [bit] NULL,
	[IsDepreciable] [bit] NULL,
	[IsIntangible] [bit] NULL,
	[AssetAcquisitionTypeId] [tinyint] NOT NULL,
	[ManufacturerId] [bigint] NULL,
	[ManufacturedDate] [datetime2](7) NULL,
	[Model] [varchar](30) NULL,
	[IsSerialized] [bit] NULL,
	[UnitOfMeasureId] [bigint] NULL,
	[CurrencyId] [int] NULL,
	[UnitCost] [decimal](18, 2) NULL,
	[ExpirationDate] [datetime2](7) NULL,
	[Asset Location] [varchar](30) NULL,
	[Memo] [varchar](2000) NULL,
	[AssetParentId] [varchar](30) NULL,
	[AssetTypeId] [bigint] NULL,
	[AssetIntangibleTypeId] [bigint] NULL,
	[AssetCalibrationMin] [varchar](30) NULL,
	[AssetCalibrationMinTolerance] [varchar](30) NULL,
	[AssetCalibratonMax] [varchar](30) NULL,
	[AssetCalibrationMaxTolerance] [varchar](30) NULL,
	[AssetCalibrationExpected] [varchar](30) NULL,
	[AssetCalibrationExpectedTolerance] [varchar](30) NULL,
	[AssetCalibrationMemo] [varchar](2000) NULL,
	[AssetIsMaintenanceReqd] [bit] NULL,
	[AssetMaintenanceIsContract] [bit] NULL,
	[AssetMaintenanceContractFile] [nvarchar](512) NULL,
	[MaintenanceFrequencyMonths] [tinyint] NULL,
	[MaintenanceFrequencyDays] [tinyint] NULL,
	[DefaultVendorId] [bigint] NULL,
	[GLAccountId] [bigint] NULL,
	[MaintenanceMemo] [varchar](2000) NULL,
	[IsWarrantyRequired] [bit] NULL,
	[WarrantyCompany] [varchar](30) NULL,
	[WarrantyStartDate] [datetime2](7) NULL,
	[WarrantyEndDate] [datetime2](7) NULL,
	[WarrantyStatus] [varchar](30) NULL,
	[UnexpiredTime] [tinyint] NULL,
	[MasterCompanyId] [int] NOT NULL,
	[Asset_Location] [varchar](100) NULL,
	[IsDelete] [bit] NOT NULL,
	[Warranty] [bit] NULL,
	[IsActive] [bit] NOT NULL,
	[CalibrationDefaultVendorId] [bigint] NULL,
	[CertificationDefaultVendorId] [bigint] NULL,
	[InspectionDefaultVendorId] [bigint] NULL,
	[VerificationDefaultVendorId] [bigint] NULL,
	[CertificationFrequencyMonths] [tinyint] NULL,
	[CertificationFrequencyDays] [tinyint] NULL,
	[CertificationDefaultCost] [decimal](18, 2) NULL,
	[CertificationGlAccountId] [bigint] NULL,
	[CertificationMemo] [varchar](2000) NULL,
	[InspectionMemo] [varchar](2000) NULL,
	[InspectionGlaAccountId] [bigint] NULL,
	[InspectionDefaultCost] [decimal](18, 2) NULL,
	[InspectionFrequencyMonths] [tinyint] NULL,
	[InspectionFrequencyDays] [tinyint] NULL,
	[VerificationFrequencyDays] [tinyint] NULL,
	[VerificationFrequencyMonths] [tinyint] NULL,
	[VerificationDefaultCost] [decimal](18, 2) NULL,
	[CalibrationDefaultCost] [decimal](18, 2) NULL,
	[CalibrationFrequencyMonths] [tinyint] NULL,
	[CalibrationFrequencyDays] [tinyint] NULL,
	[CalibrationGlAccountId] [bigint] NULL,
	[CalibrationMemo] [varchar](2000) NULL,
	[VerificationMemo] [varchar](2000) NULL,
	[VerificationGlAccountId] [bigint] NULL,
	[CalibrationCurrencyId] [int] NULL,
	[CertificationCurrencyId] [int] NULL,
	[InspectionCurrencyId] [int] NULL,
	[VerificationCurrencyId] [int] NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Asset] PRIMARY KEY CLUSTERED 
(
	[AssetRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_AssetAcquisitionType] FOREIGN KEY([AssetAcquisitionTypeId])
REFERENCES [dbo].[AssetAcquisitionType] ([AssetAcquisitionTypeId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_AssetAcquisitionType]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_AssetTypeId] FOREIGN KEY([AssetTypeId])
REFERENCES [dbo].[AssetType] ([AssetTypeId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_AssetTypeId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_Currency] FOREIGN KEY([CurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_Currency]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_ManagementStructure] FOREIGN KEY([ManagementStructureId])
REFERENCES [dbo].[ManagementStructure] ([ManagementStructureId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_ManagementStructure]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_Manufacturer] FOREIGN KEY([ManufacturerId])
REFERENCES [dbo].[Manufacturer] ([ManufacturerId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_Manufacturer]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_MasterCompany]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_UnitOfMeasure] FOREIGN KEY([UnitOfMeasureId])
REFERENCES [dbo].[UnitOfMeasure] ([UnitOfMeasureId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_UnitOfMeasure]
GO

