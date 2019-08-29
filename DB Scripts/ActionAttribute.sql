USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[ActionAttribute]    Script Date: 8/29/2019 6:04:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ActionAttribute](
	[ActionAttributeId] [bigint] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](100) NOT NULL,
	[Memo] [varchar](max) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDelete] [bit] NOT NULL,
 CONSTRAINT [PK_ActionAttribute] PRIMARY KEY CLUSTERED 
(
	[ActionAttributeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_ActionAttribute_codes] UNIQUE NONCLUSTERED 
(
	[Description] ASC,
	[MasterCompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[ActionAttribute]  WITH CHECK ADD  CONSTRAINT [FK_ActionAttribute_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[ActionAttribute] CHECK CONSTRAINT [FK_ActionAttribute_MasterCompany]
GO

