
var bStandalonePlayer = false;
var isReSizeLoading=false;
var StreamingStatusIsLogin=GetIBC_IsLogin();
var isPlaySuccess=false;

var ImgServURL = '';
var CurrentHorseChannelID='';
var fFrame = getParent(window);

var mainplayer_Width="";
var mainplayer_Height="";
var singleplayer_Width="";
var singleplayer_Height="";

function ChkOpener()
{
    if (window.opener == null)
    {
        window.open('','_self','');
        window.opener=null;
        window.close();
    }
}
function CloseWindow()
{
        window.opener=null;
        window.close();
}

function getParent(cFrame)
{
  var aFrame = cFrame;
  for (var i = 0; i < 4; i++) {
    if (aFrame.SiteMode != null) {
      return aFrame;
    } else {
        if (aFrame.parent != null) {
          aFrame = aFrame.parent;
      } else {
          return null;
      }
    }
  }
  return null;
}

function StandalonePlayer() {

  var bIsLogin = GetIBC_IsLogin();

  if ((!bIsLogin && SiteID != "4200800") ||
      (!bIsLogin && SiteID == "4200800" && ScheduleType != '161'))
  {
      alert(err_mainWindowClosed); 
      if(fFrame != null && fFrame.IsCssControl)
      {
        window.FrameValidation.location.href = ImgServURL + TVImagePath;      
      }
      else
      {
        window.FrameValidation.location.href = ImgServURL + SkinPath + 'images/tv_image.jpg';
      }
    
      window.opener = null; 
      window.open("","_self");  
      window.close();
      return;
  }
  var iMin = document.getElementById('mintxtdiv');
  var iMax = document.getElementById('maxtxtdiv');
  iMin.disabled = true;
  iMax.disabled = true;
  
  if(document.getElementById('containerhead').style.display == "block")
  {
    bStandalonePlayer = true;

    document.getElementById('containerhead').style.display = "none";
    document.getElementById('containerhead').style.visibility = "hidden";
    document.getElementById('containerleft').style.display = "none";
    document.getElementById('containerleft').style.visibility = "hidden";
    var FooterElement = document.getElementById('footer');
    if (typeof (FooterElement) != 'undefined' && FooterElement != null) 
    {
        document.getElementById('footer').style.display = "none";
        document.getElementById('footer').style.visibility = "hidden";
    }

    // Change the image in the control
    document.getElementById('minimgdiv').style.display = "none";
    document.getElementById('minimgdiv').style.visibility = "hidden";
    document.getElementById('maximgdiv').style.display = "block";
    document.getElementById('maximgdiv').style.visibility = "visible";
    document.getElementById('mintxtdiv').style.display = "none";
    document.getElementById('mintxtdiv').style.visibility = "hidden";
    document.getElementById('maxtxtdiv').style.display = "block";
    document.getElementById('maxtxtdiv').style.visibility = "visible";
  }
  else
  {
    bStandalonePlayer = false;
    document.getElementById('containerhead').style.display = "block";
    document.getElementById('containerhead').style.visibility = "visible";
    document.getElementById('containerleft').style.display = "block";
    document.getElementById('containerleft').style.visibility = "visible";
    var FooterElement = document.getElementById('footer');
    if (typeof (FooterElement) != 'undefined' && FooterElement != null) 
    {
        document.getElementById('footer').style.display = "block";
        document.getElementById('footer').style.visibility = "visible";
    }
    // Change the image in the control
    document.getElementById('minimgdiv').style.display = "block";
    document.getElementById('minimgdiv').style.visibility = "visible";
    document.getElementById('maximgdiv').style.display = "none";
    document.getElementById('maximgdiv').style.visibility = "hidden";
    document.getElementById('mintxtdiv').style.display = "block";
    document.getElementById('mintxtdiv').style.visibility = "visible";
    document.getElementById('maxtxtdiv').style.display = "none";
    document.getElementById('maxtxtdiv').style.visibility = "hidden";
    
    if (ScheduleType!=undefined){
        if (ScheduleType=="151" || ScheduleType=="152" || ScheduleType=="153") {
          document.getElementById("leftcont").src="StreamingSchedule.aspx?Type=" + ScheduleType;
          window.leftcont.location.href='StreamingSchedule.aspx?Type=' + ScheduleType;
        } else if(ScheduleType=="161") {
          document.getElementById("leftcont").src="StreamingSchedule.aspx?Type=161";
          window.leftcont.location.href='StreamingSchedule.aspx?Type=161';
        } else {
          document.getElementById("leftcont").src="StreamingSchedule.aspx?Type=1";
          window.leftcont.location.href='StreamingSchedule.aspx?Type=1';
        }
    }
  }
  
  if(mainplayer_Width != "" && mainplayer_Height != "" && singleplayer_Width != "" && singleplayer_Height != ""){
     ResizeByXY(bStandalonePlayer, singleplayer_Width, singleplayer_Height, mainplayer_Width, mainplayer_Height);
  }
  else{
     Resize(bStandalonePlayer);
  }
  iMin.disabled = false;
  iMax.disabled = false;
}

