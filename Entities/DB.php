<?php

namespace Entities;

class DB
{
	const DB_FILE = 'database.json';

	public function __construct()
	{
		if (!file_exists(self::DB_FILE)) {
			file_put_contents(self::DB_FILE,  json_encode([]));
		}
	}

	public function get(): bool|array
	{
		return json_decode(file_get_contents(self::DB_FILE));
	}

	public function set($data)
	{
		$tmpData = $this->get();
		$tmpData[] = $data;
		file_put_contents(self::DB_FILE,  json_encode($tmpData));
	}

}