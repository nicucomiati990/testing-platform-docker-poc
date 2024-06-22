"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type Contest,
  type Level,
  type UserSolution,
} from "@/server/db/schema";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import Solutions from "./solutions";
import { useMemo, useState } from "react";

export default function EditForm({
  contest,
  levels,
  solutions,
}: {
  contest: Contest;
  levels: Level[];
  solutions: UserSolution[];
}) {
  const router = useRouter();
  // console.log("contest is", contest);
  const [activeLevel, setActiveLevel] = useState(levels[0]?.id ?? -1);

  const handleLevelChange = (level: string) => {
    const levelId = levels.find((l) => l.index?.toString() === level)?.id;

    if (levelId) {
      setActiveLevel(levelId);
    }
  };

  const activeSolutions = useMemo(() => {
    return solutions.filter((sol) => sol.levelId === activeLevel);
  }, [activeLevel, solutions]);

  // console.log("edit form", activeLevel, levels, solutions);
  return (
    <>
      {levels.length === 0 ? "No levels. please add" : ""}
      <Tabs onValueChange={handleLevelChange} defaultValue="1" className="">
        <TabsList>
          {levels.map((level) => (
            <TabsTrigger
              value={(level.index ?? 0).toString()}
              key={level.index}
            >
              Level {level.index}
            </TabsTrigger>
          ))}
        </TabsList>
        {levels.map((level) => (
          <TabsContent value={(level.index ?? 0).toString()} key={level.index}>
            <Tabs defaultValue="level">
              <TabsList>
                <TabsTrigger value="level">Edit Level</TabsTrigger>
                <TabsTrigger value="solution">Solutions</TabsTrigger>
              </TabsList>
              <TabsContent value="level">
                <section className="flex flex-row items-center gap-4 py-8">
                  {level.graderUrl ? (
                    <a target="_blank" href={level.graderUrl}>
                      Grader URL
                    </a>
                  ) : (
                    <div>No grader available</div>
                  )}
                  <h2>Upload grader file</h2>
                  <UploadButton
                    endpoint="graderFileUploader"
                    headers={{
                      contestId: contest.id.toString(),
                      levelId: level.id.toString(),
                    }}
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      router.refresh();
                      console.log("Files: ", res);
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  ></UploadButton>
                </section>
                <section className="flex flex-row items-center gap-4 py-8">
                  {level.inputFileUrl ? (
                    <a target="_blank" href={level.inputFileUrl}>
                      Input file URL
                    </a>
                  ) : (
                    <div>No input file available</div>
                  )}
                  <h2>Upload input file</h2>
                  <UploadButton
                    endpoint="inputFileUploader"
                    headers={{
                      contestId: contest.id.toString(),
                      levelId: level.id.toString(),
                    }}
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      router.refresh();
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  ></UploadButton>
                </section>
              </TabsContent>

              <TabsContent value="solution">
                <Solutions level={level} solutions={activeSolutions} />
              </TabsContent>
            </Tabs>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
