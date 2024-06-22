"use client";
import { type Level, type UserSolution } from "@/server/db/schema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

export default function Solutions({
  level,
  solutions,
}: {
  level: Level;
  solutions: UserSolution[];
}) {
  const router = useRouter();
  const handleSolution = async (level: Level, solution: UserSolution) => {
    try {
      const response = await fetch("/api/grader", {
        method: "POST",
        body: JSON.stringify({
          graderUrl: level.graderUrl ?? "",
          inputFileUrl: level.inputFileUrl ?? "",
          solutionUrl: solution.fileUrl ?? "",
          solutionId: solution.id,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { score } = await response.json();
      console.log("SCORE IS:", score);
    } catch (e) {
      console.error(e);
    }
  };
  // const solutions = await db.query.userSolutions.findMany({
  //   where: (model, { eq }) => eq(model.levelId, level.id),
  // });
  // console.log("solutions", solutions);
  return (
    <section>
      <UploadButton
        endpoint="solutionsUploader"
        content={{ button: "Upload solution" }}
        headers={{
          levelId: level.id.toString(),
        }}
        onClientUploadComplete={() => {
          router.refresh();
        }}
      ></UploadButton>
      <Table>
        <TableCaption>All available solutions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Last score</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {solutions.map((solution) => (
            <TableRow key={solution.id}>
              <TableCell>{solution.id}</TableCell>
              <TableCell>
                <a target="_blank" href={solution.fileUrl ?? ""}>
                  Go to solution {solution.id}
                </a>
              </TableCell>
              <TableCell>{solution.lastScore}</TableCell>
              <TableCell>
                <Button onClick={() => handleSolution(level, solution)}>
                  Test
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
