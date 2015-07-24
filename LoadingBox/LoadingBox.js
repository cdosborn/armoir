/* 

   var loadbox = new LoadingBox(game)

   loadbox.notify(10, 100);

*/
var LoadingBox = function(game, settings) {
    var viewSize = game.c.renderer.getViewSize();
    var viewCenter = game.c.renderer.getViewCenter();

    var border = (settings.border !== undefined) ? settings.border : 10;
    var height = (settings.height !== undefined) ? settings.height : 40;
    var fgColor = settings.fg || "#aaa";
    var bgColor = settings.bg || "#333";


    this.center = game.c.renderer.getViewCenter();
    this.size = { x:(.8 * viewSize.x) , y:height };

    var innerBox = {
        center: { x: this.center.x,
                  y: this.center.y },
        size: { x: 0
              , y: this.size.y - 2 * border }
    }



    this.notify = function(index, total) {
        var percent = index / total;
        innerBox.size.x = percent * (this.size.x - 2 * border);
        innerBox.center.x = this.center.x - this.size.x/2 + innerBox.size.x/2 + border;
        innerBox.center.y = this.center.y;
    };
    this.draw = function(ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(this.center.x - this.size.x/2
                   , this.center.y - this.size.y/2
                   , this.size.x
                   , this.size.y);

        ctx.fillStyle = fgColor;
        ctx.fillRect(innerBox.center.x - innerBox.size.x/2
                   , innerBox.center.y - innerBox.size.y/2
                   , innerBox.size.x
                   , innerBox.size.y);
    }; 
}
