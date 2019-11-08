
/****** Object:  Table [dbo].[AddressAudit]    Script Date: 9/17/2019 4:05:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AddressAudit](
	[AddressAuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[AddressId] [bigint] NOT NULL,
	[POBox] [varchar](30) NULL,
	[Line1] [varchar](50) NULL,
	[Line2] [varchar](50) NULL,
	[Line3] [varchar](50) NULL,
	[City] [varchar](50) NULL,
	[StateOrProvince] [varchar](50) NULL,
	[PostalCode] [varchar](20) NULL,
	[CountryId] [smallint] NULL,
	[Country] [varchar](30) NULL,
	[Latitude] [decimal](12, 9) NULL,
	[Longitude] [decimal](12, 9) NULL,
	[MasterCompanyId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_AddressAudit] PRIMARY KEY CLUSTERED 
(
	[AddressAuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AddressAudit]  WITH CHECK ADD  CONSTRAINT [FK_AddressAudit_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO

ALTER TABLE [dbo].[AddressAudit] CHECK CONSTRAINT [FK_AddressAudit_Address]
GO

