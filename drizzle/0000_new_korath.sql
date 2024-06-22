CREATE TABLE IF NOT EXISTS "testing-platform-poc_contest" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" varchar(10000),
	"problemDescription" varchar(10000),
	"difficulty" integer,
	CONSTRAINT "testing-platform-poc_contest_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testing-platform-poc_level" (
	"id" serial PRIMARY KEY NOT NULL,
	"contestId" integer,
	"graderUrl" varchar(10000),
	"inputFileUrl" varchar(10000)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testing-platform-poc_userSolution" (
	"id" serial PRIMARY KEY NOT NULL,
	"levelId" integer,
	"fileUrl" varchar(10000)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "testing-platform-poc_level" ADD CONSTRAINT "testing-platform-poc_level_contestId_testing-platform-poc_contest_id_fk" FOREIGN KEY ("contestId") REFERENCES "public"."testing-platform-poc_contest"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "testing-platform-poc_userSolution" ADD CONSTRAINT "testing-platform-poc_userSolution_levelId_testing-platform-poc_level_id_fk" FOREIGN KEY ("levelId") REFERENCES "public"."testing-platform-poc_level"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
