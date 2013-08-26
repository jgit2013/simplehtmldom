//window.top-> Index.aspx or Main.aspx

var m_sports;
var MaxMilliSec = 30000;
// when click change menu type exec SetMenuData need to show odds
var IsChangeMenuType = false;
var Tmpl_Initialed = false; // flag to record menu is template loaded ?
var ShowMenuFlag = true;  // for first load data
var arrURL = new Array();
var ForceMenuData = false; // Force to get menu data from Menu_data.aspx
var isParlay = false;
var SportCount=42;
var OpenLiveSportItem =true;
var isSubMenuOpened = false;
var hasRacing = false;
var fFrame= getParent(window);

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
arrURL["0_P"] = "/SportsMixParlay.aspx";
arrURL["1_UnderOver"] = "/UnderOver.aspx";
arrURL["1_T"] = "/UnderOver.aspx";
arrURL["1_E"] = "/UnderOver.aspx";
arrURL["1_L"] = "/UnderOver.aspx";
arrURL["1_1X2"] = "/1X2.aspx";
arrURL["1_CS"] = "/CorrectScore.aspx";
arrURL["1_HTFT"] = "/HTFT.aspx";
arrURL["1_FGLG"] = "/FGLG.aspx";
arrURL["1_OETG"] = "/OeTg.aspx";
arrURL["1_P"] = arrURL["0_P"];
arrURL["1_F"] = "/Favorite.aspx";
arrURL["2_NBA"] = "/NBA.aspx";
arrURL["2_T"] = "/NBA.aspx";
arrURL["2_E"] = "/NBA.aspx";
arrURL["2_L"] = "/NBA.aspx";
arrURL["2_P"] = arrURL["0_P"];
arrURL["3_NBA"] = "/NBA.aspx";
arrURL["3_E"] = "/NBA.aspx";
arrURL["3_T"] = "/NBA.aspx";
arrURL["3_L"] = "/NBA.aspx";
arrURL["3_P"] = arrURL["0_P"];
arrURL["4_Tennis"] = "/Tennis.aspx";
arrURL["4_E"] = "/Tennis.aspx";
arrURL["4_T"] = "/Tennis.aspx";
arrURL["4_L"] = "/Tennis.aspx";
arrURL["4_P"] = arrURL["0_P"];
arrURL["5_Tennis"] = arrURL["4_Tennis"];
arrURL["5_T"] = arrURL["4_Tennis"];
arrURL["5_E"] = arrURL["4_Tennis"];
arrURL["5_L"] = arrURL["4_Tennis"];
arrURL["5_P"] = arrURL["0_P"];
arrURL["6_Tennis"] = arrURL["4_Tennis"];
arrURL["6_T"] = arrURL["4_Tennis"];
arrURL["6_E"] = arrURL["4_Tennis"];
arrURL["6_L"] = arrURL["4_Tennis"];
arrURL["6_P"] = arrURL["0_P"];
arrURL["7_Tennis"] = arrURL["4_Tennis"];
arrURL["7_T"] = arrURL["4_Tennis"];
arrURL["7_E"] = arrURL["4_Tennis"];
arrURL["7_L"] = arrURL["4_Tennis"];
arrURL["7_P"] = arrURL["0_P"];
arrURL["8_Baseball"] = "/Baseball.aspx";
arrURL["8_E"] = "/Baseball.aspx";
arrURL["8_T"] = "/Baseball.aspx";
arrURL["8_L"] = "/Baseball.aspx";
arrURL["8_P"] = arrURL["0_P"];
arrURL["9_Tennis"] = arrURL["4_Tennis"];
arrURL["9_T"] = arrURL["4_Tennis"];
arrURL["9_E"] = arrURL["4_Tennis"];
arrURL["9_L"] = arrURL["4_Tennis"];
arrURL["9_P"] = arrURL["0_P"];
arrURL["10_Tennis"] = arrURL["4_Tennis"];
arrURL["10_T"] = arrURL["4_Tennis"];
arrURL["10_E"] = arrURL["4_Tennis"];
arrURL["10_L"] = arrURL["4_Tennis"];
arrURL["10_P"] = arrURL["0_P"];
arrURL["11_Tennis"] = arrURL["4_Tennis"];
arrURL["11_T"] = arrURL["4_Tennis"];
arrURL["11_E"] = arrURL["4_Tennis"];
arrURL["11_L"] = arrURL["4_Tennis"];
arrURL["11_P"] = arrURL["0_P"];
arrURL["12_Tennis"] = arrURL["4_Tennis"];
arrURL["12_T"] = arrURL["4_Tennis"];
arrURL["12_E"] = arrURL["4_Tennis"];
arrURL["12_L"] = arrURL["4_Tennis"];
arrURL["12_P"] =arrURL["0_P"];
arrURL["13_Tennis"] = arrURL["4_Tennis"];
arrURL["13_T"] = arrURL["4_Tennis"];
arrURL["13_E"] = arrURL["4_Tennis"];
arrURL["13_L"] = arrURL["4_Tennis"];
arrURL["13_P"] = arrURL["0_P"];
arrURL["14_Tennis"] = arrURL["4_Tennis"];
arrURL["14_T"] = arrURL["4_Tennis"];
arrURL["14_E"] = arrURL["4_Tennis"];
arrURL["14_L"] = arrURL["4_Tennis"];
arrURL["14_P"] = arrURL["0_P"];
arrURL["15_Tennis"] = arrURL["4_Tennis"];
arrURL["15_T"] = arrURL["4_Tennis"];
arrURL["15_E"] = arrURL["4_Tennis"];
arrURL["15_L"] = arrURL["4_Tennis"];
arrURL["15_P"] = arrURL["0_P"];
arrURL["16_Tennis"] = arrURL["4_Tennis"];
arrURL["16_T"] = arrURL["4_Tennis"];
arrURL["16_E"] = arrURL["4_Tennis"];
arrURL["16_L"] = arrURL["4_Tennis"];
arrURL["16_P"] = arrURL["0_P"];
arrURL["17_Tennis"] = arrURL["4_Tennis"];
arrURL["17_T"] = arrURL["4_Tennis"];
arrURL["17_E"] = arrURL["4_Tennis"];
arrURL["17_L"] = arrURL["4_Tennis"];
arrURL["17_P"] = arrURL["0_P"];
arrURL["18_Tennis"] = arrURL["4_Tennis"];
arrURL["18_T"] = arrURL["4_Tennis"];
arrURL["18_E"] = arrURL["4_Tennis"];
arrURL["18_L"] = arrURL["4_Tennis"];
arrURL["18_P"] = arrURL["0_P"];
arrURL["19_Tennis"] = arrURL["4_Tennis"];
arrURL["19_T"] = arrURL["4_Tennis"];
arrURL["19_E"] = arrURL["4_Tennis"];
arrURL["19_L"] = arrURL["4_Tennis"];
arrURL["19_P"] = arrURL["0_P"];
arrURL["20_Tennis"] = arrURL["4_Tennis"];
arrURL["20_T"] = arrURL["4_Tennis"];
arrURL["20_E"] = arrURL["4_Tennis"];
arrURL["20_L"] = arrURL["4_Tennis"];
arrURL["20_P"] = arrURL["0_P"];
arrURL["21_Tennis"] = arrURL["4_Tennis"];
arrURL["21_T"] = arrURL["4_Tennis"];
arrURL["21_E"] = arrURL["4_Tennis"];
arrURL["21_L"] = arrURL["4_Tennis"];
arrURL["21_P"] = arrURL["0_P"];
arrURL["22_Tennis"] = arrURL["4_Tennis"];
arrURL["22_T"] = arrURL["4_Tennis"];
arrURL["22_E"] = arrURL["4_Tennis"];
arrURL["22_L"] = arrURL["4_Tennis"];
arrURL["22_P"] = arrURL["0_P"];
arrURL["23_Tennis"] = arrURL["4_Tennis"];
arrURL["23_T"] = arrURL["4_Tennis"];
arrURL["23_E"] = arrURL["4_Tennis"];
arrURL["23_L"] = arrURL["4_Tennis"];
arrURL["23_P"] = arrURL["0_P"];
arrURL["24_Tennis"] = arrURL["4_Tennis"];
arrURL["24_T"] = arrURL["4_Tennis"];
arrURL["24_E"] = arrURL["4_Tennis"];
arrURL["24_L"] = arrURL["4_Tennis"];
arrURL["24_P"] = arrURL["0_P"];
arrURL["25_Tennis"] = arrURL["4_Tennis"];
arrURL["25_T"] = arrURL["4_Tennis"];
arrURL["25_E"] = arrURL["4_Tennis"];
arrURL["25_L"] = arrURL["4_Tennis"];
arrURL["25_P"] = arrURL["0_P"];
arrURL["26_NBA"] = arrURL["3_NBA"];
arrURL["26_T"] = arrURL["3_NBA"];
arrURL["26_E"] = arrURL["3_NBA"];
arrURL["26_L"] = arrURL["3_NBA"];
arrURL["26_P"] = arrURL["0_P"];
arrURL["27_Cricket"] = '/Cricket.aspx';
arrURL["27_T"] = arrURL["27_Cricket"];
arrURL["27_E"] =arrURL["27_Cricket"];
arrURL["27_L"] =arrURL["27_Cricket"];
arrURL["27_P"] = arrURL["0_P"];
arrURL["28_Tennis"] = arrURL["4_Tennis"];
arrURL["28_T"] = arrURL["4_Tennis"];
arrURL["28_E"] = arrURL["4_Tennis"];
arrURL["28_L"] = arrURL["4_Tennis"];
arrURL["28_P"] = arrURL["0_P"];
arrURL["29_T"] = arrURL["4_Tennis"];
arrURL["29_E"] = arrURL["4_Tennis"];
arrURL["29_L"] = arrURL["4_Tennis"];
arrURL["29_P"] = arrURL["0_P"];
arrURL["30_T"] = arrURL["4_Tennis"];
arrURL["30_E"] = arrURL["4_Tennis"];
arrURL["30_L"] = arrURL["4_Tennis"];
arrURL["30_P"] = arrURL["0_P"];
arrURL["31_Tennis"] = arrURL["4_Tennis"];
arrURL["31_T"] = arrURL["4_Tennis"];
arrURL["31_E"] = arrURL["4_Tennis"];
arrURL["31_L"] = arrURL["4_Tennis"];
arrURL["31_P"] = arrURL["0_P"];
arrURL["32_NBA"] = arrURL["3_NBA"];
arrURL["32_T"] = arrURL["3_NBA"];
arrURL["32_E"] = arrURL["3_NBA"];
arrURL["32_L"] = arrURL["3_NBA"];
arrURL["32_P"] = arrURL["0_P"];
arrURL["33_Tennis"] = arrURL["4_Tennis"];
arrURL["33_T"] = arrURL["4_Tennis"];
arrURL["33_E"] = arrURL["4_Tennis"];
arrURL["33_L"] = arrURL["4_Tennis"];
arrURL["33_P"] = arrURL["0_P"];
arrURL["34_Tennis"] = arrURL["4_Tennis"];
arrURL["34_T"] = arrURL["4_Tennis"];
arrURL["34_E"] = arrURL["4_Tennis"];
arrURL["34_L"] = arrURL["4_Tennis"];
arrURL["34_P"] = arrURL["0_P"];
arrURL["35_Tennis"] = arrURL["4_Tennis"];
arrURL["35_T"] = arrURL["4_Tennis"];
arrURL["35_E"] = arrURL["4_Tennis"];
arrURL["35_L"] = arrURL["4_Tennis"];
arrURL["35_P"] = arrURL["0_P"];
arrURL["36_Tennis"] = arrURL["4_Tennis"];
arrURL["36_T"] = arrURL["4_Tennis"];
arrURL["36_E"] = arrURL["4_Tennis"];
arrURL["36_L"] = arrURL["4_Tennis"];
arrURL["36_P"] = arrURL["0_P"];
arrURL["37_Tennis"] = arrURL["4_Tennis"];
arrURL["37_T"] = arrURL["4_Tennis"];
arrURL["37_E"] = arrURL["4_Tennis"];
arrURL["37_L"] = arrURL["4_Tennis"];
arrURL["37_P"] = arrURL["0_P"];
arrURL["38_Tennis"] = arrURL["4_Tennis"];
arrURL["38_T"] = arrURL["4_Tennis"];
arrURL["38_E"] = arrURL["4_Tennis"];
arrURL["38_L"] = arrURL["4_Tennis"];
arrURL["38_P"] = arrURL["0_P"];
arrURL["39_Tennis"] = arrURL["4_Tennis"];
arrURL["39_T"] = arrURL["4_Tennis"];
arrURL["39_E"] = arrURL["4_Tennis"];
arrURL["39_L"] = arrURL["4_Tennis"];
arrURL["39_P"] = arrURL["0_P"];
arrURL["40_Tennis"] = arrURL["4_Tennis"];
arrURL["40_T"] = arrURL["4_Tennis"];
arrURL["40_E"] = arrURL["4_Tennis"];
arrURL["40_L"] = arrURL["4_Tennis"];
arrURL["40_P"] = arrURL["0_P"];
arrURL["41_Tennis"] = arrURL["4_Tennis"];
arrURL["41_T"] = arrURL["4_Tennis"];
arrURL["41_E"] = arrURL["4_Tennis"];
arrURL["41_L"] = arrURL["4_Tennis"];
arrURL["41_P"] = arrURL["0_P"];
arrURL["42_Tennis"] = arrURL["4_Tennis"];
arrURL["42_T"] = arrURL["4_Tennis"];
arrURL["42_E"] = arrURL["4_Tennis"];
arrURL["42_L"] = arrURL["4_Tennis"];
arrURL["42_P"] = arrURL["0_P"];
arrURL["99_Tennis"] = arrURL["4_Tennis"];
arrURL["99_T"] = arrURL["4_Tennis"];
arrURL["99_E"] = arrURL["4_Tennis"];
arrURL["99_L"] = arrURL["4_Tennis"];
arrURL["99_P"] = arrURL["0_P"];
arrURL["151_T"] = "/Horse.aspx";
//arrURL["151_E"] = arrURL["151_T"];
arrURL["151_E"] = "/Horse_Fixed.aspx";
arrURL["152_T"] = "/Greyhounds.aspx";
arrURL["152_E"] = arrURL["152_T"];
arrURL["153_T"] = "/Harness.aspx";
arrURL["153_E"] = arrURL["153_T"];
arrURL["161_T"] = "/Bingo.aspx";
arrURL["180_T"] = "/VirtualSports.aspx";
arrURL["180_E"] = "/VirtualSports.aspx"
arrURL["201"] = "/Financials.aspx";
arrURL["0_OT"] = "/Outright.aspx";
arrURL["0_E"] = arrURL["0_OT"];
arrURL["0_T"] = arrURL["0_OT"];
//arrURL["0_L"] = "Live.aspx";


