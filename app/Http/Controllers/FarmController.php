<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\Farm;
use App\Models\Inventory;
use App\Models\Plant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FarmController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Farm/Index', [
            'farms' => Farm::with('plant')->where('user_id', Auth::id())->get(),
            'plants' => Plant::all(),
            'inventory' => Inventory::where('user_id', Auth::id())->get(),
            'donations' => Donation::where('user_id', Auth::id())->get(),
        ]);
    }

    public function addFarm()
    {
        Farm::create([
            'user_id' => Auth::id(),
            'plant_id' => null,
            'planted_at' => null,
            'watered' => false,
        ]);
        return Redirect::back()->with('success', 'Lahan baru berhasil ditambahkan!');
    }

    public function plant(Request $request, Farm $farm)
    {
        $request->validate([
            'plant_id' => 'required|exists:plants,id',
        ]);
        
        if ($farm->plant_id) {
            return Redirect::back()->withErrors(['msg' => 'Lahan sudah berisi tanaman']);
        }

        $farm->update([
            'plant_id' => $request->plant_id,
            'planted_at' => now(),
            'watered' => false,
        ]);

        return Redirect::back()->with('success', 'Tanaman berhasil ditanam!');
    }

    public function water(Farm $farm)
    {
        if (!$farm->plant_id) {
            return Redirect::back()->withErrors(['msg' => 'Belum ada tanaman']);
        }

        $farm->update(['watered' => true]);

        return Redirect::back()->with('success', 'Tanaman disiram!');
    }

    public function harvest(Farm $farm)
    {
        if (!$farm->plant_id || !$farm->watered) {
            return Redirect::back()->withErrors(['msg' => 'Tanaman belum siap']);
        }

        $growTime = $farm->plant->grow_time;
        if (now()->diffInSeconds($farm->planted_at) < $growTime) {
            return Redirect::back()->withErrors(['msg' => 'Belum matang']);
        }

        Inventory::updateOrCreate(
            ['user_id' => Auth::id(), 'crop' => $farm->plant->name],
            ['quantity' => DB::raw('quantity+1')]
        );

        // reset: biar bisa ditanam lagi
        $farm->update([
            'plant_id' => null,
            'planted_at' => null,
            'watered' => false,
        ]);

        return Redirect::back()->with('success', 'Panen berhasil!');
    }

    public function donate(Request $request)
    {
        $inventory = Inventory::where('user_id', Auth::id())
            ->where('crop', $request->crop)
            ->first();

        if (!$inventory || $inventory->quantity < $request->amount) {
            return Redirect::back()->withErrors(['msg' => 'Tidak cukup hasil']);
        }

        $inventory->decrement('quantity', $request->amount);

        Donation::create([
            'user_id' => Auth::id(),
            'crop' => $request->crop,
            'quantity' => $request->amount,
        ]);

        return Redirect::back()->with('success', 'Donasi berhasil!');
    }
}
