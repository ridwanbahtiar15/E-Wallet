CREATE TABLE "fintech".users IF NOT EXISTS (
	id serial4 NOT NULL,
	photo_profile text NULL,
	full_name varchar(255) NULL,
	email varchar(100) NOT NULL,
	pwd varchar(100) NULL,
	pin int4 NULL,
	phone_number varchar(25) NULL,
	otp int4 NOT NULL,
	isactivate bool NOT NULL DEFAULT false,
	newsletter bool NOT NULL DEFAULT false,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	CONSTRAINT pk_users PRIMARY KEY (id),
	CONSTRAINT users_email_key UNIQUE (email)
);