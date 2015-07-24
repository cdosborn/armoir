/* 
  TODO: Draw mutliple lines
      : 

   var box = game.c.entities.create(DialogBox, {
        text:"",
        style,
        size,
        center,
        z
    });
*/
var DialogBox = function(game, settings) {
    var center, ctx, r;
    r = game.c.renderer;
    center = r.getViewCenter();
    size = r.getViewSize();
    ctx = r.getCtx();

    var defaults = {
        text      : "",
        center    : { x: center.x, y: center.y },
        size      : { x: size.x,   y: size.y },
        fontfamily: "terminus",
        fontcolor : "#FFF",
        fontsize  : 12,
        border    : { x: 2, y: 2 },
        bgcolor   : "#000",
    }

    // override defaults with settings obj
    for (prop in defaults) {
        this[prop] = settings[prop] !== undefined ? settings[prop] : defaults[prop]; 
    }
}

DialogBox.prototype = {
    draw: function(ctx) {
        ctx.save();
        ctx.fillStyle = this.bgcolor;
        ctx.fillRect(this.center.x - this.size.x/2
                   , this.center.y - this.size.y/2
                   , this.size.x
                   , this.size.y);
        ctx.fillStyle = this.fontcolor;
        ctx.font = this.fontsize + "px " + this.fontfamily;
        ctx.fillText(this.text, 
                     this.center.x - this.size.x/2 + this.border.x, 
                     this.center.y - this.size.y/2 + this.fontsize + this.border.y);
        ctx.restore();
    }
}
/* 
trimToText: function(ctx) {
    var oldsize, newsize;
    oldsize = this.size.x;
    newsize = ctx.measureText(this.text) + 2*this.border.x;
    this.center.x += (newsize - oldsize) / 2;
    this.size.x = newsize;
}
*/
