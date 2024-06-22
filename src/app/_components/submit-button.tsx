"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="m-4 " type="submit" disabled={pending}>
        Create
        {pending ? <div>Loading..</div> : <></>}
      </Button>
    </>
  );
}
