<?php
function remove_html_scc ($content) {
    return preg_replace("/&#?[a-z0-9]{2,8};/i","",$content);
}