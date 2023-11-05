<?php

use Illuminate\Http\Request;
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

Route::get('/hello', function () {
    // return '<h1>Hello there</h1>';
    return response('<h1>Hello there</h1>');
});


Route::get('/404', function () {
    return response('<h1>404!</h1>', 404);
});

Route::get('/text', function () {
    return response('<h1>Hello there</h1>')
        ->header('Content-Type', 'text/plain')
        ->header('my-custom', 'header');
});

Route::get('/posts/{id}', function ($id) {
    // dd($id);
    # stops everything & shows:
    # "22" // routes/web.php:37

    // ddd($id); # Dump, Die, Debug
    # stops everything & shows maaany things

    return response("<h1>Post $id </h1>");
})->where('id', '[0-9]+');

Route::get('/search', function(Request $request) {
    //dd($request);
    /* for http://localhost/search?name=Bob&id=77
    ... #requestUri: "/search?name=Bob&id=77" ...
    +query: Symfony\Component\HttpFoundation\InputBag {#44 ▼
        #parameters: array:2 [▼
            "name" => "Bob"
            "id" => "77"
        ]
    } ... */
    
    # for http://localhost/search?name=Bob&id=77
    return response("{$request->id}: {$request->name}"); # 77: Bob
});