import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    // Use Tailwind CSS classes for flexbox centering and min-height
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  );
}
