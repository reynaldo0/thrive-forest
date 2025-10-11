import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export default function ForumKomunitas({ posts: initialPosts }) {
    const [posts, setPosts] = useState(
        initialPosts.map((p) => ({ ...p, comments: p.comments || [] }))
    );
    const [visibleCount, setVisibleCount] = useState(2); // tampilkan 2 post awal

    const postForm = useForm({ content: "" });

    useEffect(() => {
        const echo = new Echo({
            broadcaster: "pusher",
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true,
        });

        echo.channel("posts").listen("PostCreated", (e) => {
            const newPost = { ...e.post, comments: e.post.comments || [] };
            setPosts((prev) => [newPost, ...prev]);
        });

        return () => echo.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        postForm.post(route("forum.store"), {
            preserveScroll: true,
            onSuccess: () => postForm.reset(),
        });
    };

    const handleComment = (e, postId, commentForm) => {
        e.preventDefault();
        commentForm.post(route("forum.comment", postId), {
            preserveScroll: true,
            onSuccess: () => commentForm.reset(),
        });
    };

    // Fungsi untuk menampilkan lebih banyak post
    const loadMore = () => {
        setVisibleCount((prev) => prev + 2); // tambah 2 post lagi
    };

    return (
        <section
            id="forum-komunitas"
            className="min-h-screen flex flex-col items-center w-full px-6 pt-16 pb-12 bg-[#FCFFEC] relative pb-60"
        >
            <div
                className="absolute inset-0 bg-[url('/background/herokomunitas.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />

            <h2 className="text-6xl md:text-7xl font-bold text-center text-[#3B3B0E] mb-12 tracking-wide">
                Forum Komunitas
            </h2>

            <div className="max-w-5xl w-full space-y-6 z-10">
                {/* Form Posting */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#EDFFCD] border border-green-200 rounded-3xl p-8 shadow-2xl"
                >
                    <textarea
                        placeholder="Tulis sesuatu..."
                        value={postForm.data.content}
                        onChange={(e) =>
                            postForm.setData("content", e.target.value)
                        }
                        className="w-full h-28 resize-none border-none rounded-xl bg-white focus:ring-2 focus:ring-green-400 p-4 outline-none text-base"
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-[#A6E272] text-[#224C14] text-base hover:bg-[#94D45E] active:scale-95 transition"
                        >
                            Kirim
                        </button>
                    </div>
                </form>

                {/* List Postingan dengan scroll */}
                <div className="max-h-[600px] overflow-y-auto space-y-6">
                    {posts.slice(0, visibleCount).map((post) => {
                        const commentForm = useForm({ content: "" });

                        return (
                            <div
                                key={post.id}
                                id={`post-${post.id}`}
                                className="bg-[#EDFFCD] border border-green-200 rounded-3xl p-8 shadow-2xl"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-5 h-5 rounded-full bg-green-600 animate-pulse"></span>
                                    <p className="font-semibold text-lg text-gray-800">
                                        {post.user?.name || "Anonim"}
                                    </p>
                                </div>

                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {post.content}
                                </p>

                                {/* Form Komentar */}
                                <div>
                                    <label className="block text-lg font-medium text-gray-600 mb-2">
                                        Balas
                                    </label>
                                    <form
                                        onSubmit={(e) =>
                                            handleComment(
                                                e,
                                                post.id,
                                                commentForm
                                            )
                                        }
                                    >
                                        <textarea
                                            placeholder="Tulis balasan..."
                                            value={commentForm.data.content}
                                            onChange={(e) =>
                                                commentForm.setData(
                                                    "content",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full h-28 resize-none border-none rounded-xl bg-white focus:ring-2 focus:ring-green-400 p-4 outline-none text-base"
                                        />
                                        <button
                                            type="submit"
                                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                                        >
                                            Balas
                                        </button>
                                    </form>

                                    {/* List Komentar */}
                                    <div className="mt-4 space-y-2">
                                        {Array.isArray(post.comments) &&
                                        post.comments.length > 0 ? (
                                            post.comments.map((c) =>
                                                c?.id ? (
                                                    <div
                                                        key={c.id}
                                                        id={`comment-${post.id}-${c.id}`}
                                                        className="p-3 rounded-xl bg-white text-gray-700 shadow"
                                                    >
                                                        <strong>
                                                            {c.user?.name ||
                                                                "Anonim"}
                                                            :
                                                        </strong>{" "}
                                                        {c.content}
                                                    </div>
                                                ) : null
                                            )
                                        ) : (
                                            <p className="text-gray-500 italic">
                                                Belum ada komentar
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Tombol Load More */}
                    {visibleCount < posts.length && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={loadMore}
                                className="px-6 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600"
                            >
                                Lihat Post Lainnya
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
