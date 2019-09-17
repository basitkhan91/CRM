USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[ChargeType]    Script Date: 9/17/2019 5:20:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ChargeType](
	[ChargeTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](256) NULL,
	[Memo] [varchar](256) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](50) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_ChargeType] PRIMARY KEY CLUSTERED 
(
	[ChargeTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ChargeType] ADD  CONSTRAINT [DF__ChargesTyp__Name__68BE4A7A]  DEFAULT (NULL) FOR [Name]
GO

ALTER TABLE [dbo].[ChargeType] ADD  CONSTRAINT [DF_ChargesTypes_MasterCompanyId]  DEFAULT ((0)) FOR [MasterCompanyId]
GO

ALTER TABLE [dbo].[ChargeType] ADD  CONSTRAINT [DF__ChargesTy__Creat__64EDB996]  DEFAULT (NULL) FOR [CreatedBy]
GO

ALTER TABLE [dbo].[ChargeType] ADD  CONSTRAINT [DF__ChargesTy__Updat__65E1DDCF]  DEFAULT (NULL) FOR [UpdatedBy]
GO

ALTER TABLE [dbo].[ChargeType] ADD  CONSTRAINT [DF__ChargesTy__Updat__66D60208]  DEFAULT (NULL) FOR [UpdatedDate]
GO

ALTER TABLE [dbo].[ChargeType] ADD  CONSTRAINT [DF_ChargesTypes_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[ChargeType] ADD  CONSTRAINT [DF__ChargesTy__IsDel__67CA2641]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[ChargeType]  WITH CHECK ADD  CONSTRAINT [FK_ChargesTypes_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[ChargeType] CHECK CONSTRAINT [FK_ChargesTypes_MasterCompany]
GO

