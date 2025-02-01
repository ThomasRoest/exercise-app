import { PageContainer } from "@/components/PageContainer";
import { getUserNoteById } from "@/data/notes";
import { DeleteNote } from "../components/DeleteNote";
import { EditNoteForm } from "../components/EditNoteForm";

const NotePage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const note = await getUserNoteById(params.id);
  if (!note) {
    return <>Unavailable</>;
  }

  return (
    <PageContainer>
      <div className="text-right">
        <DeleteNote note={note} />
      </div>
      <EditNoteForm note={note} />
    </PageContainer>
  );
};

export default NotePage;
