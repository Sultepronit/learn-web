<?php

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

Route::get('/', function () {
    return view('listings', [
        'heading' => 'Latest Listings',
        'listings' => [
            [
                'id' => 1,
                'title' => 'Listing One',
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, soluta cupiditate vero reiciendis, atque animi accusantium exercitationem modi mollitia reprehenderit unde architecto. Unde qui ipsum eos deleniti adipisci, corrupti impedit!'
            ],
            [
                'id' => 2,
                'title' => 'Listing Two',
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, soluta cupiditate vero reiciendis, atque animi accusantium exercitationem modi mollitia reprehenderit unde architecto. Unde qui ipsum eos deleniti adipisci, corrupti impedit!'
            ]
        ]
    ]);
});
