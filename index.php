<?php
use App\Autoloader;
use App\User;
use App\Router;
use App\App;

session_start();

//Set the autoloader
require 'app/autoloader.class.php';
Autoloader::register();

Router::get('/', function() {
	if (!isset($_SESSION['username']))
		header('Location: http://localhost:80/login');
	return 'public/view/home.php';
});
Router::get('/login', function() {
	return 'public/view/login.php';
});
Router::get('/sign', function() {
	return 'public/view/sign.php';
});
Router::get('/forgot', function() {
	return 'public/view/forgot.php';
});
Router::post('/login', function() {
	return 'public/view/login.php';
});
$content = Router::run();
include('public/view/templates/template.php');
?>