function initialMenu() {

  var frameId = "Menu_tmpl";
  var url = "menu/Menu_tmpl.aspx";

  if (fFrame.hash_TmplLoaded[frameId] == null) {
    fFrame.document.getElementById(frameId).contentWindow.location.href = url;
    fFrame.hash_TmplLoaded[frameId] = true;
    Tmpl_Initialed = false;
    window.setTimeout(initialMenu, 200);
    return;
  }

  if (fFrame.document.getElementById(frameId).contentWindow.document.getElementById("tmplEnd") == null) {
    Tmpl_Initialed = false;
    window.setTimeout(initialMenu, 200);
    return;
  }

  var imgsrc=fFrame.document.getElementById(frameId).contentWindow.imgSrc;
  m_sports=fFrame.document.getElementById(frameId).contentWindow.M;
  hasRacing = fFrame.document.getElementById(frameId).contentWindow.hasRacing;
  document.getElementById("MenuContainer").innerHTML = fFrame.document.getElementById(frameId).contentWindow.document.body.innerHTML;

  var menuTitle=document.getElementById('subnav_head');
  menuTitle.style.display='none';

  //m_mouseover(window.top.LastSelectedMenu,imgsrc);
  SetMenuData(m_sports,imgsrc);
  setInterval("AutoRefreshMenuData()",MaxMilliSec);
  Tmpl_Initialed = true;

  ifrmaeresizt();
  menuTitle.style.display='';
}


function AutoRefreshMenuData() {
  //alert('AutoRefreshMenuData  --> IsChangeMenuType :'+IsChangeMenuType);
  isSubMenuOpened = false;
  var objMAC=document.getElementById('hidForce');
  objMAC.value = ForceMenuData;
  var objM_Type=document.getElementById('hidMenuType');
  objM_Type.value=fFrame.LastSelectedMenu;
  document.frmMenuData.submit();
}

//------------------ Switch Menu Type---------------------------
function m_mouseover(m_type,imgsrc) {
  var objMenu;
  if (m_type == 0) {

    objMenu = document.getElementById('menu_all');
    if(objMenu!=null){
        objMenu.className = 'current';
        }
        objMenu = document.getElementById('subnav_head');
    if(objMenu!=null){
        objMenu.className = 'item';
        }

        //  objMenu = document.getElementById('img_menu_oln');
        //  objMenu.src = imgsrc + 'menu_olympic_2.gif';
    objMenu = document.getElementById('menu_wp');

    if(objMenu!=null){
          objMenu.className = '';
    }
//  } else if(m_type == 1){
//    objMenu = document.getElementById('img_menu_oln');
//    objMenu.src = imgsrc + 'menu_olympic_1.gif';
//    objMenu = document.getElementById('menu_all');
//    objMenu.className = 'subnav_all1';
  } else if(m_type == 1 || m_type == 2){
      objMenu = document.getElementById('menu_all');
      if(objMenu!=null) {
        objMenu.className = '';
        }
    objMenu = document.getElementById('menu_wp');
    if(objMenu!=null){
        objMenu.className = 'current';
    }
//    objMenu = document.getElementById('subnav_head');
//    if(objMenu!=null){
//        objMenu.className = 'item2';
//        }
    }
}

function m_onmouseout(imgsrc) {
  var objMenu;

  if (fFrame.LastSelectedMenu == 0) {
    objMenu = document.getElementById('menu_all');
    if(objMenu!=null){
        objMenu.className = 'current';
        }
        objMenu = document.getElementById('subnav_head');
    if(objMenu!=null){
        objMenu.className = 'item';
        }
    objMenu = document.getElementById('menu_wp');
    if(objMenu!=null){
        objMenu.className = '';
    }

  }
//  else if(fFrame.LastSelectedMenu == 1)
//  {

//    objMenu = document.getElementById('img_menu_oln');
//    objMenu.src = imgsrc + 'menu_olympic_1.gif';

//    objMenu = document.getElementById('menu_all');
//    objMenu.className = 'subnav_all1';
//  }
  else if(fFrame.LastSelectedMenu == 1 || fFrame.LastSelectedMenu == 2)
    {
      objMenu = document.getElementById('menu_all');
        if(objMenu!=null){
        objMenu.className = '';
        }
      objMenu = document.getElementById('menu_wp');
      if(objMenu!=null){
        objMenu.className = 'current';
    }
//    objMenu = document.getElementById('subnav_head');
//    if(objMenu!=null){
//        objMenu.className = 'item2';
//        }
    }
}

