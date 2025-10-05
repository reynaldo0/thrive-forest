<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('posts', function ($user) {
    return true; // untuk sementara biar semua user bisa dengar channel "posts"
});
