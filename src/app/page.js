'use client';

import { useEffect, useState } from 'react';

const LINKDING_API = "/api/linkding";
const API_TOKEN = "b8d894160ebe21bb45d7305ed5cdf0155b6cc4ba";

export default function Page() {
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch(LINKDING_API, {
      headers: {
        Authorization: `Token ${API_TOKEN}`,
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setBookmarks(data.results || []))
      .catch(err => console.error("Failed to fetch bookmarks:", err));
  }, []);

  const grouped = bookmarks.reduce((acc, bm) => {
    const tags = bm.tag_names.length ? bm.tag_names : ["Untagged"];
    tags.forEach(tag => {
      if (!acc[tag]) acc[tag] = [];
      acc[tag].push(bm);
    });
    return acc;
  }, {});

  return (
    <div className="p-4 bg-zinc-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">🔖 Linkding Dashboard</h1>

      <input
        placeholder="Search bookmarks..."
        className="mb-6 p-2 w-full bg-zinc-800 text-white border border-zinc-600 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(grouped).map(([tag, items]) => (
          <div key={tag}>
            <h2 className="text-xl font-semibold mb-2 text-zinc-300">{tag}</h2>
            {items
              .filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
              .map((bookmark, i) => (
                <div
                  key={i}
                  className="mb-2 p-3 bg-zinc-800 border border-zinc-700 rounded-md shadow-md hover:bg-zinc-700 transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={`https://www.google.com/s2/favicons?sz=64&domain_url=${bookmark.url}`}
                      alt="favicon"
                      className="w-5 h-5 rounded"
                    />
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {bookmark.title}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