function Resize(bSmall)
{
    try{

        //window.scroll(0,0);
        var bIsLogin = GetIBC_IsLogin();

        if(!isReSizeLoading && bIsLogin)
        {
            var fFrame = getParent(window.opener);
            ImgServURL = fFrame.imgServerURL;
        }

        if ((!bIsLogin && SiteID != "4200800") ||
            (!bIsLogin && SiteID == "4200800" && ScheduleType != '161'))
        {            
            if(fFrame != null && fFrame.IsCssControl)
            {
              window.FrameValidation.location.href = ImgServURL + TVImagePath;      
            }
            else
            {
              window.FrameValidation.location.href = ImgServURL + SkinPath + 'images/tv_image.jpg';
            }
        }
        else
        {
            document.DataForm.submit();
        }

        if(bSmall == true)
        {
            if(singleplayer_Width != "" && singleplayer_Height != ""){
                window.resizeTo(singleplayer_Width ,singleplayer_Height); 
                window.outerWidth = singleplayer_Width;
                window.outerHeight = singleplayer_Height;  
            }else{
                window.resizeTo(533,610); 
                window.outerWidth=533;
                window.outerHeight=610;  
            }
        }
        else
        {
            if(mainplayer_Width != "" && mainplayer_Height != ""){
                window.resizeTo(mainplayer_Width ,mainplayer_Height); 
                window.outerWidth = mainplayer_Width;
                window.outerHeight = mainplayer_Height;  
            }else{
                window.resizeTo(810,720)
                window.outerWidth=810;
                window.outerHeight=720;
            }
        }
        document.getElementById('containerMain').style.width = "100%";
        document.getElementById('containerMain').style.height = "100%";
        //resetSlidePosition();
        isReSizeLoading=true;
    }
    catch(err){

    }
}

function ResizeByXY(bSmall, sW, sH, mW, mH)
{
    try{

        //window.scroll(0,0);
        var bIsLogin = GetIBC_IsLogin();

        if(!isReSizeLoading && bIsLogin)
        {
            var fFrame = getParent(window.opener);
            ImgServURL = fFrame.imgServerURL;
        }

        if ((!bIsLogin && SiteID != "4200800") ||
            (!bIsLogin && SiteID == "4200800" && ScheduleType != '161'))
        {
            if(fFrame != null && fFrame.IsCssControl)
            {
              window.FrameValidation.location.href = ImgServURL + TVImagePath;      
            }
            else
            {
              window.FrameValidation.location.href = ImgServURL + SkinPath + 'images/tv_image.jpg';
            }
        }
        else
        {
            document.DataForm.submit();
        }
      
        singleplayer_Width = sW;
        singleplayer_Height = sH;
        mainplayer_Width=mW;
        mainplayer_Height=mH;
            
        if(bSmall == true)
        {
            window.resizeTo(sW ,sH); 
            window.outerWidth=sW;
            window.outerHeight=sH;  
        }
        else
        {
            window.resizeTo(mW ,mH); 
            window.outerWidth=mW;
            window.outerHeight=mH;  
        }
        document.getElementById('containerMain').style.width = "100%";
        document.getElementById('containerMain').style.height = "100%";
        
        //resetSlidePosition();
        isReSizeLoading=true;
    }
    catch(err){

    }
}

function Resize1(bSmall)
{
    if((bSmall == false && document.getElementById('containerhead').style.display != "block") || (bSmall == true && document.getElementById('containerhead').style.display == "block"))
    {
        StandalonePlayer()
    }
}

function SetTitle(LinkType , TitleTxt) {
  
  document.getElementById("GreyhoundsContainer").style.display="none";
  document.getElementById("SportsContainer").style.display="block";
  document.getElementById('left_title').innerHTML = TitleTxt;  
  document.getElementById('Button1').style.display = (LinkType=='0' ? '' : 'none')  
}

function Refresh_List() {
  var bIsLogin = GetIBC_IsLogin();
  if (StreamingStatusIsLogin != bIsLogin) {
    window.location.href=parentUrl;
  } else {
    if (ScheduleType=="151" || ScheduleType=="152" || ScheduleType=="153") {
      window.leftcont.location.href='StreamingSchedule.aspx?Type=' + ScheduleType;
    } else if(ScheduleType=="161") {
      window.leftcont.location.href='StreamingSchedule.aspx?Type=161';
    } else {
      window.leftcont.location.href='StreamingSchedule.aspx?Type=1';
    }
  }
  StreamingStatusIsLogin = bIsLogin;
  //window.leftcont.location.href='StreamingSchedule.aspx' + (GetIBC_IsLogin() ? '' : '?MainIsClose=1');
}

function AutoRefreshLoginCheckin() {
    var bIsLogin = GetIBC_IsLogin();

    if ((StreamingStatusIsLogin != bIsLogin && SiteID != "4200800") ||
        (StreamingStatusIsLogin != bIsLogin && SiteID == "4200800" && ScheduleType != '161'))
    {        
        if(!bIsLogin)
        {
            alert(err_mainWindowClosed); 
              
            if(fFrame != null && fFrame.IsCssControl)
            {
              window.FrameValidation.location.href = ImgServURL + TVImagePath;      
            }
            else
            {
              window.FrameValidation.location.href = ImgServURL + SkinPath + 'images/tv_image.jpg';
            }
            window.opener = null; 
            window.open("","_self");  
            window.close();
        }
    } else {
        var obj = document.getElementById('containerleft');
        if (obj != null && obj.style.display=='block')            
        {
            var scheduleFrame = document.getElementById("leftcont");
            if (scheduleFrame != null)
            {  
                document.getElementById("leftcont").contentWindow.location.reload(true);
            } 
        } 
    }
    StreamingStatusIsLogin = bIsLogin;
}

