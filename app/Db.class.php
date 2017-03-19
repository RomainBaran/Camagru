<?php
namespace App;
use PDO;

Class Db{
    private static $_database = NULL;

    public static function getDatabase(){
        require_once $_SERVER['DOCUMENT_ROOT'].'/config/database.php';
        try{
            if (!$_database){
                self::$_database = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
                self::$_database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            return self::$_database;
        }catch (PDOException $Exception){
            echo 'Database Connection : '.$e->getMessage().PHP_EOL;
            die();
        }
    }

    public static function closeDatabase(){
        try{
            if (self::$_database)
                self::$_database = NULL;
        }catch (PDOException $Exception){
            echo 'Database Connection : '.$e->getMessage().PHP_EOL;
            die();
        }
    }
}
?>
