import { LoadingSpinner } from "./LoadingSpinner";
import { PageContainer } from "./PageContainer";

export const LoadingPage = () => {
  return (
    <PageContainer className="min-h-[50%] flex justify-center items-center">
      <LoadingSpinner />
    </PageContainer>
  );
};
