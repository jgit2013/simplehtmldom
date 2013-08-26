/*******************************************************************************************
 * OddsUtils.js
 * Description: Javascript utility functions for Odds Display Framework
 * Author: Yai Chen
 *******************************************************************************************/

var REFRESH_GAP = true; // a flag to noted is odds display refreshing

var CLS_ODD = "UdrDogOddsClass";
var CLS_EVEN = "FavOddsClass";
//Scott 2008.5.15 for Deposit Select League DIV Width
var DEPOSIT_LEAGUE_WIDTH = 600;
var MEMBER_LEAGUE_WIDTH = 640;
var fFrame = getParent(window);

var siteObj = new Object();
Set4HourColor();
SetSelectDateColor();
SetSpanTag();
SetCss();
siteObj._IsPhonebet = fFrame.SiteMode==1;
function Set4HourColor()
{
  siteObj._4HourColor = fFrame.HourLinkColor;
}

function SetSelectDateColor()
{
	siteObj._SelectDateColor_Def = fFrame.DateColor;
  if (fFrame.SiteId=="4200800" || fFrame.SiteId=="4200200")
  {
	  siteObj._SelectDateColor_Sel = "#0c5790";
  }
  else
  {
	  siteObj._SelectDateColor_Sel = "#9F0915";
  }
}

function SetSpanTag()
{
    if (fFrame.SiteId =="4280" || fFrame.SiteId=="4200800")
    {
        siteObj._SpanTagS = "<span>";
        siteObj._SpanTagE = "</span>";
    }
    else
    {
        siteObj._SpanTagS = "";
        siteObj._SpanTagE = "";
    }
}

function SetCss()
{
	    if (fFrame.SiteId=="4280" || fFrame.SiteId=="4200800")
	    {
	        siteObj._t_Order_Css=" right";
	    }
	    else
	    {
	        siteObj._t_Order_Css="";
        }
}

function getParent(cFrame)
{
  var aFrame = cFrame;
  for (var i = 0; i < 4; i++) {
    if(aFrame.SiteMode != null) {
      return aFrame;
    } else {
      aFrame = aFrame.parent;
    }
  }
  return null;
}

function getOddsClass(Odds) {
  return (Odds < 0) ? CLS_EVEN: CLS_ODD;
}

var bShowLoading = true;
var iRefreshCount = REFRESH_COUNTDOWN;
var RefresHandle;

function refreshData() {
  if (fFrame.IsLogin)
  {
      if (fFrame.leftFrame == null || fFrame.leftFrame.eObj == null)
      {
		    window.setTimeout("refreshData()", 500);
		    return;
      }
  }
  if (!REFRESH_GAP) return;

  btnstop();

  window.clearTimeout(RefresHandle);
  RefresHandle = window.setTimeout(refreshData, REFRESH_INTERVAL);

  if ( (g_OddsKeeper == null) || (iRefreshCount <= 0) ) {
    document.DataForm.RT.value = "W";
    iRefreshCount = REFRESH_COUNTDOWN;
  } else {
    iRefreshCount--;
  }

  if (bShowLoading){
    document.getElementById("BetList").style.display = "block";
    bShowLoading = false;
  }

  document.DataForm.submit();

  if (PopLauncher!=null)
  {
    if (sKeeper!=null && PopLauncher.isOpened)
    {
        if (ThreadId!=null && ThreadId!="")
        {
            recallAjax(ThreadId)
        }
    }
    else
    {
        ThreadId=null;
    }
  }
  else
  {
    ThreadId=null;
  }
}

function btnstop() {
    var aSorter = document.getElementById("aSorter");
    if (aSorter != null)
    {
        if (fFrame.IsNewDropdownList)
            aSorter.className = "buttons disabled";
        aSorter.disabled = true;
    }

  REFRESH_GAP = false;
  var oBtn;
  var aDiv = document.getElementById("divSelectDate");
  if ((aDiv != null) && (aDiv.style.display != "none")) {
    for (var i = 0; i < aDiv.childNodes.length; i++) {
      oBtn = aDiv.childNodes[i];
      if ((oBtn.tagName != null) && (oBtn.tagName.toUpperCase() == "SPAN")) {
        oBtn.disabled = true;
      }
    }
  }
  var aSel = document.getElementById("selOddsType");
  if (aSel !== null) {
    aSel.disabled = true;
  }

  var arrBottons = document.getElementsByName("btnRefresh");
  for (var i = 0; i < arrBottons.length; i++) {
    arrBottons[i].disabled = true;
    arrBottons[i].innerHTML = "";
    if(fFrame.SiteId=="4280" || fFrame.SiteId=="4200800"){
        arrBottons[i].innerHTML = "<span><span>" + RES_PLEASE_WAIT + "</span></sapn>";
    }else{
        arrBottons[i].innerHTML = "<span>" + RES_PLEASE_WAIT + "</sapn>";
    }
    arrBottons[i].style.font.color = "gray";
    if (fFrame.IsNewDropdownList)
        arrBottons[i].className = "button-ref disabled";
  }
  arrBottons = document.getElementsByName("btnRefresh_D");
  for (var i = 0; i < arrBottons.length; i++) {
    arrBottons[i].disabled = true;
    arrBottons[i].innerHTML = "";
    if(fFrame.SiteId=="4280" || fFrame.SiteId=="4200800"){
        arrBottons[i].innerHTML = "<span><span>" + RES_PLEASE_WAIT + "</span></sapn>";
    }else{
        arrBottons[i].innerHTML = "<span>" + RES_PLEASE_WAIT + "</sapn>";
    }
    arrBottons[i].style.font.color = "gray";
    if (fFrame.IsNewDropdownList)
        arrBottons[i].className = "button-ref disabled";
  }
  arrBottons = document.getElementsByName("btnRefresh_L");
  for (var i = 0; i < arrBottons.length; i++) {
    arrBottons[i].disabled = true;
    arrBottons[i].innerHTML = "";
    if(fFrame.SiteId=="4280" || fFrame.SiteId=="4200800"){
        arrBottons[i].innerHTML = "<span><span>" + RES_PLEASE_WAIT + "</span></span>";
    }else{
        arrBottons[i].innerHTML = "<span>" + RES_PLEASE_WAIT + "</sapn>";
    }
    arrBottons[i].style.font.color = "gray";
    if (fFrame.IsNewDropdownList)
        arrBottons[i].className = "button-ref disabled";
  }
  if (fFrame.IsNewDropdownList)
  {
      oBtn = document.getElementById("btnRefresh_L");
      if (oBtn != null)
          oBtn.className = "buttons disabled";
      oBtn = document.getElementById("btnRefresh_D");
      if (oBtn != null)
          oBtn.className = "buttons disabled";
  }
  var timer = setTimeout("btnstart()",15000);
}

