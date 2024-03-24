<?php
declare(strict_types=1);
namespace Tests\Unit;

require_once(__DIR__ . '/../../app/Router.php');

use PHPUnit\Framework\TestCase;
use App\Router;

class RouterTest extends TestCase
{
    # two ways of delcaring test: /** @test */ or test_that_...
    // /** @test */
    // public function it_registers_a_route(): void
    public function test_that_it_registers_a_route(): void
    {
        // given that we have a router object
        $router = new Router();

        // when we call a register method
        $router->register('get', '/users', ['Users', 'index']);

        $expected = [
            'get' => [
                '/users' => ['Users', 'index']
            ]
        ];

        // then we assert route was registered
        $this->assertEquals($expected, $router->routes());
    }

    /** @test */
    public function itRegistersAGetRoute(): void
    {
        $router = new Router();

        $router->get('/users', ['Users', 'index']);

        $expected = [
            'get' => [
                '/users' => ['Users', 'index']
            ]
        ];

        $this->assertEquals($expected, $router->routes());
    }

    /** @test */
    public function itRegistersAPostRoute(): void
    {
        $router = new Router();

        $router->post('/users', ['Users', 'store']);

        $expected = [
            'post' => [
                '/users' => ['Users', 'store']
            ]
        ];

        $this->assertEquals($expected, $router->routes());
    }
}