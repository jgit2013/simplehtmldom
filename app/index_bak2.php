<?php
include_once('../simple_html_dom.php');

// Retrieve the DOM from a given URL
//$html = file_get_html('http://www.google.com');
$html = file_get_html('1377503895.Rawdata_10_1_39_1.html');

// Find all "A" tags and print their HREFs
/* echo 'all A tags<br>';
foreach($html->find('a') as $e) {
    echo $e->href . '<br>';
}
echo '<br>'; */

// Retrieve all images and print their SRCs
/* echo 'all images SRCs<br>';
foreach($html->find('img') as $e) {
    echo $e->src . '<br>';
}
echo '<br>'; */

// Find all images, print their text with the "<>" included
/* echo 'all images text<br>';
foreach($html->find('img') as $e) {
    echo $e->outertext . '<br>';
}
echo '<br>'; */

/* echo 'th in thead<br>';
foreach($html->find('thead th') as $e) {
    //echo $e->innertext . '<br>';
    
    echo $e->innertext;
    echo '<br>';
}
echo '<br>'; */

echo 'table tbody<br>';
foreach($html->find('table tbody tr td') as $e) {
    //echo $e->innertext . '<br>';
    
    echo $e->innertext;
    echo '<br>';
}
echo '<br>';

// Find all SPAN tags that have a class of "myClass"
/* echo 'all SPAN tags<br>';
foreach($html->find('span') as $e) {
    echo $e->outertext . '<br>';
}
echo '<br>'; */

// Find all TD tags with "align=center"
/* echo 'all TD tags with align=center<br>';
foreach($html->find('td[align=center]') as $e) {
    echo $e->innertext . '<br>';
}
echo '<br>'; */

// Extract all text from a given cell
//echo $html->find('td[align="center"]', 1)->plaintext.'<br><hr>';
