var App = {

/*
   default settings
*/
buyCommission: 0,
sellCommission: 0,
multiplier: 0,
otherFees: 0,

/*
Persistence. Extracted from W3 Schools (https://www.w3schools.com/js/js_cookies.asp)
*/
    setCookie: function(cname, cvalue, exdays){
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=./";
    },

    getCookie: function(cname) {

        let name = cname + "=";
        let ca = document.cookie.split(';');
    
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    
    checkCookie: function(cookieName) {

        // modified to return a boolean.
        let currentSettings = this.getCookie(cookieName);
        if (currentSettings != "" || currentSettings != " ") {
            return true;
        } else {
            return false;
        }
    },



/*
 Perform calculation
*/
    calculateSellPrice: function (quantity, buyPrice) {

        this.loadDefaults();

        var sellPrice = 0.00;

        if (buyPrice == null || buyPrice == '' || isNaN(buyPrice)) {
            buyPrice = 0.00;
        }

        sellPrice = (buyPrice * multiplier) + buyCommission + sellCommission;
        sellPrice = parseFloat(sellPrice);

        if (isNaN(sellPrice)) { sellPrice = 0.00; }

        return sellPrice;
    },

    loadDefaults: function (){

                var settingsString = this.getCookie("settings");
                console.log(settingsString);
                if(settingsString != "" || settingsString != " "){
                    var settings = JSON.parse(settingsString);
                    buyCommission = settings.buycommission;
                    sellCommission = settings.sellcommission;
                    multiplier = settings.multiplier;
                    otherFees = settings.otherfees;
                }
    }
};