var Paint = {
    canvas   : null,
    context  : null,
    preview  : null,
    previewContext : null,
    paintX    : [],
    paintY    : [],
    drawDrag : [],
    drawColor: [],
    isDraw   : false,
    selectedColorValue : "#000000",
    colors : {
        "Black"     : "#000000",
        "Red"       : "#ff0000",
        "Blue"      : "#0000ff",
        "Yellow"    : "#ffff00"
    },

    initialize : function() {
        var self = this;
        var offset = $("#canvas").offset();
        this.canvas = $("#canvas")[0];
        this.context = this.canvas.getContext("2d");
        
        $("#canvas").mousedown(function(event) {
            self.isDraw = true;
            self.appendTrace(event.pageX - offset.left, event.pageY - offset.top);
            self.paintTrace();
        });
        
        $("#canvas").mousemove(function(event) {
            if(self.isDraw) {
                self.appendTrace(event.pageX - offset.left, event.pageY - offset.top, true);
                self.paintTrace();
            }
        });
        
        $("#canvas").bind("mouseup mouseleave", function(event) {
            self.isDraw = false;
        });
        
        this.setColors();
        this.setResetButton();
    },

    appendTrace : function(x, y, painting) {
        this.paintX.push(x);
        this.paintY.push(y);
        this.drawDrag.push(painting);
        this.drawColor.push(this.selectedColorValue || this.colors[0]);
    },

    paintTrace : function() {
        this.context.lineJoin = "round";
        this.context.lineWidth = 5;
        
        for(var i = 0; i < this.paintX.length; i ++) {
            this.context.beginPath();
            if(this.drawDrag[i] && i) {
                this.context.moveTo(this.paintX[i - 1], this.paintY[i - 1]);
            } else {
                this.context.moveTo(this.paintX[i] - 1, this.paintY[i]);
            }
            
            this.context.lineTo(this.paintX[i], this.paintY[i]);
            this.context.closePath();
            this.context.strokeStyle = this.drawColor[i];
            this.context.stroke();
        }
    },

    setPreview : function() {

    },

    setColors : function() {
        var self = this;
        var colorList = $("#colors");

        $.each(this.colors, function(name, value) {
            var option = "<option value=\"" + value + "\">" + name + "</option>";
            colorList.append(option);
        });

        $("#colors").on("change", function(event) {
            self.selectedColorValue = $(this).val();
        });
    },

    setResetButton : function() {
        var self = this;
        $("#reset").on("click", function(event) {
            self.canvas.width = self.canvas.width;
            self.paintX = [], self.paintY = [], self.drawDrag = [], self.drawColor = [];
        });
    }

};
