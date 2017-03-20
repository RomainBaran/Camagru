<?php
namespace App;
use PDO;

Class Comment{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    public function selectAll($id_photo = 0){
        $sql = "select content, login, date, id_user from COMMENTS full join USER where id_user=USER.id";
        if ($id_photo)
          $sql .= " and id_photo = :id";
        try{
            $statement = $this->db->prepare($sql);
            if ($id_photo)
                $statement->bindParam(":id", $id_photo);
            $statement->execute();
            $tab = $statement->fetchAll();
            $tab["you"] = $_SESSION["id"];
            return json_encode($tab);
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
        return null;
    }
}
?>
