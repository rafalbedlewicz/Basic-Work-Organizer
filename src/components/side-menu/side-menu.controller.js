export default class SideMenuController {
   /* @ngInject */
   constructor() {
             this.opened = false;
   }   
   openClose() {

    if (this.opened === false) {
    document.getElementById("side-menu").style.width = "200px";
    document.getElementById("button").style.marginLeft = "200px";
    document.getElementsByTagName("h2")[0].style.transform = "rotate(180deg)";
    document.getElementsByTagName("h2")[1].style.transform = "rotate(180deg)";
    this.opened = true;
    }
    
    else {
    document.getElementById("side-menu").style.width = "0";
    document.getElementById("button").style.marginLeft = "0"; 
    document.getElementsByTagName("h2")[0].style.transform = "rotate(360deg)";
    document.getElementsByTagName("h2")[1].style.transform = "rotate(360deg)";
    this.opened = false;
    }
}
}

