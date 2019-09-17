USE [PAS_DESIGN]
GO

/****** Object:  Table [dbo].[Asset]    Script Date: 9/17/2019 12:44:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Asset](
	[AssetRecordId] [bigint] IDENTITY(1,1) NOT NULL,
	[IsDepreciable] [bit] NOT NULL,
	[IsIntangible] [bit] NOT NULL,
	[AssetId] [varchar](50) NOT NULL,
	[AlternateAssetRecordId] [bigint] NULL,
	[AlternateAssetId] [varchar](50) NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](500) NULL,
	[ManagementStructureId] [bigint] NOT NULL,
	[AssetAcquisitionTypeId] [tinyint] NOT NULL,
	[ManufacturerId] [bigint] NOT NULL,
	[ManufacturedDate] [datetime2](7) NULL,
	[CalibrationRequired] [bit] NOT NULL,
	[Model] [varchar](30) NULL,
	[IsSerialized] [bit] NOT NULL,
	[UnitOfMeasureId] [bigint] NOT NULL,
	[CurrencyId] [int] NOT NULL,
	[UnitCost] [decimal](18, 2) NULL,
	[ExpirationDate] [datetime2](7) NULL,
	[AssetLocation] [varchar](100) NULL,
	[Memo] [varchar](2000) NULL,
	[AssetParentId] [varchar](30) NULL,
	[AssetTypeId] [bigint] NOT NULL,
	[AssetIntangibleTypeId] [bigint] NULL,
	[CertificationRequired] [bit] NOT NULL,
	[InspectionRequired] [bit] NOT NULL,
	[VerificationRequired] [bit] NOT NULL,
	[AssetCalibrationMin] [varchar](30) NULL,
	[AssetCalibrationMinTolerance] [varchar](30) NULL,
	[AssetCalibratonMax] [varchar](30) NULL,
	[AssetCalibrationMaxTolerance] [varchar](30) NULL,
	[AssetCalibrationExpected] [varchar](30) NULL,
	[AssetCalibrationExpectedTolerance] [varchar](30) NULL,
	[AssetCalibrationMemo] [varchar](2000) NULL,
	[CalibrationFrequencyMonths] [tinyint] NULL,
	[CalibrationFrequencyDays] [tinyint] NULL,
	[CalibrationDefaultVendorId] [bigint] NULL,
	[CalibrationDefaultCost] [decimal](18, 2) NULL,
	[CalibrationCurrencyId] [int] NULL,
	[CalibrationGlAccountId] [bigint] NULL,
	[CalibrationMemo] [varchar](2000) NULL,
	[CertificationFrequencyMonths] [tinyint] NULL,
	[CertificationFrequencyDays] [tinyint] NULL,
	[CertificationDefaultVendorId] [bigint] NULL,
	[CertificationDefaultCost] [decimal](18, 2) NULL,
	[CertificationCurrencyId] [int] NULL,
	[CertificationGlAccountId] [bigint] NULL,
	[CertificationMemo] [varchar](2000) NULL,
	[InspectionFrequencyMonths] [tinyint] NULL,
	[InspectionFrequencyDays] [tinyint] NULL,
	[InspectionDefaultVendorId] [bigint] NULL,
	[InspectionDefaultCost] [decimal](18, 2) NULL,
	[InspectionCurrencyId] [int] NULL,
	[InspectionGlAccountId] [bigint] NULL,
	[InspectionMemo] [varchar](2000) NULL,
	[VerificationFrequencyMonths] [tinyint] NULL,
	[VerificationFrequencyDays] [tinyint] NULL,
	[VerificationDefaultVendorId] [bigint] NULL,
	[VerificationDefaultCost] [decimal](18, 2) NULL,
	[VerificationCurrencyId] [int] NULL,
	[VerificationGlAccountId] [bigint] NULL,
	[VerificationMemo] [varchar](2000) NULL,
	[IsMaintenanceReqd] [bit] NOT NULL,
	[MaintenanceIsContract] [bit] NOT NULL,
	[MaintenanceContractFile] [nvarchar](512) NULL,
	[MaintenanceContractFileExt] [varchar](50) NULL,
	[MaintenanceFrequencyMonths] [tinyint] NULL,
	[MaintenanceFrequencyDays] [tinyint] NULL,
	[MaintenanceDefaultVendorId] [bigint] NULL,
	[MaintenanceGLAccountId] [bigint] NOT NULL,
	[MaintenanceMemo] [varchar](2000) NULL,
	[IsWarrantyRequired] [bit] NOT NULL,
	[Warranty] [bit] NOT NULL,
	[WarrantyFile] [nvarchar](512) NULL,
	[WarrantyFileExt] [varchar](50) NULL,
	[WarrantyCompany] [varchar](30) NULL,
	[WarrantyStartDate] [datetime2](7) NULL,
	[WarrantyEndDate] [datetime2](7) NULL,
	[WarrantyStatus] [varchar](30) NULL,
	[UnexpiredTimeMonths] [tinyint] NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Asset] PRIMARY KEY CLUSTERED 
(
	[AssetRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_IsDepreciable]  DEFAULT ((0)) FOR [IsDepreciable]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_IsIntangible]  DEFAULT ((0)) FOR [IsIntangible]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_CalibrationRequired]  DEFAULT ((0)) FOR [CalibrationRequired]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_IsSerialized]  DEFAULT ((0)) FOR [IsSerialized]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_CertificationRequired]  DEFAULT ((0)) FOR [CertificationRequired]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_InspectionRequired]  DEFAULT ((0)) FOR [InspectionRequired]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_VerificationRequired]  DEFAULT ((0)) FOR [VerificationRequired]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_AssetIsMaintenanceReqd]  DEFAULT ((0)) FOR [IsMaintenanceReqd]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_AssetMaintenanceIsContract]  DEFAULT ((0)) FOR [MaintenanceIsContract]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_IsWarrantyRequired]  DEFAULT ((0)) FOR [IsWarrantyRequired]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_Warranty]  DEFAULT ((0)) FOR [Warranty]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[Asset] ADD  CONSTRAINT [DF_Asset_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_AssetAcquisitionType] FOREIGN KEY([AssetAcquisitionTypeId])
REFERENCES [dbo].[AssetAcquisitionType] ([AssetAcquisitionTypeId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_AssetAcquisitionType]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_AssetIntangibleType] FOREIGN KEY([AssetIntangibleTypeId])
REFERENCES [dbo].[AssetIntangibleType] ([AssetIntangibleTypeId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_AssetIntangibleType]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_AssetTypeId] FOREIGN KEY([AssetTypeId])
REFERENCES [dbo].[AssetType] ([AssetTypeId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_AssetTypeId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_CalibrationCurrencyId] FOREIGN KEY([CalibrationCurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_CalibrationCurrencyId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_CalibrationDefaultVendorId] FOREIGN KEY([CalibrationDefaultVendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_CalibrationDefaultVendorId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_CalibrationGlAccountId] FOREIGN KEY([CalibrationGlAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_CalibrationGlAccountId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_CertificationCurrencyId] FOREIGN KEY([CertificationCurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_CertificationCurrencyId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_CertificationDefaultVendorId] FOREIGN KEY([CertificationDefaultVendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_CertificationDefaultVendorId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_CertificationGlAccountId] FOREIGN KEY([CertificationGlAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_CertificationGlAccountId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_Currency] FOREIGN KEY([CurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_Currency]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_GLAccount] FOREIGN KEY([MaintenanceGLAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_GLAccount]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_InspectionCurrencyId] FOREIGN KEY([InspectionCurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_InspectionCurrencyId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_InspectionDefaultVendorId] FOREIGN KEY([InspectionDefaultVendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_InspectionDefaultVendorId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_InspectionGlAccountId] FOREIGN KEY([InspectionGlAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_InspectionGlAccountId]
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

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_Vendor] FOREIGN KEY([MaintenanceDefaultVendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_Vendor]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_VerificationCurrencyId] FOREIGN KEY([VerificationCurrencyId])
REFERENCES [dbo].[Currency] ([CurrencyId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_VerificationCurrencyId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_VerificationDefaultVendorId] FOREIGN KEY([VerificationDefaultVendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_VerificationDefaultVendorId]
GO

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_VerificationGlAccountId] FOREIGN KEY([VerificationGlAccountId])
REFERENCES [dbo].[GLAccount] ([GLAccountId])
GO

ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_VerificationGlAccountId]
GO

