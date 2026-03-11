import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreatePostClient from "@/components/posts/CreatePostClient";

export default async function CreatePostPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  return (
    <main className="page-content">
      <div style={{ paddingTop: 48 }}>
        <CreatePostClient />
      </div>
    </main>
  );
}
