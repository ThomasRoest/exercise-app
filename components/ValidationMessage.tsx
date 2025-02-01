export const ValidationMessage = ({ message }: { message?: string }) => {
  return (
    <p
      aria-live="polite"
      role="status"
      className="text-sm text-red-500 text-center"
    >
      {message}
    </p>
  );
};
