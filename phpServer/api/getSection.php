<?php
require_once __DIR__ . '/../.php/apiCommon.php';
require_once __DIR__ . '/../.php/getApiResponse.php';
require_once __DIR__ . '/../.php/sendApiResponse.php';


$since = getSinceParam();
$collectionName = 'sections';

$result = getApiResponse($collectionName, $since);
sendResponse($result);