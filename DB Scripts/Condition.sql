USE [PAS_DEV]
GO

/****** Object:  Table [dbo].[Condition]    Script Date: 9/17/2019 5:21:08 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Condition](
	[ConditionId] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](50) NOT NULL,
	[Description] [varchar](100) NULL,
	[Memo] [varchar](max) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Condition] PRIMARY KEY CLUSTERED 
(
	[ConditionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_Condition_codes] UNIQUE NONCLUSTERED 
(
	[Description] ASC,
	[MasterCompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Condition] ADD  CONSTRAINT [DF_Condition_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[Condition] ADD  CONSTRAINT [DF_Condition_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

