import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/server/db";

const difficultyFormat = (difficulty: number | null) => {
  switch (difficulty) {
    case 1:
      return "Easy";
    case 2:
      return "Medium";
    case 3:
      return "Hard";
    default:
      return "";
  }
};

const GoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
);

export default async function ContestsPage() {
  const contests = await db.query.contests.findMany({
    orderBy: (c) => c.name,
  });

  return (
    <Table>
      <TableCaption>All available contests</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Contest name</TableHead>
          <TableHead>Contest description</TableHead>
          <TableHead>Problem description</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead className="flex items-center justify-center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contests.map((contestData) => (
          <TableRow key={contestData.id}>
            <TableCell>{contestData.name}</TableCell>
            <TableCell>{contestData.description}</TableCell>
            <TableCell>{contestData.problemDescription}</TableCell>
            <TableCell>{difficultyFormat(contestData.difficulty)}</TableCell>
            <TableCell className="flex justify-center">
              <Link href={`/contests/${contestData.id}`}>
                <GoIcon />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
