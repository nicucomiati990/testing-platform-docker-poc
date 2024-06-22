import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "./_components/submit-button";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { contests, levels } from "@/server/db/schema";

/**
 docker flow:
 1. upload file to uploadthing
 2. create correct rows in db
 3. when the grader docker is ran it copies the file and run it 
 4. 
 *  */

export default function CreatePage() {
  const handleFormSubmit = async (formData: FormData) => {
    "use server";

    const rawFormData = {
      name: formData.get("name")?.toString(),
      contestDescription: formData.get("contest-description")?.toString(),
      problemDescription: formData.get("problem-description")?.toString(),
      difficulty: formData.get("difficulty")?.toString(),
    };
    console.log("SUBMITTED FORM DATA", rawFormData);

    const result = await db
      .insert(contests)
      .values({
        name: rawFormData.name ?? "",
        description: rawFormData.contestDescription,
        problemDescription: rawFormData.problemDescription,
        difficulty: Number(rawFormData.difficulty),
      })
      .returning();

    // also add 3 levels for that contest
    const insertedContestId = result[0]?.id;

    if (!insertedContestId) {
      console.error("Contest was not inserted for some reason");
    }

    await db.insert(levels).values({
      index: 1,
      contestId: insertedContestId,
    });
    await db.insert(levels).values({
      index: 2,
      contestId: insertedContestId,
    });
    await db.insert(levels).values({
      index: 3,
      contestId: insertedContestId,
    });
  };
  return (
    <main className="light:text-black flex min-h-screen items-center justify-center gap-4 dark:text-white">
      <section className="w-screen-md flex flex-col self-center rounded-2xl border-2 border-solid border-gray-800 p-8">
        <h1 className="text-4xl">Create a contest</h1>
        <form
          action={handleFormSubmit}
          className="flex flex-col items-stretch justify-stretch gap-4 p-4"
        >
          <div>
            <Label htmlFor="name">Contest name</Label>
            <Input required name="name" placeholder="Name.." />
          </div>

          <div>
            <Label htmlFor="contest-description">Contest Description</Label>
            <Textarea
              required
              name="contest-description"
              placeholder="Description.."
            />
          </div>

          <div>
            <Label htmlFor="problem-description">Problem Description</Label>
            <Textarea
              required
              name="problem-description"
              placeholder="Description.."
            />
          </div>

          <div>
            <Label htmlFor="difficulty">Difficulty</Label>
            <div className="flex flex-row gap-2">
              <Select required name="difficulty">
                <SelectTrigger>
                  <SelectValue placeholder="Select a difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">👶 Easy</SelectItem>
                  <SelectItem value="2">🤩 Medium</SelectItem>
                  <SelectItem value="3">🤯 Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SubmitButton />
        </form>
      </section>
      <section>or</section>
      <section>
        <Button asChild>
          <Link href="/contests">View all contests</Link>
        </Button>
      </section>
    </main>
  );
}
