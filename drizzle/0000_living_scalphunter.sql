CREATE TABLE `events` (
	`user` text NOT NULL,
	`id` text NOT NULL,
	`kind` text NOT NULL,
	`correct` integer NOT NULL,
	`day` text NOT NULL,
	PRIMARY KEY(`user`, `id`)
);
--> statement-breakpoint
CREATE TABLE `words` (
	`user` text NOT NULL,
	`word` text NOT NULL,
	`translation` text NOT NULL,
	`level` text NOT NULL,
	`created` text NOT NULL,
	`correct` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`user`, `word`)
);
