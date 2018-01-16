<?php
require_once __DIR__ . '/TestDataReader.php';


function getApiResponse($collectionName, $since) {
	if (!TestDataReader::collectionExists($collectionName)) {
		return [
			'status' => 404,
			'message' => 'Missing collection: ' . $collectionName
		];
	}

	$lastChangeTime = TestDataReader::getLastChangeDate($collectionName);
	if ($since > $lastChangeTime) {
		return [
			'status' => 304,
			'message' => null
		];
	}

	return [
		'status' => 200,
		'message' => TestDataReader::getCollectionStr($collectionName)
	];
}