function SwitchMenuType(m_type, imgsrc) {
  if((fFrame.SiteId == '4201400' && fFrame.LastSelectedSport == 151) || (fFrame.SiteId == '4201400' && fFrame.LastSelectedSport == 152)|| (fFrame.SiteId == '4201400' && fFrame.LastSelectedSport == 153))
  {
    document.getElementById('15X_head_icon').className = 'nav';
  }
  else if((fFrame.SiteId == '4201400' || fFrame.SiteId == '4201000') && document.getElementById(fFrame.LastSelectedSport + '_head_icon')!=null)
  {
    document.getElementById(fFrame.LastSelectedSport + '_head_icon').className = 'nav';
  }
  fFrame.LastSelectedSport =-1;
  //Load first/Last Selected Setting

  if(m_type!=fFrame.LastSelectedMenu)
  {
    IsChangeMenuType=true;
    fFrame.LastSelectedMenu = m_type;
    //Change imange
    m_mouseover(m_type,imgsrc);
    //Exec AutoRefresh submit
    AutoRefreshMenuData();
  }else{
    LoadMenuData('T');
  }
}

//----------------------------------------------------------------

//-------------------Live Control-------------------------------
function LoadLiveSportSetting() {
  if (!parent.mainFrame.PageLoaded) {
    window.setTimeout(LoadLiveSportSetting, 300);
    return;
  }

  var arr_ShowLive = parent.mainFrame.arr_ShowLive;
  var bAllChecked = true;
  for(var sSport in arr_ShowLive) {
    var chkbox = document.getElementById("chkLvSport_" + sSport);
    if (chkbox != null) {
      chkbox.checked = arr_ShowLive[sSport];
      if (!arr_ShowLive[sSport]) {
        bAllChecked = false;
      }
    }
  }

  var chkAll=document.getElementById("chkLvSpotrs_All");
  if(chkAll != null) {
    chkAll.checked = bAllChecked;
  }
}

//Live Sports click All
function LiveSportsClickAll() {

//    if (!isParlay || !IsHaveLiveParlay()){
        LiveMenuSwitch(true);
//    }
  var oChkAll = document.getElementById("chkLvSpotrs_All");
  oChkAll.checked = true;
  if (!refreshOddsPage("L", 0)) {
    parent.mainFrame.location.href = "Live.aspx?Game=" + fFrame.LastSelectedMenu;
    document.getElementById("chkLvSpotrs_All").checked = true;
    for (var i = 0; i < document.getElementsByName("chkLvSport").length; i++) {
      var oChkBox = document.getElementsByName("chkLvSport")[i];
      oChkBox.checked = true;
    }
    return;
  }
  if (!parent.mainFrame.PageLoaded) {
    return;
  }

  var arrCkb = document.getElementsByName("chkLvSport");

  for (var i = 0; i < arrCkb.length; i++) {
    var oChkBox = arrCkb[i];
    oChkBox.checked = true;
    if (oChkBox.value ==161)
    {
        if (fFrame.CanSeeNumberGame) {
            parent.mainFrame.showLiveSport(oChkBox.value, true, fFrame.LastSelectedMenu);
       }
    }else{
        parent.mainFrame.showLiveSport(oChkBox.value, true, fFrame.LastSelectedMenu);
    }
  }
}

//when click sport link on Live Menu
function LiveSportLinkClick(sporttype) {
  if (!parent.mainFrame.PageLoaded) {
    return;
  }

  document.getElementById("chkLvSpotrs_All").checked = false;
  var chkbox = document.getElementById("chkLvSport_"+sporttype);

  var evt = getEvent();
  if (evt.srcElement != null)
  {
    if (evt.srcElement.type != "checkbox")
      chkbox.checked = !chkbox.checked;
  }else if (evt.target != null)
  {
    if (evt.target.type != "checkbox")
      chkbox.checked = !chkbox.checked;
  }

  var bAllCheck = true;
  var arrCkb = document.getElementsByName("chkLvSport");
  for (var i = 0; i < arrCkb.length; i++) {
    if (!arrCkb[i].checked) {
      bAllCheck = false;
      break;
    }
  }
  document.getElementById("chkLvSpotrs_All").checked = bAllCheck;
  parent.mainFrame.showLiveSport(sporttype, chkbox.checked, fFrame.LastSelectedMenu);
}

function LiveMenuSwitch(CloseLiveSport)
{
  for (var i = 1; i <= SportCount; i++) {
      if(document.getElementById('L_' + i+'_head')!=null) {
        if (CloseLiveSport && CheckCountAndSetOtherItem('L',i))
            document.getElementById('L_' + i+'_head').style.display = '';
        else
            document.getElementById('L_' + i+'_head').style.display ='none';
    }
  }

  if (document.getElementById('L_1') != null) {
        if (CloseLiveSport && CheckCountAndSetOtherItem('L','1'))
          document.getElementById('L_1').style.display = '';
      else
          document.getElementById('L_1').style.display = 'none';
  }

  //Close other sport
  if (document.getElementById('L_99_head') != null) {
        if (CloseLiveSport && CheckCountAndSetOtherItem('L','99'))
          document.getElementById('L_99_head').style.display = '';
      else
          document.getElementById('L_99_head').style.display = 'none';
  }

  if (document.getElementById('L_161_head') != null) {
      if (CloseLiveSport && CheckCountAndSetOtherItem('L','161'))
          document.getElementById('L_161_head').style.display = '';
      else
          document.getElementById('L_161_head').style.display = 'none';
  }

  if (document.getElementById('L_201_head') != null) {
      if (CloseLiveSport && CheckCountAndSetOtherItem('L','201'))
          document.getElementById('L_201_head').style.display = '';
      else
          document.getElementById('L_201_head').style.display = 'none';
  }
  OpenLiveSportItem = CloseLiveSport;

}

//when click item on "HDP & OU" bar
function changeLiveDisplayMode(Mode) {
  if (parent.mainFrame.PageLoaded) {
    parent.mainFrame.changeDisplayMode(Mode);
  } else {
    parent.DisplayMode = Mode;
    parent.mainFrame.location.href = "Live.aspx?Game="+fFrame.LastSelectedMenu;
  }
}
//---------------------------------------------------------------------

function refreshOddsPage(Market, SportType, DispVer) {
    try {
    if (parent.mainFrame.document == null) return true;
      if (parent.mainFrame.document.body == null) return true;
      //if (parent.mainFrame.document.body.id != "OddsPage") return false;
  } catch(e) {
    return;
  }

  var aForm = parent.mainFrame.document.DataForm;
  if (aForm == null) {
    aForm = parent.mainFrame.document.DataForm_D;
  }
  if (aForm == null) return false;
  if (aForm.Market == null) return false;

  var sPageSport = aForm.Sport.value;
  if (sPageSport == null) return false;
  if (sPageSport != SportType) return false;

  var sPageMarket = aForm.Market.value;
  if ((Market != "L") && (Market != "F")) {
    if ((SportType != "0")) {
      // all-outright and finance don't need to check market
      if (sPageMarket == null) return false;
      if (sPageMarket.toLowerCase() != Market.toLowerCase()) return false;
    }
  }

  if (SportType == "1") {
    if (Market == "F") {
      if (parent.mainFrame.document.body.id != "Favorite") return false;
    }

    if ((Market == "E") || (Market == "T")) {

      if (parent.mainFrame.document.body.id != "UnderOver") return false;

      // for soccer o/u change display mode
      if (parent.mainFrame.document.getElementById("disstyle").value != DispVer) {
        if (DispVer != "new") {
          parent.mainFrame.initialDisstyle(DispVer);
          parent.mainFrame.changeDisplayMode(DispVer, fFrame.DomainName);
          //return true;
        }
      }
    }

  } else if (SportType == "0") {
    if (Market == "L" && !isParlay) {
      if (parent.mainFrame.document.body.id != "Live") {
        return false;
      }
    } else if (Market == "OT") {
      if (parent.mainFrame.document.body.id != "Outright") {
        return false;
      }
    } else if (isParlay) {
      if (parent.mainFrame.document.body.id != "MixParlay") {
        return false;
      }
      else if (!IsHaveLiveParlay() && Market=="L") {
        return false;
      }
      else if (Market =="LP" && parent.mainFrame.document.body.id == "Live"){
          return false;
      }
      else if (!IsHaveLiveParlay() && Market=="L" && parent.mainFrame.document.body.id =="MixParlay") {
        return false;
      }
      else if (parent.mainFrame.PAGE_MARKET != Market && Market != "P") {
        return false;
      }
    }
  }

  if (aForm.name == "DataForm") {
    parent.mainFrame.refreshData();
    return true;
  } else if (aForm.name == "DataForm_D") {
    parent.mainFrame.refreshAll();
    return true;
  }

  return false;
}

