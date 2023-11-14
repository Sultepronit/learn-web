@extends('layout')

@php
    $test = 111;
    //$listings = [];
@endphp

@section('content')
@include('partials._hero')
@include('partials._search')

<!-- <h1>{{$heading}}</h1> -->
<div class="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4">

<!-- @if(count($listings) == 0)
    <p>No listings found</p>
@endif -->

@unless(count($listings) == 0)
    @foreach($listings as $listing)
        <!-- <h2>
            <a href="./listings/{{$listing['id']}}">{{$listing['title']}}</a>
        </h2>
        <p>{{$listing['description']}}</p> -->
        
        <x-listing-card :listing="$listing" />
    @endforeach
@else
    <p>No listings found</p>
@endunless

</div>

@endsection