<!-- <div class="bg-gray-50 border border-gray-200 rounded p-6"> -->
<!-- now we can add to this component other classes an they will be merged -->
<!-- <x-card class="!p-10"> just dont't forget to add ! -->
<div {{$attributes->merge(['class' => 'bg-gray-50 border border-gray-200 rounded p-6'])}}>
    {{$slot}}
</div>

<div>
    {{$slot}}
</div>