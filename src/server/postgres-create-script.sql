DROP TABLE logs CASCADE; 

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

-- seed the database with an initial value
INSERT INTO logs (
  redis_timestamp, 
  req_method, 
  req_host,
  req_path,
  req_url,
  res_status_code,
  res_message,
  cycle_duration
) VALUES (
  '1611124876933-0',
  'GET', 
  'curriculum-api.codesmith.io', 
  '/messages', 
  'https://curriculum-api.codesmith.io/messages', 
  '200', 
  'OK', 
  '1232.32'
); 
