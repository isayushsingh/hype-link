"use client";
import { useState } from "react";
import { db, auth, logOut } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

interface Link {
  url: string;
  title: string;
}

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([{ url: "", title: "" }]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleAddLink = () => {
    setLinks([...links, { url: "", title: "" }]);
  };

  const handleSaveProfile = async () => {
    if (!auth.currentUser) return;
    await setDoc(doc(db, "profiles", auth.currentUser.uid), { name, bio, links });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Customize Your Profile</h1>
      <input className="w-full p-2 border rounded mt-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea className="w-full p-2 border rounded mt-2" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />

      <h2 className="text-xl mt-4">Your Links</h2>
      {links.map((link, index) => (
        <div key={index} className="flex gap-2 mt-2">
          <input className="flex-1 p-2 border rounded" placeholder="Title" value={link.title} onChange={(e) => {
            const newLinks = [...links];
            newLinks[index].title = e.target.value;
            setLinks(newLinks);
          }} />
          <input className="flex-1 p-2 border rounded" placeholder="URL" value={link.url} onChange={(e) => {
            const newLinks = [...links];
            newLinks[index].url = e.target.value;
            setLinks(newLinks);
          }} />
        </div>
      ))}

      <button className="mt-4 px-4 py-2 bg-gray-600 text-white rounded" onClick={handleAddLink}>+ Add Link</button>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded ml-2" onClick={handleSaveProfile}>Save Profile</button>
      <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded ml-2" onClick={logOut}>Logout</button>
    </div>
  );
}