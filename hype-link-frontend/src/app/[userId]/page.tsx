import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const docSnap = await getDoc(doc(db, "profiles", params.userId));
  const profile = docSnap.exists() ? docSnap.data() : null;

  if (!profile) return <p>User not found</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <p>{profile.bio}</p>
      {profile.links.map((link: any, index: number) => (
        <a key={index} href={link.url} className="block mt-2 p-2 border rounded bg-blue-500 text-white text-center">
          {link.title}
        </a>
      ))}
    </div>
  );
}