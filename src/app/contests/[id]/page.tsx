import { db } from "@/server/db";
import EditForm from "./_components/edit-form";

export default async function ContestView({
  params: { id },
}: {
  params: { id: number };
}) {
  const contest = await db.query.contests.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!contest) {
    throw new Error("Contest not available");
  }

  const levels = await db.query.levels.findMany({
    where: (model, { eq }) => eq(model.contestId, id),
    orderBy: (model) => model.index,
  });

  const solutions = await db.query.userSolutions.findMany({
    orderBy: (model) => model.id,
  });

  return (
    <main className="mx-auto flex max-w-screen-xl flex-col gap-8 p-8">
      <h1 className="text-4xl">{contest.name}</h1>
      <section className="flex flex-row gap-8 rounded-2xl border border-solid border-gray-400 p-4">
        <article className="flex-1">
          <h2 className="text-2xl">Contest description</h2>
          <p className="py-2">{contest.description}</p>
        </article>
        <article className="flex-1">
          <h2 className="text-2xl">Problem description</h2>
          <p className="py-2">{contest.problemDescription}</p>
        </article>
      </section>
      <EditForm contest={contest} levels={levels} solutions={solutions} />
    </main>
  );
}
