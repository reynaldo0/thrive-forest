<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'seminar_id' => 'required|exists:seminars,id',
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
        ]);

        Registration::create($request->all());

        return back()->with(['success' => true, 'message' => 'Pendaftaran berhasil!']);
    }
}
