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

    private static function findParamRoute($request){
        $return = null;
        if (!isset($request) || !is_array($request))
            return false;
        $explode = explode("/", $request["uri"]);
        foreach (self::$paths as $route){
            $explode_route = explode("/", $route['path']);
            if (!$explode_route || count($explode) !== count($explode_route))
                continue;
            for($i = 0; $i < count($explode_route); $i++){
                if ($explode_route[$i] && $explode_route[$i][0] == ':'){
                    $return["handler"] = $route['handler'];
                    $return["params"][substr($explode_route[$i], 1)] = $explode[$i];
                }
                else if ($explode[$i] !== $explode_route[$i]){
                    $return = null;
                    break;
                }
            }
            if ($return)
                return $return;
        }
        return false;
    }

    public static function run(){
        $request = [
            "method" => $_SERVER['REQUEST_METHOD'],
            "uri" => $_SERVER['REQUEST_URI']
        ];
        if (($handler = self::findSimpleRoute($request))){
            $handler();
        } else if (($array = self::findParamRoute($request))){
            $array["handler"]($array["params"]);
        }
    }
}
?>
