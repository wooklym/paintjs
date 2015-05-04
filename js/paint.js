var Paint = {
    canvas   : null,
    context  : null,
    preview  : null,
    previewContext : null,
    paintX    : [],
    paintY    : [],
    locationTrace : [],
    colorTrace: [],
    isPaint   : false,
    currentColorValue : "#000000",

    initialize : function() {
        var self = this;
        var offset = $("#canvas").offset();
        this.canvas = $("#canvas")[0];
        this.context = this.canvas.getContext("2d");
        
        $("#canvas").mousedown(function(event) {
            self.isPaint = true;
            self.appendTrace(event.pageX - offset.left, event.pageY - offset.top);
            self.paintTrace();
        });
        
        $("#canvas").mousemove(function(event) {
            if(self.isPaint) {
                self.appendTrace(event.pageX - offset.left, event.pageY - offset.top, true);
                self.paintTrace();
            }
        });
        
        $("#canvas").bind("mouseup mouseleave", function(event) {
            self.isPaint = false;
        });
        
        this.setColors();
        this.setResetButton();
    },

    appendTrace : function(x, y, painting) {
        this.paintX.push(x);
        this.paintY.push(y);
        this.locationTrace.push(painting);
        this.colorTrace.push(this.currentColorValue);
    },

    paintTrace : function() {
        this.context.lineJoin = "round";
        this.context.lineWidth = 5;
        
        for(var i = 0; i < this.paintX.length; i ++) {
            this.context.beginPath();
            if(this.locationTrace[i] && i) {
                this.context.moveTo(this.paintX[i - 1], this.paintY[i - 1]);
            } else {
                this.context.moveTo(this.paintX[i] - 1, this.paintY[i]);
            }
            
            this.context.lineTo(this.paintX[i], this.paintY[i]);
            this.context.closePath();
            this.context.strokeStyle = this.colorTrace[i];
            this.context.stroke();
        }
    },

    setPreview : function() {

    },

    setColors : function() {
        var self = this;
        $('#colorSelector').ColorPicker({
            color: '#000000',
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#colorSelector div').css('backgroundColor', '#' + hex);
                self.currentColorValue = '#' + hex;
            }
        });
    },

    setResetButton : function() {
        var self = this;
        $("#reset").on("click", function(event) {
            self.canvas.width = self.canvas.width;
            self.paintX = [], self.paintY = [], self.locationTrace = [], self.colorTrace = [];
        });
    }

};
