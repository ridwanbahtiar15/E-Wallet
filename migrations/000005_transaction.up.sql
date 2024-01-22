CREATE TABLE "fintech"."transaction" IF NOT EXISTS (
	id varchar(100) NOT NULL,
	from_user_id int4 NOT NULL,
	to_user_id int4 NOT NULL,
	transaction_type_id int4 NOT NULL,
	transaction_amount int4 NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	to_deleted_at timestamp NULL,
	note text NULL,
	payment_type_id int4 NULL,
	from_deleted_at timestamp NULL,
	CONSTRAINT pk_transaction PRIMARY KEY (id)
);

ALTER TABLE "fintech"."transaction" ADD CONSTRAINT transaction_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES "fintech".users(id);
ALTER TABLE "fintech"."transaction" ADD CONSTRAINT transaction_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES "fintech".users(id);
ALTER TABLE "fintech"."transaction" ADD CONSTRAINT transaction_transaction_type_id_fkey FOREIGN KEY (transaction_type_id) REFERENCES "fintech".transaction_type(id);