function btnstart() {
    if (REFRESH_GAP)
        return;
  var oBtn;
  var aDiv = document.getElementById("divSelectDate");
  if ((aDiv != null) && (aDiv.style.display != "none")) {
    for (var i = 0; i < aDiv.childNodes.length; i++) {
      oBtn = aDiv.childNodes[i];
      if ((oBtn.tagName != null) && (oBtn.tagName.toUpperCase() == "SPAN")) {
        oBtn.disabled = false;
      }
    }
  }

    var aSel = document.getElementById("selOddsType");
    if (aSel !== null)
    {
        aSel.disabled = false;
    }
    if (fFrame.IsNewDropdownList)
    {
        oBtn = document.getElementById("btnRefresh_L");
        if (oBtn != null)
            oBtn.className = "buttons";
        oBtn = document.getElementById("btnRefresh_D");
        if (oBtn != null)
            oBtn.className = "buttons";
    }
  var arrBottons = document.getElementsByName("btnRefresh");
  for (var i = 0; i < arrBottons.length; i++) {
    arrBottons[i].innerHTML = "";
    if(fFrame.SiteId=="4280" || fFrame.SiteId=="4200800"){
        arrBottons[i].innerHTML = "<span><span>" + RES_REFRESH + "</span></span>";
    }else{
        arrBottons[i].innerHTML = "<span>" + RES_REFRESH + "</span>";
    }
    arrBottons[i].disabled = false;
    arrBottons[i].style.font.color = "black";
    if (fFrame.IsNewDropdownList)
        arrBottons[i].className = "button-ref";
  }
  arrBottons = document.getElementsByName("btnRefresh_L");
  for (var i = 0; i < arrBottons.length; i++) {
    arrBottons[i].innerHTML = "";
    if(fFrame.SiteId=="4280" || fFrame.SiteId=="4200800"){
        arrBottons[i].innerHTML = "<span><span>" + RES_REFRESH + "</span></span>";
    }else{
        arrBottons[i].innerHTML = "<span>" + RES_REFRESH + "</span>";
    }
    arrBottons[i].disabled = false;
    arrBottons[i].style.font.color = "black";
    if (fFrame.IsNewDropdownList)
        arrBottons[i].className = "button-ref";
  }
  arrBottons = document.getElementsByName("btnRefresh_D");
  for (var i = 0; i < arrBottons.length; i++) {
        arrBottons[i].innerHTML = "";
        if(fFrame.SiteId=="4280" || fFrame.SiteId=="4200800"){
            arrBottons[i].innerHTML = "<span><span>" + RES_REFRESH + "</span></span>";
        }else{
            arrBottons[i].innerHTML = "<span>" + RES_REFRESH + "</span>";
        }
        arrBottons[i].disabled = false;
        arrBottons[i].style.font.color = "black";
        if (fFrame.IsNewDropdownList)
            arrBottons[i].className = "button-ref";
    }
    REFRESH_GAP = true;
    var aSorter = document.getElementById("aSorter");
    if (fFrame.IsNewDropdownList)
    {
        oBtn = document.getElementById("btnRefresh_L");
        if (oBtn != null)
            oBtn.className = "buttons";
        oBtn = document.getElementById("btnRefresh_D");
        if (oBtn != null)
            oBtn.className = "buttons";

        if (aSorter != null &&
    (document.getElementById("btnRefresh_L") == null || (document.getElementById("btnRefresh_L") != null
     && document.getElementById("btnRefresh_L").className == "buttons")) &&
     (document.getElementById("btnRefresh_D") == null || (document.getElementById("btnRefresh_D") != null
     && document.getElementById("btnRefresh_D").className == "buttons")))
        {
            aSorter.className = "buttons";
            aSorter.disabled = false;
        }
        var oDisstyle = document.getElementById("disstyle");
        if (oDisstyle != null)
            oDisstyle.className = "dropDown";

        var oSel = document.getElementById("selOddsType");
        if (oSel != null)
            oSel.className = "dropDown";
    }
    else
    {
        if (aSorter != null)
            aSorter.disabled = false;
    }
}

/*
 * to control color of odds display row for mouseover and mouseout event
 */
function changeBGColor2(ObjName, Color) {
  var tr1 = document.getElementById(ObjName + "_1");
  var tr2 = document.getElementById(ObjName + "_2");
  tr1.style.backgroundColor = Color;
  if(tr2 != null)
      tr2.style.backgroundColor = Color;
}

function changeBGClass2(ObjName, clsname) {
	var tr1 = document.getElementById(ObjName + "_1");
	var tr2 = document.getElementById(ObjName + "_2");
	tr1.className = clsname;
	if(tr2 != null)
	    tr2.className = clsname;
}

function changeBGColor3(ObjName, Color) {
  var tr1 = document.getElementById(ObjName + "_1");
  var tr2 = document.getElementById(ObjName + "_2");
  var tr3 = document.getElementById(ObjName + "_3");
  tr1.style.backgroundColor = Color;
  tr2.style.backgroundColor = Color;
  tr3.style.backgroundColor = Color;
}

/*
 * detect had the js template for odds display been loaded.
 * if loaded return true, else return false and load it
 */
function initialTmpl(frameId, url, TimeoutFunc) {
  if (fFrame.hash_TmplLoaded[frameId] == null) {
    fFrame.document.getElementById(frameId).contentWindow.location.href = url;
    fFrame.hash_TmplLoaded[frameId] = true;
    window.setTimeout(TimeoutFunc, 500);
    return false;
  }

  if (fFrame.document.getElementById(frameId).contentWindow.document.getElementById("tmplEnd") == null) {
    window.setTimeout(TimeoutFunc, 500);
    return false;
  }

  return true;
}


var LOAD_TMPL_GAP = true;
/*
 * initial all odds display's js template
 * template is embed in main.html, fFrame.
 */
function loadAllTmpl() {
  var ARR_TMPL_DEF = new Array();
  ARR_TMPL_DEF["UnderOver_tmpl_1"] = "UnderOver_tmpl.aspx?form=1";
  ARR_TMPL_DEF["UnderOver_tmpl_3"] = "UnderOver_tmpl.aspx?form=3";
  ARR_TMPL_DEF["UnderOver_tmpl_1F"] = "UnderOver_tmpl.aspx?form=1F";
  ARR_TMPL_DEF["UnderOver_tmpl_1H"] = "UnderOver_tmpl.aspx?form=1H";

  ARR_TMPL_DEF["NBA_tmpl"] = "NBA_tmpl.aspx";
  ARR_TMPL_DEF["Baseball_tmpl"] = "Baseball_tmpl.aspx";
  ARR_TMPL_DEF["Tennis_tmpl"] = "Tennis_tmpl.aspx";
  ARR_TMPL_DEF["Cricket_tmpl"] = "Cricket_tmpl.aspx";

  ARR_TMPL_DEF["1X2_tmpl"] = "1X2_tmpl.aspx";
  ARR_TMPL_DEF["CorrectScore_tmpl"] = "CorrectScore_tmpl.aspx";
  ARR_TMPL_DEF["OeTg_tmpl"] = "OeTg_tmpl.aspx";
  ARR_TMPL_DEF["HTFT_tmpl"] = "HTFT_tmpl.aspx";
  ARR_TMPL_DEF["OeTg_tmpl"] = "OeTg_tmpl.aspx";
  ARR_TMPL_DEF["FGLG_tmpl"] = "FGLG_tmpl.aspx";

  ARR_TMPL_DEF["MixParlay_tmpl"] = "MixParlay_tmpl.aspx?sport=1";
  ARR_TMPL_DEF["MixParlay_tmpl_NBA"] = "MixParlay_tmpl.aspx?sport=2";
  ARR_TMPL_DEF["MixParlay_tmpl_Tennis"] = "MixParlay_tmpl.aspx?sport=5";
  ARR_TMPL_DEF["MixParlay_tmpl_Baseball"] = "MixParlay_tmpl.aspx?sport=8";
  ARR_TMPL_DEF["MixParlay_tmpl_Cricket"] = "MixParlay_tmpl.aspx?sport=27";

  ARR_TMPL_DEF["Horse_tmpl"] = "Horse_tmpl.aspx";
    ARR_TMPL_DEF["Horse_Fixed_tmpl"] = "Horse_Fixed_tmpl.aspx";
  ARR_TMPL_DEF["Finance_tmpl"] = "Finance_tmpl.aspx";
  ARR_TMPL_DEF["Outright_tmpl"] = "Outright_tmpl.aspx";
  ARR_TMPL_DEF["Bingo_tmpl"] = "Bingo_tmpl.aspx";
    ARR_TMPL_DEF["Greyhounds_tmpl"] = "Greyhounds_tmpl.aspx";

  ARR_TMPL_DEF["League_tmpl"] = "Match_tmpl.aspx?Scope=League";
  ARR_TMPL_DEF["Match_tmpl"] = "Match_tmpl.aspx?Scope=Match";

  if (LOAD_TMPL_GAP) {
    for (var sKey in ARR_TMPL_DEF) {
      if (fFrame.hash_TmplLoaded[sKey] == null) {
        var oFrame = fFrame.document.getElementById(sKey);
        if (oFrame != null) {
          fFrame.document.getElementById(sKey).contentWindow.location.href = ARR_TMPL_DEF[sKey];
          fFrame.hash_TmplLoaded[sKey] = true;
        }
      }
    }
    LOAD_TMPL_GAP = false;
  }
}