function GetIBC_IsLogin()
{
    try
    {
        if(mainWindowIsClosed())
        {
            return false;
        }

        return window.opener.IsLogin;
    }
    catch(e)
    {
        return false;
    }
}

function mainWindowIsClosed()
{
    return window.opener==null || window.opener.closed;
}

function swapHorseStreaming(HorseChannelID)
{
    if (isHorseStreaming && CurrentHorseChannelID != HorseChannelID)
    {
        SetLoadVideoLocation("9999","3",HorseChannelID);
    }
}

var hTVbuttonPush = false;

function hTVbuttonTimmerCheck()
{
    if(hTVbuttonPush == false)
    {
        hTVbuttonPush = true;
        setTimeout(function () {if(hTVbuttonPush == true){hTVbuttonPush = false};}, 5000);
	    return true;
    }    
    else
    {
        return false;
    }    
}

function OpenHorseStreaming() {
  CloseTVBox();
  
  if(!hTVbuttonTimmerCheck())
  {
      return;
  }
    
  var obj = document.getElementById("HorseChannelID");
  if (obj != null) {
    openRacingStreaming("151");
    fFrame.StreamingFrame.focus();
  }  
}

var hTV_euroButtonPush = false;

function hTV_euroButtonTimmerCheck()
{
    if(hTV_euroButtonPush == false)
    {
        hTV_euroButtonPush = true;
        setTimeout(function () {if(hTV_euroButtonPush == true){hTV_euroButtonPush = false};}, 5000);
	    return true;
    }    
    else
    {
        return false;
    }    
}

function EuroOpenGreyhoundsStreaming()
{
  CloseTVBox();
  if(!GreyTV_ButtonTimmerCheck())
  {
    return;
  }
  
  var obj = document.getElementById("HorseChannelID");
  if (obj != null)
  {
      if (obj.value == "5")
	   {
	        EuroOpenRacingStreaming("152");
	   }
	   else
	   {
	        if (window.top.StreamingFrame != null && !window.top.StreamingFrame.closed)
            {   
                EuroSwitchGreyhoundsStreaming();
            }
            else
            { 
                window.top.StreamingFrame = window.top.window.open("../StreamingFrame.aspx", "StreamingFrame", "top=20,left=20,height=680,width=810,status=no,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no");   
    	        setTimeout("window.top.StreamingFrame.ShowGreyhoundsContainer()",1000);
    	        setTimeout("EuroSwitchGreyhoundsStreaming()",1500);
            }       
	   }
//	  var HorseChannelID = obj.value;
//	  var StreamingSrc ="7";
//	  if(HorseChannelID == 5)
//      StreamingSrc = "3";
//	  if (window.top.StreamingFrame == null || window.top.StreamingFrame.closed)
//	  {
//	    window.top.StreamingFrame = window.open("../StreamingFrame.aspx?Matchid=9999&StreamingSrc=" + StreamingSrc + "&HorseChannelID="+HorseChannelID, "StreamingFrame", "top=200,left=300,height=485,width=525,status=no,toolbar=no,menubar=no,resizable=yes,location=no");
//	  }

  }  
}

function EuroOpenHorseStreaming() {
  CloseTVBox();
  
  if(!hTVbuttonTimmerCheck())
  {
    return;
  }
            
  var obj = document.getElementById("HorseChannelID");
  if (obj != null) {
    var HorseChannelID = obj.value;
    var StreamingSrc ="3";
    if (window.top.StreamingFrame == null || window.top.StreamingFrame.closed) {      
      window.top.StreamingFrame = window.open("../StreamingFrame.aspx?Matchid=9999&StreamingSrc=" + StreamingSrc + "&HorseChannelID="+HorseChannelID, "StreamingFrame", "top=200,left=300,height=500,width=525,status=no,toolbar=no,menubar=no,resizable=yes,location=no");
   
    } else {
      window.top.StreamingFrame.isHorseStreaming=true;
      window.top.StreamingFrame.swapHorseStreaming(HorseChannelID);
      
    }
    window.top.StreamingFrame.focus();
  }
}

function EuroOpenHarnessStreaming() {
  CloseTVBox();
  
  if(!hTVbuttonTimmerCheck())
  {
    return;
  }
            
  var obj = document.getElementById("HorseChannelID");
  if (obj != null) {
    var HorseChannelID = obj.value;
    var StreamingSrc ="3";
    if (window.top.StreamingFrame == null || window.top.StreamingFrame.closed) {      
      window.top.StreamingFrame = window.open("../StreamingFrame.aspx?Matchid=9999&StreamingSrc=" + StreamingSrc + "&HorseChannelID="+HorseChannelID+"&RacingType=153", "StreamingFrame", "top=200,left=300,height=485,width=525,status=no,toolbar=no,menubar=no,resizable=yes,location=no");

    } else {
      window.top.StreamingFrame.isHorseStreaming=true;
      window.top.StreamingFrame.swapHorseStreaming(HorseChannelID);
      
    }
    window.top.StreamingFrame.focus();
  }
}

