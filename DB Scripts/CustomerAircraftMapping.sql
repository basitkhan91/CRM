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

/****** Object:  Table [dbo].[CustomerAircraftMapping]    Script Date: 9/14/2019 6:20:25 PM ******/
DROP TABLE [dbo].[CustomerAircraftMapping]
GO

/****** Object:  Table [dbo].[CustomerAircraftMapping]    Script Date: 9/14/2019 6:20:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CustomerAircraftMapping](
	[CustomerAircraftMappingId] [bigint] IDENTITY(1,1) NOT NULL,
	[CustomerId] [bigint] NOT NULL,
	[AircraftTypeId] [int] NOT NULL,
	[AircraftModelId] [bigint] NOT NULL,
	[DashNumberId] [bigint] NOT NULL,
	[DashNumber] [varchar](250) NOT NULL,
	[AircraftType] [varchar](250) NOT NULL,
	[AircraftModel] [varchar](250) NOT NULL,
	[Memo] [varchar](2000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[Inventory] [int] NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[IsDeleted] [bit] NULL,
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


