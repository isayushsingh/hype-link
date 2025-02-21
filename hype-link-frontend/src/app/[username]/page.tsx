import { getUserByUsername } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function UserPage({ params }: { params: { username: string } }) {
  const { username } = params;

  // Fetch user data from DB
  const user = await getUserByUsername(username);

  if (!user) {
    return notFound(); // Show 404 page if user doesn't exist
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
      <h1 className="text-2xl font-bold mt-2">{user.name}</h1>
      <p className="text-gray-600">{user.bio}</p>

      <div className="mt-4 w-full max-w-md">
        {user.links.map((link: { title: string; url: string }, index: number) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-blue-500 text-white text-center p-3 rounded-lg my-2"
          >
            {link.title}
          </a>
        ))}
      </div>
    </main>
  );
}