function ChagneHorseStream(strHorseChannelID)
{
	var obj = document.getElementById("HorseChannelID");
	var RacingType = fFrame.LastSelectedSport;
	if (obj != null)
	{
	    obj.value =strHorseChannelID;
	}

	if (fFrame.StreamingFrame != null && !fFrame.StreamingFrame.closed)
    {
        if (strHorseChannelID=="6")
       {
            if (fFrame.StreamingFrame.CurrentHorseChannelID != strHorseChannelID)
	        {
            	switchGreyhoundsStreaming();
	    	    fFrame.StreamingFrame.CurrentHorseChannelID=strHorseChannelID;
	        }
       }
       else
       {  
           fFrame.StreamingFrame.isHorseStreaming=true;
           fFrame.StreamingFrame.ScheduleType=RacingType;
           fFrame.StreamingFrame.swapHorseStreaming(strHorseChannelID);            
           fFrame.StreamingFrame.ShowHorseRacingSchule(RacingType);	       
       } 
    }    
}

function EuroChagneHorseStream(strHorseChannelID)
{
  var obj = document.getElementById("HorseChannelID");
  var RacingType = fFrame.LastSelectedSport;
  
  if (obj != null)
  {
      obj.value =strHorseChannelID;
  }
  else
  {
    setTimeout("EuroChagneHorseStream('" + strHorseChannelID + "',100)");
    return;
  }

  if (StreamingFrame != null && !StreamingFrame.closed)
    {
        StreamingFrame.swapHorseStreaming(strHorseChannelID);
        StreamingFrame.ShowHorseRacingSchule(RacingType);
    }
}

function swapBingoStreaming()
{
    SetLoadVideoLocation('9999','5',0);
}

function SetLoadVideoLocation(Matchid,StreamingSrc,HorseChannelID)
{
    HorseChannelID = HorseChannelID || "0";
    
    if(isPlaySuccess && document.getElementById('Matchid').value==Matchid 
       && document.getElementById('StreamingSrc').value==StreamingSrc
       && document.getElementById('HorseChannelID').value==HorseChannelID)
        return;

    if ((Matchid != '' && GetIBC_IsLogin()) ||
        (Matchid != '' && !GetIBC_IsLogin() && SiteID == "4200800" && ScheduleType == '161'))
    {
        if (document.getElementById('Matchid') != null 
            && document.getElementById('StreamingSrc') != null
            &&  document.getElementById('HorseChannelID') != null)
        {         
            document.getElementById('Matchid').value = Matchid;
            document.getElementById('StreamingSrc').value = StreamingSrc;
            document.getElementById('HorseChannelID').value = HorseChannelID; 
            document.DataForm.submit();
        } 
    }
    else
    {
        //document.getElementById('ChannelCrl').style.display='none';
        if(fFrame != null && fFrame.IsCssControl)
        {
          window.FrameValidation.location.href = ImgServURL + TVImagePath;      
        }
        else
        {
          window.FrameValidation.location.href = ImgServURL + SkinPath + 'images/tv_image.jpg';
        }
    }
}
window.focus();
//OddsUtils.js START

function getStreamingHtml(pMatchid, pStreamingId, pIsLive) {
  if(!fFrame.CanSeeSportStreaming)
  {
    return "";
  }
  if (pStreamingId == 0)
  {
    return ""; 
  }

  if (fFrame.SiteMode == 1)
    return "";

  //var obj=document.getElementById("cm-nav");
  if (pIsLive && fFrame.IsUserStreaming) {
    //if (obj != null)
    //  return "<div style=\"display:inline;\"><span onmouseover='OpenStreamingMenu("+pMatchid+")' onmouseout='CloseStreamingMenu("+pMatchid+")'><img border='0' src='" + fFrame.imgServerURL + "template/public/images/tv.gif' /><div id=\"tv"+pMatchid+"\" style=\"display:none; position:absolute; \"></div></span></div>";
    //else
    if (fFrame.SiteId=="4200800") {
      return "<a href='javascript:openSingleStreaming(" + pMatchid + ",0);'><img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/tv_L.gif' /></a>";
    } else {
      return "<a href='javascript:openSingleStreaming(" + pMatchid + ",0);'><img border='0' hspace='1' src='" + fFrame.imgServerURL + "template/public/images/tv.gif' /></a>";    
    }
      
  } else {    
    if (fFrame.SiteId=="4200800") {
      return "<img border='0' hspace='1' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/tv_g.gif' />";
    }else if (fFrame.SiteId == "4200100") {//only shows tv icon
      return "<img border='0' hspace='1' src='" + fFrame.imgServerURL + "template/public/images/tv_g.gif' />";
    } else if (fFrame.IsLogin) {
      return "<img border='0' hspace='1' src='" + fFrame.imgServerURL + "template/public/images/tv_g.gif' />";
    }  
  }
}


