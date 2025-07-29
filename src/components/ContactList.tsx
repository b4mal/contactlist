"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Contact {
  _id: string;
  contName: string;
  contNumber: string;
  tag: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filtered, setFiltered] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");

  const { data: session, status } = useSession();
  useEffect(() => {
    // if(status !== "authenticated") return;

    fetch(`/api/contacts?userId=${session?.user.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data: Contact[]) => {
        setContacts(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Fetch error: ", err.message));
  }, [status, session?.user.id]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      contacts.filter(
        (c) =>
          c.contName.toLowerCase().includes(q) ||
          c.contNumber.toLowerCase().includes(q) ||
          c.tag.toLowerCase().includes(q)
      )
    );
  }, [search, contacts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact?")) return;
    const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    if (res.ok) setContacts((c) => c.filter((x) => x._id !== id));
    else alert("failed to delete");
  };
  const handleEdit = async (id: string) => {
    const contName = prompt(
      "New name?",
      contacts.find((x) => x._id === id)?.contName
    );
    const contNumber = prompt(
      "New number?",
      contacts.find((x) => x._id === id)?.contNumber
    );
    const tag = prompt("New tag?", contacts.find((x) => x._id === id)?.tag);

    if (!contName || !contNumber || !tag) return;

    const res = await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contName, contNumber, tag }),
    });

    if (res.ok) {
      setContacts((c) =>
        c.map((x) => (x._id === id ? { ...x, contName, contNumber, tag } : x))
      );
    } else {
      alert("Update failed");
    }
  };

  return (
    <>
      {!contacts.length ? (
        <p className="text-2xl text-center text-gray-500">
          No contacts found. <br />
          <Link href={"/create-contact"} className="text-blue-500">
            Start adding now.
          </Link>
        </p>
      ) : (
        <div className="w-ful">
          {/* Search box */}
          <div className="text-center mb-3">
            <input
              type="text"
              placeholder="Search by name, number or tag"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-4 py-2 mb-6 w-xl"
            />
          </div>

          {/* List of contacts */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((c) => (
              <div
                key={c._id}
                className="border rounded-lg p-4 shadow-sm hover:bg-amber-100 hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="">
                  <p className="font-semibold text-lg">{c.contName}</p>
                  <p className="text-gray-600">{c.contNumber}</p>
                  <p className="mt-2 inline-block px-2 py-1 bg-gray-200 rounded-full text-xs">
                    {c.tag}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="mt-4 flex justify-end gap-2">
                  <button className="blk_btn" onClick={() => handleEdit(c._id)}>
                    Update
                  </button>
                  <button
                    className="wht_btn"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactList;
