<?php

$app->register(new Silex\Provider\DoctrineServiceProvider());
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => array(__DIR__ . '/views')
));

$app['fb'] = new Facebook(array(
    'appId' => '540154819351099',
    'secret' => '91867cffa1cddebd624b619901997083',
));

return $app;
