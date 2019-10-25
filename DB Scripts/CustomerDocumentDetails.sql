/****** Object:  Table [dbo].[Document]    Script Date: 10/24/2019 9:49:37 AM ******/
DROP TABLE [dbo].[CustomerDocumentDetail]
GO

/****** Object:  Table [dbo].[Document]    Script Date: 10/24/2019 9:49:37 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CustomerDocumentDetails](
	[CustomerDocumentDetailId] [bigint] IDENTITY(1,1) NOT NULL,
	[CustomerId] [bigint] NOT NULL,
	[AttachmentId] [bigint] NOT NULL,
	[DocName] [varchar](100) NULL,
	[DocMemo] [varchar](100) NULL,
	[DocDescription] [varchar](100) NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_CustomerDocumentDetails] PRIMARY KEY CLUSTERED 
(
	[CustomerDocumentDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_CustomerDocumentDeatails] UNIQUE NONCLUSTERED 
(
	[CustomerId] ASC,
	[MasterCompanyId] ASC,
	[AttachmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


