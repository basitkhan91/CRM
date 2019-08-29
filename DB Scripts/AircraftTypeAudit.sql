USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[AircraftTypeAudit]    Script Date: 8/29/2019 6:10:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AircraftTypeAudit](
	[AircraftTypeAuditId] [int] IDENTITY(1,1) NOT NULL,
	[AircraftTypeId] [int] NOT NULL,
	[Description] [varchar](50) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedDate] [datetime2](7) NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[Memo] [varchar](2000) NULL,
 CONSTRAINT [PK_AircraftTypeAudit] PRIMARY KEY CLUSTERED 
(
	[AircraftTypeAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AircraftTypeAudit]  WITH CHECK ADD  CONSTRAINT [FK_AircraftTypeAudit_AircraftType] FOREIGN KEY([AircraftTypeId])
REFERENCES [dbo].[AircraftType] ([AircraftTypeId])
GO

ALTER TABLE [dbo].[AircraftTypeAudit] CHECK CONSTRAINT [FK_AircraftTypeAudit_AircraftType]
GO

