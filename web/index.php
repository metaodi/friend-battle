<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__.'/../vendor/autoload.php';
$app = new Silex\Application();

require __DIR__.'/../src/config.php';
require __DIR__.'/../src/app.php';

$app->match('/', function() use ($app) {
    return $app['twig']->render('index.html.twig');
});

$app['debug'] = true;
$app->run();
