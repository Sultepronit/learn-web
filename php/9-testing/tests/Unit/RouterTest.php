<?php
declare(strict_types=1);
namespace Tests\Unit;

// require_once(__DIR__ . '/../../app/Router.php');
// require_once(__DIR__ . '/../../app/Exceptions/RouteNotFoundException.php');
# miracles of the "composer dump-autoload"

use PHPUnit\Framework\TestCase;
use App\Router;
use App\Exceptions\RouteNotFoundException;

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
        # given that we have a router object
        // $router = new Router();

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

    # for local function: @dataProvider routeNotFoundCases
    /**
     * @test
     * @dataProvider \Tests\DataProviders\RouterDataProvider::routeNotFoundCases
     * */
    public function it_throws_route_not_found_exception(
        string $requestUri,
        string $requestMethod
    ): void
    {
        $users = new class() {
            public function delete(): bool
            {
                return true;
            }
        };

        $this->router->post('/users', [$users::class, 'store']);
        $this->router->get('/users', ['Users', 'index']);

        $this->expectException(RouteNotFoundException::class);
        $this->router->resolve($requestUri, $requestMethod);
    }

    // public function routeNotFoundCases(): array
    // { # this will procude 4 tests
    //     return [
    //         ['/users', 'put'],
    //         ['/invoices', 'post'],
    //         ['/users', 'get'],
    //         ['/users', 'post']
    //     ];
    // }
}