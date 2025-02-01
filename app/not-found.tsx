import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/PageContainer";

const NotFoundPage = () =>  {
  return (
    <PageContainer>
      <div className="text-center my-10">
        <h1 className="text-6xl font-extrabold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-purple-600">
            404
          </span>
        </h1>
        <p className="text-2xl mt-4 mb-8 font-semibold">Oops! Page not found</p>
        <p className="mb-8 text-gray-600">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Button asChild variant="default">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </PageContainer>
  );
}

export default NotFoundPage;