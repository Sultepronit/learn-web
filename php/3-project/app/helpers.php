<?php

declare(strict_types=1);

function formatAmount(float $amount): string {
    return ($amount < 0 ? '-' : '') . '$' . number_format(abs($amount), 2);
}

function formatAndStyleAmount(float $amount): string {
    $value = formatAmount($amount);
    $class = $value[0] === '-' ? 'red' : 'green';
    return "<span class='{$class}'>{$value}</span>";
}

function formatDate(int $time): string {
    return date('M j, Y', $time);
}