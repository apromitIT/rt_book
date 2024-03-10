<?php

namespace Entities;

class Comment
{
	public array $arCommentData;
	private string $name;
	private string $email;
	private string $text;
	private string $published;

	public function __construct()
	{
		date_default_timezone_set("Europe/Moscow");
		$this->published = date("Y.m.d, H:i:s");
	}

	/**
	 * @param string $name
	 */
	public function setName(string $name): void
	{
		$this->name = $name;
	}

	/**
	 * @param string $email
	 */
	public function setEmail(string $email): void
	{
		$this->email = $email;
	}

	/**
	 * @param string $text
	 */
	public function setText(string $text): void
	{
		$this->text = $text;
	}

	public function getFullInfo()
	{
		$this->arCommentData['name'] = $this->name;
		$this->arCommentData['email'] = $this->email;
		$this->arCommentData['text'] = $this->text;
		$this->arCommentData['published'] = $this->published;

		return $this->arCommentData;
	}

}