<?php
namespace App;
use PDO;

Class Db{
    private static $database = NULL;

    public static function getDatabase(){
        try{
            if (!$database){
                $dsn = 'mysql:host=localhost;dbname=camagru';
                self::$database = new PDO($dsn, 'root', '');
                self::$database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            return self::$database;
        }catch (PDOException $Exception){
            echo 'Database Connection : '.$e->getMessage().PHP_EOL;
            die();
        }
    }

    public static function closeDatabase(){
        try{
            self::$database = NULL;
        }catch (PDOException $Exception){
            echo 'Database Connection : '.$e->getMessage().PHP_EOL;
            die();
        }
    }
}
 ?>
