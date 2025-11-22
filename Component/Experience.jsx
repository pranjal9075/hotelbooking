import React, { useState } from "react";

// Default sample reviews
const sampleExperiences = [
  {
    id: 1,
    guest: "Rahul Patil",
    title: "Great stay — clean rooms",
    text: "Stayed for 2 nights. Staff was friendly and breakfast was excellent.",
    rating: 4.5,
    date: "2025-09-12",
  },
  {
    id: 2,
    guest: "Anita Deshpande",
    title: "Lovely rooftop view",
    text: "Awesome rooftop seating and quick service. Will come again!",
    rating: 5,
    date: "2025-08-02",
  },
];

// Star Icon
const StarIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 fill-yellow-400">
    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.91l6.561-.955L10 1l2.951 5.955 6.561.955-4.756 3.635 1.122 6.545z" />
  </svg>
);

export default function Experience({ experiences = sampleExperiences }) {
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [data, setData] = useState(experiences);
  const [activeCard, setActiveCard] = useState(null);

  // Modal
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    guest: "",
    title: "",
    text: "",
    rating: "",
  });

  // Filtered list
  const filtered = data.filter((e) => {
    const matchText = `${e.guest} ${e.title} ${e.text}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchRating = e.rating >= minRating;
    return matchText && matchRating;
  });

  // Add review
  const addReview = () => {
    if (!form.guest || !form.title || !form.text || !form.rating) {
      alert("Please fill all fields");
      return;
    }

    const newReview = {
      id: Date.now(),
      guest: form.guest,
      title: form.title,
      text: form.text,
      rating: Number(form.rating),
      date: new Date().toISOString(),
    };

    setData([newReview, ...data]);
    setOpen(false);
    setForm({ guest: "", title: "", text: "", rating: "" });
    setActiveCard(newReview.id);
  };

  const handleBackdropClick = (e) => {
    if (e.target.dataset.backdrop === "true") {
      setOpen(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white pt-20 pb-10">
      <div className="w-full max-w-7xl mx-auto p-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent drop-shadow-xl">
            Guest Experiences
          </h2>
          <p className="text-gray-300 mt-2 text-sm">Real stories from hotel guests</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center justify-between 
          bg-purple-500/20 backdrop-blur-xl border border-white/10 shadow-xl p-5 rounded-2xl">

          <input
            placeholder="Search reviews, guests, keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 rounded-lg w-full md:w-80 bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 ring-purple-300 outline-none"
          />

          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="px-4 py-2 rounded-lg w-full md:w-40 bg-white/10 border border-white/20 text-white"
          >
            <option value={0}>All ratings</option>
            <option value={4}>4+</option>
            <option value={4.5}>4.5+</option>
            <option value={5}>5</option>
          </select>

          <button
            onClick={() => setOpen(true)}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-purple-400/40 transition"
          >
            + Add Review
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-14 text-gray-400">
              No experiences found.
            </div>
          ) : (
            filtered.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setActiveCard(exp.id)}
                className={`transition-all duration-300 p-6 rounded-2xl cursor-pointer
                bg-black/30 backdrop-blur-xl border border-white/10 shadow-xl
                hover:shadow-purple-500/40 hover:-translate-y-2
                ${
                  activeCard === exp.id
                    ? "ring-2 ring-purple-400 scale-[1.03]"
                    : ""
                }`}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center rounded-full text-lg font-bold shadow-md">
                    {exp.guest.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-purple-200">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-gray-300">by {exp.guest}</p>

                    <div className="flex items-center gap-2 mt-2">
                      {Array.from({ length: Math.round(exp.rating) }).map((_, i) => (
                        <span key={i} className="animate-star">
                          <StarIcon />
                        </span>
                      ))}
                      <span className="text-sm text-purple-200">{exp.rating.toFixed(1)}</span>
                    </div>

                    <p className="mt-3 text-gray-200 text-sm leading-relaxed">
                      {exp.text}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(exp.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          Showing {filtered.length} of {data.length} experiences
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-md"
          data-backdrop="true"
          onMouseDown={handleBackdropClick}
        >
          <div
            className="bg-white max-w-lg w-full rounded-xl p-6 shadow-xl animate-scale"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold">Add Review</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500">
                ✕
              </button>
            </div>

            <div className="space-y-4 mt-4 bg-amber-100 text-black">
              <input
                placeholder="Guest Name"
                value={form.guest}
                onChange={(e) => setForm({ ...form, guest: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />
              <input
                placeholder="Review Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />
              <textarea
                rows={4}
                placeholder="Write your review..."
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                placeholder="Rating (0–5)"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 bg-black rounded-lg" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-lg" onClick={addReview}>
                Add Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        .animate-scale {
          animation: scaleIn .2s ease;
        }
        @keyframes scaleIn {
          from { transform: scale(.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes starGlow {
          0% { transform: scale(1); opacity: .8 }
          100% { transform: scale(1.15); opacity: 1 }
        }
        .animate-star {
          animation: starGlow 1s infinite alternate;
        }
      `}</style>
    </section>
  );
}
