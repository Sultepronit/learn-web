<?php
declare(strict_types=1);
namespace Tests\Unit;

require_once(__DIR__ . '/../../app/Router.php');

use PHPUnit\Framework\TestCase;
use App\Router;

class RouterTest extends TestCase
{
    private Router $router;

    protected function setUp(): void
    {
        parent::setUp();

        $this->router = new Router();
    }

    # two ways of delcaring test: /** @test */ or test_that_...
    // /** @test */
    // public function it_registers_a_route(): void
    public function test_that_it_registers_a_route(): void
    {
        // when we call a register method
        $this->router->register('get', '/users', ['Users', 'index']);

        $expected = [
            'get' => [
                '/users' => ['Users', 'index']
            ]
        ];

        // then we assert route was registered
        $this->assertEquals($expected, $this->router->routes());
    }

    /** @test */
    public function itRegistersAGetRoute(): void
    {
        $this->router->get('/users', ['Users', 'index']);

        $expected = [
            'get' => [
                '/users' => ['Users', 'index']
            ]
        ];

        $this->assertEquals($expected, $this->router->routes());
    }

    /** @test */
    public function itRegistersAPostRoute(): void
    {
        $this->router->post('/users', ['Users', 'store']);

        $expected = [
            'post' => [
                '/users' => ['Users', 'store']
            ]
        ];

        $this->assertEquals($expected, $this->router->routes());
    }

    /** @test */
    public function there_are_no_routes_when_router_is_created(): void
    {
        $this->assertEmpty((new Router())->routes());
    }
}