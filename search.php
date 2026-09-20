<?php
header("Access-Control-Allow-Origin: *");
header("Contant-type : application/json");
$json_string = file_get_contents("data.json");
$books = json_decode($json_string,true);   

if (!isset($_GET["find"])) {
    exit();
}
else{
 $find = strtolower ($_GET["find"]);
}

$output = array();
$remain = array();


foreach ($books as $book) {
    if(substr_count($book["title"] , $find)){
        $output[] = $book;
    }
    else{
        $remain[] = $book;
    }
    }

    foreach ($remain as $book) {
        if  (substr_count(strtolower($book["description"]) , $find)){
            $output[] = $book;
    }}

    echo json_encode($output , JSON_PRETTY_PRINT); 