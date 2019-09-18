USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[CapabilityType]    Script Date: 9/17/2019 5:19:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CapabilityType](
	[CapabilityTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CapabilityType] PRIMARY KEY CLUSTERED 
(
	[CapabilityTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CapabilityType] ADD  CONSTRAINT [DF_CapabilityType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[CapabilityType] ADD  CONSTRAINT [DF_CapabilityType_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[CapabilityType]  WITH CHECK ADD  CONSTRAINT [FK_CapabilityType_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[CapabilityType] CHECK CONSTRAINT [FK_CapabilityType_MasterCompany]
GO

