<?php
error_reporting(E_ALL);
include_once('../simple_html_dom.php');
include_once('tool.php');

$html = new simple_html_dom();

$html->load_file('1377503904.Rawdata_10_1_36_1.html');

//玩法
$span_event_header_market = $html->find('span.event-header-market');

$span_event_header_market[0]->innertext = trim(strip_tags($span_event_header_market[0]->innertext));

echo '<pre>'; print_r($span_event_header_market[0]->innertext);

//時間 賽事 玩法 表格內容
$table_tbodys = $html->find('table tbody');

$table_tbody_tr_ths = null;
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

foreach ($table_tbodys as $tbody) {
    $trs = $tbody->find('tr');
    
    foreach ($trs as $tr) {
        if ($count_trs < 2) {
            $ths = $tr->find('th');
            
            if (sizeof($ths) == 5) {
                $table_tbody_tr_ths['title_time'] = trim(strip_tags($ths[0]->innertext));
                $table_tbody_tr_ths['title_game'] = trim(strip_tags($ths[1]->innertext));
                $table_tbody_tr_ths['title_plays']['full']['name'] = trim(strip_tags($ths[2]->innertext));
                $table_tbody_tr_ths['title_plays']['half']['name'] = trim(strip_tags($ths[3]->innertext));
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
                
                $table_tbody_tr_ths['title_plays']['full']['rules'] = $rules_full;
                $table_tbody_tr_ths['title_plays']['half']['rules'] = $rules_half;
            }
        } else {
            $tds = $tr->find('td');
            
            //echo sizeof($tds).'<br>';
            
            if (sizeof($tds) == 1) {
                if ( ! is_null($table_tbody_tr_tds['game'.$game_number]['league_name'])) {
                    $game_number++;
                }
                
                $table_tbody_tr_tds['game'.$game_number]['league_name'] = trim(strip_tags($tds[0]->innertext));
            } else {
                if (sizeof($tds) == 10) {
                    //抓時間
                    $divs = $tds[0]->find('div.time-column-content');
                    
                    $date_and_time = explode('<br>', trim($divs[0]->innertext));
                    
                    $date = trim(strip_tags($date_and_time[0]));
                    $time = trim(strip_tags($date_and_time[1]));
                    
                    if (($date != '') && ($time != '')) {
                        $table_tbody_tr_tds['game'.$game_number]['time'][] = array('date' => $date, 'time' => $time);
                    }
                    
                    //抓比賽隊伍
                    $spans = $tds[1]->find('span');
                    
                    $home = trim(strip_tags($spans[0]->innertext));
                    $away = trim(strip_tags($spans[1]->innertext));
                    
                    if (($home != '') && ($away != '')) {
                        $table_tbody_tr_tds['game'.$game_number]['teams'][] = array('home' => $home, 'away' => $away);
                    }
                    
                    for ($i = 2;$i < (sizeof($tds) - 1);$i++) {
                        $span_hdp_point = $tds[$i]->find('span.hdp-point');
                        $span_ou_tag = $tds[$i]->find('span.ou-tag');
                        $span_oe_tag = $tds[$i]->find('span.oe-tag');
                        $span_id = $tds[$i]->find('span[id]');
                        
                        $span_hdp_point[0] = remove_html_scc(trim(strip_tags($span_hdp_point[0])));
                        $span_ou_tag[0] = remove_html_scc(trim(strip_tags($span_ou_tag[0])));
                        $span_oe_tag[0] = remove_html_scc(trim(strip_tags($span_oe_tag[0])));
                        $span_id[0] = remove_html_scc(trim(strip_tags($span_id[0])));
                        
                        switch ($i) {
                            case 2 : {
                                if ($span_hdp_point[0] != '') {
                                    $odds_full_asian_handicap[] = $span_hdp_point[0];
                                }
                                
                                if ($span_id[0] != '') {
                                    $odds_full_asian_handicap[] = $span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 3 : {
                                if ($span_hdp_point[0] != '') {
                                    $odds_full_bs_handicap[] = $span_hdp_point[0];
                                }
                                
                                if ($span_id[0] != '') {
                                    $odds_full_bs_handicap[] = $span_ou_tag[0].$span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 4 : {
                                if ($span_id[0] != '') {
                                    $odds_full_12_handicap[] = $span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 5 : {
                                if ($span_id[0] != '') {
                                    $odds_full_sd_handicap[] = $span_oe_tag[0].$span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 6 : {
                                if ($span_hdp_point[0] != '') {
                                    $odds_half_asian_handicap[] = $span_hdp_point[0];
                                }
                                
                                if ($span_id[0] != '') {
                                    $odds_half_asian_handicap[] = $span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 7 : {
                                if ($span_hdp_point[0] != '') {
                                    $odds_half_bs_handicap[] = $span_hdp_point[0];
                                }
                                
                                if ($span_id[0] != '') {
                                    $odds_half_bs_handicap[] = $span_ou_tag[0].$span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 8 : {
                                if ($span_id[0] != '') {
                                    $odds_half_12_handicap[] = $span_id[0];
                                }
                                
                                break;
                            }
                        }
                    }
                    
                    $count_teams++;
                } else {
                    for ($i = 0;$i < sizeof($tds);$i++) {
                        $span_hdp_point = $tds[$i]->find('span.hdp-point');
                        $span_ou_tag = $tds[$i]->find('span.ou-tag');
                        $span_oe_tag = $tds[$i]->find('span.oe-tag');
                        $span_id = $tds[$i]->find('span[id]');
                        
                        $span_hdp_point[0] = remove_html_scc(trim(strip_tags($span_hdp_point[0])));
                        $span_ou_tag[0] = remove_html_scc(trim(strip_tags($span_ou_tag[0])));
                        $span_oe_tag[0] = remove_html_scc(trim(strip_tags($span_oe_tag[0])));
                        $span_id[0] = remove_html_scc(trim(strip_tags($span_id[0])));
                        
                        switch ($i) {
                            case 0 : {
                                if ($span_hdp_point[0] != '') {
                                    $odds_full_asian_handicap[] = $span_hdp_point[0];
                                }
                                
                                if ($span_id[0] != '') {
                                    $odds_full_asian_handicap[] = $span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 1 : {
                                if ($span_hdp_point[0] != '') {
                                    $odds_full_bs_handicap[] = $span_hdp_point[0];
                                }
                                
                                if ($span_id[0] != '') {
                                    $odds_full_bs_handicap[] = $span_ou_tag[0].$span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 2 : {
                                if ($span_id[0] != '') {
                                    $odds_full_12_handicap[] = $span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 3 : {
                                if ($span_id[0] != '') {
                                    $odds_full_sd_handicap[] = $span_oe_tag[0].$span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 4 : {
                                if ($span_hdp_point[0] != '') {
                                    $odds_half_asian_handicap[] = $span_hdp_point[0];
                                }
                                
                                if ($span_id[0] != '') {
                                    $odds_half_asian_handicap[] = $span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 5 : {
                                if ($span_hdp_point[0] != '') {
                                    $odds_half_bs_handicap[] = $span_hdp_point[0];
                                }
                                
                                if ($span_id[0] != '') {
                                    $odds_half_bs_handicap[] = $span_ou_tag[0].$span_id[0];
                                }
                                
                                break;
                            }
                            
                            case 6 : {
                                if ($span_id[0] != '') {
                                    $odds_half_12_handicap[] = $span_id[0];
                                }
                                
                                break;
                            }
                        }
                    }
                    
                    $count_teams++;
                }
                
                if ($count_teams == 2) {
                    $count_teams = 0;
                    
                    if (sizeof ($odds_full_asian_handicap) != 0) {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['full']['asian'][] = $odds_full_asian_handicap;
                    } else {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['full']['asian'] = null;
                    }
                    
                    if (sizeof ($odds_full_bs_handicap) != 0) {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['full']['bs'][] = $odds_full_bs_handicap;
                    } else {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['full']['bs'] = null;
                    }
                    
                    if (sizeof ($odds_full_12_handicap) != 0) {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['full']['12'][] = $odds_full_12_handicap;
                    } else {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['full']['12'] = null;
                    }
                    
                    if (sizeof ($odds_full_sd_handicap) != 0) {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['full']['sd'][] = $odds_full_sd_handicap;
                    } else {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['full']['sd'] = null;
                    }
                    
                    if (sizeof ($odds_half_asian_handicap) != 0) {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['half']['asian'][] = $odds_half_asian_handicap;
                    } else {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['half']['asian'] = null;
                    }
                    
                    if (sizeof ($odds_half_bs_handicap) != 0) {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['half']['bs'][] = $odds_half_bs_handicap;
                    } else {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['half']['bs'] = null;
                    }
                    
                    if (sizeof ($odds_half_12_handicap) != 0) {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['half']['12'][] = $odds_half_12_handicap;
                    } else {
                        $table_tbody_tr_tds['game' . $game_number]['odds']['half']['12'] = null;
                    }
                    
                    $odds_full_asian_handicap = array();
                    $odds_full_bs_handicap = array();
                    $odds_full_12_handicap = array();
                    $odds_full_sd_handicap = array();
                    
                    $odds_half_asian_handicap = array();
                    $odds_half_bs_handicap = array();
                    $odds_half_12_handicap = array();
                }
            }
        }
        
        $count_trs++;
    }
}

echo '<pre>'; print_r($table_tbody_tr_ths);
echo '<pre>'; print_r($table_tbody_tr_tds);
