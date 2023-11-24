<?php

use App\Http\Controllers\ListingController;
use App\Models\Listing;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

# all the listings
/* Route::get('/', function () {
    return view('listings', [
        'listings' => Listing::all()
    ]);
}); */
Route::get('/', [ListingController::class, 'index']);

# create form
Route::get('/listings/create', [ListingController::class, 'create']);

# single listing
/* Route::get('/listings/{id}', function($id) {
    $listing = Listing::find($id);

    if($listing) {
        return view('listing', [
            'listing' => $listing
        ]);
    } else {
        abort('404');
    }
}); */

/* Route::get('/listings/{listing}', function(Listing $listing) {
    return view('listing', [
        'listing' => $listing
    ]);
}); */

Route::get('/listings/{listing}', [ListingController::class, 'show']);