function ShowOdds(Market, SportType, DispVer) {
  var tr_id;
  var bet_type = Market;

  if(fFrame.M88flag){
    parent.mainFrame.location.href ="../UnderOver.aspx?Market=t";
    fFrame.M88flag=false;
  }

  if(Market == '') {
    Market = fFrame.LastSelectedMArket;
  }else if (Market =='F') {
    isParlay = false;
  }

  //switch World cup or All Sport
  var aForm = parent.mainFrame.document.DataForm;
  if (aForm == null) {
    aForm = parent.mainFrame.document.DataForm_D;
  }
  //First load haven't aForm.then set sGame default value 0 .sGame value 0 mean all sport
  var sGame ;
  if(aForm==null ) {
    sGame="0"
  } else {
    if(aForm.Game==null) {
      sGame="0"
    } else {
      sGame=aForm.Game.value;
    }
  }

  //if(sGame == fFrame.LastSelectedMenu) {
  //  if( fFrame.SiteMode !="1" && SportType == "1" && (DispVer == "1" || DispVer =="1F")) {
  //    setCookie("DispVer", DispVer, 7, "", fFrame.DomainName);
  //  }
  //  if (refreshOddsPage(Market, SportType, DispVer)) {
  //    return;
  //  }
  //}

  if(SportType != 180)
  {
    if(sGame == fFrame.LastSelectedMenu){
      //begin add early parply
      if(Market=='P' && fFrame.LastSelectedMArket != 'T')
      {
        if ((m_sports[SportType]['EP'] <= 0) && (m_sports[SportType]['OT'] > 0)) {
          Market='OT';
        }
      }
      //end add early parply
      else if ((m_sports[SportType][Market] <= 0) && (m_sports[SportType]['OT'] > 0)) {
        Market='OT';
      }
      if (refreshOddsPage(Market, SportType, DispVer)) {
        return;
      }
    }else{
      if ((m_sports[SportType][Market] <= 0) && (m_sports[SportType]['OT'] > 0)) {
        Market='OT';
      }
    }
  }

  try {
    parent.mainFrame.document.body.id;
  } catch(e) {
    //CrossParlay by Sport
    if (Market=='P'){
      parent.mainFrame.location.href = arrURL["0_P"] + "?Sport=" + SportType + "&Market=" + fFrame.LastSelectedMArket + "&DispVer=" + DispVer+"&Game="+fFrame.LastSelectedMenu;
    }
    //CrossParlay by Today or Early
    else if(SportType=='P') {
      parent.mainFrame.location.href = arrURL["0_P"]+"?Sport=0&Market=" + fFrame.LastSelectedMArket + "&Game="+fFrame.LastSelectedMenu;
    }
    //Outright by Sport
    else if (Market=='OT') {
      parent.mainFrame.location.href = arrURL["0_OT"] + "?Sport=" + SportType + "&Market=" + Market.toLowerCase() + "&DispVer=" + DispVer+"&Game="+fFrame.LastSelectedMenu;
    //Outright by Today or Early
    } else if(SportType=='OT') {
      parent.mainFrame.location.href = arrURL["0_OT"]+"?Sport=0&Market=" + Market.toLowerCase() + "&Game="+fFrame.LastSelectedMenu;
    }
    else if (SportType == '151' || SportType == '152' || SportType == '153') { // horse & greyhounds & harness
      if (Market=='E') {
        parent.mainFrame.location.href = arrURL[SportType + "_E"] + "?RM=E";
        //alert(arrURL[SportType + "_E"] + "?RM=E");
      }else{
        parent.mainFrame.location.href = arrURL[SportType + "_T"] + "?RM=T";
        //alert(arrURL[SportType + "_T"] + "?RM=T");
      }
    }
    else if (SportType == '161') { // number game
      parent.mainFrame.location.href = arrURL["161_T"] + "?Sport=" + SportType + "&Market=" + Market.toLowerCase();
    }
    else if (SportType == '201') { //Finance
      if (Market=='' || Market=='T') {
        if(m_sports[SportType]['BETS']!='') {
          var FinanceAsset = m_sports[SportType]['BETS'].split(",")[0];
          parent.mainFrame.location.href = arrURL["201"] + "?Market=" + FinanceAsset;
        }
      } else {
        parent.mainFrame.location.href = arrURL["201"]+"?Market="+Market;
      }
    } else {
      //If no hdp/ou ,when click sport need show outright odds
      if ((m_sports[SportType][Market] <= 0) && (m_sports[SportType]['OT'] > 0)) {
        parent.mainFrame.location.href = arrURL["0_OT"] + "?Sport=" + SportType + "&Market=" + Market.toLowerCase() + "&DispVer=" + DispVer+"&Game="+fFrame.LastSelectedMenu;
        return;
      }
      parent.mainFrame.location.href = arrURL[SportType + "_" + Market] + "?Sport=" + SportType + "&Market=" + Market.toLowerCase() + "&DispVer=" + DispVer + "&Game="+  fFrame.LastSelectedMenu;
    }
    return;
  }

  if (SportType == -1) {
    for (var i=1; i <= SportCount; i++){
      if (m_sports[i][Market] > 0) {
        SportType = i;
        return;
      }
    }
  } else if (SportType == '151' || SportType == '152' || SportType == '153') { // horse & greyhounds & harness
    DisplaySubMenuBottomColor('', SportType);
    if (Market=='E'){
      parent.mainFrame.location.href = arrURL[SportType + "_E"] + "?RM=E";
    }else{
      parent.mainFrame.location.href = arrURL[SportType + "_T"] + "?RM=T";
    }
  } else if (SportType == '161') { // number game
    parent.mainFrame.location.href = arrURL["161_T"] + "?Sport=" + SportType + "&Market=" + Market.toLowerCase()+ "&DispVer=" + DispVer;
  } else if (SportType == '201') { // Finance
    if (Market == '' || Market == 'T') {
      if (m_sports[SportType]['BETS'] != '') {
        var FinanceAsset = m_sports[SportType]['BETS'].split(",")[0];
        parent.mainFrame.location.href = arrURL["201"]+"?Market="+FinanceAsset;
      }
    } else {
      parent.mainFrame.location.href = arrURL["201"] + "?Market=" + Market;
    }
  } else {
    var temppath="";
    if (sGame != fFrame.LastSelectedMenu) {
      temppath = "../";
    } else if(sGame == 0 && fFrame.LastSelectedMenu == 0) {
      temppath = "../";
    }
    //CrossParlay by Sport
    if(isParlay || Market=='P') {
      //Keep the color of bottom in sub menu that user click.
      DisplaySubMenuBottomColor(Market, SportType);
      parent.mainFrame.location.href = arrURL["0_P"] + "?Sport=" + SportType + "&Market=" + fFrame.LastSelectedMArket + "&DispVer=" + DispVer+"&Game="+fFrame.LastSelectedMenu;
    }
    //Outright by Sport
    else if(Market == 'OT') {
      //Keep the color of bottom in sub menu that user click.
      DisplaySubMenuBottomColor(Market, SportType);
      parent.mainFrame.location.href = arrURL["0_OT"] + "?Sport=" + SportType + "&Market=" + Market.toLowerCase() + "&DispVer=" + DispVer+"&Game="+fFrame.LastSelectedMenu;
    } else {
      //Keep the color of bottom in sub menu that user click.
      if(Market == 'E' || Market == 'T')
        DisplaySubMenuBottomColor('', SportType);
      else
        DisplaySubMenuBottomColor(Market, SportType);
      //End of Keep the color of bottom in sub menu that user click.
      parent.mainFrame.location.href = arrURL[SportType + "_" + Market] + "?Sport=" + SportType + "&Market=" + fFrame.LastSelectedMArket.toLowerCase() + "&DispVer=" + DispVer + "&Game="+fFrame.LastSelectedMenu;
    }
  }
}

function SwitchSport(market,sport,isCkecked,IsAutoRefresh){
  //  "market == 'custom'"  ---  only for 4201400(QA BUG #2183)
  if (sport > 0 && sport == fFrame.LastSelectedSport && isSubMenuOpened == true && (fFrame.SiteId == '4201400' || fFrame.SiteId == '4201000')) {
    if (market != 'L' && market != 'P' && market != 'OT' && market != 'custom')
      CloseSubMenu(market, sport);
  } else {
    if (market == 'custom') market = '';

    if(market=='') {
      market=fFrame.LastSelectedMArket;
    }
    if (market=='LP'){
      LiveMenuSwitch(false);
    }
    try
    {
      parent.mainFrame.document.body.id;

      if (market == 'P' || market == 'LP')
        isParlay = true;
      else if ((sport != 0) || (market =='OT') || (parent.mainFrame.document.body.id == "Outright") || (parent.mainFrame.document.body.id == ""))
        isParlay = false;
      else
        isParlay = true;
    }
    catch (e)
    {
      isParlay = false;
    }

    if (fFrame.SiteId == '4201400' || fFrame.SiteId == '4201000'){
      SwitchSymbol();
    }
    //Open Selected Sport
    if (CheckCountAndSetOtherItem(market, sport)) {
      if ((market != 'L') && (market != "OT" && sport != "0" && market != "P" && market != "LP")) {
        if (sport == 151 || sport == 152 || sport == 153) {
          if (market == 'E' || fFrame.LastSelectedMenu != 0)
            document.getElementById('15X_body').style.display = 'none';
          else
            document.getElementById('15X_body').style.display = '';

          if(!fFrame.CanSeeHorse && fFrame.CanSeeGreyhounds && !fFrame.CanSeeHarness) {
              sport = 152;
          }
          else if(!fFrame.CanSeeHorse && !fFrame.CanSeeGreyhounds && fFrame.CanSeeHarness){
              sport = 153;
          }

          if(fFrame.SiteId == '4201400' && (sport == 151 || sport == 152 || sport == 153)){
            document.getElementById('15X_head_icon').className = 'nava';
          }
        } else if(sport == 180) {
          if (market == 'E' || fFrame.LastSelectedMenu != 0)
            document.getElementById('18X_body').style.display = 'none';
          else
            document.getElementById('18X_body').style.display = '';
          if(fFrame.SiteId == '4201000') {
            document.getElementById('18X_head_icon').className = 'nava';
          }
        } else if(sport != 161) {
          document.getElementById(sport+'_body').style.display = '';
          if (fFrame.SiteId == '4201000' || fFrame.SiteId == '4201400') {
            document.getElementById(sport + '_head_icon').className = 'nava';
          }
          //else if ((fFrame.SiteId == '4201400' && sport == 151)||(fFrame.SiteId == '4201400' && sport == 152)||(fFrame.SiteId == '4201400' && sport == 153)) {
          //  document.getElementById('15X_head_icon').className = 'nava';
          //}
        }
      }
      //keep last selected sport item
      fFrame.LastSelectedSport = sport;
      if ((market == 'P' || market == 'OT') && sport == '0')
        isSubMenuOpened = false;
      else
        isSubMenuOpened = true;
    //Close All
    } else {
      if(sport!=151 && sport!=152 && sport != 153){  ////If the sport for the Horse, and also count of zero display Horse.aspx
        sport=-1;
      }
    }

    // Close non-selected sports
    this.CloseSports(market,sport);

    //if close all , need to get last selected sport to show odds
    if (sport != 151 && sport != 152 && sport != 153){
      sport = fFrame.LastSelectedSport;
    }
    //for first load and auto refresh
    if (IsAutoRefresh) {
      return;
    }

    if (market == 'L' && !isParlay)
    {
      if ((fFrame.LastSelectedMArket == "L") || (m_sports["0"]["TotalLive"] == 0)) {
        fFrame.LastSelectedSport = -1;
        return;
      }
    } else {
      if (market == 'L' && isParlay && IsHaveLiveParlay()){
        LiveMenuSwitch(false);
      }
      this.ShowOdds(market, sport, fFrame.DisplayMode);
    }
  }
}

