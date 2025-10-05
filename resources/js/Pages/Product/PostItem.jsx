import React from "react";

export default function PostItem({
    post,
    commentForm,
    onCommentChange,
    onCommentSubmit,
}) {
    return (
        <div className="bg-[#EDFFCD] border border-green-200 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
                <span className="w-5 h-5 rounded-full bg-green-600 animate-pulse"></span>
                <p className="font-semibold text-lg text-gray-800">
                    {post.user?.name || "Anonim"}
                </p>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {post.content}
            </p>

            <form onSubmit={(e) => onCommentSubmit(e, post.id)}>
                <textarea
                    placeholder="Tulis balasan..."
                    value={commentForm.data.content}
                    onChange={(e) => onCommentChange(post.id, e.target.value)}
                    className="w-full h-28 resize-none border-none rounded-xl bg-white focus:ring-2 focus:ring-green-400 p-4 outline-none text-base"
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    Balas
                </button>
            </form>

            <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                {post.comments.length > 0 ? (
                    post.comments.map((c) => (
                        <div
                            key={c.id}
                            className="p-3 rounded-xl bg-white text-gray-700 shadow"
                        >
                            <strong>{c.user?.name || "Anonim"}:</strong>{" "}
                            {c.content}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">Belum ada komentar</p>
                )}
            </div>
        </div>
    );
}
