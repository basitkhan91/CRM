
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[GLAccountNodeAudit](
	[GLAccountNodeAuditId] [bigint] Identity(1,1) NOT NULL,
	[GLAccountNodeId] [bigint] NOT NULL,
	[LedgerName] [varchar](30) NOT NULL,
	[NodeCode] [varchar](100) NOT NULL,
	[NodeName] [varchar](100) NOT NULL,
	[Description] [varchar](2000) NULL,
	[ParentNodeId] [bigint] NULL,
	[LeafNodeCheck] [bit] NOT NULL,
	[GLAccountNodeType] [varchar](50) NOT NULL,
	[FSType] [varchar](30) NOT NULL,
	[LedgerNameMgmStructureId] [bigint] NOT NULL,
	[MasterCompanyId] [int] NOT NULL,
	[CreatedBy] [varchar](256) NOT NULL,
	[UpdatedBy] [varchar](256) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDelete] [bit] NOT NULL,
 CONSTRAINT [PK_GLAccountNodeaUDIT] PRIMARY KEY CLUSTERED 
(
	[GLAccountNodeaUDITId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO




