<?php
require_once __DIR__ . '/suppressErrors.php';
require_once __DIR__ . '/validateApiParams.php';
require_once __DIR__ . '/TestDataReader.php';


function getSinceParam() {
	if (isset($_GET['since'])) {
		return intval($_GET['since']);
	} else {
		return -INF;
	}
}