<?php
namespace App;
use PDO;

Class Image{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    public function upload($post){
        $array = explode(",", $post['data']);
        if (!file_exists("./public/upload") && !mkdir("./public/upload") && $error = "Server error")
            return $error;
        $name = time().'_'.uniqid();
        if ((count($array) !== 2 && ($error = "Wrong file upload"))
            || ($array[0] !== "data:image/jpeg;base64" && ($error = "Wrong file upload"))
            || (($data = base64_decode($array[1])) === false && ($error = "Wrong file upload"))
            || ((file_put_contents('./public/upload/'.$name.'.jpeg', $data)) === false && ($error = "Server error")))
            return $error;
        try {
            $statement = $this->db->prepare("insert into PHOTO(name, id_user) values(:name, :id_user)");
            $statement->bindParam(":name", $name);
            $statement->bindParam(":id_user", $_SESSION['id']);
            if ($statement->execute() === false && $error = "Server error")
                return $error;
            return $name;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        return 'Server error';
    }

    public function selectAll($id = 0, $name = null){
        if ($name && !preg_match("/\d+_\w+/", $name))
          return null;
        $sql = $id ? "select * from PHOTO where id_user = :id" : "select * from PHOTO";
        $sql = $name ? "select * from PHOTO where name = :name" : $sql;
        try{
            $statement = $this->db->prepare($sql);
            if ($id)
                $statement->bindParam(":id", $id);
            if ($name)
                $statement->bindParam(":name", $name);
            $statement->execute();
            return $statement->fetchAll();
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
        return null;
    }

    public function delete($name, $id_user){
        if (!preg_match('/^\d+_\w+.jpeg$/', $name))
            return "Permission denied";
        $sql = "delete from PHOTO where id_user=:id and name=:name";
        try{
            $statement = $this->db->prepare($sql);
            $statement->bindParam(":id", $id_user);
            $statement->bindParam(":name", substr($name, 0, -5));
            if (!unlink('./public/upload/'.$name) || !($statement->execute()))
                return "Permission denied";
            return "true";
        } catch(PDOException $e) {
            echo $e->getMessage();
            return ;
        }
        return "Permission denied";
    }
}
?>