/*
 * for Earlay Market date selection bar
 * to control choice "data" color
 */
function selectDate(pSender, pDate) {
	var DataForm;
  if (document.DataForm != null)
  {
    if (!REFRESH_GAP) return;
    DataForm = document.DataForm;
  }
  else
  {
    if (!REFRESH_GAP_D) return;
    DataForm = document.DataForm_D;
  }
	if (DataForm.DT.value != pDate) {
    var aDiv = document.getElementById("divSelectDate");
    for (var i = 0; i < aDiv.childNodes.length; i++) {
      if (aDiv.childNodes[i].tagName != null)
      {
        if (aDiv.childNodes[i].tagName.toUpperCase() == "SPAN")
        {
          if (fFrame.IsCssControl == true)
            aDiv.childNodes[i].className = "";
          else
            aDiv.childNodes[i].style.color = fFrame.DateColor;
        }
      }
    }
    if (fFrame.SiteId =="4280" || fFrame.SiteId=="4200800" || fFrame.SiteId=="4200200" || fFrame.SiteId=="4201300"){
      pSender.style.color = "#0c5790";
    } else if(fFrame.IsCssControl == true) {
      pSender.className = "Current";
      pSender.style.color = "";
    } else {
      pSender.style.color = "#9F0915";
    }

		DataForm.DT.value = pDate;
		DataForm.RT.value = "W";
	}
    if (document.DataForm != null)
    {
    	refreshData();
	}
	else
	{
    	refreshData_D();
	}
}

function getShowMatchHtml(MatchId, Sporttype, Market) {
  return "<a href='javascript:showMatchOdds(\"" + MatchId + "\", \"" + Sporttype + "\", \"" + Market + "\");'><img border='0' src='" + fFrame.imgServerURL + "template/public/images/more_game.gif' /></a>";
}

function getStatsHtml(MatchId) {
  if (!fFrame.CanSeeStatsInfo)
  {
    return "";
  }

  if (fFrame.IsNewDropdownList)
  {
      if (fFrame.IsLogin) {
          return "<a href='javascript:openStatsInfo(\"" + MatchId + "\");'><img border='0' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/graph.gif' /></a>";
      }
//      else {
//          return "<img border='0' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/graph.gif' />";
//      }
  }
  else if (fFrame.SiteId=="4200300")
  {
    if(fFrame.IsLogin)
    {
      return "<a href='javascript:openStatsInfo(\"" + MatchId + "\");'><img border='0' src='" +fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/graph.gif' /></a>";
    }
    else
    {
      return "<img border='0' src='" +fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/graph.gif' />";
    }
  }
  else if (fFrame.SiteId=="4200800")
  {
    return "<img border='0' src='" +fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/graph.gif' />";
  }
  else
  {
    if(fFrame.IsLogin)
    {
      return "<a href='javascript:openStatsInfo(\"" + MatchId + "\");'><img border='0' src='" + fFrame.imgServerURL + "template/public/images/graph.gif' /></a>";
    }
    else
    {
      return "<img border='0' src='" + fFrame.imgServerURL + "template/public/images/graph.gif' />";
    }
  }
}

function getSportRadarHtml(MatchId, type) {
  if (!fFrame.CanSeeSportRadar) {
    return "";
  }

if (fFrame.IsNewDropdownList) {
    if (type == "correctscore") {
      return "<a href='javascript:openLiveInfo(\"" + MatchId + "\");'><img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/Whistle.gif' /></a>";
    }
    else {
      return "<div style='display: inline; float: right;padding-right: 2px;'><a href='javascript:openLiveInfo(\"" + MatchId + "\");'><img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/Whistle.gif' /></a></div>";
    }
  }
  else if (fFrame.SiteId == "4200300") {
    if (type == "correctscore") {
      return "<a href='javascript:openLiveInfo(\"" + MatchId + "\");'><img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/Whistle.gif' /></a>";
    }
    else {
      return "<div style='display: inline; float: right;padding-right: 2px;'><a href='javascript:openLiveInfo(\"" + MatchId + "\");'><img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/Whistle.gif' /></a></div>";
    }
  }
  else if (fFrame.SiteId == "4200800") {
    if (type=="correctscore") {
      return "<img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/Whistle.gif' />";
    }
    else {
      return "<div style='display: inline; float: right;padding-right: 2px;'><img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/Whistle.gif' /></div>";
    }
  }
  else {
    if (type == "correctscore") {
      return "<a href='javascript:openLiveInfo(\"" + MatchId + "\");'><img border='0' hspace='1' src='" + fFrame.imgServerURL + "template/public/images/Whistle2011.gif' /></a>";
    }
    else {
      return "<div style='display: inline; float: right;padding-right: 2px;'><a href='javascript:openLiveInfo(\"" + MatchId + "\");'><img border='0' hspace='1' src='" + fFrame.imgServerURL + "template/public/images/Whistle2011.gif' /></a></div>";
    }
  }
}

function openStatsInfo(MatchId) {
    window.open("StatsFrame.aspx?MatchId=" + MatchId);
}

function openLiveInfo(MatchId) {
    window.open("LiveInfo.aspx?MatchId=" + MatchId);
}

function getRedCardHtml(CardCount) {
  var s = "";
  for (var i = 0; i < CardCount; i++) {
    s += "<img class='code' border='0' src='" + fFrame.imgServerURL + "template/public/images/RedCard.gif' />";
  }
  return s;
}

function getFavoritesHtml(MUID, KeyValue, IsFavorites, IsLive) {
  var sGif = (IsFavorites) ? "check.gif" : "uncheck.gif";

  if (fFrame.IsNewDropdownList == true) {
    return "<div id='fav_" + MUID + "' style='display:inline;'><a href='javascript:addFavorites(\"" + MUID + "\",\"" + KeyValue + "\"," + IsFavorites+"," + IsLive +");'><img border='0' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/" + sGif + "' /></a></div>";
  } else if (fFrame.SiteId=="4200800") {
    return "<div id='fav_" + MUID + "' style='display:inline;'><a href='javascript:addFavorites(\"" + MUID + "\",\"" + KeyValue + "\"," + IsFavorites+"," + IsLive +");'><img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/" + sGif + "' /></a></div>";
  } else {
    return "<div id='fav_" + MUID + "' style='display:inline;'><a href='javascript:addFavorites(\"" + MUID + "\",\"" + KeyValue + "\"," + IsFavorites+"," + IsLive +");'><img border='0' src='" + fFrame.imgServerURL + "template/public/images/" + sGif + "' /></a></div>";
  }
}

function getScoreMapHtml(MatchID) {
  var SiteID=fFrame.SiteId;
  if (fFrame.SiteMode == 1) return "";

  if (fFrame.IsNewDropdownList) {
    return "<a onclick='popScoreMap(\""+MatchID+"\");' style='cursor:pointer'><img src='"+ fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/ScoreMap.gif' width='13' height='13' border='0' vspace='1' /></a>";
  }
  else if (fFrame.SiteId=="4200800") {
    return "<a onclick='popScoreMap(\""+MatchID+"\");' style='cursor:pointer'><img src='"+ fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/ScoreMap.gif' width='13' height='13' border='0' vspace='1' /></a>";
  } else {
    return "<a onclick='popScoreMap(\""+MatchID+"\");' style='cursor:pointer'><img src='"+ fFrame.imgServerURL +"template/public/images/ScoreMap.gif' width='13' height='13' border='0' vspace='1' /></a>";
  }
}

function getScoreHtml(MUID, KeyValue) {
  if (fFrame.SiteMode == 1) {
    return "";
  }
  return "<div id='sco_" + MUID + "' style='display:inline'><a href='javascript:showScores(\"" + MUID + "\",\"" + KeyValue + "\");'>Score</a></div>";
}

function bet(isParlay,MatchId,OddsId,Team,Odds) {
  if (!isParlay)
  {
    fFrame.leftFrame.DoBetProcess(OddsId , Team , Odds);
  }
  else
  {
    betParlay(MatchId, OddsId, Team, Odds);
  }
}

/*
 * session of select league popup dialog controling
 */
