var fFrame= getParent(window);
var IsIbcbet = false;
var IsPhonebet = false;
switch (fFrame.SiteMode)
{
case 0 :
  IsIbcbet = true;
    break;
case 1 :
  IsPhonebet = true;
    break;
}
var CLS_HDP_F = "FavTeamClass";
var CLS_HDP_N = "UdrDogTeamClass";
var TR_0 = "bgcpe";
var TR_1 = "bgcpelight";

var SEPERATE_TIME = "1059";
var g_OddsKeeper_L = null;
var g_OddsKeeper_D = null;
var arrTicks;
var TrFlag = false; // for detecating afterNewEvent_1F & afterNewEvent_1H TR Row class

var CounterHandle_L; // handle of countdown
var CounterHandle_D;
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

//set default display mode
if (fFrame.DisplayMode == "1H") {
  fFrame.DisplayMode = "1F";
}

function ShowBetList(Mode, RequestTime, Market, Del, Srt, Ins, uL, uM, uO, uA)
{
    //arrTicks = new Array();
    //arrTicks.push( new Date().getTime());

    var aForm;
    var aFrame;
    var aKeeper;
    if (Market == "l")
    {
        aForm = document.DataForm_L;
        aFrame = DataFrame_L;
        aKeeper = g_OddsKeeper_L;
    } else
    {
        aForm = document.DataForm_D;
        aFrame = DataFrame_D;
        aKeeper = g_OddsKeeper_D;
    }

    aForm.CT.value = RequestTime;

    if (Mode == "U")
    {
        if (aKeeper == null)
        {
            if (Market == "l")
            {
                refreshData_L();
            } else
            {
                refreshData_D();
            }
            return;
        }

        aKeeper.refreshOddsTable(Del, Srt, Ins, uL, uM, uO, uA);

        if (sKeeper != null)
        {
            var bool1 = false;
            var bool2 = false;
            for (var i = 0; i < Del.length; i++)
            {
                if (sKeeper.MUID == Del[i])
                {
                    PopLauncher.close();
                    bool1 = true;
                }
            }
            for (var i = 0; i < Ins.length; i++)
            {
                if (sKeeper.MUID == Ins[i][0])
                {
                    PopLauncher.open(100, 120);
                    bool2 = true;
                }
            }
            if (bool1 && !bool2)
            {
                ThreadId = null;
            }
        }

    } else
    {
        var sTail;
        if (Market == "l")
        {
            sTail = "L";
            g_OddsKeeper_L = new OddsKeeper();
            aKeeper = g_OddsKeeper_L;
            aKeeper.tag = "L";
            aKeeper.TableContainer = document.getElementById("oTableContainer_L");
        } else
        {
            sTail = "D";
            g_OddsKeeper_D = new OddsKeeper();
            aKeeper = g_OddsKeeper_D;
            aKeeper.tag = "D";
            aKeeper.TableContainer = document.getElementById("oTableContainer_D");
        }

        switch (fFrame.DisplayMode)
        {
            case "1":
                if (!initialTmpl("UnderOver_tmpl_1", "UnderOver_tmpl.aspx?form=1", "ShowBetList('" + Mode + "','" + RequestTime + "','" + Market + "', DataFrame_" + sTail + ".N" + Market + ");"))
                {
                    return;
                }
                aKeeper.afterNewEvent = afterNewEvent_1;
                aKeeper.setTemplate(fFrame.document.getElementById("UnderOver_tmpl_1").contentWindow);
                aKeeper.RegenEverytime = false;
                break;
            case "1F":
                if (!initialTmpl("UnderOver_tmpl_1F", "UnderOver_tmpl.aspx?form=1F", "ShowBetList('" + Mode + "','" + RequestTime + "','" + Market + "', DataFrame_" + sTail + ".N" + Market + ");"))
                {
                    return;
                }
                aKeeper.afterNewEvent = afterNewEvent_1F;
                aKeeper.setTemplate(fFrame.document.getElementById("UnderOver_tmpl_1F").contentWindow);
                aKeeper.RegenEverytime = true;
                break;
            case "1H":
                if (!initialTmpl("UnderOver_tmpl_1H", "UnderOver_tmpl.aspx?form=1H", "ShowBetList('" + Mode + "','" + RequestTime + "','" + Market + "', DataFrame_" + sTail + ".N" + Market + ");"))
                {
                    return;
                }
                aKeeper.afterNewEvent = afterNewEvent_1H;
                aKeeper.setTemplate(fFrame.document.getElementById("UnderOver_tmpl_1H").contentWindow);
                aKeeper.RegenEverytime = true;
                break;

            //case "3": 
            default:
                if (!initialTmpl("UnderOver_tmpl_3", "UnderOver_tmpl.aspx?form=3", "ShowBetList('" + Mode + "','" + RequestTime + "','" + Market + "', DataFrame_" + sTail + ".N" + Market + ");"))
                {
                    return;
                }
                aKeeper.afterNewEvent = afterNewEvent_3;
                aKeeper.setTemplate(fFrame.document.getElementById("UnderOver_tmpl_3").contentWindow);
                aKeeper.RegenEverytime = false;
                break;
        }

        aKeeper.SortType = (document.DataForm_L.OrderBy.value == "1") ? 1 : 0;
        aKeeper.afterNewLeague = afterNewLeague;
        aKeeper.afterRepaintTable = afterRepaintTable;
        aKeeper.updateAppendFields = updateAppendFields;
        //    if (parent.SiteMode!=1) //phone betting no pop score message box
        //    {
        //      aKeeper.afterScoreChanged = afterScoreChanged;
        //    }
        aKeeper.BetTypes = new Array(1, 3, 5, 7, 8, 15);
        //arrTicks.push( new Date().getTime());

        aKeeper.setDatas(Del, ARR_FIELDS_DEF1["1"]);
        aKeeper.paintOddsTable();
        //arrTicks.push( new Date().getTime());

        //fFrame.ArrChangeTime["UnderOver"] = document.DataForm.CT.value;
    }

    /*var s = "";
    for (var i = 1; i < arrTicks.length; i++) {
    s += (i + ": ") + (arrTicks[i] - arrTicks[i - 1]) + "\n";
    }
    s += "total: " + (arrTicks[arrTicks.length - 1] - arrTicks[0]);
    alert(s);*/

    if (fFrame.IsNewDropdownList == true)
    {
        var arrBottons;
        var aBtn;

        if (Market == "l")
        {
            aBtn = document.getElementById("btnRefresh_L");
            arrBottons = document.getElementsByName("btnRefresh_L");
        } 
        else
        {
            aBtn = document.getElementById("btnRefresh_D");
            arrBottons = document.getElementsByName("btnRefresh_D");
        }
        if (aBtn != null && aBtn.className.indexOf("disabled") > -1)
        {
            for (var i = 0; i < arrBottons.length; i++)
            {
                arrBottons[i].className = "button-ref disabled";
            }
        }
    }
}

function afterNewLeague(HashEvents, Index, HTML) {
  HTML = HTML.replace("{@Market}", document.DataForm_D.Market.value);
  return HTML.replace("{@Refresh}", RES_REFRESH);
}

function updateAppendFields(ArrUpdAppend, EventList, MatchMap, DirtyMatchMap) {
  for (var i = 0; i < ArrUpdAppend.length; i++) {
    var sMUID = ArrUpdAppend[i][0];
    var idx = MatchMap[sMUID];

    while ( (idx < EventList.length) && (EventList[idx]["MUID"] == sMUID) ) {
      EventList[idx]["RedCardH"] = ArrUpdAppend[i][1];
      EventList[idx]["RedCardA"] = ArrUpdAppend[i][2];
      if (EventList[idx]["MatchCount"] =="1")
      {
             EventList[idx]["MoreCount"] = ArrUpdAppend[i][ArrUpdAppend[i].length-1];
      }
      idx++;
    }
    DirtyMatchMap[sMUID] = "updateAppend";
  }
}