function OpenStreamingMenu(pMatchid) {
    if (document.getElementById("tv"+pMatchid).innerHTML=="")
    {
        document.getElementById("tv"+pMatchid).innerHTML = getStreamingMenuHtml(pMatchid);
    }
    document.getElementById("tv"+pMatchid).style.display = "block";
}
function CloseStreamingMenu(pMatchid) {
    var obj=document.getElementById("cm-nav");
    if (obj != null)
    {
        var obj1=document.getElementById("tv"+pMatchid);
        if (obj1 != null)
        {
            obj1.style.display = "none";
        }
    }
}
function getStreamingMenuHtml(pMatchid) {
    var obj=document.getElementById("cm-nav");
    if (obj != null)
    {
        var mHtml = obj.innerHTML;
        mHtml = mHtml.replace(/#L/,"javascript:openSingleStreaming(" + pMatchid + ",0);");
        mHtml = mHtml.replace(/#S/,"javascript:openSingleStreaming(" + pMatchid + ",1);");
        return mHtml;
    }
    else
    {
        return "";
    }
}
function getBingoStreamingHtml() {
  if (fFrame.SiteId=="4200800") {
    return "<a id='bTV' href='javascript:openBingoStreaming();'><img border='0' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/tv_L.gif' hspace='1' /></a>";
  } 
  else if(fFrame.IsCssControl){
    return "<a id='bTV' href='javascript:openBingoStreaming();'><img border='0' src='" + fFrame.imgServerURL + fFrame.SkinRootPath + "public/images/layout/icon_tv.gif' /></a>"
  }  
  else {
    return "<a id='bTV' href='javascript:openBingoStreaming();'><img border='0' src='" + fFrame.imgServerURL + "template/public/images/tv.gif' /></a>";
  }  
}
function ReflashSingleStreaming() {
    if (fFrame.leftFrame!=null) {
        var obj1 = fFrame.leftFrame.document.getElementById("iTV");
        var url = obj1.src;
        obj1.src = "";
        obj1.src = url;
    }
}
function SwitchSingleStreaming() {
    if (fFrame.leftFrame!=null) {
        var obj1 = fFrame.leftFrame.document.getElementById("iTV");
        var Matchid = obj1.src;
        Matchid = Matchid.substr(Matchid.indexOf("StreamingLV.aspx"));
        Matchid = Matchid.replace("StreamingLV.aspx?Matchid=","");
        Matchid = Matchid.replace("&TVmode=small","");
        CloseTVBox();
        openSingleStreaming(Matchid,0);
    }
}

var SingleTV_ButtonPush = false;

function SingleTV_ButtonTimmerCheck()
{
    if(SingleTV_ButtonPush == false)
    {
        SingleTV_ButtonPush = true;
        setTimeout(function () {if(SingleTV_ButtonPush == true){SingleTV_ButtonPush = false};}, 5000);
	    return true;
    }    
    else
    {
        return false;
    }    
}

function openSingleStreaming(pMatchid,TVMode) {

    if(!SingleTV_ButtonTimmerCheck())
    {
      return;
    }
  
    //TVMode 0:Default(Single) 1:small 2:mini
    CloseStreamingMenu(pMatchid);
    switch (TVMode) {
        case 0:
            CloseTVBox();
            if (fFrame.StreamingFrame == null || fFrame.StreamingFrame.closed) {
              fFrame.StreamingFrame = fFrame.window.open("StreamingFrame.aspx?Matchid=" + pMatchid, "StreamingFrame", "top=20,left=20,height=520,width=525,status=no,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no");
          }
          else {
              fFrame.StreamingFrame.SetLoadVideoLocation(pMatchid,'1',0);
          }
            fFrame.StreamingFrame.focus();
          break;
        case 1:
            if (fFrame.StreamingFrame != null && !fFrame.StreamingFrame.closed)
          {
              fFrame.StreamingFrame.CloseWindow();
          }
            CloseTVBox();
            if (fFrame.topFrame.document.getElementById("showhideleft").className=="show_left") {
                fFrame.topFrame.SwitchShowHidLeft();
                fFrame.topFrame.SwitchLefthideshow();
            }
            if (fFrame.leftFrame!=null) {
                var obj1=fFrame.leftFrame.document.getElementById("iTV");
                obj1.src="StreamingLV.aspx?Matchid=" + pMatchid+"&TVmode=small";
            }
            break;
        case 2:
            break;
    }
}

var BingoTV_ButtonPush = false;

function BingoTV_ButtonTimmerCheck()
{
    if(BingoTV_ButtonPush == false)
    {
        BingoTV_ButtonPush = true;
        setTimeout(function () {if(BingoTV_ButtonPush == true){BingoTV_ButtonPush = false};}, 5000);
	    return true;
    }    
    else
    {
        return false;
    }    
}

function openBingoStreaming() {
    CloseTVBox();    
    
    if(!BingoTV_ButtonTimmerCheck())
    {
      return;
    }
          
    if (fFrame.StreamingFrame == null || fFrame.StreamingFrame.closed)
    {
      fFrame.StreamingFrame = fFrame.window.open("StreamingFrame.aspx?Matchid=9999&StreamingSrc=5", "StreamingFrame", "top=20,left=20,height=520,width=525,status=no,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no"); 
      fFrame.StreamingFrame.isHorseStreaming=false;
      fFrame.StreamingFrame.ScheduleType="161"; 
      
    }
    else
    {
      fFrame.StreamingFrame.isHorseStreaming=false;
      fFrame.StreamingFrame.ScheduleType="161";  
      fFrame.StreamingFrame.ShowNumberGameSchule();
      fFrame.StreamingFrame.swapBingoStreaming();       
    }    
    fFrame.StreamingFrame.focus();    
}
function CloseTVBox() {
    if(fFrame == null)
        return;
        
    if (fFrame.leftFrame!=null) {
        var obj1=fFrame.leftFrame.document.getElementById("iTV");
        if (obj1 != null) {
            obj1.src="";
        }
        var obj2=fFrame.leftFrame.document.getElementById("TVBox");
        if (obj2 != null) {
            obj2.style.display="none";
        }
        var obj3=fFrame.leftFrame.document.getElementById("div_Casino");
        if (obj3 != null) {
            obj3.style.display="";
        }
    }
}
//OddsUtils.js END
//common.js START

var hTVHead_ButtonPush = false;

function hTVHead_ButtonTimmerCheck()
{
    if(hTVHead_ButtonPush == false)
    {
        hTVHead_ButtonPush = true;
        setTimeout(function () {if(hTVHead_ButtonPush == true){hTVHead_ButtonPush = false};}, 5000);
	    return true;
    }    
    else
    {
        return false;
    }    
}
function openStreaming(pStreamingId) {
    /*if (window.top.StreamingFrame != null) {
    window.top.StreamingFrame.close();
  }
    if (pStreamingId != null) {
    window.top.StreamingFrame = window.top.window.open("StreamingFrame.aspx?StreamingId=" + pStreamingId, "StreamingFrame", "top=200,left=300,height=520,width=525,status=no,toolbar=no,menubar=no,resizable=yes,location=no");
  } else {
    window.top.StreamingFrame = window.top.window.open("StreamingFrame.aspx", "StreamingFrame", "top=200,left=300,height=630,width=800,status=no,toolbar=no,menubar=no,resizable=yes,location=no");
  }*/
  CloseTVBox();
  
  if(!hTVHead_ButtonTimmerCheck())
  {
     return;
  }
     
  if (fFrame.StreamingFrame == null || fFrame.StreamingFrame.closed)
  {
      fFrame.StreamingFrame = fFrame.window.open("StreamingFrame.aspx", "StreamingFrame", "top=20,left=20,height=612,width=818,status=no,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no");
  }
  else
  {
      fFrame.StreamingFrame.location.href="StreamingFrame.aspx";
      if (fFrame.StreamingFrame.document.getElementById('containerhead') != null)
      {   
          if(fFrame.StreamingFrame.document.getElementById('containerhead').style.display == "none")
          {
              fFrame.StreamingFrame.StandalonePlayer();
          }
      }
      if(userBrowser()=="Chrome")
          fFrame.StreamingFrame.blur();
      else
          fFrame.StreamingFrame.focus();
      
  }
  fFrame.StreamingFrame.focus();
  
}
//common.js END
//menu.js START
function CloseHorseInfoPopWindow()
{
    try{
        if (HorseInfoPopWindow != null && HorseInfoPopWindow.open){ 
            HorseInfoPopWindow.close();
            HorseInfoPopWindow=null;
        }
        
      if (fFrame.StreamingFrame != null || fFrame.StreamingFrame.open){
            fFrame.StreamingFrame.close();
            fFrame.StreamingFrame=null;
        }
    } catch(e) {
    }
}

var hTVBingo_ButtonPush = false;

function hTVBingo_ButtonTimmerCheck()
{
    if(hTVBingo_ButtonPush == false)
    {
        hTVBingo_ButtonPush = true;
        setTimeout(function () {if(hTVBingo_ButtonPush == true){hTVBingo_ButtonPush = false};}, 5000);
	    return true;
    }    
    else
    {
        return false;
    }    
}

function OpenNumberGameStreaming()
{
  CloseTVBox();
      
  if(!hTVBingo_ButtonTimmerCheck())
  {
     return;
  }
  
  if (fFrame.StreamingFrame == null || fFrame.StreamingFrame.closed)
  {
    fFrame.StreamingFrame = fFrame.window.open("StreamingFrame.aspx?Matchid=9999&StreamingSrc=5", "StreamingFrame", "top=20,left=20,height=520,width=525,status=no,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no");
  }
  else
  {
    fFrame.StreamingFrame.swapBingoStreaming();
  }
  fFrame.StreamingFrame.focus();
    
}

//menu.js END
var GreyTV_ButtonPush = false;

function GreyTV_ButtonTimmerCheck()
{
    if(GreyTV_ButtonPush == false)
    {
        GreyTV_ButtonPush = true;
        setTimeout(function () {if(GreyTV_ButtonPush == true){GreyTV_ButtonPush = false};}, 5000);
	    return true;
    }    
    else
    {
        return false;
    }    
}

function OpenGreyhoundsStreaming()
{
  CloseTVBox();
     
  if(!GreyTV_ButtonTimmerCheck())
  {
    return;
  }

  fFrame = getParent(window);
  var obj = document.getElementById("HorseChannelID");
	if (obj != null)
	{	
	   if (obj.value == "5")
	   {
	        openRacingStreaming("152");
	   }
	   else
	   {
	        if (fFrame.StreamingFrame != null && !fFrame.StreamingFrame.closed)
            {   
                switchGreyhoundsStreaming();
            }
            else
            { 
    	        fFrame.StreamingFrame = fFrame.window.open("StreamingFrame.aspx", "StreamingFrame", "top=20,left=20,height=680,width=810,status=no,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no");
    	        setTimeout("fFrame.StreamingFrame.ShowGreyhoundsContainer()",1000);
    	        setTimeout("switchGreyhoundsStreaming()",1500);
            }    
	   }
	}
   fFrame.StreamingFrame.focus();	
}

function EuroOpenRacingStreaming(RacingType)
{
       var StreamingSrc ="3";
       var obj = document.getElementById("HorseChannelID");
       var HorseChannelID = obj.value;
   
	   if (window.top.StreamingFrame == null || window.top.StreamingFrame.closed)
	   {	        
	       window.top.StreamingFrame = window.top.window.open("../StreamingFrame.aspx?Matchid=9999&StreamingSrc=" + StreamingSrc +"&RacingType=" + RacingType + "&HorseChannelID="+HorseChannelID, "StreamingFrame", "top=20,left=20,height=520,width=525,status=no,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no");
	       window.top.StreamingFrame.isHorseStreaming=true;
	       window.top.StreamingFrame.ScheduleType=RacingType; 
	    }
	    else
	    {
	        window.top.StreamingFrame.isHorseStreaming=true; 
	        window.top.StreamingFrame.ScheduleType=RacingType;
	        window.top.StreamingFrame.swapHorseStreaming(HorseChannelID);	       
	    }	    
}

var HarnTV_ButtonPush = false;

function HarnTV_ButtonTimmerCheck()
{
    if(HarnTV_ButtonPush == false)
    {
        HarnTV_ButtonPush = true;
        setTimeout(function () {if(HarnTV_ButtonPush == true){HarnTV_ButtonPush = false};}, 5000);
	    return true;
    }    
    else
    {
        return false;
    }    
}

function OpenHarnessStreaming()
{
    CloseTVBox();
    
    if(!HarnTV_ButtonTimmerCheck())
    {
      return;
    }
  
	openRacingStreaming("153");
	fFrame.StreamingFrame.focus(); 
}

function openRacingStreaming(RacingType)
{
       var StreamingSrc ="3";
       var obj = document.getElementById("HorseChannelID");
       var HorseChannelID = obj.value;
       fFrame = getParent(window);
	   if (fFrame.StreamingFrame == null || fFrame.StreamingFrame.closed)
	   {	        
	       fFrame.StreamingFrame = fFrame.window.open("StreamingFrame.aspx?Matchid=9999&StreamingSrc=" + StreamingSrc +"&RacingType=" + RacingType + "&HorseChannelID="+HorseChannelID, "StreamingFrame", "top=20,left=20,height=520,width=525,status=no,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no");
	       fFrame.StreamingFrame.isHorseStreaming=true;
	       fFrame.StreamingFrame.ScheduleType=RacingType; 
	    }
	    else
	    {
	        fFrame.StreamingFrame.isHorseStreaming=true; 
	        fFrame.StreamingFrame.ScheduleType=RacingType;
	        fFrame.StreamingFrame.swapHorseStreaming(HorseChannelID);	       
	    }	    
}

function EuroSwitchGreyhoundsStreaming()
{
  bStandalonePlayer = false;
  window.top.StreamingFrame.document.getElementById('containerhead').style.display = "block";
  window.top.StreamingFrame.document.getElementById('containerhead').style.visibility = "visible";
  window.top.StreamingFrame.document.getElementById('containerleft').style.display = "block";
  window.top.StreamingFrame.document.getElementById('containerleft').style.visibility = "visible";
  window.top.StreamingFrame.document.getElementById('footer').style.display = "block";
  window.top.StreamingFrame.document.getElementById('footer').style.visibility = "visible";
  
  // Change the image in the control
  if(window.top.StreamingFrame.document.getElementById('minimgdiv') != null){
      window.top.StreamingFrame.document.getElementById('minimgdiv').style.display = "block";
      window.top.StreamingFrame.document.getElementById('minimgdiv').style.visibility = "visible";  
      window.top.StreamingFrame.document.getElementById('mintxtdiv').style.display = "block";
      window.top.StreamingFrame.document.getElementById('mintxtdiv').style.visibility = "visible";
  }
  if(window.top.StreamingFrame.document.getElementById('maximgdiv') != null){
      window.top.StreamingFrame.document.getElementById('maximgdiv').style.display = "none";
      window.top.StreamingFrame.document.getElementById('maximgdiv').style.visibility = "hidden";
      window.top.StreamingFrame.document.getElementById('maxtxtdiv').style.display = "none";
      window.top.StreamingFrame.document.getElementById('maxtxtdiv').style.visibility = "hidden";
  }
  window.top.StreamingFrame.window.resizeTo(820,760)
  window.top.StreamingFrame.window.outerWidth=820;
  window.top.StreamingFrame.window.outerHeight=760;
  window.top.StreamingFrame.document.getElementById('containerMain').style.width = "100%";
  window.top.StreamingFrame.document.getElementById('containerMain').style.height = "100%";
  window.top.StreamingFrame.isHorseStreaming=false;
  window.top.StreamingFrame.ShowGreyhoundsContainer();
  //get current meeting name
  var stadium="";
  var obj =document.getElementById("Stadium");
  var orgSrc ="";
  if (obj != null)
  {
    stadium = obj.value;  
  }
  orgSrc = window.top.StreamingFrame.document.getElementById("fgreyhounds").src;
  window.top.StreamingFrame.document.getElementById("fgreyhounds").src=orgSrc + "&stadium=" + stadium;
}

function switchGreyhoundsStreaming()
{
  bStandalonePlayer = false;
  fFrame.StreamingFrame.document.getElementById('containerhead').style.display = "block";
  fFrame.StreamingFrame.document.getElementById('containerhead').style.visibility = "visible";
  fFrame.StreamingFrame.document.getElementById('containerleft').style.display = "block";
  fFrame.StreamingFrame.document.getElementById('containerleft').style.visibility = "visible";
  fFrame.StreamingFrame.document.getElementById('footer').style.display = "block";
  fFrame.StreamingFrame.document.getElementById('footer').style.visibility = "visible";
  
  // Change the image in the control
  if(fFrame.StreamingFrame.document.getElementById('minimgdiv') != null)
  {
      fFrame.StreamingFrame.document.getElementById('minimgdiv').style.display = "block";
      fFrame.StreamingFrame.document.getElementById('minimgdiv').style.visibility = "visible";      
      fFrame.StreamingFrame.document.getElementById('mintxtdiv').style.display = "block";
      fFrame.StreamingFrame.document.getElementById('mintxtdiv').style.visibility = "visible";      
  }
  if(fFrame.StreamingFrame.document.getElementById('maxtxtdiv') != null)
  {
      fFrame.StreamingFrame.document.getElementById('maximgdiv').style.display = "none";
      fFrame.StreamingFrame.document.getElementById('maximgdiv').style.visibility = "hidden";
      fFrame.StreamingFrame.document.getElementById('maxtxtdiv').style.display = "none";
      fFrame.StreamingFrame.document.getElementById('maxtxtdiv').style.visibility = "hidden";
  }
  fFrame.StreamingFrame.window.resizeTo(820,760)
  fFrame.StreamingFrame.window.outerWidth=820;
  fFrame.StreamingFrame.window.outerHeight=760;
  fFrame.StreamingFrame.document.getElementById('containerMain').style.width = "100%";
  fFrame.StreamingFrame.document.getElementById('containerMain').style.height = "100%";
  fFrame.StreamingFrame.isHorseStreaming=false;
  //fFrame.StreamingFrame.CurrentHorseChannelID="6";
  fFrame.StreamingFrame.ShowGreyhoundsContainer();
//  //get current meeting name
//  //var stadium="";
//  var obj =document.getElementById("Stadium");
//  var orgSrc ="";
//  if (obj != null)
//  {
//    stadium = obj.value;  
//  }
//  orgSrc = fFrame.StreamingFrame.document.getElementById("fgreyhounds").src;
//  fFrame.StreamingFrame.document.getElementById("fgreyhounds").src=orgSrc + "&stadium=" + stadium;
}

// open streaming window
function serviceOpenStreaming() {

	if (window.top.StreamingFrame == null || window.top.StreamingFrame.closed)
	{
	    window.top.StreamingFrame = window.top.window.open("../StreamingFrame.aspx", "StreamingFrame", "top=200,left=300,height=630,width=800,status=no,toolbar=no,menubar=no,resizable=yes,location=no");
	}
	else
	{
	    if(window.top.StreamingFrame.height == 630)
	    {
	        window.top.StreamingFrame.Resize(false);
	        window.top.StreamingFrame.focus();
	    }
	    else
	    {
	        window.top.StreamingFrame.close();
	        window.top.StreamingFrame = window.top.window.open("../StreamingFrame.aspx", "StreamingFrame", "top=200,left=300,height=630,width=800,status=no,toolbar=no,menubar=no,resizable=yes,location=no");
	    }
	}
}

function openGreyhoundUKStreamingBySchedule()
{
    fFrame = getParent(window);
  
	if (fFrame.StreamingFrame != null && !fFrame.StreamingFrame.closed)
    {   
        switchGreyhoundsStreaming();
    }
    else
    { 
        fFrame.StreamingFrame = fFrame.window.open("StreamingFrame.aspx", "StreamingFrame", "top=20,left=20,height=680,width=810,status=no,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no");
        setTimeout("fFrame.StreamingFrame.ShowGreyhoundsContainer()",1000);
        setTimeout("switchGreyhoundsStreaming()",1500);
    }   
    fFrame.StreamingFrame.focus();	
}