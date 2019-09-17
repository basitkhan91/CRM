USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AircraftModelAudit]    Script Date: 9/17/2019 4:06:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AircraftModelAudit](
	[AircraftModelAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AircraftModelId] [bigint] NOT NULL,
	[AircraftTypeId] [int] NULL,
	[ModelName] [varchar](50) NULL,
	[WingType] [varchar](30) NULL,
	[Memo] [varchar](2000) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_AircraftModelAudit] PRIMARY KEY CLUSTERED 
(
	[AircraftModelAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AircraftModelAudit]  WITH CHECK ADD  CONSTRAINT [FK_AircraftModelAudit_AircraftModel] FOREIGN KEY([AircraftModelId])
REFERENCES [dbo].[AircraftModel] ([AircraftModelId])
GO

ALTER TABLE [dbo].[AircraftModelAudit] CHECK CONSTRAINT [FK_AircraftModelAudit_AircraftModel]
GO

