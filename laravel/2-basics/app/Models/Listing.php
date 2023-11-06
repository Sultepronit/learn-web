<?php

namespace App\Models;

class Listing
{
    public static function all()
    {
        return [
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
        ];
    }

    public static function find($id)
    {
        $listings = self::all();

        foreach($listings as $listing) {
            if($listing['id'] == $id) {
                return $listing;
            }
        }
    }
}