var PopLauncher; // Select League popup controller
var MoreLauncher; // Select League popup controller for bingo
function openLeague(Width, Title, Market, Sport, BetType, Mix, Page){
  document.getElementById("oPopContainer").innerHTML = "";
  var oFrame = document.getElementById("PopFrame");
  var GameMode=fFrame.LastSelectedMenu==0 ? "0,1,2" :fFrame.LastSelectedMenu ;

  if (MoreLauncher != null) {
    MoreLauncher.close();
    MoreLauncher = null;
  }

  if (oFrame) {
    oFrame.src = "League.aspx?Sport=" + Sport + "&Market=" + Market + "&Bettype=" + BetType + "&Mix=" + Mix + "&GameMode="+ GameMode + "&Page=" + Page +"_data.aspx";
  }

  var oDiv = document.getElementById("PopDiv");
  oDiv.style.height = 0;
  oDiv.style.width = Width+'px';

  var oTitle = document.getElementById("PopTitleText");
  //oTitle.style.width = Width+'px';
  oTitle.innerHTML = Title;

  if (PopLauncher == null) {
    var oDragger = document.getElementById("PopTitle");
    var oCloser = document.getElementById("PopCloser");
      PopLauncher = new DivLauncher(oDiv, oDragger, oCloser);
  }
  PopLauncher.open();
}

function checkLeague() {
  var elmChkAll = document.getElementById("chkLFAll");
  elmChkAll.checked = false;
}

function checkAll()
{
  var fields = document.LeagueForm.LF;
  var elmChkAll = document.getElementById("chkLFAll");

  for (i = 0; i < fields.length; i++){
    fields[i].checked = elmChkAll.checked;
  }
}

function go() {
  var elmChkAll = document.getElementById("chkLFAll");
  if (elmChkAll.checked) {
    var fields = document.getElementsByName('LF');
    for (i = 0; i < fields.length; i++) {
      fields[i].checked = false;
    }
    elmChkAll.checked = true;
  }

  btnstop();
  document.LeagueForm.Game.value = fFrame.LastSelectedMenu;

  try {
    document.DataForm_D.Market.value;

    if ((PAGE_MARKET == "t") && (fFrame.SiteMode != 1)) {
      document.LeagueForm.Market.value = document.DataForm_L.Market.value;
      document.LeagueForm.DT.value = document.DataForm_L.DT==null?"":document.DataForm_L.DT.value;
      document.LeagueForm.target = "DataFrame_L";
      stopButton("l");
      document.LeagueForm.submit();
    }

    document.LeagueForm.Market.value = document.DataForm_D.Market.value;
    document.LeagueForm.DT.value = document.DataForm_D.DT==null?"":document.DataForm_D.DT.value;
    document.LeagueForm.target = "DataFrame_D";
    stopButton("t");
    document.LeagueForm.submit();
    PopLauncher.close();
  }
  catch(e)
  {
    document.LeagueForm.Market.value = document.DataForm.Market.value;
    document.LeagueForm.DT.value = document.DataForm.DT==null?"":document.DataForm.DT.value;
    document.LeagueForm.target = "DataFrame";
    document.LeagueForm.submit();
    PopLauncher.close();
  }
}

//Get Odds GB color for different site
//SiteMode : 0:Member 1: Phone 2 : Deposit
function GetEventBGColor(Seq)
{
    var ReturnColor = '';

    if (fFrame.IsCssControl)
    {
        if(Seq == '0')
        {
            ReturnColor = 'bgcpe';
        }
        else
        {
            ReturnColor = 'bgcpelight';
        }
    }
    else
    {
        if(Seq == '0')
        {
            ReturnColor = fFrame.EventBGColor_Odd;
        }
        else
        {
            ReturnColor = fFrame.EventBGColor_Even;
        }
    }

    return ReturnColor;
}

function GetLiveBGColor(Seq)
{
    var ReturnColor = '';

    if (fFrame.IsCssControl)
    {
        if(Seq == '0')
        {
            ReturnColor = 'live';
        }
        else
        {
            ReturnColor = 'liveligh';
        }
    }
    else
    {
        if(Seq == '0')
        {
            ReturnColor = fFrame.LiveBGColor_Odd;
        }
        else
        {
            ReturnColor = fFrame.LiveBGColor_Even;
        }
    }

    return ReturnColor;
}

function changeOddsType(selValue, selText) {
    if (PopLauncher != null) {
        PopLauncher.close();
    }
    if (MoreLauncher != null) {
        MoreLauncher.close();
    }
    var oSel =document.getElementById("selOddsType");
    if (fFrame.IsNewDropdownList)
    {
        var span_oSel = oSel.getElementsByTagName("span");
        if (span_oSel[0].innerHTML != selText)
            span_oSel[0].innerHTML = selText;
        oSel.className = "dropDown disabled";
    }
    else
    {
        if (oSel.value != selValue)
            oSel.value = selValue;
    }

  try {
    document.DataForm_D.RT.value;

    document.DataForm_L.OddsType.value = selValue;
    document.DataForm_D.OddsType.value = selValue;
    document.DataForm_L.RT.value = "W";
    document.DataForm_D.RT.value = "W";
    refreshAll();
  }
  catch (e)
  {
    document.DataForm.OddsType.value = selValue;
    document.DataForm.RT.value = "W";
    refreshData();
  }
}

function showLeagueOdds(LeagueId, Sporttype, Market) {
  window.location.href = "Match.aspx?Scope=League&Id=" + LeagueId + "&Sport=" + Sporttype + "&Market="  + Market;
}

function showMatchOdds(MatchId, Sporttype, Market) {
  window.location.href = "Match.aspx?Scope=Match&Id=" + MatchId + "&Sport=" + Sporttype + "&Market=" + Market;
}

var btnStartHandle_L;
var btnStartHandle_D;
function afterRepaintTable(OddsTable) {
  var aOtherContainer;
  if (OddsTable.parentNode.id == "oTableContainer_L") {
    document.DataForm_L.RT.value = "U";
    aOtherContainer = document.getElementById("oTableContainer_D");
    window.clearTimeout(btnStartHandle_L);
    btnStartHandle_L = setTimeout("startButton('l');", 3000);
  } else {
    document.DataForm_D.RT.value = "U";
    aOtherContainer = document.getElementById("oTableContainer_L");
    window.clearTimeout(btnStartHandle_D);
    btnStartHandle_D = setTimeout("startButton('d');", 3000);
  }
  document.getElementById("BetList").style.display = "none";
  document.getElementById("OddsTr").style.display = "";
  var nRows=0;
  if (OddsTable.tBodies.length>0)
  {
    nRows=OddsTable.tBodies.length-1;
  }
  if (OddsTable.tBodies[nRows].rows.length <= 1) {
    OddsTable.parentNode.style.display = "none";
    if (aOtherContainer.style.display == "none") {

      document.getElementById("TrNoInfo").style.display = "block";
    } else {
      document.getElementById("TrNoInfo").style.display = "none";
    }

    if (OddsTable.parentNode.id == "oTableContainer_L") {
      document.getElementById("btnRefresh_L").style.display = "none";
      if (fFrame.SiteMode == 2)  // Use for control a88's underover subtitle
      {
        if (fFrame.Deposit_SiteMode == 2)
        {
          document.getElementById("RunningGames").style.display = "none";
        }
      }
    } else {
      document.getElementById("btnRefresh_D").style.display = "none";
      if (fFrame.SiteMode == 2) // Use for control a88's underover subtitle
      {
        if (fFrame.Deposit_SiteMode == 2)
        {
          document.getElementById("sub_title").style.display = "none";
        }
      }
    }
  } else {
    OddsTable.parentNode.style.display = "";
    document.getElementById("TrNoInfo").style.display = "none";

    if (OddsTable.parentNode.id == "oTableContainer_L") {
      document.getElementById("btnRefresh_L").style.display = "";
      if (fFrame.SiteMode == 2)  // Use for control a88's underover subtitle
      {
        if (fFrame.Deposit_SiteMode == 2)
        {
          document.getElementById("RunningGames").style.display = "";
        }
      }
    } else {
      if (fFrame.SiteMode == 2) // Use for control a88's underover subtitle
      {
        if (fFrame.Deposit_SiteMode == 2)
        {
          document.getElementById("sub_title").style.display = "";
        }
      }
      document.getElementById("btnRefresh_D").style.display = "";
    }
  }
}

