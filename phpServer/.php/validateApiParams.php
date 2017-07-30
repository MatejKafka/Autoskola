<?php

if (isset($_GET['id'])) {
	http_response_code(400);
	echo 'sorry, this server version does not support id parameter';
	exit();
}

if (isset($_GET['since']) && !ctype_digit($_GET['since'])) {
	http_response_code(400);
	echo 'if defined, since parameter must be an integer';
	exit();
}