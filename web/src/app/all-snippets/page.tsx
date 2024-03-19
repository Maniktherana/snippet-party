import { env } from "@/env.mjs";
import { Snippet, columns } from "./columns";
import DataTable from "./data-table";

async function getData(): Promise<Snippet[]> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/submissions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.data.data;
  } catch (error) {
    return [];
  }
}

export default async function AllSnippets() {
  const data = await getData();

  return (
    <main className="max-w-screen-xl mx-auto font-sans">
      <div className="mt-[4rem] mx-3">
        <h1 className="font-semibold text-3xl">All Snippets</h1>
        <p className="text-md text-muted-foreground">
          View all snippets made to Code Party
        </p>
      </div>
      <div className="mt-[2rem] mx-3 font-light">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