function CloseSports(market,sport)
{
  //Scott
  for (var i = 1; i <= SportCount; i++) {
    if (i != sport) {
      if(document.getElementById(i+'_body')!=null) {
        document.getElementById(i+'_body').style.display = 'none';
      }
    }
  }
  //Close other sport
  if (sport != 99) {
    document.getElementById('99_body').style.display = 'none';    
  }
  //Close Horse &  GreyHounds & Harness
  if (sport != 151 && sport != 152 && sport != 153) {
     if (document.getElementById('15X_body') != null) {
      document.getElementById('15X_body').style.display = 'none';
    }
  }

  if (sport != 161) {
    if (document.getElementById('161_body') != null)document.getElementById('161_body').style.display = 'none';    
  }

  //Virtual sports
  if (sport != '180') {
    if (document.getElementById('18X_body') != null) {
      document.getElementById('18X_body').style.display = 'none';
    }
  }

  if (sport != 201) {
    document.getElementById('201_body').style.display = 'none';
  }
}

function SetMenuBaseItem(market,sport) {
  var spObj = null;
  var spObj_head = null;
  if(market=='L') {
    spObj = document.getElementById(market + '_' + sport);
    spObj_head = document.getElementById(market+'_' + sport + '_head');
  } else {
    if(sport == 180) {
       spObj = document.getElementById('18X_body');
       spObj_head = document.getElementById('18X_head');
    } else {
      spObj = document.getElementById(sport + '_body');
      spObj_head = document.getElementById(sport + '_head');
    }
  }

  //maggie add  Early haven't Finance and Horse Race
  if (spObj != null){
    if(!CheckCountAndSetOtherItem(market,sport)){
      if(sport != '15X')  {
        //If the sport for the Horse, and also count of zero displayed
        spObj_head.style.display='none';
        spObj.style.display='none';
      }
    } else {
      spObj_head.style.display='';
      spObj.style.display='';

      // Virtual sports only show all sports
      if(sport == 180)
      {
        if(fFrame.LastSelectedMenu != 0 || !fFrame.CanSeeVirtualSports || market=='E')
        {
          spObj_head.style.display = 'none';
          spObj.style.display = 'none';
        }
        return;
      }

      if(market=='L') {
        document.getElementById(market+'_'+sport+'_Cnt').innerHTML=m_sports[sport][market];
      }else {
        if(sport == '15X' || sport == 201 || sport ==161) {
          if(sport == '15X') {
            var iSiteMode = fFrame.SiteMode;
            var topHorse = null;
            if (iSiteMode != 2) {
              topHorse = fFrame.topFrame.document.getElementById("topHorse");                    }

              if(!fFrame.CanSeeHorse && !fFrame.CanSeeGreyhounds && !fFrame.CanSeeHarness)
              {  //if can not bet horse & greyhounds then none displayed;
                spObj_head.style.display='none';
                spObj.style.display='none';
                //document.getElementById('img_'+sport+'_LV').style.display='none';
                if(topHorse!=null)
                {
                  topHorse.className ='fun_icon07';
                }
              }
              else
              {
                var RacingCnt_E = 0;
                var RacingCnt_T = 0;

                if (fFrame.CanSeeHorse) {
                  RacingCnt_E += parseInt(m_sports['151']['E'],10);
                  RacingCnt_T += parseInt(m_sports['151']['T'],10);
                }

                if (fFrame.CanSeeGreyhounds) {
                  RacingCnt_E += parseInt(m_sports['152']['E'],10);
                  RacingCnt_T += parseInt(m_sports['152']['T'],10);
                }

                if (fFrame.CanSeeHarness) {
                  RacingCnt_E += parseInt(m_sports['153']['E'],10);
                  RacingCnt_T += parseInt(m_sports['153']['T'],10);
                }

                if (market=='E') {
                  spObj_head.style.display = '';
                  spObj.style.display = '';
                  //alert('game count early = ' + RacingCnt_E + '; game count today = ' + RacingCnt_T);
                  if(RacingCnt_T <= 0)   //In the Early Menu,if today have horse game , horse img still need to change to red at top menu
                  {
                    if(topHorse != null) {
                      topHorse.className = 'fun_icon07';
                    }
                  }else{
                    if(topHorse != null) {
                      topHorse.className = 'fun_icon08';
                    }
                  }

                  if(RacingCnt_E <= 0) {
                    document.getElementById(sport+'_Cnt').innerHTML = '';
                    document.getElementById('img_' + sport + '_LV').style.display = 'none';
                    document.getElementById(sport + '_head').style.display = 'none';
                  } else {
                    document.getElementById(sport + '_Cnt').innerHTML = RacingCnt_E;
                    document.getElementById('img_' + sport + '_LV').style.display = 'none';
                    document.getElementById(sport + '_head').style.display = '';
                  }
                } else {
                  spObj_head.style.display = '';
                  spObj.style.display = '';

                  if(RacingCnt_T <= 0) {
                    document.getElementById(sport + '_Cnt').innerHTML = '';
                    document.getElementById('img_' + sport + '_LV').style.display = 'none';
                  }
                  else
                  {
                    document.getElementById(sport+'_Cnt').innerHTML = RacingCnt_T;
                    document.getElementById('img_'+sport+'_LV').style.display = '';
                  }

                  if (topHorse != null)
                  {
                    if(hasRacing)
                    {
                        topHorse.className ='fun_icon08';
                    }
                    else
                    {
                        topHorse.className = 'fun_icon07';
                    }
                  }
                }

                //If LastSelectedMenu is 2 representatives is world cup,then horse racing not display
                if(fFrame.LastSelectedMenu != 0) {
                  spObj_head.style.display = 'none';
                  spObj.style.display = 'none';
                }
              }
            } else if (sport == 201) {
              //Finance By Scott
              document.getElementById(sport+'_Cnt').innerHTML='';//parseInt(m_sports[sport]['T'],10);
              var FinanceMenuBody = document.getElementById('201_body');
              var Financeitems = FinanceMenuBody.getElementsByTagName('tr');

              for(i=0;i < Financeitems.length;i++)
              {
                Financeitems[i].style.display='none';
              }

              var FinanceOpenAssets=m_sports[sport]['BETS'].split(",");
              /*for(j=0;j < FinanceOpenAssets.length;j++) //Finance Nobody
              {
                  if(document.getElementById(sport+'_'+FinanceOpenAssets[j])!=null)
                  document.getElementById(sport+'_'+FinanceOpenAssets[j]).style.display='block';
              }*/
            }else if(sport == 161){
              //number game By Tony
              if(!fFrame.CanSeeNumberGame){ //if can not see number gane  then none displayed;
                spObj_head.style.display='none';
                spObj.style.display='none';
              }else{
                //Number Game have no early market
                if(market=='E'){
                  spObj_head.style.display='none';
                  spObj.style.display='none';
                }else{
                  if(m_sports[sport][market]<=0){
                    document.getElementById(sport+'_Cnt').innerHTML='';
                  }else{
                    document.getElementById(sport+'_Cnt').innerHTML=m_sports[sport][market];
                  }
                }
                //If LastSelectedMenu is 2 representatives is world cup,then horse racing not display
                if(fFrame.LastSelectedMenu != 0) {
                  spObj_head.style.display = 'none';
                  spObj.style.display = 'none';
                }
              }
            }
        }else{
          //Today and Early's Sport Count=Hdp/ou+Outright
          document.getElementById(sport+'_Cnt').innerHTML=parseInt(m_sports[sport][market],10)+parseInt(m_sports[sport]['OT'],10);
        }
      }

      if(sport=='201'){return;}
      //HDP/OU
      if(market != 'L' && sport != '161') {
          if (sport == '15X') {
            var HorseCnt = m_sports['151'][market];
            var GreyHoundCnt = m_sports['152'][market];
            var HarnessCnt = m_sports['153'][market];
            var spObj151 = document.getElementById('151_A');
            var spObj152 = document.getElementById('152_A');
            var spObj153 = document.getElementById('153_A');

            if (fFrame.CanSeeHorse) {
              spObj151.style.display = '';
              if (HorseCnt <= 0)
                  document.getElementById('151_A_Cnt').innerHTML = '';
              else
                  document.getElementById('151_A_Cnt').innerHTML = HorseCnt;
                    }
                    else {
                        if (spObj151 != null) {
                            spObj151.style.display = 'none';
                        }
                    }

                    if (fFrame.CanSeeGreyhounds) {
              spObj152.style.display = '';
              if (GreyHoundCnt <= 0)
                  document.getElementById('152_A_Cnt').innerHTML = '';
              else
                  document.getElementById('152_A_Cnt').innerHTML = GreyHoundCnt;
                    }
                    else {
                        if (spObj152 != null) {
                            spObj152.style.display = 'none';
                        }
                    }

                    if (fFrame.CanSeeHarness) {
              spObj153.style.display = '';
              if (HarnessCnt <= 0)
                  document.getElementById('153_A_Cnt').innerHTML = '';
              else
                  document.getElementById('153_A_Cnt').innerHTML = HarnessCnt;
          }
          else {
                        if (spObj153 != null) {
                            spObj153.style.display = 'none';
                        }
                    }
          }
          else {
            spObj = document.getElementById(sport+'_A');
            if (m_sports[sport][market] <= 0) {
              spObj.style.display='none';
            } else {
              spObj.style.display='';
              document.getElementById(sport+'_A_Cnt').innerHTML=m_sports[sport][market];
            }
        }
      }

      // set Live Img only for Today
      if(market!='L' && sport != '15X') {
        if(m_sports[sport]["L"]==0 || market=='E'){
          if(sport != '15X'){
            spObj = document.getElementById('img_'+sport+'_LV');
            if (spObj !=null)spObj.style.display='none';
            spObj = document.getElementById('img_'+sport+'_P_LV');
            if (spObj != null){
              spObj.style.display='none';
            }
          }
        }else{
          spObj = document.getElementById('img_'+sport+'_LV');
          spObj.style.display='';
          if (m_sports[sport]["LP"] > 0){
              spObj = document.getElementById('img_'+sport+'_P_LV');
              if (spObj != null){
                spObj.style.display='';
              }
          }
        }
      }
      // Race and Virtual sport have no TV icon
      if(sport=='15X' || sport=='151' || sport=='152'|| sport=='153' || sport=='180'){return;}
      // Number game always have  TV icon
      if(sport=='161')
      {
          if ((fFrame.SiteMode == "2" && fFrame.IsLogin) || (fFrame.SiteMode != "2") || (fFrame.SiteMode == "2" && !fFrame.IsLogin && fFrame.SiteId == "4200800"))
          return;
      }
      //set TV Img for Live
      if(market=='L')
      {
        spObj=  document.getElementById('img_'+market+'_'+sport+'_TV');
      }else{
        spObj=  document.getElementById('img_'+sport+'_TV');
      }
      // Hide TV icon
      if (m_sports[sport]["TV"] == 0 || market=='E' || !fFrame.CanSeeSportStreaming) {
        spObj.style.display = 'none';

        if (fFrame.SiteId == "4200800" && sport == "1") //Always show tv icon for ICE show.
        {
            spObj.style.display = '';
        }
      } else {
        if (fFrame.SiteId != "4200100" && fFrame.SiteId != "4200800" && !fFrame.IsLogin) {
            spObj.style.display = 'none';
        } else {
            spObj.style.display = '';
        }
      }
    }
  }
}

