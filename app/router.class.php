<?php
namespace App;

Class Router{
    private static $paths = array();

    public static function get($path, $handler){
        $path = [
            "path" => $path,
            "method" => "GET",
            "handler" => $handler,
        ];
        array_push(self::$paths, $path);
    }

    public static function post($path, $handler){
        $path = [
            "path" => $path,
            "method" => "POST",
            "handler" => $handler,
        ];
        array_push(self::$paths, $path);
    }

    private static function findSimpleRoute($request){
        if (!isset($request) || !is_array($request))
            return false;
        foreach (self::$paths as $route){
            if ($request['uri'] === $route['path']
                && $request['method'] === $route['method']){
                return $route['handler'];
            }
        }
        return false;
    }

    private static function findRegexRoute($request){
        if (!isset($request) || !is_array($request))
            return false;
        foreach (self::$paths as $route){
            if ($request['uri'] === $route['path']
                && $request['method'] === $route['method']){
                return $route['handler'];
            }
        }
        return false;
    }

    public static function run(){
        $request = [
            "method" => $_SERVER['REQUEST_METHOD'],
            "uri" => $_SERVER['REQUEST_URI']
        ];
        if (($handler = self::findSimpleRoute($request))
            || ($handler = self::findRegexRoute($request))){
            return $handler();
        }
        return false;
    }
}
?>
