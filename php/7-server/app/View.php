<?php
declare(strict_types=1);
namespace App;

class View
{
    public function __construct(
        protected string $view,
        protected array $params = []
    ) {
        
    }

    public static function make(string $view, array $params = []): static
    {
        return new static($view, $params);
    }

    public function render(): string
    {
        $viewPath = VIEW_PATH . '/' . $this->view . '.php';

        if(!file_exists($viewPath)) {
            throw new Exceptions\ViewNotFoudException();
        }

        // foreach($this->params as $key => $value) {
        //     $$key = $value;
        //     # now we have every of the params as separate variable
        // }
        extract($this->params); # ok, the same thing
        
        # this way we return the file's contents
        ob_start();
        include $viewPath;
        return (string) ob_get_clean();
    }

    public function __toString()
    {
        return $this->render();
    }
}