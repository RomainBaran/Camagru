<?php
namespace App;
use PDO;

Class Comment{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    public function selectAll($id_photo = 0, $timestamp = 0){
        $sql = "select content, login, date, id_user from COMMENTS full join USER where id_user=USER.id";
        if ($id_photo)
          $sql .= " and id_photo = :id";
        if ($timestamp)
          $sql .= " and date > :date";
        $sql .= " ORDER BY date";
        try{
            $statement = $this->db->prepare($sql);
            if ($id_photo)
                $statement->bindParam(":id", $id_photo);
            if ($timestamp)
                $statement->bindParam(":date", $timestamp);
            $statement->execute();
            $tab = $statement->fetchAll();
            $tab["you"] = $_SESSION["id"];
            return json_encode($tab);
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
        return null;
    }

    public function insert($id_photo, $id_user, $content){
      if ((!$content && $error = "No content")
          || (preg_match("/\W+/", $content) && $error = "Wrong content format"))
          return $error;
      $sql = "insert into COMMENTS(content, id_user, id_photo) values(:content, :id_user, :id_photo);";
      try{
          $statement = $this->db->prepare($sql);
          $statement->bindParam(":content", $content);
          $statement->bindParam(":id_user", $id_user);
          $statement->bindParam(":id_photo", $id_photo);
          if ($statement->execute())
            return "true";
      } catch(PDOException $e) {
          echo $e->getMessage();
      }
      return "Server Errror";
    }

    public function delete($id_photo){
        if (!$id_photo)
          return "Server Error";
        $sql = "delete from COMMENTS where id_photo=:id";
        try{
          $statement = $this->db->prepare($sql);
          $statement->bindParam(":id", $id_photo);
          if ($statement->execute())
            return "true";
        } catch (PDOException $e){
          echo $e->getMessage();
        }
        return "Server Error";
    }
}
?>