function refreshAll() {
  if ((PAGE_MARKET == "t") && (fFrame.SiteMode != 1)) {
    refreshData_L();
    //document.getElementById("btnRefresh_L").style.display = "";
  } else {
    document.getElementById("oTableContainer_L").style.display = "none";
    if (fFrame.SiteMode == 2 ) // Combine A88 under over sub title
    {
        if (fFrame.Deposit_SiteMode == 2)
        {
          document.getElementById("RunningGames").style.display = "none";
      }
    }
  }
  refreshData_D();
}


var REFRESH_GAP_L = true; // a flag to noted is odds display refreshing
var bShowLoading_L = true;
var iRefreshCount_L = REFRESH_COUNTDOWN;
var RefresHandle_L;
function refreshData_L() {
  if (fFrame.IsLogin)
  {
	  if (fFrame.leftFrame==null || fFrame.leftFrame.eObj==null)
	  {
			  window.setTimeout("refreshData_L()", 500);
			  return;
	  }
	}
  if (!REFRESH_GAP_L) return;

  window.clearTimeout(CounterHandle_L);
  window.clearTimeout(RefresHandle_L);
  stopButton("l");

  //RefresHandle_L = window.setTimeout(refreshData_L, REFRESH_INTERVAL_L);

  if ( (g_OddsKeeper_L == null) || (iRefreshCount_L <= 0) ) {
    document.DataForm_L.RT.value = "W";
    iRefreshCount_L = REFRESH_COUNTDOWN;
  } else {
    iRefreshCount_L--;
  }

  if (bShowLoading_L){
    document.getElementById("BetList").style.display = "block";
    bShowLoading_L = false;
  }

  document.DataForm_L.submit();

  if (PopLauncher!=null)
  {
    if (sKeeper!=null && PopLauncher.isOpened)
    {
        if (sKeeper.Market=="L")
        {
            if (ThreadId!=null && ThreadId!="")
            {
                recallAjax(ThreadId)
            }
        }
    }
    else
    {
        ThreadId=null;
    }
  }
  else
  {
    ThreadId=null;
  }
}

var REFRESH_GAP_D = true; // a flag to noted is odds display refreshing
var bShowLoading_D = true;
var iRefreshCount_D = REFRESH_COUNTDOWN;
var RefresHandle_D;
function refreshData_D() {
  if (fFrame.IsLogin)
  {
	  if (fFrame.leftFrame==null || fFrame.leftFrame.eObj==null)
	  {
			  window.setTimeout("refreshData_D()", 500);
			  return;
	  }
	}

  if ((PAGE_MARKET == "l") && (fFrame.SiteMode ==  1))
  {
     refreshData();
     return;
  }

  if (!REFRESH_GAP_D) return;

  window.clearTimeout(CounterHandle_D);
  window.clearTimeout(RefresHandle_D);
  stopButton("d");

  //RefresHandle_D = window.setTimeout(refreshData_D, REFRESH_INTERVAL_D);

  if ( (g_OddsKeeper_D == null) || (iRefreshCount_D <= 0) ) {
    document.DataForm_D.RT.value = "W";
    iRefreshCount_D = REFRESH_COUNTDOWN;
  } else {
    iRefreshCount_D--;
  }

  if (bShowLoading_D){
    document.getElementById("BetList").style.display = "block";
    bShowLoading_D = false;
  }
  document.DataForm_D.submit();

  if (PopLauncher!=null)
  {
    if (sKeeper!=null && PopLauncher.isOpened)
    {
        if (sKeeper.Market!="L")
        {
            if (ThreadId!=null && ThreadId!="")
            {
                recallAjax(ThreadId)
            }
        }
    }
    else
    {
        ThreadId=null;
    }
  }
  else
  {
    ThreadId=null;
  }
}

function stopButton(Market) {
    var aSorter = document.getElementById("aSorter");
    if (aSorter != null)
    {
        if (fFrame.IsNewDropdownList)
            aSorter.className = "buttons disabled";
        aSorter.disabled = true;
    }

  var aDiv = document.getElementById("divSelectDate");
  if ((aDiv != null) && (aDiv.style.display != "none")) {
    for (var i = 0; i < aDiv.childNodes.length; i++) {
      var oBtn = aDiv.childNodes[i];
      if ((oBtn.tagName != null) && (oBtn.tagName.toUpperCase() == "SPAN")) {
        oBtn.disabled = true;
      }
    }
  }
  var arrBottons;
  var aBtn;

  if (Market == "l") {
    REFRESH_GAP_L = false;
    arrBottons = document.getElementsByName("btnRefresh_L");
    aBtn = document.getElementById("btnRefresh_L");
  } else {
    var bDiv = document.getElementById("HourContainer");
    if ((bDiv  != null) && (bDiv .style.display != "none")) {
      for (var i = 0; i < bDiv .childNodes.length; i++) {
        var oBtn = bDiv .childNodes[i];
        if ((oBtn.tagName != null) && (oBtn.tagName.toUpperCase() == "SPAN")) {
          oBtn.disabled = true;
        }
      }
    }

    REFRESH_GAP_D = false;
    arrBottons = document.getElementsByName("btnRefresh_D");
    aBtn = document.getElementById("btnRefresh_D");
  }

  if (aBtn != null)
  {
      aBtn.disabled = true;
      aBtn.innerHTML = "";
      aBtn.innerHTML = siteObj._SpanTagS + "<span>" + RES_PLEASE_WAIT + "</span>" + siteObj._SpanTagE;
      aBtn.style.font.color = "gray";
      if (fFrame.IsNewDropdownList)
          aBtn.className = "buttons disabled";
  }
  for (var i = 0; i < arrBottons.length; i++) {
    arrBottons[i].disabled = true;
    arrBottons[i].innerHTML = "";
	arrBottons[i].innerHTML = siteObj._SpanTagS + "<span>" + RES_PLEASE_WAIT + "</span>" + siteObj._SpanTagE;
	arrBottons[i].style.font.color = "gray";
	if (fFrame.IsNewDropdownList)
	    arrBottons[i].className = "button-ref disabled";
  }

  var aSel = document.getElementById("selOddsType");
  if (aSel !== null && !aSel.disabled) {
    aSel.disabled = true;
  }

  //Force button to be enable after 15 sec even the data still not received
  var timer = setTimeout("startButton('" + Market + "')",15000);
}

