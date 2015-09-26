;$(function(){
// New Drawers are created by passing:
// target - (string) target selector
// attachment - (string) an attachment direction
// openStart - (boolean) wether to close the drawer initially
// buttons - (array) list of buttons to activate drawer
function DirtyDrawer(target,attachment,openStart,buttons){
    this.targetObject = target;
    this.attachment = attachment;
    this.isVertical = attachment=='top'||attachment=='bottom';
    this.isShowing = openStart;
    this.buttons = buttons;
    this.init();
}
DirtyDrawer.prototype.init = function(){
    this.delegateButtons(this.buttons);
    if(!this.isShowing) {
        var t = $(this.targetObject);
        t.addClass("dirty-placement");
        this.slideClose();
        t[0].offsetHeight;
        t.removeClass("dirty-placement");
    }
};
// Delegate a list of button objects
DirtyDrawer.prototype.delegateButtons = function(btns) {
    if(!btns) return false;
    for(var i in btns) {
        this.delegateButton(btns[i]);
    }
};
// Delegate a button object
// Expected options: 
// delegatee - (string) selector for delegatee object
// func - (string) name of DirtyDrawer function to call on click
// optional values:
// delegator - (string) selector for delegator object
// mod - (various) modification value for certain DirtyDrawer functions
// event - (string) event on the button that will activate the drawer
DirtyDrawer.prototype.delegateButton = function(button) {
    var drawer = this;
    $(button.delegator || "body").on((button.event || "click"), button.delegatee, function(){
        drawer.isShowing = drawer["slide"+button.func](button.mod);
    });
};
DirtyDrawer.prototype.slideToggle = function(){
    return this.isShowing?this.slideClose():this.slideOpen();
};
DirtyDrawer.prototype.slideClose = function(){
    return this.slide(this.slideDistance()+"px");
};
DirtyDrawer.prototype.slideOpen = function(){
    return this.slide(0);
};
DirtyDrawer.prototype.slidePercentage = function(mod){
    return this.slide((mod*this.slideDistance())+"px");
};
DirtyDrawer.prototype.slideOffset = function(mod){
    return this.slide((mod+this.slideDistance())+"px");
};
DirtyDrawer.prototype.slideFunction = function(mod){
    return this.slide(mod());
};
DirtyDrawer.prototype.slide = function(amt){
    var transform = this.isVertical ? "translateY("+amt+")" : "translateX("+amt+")";
    targetObject.css({
        "-webkit-transform":transform,
        "-ms-transform":transform,
        "transform":transform
    });
    return amt===0?true:false;
};
DirtyDrawer.prototype.slideDistance = function(){
    switch(this.attachment) {
        case "top":
            return -$(this.targetObject).height();
        case "bottom":
            return $(this.targetObject).height();
        case "left":
            return -$(this.targetObject).width();
        case "right":
            return $(this.targetObject).width();
    }
};
window.DirtyDrawer = DirtyDrawer;
$("body").append("<style>.dirty-placement{transition:none !important;}</style>");
});
