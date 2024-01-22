CREATE TABLE "fintech".transaction_type IF NOT EXISTS (
	id serial4 NOT NULL,
	type_name varchar(100) NOT NULL,
	CONSTRAINT pk_transaction_type PRIMARY KEY (id)
);