<?php
require_once __DIR__ . '/../.php/apiCommon.php';
require_once __DIR__ . '/../.php/getApiResponse.php';
require_once __DIR__ . '/../.php/sendApiResponse.php';


if (isset($_GET['withRemoteImg'])) {
	$withRemoteImg = $_GET['withRemoteImg'] == true;
} else {
	$withRemoteImg = false;
}

$since = getSinceParam();
if ($withRemoteImg) {
	$collectionName = 'questions.remoteImg';
} else {
	$collectionName = 'questions.localImg';
}


$result = getApiResponse($collectionName, $since);
sendResponse($result);