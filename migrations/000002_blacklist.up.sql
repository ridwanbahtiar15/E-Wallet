CREATE TABLE "fintech".blacklist IF NOT EXISTS (
	id serial4 NOT NULL,
	blacklist_token text NOT NULL,
	CONSTRAINT pk_blacklist PRIMARY KEY (id)
);