function startButton(Market)
{
    if ((Market == "l") && (REFRESH_GAP_L))
        return;
    else if ((Market == "d") && (REFRESH_GAP_D))
        return;

    var aDiv = document.getElementById("divSelectDate");
    if ((aDiv != null) && (aDiv.style.display != "none"))
    {
        for (var i = 0; i < aDiv.childNodes.length; i++)
        {
            var oBtn = aDiv.childNodes[i];
            if ((oBtn.tagName != null) && (oBtn.tagName.toUpperCase() == "SPAN"))
            {
                oBtn.disabled = false;
            }
        }
    }
    var bDiv = document.getElementById("HourContainer");
    if ((bDiv != null) && (bDiv.style.display != "none"))
    {
        for (var i = 0; i < bDiv.childNodes.length; i++)
        {
            var oBtn = bDiv.childNodes[i];
            if ((oBtn.tagName != null) && (oBtn.tagName.toUpperCase() == "SPAN"))
            {
                oBtn.disabled = false;
            }
        }
    }

    var arrBottons;
    var iCount;
    var sBtnLable;
    var oBtn;
    if (Market == "l")
    {
        REFRESH_GAP_L = true;
        oBtn = document.getElementById("btnRefresh_L");
        arrBottons = document.getElementsByName("btnRefresh_L");
        iCount = REFRESH_INTERVAL_L / 1000 - 1;
        sBtnLable = RES_LIVE;
        CounterHandle_L = setTimeout("countdown('l'," + iCount + ")", 1000);
    } else
    {
        REFRESH_GAP_D = true;
        oBtn = document.getElementById("btnRefresh_D");
        arrBottons = document.getElementsByName("btnRefresh_D");
        var iCount = REFRESH_INTERVAL_D / 1000 - 1;
        sBtnLable = RES_REFRESH;
        CounterHandle_D = setTimeout("countdown('d'," + iCount + ")", 1000);
    }

    for (var i = 0; i < arrBottons.length; i++)
    {
        arrBottons[i].innerHTML = "";
        arrBottons[i].innerHTML = siteObj._SpanTagS + "<span>" + sBtnLable + "</span>" + siteObj._SpanTagE;
        arrBottons[i].disabled = false;
        arrBottons[i].style.font.color = "black";
        if (fFrame.IsNewDropdownList)
            arrBottons[i].className = "button-ref";
    }
    if (oBtn != null)
    {
        oBtn.innerHTML = "";
        oBtn.innerHTML = siteObj._SpanTagS + "<span>" + sBtnLable + iCount + "</span>" + siteObj._SpanTagE;
        oBtn.disabled = false;
        oBtn.style.font.color = "black";
        if (fFrame.IsNewDropdownList)
            oBtn.className = "buttons";
    }

    //early haven't btnRefresh_L
    if ((Market == "d" || !document.getElementById("btnRefresh_L").disabled) && !document.getElementById("btnRefresh_D").disabled)
    {
        var aSel = document.getElementById("selOddsType");
        if (aSel !== null && aSel.disabled)
        {
            aSel.disabled = false;
        }
    }
    var aSorter = document.getElementById("aSorter");
    if (fFrame.IsNewDropdownList)
    {
        if (aSorter != null
            && (document.getElementById("btnRefresh_L") == null || (document.getElementById("btnRefresh_L") != null && document.getElementById("btnRefresh_L").className == "buttons"))
            && (document.getElementById("btnRefresh_D") == null || (document.getElementById("btnRefresh_D") != null && document.getElementById("btnRefresh_D").className == "buttons")))
        {
            aSorter.className = "buttons";
            aSorter.disabled = false;
        }

        var oDisstyle = document.getElementById("disstyle");
        if (oDisstyle != null)
            oDisstyle.className = "dropDown";

        var oSel = document.getElementById("selOddsType");
        if (oSel != null)
            oSel.className = "dropDown";
    }
    else
    {
        if (aSorter != null)
            aSorter.disabled = false;
    }
}

function countdown(sMarket, Count) {
  var oBtn;
  var sBtnLable;
  if (sMarket == "l") {
    if (!REFRESH_GAP_L) return;
    if (Count <= 0)
    {
        refreshData_L();
        return;
    }
	    document.getElementById("btnRefresh_L").innerHTML = siteObj._SpanTagS + "<span>" + RES_LIVE + Count + "</span>" + siteObj._SpanTagE;
    CounterHandle_L = setTimeout("countdown('" + sMarket +"'," + (Count - 1) + ")", 1000);
  } else {
    if (!REFRESH_GAP_D) return;
    if (Count <= 0) {
      refreshData_D();
      return;
    }
	    document.getElementById("btnRefresh_D").innerHTML = siteObj._SpanTagS + "<span>" + RES_REFRESH + Count + "</span>" +siteObj._SpanTagE;
    CounterHandle_D = setTimeout("countdown('" + sMarket +"'," + (Count - 1) + ")", 1000);
  }
}

function checkHasParlay(sMarket,sSport)
{
   try
   {
       var count=0;

       if(sMarket.toUpperCase() =="L")
       {
         count = fFrame.leftFrame.IsHaveLiveParlay() ? 1:0;
       }
       else
       {
         count=fFrame.leftFrame.GetParlayCount(sMarket,sSport);
       }

     var obj = document.getElementById("b_SwitchToParlay");
     if(obj!=null)
     {
       if(count>0)
       {
         obj.style.display = "block";
       }
       else
       {
         obj.style.display = "none";
       }
       if (fFrame.IsCssControl)
         document.getElementById("a_SwitchToParlay").innerHTML = ParlayIconText;

       setTimeout("checkHasParlay('" + sMarket +"','" + sSport + "')", 2000);
     }
   }
   catch(e)
   {
       setTimeout("checkHasParlay('" + sMarket +"','" + sSport + "')", 1000);
   }
}

function SwitchToParlay(sSport)
{
  try
   {

       // sSport = 0 is live
       if(sSport=="0")       {
           //sMarket="LP";
           fFrame.leftFrame.SwitchSport('LP',sSport);
       }else{
           fFrame.leftFrame.ShowOdds('P',sSport);
       }

        fFrame.leftFrame.ReloadWaitingBetList('yes','no','1');

   }
   catch(e)
   {

   }
}

//1: ByDate  0:ByCode
function setRefreshSort(){
	if (document.getElementById("aSorter")!=null)
	{
	    if (document.getElementById("aSorter").disabled) return;
	    document.getElementById("aSorter").disabled=true;
	}
	if (document.DataForm_L != null)
    {
	    var OrderBy = document.DataForm_L.OrderBy.value;
	    var sLang = (fFrame.UserLang =="it" || fFrame.UserLang =="jp")  ? "en" : fFrame.UserLang ;
	    if(OrderBy == '1') {
            document.getElementById('t_Order').className = sLang + '_sorting' + siteObj._t_Order_Css;
		    document.DataForm_L.OrderBy.value = "0";
		    document.DataForm_D.OrderBy.value = "0";
		    if (g_OddsKeeper_L != null) {
			    g_OddsKeeper_L.SortType = 0;
		    }
		    g_OddsKeeper_D.SortType = 0;
	    } else {
	        document.getElementById('t_Order').className = sLang + '_normal' + siteObj._t_Order_Css;
		    document.DataForm_L.OrderBy.value = "1";
		    document.DataForm_D.OrderBy.value = "1";
		    if (g_OddsKeeper_L != null) {
			    g_OddsKeeper_L.SortType = 1;
		    }
		    g_OddsKeeper_D.SortType = 1;
	    }

	    if ((PAGE_MARKET == "t") && (fFrame.SiteMode != 1)) {
		    document.DataForm_L.RT.value = "W";
		    //document.getElementById("btnRefresh_L").style.display = "";
		    refreshData_L();
	    }
	    document.DataForm_D.RT.value = "W";
	    refreshData_D();
	}
    if (document.DataForm != null)
	{
	    var OrderBy = document.DataForm.OrderBy.value;
	    var sLang = (fFrame.UserLang =="it" || fFrame.UserLang =="jp")  ? "en" : fFrame.UserLang ;
	    if(OrderBy == '1') {
            document.getElementById('t_Order').className = sLang + '_sorting' + siteObj._t_Order_Css;
		    document.DataForm.OrderBy.value = "0";
    	    g_OddsKeeper.SortType = 0;
	    } else {
	        document.getElementById('t_Order').className = sLang + '_normal' + siteObj._t_Order_Css;
		    document.DataForm.OrderBy.value = "1";
		    g_OddsKeeper.SortType = 1;
	    }
	    document.DataForm.RT.value = "W";
	    refreshData();
	}
}

function getSportRadarHtml(MatchId) {
  if (!fFrame.CanSeeSportRadar) return "";

  if (fFrame.IsNewDropdownList)
    return "<a href='javascript:openLiveInfo(\"" + MatchId + "\");'><img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/Whistle.gif' /></a>";
  else if (fFrame.SiteId=="4200300")
    return "<a href='javascript:openLiveInfo(\"" + MatchId + "\");'><img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/Whistle.gif' /></a>";
  else if (fFrame.SiteId=="4200800")
    return "<img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/Whistle.gif' />";
  else
    return "<a href='javascript:openLiveInfo(\"" + MatchId + "\");'><img border='0' hspace='1' src='" + fFrame.imgServerURL + "template/public/images/Whistle.gif' /></a>";
}