function CheckCountAndSetOtherItem(market,sport)
{
  var TotalCount=0;
  if(market=='L' && sport=='OT') {
    return false;
  }

  //if is Outright-all link,needn't check
  if(sport=='OT' || sport=='P') {
    return true;
  }

  // virtual sport
  if (sport == 180){
    return true;
  }

  if(market!='L')
  {
    // Soccer non hdp and ou bet type
    if (sport == 1)
    {
      // 1X2
      var bettypeName = market+"_1X2";
      spObj = document.getElementById('1_1X2');
      if (m_sports["1"][bettypeName] <= 0) {
        spObj.style.display = 'none';
      } else {
        spObj.style.display = '';
        document.getElementById('1_1X2_Cnt').innerHTML = m_sports["1"][bettypeName];
        TotalCount += m_sports["1"][bettypeName];
      }

      // FGLG
      bettypeName = market+"_FGLG";
      spObj = document.getElementById( '1_FGLG');
      if (m_sports["1"][bettypeName] <= 0) {
        spObj.style.display = 'none';
      } else {
        spObj.style.display = '';
        document.getElementById('1_FGLG_Cnt').innerHTML = m_sports["1"][bettypeName];
        TotalCount += m_sports["1"][bettypeName];
      }

      // HTFT
      bettypeName = market+"_HTFT";
      spObj = document.getElementById( '1_HTFT');
      if (m_sports["1"][bettypeName] <= 0){
          spObj.style.display='none';
      } else {
        spObj.style.display = '';
        document.getElementById( '1_HTFT_Cnt').innerHTML = m_sports["1"][bettypeName];
        TotalCount += m_sports["1"][bettypeName];
      }

      //OETG
      bettypeName = market+"_OETG";
      spObj=document.getElementById( '1_OETG');
      if (m_sports["1"][bettypeName] <= 0) {
          spObj.style.display = 'none';
      } else {
        spObj.style.display='';
        document.getElementById( '1_OETG_Cnt').innerHTML = m_sports["1"][bettypeName];
        TotalCount += m_sports["1"][bettypeName];
      }

      // CS
      bettypeName = market+"_CS";
      spObj = document.getElementById( '1_CS');
      if (m_sports["1"][bettypeName] <= 0) {
        spObj.style.display = 'none';
      } else {
        spObj.style.display = '';
        document.getElementById('1_CS_Cnt').innerHTML = m_sports["1"][bettypeName];
        TotalCount += m_sports["1"][bettypeName];
      }

      // Parlay
      spObj = document.getElementById('1_P');
      var ParlayCount = 0 ;
      if (market == 'T'){
        ParlayCount=parseInt(m_sports["1"]["P"],10) + parseInt(m_sports["1"]["LP"],10);
      }else{
        ParlayCount=parseInt(m_sports["1"]["EP"],10);
      }
      if (ParlayCount <= 0) {
        spObj.style.display = 'none';
      } else {
        spObj.style.display = '';
        document.getElementById( '1_P_Cnt').innerHTML = ParlayCount
        TotalCount += ParlayCount;
        //set Live image
        if (market != 'E' && document.getElementById("img_1_P_LV") != null)
        {
          spObj = document.getElementById('img_1_P_LV');
          if (m_sports["1"]["LP"] > 0){
            spObj.style.display = '';
          }else{
            spObj.style.display = 'none';
          }
        }
      }
    }
    //Horse & GreyHounds & Harness Always Display
    else if (sport == '15X' || sport == 151 || sport == 152 || sport == 153) {
         return true;
    }
    //Number Game Always Display
    else if (sport == 161) {
         return true;
    }
    // all outright in one page
    else if (sport == 0) {
        return true;
    }
    else
    // orther sport
    {
      // Parlay
      var key = sport + "_P";
      spObj = document.getElementById(key);
      if (spObj != null)
      {
        var ParlayCount =0;
        if(fFrame.LastSelectedMArket == 'T')
          ParlayCount=parseInt(m_sports[sport]["P"],10);
        else
          ParlayCount=parseInt(m_sports[sport]["EP"],10);
        if (ParlayCount <= 0) {
          spObj.style.display = 'none';
        } else {
          spObj.style.display = '';
          key = sport + "_P_Cnt";
          document.getElementById(key).innerHTML = ParlayCount;
          TotalCount += ParlayCount;
          key = "img_" + sport + "_P_LV";
          spObj = document.getElementById(key);
          if (market != 'E'  && spObj != null)
          {
            if(m_sports[sport]["LP"] > 0){
              spObj.style.display = '';
            }else{
              spObj.style.display = 'none';
            }
          }
        }
      }
    }

    //Finance and Horse Race haven't outright
    if (sport != 151 && sport != 152 && sport != 153 && sport != 201 && sport != 161) {
      //Outright by sport
      spObj = document.getElementById(sport+'_OT');
      if (spObj != null)
      {
          if (m_sports[sport]['OT'] <= 0) {
            spObj.style.display = 'none';
          } else {
            spObj.style.display = '';
            document.getElementById(sport + '_OT_Cnt').innerHTML = m_sports[sport]['OT'];
            TotalCount += m_sports[sport]['OT'];
          }
      }
    }
  }
  //add hdp/ou count
  TotalCount += m_sports[sport][market];

  if (TotalCount <= 0) {
    return false;
  }
  return true;
}

