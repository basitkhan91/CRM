USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AssetAudit]    Script Date: 9/17/2019 5:15:24 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AssetAudit](
	[AssetAuditRecordId] [bigint] IDENTITY(1,1) NOT NULL,
	[AssetRecordId] [bigint] NOT NULL,
	[AssetId] [varchar](50) NULL,
	[AlternateAssetRecordId] [bigint] NULL,
	[AlternateAssetId] [varchar](50) NULL,
	[Name] [varchar](50) NULL,
	[Description] [varchar](500) NULL,
	[ManagementStructureId] [bigint] NULL,
	[CalibrationRequired] [bit] NULL,
	[CertificationRequired] [bit] NULL,
	[InspectionRequired] [bit] NULL,
	[VerificationRequired] [bit] NULL,
	[IsDepreciable] [bit] NULL,
	[IsIntangible] [bit] NULL,
	[AssetAcquisitionTypeId] [tinyint] NULL,
	[ManufacturerId] [bigint] NULL,
	[ManufacturedDate] [datetime2](7) NULL,
	[Model] [varchar](30) NULL,
	[IsSerialized] [bit] NULL,
	[UnitOfMeasureId] [bigint] NULL,
	[CurrencyId] [int] NULL,
	[UnitCost] [decimal](18, 2) NULL,
	[ExpirationDate] [datetime2](7) NULL,
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
	[MasterCompanyId] [int] NULL,
	[AssetLocation] [varchar](100) NULL,
	[Warranty] [bit] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
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
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[AssetMaintenanceContractFileExt] [varchar](50) NULL,
	[WarrantyFile] [nvarchar](512) NULL,
	[WarrantyFileExt] [varchar](50) NULL,
 CONSTRAINT [PK_AssetAudit] PRIMARY KEY CLUSTERED 
(
	[AssetAuditRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AssetAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetAudit_Asset] FOREIGN KEY([AssetRecordId])
REFERENCES [dbo].[Asset] ([AssetRecordId])
GO

ALTER TABLE [dbo].[AssetAudit] CHECK CONSTRAINT [FK_AssetAudit_Asset]
GO

ALTER TABLE [dbo].[AssetAudit]  WITH CHECK ADD  CONSTRAINT [FK_AssetAudit_AssetAudit] FOREIGN KEY([AssetAuditRecordId])
REFERENCES [dbo].[AssetAudit] ([AssetAuditRecordId])
GO

ALTER TABLE [dbo].[AssetAudit] CHECK CONSTRAINT [FK_AssetAudit_AssetAudit]
GO

