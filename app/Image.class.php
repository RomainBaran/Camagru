<?php
namespace App;
use PDO;

Class Image{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    private function image_merge($image, $filters, $name){
      if (!$image)
        return false;
      foreach($filters as $filter){
        if (!is_array($filter) || !($filter_img = imagecreatefrompng("./public/filters/".$filter[0].".png")))
          return false;
        imagealphablending($image, false);
        imagesavealpha($image, true);
        imagecopymerge($image, $filter_img, $filter[3], $filter[4], 0, 0, $filter[1], $filter[2], 100);
        imagedestroy($filter_img);
      }
      return imagepng($image, './public/upload/'.$name.'.png');
    }

    public function upload($post){
        $array = explode(",", $post['data']);
        if (!file_exists("./public/upload") && !mkdir("./public/upload") && $error = "Server error")
            return $error;
        $name = time().'_'.uniqid();
        if ((count($array) !== 2 && ($error = "Wrong file upload"))
            || ($array[0] !== "data:image/png;base64" && ($error = "Wrong file upload"))
            || (($data = base64_decode($array[1])) === false && ($error = "Wrong file upload"))
            || (($image = imagecreatefromstring($data)) === false && ($error = "Server Error"))
            || (($image = $this->image_merge($image, $post["filter"], $name)) !== true && ($error = "Server Error")))
            return $error;
        try {
            $statement = $this->db->prepare("insert into PHOTO(name, id_user) values(:name, :id_user)");
            $statement->bindParam(":name", $name);
            $statement->bindParam(":id_user", $_SESSION['id']);
            if ($statement->execute() === false && $error = "Server error")
                return $error;
            imagedestroy($image);
            return $name;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        imagedestroy($image);
        return 'Server error';
    }

    public function selectAll($id_user = 0, $name = null){
        if ($name && !preg_match("/^\d+_\w+$/", $name))
          return null;
        $sql = "select * from PHOTO";
        if ($id_user && $name)
          $sql .= " where id_user = :id and name = :name";
        else if ($id_user)
          $sql .= " where id_user = :id";
        else if ($name)
          $sql .= " where name = :name";
        $sql .= ";";
        try{
            $statement = $this->db->prepare($sql);
            if ($id_user)
                $statement->bindParam(":id", $id_user);
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
        if (!preg_match('/^\d+_\w+.png$/', $name))
            return "Permission denied";
        $sql = "delete from PHOTO where id_user=:id and name=:name";
        try{
            $statement = $this->db->prepare($sql);
            $statement->bindParam(":id", $id_user);
            $statement->bindParam(":name", substr($name, 0, -4));
            if (!($statement->execute()) || !unlink('./public/upload/'.$name))
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
