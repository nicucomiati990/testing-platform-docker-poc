import { db } from "@/server/db";
import { userSolutions } from "@/server/db/schema";
import { execSync } from "child_process";
import { eq } from "drizzle-orm";
export const dynamic = "force-dynamic"; // defaults to auto

export const POST = async (request: Request) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { graderUrl, inputFileUrl, solutionUrl, solutionId } =
    await request.json();
  const output = execSync(
    `./scripts/run-grader.sh ${graderUrl} ${inputFileUrl} ${solutionUrl}`,
    { encoding: "utf-8" },
  ); // the default is 'buffer'

  console.log("DOCKER OUTPUT", output);

  const outputScore = Number(output);

  if (isNaN(outputScore)) {
    console.error("Output score invalid");
    return Response.error();
  }

  await db
    .update(userSolutions)
    .set({
      lastScore: outputScore,
    })
    .where(eq(userSolutions.id, solutionId as number));

  return Response.json({
    score: outputScore,
  });
};
