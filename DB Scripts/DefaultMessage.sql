USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[DefaultMessage]    Script Date: 9/17/2019 5:25:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DefaultMessage](
	[DefaultMessageId] [bigint] IDENTITY(1,1) NOT NULL,
	[DefaultMessageCode] [varchar](50) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[Message] [varchar](max) NOT NULL,
	[Memo] [varchar](max) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_DefaultMessage] PRIMARY KEY CLUSTERED 
(
	[DefaultMessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_DefaultMessage_codes] UNIQUE NONCLUSTERED 
(
	[DefaultMessageCode] ASC,
	[MasterCompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[DefaultMessage] ADD  CONSTRAINT [DF_DefaultMessage_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[DefaultMessage] ADD  CONSTRAINT [DF_DefaultMessage_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[DefaultMessage]  WITH CHECK ADD  CONSTRAINT [FK_DefaultMessage_MasterCompany] FOREIGN KEY([MasterCompanyId])
REFERENCES [dbo].[MasterCompany] ([MasterCompanyId])
GO

ALTER TABLE [dbo].[DefaultMessage] CHECK CONSTRAINT [FK_DefaultMessage_MasterCompany]
GO

