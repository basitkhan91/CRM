ALTER TABLE [dbo].[CustomerAircraftMapping] DROP CONSTRAINT [FK_CustomerAircraftMapping_MasterCompany]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] DROP CONSTRAINT [FK_CustomerAircraftMapping_Customer]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] DROP CONSTRAINT [FK_CustomerAircraftMapping_AircraftType]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] DROP CONSTRAINT [FK_CustomerAircraftMapping_AircraftModel]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] DROP CONSTRAINT [FK_CustomerAircraftMapping_AircraftDashNumber]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] DROP CONSTRAINT [DF_CustomerAircraftMapping_Inventory]
GO

/****** Object:  Table [dbo].[CustomerAircraftMapping]    Script Date: 10/22/2019 10:38:01 AM ******/
DROP TABLE [dbo].[CustomerAircraftMapping]
GO

/****** Object:  Table [dbo].[CustomerAircraftMapping]    Script Date: 10/22/2019 10:38:01 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CustomerAircraftMapping](
	[CustomerAircraftMappingId] [bigint] IDENTITY(1,1) NOT NULL,
	[CustomerId] [bigint] NOT NULL,
	[AircraftTypeId] [int] NOT NULL,
	[AircraftModelId] [bigint] NULL,
	[DashNumberId] [bigint] NULL,
	[DashNumber] [varchar](250) NOT NULL,
	[AircraftType] [varchar](250) NOT NULL,
	[AircraftModel] [varchar](250) NOT NULL,
	[Memo] [varchar](2000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[IsDeleted] [bit] NULL,
	[Inventory] [int] NULL,
 CONSTRAINT [PK_CACMapping] PRIMARY KEY CLUSTERED 
(
	[CustomerAircraftMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [CustomerAircraftMappingConstrain] UNIQUE NONCLUSTERED 
(
	[CustomerId] ASC,
	[AircraftTypeId] ASC,
	[AircraftModelId] ASC,
	[DashNumberId] ASC,
	[MasterCompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] ADD  CONSTRAINT [DF_CustomerAircraftMapping_Inventory]  DEFAULT ((0)) FOR [Inventory]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerAircraftMapping_AircraftDashNumber] FOREIGN KEY([DashNumberId])
REFERENCES [dbo].[AircraftDashNumber] ([DashNumberId])
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] CHECK CONSTRAINT [FK_CustomerAircraftMapping_AircraftDashNumber]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerAircraftMapping_AircraftModel] FOREIGN KEY([AircraftModelId])
REFERENCES [dbo].[AircraftModel] ([AircraftModelId])
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] CHECK CONSTRAINT [FK_CustomerAircraftMapping_AircraftModel]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerAircraftMapping_AircraftType] FOREIGN KEY([AircraftTypeId])
REFERENCES [dbo].[AircraftType] ([AircraftTypeId])
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] CHECK CONSTRAINT [FK_CustomerAircraftMapping_AircraftType]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerAircraftMapping_Customer] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customer] ([CustomerId])
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] CHECK CONSTRAINT [FK_CustomerAircraftMapping_Customer]
GO

ALTER TABLE [dbo].[CustomerAircraftMapping]  WITH CHECK ADD  CONSTRAINT [FK_CustomerAircraftMapping_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[CustomerAircraftMapping] CHECK CONSTRAINT [FK_CustomerAircraftMapping_MasterCompany]
GO


