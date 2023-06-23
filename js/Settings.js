////////////////////////////////////////////////////////////////////////////////
//
//  Lights Out Settings
//
////////////////////////////////////////////////////////////////////////////////

var buttonSize = 22;
var currentLayout = 0;
var padding = 2;
////////////////////////////////////////////////////////////////////////////////
//
// Load settings
//
////////////////////////////////////////////////////////////////////////////////
function loadSettings()
{    
    System.Gadget.onSettingsClosing = settingsClosing;

    if (System.Gadget.Settings.read("SettingExist") == true) 
    {
        var index = System.Gadget.Settings.read("currentPuzzle");

	  InitializeLayout(index);

        ShowCurrent();
    }

    self.focus;
    document.body.focus();
}
////////////////////////////////////////////////////////////////////////////////
//
// Settings page closing handler
//
////////////////////////////////////////////////////////////////////////////////
function settingsClosing(event)
{
    if (event.closeAction == event.Action.commit)
    {
	  //System.Gadget.Settings.write("currentPuzzle", currentLayout);
        //System.Gadget.Settings.write("SettingExist", true);
	  SetCurrentLevel(currentLayout);
    }
    
    event.cancel = false;
}
////////////////////////////////////////////////////////////////////////////////
//
// Load main gadget function
//
////////////////////////////////////////////////////////////////////////////////
function LoadLights()
{  
    RegisterEvents();

    // Create the game grid
    for(var y = 1; y <= 5; y++)
    {
        for(var x = 1; x <= 5; x++)
        {
            var buttonTop = (y * buttonSize) -  buttonSize + (y * padding);
            var buttonLeft = (x * buttonSize) -  buttonSize + (x * padding);
		
		var button =  "<div id='button"+y+x+"' " +
                "style='position: absolute; width: "+buttonSize+"; height: "+buttonSize+"; left: "+buttonLeft+
                "; top: "+buttonTop+"; );'><img id='image"+y+x+"' src=" + images[OFF_IMAGE].src + 
                " style='width: "+buttonSize+"; height: "+buttonSize+";' ></div>";
	
            game.insertAdjacentHTML("beforeEnd", button);
        }
    }

     for(var i = 0; i <= 6; i++) 
    { 
        gameRowMask[i] = 0;
    }
    
    Show();
    mask = bitMask[6] - 2;

    // Default to the first layout
    InitializeLayout(0);

    LoadList(); 

}
////////////////////////////////////////////////////////////////////////////////
//
// Reset the game to a new level/layout
//
////////////////////////////////////////////////////////////////////////////////
function InitializeLayout(index)
{
    currentLayout = index;
    
    for(var i = 1; i <= gridSize ; i++)
    {
        gameRowMask[i] = layout[index][i - 1];
    }

    Show();
}
////////////////////////////////////////////////////////////////////////////////
//
// Draw the playing field
//
////////////////////////////////////////////////////////////////////////////////
function Show()
{
    for(var y = 1; y <= 5; y++) 
    {
        var maskValue = 2;
        
        for(var x = 1; x <= 5; x++) 
        {
            imageIndex = OFF_IMAGE;
          
            if(gameRowMask[y] & maskValue) // Bitwise comparision for the value at position i
            { 
                imageIndex = ON_IMAGE; //Highlighted on image
            }
           
            SetImage(y, x, images[imageIndex].src);
            
            // Augment maskValue to the next bit mask value
            maskValue += maskValue;
        }
    }
}
////////////////////////////////////////////////////////////////////////////////
//
// Show the current layout text, "Puzzle x of n"
//
////////////////////////////////////////////////////////////////////////////////
function ShowCurrent()
{
    if(layoutOf)
    {
        layoutOf.innerText = "Puzzle " + (currentLayout + 1) + " of " + layout.length;
    }

    if(puzzleList)
    {
	  puzzleList.selectedIndex = currentLayout;
    }
}
////////////////////////////////////////////////////////////////////////////////
//
// Load a drop down list with all possible layouts
//
////////////////////////////////////////////////////////////////////////////////
function LoadList()
{
    var list = "<select id='puzzleList' onChange='InitializeLayout(this.selectedIndex); ShowCurrent();' >"; //onChange='InitializeLayout(this.selectedIndex); return false;'

    for(var i = 0; i < layout.length; i++)
    {
        list = list + "<option>Puzzle " + (i+1) + "</option>";
    }

    list = list + "</select>";

    puzzleListSpan.insertAdjacentHTML("beforeEnd", list);
}
