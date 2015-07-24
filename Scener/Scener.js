;(function(exports) {

    var Scene = function(game, json) {
        var self = this;

        var doNothing = function() {};
        var getTrue = function() { return true; };

        ["init", "active", "update", "exit"].forEach(function(fun) {
            if (json[fun] !== undefined) {
                self[fun] = json[fun].bind(json);
            } else if (fun === "active") {
                self[fun] = getTrue;
            } else {
                self[fun] = doNothing;
            }
        });
    };


    var Scener = function(game, arr) {
        var scenes, paused, cur, json, len, i;
        paused = false;
        scenes = {};

        // construct from json obj
        len = arr.length;
        for (i = 0; i < len; i++) {
            json = arr[i];
            scenes[json.name] = new Scene(game, json);
        };

        this.start = function(name) {
            cur = scenes[name];
            cur.init();
        };

        this.update = function(delta) {
            if (!paused) {
                if (cur.active()){
                    cur.update(delta);
                } else {
                    cur.exit();
                }
            } 
        };

        this.pause = function() {
            paused = true;
        };

        this.unPause = function() {
            paused = false;
        };

        this.isPaused = function() {
            return paused;
        }
    }

    exports.Scener = Scener;

})(this);
