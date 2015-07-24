var Parallaxer = function(game) {
    var self = this;
    var renderer  = game.c.renderer;
    
    var view = {
        x  : renderer.getViewCenter().x, 
        y  : renderer.getViewCenter().y 
    }

    this.extend = function(obj, settings) {
        var defaults = {
            delta: { x: 0, y: 0 },
        }

        // override defaults with settings obj
        for (prop in defaults) {
            obj[prop] = settings[prop] !== undefined ? settings[prop] : defaults[prop]; 
        }

        // wrap the object's update method to
        // support parallax motion
        var update = obj.update !== undefined ? obj.update.bind(obj) : function(){}; 
        obj.update = function(delta) {
            update(delta);

            var change = self.getViewDelta();
            obj.center.x += change.x * obj.delta.x;
            obj.center.y += change.y * obj.delta.y;
        }

        return this;
    }

    this.getViewDelta = function() {

        var recent = renderer.getViewCenter();
        var change = { x : recent.x - view.x
                     , y : recent.y - view.y }

        // update old
        view.x = recent.x;
        view.y = recent.y;

        return change;

    };
}
