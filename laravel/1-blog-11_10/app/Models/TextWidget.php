<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class TextWidget extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'image',
        'title',
        'content',
        'active'
    ];

    public static function getTitle(string $key): string
    {
        // $widget = TextWidget::query()
        //     ->where('key', '=', $key)
        //     ->where('active', '=', 1)
        //     ->first();
        # now we get the info from the cache on put it there for the future
        $widget = Cache::get('text-widget-' . $key, function() use($key) {
            return TextWidget::query()
                ->where('key', '=', $key)
                ->where('active', '=', 1)
                ->first();
        });
        return $widget ? $widget->title : '';
    }

    public static function getContent(string $key): string
    {
        // $widget = TextWidget::query()
        //     ->where('key', '=', $key)
        //     ->where('active', '=', 1)
        //     ->first();
        # now we get the info from the cache on put it there for the future
        $widget = Cache::get('text-widget-' . $key, function() use($key) {
            return TextWidget::query()
                ->where('key', '=', $key)
                ->where('active', '=', 1)
                ->first();
        });
        return $widget ? $widget->content : '';
    }
}
