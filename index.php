<?php

declare(strict_types=1);

$articles = [];
$authors = [];
$colors = [];

$issue = json_decode(file_get_contents("./resources/29.json"), true);
foreach ($issue["articles"] as $article) {
    foreach ($article["authors"] as $author) {
        $authors[$author] = isset($authors[$author]) ? $authors[$author] + 1 : 1;
    }

    $colors[$issue["color"]] = true;

    $article["issue"] = $issue["issue"];
    $article["color"] = $issue["color"];
    $article["authors"] = implode(", ", $article["authors"]);
    $articles[] = $article;
}

arsort($authors);
foreach ($authors as $author => &$value) {
    $value = [
        "name" => $author,
        "articles" => $value,
    ];
}
$authors = array_values($authors);

$colors = array_keys($colors);

file_put_contents("./data/articles.json", json_encode($articles));
file_put_contents("./data/authors.json", json_encode($authors));
file_put_contents("./data/colors.json", json_encode($colors));