var CountDownList = new Array();
function GameCountDown()
{
    for(key in CountDownList)
    {
        var obj=document.getElementById(key);
        if (obj != null)
        {
            CountDownList[key] = parseInt(CountDownList[key],10)-1;
            if (CountDownList[key] <= 0)
            {
                CountDownList[key] = 0;
                obj.innerHTML = RES_NOMOREBET;

                if($(obj).parent().prevAll("span:first")[0] != null)
                {
                    $(obj).parent().prevAll("span:first")[0].style.display = "none";    
                }
            }
            else
            {
                obj.innerHTML = CountDownList[key];

                if($(obj).parent().prevAll("span:first")[0] != null)
                {
                    $(obj).parent().prevAll("span:first")[0].style.display = "";
                }
            }
        }
    }
}

function BingoMouseMove(Sender)
{
    //market_hdp_group
    var group = Sender.id.split("_");
    var group2 = parseInt(group[2],10);
    var matchid="";
    if (group.length==4)
    {
        matchid="_"+group[3];
    }
    switch (group[1])
    {
        case "1":
                for (var i=5*group2-4;i<=5*group2;i++)
                {
        	        if (document.getElementById(group[0]+"Ball"+i+matchid).className.indexOf("trbgov")==-1)
        	            document.getElementById(group[0]+"Ball"+i+matchid).className = document.getElementById(group[0]+"Ball"+i+matchid).className + " trbgov";
                }
            break;
        case "2":
                for (var i=15*group2-14;i<=15*group2;i++)
                {
        	        if (document.getElementById(group[0]+"Ball"+i+matchid).className.indexOf("trbgov")==-1)
            	        document.getElementById(group[0]+"Ball"+i+matchid).className = document.getElementById(group[0]+"Ball"+i+matchid).className + " trbgov";
                }
            break;
        case "3":
                for (var i=25*group2-24;i<=25*group2;i++)
                {
        	        if (document.getElementById(group[0]+"Ball"+i+matchid).className.indexOf("trbgov")==-1)
            	        document.getElementById(group[0]+"Ball"+i+matchid).className = document.getElementById(group[0]+"Ball"+i+matchid).className + " trbgov";
                }
            break;
        case "4":
                for (var i=0;i<=14;i++)
                {
        	        var j=i*5+group2;
        	        if (document.getElementById(group[0]+"Ball"+j+matchid).className.indexOf("trbgov")==-1)
            	        document.getElementById(group[0]+"Ball"+j+matchid).className = document.getElementById(group[0]+"Ball"+j+matchid).className + " trbgov";
                }
            break;

    }
    if (Sender.className.indexOf("trbgov")==-1)
            Sender.className = Sender.className + " trbgov";
}

function BingoMouseOut(Sender)
{
    //market_hdp_group
    var group = Sender.id.split("_");
    var group2 = parseInt(group[2],10);
    var matchid="";
    if (group.length==4)
    {
        matchid="_"+group[3];
    }
    switch (group[1])
    {
        case "1":
                for (var i=5*group2-4;i<=5*group2;i++)
                {
        	        document.getElementById(group[0]+"Ball"+i+matchid).className = document.getElementById(group[0]+"Ball"+i+matchid).className.replace("trbgov","").replace(/(^\s*)|(\s*$)/g, "");
                }
            break;
        case "2":
                for (var i=15*group2-14;i<=15*group2;i++)
                {
        	        document.getElementById(group[0]+"Ball"+i+matchid).className = document.getElementById(group[0]+"Ball"+i+matchid).className.replace("trbgov","").replace(/(^\s*)|(\s*$)/g, "");
                }
            break;
        case "3":
                for (var i=25*group2-24;i<=25*group2;i++)
                {
        	        document.getElementById(group[0]+"Ball"+i+matchid).className = document.getElementById(group[0]+"Ball"+i+matchid).className.replace("trbgov","").replace(/(^\s*)|(\s*$)/g, "");
                }
            break;
        case "4":
                for (var i=0;i<=14;i++)
                {
        	        var j=i*5+group2;
        	        document.getElementById(group[0]+"Ball"+j+matchid).className = document.getElementById(group[0]+"Ball"+j+matchid).className.replace("trbgov","").replace(/(^\s*)|(\s*$)/g, "");
                }
            break;

    }
    Sender.className = Sender.className.replace("trbgov","").replace(/(^\s*)|(\s*$)/g, "");
}

var sKeeper = null;
function DivPopMore(Width, MatchId, LeagueName, HomeName, AwayName, isParlay,isLive,MUID,tag) {
  if (PopLauncher != null) {
    PopLauncher.close();
    PopLauncher = null;
  }
  if (MoreLauncher != null) {
    MoreLauncher.close();
    MoreLauncher = null;
  }
  if (!initialTmpl("MorePop_tmpl", "MorePop_tmpl.aspx", "DivPopMore('" + Width + "','" + MatchId + "','" + LeagueName + "','" + HomeName+ "','" + AwayName+ "','" + isParlay+ "','" + isLive + "','" + MUID + "','" + tag+ "');")) {
    return;
  }
  var market="D";
  if (isLive=="true")
    market="L";
	document.getElementById("oPopContainer").innerHTML = fFrame.document.getElementById("MorePop_tmpl").contentWindow.document.getElementById(tag+market).innerHTML;

	sKeeper = new SimpleOddsKeeper();
	sKeeper.MUID = MUID;
	sKeeper.MatchId = MatchId;
  sKeeper.TableContainer = document.getElementById("oPopContainer");
  sKeeper.DivTmpl=fFrame.document.getElementById("MorePop_tmpl").contentWindow.document.getElementById(tag+market).innerHTML;
  sKeeper.isParlay=isParlay;
  sKeeper.Market=market;
	var oDiv = document.getElementById("PopDiv");
	oDiv.style.height = 0;
	oDiv.style.width = 0;

	var oTitle = document.getElementById("PopTitleText");
	oTitle.style.width = Width+'px';

	if (PopLauncher == null) {
		var oDragger = document.getElementById("PopTitle");
		var oCloser = document.getElementById("PopCloser");
		PopLauncher = new DivLauncher(oDiv, oDragger, oCloser);
	}
    var param = new Object();
  param["matchid"]=MatchId;
  param["Market"]=market;
  param["tag"]=tag;
  param["isparlay"]=isParlay;
  ThreadId=tag;
  switch (tag)
  {
    case "UnderOver_MoreDiv":
    	oTitle.innerHTML = HomeName + " -vs- " + AwayName;
      ExecAjax("MorePop_data.aspx",param,"GET",tag,"OpenUnderOverPopDiv");
      break;
    case "Bingo_MoreDiv":
    default:
    	oTitle.innerHTML = RES_B90 + " - " + RES_Game_No +  HomeName;
      ExecAjax("MorePop_data.aspx",param,"GET",tag,"OpenBingoPopDiv");
      break;
  }
}

function OpenBingoPopDiv(Response)
{
	eval(Response);
	/*if (ajaxData.length==0)
	{
        ThreadId=null;
        sKeeper=null;
        PopLauncher.close();
        return;
	}*/
	sKeeper.setDatas(ajaxData, MultiSportODDS_DEF[90]);
    for (var i = 1;i<=15;i++)
    {
        sKeeper.newHash["Odds_90_1_"+i+"_Cls"] = getOddsClass(sKeeper.oHash["Odds_90_1_"+i]);
    }
    for (var i = 1;i<=5;i++)
    {
        sKeeper.newHash["Odds_90_2_"+i+"_Cls"] = getOddsClass(sKeeper.oHash["Odds_90_2_"+i]);
        sKeeper.newHash["Odds_90_4_"+i+"_Cls"] = getOddsClass(sKeeper.oHash["Odds_90_4_"+i]);
    }
    for (var i = 1;i<=3;i++)
    {
        sKeeper.newHash["Odds_90_3_"+i+"_Cls"] = getOddsClass(sKeeper.oHash["Odds_90_3_"+i]);
    }

	sKeeper.oHash["MatchId"]=sKeeper.MatchId;
	sKeeper.newHash["isParlay"]=sKeeper.isParlay;
	sKeeper.paintOddsTable();

	if (ThreadId!=null && ThreadId!="")
	{
	    PopLauncher.open(100, 120);
	}
}

