<?php

namespace App\Http\Controllers;

use App\Events\CommentCreated;
use App\Events\PostCreated;
use App\Models\Post;
use Illuminate\Http\Request;

class ForumController extends Controller
{

    public function store(Request $request)
    {
        $request->validate(['content' => 'required|string|max:500']);

        $post = Post::create([
            'user_id' => auth()->id() ?? 1,
            'content' => $request->content,
        ]);

        broadcast(new PostCreated($post->load('user')))->toOthers();

        return back();
    }
    public function comment(Request $request, Post $post)
    {
        $request->validate(['content' => 'required|string|max:500']);

        $comment = $post->comments()->create([
            'user_id' => auth()->id() ?? 1,
            'content' => $request->content,
        ]);

        // Broadcast untuk realtime
        broadcast(new CommentCreated($comment->load('user')))->toOthers();

        // Kembali ke halaman sebelumnya (Inertia akan otomatis update)
        return back();
    }
}
