SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Stockline](
	[StockLineId] bigint	IDENTITY(1,1) NOT NULL,
	[PartNumber]	varchar(50)	NULL,
	[StockLineNumber]	varchar(50)	NULL,
	[StocklineMatchKey]	varchar(100)	NULL,
	[ControlNumber]	varchar	(50)	NULL,
	[ItemMasterId]	bigint		NULL,
	[Quantity]	int		NULL,	
	[QtyReserved]	int		NULL,
	[QtyIssued]	int	NULL,
	[ConditionId]	bigint	NULL,
	[SerialNumber]	varchar(30)	NULL,
	[ShelfLife]	bit	NULL,
	[ShelfLifeExpirationDate]	datetime2(7) NULL,
	[WarehouseId]	bigint	NULL,
	[LocationId]	bigint	NULL,
	[ObtainFrom]	varchar	(50)	NULL,
	[Owner]	varchar	(30)	NULL,
	[TraceableTo]	varchar	(50)	NULL,
	[ManufacturerId]	bigint	NULL,
	[Manufacturer]	varchar(50)	NULL,
	[ManufacturerLotNumber]	varchar(50)	NULL,
	[ManufacturingDate]	datetime2(7)	NULL,
	[ManufacturingBatchNumber]	varchar(50)	NULL,
	[PartCertificationNumber]	varchar(50)	NULL,
	[CertifiedBy]	varchar(50)	NULL,
	[CertifiedDate]	datetime2(7)	NULL,
	[TagDate]	datetime2(7)	NULL,
	[TagType]	varchar(30)	NULL,
	[CertifiedDueDate]	datetime2(7)	NULL,
	[CalibrationMemo]	varchar	(2000)	NULL,
	[OrderDate]	datetime2	(7)	NULL,
	[PurchaseOrderId]	bigint	NULL,
	[PurchaseOrderUnitCost]	decimal	(9)	NULL,
	[InventoryUnitCost]	decimal	(9)	NULL,
	[RepairOrderId]	bigint	NULL,
	[RepairOrderUnitCost]	decimal	(9)	NULL,
	[ReceivedDate]	datetime2	(7)	NULL,
	[ReceiverNumber]	varchar	(50)	NULL,
	[ReconciliationNumber]	varchar	(50)	NULL,
	[UnitSalesPrice]	decimal	(9)	NULL,
	[CoreUnitCost]	decimal	(9)	NULL,
	[GLAccountId]	bigint	NULL,
	[AssetId]	bigint	NULL,
	[IsHazardousMaterial]	bit	NULL,
	[IsPMA]	bit	NULL,
	[IsDER]	bit	NULL,
	[OEM]	bit	NULL,
	--[Memo]	varchar	(-1)	NULL,
	[ManagementStructureEntityId]	bigint	NULL,
	[LegalEntityId]	bigint	NULL,
	[MasterCompanyId]	int	NOT NULL,
	[CreatedBy]	varchar	(256)	NULL,
	[UpdatedBy]	varchar	(256)	NULL,
	[CreatedDate]	datetime2	NULL,
	[UpdatedDate]	datetime2	NULL,
	[isSerialized]	bit	NULL,
	[ShelfId]	bigint	NULL,
	[BinId]	bigint	NULL,
	[SiteId]	bigint	NULL,
	[ObtainFromType]	int	NULL,
	[OwnerType]	int	NULL,
	[TraceableToType]	int	NULL,
	[UnitCostAdjustmentReasonTypeId]	int	NULL,
	[UnitSalePriceAdjustmentReasonTypeId]	int	NULL,
	[IdNumber]	varchar	(100)	NULL,
	[QuantityToReceive]	int	NULL,
	[PurchaseOrderExtendedCost]	decimal	(9)	NOT NULL,
	[ManufacturingTrace]	nvarchar	(400)	NULL,
	[ExpirationDate]	datetime2	NULL,
	[AircraftTailNumber]	nvarchar	(400)	NULL,
	[ShippingViaId]	bigint	NULL,
	[EngineSerialNumber]	nvarchar	(400)	NULL,
	[QuantityRejected]	int	NOT NULL,
	[PurchaseOrderPartRecordId]	bigint	NULL,
	[ShippingAccount]	nvarchar	(400)	NULL,
	[ShippingReference]	nvarchar	(400)	NULL,
	[TimeLifeCyclesId]	bigint	NULL,
	[TimeLifeDetailsNotProvided]	bit	NOT NULL,
	[BlackListed]	bit		NOT NULL Default 0,
	[BlackListedReason]	varchar(500)	NULL,
	[Incident]	bit		NOT NULL Default 0,
	[IncidentReason]	varchar(500)	NULL,
	[Accident]	bit		NOT NULL Default 0,
	[AccidentReason]	varchar(500)	NULL	

 CONSTRAINT [PK_Stockline] PRIMARY KEY CLUSTERED 
(
	[StockLineId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Stockline]  WITH CHECK ADD  CONSTRAINT [FK_Stockline_ItemMasterId] FOREIGN KEY([ItemMasterId])
REFERENCES [dbo].[ItemMaster] ([ItemMasterId])

ALTER TABLE [dbo].[Stockline]  WITH CHECK ADD  CONSTRAINT [FK_Stockline_ConditionId] FOREIGN KEY([ConditionId])
REFERENCES [dbo].[Condition] ([ConditionId])

ALTER TABLE [dbo].[Stockline]  WITH CHECK ADD  CONSTRAINT [FK_Stockline_WarehouseId] FOREIGN KEY([WarehouseId])
REFERENCES [dbo].[Warehouse] ([WarehouseId])

ALTER TABLE [dbo].[Stockline]  WITH CHECK ADD  CONSTRAINT [FK_Stockline_LocationId] FOREIGN KEY([LocationId])
REFERENCES [dbo].[Location] ([LocationId])

ALTER TABLE [dbo].[Stockline]  WITH CHECK ADD  CONSTRAINT [FK_Stockline_PurchaseOrderId] FOREIGN KEY([PurchaseOrderId])
REFERENCES [dbo].[PurchaseOrder] ([PurchaseOrderId])

ALTER TABLE [dbo].[Stockline]  WITH CHECK ADD  CONSTRAINT [FK_Stockline_RepairOrderId] FOREIGN KEY([RepairOrderId])
REFERENCES [dbo].[RepairOrder] ([RepairOrderId])

ALTER TABLE [dbo].[Stockline]  WITH CHECK ADD  CONSTRAINT [FK_Stockline_MasterCompanyId] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])

ALTER TABLE [dbo].[Stockline]  WITH CHECK ADD  CONSTRAINT [FK_Stockline_ShelfId] FOREIGN KEY([ShelfId])
REFERENCES [dbo].[Shelf] ([ShelfId])

ALTER TABLE [dbo].[Stockline]  WITH CHECK ADD  CONSTRAINT [FK_Stockline_BinId] FOREIGN KEY([BinId])
REFERENCES [dbo].[Bin] ([BinId])

ALTER TABLE [dbo].[Stockline]  WITH CHECK ADD  CONSTRAINT [FK_Stockline_SiteId] FOREIGN KEY([SiteId])
REFERENCES [dbo].[Site] ([SiteId])
GO