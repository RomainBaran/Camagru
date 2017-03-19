<?php
namespace App;
use PDO;

Class User{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    public function register($post){
        try{
            $error = null;
            if (((!isset($post['login']) || !preg_match('/^[\w]+$/', $post['login'])) && $error = "Wrong login") ||
                ((!isset($post['password']) || !preg_match('/^[\w]+$/', $post['password'])) && $error = "Wrong password") ||
                ((!isset($post['password_again']) || $post['password'] !== $post['password_again']) && $error = "Wrong password") ||
                ((!isset($post['email']) || !preg_match('/^[\w\-\.]+@([\w]+\.){1,2}[a-zA-Z]{2,3}$/', $post['email'])) && $error = "Wrong email") ||
                ($this->db->query('select COUNT(*) from USER where login="'.strip_tags($post['login']).'"')->fetchColumn() > 0 && $error = 'Login already taken') ||
                ($this->db->query('select COUNT(*) from USER where mail="'.strip_tags($post['email']).'"')->fetchColumn() > 0 && $error = 'Email already taken'))
                return $error;
            $verify = rand(1, mt_getrandmax());
            $post['password'] = hash('whirlpool', $post['password']);
            $post['login'] = strip_tags($post['login']);
            $statement = $this->db->prepare("INSERT INTO USER(login, passwd, mail, verify) VALUES(:login, :passwd, :mail, :verify)");
            $statement->bindParam(':login', $post['login']);
            $statement->bindParam(':passwd', $post['password']);
            $statement->bindParam(':mail', $post['email']);
            $statement->bindParam(':verify', $verify);
            $statement->execute();
            mail($post['email'], 'Camagru Inscription',
            "<html>Hi {$post["login"]}! You've just subcribed to the Camagru app !<br/> Please end your subcription with this <a href='{$_SERVER["HTTP_ORIGIN"]}/sign/{$verify}'>link</a></html>",
            'From: camagru@42.fr' . "\r\n" . 'Reply-To: camagru@42.fr'  . "\r\n" . 'Content-type: text/html; charset=utf-8');
            return 'true';
        } catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    public function verify($verify){
        try{
            if (!preg_match('/[0-9]+/', $verify) ||
                ($user = $this->db->query('select * from USER where verify='.intval($verify))->fetch(PDO::FETCH_ASSOC)) === false){
                return 'Access denied';
            }
            $statement = $this->db->prepare("UPDATE USER SET verify=0 WHERE id=:id");
            $statement->bindParam(':id', $user['id']);
            return ($statement->execute() === true) ? 'true' : 'Server Error';
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    public function login($post){
        try{
            $error = null;
            $user = null;
            if (((!isset($post['login']) || !preg_match('/^[\w]+$/', $post['login'])) && $error = "Wrong login") ||
                ((!isset($post['password']) || !preg_match('/^[\w]+$/', $post['password'])) && $error = "Wrong password"))
                return $error;
            $statement = $this->db->prepare("select * from USER where login=:login and passwd=:password and verify=0");
            $statement->bindParam(':login', strip_tags($post['login']));
            $statement->bindParam(':password', hash('whirlpool', $post['password']));
            if (($statement->execute() === true) && ($user = $statement->fetch(PDO::FETCH_ASSOC)) !== false){
                $_SESSION['username'] = $user['login'];
                $_SESSION['id'] = $user['id'];
                return 'true';
            } else {
                return 'Wrong login or password';
            }
        } catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    public function logout(){
        session_unset();
    }
}
?>
