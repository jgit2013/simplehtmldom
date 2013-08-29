<?php
error_reporting(E_ALL);
include_once('../simple_html_dom.php');
include_once('tool.php');

$html = new simple_html_dom();

$html->load_file('1377503897.Rawdata_10_1_35_1.html');

//玩法
$span_event_header_market = $html->find('span.event-header-market');

$span_event_header_market[0]->innertext = trim(strip_tags($span_event_header_market[0]->innertext));

echo '<pre>'; print_r($span_event_header_market[0]->innertext);

//時間 賽事 玩法 表格內容
$table_first_tbody = $html->find('table')->find('tbody', 0);

echo '<pre>'; var_dump($table_first_tbody);

$table_first_tbody_tr_ths = null;
$table_tbody_tr_tds = null;

$count_trs = 0;

$odds_full_asian_handicap = array();
$odds_full_bs_handicap = array();
$odds_full_12_handicap = array();
$odds_full_sd_handicap = array();

$odds_half_asian_handicap = array();
$odds_half_bs_handicap = array();
$odds_half_12_handicap = array();

$game_number = 1;

$count_teams = 0;

$trs = $table_first_tbody->find('tr');

foreach ($trs as $tr) {
    $ths = $tr->find('th');
    
    if (sizeof($ths) == 5) {
        $table_first_tbody_tr_ths['title_time'] = trim(strip_tags($ths[0]->innertext));
        $table_first_tbody_tr_ths['title_game'] = trim(strip_tags($ths[1]->innertext));
        $table_first_tbody_tr_ths['title_plays']['full']['name'] = trim(strip_tags($ths[2]->innertext));
        $table_first_tbody_tr_ths['title_plays']['half']['name'] = trim(strip_tags($ths[3]->innertext));
    } else {
        $rules_full = array();
        $rules_half = array();
        
        for ($i = 0;$i < sizeof($ths);$i++) {
            if ($i < 4) {
                $rules_full[] = trim(strip_tags($ths[$i]->innertext));
            } else {
                $rules_half[] = trim(strip_tags($ths[$i]->innertext));
            }
        }
        
        $table_first_tbody_tr_ths['title_plays']['full']['rules'] = $rules_full;
        $table_first_tbody_tr_ths['title_plays']['half']['rules'] = $rules_half;
    }
}

echo '<pre>'; print_r($table_first_tbody_tr_ths);
echo '<pre>'; print_r($table_tbody_tr_tds);