function afterNewEvent_1(HashEvents, Index, HTML, IsLive) {
  var oHash = HashEvents[Index];
  if (!IsLive && !isInPeriod(oHash)) return "";

  var newHash = new Array();

  if (IsLive) {
    if (oHash["LivePeriod"] == 0) {
      newHash["LiveTimeCls"] = (oHash["CsStatus"] == "1")? "HalfTime": "IsLive";
    } else {
      newHash["LiveTimeCls"] = "LiveTime";
      if ((oHash["LivePeriod"] == 2) && (oHash["InjuryTime"] > 0)) {
        newHash["InjuryTime"] = "+" + oHash["InjuryTime"];
      } else {
        newHash["InjuryTime"] = "";
      }
    }
    newHash["RedCardH"] = getRedCardHtml(parseInt(oHash["RedCardH"],10));
    newHash["RedCardA"] = getRedCardHtml(parseInt(oHash["RedCardA"],10));

    if (oHash["Div"] == 0) {
      newHash["Tr_Cls"] = "live";
      newHash["BgColor"] = GetLiveBGColor(oHash["Div"]);
    } else {
      newHash["Tr_Cls"] = "liveligh";
      newHash["BgColor"] = GetLiveBGColor(oHash["Div"]);
    }
  } else {
    if (oHash["Div"] == 0) {
      newHash["Tr_Cls"] = TR_0;
      newHash["BgColor"] = GetEventBGColor(oHash["Div"]);
    } else {
      newHash["Tr_Cls"] = TR_1;
      newHash["BgColor"] = GetEventBGColor(oHash["Div"]);
    }
  }

  var sFlag = oHash["FavorF"];
  newHash["Home_Cls"] = (sFlag == "h") ? CLS_HDP_F: CLS_HDP_N;
  newHash["Away_Cls"] = (sFlag == "a") ? CLS_HDP_F: CLS_HDP_N;
  newHash["Odds_1_H_Cls"] = (oHash["Odds_1_H"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_1_A_Cls"] = (oHash["Odds_1_A"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_3_O_Cls"] = (oHash["Odds_3_O"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_3_U_Cls"] = (oHash["Odds_3_U"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_7_H_Cls"] = (oHash["Odds_7_H"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_7_A_Cls"] = (oHash["Odds_7_A"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_8_O_Cls"] = (oHash["Odds_8_O"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_8_U_Cls"] = (oHash["Odds_8_U"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["isParlay"] = 0;
    if (oHash["TimerSuspend"]=="1") {
        newHash["TimeSuspendCls1"] = CLS_LS_OFF;
        newHash["TimeSuspendCls"] = CLS_LS_ON;
    } else {
        newHash["TimeSuspendCls1"] = CLS_LS_ON;
        newHash["TimeSuspendCls"] = CLS_LS_OFF;
    }

    if ((Index == 0)||(HashEvents[Index - 1]["MatchId"] != oHash["MatchId"])) {
    newHash["StatsInfo"] = oHash["StatsId"] == "0" ? "": getStatsHtml(oHash["MatchId"]);
    newHash["SportRadarInfo"] = oHash["SportRadar"] == 0 ? "": getSportRadarHtml(oHash["MatchId"]);
    newHash["Streaming"] = getStreamingHtml(oHash["MatchId"], oHash["StreamingId"], IsLive);    
    newHash["Favorites"] = getFavoritesHtml(oHash["MUID"], oHash["MatchCode"], (oHash["Favorite"] == "1"), IsLive);
    newHash["More"] = getMoreLabel_1(oHash["MoreCount"], oHash["OddsId_5"], oHash["OddsId_15"]);
    newHash["ScoreMap"] = IsPhonebet ? "": getScoreMapHtml(oHash["MatchId"]);
  }
          newHash["TimerSuspend"] = oHash["TimerSuspend"];

  HTML = _formatTemplate(HTML, "{@", "}");
  HTML = _replaceTags(newHash, HTML);
  return HTML;
}

function afterNewEvent_3(HashEvents, Index, HTML, IsLive) {
  var oHash = HashEvents[Index];
  if (!IsLive && !isInPeriod(oHash)) return "";

  var newHash = new Array();
  newHash["Market"] = document.DataForm_D.Market.value;

  newHash["Odds_1_H_Cls"] = (oHash["Odds_1_H"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_1_A_Cls"] = (oHash["Odds_1_A"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_3_O_Cls"] = (oHash["Odds_3_O"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_3_U_Cls"] = (oHash["Odds_3_U"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_7_H_Cls"] = (oHash["Odds_7_H"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_7_A_Cls"] = (oHash["Odds_7_A"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_8_O_Cls"] = (oHash["Odds_8_O"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_8_U_Cls"] = (oHash["Odds_8_U"] < 0) ? CLS_EVEN: CLS_ODD;

  newHash["Draw"] = getDrawHtml(oHash["OddsId_5"] != "" || oHash["OddsId_15"] != "");

  if (IsLive) {
    if (oHash["LivePeriod"] == 0) {
      newHash["LiveTimeCls"] = (oHash["CsStatus"] == "1")? "HalfTime": "IsLive";
    } else {
      newHash["LiveTimeCls"] = "LiveTime";
      if ((oHash["LivePeriod"] == 2) && (oHash["InjuryTime"] > 0)) {
        newHash["InjuryTime"] = "+" + oHash["InjuryTime"];
      } else {
        newHash["InjuryTime"] = "";
      }
    }
    newHash["RedCardH"] = getRedCardHtml(parseInt(oHash["RedCardH"],10));
    newHash["RedCardA"] = getRedCardHtml(parseInt(oHash["RedCardA"],10));

    if (oHash["Div"] == 0) {
      newHash["Tr_Cls"] = "live";
      newHash["BgColor"] = GetLiveBGColor(oHash["Div"]);
    } else {
      newHash["Tr_Cls"] = "liveligh";
      newHash["BgColor"] = GetLiveBGColor(oHash["Div"]);
    }
  } else {
    if (oHash["Div"] == 0) {
      newHash["Tr_Cls"] = TR_0;
      newHash["BgColor"] = GetEventBGColor(oHash["Div"]);
    } else {
      newHash["Tr_Cls"] = TR_1;
      newHash["BgColor"] = GetEventBGColor(oHash["Div"]);
    }
  }

  switch (oHash["FavorF"]) {
    case "h":
      newHash["Home_Cls"] = CLS_HDP_F;
      newHash["Away_Cls"] = CLS_HDP_N;
      newHash["Value_1_H"] = oHash["Value_1"];
      newHash["Value_1_A"] = "";
      break;
    case "a":
      newHash["Home_Cls"] = CLS_HDP_N;
      newHash["Away_Cls"] = CLS_HDP_F;
      newHash["Value_1_H"] = "";
      newHash["Value_1_A"] = oHash["Value_1"];
      break;
    default:
      newHash["Home_Cls"] = CLS_HDP_N;
      newHash["Away_Cls"] = CLS_HDP_N;
      if (oHash["Odds_1_H"] != "") {
        newHash["Value_1_H"] = "0";
      } else {
        newHash["Value_1_H"] = "";
      }
      newHash["Value_1_A"] = "";
  }

  switch (oHash["FavorH1"]) {
    case "h":
      newHash["Value_7_H"] = oHash["Value_7"];
      newHash["Value_7_A"] = "";
      break;
    case "a":
      newHash["Value_7_H"] = "";
      newHash["Value_7_A"] = oHash["Value_7"];
      break;
    default:
      if (oHash["Odds_7_H"] != "") {
        newHash["Value_7_H"] = "0";
      } else {
        newHash["Value_7_H"] = "";
      }
      newHash["Value_7_A"] = "";
  }

  newHash["UNDER_3"] = (oHash["Goal_3"] == "") ? "" : RES_UNDER;
  newHash["UNDER_8"] = (oHash["Goal_8"] == "") ? "" : RES_UNDER;
  newHash["isParlay"] = 0;
    if (oHash["TimerSuspend"]=="1") {
        newHash["TimeSuspendCls1"] = CLS_LS_OFF;
        newHash["TimeSuspendCls"] = CLS_LS_ON;
    } else {
        newHash["TimeSuspendCls1"] = CLS_LS_ON;
        newHash["TimeSuspendCls"] = CLS_LS_OFF;
    }
  if ((Index == 0) || (HashEvents[Index - 1]["MatchId"] != oHash["MatchId"])) {
    newHash["ShowMatch"] = getShowMatchHtml(oHash["MatchId"], 1, document.DataForm_D.Market.value);
    newHash["StatsInfo"] = oHash["StatsId"] == "0" ? "": getStatsHtml(oHash["MatchId"]);
    newHash["SportRadarInfo"] = oHash["SportRadar"] == 0 ? "" : getSportRadarHtml(oHash["MatchId"]);
    if (fFrame.SiteId == "4200800") {
        newHash["Streaming"] = "<img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/tv_g.gif' />";
    }
    else {
        newHash["Streaming"] = getStreamingHtml(oHash["MatchId"], oHash["StreamingId"], IsLive);
    }        
    var sKeyValue = (document.DataForm_L.OrderBy.value == "1") ? oHash["KickoffTime"] : oHash["MatchCode"];
    newHash["Favorites"] = getFavoritesHtml(oHash["MUID"], sKeyValue, (oHash["Favorite"] == "1"), IsLive);
    newHash["More"] = getMoreLabel_3(oHash["MoreCount"],IsLive);
    newHash["ScoreMap"] = IsPhonebet ? "": getScoreMapHtml(oHash["MatchId"]);
  }

  return _replaceTags(newHash, _formatTemplate(HTML, "{@", "}"));
}

var PreMatchId;
function afterNewEvent_1F(HashEvents, Index, HTML, IsLive) {
  var oHash = HashEvents[Index];
  if (!IsLive && !isInPeriod(oHash)) return "";
  if ((oHash["Value_1"] == "") && (oHash["OddsId_1"] == "") &&
    (oHash["Goal_3"] == "") && (oHash["OddsId_3"] == "")) {
    return "";
  }

  var newHash = new Array();
  if (Index == 0) {
    TrFlag = false;
  }
  if (PreMatchId != oHash["MatchId"]) {
    TrFlag = !TrFlag;
  }

  oHash["Div"] = (TrFlag)? 0: 1;

  if (IsLive) {
    if (oHash["LivePeriod"] == 0) {
      newHash["LiveTimeCls"] = (oHash["CsStatus"] == "1")? "HalfTime": "IsLive";
    } else {
      newHash["LiveTimeCls"] = "LiveTime";
      if ((oHash["LivePeriod"] == 2) && (oHash["InjuryTime"] > 0)) {
        newHash["InjuryTime"] = "+" + oHash["InjuryTime"];
      } else {
        newHash["InjuryTime"] = "";
      }
    }
    newHash["RedCardH"] = getRedCardHtml(parseInt(oHash["RedCardH"],10));
    newHash["RedCardA"] = getRedCardHtml(parseInt(oHash["RedCardA"],10));

    if (oHash["Div"] == 0) {
      newHash["Tr_Cls"] = "live";
      newHash["BgColor"] = GetLiveBGColor(oHash["Div"]);
    } else {
      newHash["Tr_Cls"] = "liveligh";
      newHash["BgColor"] = GetLiveBGColor(oHash["Div"]);
    }
  } else {
    if (oHash["Div"] == 0) {
      newHash["Tr_Cls"] = TR_0;
      newHash["BgColor"] = GetEventBGColor(oHash["Div"]);
    } else {
      newHash["Tr_Cls"] = TR_1;
      newHash["BgColor"] = GetEventBGColor(oHash["Div"]);
    }
  }

  var sFlag = oHash["FavorF"];
  newHash["Home_Cls"] = (sFlag == "h") ? CLS_HDP_F: CLS_HDP_N;
  newHash["Away_Cls"] = (sFlag == "a") ? CLS_HDP_F: CLS_HDP_N;
  newHash["Odds_1_H_Cls"] = (oHash["Odds_1_H"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_1_A_Cls"] = (oHash["Odds_1_A"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_3_O_Cls"] = (oHash["Odds_3_O"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_3_U_Cls"] = (oHash["Odds_3_U"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["isParlay"] = 0;
    if (oHash["TimerSuspend"]=="1") {
        newHash["TimeSuspendCls1"] = CLS_LS_OFF;
        newHash["TimeSuspendCls"] = CLS_LS_ON;
    } else {
        newHash["TimeSuspendCls1"] = CLS_LS_ON;
        newHash["TimeSuspendCls"] = CLS_LS_OFF;
    }
  if ((Index == 0) || (HashEvents[Index - 1]["MatchId"] != oHash["MatchId"])) {
    newHash["StatsInfo"] = oHash["StatsId"] == "0" ? "": getStatsHtml(oHash["MatchId"]);
    newHash["SportRadarInfo"] = oHash["SportRadar"] == 0 ? "": getSportRadarHtml(oHash["MatchId"]);
    newHash["Streaming"] = getStreamingHtml(oHash["MatchId"], oHash["StreamingId"], IsLive);
    newHash["Favorites"] = getFavoritesHtml(oHash["MUID"], oHash["MatchCode"], (oHash["Favorite"] == "1"), IsLive);
    newHash["More"] = getMoreLabel_1(oHash["MoreCount"], oHash["OddsId_5"], oHash["OddsId_15"]);
    newHash["ScoreMap"] = IsPhonebet ? "": getScoreMapHtml(oHash["MatchId"]);
  }

  HTML = _formatTemplate(HTML, "{@", "}");
  HTML = _replaceTags(newHash, HTML);
  return HTML;
}

function afterNewEvent_1H(HashEvents, Index, HTML, IsLive) {
  var oHash = HashEvents[Index];
  if (!IsLive && !isInPeriod(oHash)) return "";

  if ((oHash["Value_7"] == "") && (oHash["OddsId_7"] == "") &&
    (oHash["Goal_8"] == "") && (oHash["OddsId_8"] == "")) {
    return "";
  }

  var newHash = new Array();
  if (Index == 0) {
    TrFlag = false;
  }
  if (PreMatchId != oHash["MatchId"]) {
    TrFlag = !TrFlag;
  }
  oHash["Div"] = (TrFlag)? 0: 1;

  if (IsLive) {
    if (oHash["LivePeriod"] == 0) {
      newHash["LiveTimeCls"] = (oHash["CsStatus"] == "1")? "HalfTime": "IsLive";
    } else {
      newHash["LiveTimeCls"] = "LiveTime";
      if ((oHash["LivePeriod"] == 2) && (oHash["InjuryTime"] > 0)) {
        newHash["InjuryTime"] = "+" + oHash["InjuryTime"];
      } else {
        newHash["InjuryTime"] = "";
      }
    }
    newHash["RedCardH"] = getRedCardHtml(parseInt(oHash["RedCardH"],10));
    newHash["RedCardA"] = getRedCardHtml(parseInt(oHash["RedCardA"],10));

    if (oHash["Div"] == 0) {
      newHash["Tr_Cls"] = "live";
      newHash["BgColor"] = GetLiveBGColor(oHash["Div"]);
    } else {
      newHash["Tr_Cls"] = "liveligh";
      newHash["BgColor"] = GetLiveBGColor(oHash["Div"]);
    }
  } else {
    if (oHash["Div"] == 0) {
      newHash["Tr_Cls"] = TR_0;
      newHash["BgColor"] = GetEventBGColor(oHash["Div"]);
    } else {
      newHash["Tr_Cls"] = TR_1;
      newHash["BgColor"] = GetEventBGColor(oHash["Div"]);
    }
  }

  var sFlag = oHash["FavorH1"];
  newHash["Home_Cls"] = (sFlag == "h") ? CLS_HDP_F: CLS_HDP_N;
  newHash["Away_Cls"] = (sFlag == "a") ? CLS_HDP_F: CLS_HDP_N;
  newHash["Odds_7_H_Cls"] = (oHash["Odds_7_H"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_7_A_Cls"] = (oHash["Odds_7_A"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_8_O_Cls"] = (oHash["Odds_8_O"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["Odds_8_U_Cls"] = (oHash["Odds_8_U"] < 0) ? CLS_EVEN: CLS_ODD;
  newHash["isParlay"] = 0;
    if (oHash["TimerSuspend"]=="1") {
        newHash["TimeSuspendCls1"] = CLS_LS_OFF;
        newHash["TimeSuspendCls"] = CLS_LS_ON;
    } else {
        newHash["TimeSuspendCls1"] = CLS_LS_ON;
        newHash["TimeSuspendCls"] = CLS_LS_OFF;
    }
  if ((Index == 0) || (HashEvents[Index - 1]["MatchId"] != oHash["MatchId"])) {
    newHash["StatsInfo"] = oHash["StatsId"] == "0" ? "": getStatsHtml(oHash["MatchId"]);
    newHash["SportRadarInfo"] = oHash["SportRadar"] == 0 ? "": getSportRadarHtml(oHash["MatchId"]);
    newHash["Streaming"] = getStreamingHtml(oHash["MatchId"], oHash["StreamingId"], IsLive);
    newHash["Favorites"] = getFavoritesHtml(oHash["MUID"], oHash["MatchCode"], (oHash["Favorite"] == "1"), IsLive);
    newHash["More"] = getMoreLabel_1(oHash["MoreCount"], oHash["OddsId_5"], oHash["OddsId_15"]);
    newHash["ScoreMap"] = IsPhonebet ? "": getScoreMapHtml(oHash["MatchId"]);
  }

  HTML = _formatTemplate(HTML, "{@", "}");
  HTML = _replaceTags(newHash, HTML);
  return HTML;
}

var btnStartHandle_L;
var btnStartHandle_D;
function afterScoreChanged(EventList, idx) {
    if (idx < EventList.length && idx>=0 && EventList.length>0)
    {
      var oHash = EventList[idx];
  var newHash = new Array();
  newHash["HomeName"]=oHash["HomeName"];
        newHash["AwayName"]=oHash["AwayName"];
        newHash["ScoreH"]=oHash["ScoreH"];
        newHash["ScoreA"]=oHash["ScoreA"];
        newHash["ShowTime"]=oHash["ShowTime"];
  if (oHash["InjuryTime"]!="" && oHash["InjuryTime"]!="0")
  {
          newHash["InjuryTime"]="+"+oHash["InjuryTime"];
  }
  else
  {
          newHash["InjuryTime"]="";
  }
        var HTML=fFrame.ScoreMsg;
      HTML = _formatTemplate(HTML, "{@", "}");
      HTML = _replaceTags(newHash, HTML);
        var msg1 = new MsgBox(HTML,10000,5,"MainMsg");
        msg1.openMsg();
    }
}
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

  var dispMode = document.getElementById("disstyle").value;
  var sTimePeriod = document.getElementById("selPeriod").value;
  if ((dispMode == "1H") || (dispMode == "1F") || (sTimePeriod != "0")) {
    purgeLeagueRow_1H(OddsTable);
  }

  document.getElementById("BetList").style.display = "none";
  document.getElementById("OddsTr").style.display = "block";
  var nRows=0;
  if (OddsTable.tBodies.length>0)
  {
    nRows=OddsTable.tBodies.length-1;
  }
  if (OddsTable.tBodies[nRows].rows.length <= 1) {
    OddsTable.parentNode.style.display = "none";
    if (aOtherContainer.style.display == "none") {
      // if My Favorite is empty
      if (document.body.id == "Favorite") {
        alert(RES_NonFavoriteMsg);
        fFrame.leftFrame.SwitchMenuType(0,'');//href = 'UnderOver.aspx?Market=t&DispVer='+fFrame.DisplayMode;
      }
      document.getElementById("TrNoInfo").style.display = "block";
    } else {
      document.getElementById("TrNoInfo").style.display = "none";
    }

    if (OddsTable.parentNode.id == "oTableContainer_L") {
      document.getElementById("btnRefresh_L").style.display = "none";
//        if (fFrame.SiteMode == 2)  // Use for control a88's underover subtitle
//      {
//          if (fFrame.Deposit_SiteMode == 2)
//              {
//                document.getElementById("RunningGames").style.display = "none";
//            }
//      }
    } else {
      document.getElementById("btnRefresh_D").style.display = "none";
//      if (fFrame.SiteMode == 2) // Use for control a88's underover subtitle
//      {
//          if (fFrame.Deposit_SiteMode == 2)
//              {
//                document.getElementById("sub_title").style.display = "none";
//            }
//      }
    }
  } else {
    OddsTable.parentNode.style.display = "";
    document.getElementById("TrNoInfo").style.display = "none";

    if (OddsTable.parentNode.id == "oTableContainer_L") {
      document.getElementById("btnRefresh_L").style.display = "";
//      if (fFrame.SiteMode == 2)  // Use for control a88's underover subtitle
//      {
//          if (fFrame.Deposit_SiteMode == 2)
//              {
//                document.getElementById("RunningGames").style.display = "";
//            }
//      }
    } else {
      document.getElementById("btnRefresh_D").style.display = "";
    }
  }

  //window.setTimeout(loadAllTmpl, 15000);
  window.setTimeout(popHorseAD, 2000);
}

function getMoreLabel_1(MoreCount, OddsId5, OddsId15) {
  if (MoreCount == 0) {
      if (fFrame.DisplayMode == "1") {
        if ((OddsId5 == "") && (OddsId15 == "")) {
          return "";
        }
      } else if (fFrame.DisplayMode == "1F") {
        if (OddsId5 == "") {
          return "";
        }
      } else if (fFrame.DisplayMode == "1H") {
        if (OddsId15 == "") {
          return "";
        }
      } else if (fFrame.DisplayMode == "3") {
        return "";
      }
  }
  if (fFrame.SiteId=="4200800") {
    return "<img src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/plus.gif' width='13' height='13' border='0' />";
  } else {
    return "<img src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/plus.gif' width='12' height='12' border='0' />";
  }
}

function getMoreLabel_3(MoreCount) {
  if (MoreCount == 0) {
    return "";
  } else {
      return RES_MORE+"+"+MoreCount;

  }
}

function purgeLeagueRow_1H(OddsTable) {
  var iCount;
  var nRows=0;
  if (OddsTable.tBodies.length>0)
  {
    nRows=OddsTable.tBodies.length-1;
  }
  var oTBody = OddsTable.tBodies[nRows];
  for (var i = oTBody.rows.length - 1; i >= 0; i--) {
    if (oTBody.rows[i].id.charAt(0) == "l") {
      iCount++;
    } else {
      iCount = 0;
    }

    if (iCount > 1) {
      oTBody.deleteRow(i);
    }
  }

  while ( (oTBody.rows.length > 0) && (oTBody.rows[oTBody.rows.length - 1].id.charAt(0) == "l") ) {
    oTBody.deleteRow(oTBody.rows.length - 1);
  }
}

function changeDisplayMode(Mode, domainname) {

  if (g_OddsKeeper_D == null) return;
  fFrame.DisplayMode = Mode;

  switch (Mode) {
    case "1":
      if (!initialTmpl("UnderOver_tmpl_1", "UnderOver_tmpl.aspx?form=1", "changeDisplayMode('" + Mode + "','" + domainname + "');")) {
        return;
      }
      setCookie("DispVer", "1", 7, "", domainname);
      break;
    case "3":
      if (!initialTmpl("UnderOver_tmpl_3", "UnderOver_tmpl.aspx?form=3", "changeDisplayMode('" + Mode + "','" + domainname + "');")) {
        return;
      }
      setCookie("DispVer", "3", 7, "",domainname);
      break;
    case "1F":
      if (!initialTmpl("UnderOver_tmpl_1F", "UnderOver_tmpl.aspx?form=1F", "changeDisplayMode('" + Mode + "','" + domainname + "');")) {
        return;
      }
      break;
    case "1H":
      if (!initialTmpl("UnderOver_tmpl_1H", "UnderOver_tmpl.aspx?form=1H", "changeDisplayMode('" + Mode + "','" + domainname + "');")) {
        return;
      }
      break;
  }

  if ((PAGE_MARKET == "t") && (g_OddsKeeper_L != null)) {
    window.clearTimeout(CounterHandle_L);
    stopButton("l");
    setDisplayMode(Mode, g_OddsKeeper_L);
    //startButton("l");
  }
  window.clearTimeout(CounterHandle_D);
  stopButton("d");
  setDisplayMode(Mode, g_OddsKeeper_D);

  //startButton("d");
  Rechkskeeper_5_15();
}


function setDisplayMode(Mode, aKeeper) {
  switch (Mode) {
    case "1":
      aKeeper.afterNewEvent = afterNewEvent_1;
      aKeeper.setTemplate(fFrame.document.getElementById("UnderOver_tmpl_1").contentWindow);
      aKeeper.RegenEverytime = false;
      break;
    case "3":
      aKeeper.afterNewEvent = afterNewEvent_3;
      aKeeper.setTemplate(fFrame.document.getElementById("UnderOver_tmpl_3").contentWindow);
      aKeeper.RegenEverytime = false;
      break;
    case "1F":
      aKeeper.afterNewEvent = afterNewEvent_1F;
      aKeeper.setTemplate(fFrame.document.getElementById("UnderOver_tmpl_1F").contentWindow);
      aKeeper.RegenEverytime = true;
      break;
    case "1H":
      aKeeper.afterNewEvent = afterNewEvent_1H;
      aKeeper.setTemplate(fFrame.document.getElementById("UnderOver_tmpl_1H").contentWindow);
      aKeeper.RegenEverytime = true;
      break;
  }
  
  aKeeper.paintOddsTable();
  if (fFrame.IsNewDropdownList == true)
  {
    setDisplayText(fFrame.DisplayMode);
  }
}

//===========================================================================================
function setDisplayText(Mode) {
    var oDisstyle = document.getElementById("disstyle");
    var span_oSel = oDisstyle.getElementsByTagName("span");
    var liArray = oDisstyle.getElementsByTagName("li");
    switch (Mode) {
        case "1":
            span_oSel[0].innerHTML = liArray[0].innerHTML;
            break;
        case "3":
            span_oSel[0].innerHTML = liArray[1].innerHTML;
            break;
        case "1F":
            span_oSel[0].innerHTML = liArray[2].innerHTML;
            break;
        case "1H":
            span_oSel[0].innerHTML = liArray[3].innerHTML;
            break;
    }
    oDisstyle.className = "dropDown disabled";
    var arrBottons;
    var aBtn;
    aBtn = document.getElementById("btnRefresh_L");
    arrBottons = document.getElementsByName("btnRefresh_L");
    if (aBtn != null && aBtn.className.indexOf("disabled") > -1)
        for (var i = 0; i < arrBottons.length; i++) {
            if (arrBottons[i].id != "btnRefresh_L")
                arrBottons[i].className = "button-ref disabled";
        }
    aBtn = document.getElementById("btnRefresh_D");
    arrBottons = document.getElementsByName("btnRefresh_D");
    if (aBtn != null && aBtn.className.indexOf("disabled") > -1)
    for (var i = 0; i < arrBottons.length; i++) {
            if (arrBottons[i].id != "btnRefresh_D")
                arrBottons[i].className = "button-ref disabled";
    }
}

var g_SelDisstyle_InnerHTML;
function initialDisstyle(ver)
{
    var oDisstyle;
    if (fFrame.IsNewDropdownList == false)
    {
        var oContainer = document.getElementById("disstyleContainer");
        if (g_SelDisstyle_InnerHTML == null)
        {
            g_SelDisstyle_InnerHTML = oContainer.innerHTML;
        }
        oContainer.innerHTML = g_SelDisstyle_InnerHTML;
        oDisstyle = document.getElementById("disstyle");
    }
    else
    {
        oDisstyle = document.getElementById("disstyle");
        if (g_SelDisstyle_InnerHTML == null)
        {
            g_SelDisstyle_InnerHTML = oDisstyle.innerHTML;
        }
        oDisstyle.innerHTML = g_SelDisstyle_InnerHTML;
    }
    if (ver == "old")
    {
        fFrame.DisplayMode = "1F";

        if ((fFrame.SiteId == "4280" || fFrame.SiteId == "4200800") && !fFrame.IsCssControl)
        {            
            OptionListObj_DisStyle = null;
        }
        else
        {
            if (fFrame.IsNewDropdownList)
            {
                var liArray = oDisstyle.getElementsByTagName("li");
                liArray[1].style.display = "none";
                liArray[0].style.display = "none";
                if (fFrame.DisplayMode == "1H")
                    changeDisplayMode('1H', fFrame.DomainName);
                else
                    changeDisplayMode('1F', fFrame.DomainName);
            }
            else
            {
                oDisstyle.removeChild(oDisstyle.options[1]);
                oDisstyle.removeChild(oDisstyle.options[0]);
                if (fFrame.DisplayMode == "1H")
                {
                    oDisstyle.options[1].selected = true;
                }
                else
                {
                    oDisstyle.options[0].selected = true;
                }
            }
        }

    } 
    else if (ver == "new")
    {
        if ((fFrame.DisplayMode == "1H") || (fFrame.DisplayMode == "1F"))
        {
            fFrame.DisplayMode = "3";
        }
        else if (fFrame.DisplayMode != "1")
        {
            fFrame.DisplayMode = "3";
        }

        if ((fFrame.SiteId == "4280" || fFrame.SiteId == "4200800") && !fFrame.IsCssControl)
        {            
            OptionListObj_DisStyle = null;
        }
        else
        {

            if (fFrame.IsNewDropdownList)
            {
                var liArray = oDisstyle.getElementsByTagName("li");
                liArray[3].style.display = "none";
                liArray[2].style.display = "none";
                if (fFrame.DisplayMode == "1")
                    changeDisplayMode('1', fFrame.DomainName);
                else
                    changeDisplayMode('3', fFrame.DomainName);
            }
            else
            {
                oDisstyle.removeChild(oDisstyle.options[3]);
                oDisstyle.removeChild(oDisstyle.options[2]);
                if (fFrame.DisplayMode == "1")
                {
                    oDisstyle.options[0].selected = true;
                } 
                else
                {
                    oDisstyle.options[1].selected = true;
                }
            }
        }
    } 
    else if ((ver == "1") || (ver == "3"))
    {
        fFrame.DisplayMode = ver;
        initialDisstyle("new");
    } 
    else if ((ver == "1F") || (ver == "1H"))
    {
        fFrame.DisplayMode = ver;
        initialDisstyle("old");
    }
    if (fFrame.IsNewDropdownList == true)
    {
        setDisplayText(fFrame.DisplayMode);
    }
}

//1: ByDate  0:ByCode
function setRefreshSort(){
  var OrderBy = document.DataForm_L.OrderBy.value;
  var sLang = (fFrame.UserLang =="it" || fFrame.UserLang =="jp")  ? "en" : fFrame.UserLang ;
  if(OrderBy == '1') {
    if (fFrame.SiteId=="4280" || fFrame.SiteId=="4200800") {
//    document.getElementById('t_Order').className = sLang + '_sorting right';
      document.getElementById('aSorter').innerHTML = RES_SORTBYTIME;
    } else if(fFrame.IsCssControl == true) {
      document.getElementById('sortspan').innerHTML = RES_SORTBYTIME;
    } else {
      document.getElementById('t_Order').className = sLang + '_sorting';
    }
    document.DataForm_L.OrderBy.value = "0";
    document.DataForm_D.OrderBy.value = "0";
    if (g_OddsKeeper_L != null) {
      g_OddsKeeper_L.SortType = 0;
    }
    g_OddsKeeper_D.SortType = 0;
  } else {
    if (fFrame.SiteId=="4280" || fFrame.SiteId=="4200800") {
//    document.getElementById('t_Order').className = sLang + '_normal right'
      document.getElementById('aSorter').innerHTML = RES_NORMALSORT;
    } else if(fFrame.IsCssControl == true) {
      document.getElementById('sortspan').innerHTML = RES_NORMALSORT;
    } else {
      document.getElementById('t_Order').className = sLang + '_normal';
    }
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

function changeOddsType_ou(selValue) {
  if (PopLauncher != null) {
    PopLauncher.close();
  }
  var oSel =document.getElementById("selOddsType");
  if (oSel.value != selValue) {
    oSel.value = selValue;
  }
  document.DataForm_L.OddsType.value = selValue;
  document.DataForm_D.OddsType.value = selValue;
  document.DataForm_L.RT.value = "W";
  document.DataForm_D.RT.value = "W";
  refreshAll();
}

// Period == 0: All; 1: Before 10:00; 2: After 10:00
function changePeriod(Period) {
  g_OddsKeeper_D.paintOddsTable();
}

function isInPeriod(oHash){
  if (document.getElementById("tdSelPeriod").style.display == "none") {
    return true;
  }

  var sTimePeriod = document.getElementById("selPeriod").value;
  switch (sTimePeriod) {
    case "0":
      return true;
    case "1":
      return (oHash["KickoffTime"].substr(8, 4) <= SEPERATE_TIME);
    case "2":
      return (oHash["KickoffTime"].substr(8, 4) > SEPERATE_TIME);
    default:
      return true;
  }
}

function setSelPeriodMode(CurrTime, MatchCount) {

  var oTd = document.getElementById("tdSelPeriod");
  var oSel = document.getElementById("selPeriod");
  var preDisplay = oTd.style.display;

  if (MatchCount < 200) {
    oTd.style.display = "none";
  } else if (document.DataForm_D.Market.value != 't') {
    oTd.style.display = "none";
  } else if (CurrTime >= SEPERATE_TIME) {
    oTd.style.display = "none";
  } else {
    if (document.DataForm_D.RT.value == "W") {
      oSel.options[0].selected = true;
    }
    oTd.style.display = "";
  }

  if ((oTd.style.display != preDisplay) && (oTd.style.display == "none")) {
    /*if (PAGE_MARKET == "t") {
      window.clearTimeout(CounterHandle_L);
      g_OddsKeeper_L.paintOddsTable();
    }*/
    window.clearTimeout(CounterHandle_D);
    g_OddsKeeper_D.paintOddsTable();
  }
}

var PopLauncher;
var ADLauncher; // ACG AD popup controller
var NewsLauncher; // IBC News popup controller

function popMore(Width, MatchId, LeagueName, HomeName, AwayName, isParlay,isLive) {
  document.getElementById("oPopContainer").innerHTML = "";
  var oMarket = document.MoreForm.Market.value;
  document.MoreForm.MatchId.value = MatchId;
  document.MoreForm.LeagueName.value = LeagueName;
  document.MoreForm.HomeName.value = HomeName;
  document.MoreForm.AwayName.value = AwayName;
  document.MoreForm.isParlay.value = isParlay;
  if (isLive == "l")
  {
    document.MoreForm.Market.value = isLive;
  }
    document.MoreForm.action = "UnderOverPop.aspx";
  document.MoreForm.submit();
  document.MoreForm.Market.value=oMarket;

  var oDiv = document.getElementById("PopDiv");
  oDiv.style.height = 0;
  oDiv.style.width = 0;

  var oTitle = document.getElementById("PopTitleText");
  oTitle.style.width = Width+'px';
  oTitle.innerHTML = HomeName + " -vs- " + AwayName;

  if (PopLauncher == null) {
    var oDragger = document.getElementById("PopTitle");
    var oCloser = document.getElementById("PopCloser");
    PopLauncher = new DivLauncher(oDiv, oDragger, oCloser);
  }
  PopLauncher.open(100, 120);
}

function popAD() {
  if (fFrame.PopupAD) {
    fFrame.PopupAD = false;
    var oDiv = document.getElementById("AcgDiv");
    var oDragger = document.getElementById("AcgTitleBar");
    var oCloser = document.getElementById("AcgCloser");
    if (oDiv != null) {
      ADLauncher = new DivLauncher(oDiv, oDragger, oCloser);
      ADLauncher.afterClose = ADafterClose;
      ADLauncher.open();
    }
  }
}

function ADafterClose(PopDiv) {
  PopDiv.innerHTML='';
  PopDiv = null;
}

function popNews() {
  if (fFrame.PopupNews) {
    fFrame.PopupNews = false;
    var oDiv = document.getElementById("NewsDiv");
    var oDragger = document.getElementById("NewsTitleBar");
    var oCloser = document.getElementById("NewsCloser");
    if (oDiv != null) {
      NewsLauncher = new DivLauncher(oDiv, oDragger, oCloser);
      NewsLauncher.open();
    }
  }
}

var HADLauncher;
function popHorseAD() {
  if (fFrame.PopupFAD) {
    fFrame.PopupFAD = false;
    var oDiv = document.getElementById("divFAD");
    if (oDiv != null) {
      HADLauncher = new DivLauncher(oDiv);
      HADLauncher.open(90, 150);
    }
  }
}

function closePopup() {
  if (NewsLauncher != null) {
    NewsLauncher.close();
  }
}

function SelectChange() {
  stopButton();

  if ((PAGE_MARKET == "t") && (fFrame.SiteMode != 1)) {
    document.formLeagueList.target = "DataFrame_L";
    document.formLeagueList.Market.value = document.DataForm_L.Market.value;
    document.formLeagueList.OrderBy.value = document.DataForm_L.OrderBy.value;
    document.formLeagueList.submit();
  }

  document.formLeagueList.target = "DataFrame_D";
  document.formLeagueList.Market.value = document.DataForm_D.Market.value;
  document.formLeagueList.OrderBy.value = document.DataForm_D.OrderBy.value;
  document.formLeagueList.submit();
}


var REFRESH_GAP_L = true; // a flag to noted is odds display refreshing
var bShowLoading_L = true;
var iRefreshCount_L = REFRESH_COUNTDOWN;
var RefresHandle_L;

function refreshData_L() {
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
}

var REFRESH_GAP_D = true; // a flag to noted is odds display refreshing
var bShowLoading_D = true;
var iRefreshCount_D = REFRESH_COUNTDOWN;
var RefresHandle_D;

function refreshData_D() {
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
}

function refreshAll() {
  if ((PAGE_MARKET == "t") && (fFrame.SiteMode != 1)) {
    refreshData_L();
    //document.getElementById("btnRefresh_L").style.display = "";
  } else {
    document.getElementById("oTableContainer_L").style.display = "none";
//    if (fFrame.SiteMode == 2 ) // Combine A88 under over sub title
//    {
//        if (fFrame.Deposit_SiteMode == 2)
//        {
//          document.getElementById("RunningGames").style.display = "none";
//      }
//    }
  }
  refreshData_D();
}

function stopButton(Market) {
    var aSorter = document.getElementById("aSorter");
    if (aSorter != null)
    {
        if (fFrame.IsNewDropdownList)
            aSorter.className = "buttons disabled";
            
        if(fFrame.SiteId=="4200800")
		    {
			    document.getElementById("t_Order").className = "btn-gylight right disabled";
		    }
		
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

  if (aBtn != null) {
    aBtn.disabled = true;
    aBtn.innerHTML = "";
    if (fFrame.SiteId =="4280" || fFrame.SiteId=="4200800")
    {
        aBtn.innerHTML = "<span><span>" + RES_PLEASE_WAIT + "</span></span>";
    }
    else
    {
        aBtn.innerHTML = "<span>" + RES_PLEASE_WAIT + "</span>";
    }

    aBtn.style.font.color = "gray";
    if (fFrame.IsNewDropdownList) 
        aBtn.className = "buttons disabled";
  }
  for (var i = 0; i < arrBottons.length; i++) {
    arrBottons[i].disabled = true;
    arrBottons[i].innerHTML = "";
    if (fFrame.SiteId =="4280" || fFrame.SiteId=="4200800")
    {
        arrBottons[i].innerHTML = "<span><span>" + RES_PLEASE_WAIT + "</span></span>";
    }
    else
    {
        arrBottons[i].innerHTML = "<span>" + RES_PLEASE_WAIT + "</span>";
    }

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

function startButton(Market) {
    if ((Market == "l") && (REFRESH_GAP_L))
        return;
    else if((Market == "d") && (REFRESH_GAP_D))
        return;

  var aDiv = document.getElementById("divSelectDate");
  if ((aDiv != null) && (aDiv.style.display != "none")) {
    for (var i = 0; i < aDiv.childNodes.length; i++) {
      var oBtn = aDiv.childNodes[i];
      if ((oBtn.tagName != null) && (oBtn.tagName.toUpperCase() == "SPAN")) {
        oBtn.disabled = false;
      }
    }
  }
  var bDiv = document.getElementById("HourContainer");
  if ((bDiv != null) && (bDiv.style.display != "none")) {
    for (var i = 0; i < bDiv.childNodes.length; i++) {
      var oBtn = bDiv.childNodes[i];
      if ((oBtn.tagName != null) && (oBtn.tagName.toUpperCase() == "SPAN")) {
        oBtn.disabled = false;
      }
    }
  }

  var arrBottons;
  var iCount;
  var sBtnLable;
  var oBtn;
  if (Market == "l") {
    REFRESH_GAP_L = true;
    oBtn = document.getElementById("btnRefresh_L");
    arrBottons = document.getElementsByName("btnRefresh_L");
    iCount = REFRESH_INTERVAL_L / 1000 - 1;
    sBtnLable = RES_LIVE;
    CounterHandle_L = setTimeout("countdown('l'," + iCount + ")", 1000);
  } else {
    REFRESH_GAP_D = true;
    oBtn = document.getElementById("btnRefresh_D");
    arrBottons = document.getElementsByName("btnRefresh_D");
    var iCount = REFRESH_INTERVAL_D / 1000 - 1;
    sBtnLable = RES_REFRESH;
    CounterHandle_D = setTimeout("countdown('d'," + iCount + ")", 1000);
  }

  for (var i = 0; i < arrBottons.length; i++) {
    arrBottons[i].innerHTML = "";
    if (fFrame.SiteId =="4280" || fFrame.SiteId=="4200800")
    {
        arrBottons[i].innerHTML = "<span><span>" + sBtnLable + "</span></span>";
    }
    else
    {
        arrBottons[i].innerHTML = "<span>" + sBtnLable + "</span>";
    }
    arrBottons[i].disabled = false;
    arrBottons[i].style.font.color = "black";
    if (fFrame.IsNewDropdownList) 
        arrBottons[i].className = "button-ref";
  }
  if (oBtn != null) {
    oBtn.innerHTML = "";
    if (fFrame.SiteId =="4280" || fFrame.SiteId=="4200800")
    {
        oBtn.innerHTML = "<span><span>" + sBtnLable + iCount + "</span></span>";
    }
    else
    {
        oBtn.innerHTML = "<span>" + sBtnLable + iCount + "</span>";
    }
    oBtn.disabled = false;
    oBtn.style.font.color = "black";
    if (fFrame.IsNewDropdownList) 
        oBtn.className = "buttons";
  }

  //early haven't btnRefresh_L
  if ( (Market =="d" || !document.getElementById("btnRefresh_L").disabled ) && !document.getElementById("btnRefresh_D").disabled) {
    var aSel = document.getElementById("selOddsType");
    if (aSel !== null && aSel.disabled) {
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
	  {
	    if(fFrame.SiteId=="4200800")
	      document.getElementById("t_Order").className = "btn-gylight right";
      
	     aSorter.disabled = false;
	  }
  }  
}

function countdown(sMarket, Count) {
  var oBtn;
  var sBtnLable;
  if (sMarket == "l") {
    if (!REFRESH_GAP_L) return;
    if (Count <= 0) {
      refreshData_L();
      return;
    }
        if (fFrame.SiteId =="4280" || fFrame.SiteId=="4200800")
    {
        document.getElementById("btnRefresh_L").innerHTML = "<span><span>" + RES_LIVE + Count + "</span></span>";
    }
    else
    {
        document.getElementById("btnRefresh_L").innerHTML = "<span>" + RES_LIVE + Count + "</span>";
    }
    CounterHandle_L = setTimeout("countdown('" + sMarket +"'," + (Count - 1) + ")", 1000);
  } else {
    if (!REFRESH_GAP_D) return;
    if (Count <= 0) {
      refreshData_D();
      return;
    }
    if (fFrame.SiteId =="4280" || fFrame.SiteId=="4200800")
    {
        document.getElementById("btnRefresh_D").innerHTML = "<span><span>" + RES_REFRESH + Count + "</span></span>";
    }
    else
    {
        document.getElementById("btnRefresh_D").innerHTML = "<span>" + RES_REFRESH + Count + "</span>";
    }
    CounterHandle_D = setTimeout("countdown('" + sMarket +"'," + (Count - 1) + ")", 1000);
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

  if (document.DataForm_D.Market != null) {
    document.LeagueForm.OrderBy.value = document.DataForm_D.OrderBy.value;
  }

  if ((PAGE_MARKET == "t") && (fFrame.SiteMode != 1)) {
    //btnstop();
    document.LeagueForm.Game.value = fFrame.LastSelectedMenu;
    document.LeagueForm.Market.value = document.DataForm_L.Market.value;
    document.LeagueForm.DispRang.value = "0";
    document.LeagueForm.target = "DataFrame_L";
    stopButton("l");
    document.LeagueForm.submit();
  }

  document.LeagueForm.Game.value = fFrame.LastSelectedMenu;
  document.LeagueForm.Market.value = document.DataForm_D.Market.value;
  document.LeagueForm.DispRang.value = document.DataForm_D.DispRang.value;
  document.LeagueForm.target = "DataFrame_D";
  stopButton("d");
  document.LeagueForm.submit();

  PopLauncher.close();
}

function selectDate(pSender, pDate) {

  if (!REFRESH_GAP_D) return;

  if (document.DataForm_D.DT.value != pDate) {

    var aDiv = document.getElementById("divSelectDate");
    for (var i = 0; i < aDiv.childNodes.length; i++) {
      if (aDiv.childNodes[i].tagName != null) {
        if (aDiv.childNodes[i].tagName.toUpperCase() == "SPAN") {
          if(fFrame.IsCssControl == true)
            aDiv.childNodes[i].className = "";
          else
            aDiv.childNodes[i].style.color = fFrame.DateColor;            
        }
      }
    }
    if (fFrame.SiteId =="4280" || fFrame.SiteId=="4200800" || fFrame.SiteId=="4200200" || fFrame.SiteId=="4201300") {
      pSender.style.color = "#0c5790";
    } else if(fFrame.IsCssControl == true) {
      pSender.className = "Current";
      pSender.style.color = "";
    } else {
      pSender.style.color = "#9F0915";
    }

    document.DataForm_D.DT.value = pDate;
    document.DataForm_D.RT.value = "W";
  }
  window.clearTimeout(CounterHandle_D);
  refreshData_D();
}

function addFavorites(MUID, KeyValue, IsFavorites, isLive) {
  var sMatchId = MUID.substr(2, MUID.length - 2);
  var obj = document.getElementById("fav_" + MUID);

  var aKeeper = (isLive) && (!IsPhonebet)  ? g_OddsKeeper_L : g_OddsKeeper_D;
  var idx;
  if (aKeeper.SortType == 1) {
    idx = aKeeper.findIndex("KickoffTime", KeyValue);
    idx = aKeeper.adjustIndex1st(idx, "KickoffTime", KeyValue, MUID);
  } else {
    idx = aKeeper.findIndex("MatchCode", KeyValue);
    idx = aKeeper.adjustIndex1st(idx, "MatchCode", KeyValue, MUID);
  }

  if (IsFavorites) {
    if (fFrame.IsCssControl == true) {
        obj.innerHTML = "<a href='javascript:addFavorites(\"" + MUID + "\",\"" + KeyValue + "\",0,"+ isLive + ");'><img border='0' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/uncheck.gif' name='fav' /></a>";
    }
    else if (fFrame.SiteId=="4200800") {
        obj.innerHTML = "<a href='javascript:addFavorites(\"" + MUID + "\",\"" + KeyValue + "\",0,"+ isLive + ");'><img border='0' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/uncheck.gif' name='fav' hspace='1' /></a>";
    } else {
        obj.innerHTML = "<a href='javascript:addFavorites(\"" + MUID + "\",\"" + KeyValue + "\",0,"+ isLive + ");'><img border='0' src='" + fFrame.imgServerURL + "template/public/images/uncheck.gif' name='fav' /></a>";
    }

    fav.location.href = "addFavorites.aspx?MatchId=" + sMatchId + "&Action=Delete";

    if (aKeeper.EventList[idx]["MUID"] == MUID) {
      aKeeper.EventList[idx]["Favorite"] = "";
    }
  } else {
    if (fFrame.IsCssControl == true) {
        obj.innerHTML = "<a href='javascript:addFavorites(\"" + MUID + "\",\"" + KeyValue + "\",1," + isLive + ");'><img border='0' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/check.gif' name='fav' /></a>";
    }
    else if (fFrame.SiteId=="4200800") {
        obj.innerHTML = "<a href='javascript:addFavorites(\"" + MUID + "\",\"" + KeyValue + "\",1," + isLive + ");'><img border='0' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/check.gif' name='fav' hspace='1' /></a>";
    } else {
        obj.innerHTML = "<a href='javascript:addFavorites(\"" + MUID + "\",\"" + KeyValue + "\",1," + isLive + ");'><img border='0' src='" + fFrame.imgServerURL + "template/public/images/check.gif' name='fav' /></a>";
    }

    fav.location.href = "addFavorites.aspx?MatchId=" + sMatchId + "&Action=Add";

    if (aKeeper.EventList[idx]["MUID"] == MUID) {
      aKeeper.EventList[idx]["Favorite"] = "1";
    }
  }
}

function getDrawHtml(IsDraw) {
  if (!IsDraw)
    return "";
  else
    return "<div class=\"HdpGoalClass\">" + RES_DRAW + "</div>";
}

function setRefreshMini(MiniUrl1,MiniUrl2) {
  var obj = document.getElementById("miniver");
  var obj2 = document.getElementById("column1");
  var obj3 = document.getElementById("column2");
  var obj4 = document.getElementById("tabbox");
  var obj5 = document.getElementById("oTableContainer_L");
  var obj6 = document.getElementById("oTableContainer_D");
  var obj7 = document.getElementById("divSelectDate");
  var obj8 = document.getElementById("HourContainer");

  var smini = MiniUrl1.substring(0,2);

  obj.className = MiniUrl2;
  obj.innerHTML = "<a href=\"javascript:setRefreshMini('"+MiniUrl2+"','"+MiniUrl1+"');\"></a>";

  if(smini == "ma")
  {
    setCookie("MiniKey", "max", 7, "", RES_DOMAIN);
    obj2.className = "column3";
    obj3.className = "column3";
    obj4.className = "tabbox";
    obj5.className = "tabbox_F";
    obj6.className = "tabbox_F";
    obj7.className = "EarlyMarket_top_bg";
    obj8.className = "EarlyMarket_top_bg";
  }
  else
  {
    setCookie("MiniKey", "min", 7, "", RES_DOMAIN);
    obj2.className = "column3_75";
    obj3.className = "column3_75";
    obj4.className = "tabbox_75";
    obj5.className = "tabbox_F_75";
    obj6.className = "tabbox_F_75";
    obj7.className = "EarlyMarket_top_bg_75";
    obj8.className = "EarlyMarket_top_bg_75";
  }
  changeDisplayMode(fFrame.DisplayMode,RES_DOMAIN);
}

var currentHour = 0;
var changeDay = false;
var Hourlbl = new Array();
var HourClass = new Array();
Hourlbl[0]="";
Hourlbl[1]="";
Hourlbl[2]="";
Hourlbl[3]="";
Hourlbl[4]="";
Hourlbl[5]="";
Hourlbl[6]="";
HourClass[0] = 0;
HourClass[1] = 3;
HourClass[2] = 7;
HourClass[3] = 11;
HourClass[4] = 15;
HourClass[5] = 19;
HourClass[6] = 23;
var isIe = (window.ActiveXObject) ? true : false;
function updateHour(_currentHour,isWeekend,FixDispRang) {
  currentHour = _currentHour;
    var tblobj = document.getElementById("Tbl_TimeRange");
  //isWeekend=false; //close 4hour
  if (isWeekend)
  {
        if (Hourlbl[0]=="")
        {
            for (var i = 0; i < 7; i++)
            {
                Hourlbl[i]=document.getElementById("HourSpan"+HourClass[i]).innerHTML;
            }
        }
    tblobj.style.display = "block";
    document.DataForm_D.DispRang.value = FixDispRang;
        getHourData();
  }
  else
  {
    document.DataForm_D.DispRang.value = "0";
    tblobj.style.display = "none";
  }
}

function getHourData() {
    Initial4Hour();
  // if extend to next session, then automatic load next one
  var dispRang = parseInt(document.DataForm_D.DispRang.value, 10);
    var link1=document.getElementById("HourSpan"+dispRang);
    var span1=document.getElementById("NowRange");
  span1.innerHTML=link1.innerHTML;
  if (dispRang != 0)
  {
        if (dispRang!=23)
        {
          if (document.getElementById("HourSpan"+dispRang).style.display=="none")
          {
                HourLinkClick(document.getElementById("HourSpan" + (dispRang + 4)), dispRang + 4);
            }
      }
      else
      {
          if (changeDay)
          {
                changeDay = false;
                HourLinkClick(document.getElementById("HourSpan3"), 3);
          }
      }
  }
}

var g_HourOptioner;
function Initial4Hour()
{
    var first_lbl=true;
  for (var i = 0; i < 7; i++) {
      if (i== 6)
      {
          if (currentHour==23 && document.getElementById("HourSpan" + HourClass[i]).innerHTML==RES_NOW+Hourlbl[i].substr(5,6))
          {
              changeDay= true;
          }
      }
      document.getElementById("HourSpan" + HourClass[i]).innerHTML=Hourlbl[i];
    if((i == 0) || (currentHour < HourClass[i]) || currentHour==23) {
      document.getElementById("HourSpan" + HourClass[i]).style.display= "";
      if (i != 0) {
          if (first_lbl)
          {
                  document.getElementById("HourSpan" + HourClass[i]).innerHTML=RES_NOW+Hourlbl[i].substr(5,6);
                  first_lbl=false;
        }
          document.getElementById("span" + HourClass[i]).style.display= "";
      }
    } else {
      document.getElementById("HourSpan" + HourClass[i]).style.display= "none";
      document.getElementById("span" + HourClass[i]).style.display= "none";
    }
  }
}
var div_4hour_x;
function popHourContainer(evt) {
  Initial4Hour();
  var divObj = document.getElementById("HourContainer");
  if (g_HourOptioner == null) {
    divObj.style.position = "absolute";
    divObj.style.display = "block";
    div_4hour_x=divObj.offsetLeft;
    g_HourOptioner =  new DivOption(divObj, 5);
  }
  if (document.getElementById("HourSpan3").style.display == "none") {
        g_HourOptioner.Div.style.left=(div_4hour_x - 40) + "px";
    } else {
        g_HourOptioner.Div.style.left=(div_4hour_x - 120) + "px";
    }
  g_HourOptioner.act(evt);
}

// filter match by hour
function HourLinkClick(pSender, id) {
    if (document.DataForm_D.DispRang.value != id) {

    var aDiv = document.getElementById("HourContainer");
    for (var i = 0; i < aDiv.childNodes.length; i++) {
        var sTagName = aDiv.childNodes[i].tagName;
        if ((sTagName != null) && (sTagName.toUpperCase() == "SPAN")) {
            aDiv.childNodes[i].style.color = fFrame.HourLinkColor;
        }
    }

    var link1 = document.getElementById("HourSpan"+id);
    var span1 = document.getElementById("NowRange");
    span1.innerHTML = link1.innerHTML;
    if (!fFrame.IsCssControl)
        pSender.style.color = "#9F0915";

    if (g_HourOptioner != null) {
      g_HourOptioner.close();
    }
    // reload data
    stopButton("d");
    setTimeout(function(){
      document.DataForm_D.DispRang.value = id;
      document.DataForm_D.RT.value = "W";
      document.DataForm_D.submit();
    },1000);
  }
}

function GotoNumberGame()
{
    closePopup();
    fFrame.leftFrame.SwitchSport('','161');
}