function SetMenuItem(market) {
  var spObj = null;
  var spObj_head = null;
  var objShowFavorite = null;
  var sLang = fFrame.UserLang;
  // My favorite menu
  if ((fFrame.IsLogin) && (fFrame.SiteId != "4200300") && (fFrame.SiteId != "4200400")) {
    if (fFrame.IsCssControl == true || fFrame.SiteId == "4200800") {
      if (document.getElementById('div_favorite') != null) {
          objShowFavorite = document.getElementById('div_favorite');
          if (objShowFavorite != null) {
              if (fFrame.SiteId == "4202000") {
                  objBetProcessContainer = document.getElementById('BetProcessContainer');
                  if (objBetProcessContainer != null) {
                      objShowFavorite.style.display = objBetProcessContainer.style.display == 'none' ? '' : 'none';
                  }
              }
              else {
                  objShowFavorite.style.display = '';
              }
          }
      }
    } else {
      if (document.getElementById('div_favorite') != null) {
        objShowFavorite = document.getElementById('div_favorite');
        objShowFavorite.className = sLang + "_favoritemenu";
        objShowFavorite.style.display = '';
      }
    }
  }

  //Sport 1-42
  for (var i = 1; i <= SportCount; i++) {
    this.SetMenuBaseItem(market,i);
  }

  // Sport 99
  this.SetMenuBaseItem(market, 99);

  // Horse Racet 151 & Greyhounds 152 & Harness 153
  this.SetMenuBaseItem(market, '15X');

  // Number Game 161
  this.SetMenuBaseItem(market, 161);

  // Virtual sport
  this.SetMenuBaseItem(market, 180);

  // Finance 201
  this.SetMenuBaseItem(market, 201);

  if (market != 'L'){
    //Outright
    spObj_head = document.getElementById('OT_head');
    if(m_sports["OT"][market] <= 0) {
      spObj_head.style.display='none';
    } else{
      spObj_head.style.display='';
      document.getElementById('OT_Cnt').innerHTML = m_sports["OT"][market];
    }

    //CrossParlay
    if(document.getElementById('P_head') != undefined)
    {
      spObj_head = document.getElementById('P_head');
      if(m_sports["P"][market] <= 0) {
        spObj_head.style.display='none';
      }else{
        spObj_head.style.display='';
        document.getElementById('P_Cnt').innerHTML = m_sports["P"][market];
      }
      if (market !='T') {
        var spObj = document.getElementById('img_P_LV');
        if (spObj != null){
            spObj.style.display='none';
        }
        spObj = document.getElementById('img_P_TV');
          if (spObj != null){
            spObj.style.display='none';
        }
      }else{
        var spObj = document.getElementById('img_P_LV');
        if (spObj != null){
            if( m_sports["P"]["L"] <= 0) {
              spObj.style.display='none';
            }else{
              spObj.style.display='';
            }
        }
        //Check Parlay TV
            spObj = document.getElementById('img_P_TV');
            if (spObj != null)
            {
              if(m_sports["P"]["TV"] <= 0 || !fFrame.CanSeeSportStreaming) {
                spObj.style.display='none';
            } else {
                if (fFrame.SiteId != "4200100" && fFrame.SiteId != "4200800" && !fFrame.IsLogin) {
                    spObj.style.display = 'none';
                } else {
                    spObj.style.display = '';
                }
                
            }
          }
      }
    }
  }else{
    // Set Live All Sports
    spObj_head=document.getElementById(market+'_A_head');
    if(m_sports["0"]["TotalLive"] <= 0){
      spObj_head.style.display='none'
    } else {
      spObj_head.style.display='';
      document.getElementById(market+'_A_Cnt').innerHTML=m_sports["0"]["TotalLive"];

      //set Live All Sports TV Img
      spObj = document.getElementById('img_' + market + '_A_TV');
      if(m_sports["0"]["TV"] == 0) {
        spObj.style.display = 'none';
      } else {
        if(!fFrame.CanSeeSportStreaming){  //Mansion88 Live  haven't  all image icon
          spObj.style.display = 'none';
        }else{
          if (fFrame.SiteId != "4200100" && fFrame.SiteId != "4200800" && !fFrame.IsLogin) {
              spObj.style.display = 'none';
          } else {
              spObj.style.display = '';
          }
        }
      }
    }

    //CrossParlay
    if(document.getElementById('L_P_head') != undefined)
    {
      spObj_head = document.getElementById('L_P_head');
      if(m_sports["P"][market] <= 0) {
        spObj_head.style.display='none';
      }else{
        spObj_head.style.display='';
        document.getElementById('L_P_Cnt').innerHTML = m_sports["P"]["L"];
      }
      //Check Parlay TV
      spObj = document.getElementById('img_L_P_TV');
        if(spObj != null) {
          if(m_sports["P"]["TV"] <= 0 || !fFrame.CanSeeSportStreaming) {
            spObj.style.display='none';
          }else{
            if (fFrame.SiteId != "4200100" && fFrame.SiteId != "4200800" && !fFrame.IsLogin) {
                spObj.style.display = 'none';
            } else {
                spObj.style.display = '';
            }
          }
      }
     }
     LiveMenuSwitch(OpenLiveSportItem);
  }
}

function SetLastSelectedSport(market, IsAutoRefresh) {

  // Display soccer sport when user selected sport is horse, greyhound, harness or virtual sports in today than go to early market.
  if (fFrame.SiteMode == "2"){
    if(fFrame.LastSelectedSport == 151 || fFrame.LastSelectedSport == 152 || fFrame.LastSelectedSport == 153){
      if(market == 'E' || market == 'L'){
         fFrame.LastSelectedSport = 1;
      }
    }
  }

  ////for Olympics show all early ot today
  //if ( (fFrame.LastSelectedMenu == 1) && (fFrame.LastSelectedSport == -1) && (market != 'L') ) {
  //  this.CloseSports("T", -1);
  //  this.CloseSports("E", -1);
  //  if (!IsAutoRefresh) {
  //    parent.mainFrame.location.href = "../Olympics.aspx?market=" + market;
  //  }
  //}
  ////Fist Load Menu , Set Default Selected Sport
  //else
  if (fFrame.LastSelectedSport == -1) {
    for (var i = 1; i <= SportCount; i++) {
      if(m_sports[i][market] > 0 || m_sports[i]['OT'] > 0 || m_sports[i]['P'] > 0){
        if ((m_sports[i][market] <= 0) && (m_sports[i]['OT'] > 0)) IsAutoRefresh=false; // if no HDp,the go to Ourtight page
        SwitchSport(market, i, false, IsAutoRefresh);
        DisplaySubMenuBottomColor('', i);
        return;
      }
    }
  } else {
    SwitchSport(market,fFrame.LastSelectedSport,false,IsAutoRefresh);
  }
}

function LoadMenuData(market, IsAutoRefresh) {
  if (m_sports == null) {
    return;
  }

  market = GetBestMarket(market);

  //no any games
  if (market == null) {
    return;
  }

  this.SwitchMarket(market)

  this.CheckSwitchMenu(IsAutoRefresh);

  this.SetMenuItem(market);

  this.SetLastSelectedSport(market,IsAutoRefresh);
}

//if menu is hide , need to change img to show
function CheckSwitchMenu(IsAutoRefresh) {
  var objShowMenu = parent.document.getElementById('div_menu');
  if (objShowMenu != null) {
    var cname = objShowMenu.className;
    if (cname.indexOf('_showmenu') >= 0) {
      //if is autorefresh,still keep hide status
      if(IsAutoRefresh) {
        var objBody = document.getElementById('market_' + fFrame.LastSelectedMArket + '_body');
        objBody.style.display='none';
      } else {
        objShowMenu.className = cname.replace('_showmenu', '_hidemenu');
        if (fFrame.IsNewDropdownList)
            document.getElementById('div_showhide_menu').className = 'hide_menu';
      }
    }
  }
}

function SwitchMarket(Market) {
  var objMarket;
  fFrame.LastSelectedMArket = Market;

  try {
    if(parent.mainFrame.document.body.id == "MixParlay")
      isParlay = true;
    else
      isParlay = false;
  }
  catch (e) {
    isParlay = false;
  }

  if (Market == 'L') {
    // set menu head
    objMarket = document.getElementById('market_L_head');
    objMarket.className = 'itemrdon';
    objMarket = document.getElementById('market_T_head');
    objMarket.className = 'itemrd';
    objMarket = document.getElementById('market_E_head');
    objMarket.className = 'itemrd';

    //set menu body
    objMarket = document.getElementById('market_L_body');
    objMarket.style.display = (ShowMenuFlag) ? "" : "none";
    objMarket = document.getElementById('market_body');
    objMarket.style.display = 'none';
  }

  if (Market == 'T') {
      if (fFrame.SiteId == '4201400' || fFrame.SiteId == '4201000'){
          SwitchSymbol();
      }
    // set menu head
    objMarket = document.getElementById('market_T_head');
    objMarket.className='itemrdon';
    objMarket = document.getElementById('market_E_head');
    objMarket.className='itemrd';
    objMarket = document.getElementById('market_L_head');
    objMarket.className='itemrd';
    //set menu body

    objMarket = document.getElementById('market_body');
    //objMarket.style.display = '';
    objMarket.style.display = (ShowMenuFlag) ? "" : "none";
    objMarket = document.getElementById('market_L_body');
    objMarket.style.display = 'none';
  }

  if (Market == 'E') {
      if (fFrame.SiteId == '4201400' || fFrame.SiteId == '4201000'){
          SwitchSymbol();
      }
    // set menu head
    objMarket = document.getElementById('market_E_head');
    objMarket.className = 'itemrdon';
    objMarket = document.getElementById('market_T_head');
    objMarket.className = 'itemrd';
    objMarket = document.getElementById('market_L_head');
    objMarket.className = 'itemrd';

    //set menu body
    objMarket = document.getElementById('market_body');
    //objMarket.style.display = '';
    objMarket.style.display = (ShowMenuFlag) ? "" : "none";
    objMarket = document.getElementById('market_L_body');
    objMarket.style.display = 'none';
  }
}

function GetBestMarket(Market) {
  var sMarket = Market;
  // Check Live Count and hide Live text
  if (m_sports["0"]["TotalLive"] == 0) {

      document.getElementById('market_L_text').style.display = 'none';
      document.getElementById('market_L_head_Cnt').innerHTML = '';

        if(fFrame.IsCssControl)
        {
            document.getElementById('market_L_head').style.display = 'none';
            var lineobj = document.getElementById('line_L');
            if(lineobj != null)
              lineobj.style.display = 'none';
        }

    if (sMarket == 'L') {
      sMarket = 'T';
    }
  } else {
    document.getElementById('market_L_text').style.display = '';
    document.getElementById('market_L_head_Cnt').innerHTML = m_sports["0"]["TotalLive"];

    if(fFrame.IsCssControl)
    {
        document.getElementById('market_L_head').style.display = '';
        var lineobj = document.getElementById('line_L');
        if(lineobj != null)
          lineobj.style.display = '';
    }
  }

  // Check Today Count and hide Today text
  if (m_sports["0"]["TotalToday"] == 0) {
    document.getElementById('market_T_text').style.display = 'none';
    if (sMarket == 'T') {
      sMarket = 'E';
    }
  } else {
     document.getElementById('market_T_text').style.display = '';
  }

  // Check Early Count and hide Early text
  if (m_sports["0"]["TotalEarly"] == 0) {
    if (sMarket == 'E') {
      document.getElementById('market_E_text').style.display = 'none';
      // hide all market body
      document.getElementById('market_body').style.display = 'none';
      document.getElementById('market_L_body').style.display = 'none';
      //sMarket = null;
    }
  } else {
    document.getElementById('market_E_text').style.display='';
  }

  return sMarket;
}

