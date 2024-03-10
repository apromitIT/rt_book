<?php
require_once 'Autoloader.php';

use Entities\Comment;
use Entities\DB;
use Controllers\CommentController;

$controller = new CommentController(new DB(), new Comment());
$controller->index();
