<?php

class TestDataReader {
	const TEST_DATA_PATH = __DIR__ . '/../.data/testData/';

	public static function collectionExists($collectionName) {
		return file_exists(TestDataReader::TEST_DATA_PATH . $collectionName . '.json');
	}

	public static function getLastChangeDate($collectionName) {
		$fileContent = file_get_contents(TestDataReader::TEST_DATA_PATH . $collectionName . '.json.lastChange');
		if ($fileContent) {
			return intval($fileContent);
		} else {
			throw new Exception('Missing collection: ' . $collectionName);
		}
	}

	public static function getCollectionStr($collectionName) {
		$fileContent = file_get_contents(TestDataReader::TEST_DATA_PATH . $collectionName . '.json');
		if ($fileContent) {
			return $fileContent;
		} else {
			throw new Exception('Missing collection: ' . $collectionName);
		}
	}
}