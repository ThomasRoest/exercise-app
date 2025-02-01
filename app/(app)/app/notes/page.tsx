import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconNotes } from "@/components/icons/IconNotes";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserNotes } from "@/data/notes";
import Link from "next/link";
import { NewNoteForm } from "./new/NoteForm";

const NotesPage = async () => {
  const notes = await getUserNotes();

  if (notes === null) {
    return <>Unavailable</>;
  }

  return (
    <>
      <PageContainer>
        <PageHeader className="justify-between">
          <div className="flex items-center gap-x-2">
            <IconNotes />
            <h1 className="font-bold">Notes</h1>
          </div>
        </PageHeader>
        <ul className="space-y-2">
          {notes.length === 0 && (
            <p className="text-sm text-slate-500 text-center">No notes</p>
          )}
          {notes.map((program) => {
            return (
              <li
                key={program.id}
                className="flex justify-between items-center rounded-md bg-white shadow-sm"
              >
                <Link
                  href={`/app/notes/${program.id}`}
                  className="w-full p-2 hover:bg-slate-100"
                >
                  {program.title}
                  <pre className="text-sm overflow-hidden">
                    {program.description}
                  </pre>
                </Link>
              </li>
            );
          })}
        </ul>
      </PageContainer>
      <FloatingActionButton>
        <NewNoteForm />
      </FloatingActionButton>
    </>
  );
};

export default NotesPage;
