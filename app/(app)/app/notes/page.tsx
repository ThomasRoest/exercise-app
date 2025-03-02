import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconNotes } from "@/components/icons/IconNotes";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserNotes } from "@/data/notes";
import { NotebookText, NotepadText } from "lucide-react";
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
                className="rounded-md bg-white shadow-sm hover:shadow transition-all duration-200 border border-slate-100"
              >
                <Link
                  href={`/app/notes/${program.id}`}
                  className="p-3 w-full hover:bg-slate-50 flex items-center gap-x-2"
                >
                  <NotepadText className="h-5 w-5 text-slate-400" />
                  <div>
                    <div className="text-sm text-slate-800">
                      {program.title}
                    </div>
                    {program.createdAt && (
                      <div className="text-xs text-slate-500">
                        {new Date(program.createdAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
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
