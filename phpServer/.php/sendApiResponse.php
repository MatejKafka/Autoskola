<?php

function sendResponse($responseObj) {
	http_response_code($responseObj['status']);
	header('Content-type:application/json; charset=utf-8');
	if (!is_null($responseObj['message'])) {
		echo $responseObj['message'];
	}
	exit();
}