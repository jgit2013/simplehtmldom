<?php
include 'tool.php';

$content = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

echo $content.'<br>';

$content = remove_html_scc($content);

echo $content.'<br>';

if ($content == '') {
    echo 'Yes';
} else {
    echo 'No';
}

echo '<pre>'; var_dump($content);
