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

$app->match('/api/login/{token}', function($token) use ($app) {
    $app['fb']->setAccesstoken($token);
    // add new users to database
    $me = $app['fb']->api('/me');
    $friends = $app['fb']->api('/me/friends');
    $users = $friends['data'];
    $users[] = array('id' => $me['id'], 'name' => $me['name']);
    foreach ($users as $user) {
        $sql = "INSERT IGNORE INTO user SET id = '" . $app->escape($user['id']) . "', name = '" . $app->escape($user['name']) . "'";
        $app['db']->executeQuery($sql);
    }
    return $app->json($me);
});

$app->match('/api/activitystream', function() use ($app) {
    $me = $app['fb']->api('/me/home');
    return $app->json($me);
});

$app->match('/api/leaderboard', function() use ($app) {
    $sql = 'SELECT name, coins FROM user ORDER BY coins DESC LIMIT 10';
    $leaderboard = $app['db']->fetchAll($sql);
    return $app->json($leaderboard);
});

$app->match('/api/request/{ids}', function($ids) use ($app) {
    $user = $app['fb']->getUser();
    $sql = 'SELECT inviting_user_id FROM invites
            WHERE invited_user_id = :id';

    // reward all users that send you an invite
    $invites = $app['db']->executeQuery($sql, array('id' => $app->escape($user)))->fetchAll(PDO::FETCH_COLUMN);
    $newInvites = array();
    foreach (explode(',', $ids) as $id) {
        $request = $app['fb']->api($id);
        $id = $request['from']['id'];
        if (!in_array($id, $invites) && !in_array($id, $newInvites)) {
            $newInvites[] = $id;
            $app['db']->insert('invites', array(
                'inviting_user_id' => $id,
                'invited_user_id' => $user
            ));
        }
    }

    if (count($newInvites)) {
        $newInvites[] = $user;
        $sql = 'UPDATE user SET coins = coins + 15 WHERE id IN (' . join(', ', $newInvites) . ')';
        $app['db']->executeQuery($sql);
    }
    $message = count($newInvites) ?
        'You and ' . join(' and ', $newInvites) . ' got 15 credits for joining the game!' :
        'You already accepted an invitation';

    return $app->json(array(
        'message' => $message,
        'acceptedInvites' => $newInvites
    ));
});

$app['debug'] = true;
$app->run();
