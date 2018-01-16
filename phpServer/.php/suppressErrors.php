<?php
error_reporting(0);

function errorHandler ($errno = null, $errmsg = null) {
	echo '500 Internal Server Error';
	http_response_code(500);
	exit();
}

set_error_handler('errorHandler');

register_shutdown_function(function () {
	$lastErr = error_get_last();
	if ($lastErr['type'] == E_ERROR) {
		errorHandler(E_ERROR, $lastErr['message']);
	}
});