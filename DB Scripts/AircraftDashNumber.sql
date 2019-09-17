USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AircraftDashNumber]    Script Date: 9/17/2019 4:06:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AircraftDashNumber](
	[DashNumberId] [bigint] IDENTITY(1,1) NOT NULL,
	[AircraftTypeId] [int] NOT NULL,
	[AircraftModelId] [bigint] NOT NULL,
	[DashNumber] [varchar](250) NOT NULL,
	[Memo] [varchar](2000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AircraftDashNumber] PRIMARY KEY CLUSTERED 
(
	[DashNumberId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UC_DashNumer] UNIQUE NONCLUSTERED 
(
	[AircraftTypeId] ASC,
	[AircraftModelId] ASC,
	[DashNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AircraftDashNumber] ADD  CONSTRAINT [DF_AircraftDashNumber_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AircraftDashNumber] ADD  CONSTRAINT [DF_AircraftDashNumber_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AircraftDashNumber]  WITH CHECK ADD  CONSTRAINT [FK_AircraftDashNumber_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AircraftDashNumber] CHECK CONSTRAINT [FK_AircraftDashNumber_MasterCompany]
GO

ALTER TABLE [dbo].[AircraftDashNumber]  WITH CHECK ADD  CONSTRAINT [FK_DashNumber_AircraftModel] FOREIGN KEY([AircraftModelId])
REFERENCES [dbo].[AircraftModel] ([AircraftModelId])
GO

ALTER TABLE [dbo].[AircraftDashNumber] CHECK CONSTRAINT [FK_DashNumber_AircraftModel]
GO

ALTER TABLE [dbo].[AircraftDashNumber]  WITH CHECK ADD  CONSTRAINT [FK_DashNumber_AircraftType] FOREIGN KEY([AircraftTypeId])
REFERENCES [dbo].[AircraftType] ([AircraftTypeId])
GO

ALTER TABLE [dbo].[AircraftDashNumber] CHECK CONSTRAINT [FK_DashNumber_AircraftType]
GO

