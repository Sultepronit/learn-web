<?php
function pl($data) {
    echo "$data <br>";
}

$currentTime = time(); # current time in seconds
pl($currentTime); # 1696837246

$weekAfter = $currentTime + 7 * 24 * 60 * 60;
pl($weekAfter); # 1697442046

$minutes = $currentTime / 60;
pl($minutes); # 28280622.6
$hours = $minutes / 60;
pl($hours); # 471343.71
$days = $hours / 24;
pl($days); # 19639.32125
$years = $days / 365.25;
pl($years); # 53.769532822521 # 53 years after 1970?..

pl(date('m/d/Y g:ia')); # 10/09/2023 9:28am
pl(date('d.m.Y g:ia')); # 09.10.2023 9:29am
pl(date('d.m.Y g:ia', 0)); # 01.01.1970 12:00am

pl(date_default_timezone_get()); # UTC

date_default_timezone_set('Europe/Kyiv');
pl(date('d.m.y g:ia')); # 09.10.23 12:46pm
pl(date('d.m.Y g:ia', 0)); # 01.01.1970 3:00am

$generated = mktime(0, 0, 0, 12, 30, null);
pl(date('d.m.Y g:ia', $generated)); # 30.12.2023 12:00am
pl(date('d.m.Y g:i:sa', mktime(5, 20, 10, 12, 30, null))); # 30.12.2023 5:20:10am
pl(date('d.m.Y g:i:sa', mktime(5, 20, 10, 12, 30, 1990))); # 30.12.1990 5:20:10am

$oldTime = mktime(6, 10, 55, 5, 15, 1948);
pl($oldTime); # -682634945
pl(date('d.m.Y g:i:sa', $oldTime)); # -15.05.1948 6:10:55am

pl(date('d.m.Y g:i:sa', strtotime('2021-02-22 08:15:00'))); # 22.02.2021 8:15:00am
pl(date('d.m.Y g:i:sa', strtotime('tomorrow'))); # 10.10.2023 12:00:00am
pl(date('d.m.y g:i:sa', strtotime('first day of december'))); # 01.12.23 12:00:00am
pl(date('d.m.y g:i:sa', strtotime('first day of january'))); # 01.01.23 12:00:00am
pl(date('d.m.y g:i:sa', strtotime('monday'))); # 09.10.23 12:00:00am
pl(date('d.m.y g:i:sa', strtotime('sunday'))); # 15.10.23 12:00:00am
pl(date('d.m.y g:i:sa', strtotime('last sunday'))); # 08.10.23 12:00:00am
pl(date('d.m.y', strtotime('last day of february'))); # 28.02.23
pl(date('d.m.y', strtotime('last day of february 2024'))); # 29.02.24
pl(date('d.m.y', strtotime('last sunday of october'))); # 29.10.23

echo '<pre>';
print_r(date_parse(date('d.m.Y g:i:sa')));
echo '</pre>';