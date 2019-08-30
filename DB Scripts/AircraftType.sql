USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AircraftType]    Script Date: 8/29/2019 6:09:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AircraftType](
	[AircraftTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[Memo] [varchar](2000) NULL,
 CONSTRAINT [PK_Table_1] PRIMARY KEY CLUSTERED 
(
	[AircraftTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AircraftType] ADD  CONSTRAINT [DF__AircraftT__Maste__24541194]  DEFAULT ((1)) FOR [MasterCompanyId]
GO

ALTER TABLE [dbo].[AircraftType] ADD  CONSTRAINT [DF__AircraftT__IsAct__263C5A06]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[AircraftType] ADD  CONSTRAINT [DF__AircraftT__IsDel__27307E3F]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[AircraftType] ADD  CONSTRAINT [DF__AircraftT__Creat__254835CD]  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[AircraftType]  WITH CHECK ADD  CONSTRAINT [FK_AircraftType_AircraftType] FOREIGN KEY([AircraftTypeId])
REFERENCES [dbo].[AircraftType] ([AircraftTypeId])
GO

ALTER TABLE [dbo].[AircraftType] CHECK CONSTRAINT [FK_AircraftType_AircraftType]
GO

ALTER TABLE [dbo].[AircraftType]  WITH CHECK ADD  CONSTRAINT [FK_AircraftType_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[AircraftType] CHECK CONSTRAINT [FK_AircraftType_MasterCompany]
GO