function SetMenuData(SportsArray, imgsrc) {
  if (SportsArray != null) {
    //SportsArray['201']['T']=0;
    m_sports = SportsArray;
  }

  if (!Tmpl_Initialed) {
    window.setTimeout("SetMenuData(null,'" + imgsrc + "')", 200);
    return;
  }

  //first Load Menu
  if (fFrame.LastSelectedMArket == null) {
    LoadMenuData('T',true);
  } else {
    if (IsChangeMenuType) {
      LoadMenuData('T');
      IsChangeMenuType = false;
    } else {
      LoadMenuData(fFrame.LastSelectedMArket, true);
    }
  }
  // Set LastSelectedMenu Img
  m_mouseover(fFrame.LastSelectedMenu,imgsrc);
}

function ifrmaeresizt(){
//  var ifrmH = parent.document.getElementById('ifmMenu');
//  ifrmH.height = document.body.scrollHeight + 10;
//document.getElementById("MenuContainer").style.height = window.top.document.getElementById('Menu_tmpl').contentWindow.document.body.scrollHeight;
document.getElementById("MenuContainer").style.display='inline';
}

// hide or show all menu body
function SwitchMenu(lang)
{
  var objBody
  if(fFrame.LastSelectedMArket=='L'){
    objBody = document.getElementById("market_" + fFrame.LastSelectedMArket + "_body");
  }else{
    objBody = document.getElementById("market_body");
  }
  var objShowMenu = document.getElementById('div_menu');
  if (ShowMenuFlag) {
    if (fFrame.IsCssControl == true && fFrame.IsLogin)
    {
        document.getElementById('showhide_menu').innerHTML = RES_show_menu;
        if (fFrame.IsNewDropdownList) {
            document.getElementById('div_showhide_menu').className = 'show_menu';
        }
    }
    objShowMenu.className = lang + "_showmenu";
    objBody.style.display='none';
    if(fFrame.LastSelectedMArket != 'L')
      isSubMenuOpened = false;
  } else {
    if (fFrame.IsCssControl == true && fFrame.IsLogin)
    {
        document.getElementById('showhide_menu').innerHTML = RES_hide_menu;
        if (fFrame.IsNewDropdownList) {
            document.getElementById('div_showhide_menu').className = 'hide_menu';
        }
    }
    objShowMenu.className = lang + "_hidemenu";
    objBody.style.display = "";
  }
  ShowMenuFlag = !ShowMenuFlag;
}

function openMenu(lang) {
  var objBody
  if(fFrame.LastSelectedMArket=='L'){
    objBody = document.getElementById("market_" + fFrame.LastSelectedMArket + "_body");
  }else{
    objBody = document.getElementById("market_body");
  }
  var objShowMenu = document.getElementById('div_menu');
  //after login
  if(objShowMenu!=null) {
    if (fFrame.IsCssControl == true) {
        if (fFrame.IsNewDropdownList == true) {
            document.getElementById('div_showhide_menu').className = 'hide_menu';
        }
      document.getElementById('showhide_menu').innerHTML = RES_hide_menu;
    }
  objShowMenu.className = lang + "_hidemenu";
  }

  if (objBody != null){
    objBody.style.display = "";
  }
  ShowMenuFlag = true;
  isSubMenuOpened = false;
}

function hideMenu(lang) {
  var objBody
    if(fFrame.LastSelectedMArket=='L') {
      objBody = document.getElementById("market_" + fFrame.LastSelectedMArket + "_body");
  }else{
       objBody = document.getElementById("market_body");
  }
  var objShowMenu = document.getElementById('div_menu');

  //after login
  if(objShowMenu!=null) {
      objShowMenu.className = lang + "_showmenu";
      if (fFrame.IsNewDropdownList)
          document.getElementById('div_showhide_menu').className = 'show_menu';
  }

  if (objBody!=null)  {
      objBody.style.display = 'none';
  }
  ShowMenuFlag = false;
}


var HorseInfoPopWindow;
var HorseInfoUrl;
function PopHorseInfo(LeagueID,RaceNumber)
{
    HorseInfoUrl = 'HorseInfoPop.aspx?League=' + LeagueID + '&Race=' + RaceNumber;
    if (!HorseInfoPopWindow || HorseInfoPopWindow.closed) {
        wx=610;
        wy=700;
        x=(screen.width-wx)/2;
        y= x=(screen.height-wx)/2;

        // store new window object in global variable
        HorseInfoPopWindow =  window.open(HorseInfoUrl ,'subInfo','left='+x+',top='+y+',width='+wx+',height='+wy);
        //popHorseInfoWindow.scrollbars.visible =true;
    } else {
        // window already exists, so bring it forward
        if (!HorseInfoPopWindow.closed) {
            HorseInfoPopWindow.location.href = HorseInfoUrl;
            HorseInfoPopWindow.focus();
            HorseInfoPopWindow.document.focus;
        }
    }
}

//function CloseHorseInfoPopWindow()
//{
//    try{
//        if (HorseInfoPopWindow != null && HorseInfoPopWindow.open){
//            HorseInfoPopWindow.close();
//            HorseInfoPopWindow=null;
//        }
//
//      if (fFrame.StreamingFrame != null || fFrame.StreamingFrame.open){
//            fFrame.StreamingFrame.close();
//            fFrame.StreamingFrame=null;
//        }
//    } catch(e) {
//    }
//}

function SetMenutest(){
  alert('SetMenutest');
  SwitchSport('','151');
}

//function OpenNumberGameStreaming()
//{
//  fFrame.StreamingFrame = fFrame.window.open("StreamingFrame.aspx?Matchid=9999&StreamingSrc=5" , "StreamingFrame", "top=20,left=20,height=520,width=525,status=no,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no");
//  fFrame.StreamingFrame.focus();
//}

function getEvent()
{
    if(document.all) {
        return window.event;
    }
    func=getEvent.caller;
    while(func!=null)
    {
        var arg0=func.arguments[0];
        if(arg0)
        {
            if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
            {
                return arg0;
            }
        }
        func=func.caller;
    }
    return null;
}

function GetParlayCount(sMarket,sSport)
{
    var pCount =0;
    if (m_sports==null || sSport=='151' || sSport=='152' || sSport=='153' || sSport =='161') {
        return pCount;
    } else {
        if (sMarket.toUpperCase()=='L') {
            pCount = m_sports[sSport]['LP'];
       }
       else if (sMarket.toUpperCase()=='E') {
            pCount = m_sports[sSport]['EP'];
       }
        else {
            pCount = m_sports[sSport]['P'];
       }
    }
    return pCount;
}

function IsHaveLiveParlay()
{
  if (m_sports["P"]["L"] >0) {
      return true;
  } else {
      return false;
  }
}

function SwitchSymbol()
{
  if(fFrame.LastSelectedSport > 0)
  {
    var id;
    if(fFrame.LastSelectedSport == 151 || fFrame.LastSelectedSport == 152 || fFrame.LastSelectedSport == 153)
    {
      id = document.getElementById('15X_head_icon');
    }
    else if(fFrame.LastSelectedSport == 180)
    {
      id = document.getElementById('18X_head_icon');
    }
    else
    {
      id = document.getElementById(fFrame.LastSelectedSport + '_head_icon');
    }
    id.className = 'nav';
  }
}

/*******************************************************************************************
 * Description: Close sub menu
 * Author: Wei Liu
 * Create Date: 2011/10/13
 *******************************************************************************************/
function CloseSubMenu(market, sport){
  //alert(market);
  if(market != 'L'){
    switch(market)
    {
      case 'P':
      case 'OT':
        // parlay & Outright
        document.getElementById(market+'_body').style.display = 'none';
        document.getElementById(market+'_head_icon').className = 'nav';
        break;
      default:
        if ((fFrame.SiteId == '4201400' && sport == 151) || (fFrame.SiteId == '4201400' && sport == 152) || (fFrame.SiteId == '4201400' && sport == 153)) {
            document.getElementById('15X_body').style.display = 'none';
            document.getElementById('15X_head_icon').className = 'nav';
        }
        else if (sport == 180)
        {
          document.getElementById('18X_body').style.display = 'none';
          document.getElementById('18X_head_icon').className = 'nav';
        }
        else
        {
          document.getElementById(sport+'_body').style.display = 'none';          
          document.getElementById(sport+'_head_icon').className = 'nav';
        }
        break;
    }
    isSubMenuOpened = false;
  }
}

/*******************************************************************************************
 * Description: Display sub menu color in user selected.
 * Author: Wei Liu
 * Create Date: 2011/10/13
 *******************************************************************************************/
function DisplaySubMenuBottomColor(Market, SportType){
  if(fFrame.SiteId == '4201400' && SportType != '0'){
    if(fFrame.LastSelectedSubMenuId != '') {
      if(document.getElementById(fFrame.LastSelectedSubMenuId) != null) {
        document.getElementById(fFrame.LastSelectedSubMenuId).className = 'subnav-link';
      }
    }
    if(Market == '')
    {
      tr_id = SportType + '_A';
    } else {
      tr_id = SportType + '_' + Market;
    }
    if(document.getElementById(tr_id) != null) {
      document.getElementById(tr_id).className = 'subnav-link-r';
      fFrame.LastSelectedSubMenuId = tr_id;
    }
  }
}