function Rechkskeeper_5_15()
{
    if (sKeeper!=null)
    {
        if (fFrame.DisplayMode == 3)
        {
	        sKeeper.newHash["SHOW5_15"]=CLS_LS_OFF;
	    }
	    else
        {
            if (sKeeper.oHash["OddsId_5"] != null || sKeeper.oHash["OddsId_15"] != null)
            {
	            sKeeper.newHash["SHOW5_15"]=CLS_LS_ON;
	        }
	        else
	        {
    	        sKeeper.newHash["SHOW5_15"]=CLS_LS_OFF;
	        }
	    }
	    sKeeper.paintOddsTable();
	}
}
function OpenUnderOverPopDiv(Response)
{
	eval(Response);
	if (ajaxData.length==0)
	{
        ThreadId=null;
        sKeeper=null;
        PopLauncher.close();
        return;
	}
	var oldHash = new Object();
    for (var o in sKeeper.oHash) oldHash[o] = sKeeper.oHash[o];
	var betType = new Array("5","15","24","25","26","27","13","28","121","122","123","2","6","14","16","4","30");
	for (var i=0;i<betType.length;i++)
	{
	    if (ajaxData[betType[i]] != null)
	    {
	        sKeeper.setDatas(ajaxData[betType[i]], MultiSportODDS_DEF[parseInt(betType[i],10)]);

	        var oddsName;
	        for (var j=1;j<MultiSportODDS_DEF[parseInt(betType[i],10)].length;j++)
	        {
	            oddsName = MultiSportODDS_DEF[parseInt(betType[i],10)][j];
	            if (oddsName.substr(0,5)=="Odds_")
	            {
	                sKeeper.newHash[oddsName+"_Cls"]=getOddsClass(sKeeper.oHash[oddsName]);
	            }
            }
	    }

	}
	if (oldHash["MatchId"] != null)
	{
	    sKeeper.oHash = sKeeper.updateOdds(oldHash, sKeeper.oHash, betType);
	}
	if (fFrame.DisplayMode == 3 || sKeeper.isParlay == 1)
    {
	    sKeeper.newHash["SHOW5_15"]=CLS_LS_OFF;
	}
	else
    {
        if (ajaxData["5"] != null || ajaxData["15"] != null)
        {
	        sKeeper.newHash["SHOW5_15"]=CLS_LS_ON;
	    }
	    else
	    {
    	    sKeeper.newHash["SHOW5_15"]=CLS_LS_OFF;
	    }
	}

    if (ajaxData["121"] != null || ajaxData["122"] != null)
    {
        sKeeper.newHash["SHOW121_122"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW121_122"]=CLS_LS_OFF;
    }
    if (ajaxData["123"] != null || ajaxData["25"] != null)
    {
        sKeeper.newHash["SHOW123_25"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW123_25"]=CLS_LS_OFF;
    }

    if (ajaxData["24"] != null)
    {
        sKeeper.newHash["SHOW24"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW24"]=CLS_LS_OFF;
    }
    if (ajaxData["26"] != null || ajaxData["27"] != null)
    {
        sKeeper.newHash["SHOW26_27"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW26_27"]=CLS_LS_OFF;
    }
    if (ajaxData["13"] != null)
    {
        sKeeper.newHash["SHOW13"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW13"]=CLS_LS_OFF;
    }
    if (ajaxData["28"] != null)
    {
        sKeeper.newHash["SHOW28"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW28"]=CLS_LS_OFF;
    }
    if (ajaxData["6"] != null || ajaxData["2"] != null)
    {
        sKeeper.newHash["SHOW6_2"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW6_2"]=CLS_LS_OFF;
    }
    if (ajaxData["14"] != null)
    {
        sKeeper.newHash["SHOW14"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW14"]=CLS_LS_OFF;
    }
    if (ajaxData["16"] != null)
    {
        sKeeper.newHash["SHOW16"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW16"]=CLS_LS_OFF;
    }
    if (ajaxData["4"] != null)
    {
        sKeeper.newHash["SHOW4"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW4"]=CLS_LS_OFF;
    }
    if (ajaxData["30"] != null)
    {
        sKeeper.newHash["SHOW30"]=CLS_LS_ON;
    }
    else
    {
	    sKeeper.newHash["SHOW30"]=CLS_LS_OFF;
    }
	sKeeper.oHash["MatchId"]=sKeeper.MatchId;
	sKeeper.newHash["isParlay"]=sKeeper.isParlay;
	sKeeper.paintOddsTable();
	if (ThreadId!=null && ThreadId!="")
	{
	    PopLauncher.open(100, 120);
	}
}

function SwpA(ArrSrc, IndexA, IndexB) {
    var tmp = ArrSrc[IndexA];
    ArrSrc[IndexA] = ArrSrc[IndexB];
    ArrSrc[IndexB] = tmp;
}


var ARR_FIELDS_ORG = null;
var ARR_FIELDS_ORG1 = null;

var SwpDEF_FLAG = false;
function SwpD(arrIndex) {
    if (SwpDEF_FLAG) return;
    SwpDEF_FLAG = true;
    /*for(var key in ARR_FIELDS_DEF) {
    SwpA(ARR_FIELDS_DEF[key], IndexA, IndexB);
    }
    for(var key in ARR_FIELDS_DEF1) {
    SwpA(ARR_FIELDS_DEF1[key], IndexA, IndexB);
    }*/
    if (ARR_FIELDS_ORG == null) {
        ARR_FIELDS_ORG = ARR_FIELDS_DEF["1"].slice(0, ARR_FIELDS_DEF["1"].length - 1);
    }
    if (ARR_FIELDS_ORG1 == null) {
        ARR_FIELDS_ORG1 = ARR_FIELDS_DEF1["1"].slice(0, ARR_FIELDS_DEF1["1"].length - 1);
    }
    for (var i = 1; i < arrIndex.length; i++) {
        SwpA(ARR_FIELDS_DEF["1"], arrIndex[i - 1], arrIndex[i]);
        SwpA(ARR_FIELDS_DEF1["1"], arrIndex[i - 1], arrIndex[i]);
    }
}

var InsDEF_FLAG = false;
function InsD(arrIndex) {
    if (InsDEF_FLAG) return;
    InsDEF_FLAG = true;
    /*for(var key in ARR_FIELDS_DEF) {
    if (typeof(ARR_FIELDS_DEF[key]) != "function") {
    ARR_FIELDS_DEF[key] = arrayInsert(ARR_FIELDS_DEF[key], Index, ['XIBCX']);
    }
    }
    for(var key in ARR_FIELDS_DEF1) {
    if (typeof(ARR_FIELDS_DEF1[key]) != "function") {
    ARR_FIELDS_DEF1[key] = arrayInsert(ARR_FIELDS_DEF1[key], Index, ['XIBCX']);
    }
    }*/
    if (ARR_FIELDS_ORG == null) {
        ARR_FIELDS_ORG = ARR_FIELDS_DEF["1"].slice(0, ARR_FIELDS_DEF["1"].length - 1);
    }
    if (ARR_FIELDS_ORG1 == null) {
        ARR_FIELDS_ORG1 = ARR_FIELDS_DEF1["1"].slice(0, ARR_FIELDS_DEF1["1"].length - 1);
    }
    for (var i = 0; i < arrIndex.length; i++) {
        ARR_FIELDS_DEF["1"] = arrayInsert(ARR_FIELDS_DEF["1"], arrIndex[i], ['XIBCX']);
        ARR_FIELDS_DEF1["1"] = arrayInsert(ARR_FIELDS_DEF1["1"], arrIndex[i], ['XIBCX']);
    }
}

function RstrD() {
    SwpDEF_FLAG = false;
    InsDEF_FLAG = false;
    if (ARR_FIELDS_ORG != null) {
        ARR_FIELDS_DEF["1"] = ARR_FIELDS_ORG;
        ARR_FIELDS_ORG = null;
    }
    if (ARR_FIELDS_ORG1 != null) {
        ARR_FIELDS_DEF1["1"] = ARR_FIELDS_ORG1;
        ARR_FIELDS_ORG1 = null;
    }
}
