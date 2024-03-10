<?php

namespace Controllers;

class CommentController
{
	private $db;
	private $comment;

	public function __construct($db, $comment)
	{
		$this->db = $db;
		$this->comment = $comment;
	}

	public function index()
	{
		if (!empty($_POST['name'])) {
			$this->comment->setName(trim(htmlspecialchars($_POST['name'])));
			$this->comment->setEmail(trim(htmlspecialchars($_POST['email'])));
			$this->comment->setText(trim(htmlspecialchars($_POST['text'])));
			$arCommentData = $this->comment->getFullInfo();
			$this->db->set($arCommentData);
			$this->sendJson([$arCommentData]);
		}
		$comments = $this->db->get();
		if (count($comments) == 0) {
			$comments['emptyMsg'] = 'Записей нет.';
		}
		$this->sendJson($comments);
	}

	protected function sendJson($data)
	{
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($data);
		exit();
	}
}