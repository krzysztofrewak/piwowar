<?php

declare(strict_types=1);

$articles = [];
$authors = [];
$colors = [];
$tags = [];

$number = 0;
while (true) {
    $filename = "./resources/$number.json";
    if (!file_exists($filename)) {
        break;
    }
    $number++;
}

$issuesNumber = $number;

foreach (range($number - 1, 0) as $number) {
    $filename = "./resources/$number.json";
    if (!file_exists($filename)) {
        break;
    }

    $issue = json_decode(file_get_contents($filename), true);

    foreach ($issue["articles"] as $article) {
        foreach ($article["authors"] as $author) {
            if ($author) {
                $authors[$author] = isset($authors[$author]) ? $authors[$author] + 1 : 1;
            }
        }
        foreach ($article["tags"] as $tag) {
            if ($tag) {
                $tags[$tag] = isset($tags[$tag]) ? $tags[$tag] + 1 : 1;
            }
        }

        $colors[$issue["color"]] = true;

        $article["issue"] = $issue["issue"];
        $article["color"] = $issue["color"];
        $articles[] = $article;
    }
    $number++;
}

arsort($authors);
foreach ($authors as $author => &$value) {
    $value = [
        "name" => $author,
        "articles" => $value,
    ];
}
$authors = array_values($authors);

arsort($tags);
foreach ($tags as $tag => &$value) {
    $value = [
        "name" => $tag,
        "articles" => $value,
    ];
}
$tags = array_values($tags);

$colors = array_keys($colors);

file_put_contents("./data/articles.json", json_encode($articles, JSON_UNESCAPED_UNICODE));
file_put_contents("./data/authors.json", json_encode($authors, JSON_UNESCAPED_UNICODE));
file_put_contents("./data/colors.json", json_encode($colors, JSON_UNESCAPED_UNICODE));
file_put_contents("./data/tags.json", json_encode($tags, JSON_UNESCAPED_UNICODE));

echo "Content generated." . PHP_EOL;
echo "| issues   | " . str_pad((string)$issuesNumber, 4) . " |" . PHP_EOL;
echo "| articles | " . str_pad((string)count($articles), 4) . " |" . PHP_EOL;
echo "| authors  | " . str_pad((string)count($authors), 4) . " |" . PHP_EOL;
echo "| colors   | " . str_pad((string)count($colors), 4) . " |" . PHP_EOL;
echo "| tags     | " . str_pad((string)count($tags), 4) . " |" . PHP_EOL;
