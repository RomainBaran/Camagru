<?php
namespace App;
use PDO;

Class Like{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    public function selectAll($id_photo = 0, $id_user = 0){
        $sql = "select id_user from LIKE_PHOTO where id_photo = :id";
        if ($id_user)
          $sql .= " and id_user = :id_user";
        try{
            $statement = $this->db->prepare($sql);
            $statement->bindParam(":id", $id_photo);
            if ($id_user)
              $statement->bindParam(":id_user", $id_user);
            $statement->execute();
            $tab = $statement->fetchAll();
            $tab["you"] = $_SESSION["id"];
            return json_encode($tab);
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
        return null;
    }

    public function insert($id_photo = 0, $id_user = 0){
      $sql = "insert into LIKE_PHOTO(id_user, id_photo) values(:id_user, :id_photo);";
      try{
          $statement = $this->db->prepare($sql);
          $statement->bindParam(":id_user", $id_user);
          $statement->bindParam(":id_photo", $id_photo);
          if ($statement->execute())
            return "true";
      } catch(PDOException $e) {
          echo $e->getMessage();
      }
      return "Server Errror";
    }

    public function delete($id_photo, $id_user = 0){
        if (!$id_photo)
          return "Server Error";
        $sql = "delete from LIKE_PHOTO where id_photo=:id";
        if ($id_user)
          $sql .= " and id_user=:id_user";
        try{
          $statement = $this->db->prepare($sql);
          $statement->bindParam(":id", $id_photo);
          if ($id_user)
            $statement->bindParam(":id_user", $id_user);
          if ($statement->execute())
            return "true";
        } catch (PDOException $e){
          echo $e->getMessage();
        }
        return "Server Error";
    }
}
?>
