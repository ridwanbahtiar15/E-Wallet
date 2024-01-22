CREATE TABLE "fintech".user_balance IF NOT EXISTS (
	id serial4 NOT NULL,
	balance int4 NOT NULL DEFAULT 0,
	user_id int4 NOT NULL,
	updated_at timestamp NULL,
	CONSTRAINT pk_user_balance PRIMARY KEY (id)
);


-- "fintech".user_balance foreign keys

ALTER TABLE "fintech".user_balance ADD CONSTRAINT user_balance_user_id_fkey FOREIGN KEY (user_id) REFERENCES "fintech".users(id);