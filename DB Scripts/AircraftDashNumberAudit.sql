USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AircraftDashNumberAudit]    Script Date: 8/29/2019 6:07:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AircraftDashNumberAudit](
	[DashNumberAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[DashNumberId] [bigint] NOT NULL,
	[AircraftTypeId] [int] NULL,
	[AircraftModelId] [bigint] NULL,
	[DashNumber] [varchar](250) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
	[Memo] [varchar](2000) NULL,
 CONSTRAINT [PK_AircraftDashNumberAudit] PRIMARY KEY CLUSTERED 
(
	[DashNumberAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AircraftDashNumberAudit]  WITH CHECK ADD  CONSTRAINT [FK_AircraftDashNumberAudit_AircraftDashNumber] FOREIGN KEY([DashNumberId])
REFERENCES [dbo].[AircraftDashNumber] ([DashNumberId])
GO

ALTER TABLE [dbo].[AircraftDashNumberAudit] CHECK CONSTRAINT [FK_AircraftDashNumberAudit_AircraftDashNumber]
GO

