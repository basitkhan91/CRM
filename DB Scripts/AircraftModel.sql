USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AircraftModel]    Script Date: 9/17/2019 4:06:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AircraftModel](
	[AircraftModelId] [bigint] IDENTITY(1,1) NOT NULL,
	[AircraftTypeId] [int] NOT NULL,
	[ModelName] [varchar](50) NOT NULL,
	[WingType] [varchar](30) NULL,
	[Memo] [varchar](2000) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AircraftModel] PRIMARY KEY CLUSTERED 
(
	[AircraftModelId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AircraftModel] ADD  CONSTRAINT [DF__AircraftM__Maste__208380B0]  DEFAULT ((1)) FOR [MasterCompanyId]
GO

ALTER TABLE [dbo].[AircraftModel] ADD  CONSTRAINT [DF__AircraftM__Creat__2177A4E9]  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[AircraftModel] ADD  CONSTRAINT [DF__AircraftM__IsAct__235FED5B]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AircraftModel] ADD  CONSTRAINT [DF__AircraftM__IsDel__226BC922]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AircraftModel]  WITH CHECK ADD  CONSTRAINT [FK_AircraftModel_AircraftType] FOREIGN KEY([AircraftTypeId])
REFERENCES [dbo].[AircraftType] ([AircraftTypeId])
GO

ALTER TABLE [dbo].[AircraftModel] CHECK CONSTRAINT [FK_AircraftModel_AircraftType]
GO

ALTER TABLE [dbo].[AircraftModel]  WITH CHECK ADD  CONSTRAINT [FK_AircraftModel_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AircraftModel] CHECK CONSTRAINT [FK_AircraftModel_MasterCompany]
GO

