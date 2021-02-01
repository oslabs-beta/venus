DROP TABLE logs CASCADE;
DROP TABLE three_min_table CASCADE;
DROP TABLE one_hr_table CASCADE;
DROP TABLE eight_hr_table CASCADE;
DROP TABLE one_day_table CASCADE; 

CREATE TABLE logs (
    "id" serial NOT NULL,
    "redis_timestamp" varchar NOT NULL,
    "req_method" varchar NOT NULL,
    "req_host" varchar NOT NULL,
    "req_path" varchar NOT NULL,
    "req_url" varchar NOT NULL,
    "res_status_code" varchar NOT NULL,
    "res_message" varchar NOT NULL,
    "cycle_duration" varchar NOT NULL,
    PRIMARY KEY ("id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE three_min_table (
    "id" serial NOT NULL,
    "timestamp" BIGINT NOT NULL, 
    "service" varchar NOT NULL,
    "method" varchar NOT NULL,
    "availability" varchar NOT NULL,
    "response_time" varchar NOT NULL,
    "error_rate" varchar NOT NULL,
    "load" varchar NOT NULL,
    PRIMARY KEY ("id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE one_hr_table (
    "id" serial NOT NULL,
    "timestamp" BIGINT NOT NULL, 
    "service" varchar NOT NULL,
    "method" varchar NOT NULL,
    "availability" FLOAT(4) NOT NULL,
    "response_time" FLOAT(4) NOT NULL,
    "error_rate" FLOAT(4) NOT NULL,
    "load" FLOAT(4) NOT NULL,
    PRIMARY KEY ("id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE eight_hr_table (
    "id" serial NOT NULL,
    "timestamp" BIGINT NOT NULL, 
    "service" varchar NOT NULL,
    "method" varchar NOT NULL,
    "availability" FLOAT(4) NOT NULL,
    "response_time" FLOAT(4) NOT NULL,
    "error_rate" FLOAT(4) NOT NULL,
    "load" FLOAT(4) NOT NULL,
    PRIMARY KEY ("id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE one_day_table (
    "id" serial NOT NULL,
    "timestamp" BIGINT NOT NULL, 
    "service" varchar NOT NULL,
    "method" varchar NOT NULL,
    "availability" FLOAT(4) NOT NULL,
    "response_time" FLOAT(4) NOT NULL,
    "error_rate" FLOAT(4) NOT NULL,
    "load" FLOAT(4) NOT NULL,
    PRIMARY KEY ("id")
) WITH (
    OIDS=FALSE
);

--USE THIS COMMAND TO RUN THIS SCRIPT IN THE DIRECTORY WHERE THIS FILE IS LOCATED:  psql --host=DB_HOST --port=DB_PORT --username=DB_NAME --password  --dbname=DB_NAME -f SCRIPT-FILE