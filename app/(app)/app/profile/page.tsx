import { auth, signOut } from "@/auth";
import { PageContainer } from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const handleSignOut = async () => {
  "use server";
  await signOut();
};

const ProfilePage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <PageContainer>
      <Card className="p-6 mt-5">
        <div className="flex gap-2 items-center mb-4">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt="profile image"
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <div>
            <h2 className="font-bold">{session.user?.name}</h2>
            <p className="text-sm">{session.user?.email}</p>
          </div>
        </div>
        <form action={handleSignOut}>
          <Button>
            Signout
            <LogOut className="h-4 w-4 ml-3" />
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
};

export default ProfilePage;
