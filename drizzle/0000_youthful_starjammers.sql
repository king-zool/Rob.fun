CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`tokenId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`tokenId` int NOT NULL,
	`balance` decimal(38,18) NOT NULL,
	`averageEntryPrice` decimal(38,18) NOT NULL,
	`totalInvested` decimal(38,18) NOT NULL,
	`unrealizedPnL` decimal(38,18) NOT NULL,
	`realizedPnL` decimal(38,18) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portfolios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tokenAddress` varchar(42) NOT NULL,
	`bondingCurveAddress` varchar(42) NOT NULL,
	`creatorId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`symbol` varchar(20) NOT NULL,
	`description` text,
	`logoUrl` varchar(500),
	`bannerUrl` varchar(500),
	`website` varchar(500),
	`twitter` varchar(500),
	`telegram` varchar(500),
	`discord` varchar(500),
	`curveType` enum('linear','exponential','sigmoid','logarithmic') DEFAULT 'linear',
	`graduationTarget` decimal(38,18) NOT NULL,
	`currentPrice` decimal(38,18) NOT NULL,
	`marketCap` decimal(38,18) NOT NULL,
	`totalSupply` decimal(38,18) NOT NULL,
	`totalTokensSold` decimal(38,18) NOT NULL,
	`totalReserve` decimal(38,18) NOT NULL,
	`hasGraduated` boolean DEFAULT false,
	`holders` int DEFAULT 0,
	`volume24h` decimal(38,18) DEFAULT '0',
	`priceChange24h` decimal(10,2) DEFAULT '0',
	`trustScore` int DEFAULT 50,
	`bondingCurveProgress` int DEFAULT 0,
	`deployedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `tokens_tokenAddress_unique` UNIQUE(`tokenAddress`),
	CONSTRAINT `tokens_bondingCurveAddress_unique` UNIQUE(`bondingCurveAddress`)
);
--> statement-breakpoint
CREATE TABLE `trades` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tokenId` int NOT NULL,
	`trader` varchar(42) NOT NULL,
	`type` enum('buy','sell') NOT NULL,
	`amount` decimal(38,18) NOT NULL,
	`price` decimal(38,18) NOT NULL,
	`ethAmount` decimal(38,18) NOT NULL,
	`transactionHash` varchar(66),
	`blockNumber` bigint,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `trades_id` PRIMARY KEY(`id`),
	CONSTRAINT `trades_transactionHash_unique` UNIQUE(`transactionHash`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
