<?php
use App\Autoloader;
use App\User;
use App\Router;
use App\App;
use App\Db;

session_start();

//Set the autoloader
require 'app/autoloader.class.php';
Autoloader::register();

Router::post('/sign', function() {
	if (isset($_SESSION['username'])){
		echo 'Already logged in';
		return ;
	}
	if (!($db = Db::getDatabase())){
		echo 'Server Error';
		return ;
	}
	$user = new User($db);
	echo $user->register($_POST);
});
Router::post('/login', function() {
	if (isset($_SESSION['username'])){
		echo 'Already logged in';
		return ;
	}
	if (!($db = Db::getDatabase())){
		echo 'Server Error';
		return ;
	}
	$user = new User($db);
	echo $user->login($_POST);
});
Router::get('/logout', function() {
	if (isset($_SESSION['username'])){
		$user = new User(null);
		$user->logout();
	}
	header('Location: http://localhost:8080/login');
});

//views
Router::get('/', function() {
	if (!isset($_SESSION['username']))
		header('Location: http://localhost:8080/login');
	$content = 'public/view/home.php';
	include('public/view/templates/template.php');
});
Router::get('/login', function() {
	if (isset($_SESSION['username']))
		header('Location: http://localhost:8080/');
	$content = 'public/view/login.php';
	include('public/view/templates/template.php');
});
Router::get('/sign', function() {
	if (isset($_SESSION['username']))
		header('Location: http://localhost:8080/');
	$content = 'public/view/sign.php';
	include('public/view/templates/template.php');
});
Router::get('/sign/:rand', function($params) {
	if (isset($_SESSION['username']))
		header('Location: http://localhost:8080/');
	$db = Db::getDatabase();
	$user = new user($db);
	$return = $user->verify($params["rand"]);
	($return === 'true') ? $valid = "Your account has been validated":
							$error = $return;
	$class = isset($error) ? 'error_display' : 'success_display';
	$content = 'public/view/sign.php';
	include('public/view/templates/template.php');
});
Router::get('/forgot', function() {
	if (isset($_SESSION['username']))
		header('Location: http://localhost:8080/');
	$content = 'public/view/forgot.php';
	include('public/view/templates/template.php');
});
Db::closeDatabase();
Router::run();
?>
