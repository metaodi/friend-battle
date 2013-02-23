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

// TODO: proper error handling!
$app->match('/api/login/{token}', function($token) use ($app) {
    $app['fb']->setAccesstoken($token);
    $me = $app['fb']->api('/me');
    return $app->json($me);
});

$app->match('/api/activitystream', function() use ($app) {
    $me = $app['fb']->api('/me/home');
    return $app->json($me);
});

$app->match('/invite.json', function() use ($app) {
    return $app->json(array(
        'message' => 'blo'
    ));
});

$app['debug'] = true;
$app->run();
