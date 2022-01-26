let $a = document.querySelector("#a");
      let $b = document.getElementById("b");
      let $c = document.getElementById("c");
      let $d = document.querySelector("#a1");
      let $d1 = document.querySelector("#a2");
      let $d2 = document.querySelector("#a3");
      let $btn = document.getElementById("btn");
      let $type = document.getElementById("types");
      let $type1 = document.getElementById("types1");
      let $type2 = document.getElementById("types2");
      document.querySelector("#a2").style.display = "none";
      document.getElementById("b").style.display = "none";
      document.getElementById("types2").style.display = "none";
      document.querySelector(".span0").style.display = "none";
      let board = document.querySelector("#paint-canvas");
      let canva = document.querySelector("#myCanvas");
      canva.width = document.querySelector(".graphic").offsetWidth;
      canva.height = document.querySelector(".graphic").offsetHeight;
      document.getElementById("types1").onchange = (e) => {
        if ($type1.value === "1") {
          document.querySelector("#a2").style.display = "none";
          document.getElementById("b").style.display = "none";
          document.getElementById("types2").style.display = "none";
          document.querySelector(".span0").style.display = "none";
        } else if ($type1.value === "2") {
          document.querySelector("#a2").style.display = "flex";
          document.getElementById("b").style.display = "flex";
          document.getElementById("types2").style.display = "flex";
          document.querySelector(".span0").style.display = "flex";
          document.querySelector("#a2").required = true;
        }
      };
      let a = 0;
      let b = 0;
      let c = 0;
      document.querySelector("#a").onchange = (e) => {
        a = e.target.value;
        $d.value = e.target.value;
        rangenChange();
      };

      document.querySelector("#a1").onchange = (e) => {
        a = e.target.value;
        $a.value = e.target.value;
        rangenChange();
      };

      document.querySelector("#b").onchange = (e) => {
        b = e.target.value;
        $d1.value = e.target.value;
        rangenChange();
      };
      document.querySelector("#a2").onchange = (e) => {
        b = e.target.value;
        $b.value = e.target.value;
        rangenChange();
      };

      document.querySelector("#c").onchange = (e) => {
        c = e.target.value;
        $d2.value = e.target.value;
        rangenChange();
      };
      document.querySelector("#a3").onchange = (e) => {
        c = e.target.value;
        $c.value = e.target.value;
        rangenChange();
      };

      function Graph(config) {
        // user defined properties
        this.canvas = document.getElementById(config.canvasId);
        this.minX = config.minX;
        this.minY = config.minY;
        this.maxX = config.maxX;
        this.maxY = config.maxY;
        this.unitsPerTick = config.unitsPerTick;

        // constants
        this.axisColor = "#000";
        this.font = "10pt Calibri";
        this.tickSize = 20;

        // relationships
        this.context = this.canvas.getContext("2d");
        this.rangeX = this.maxX - this.minX;
        this.rangeY = this.maxY - this.minY;
        this.unitX = this.canvas.width / this.rangeX;
        this.unitY = this.canvas.height / this.rangeY;
        this.centerY = Math.round(
          Math.abs(this.minY / this.rangeY) * this.canvas.height
        );
        this.centerX = Math.round(
          Math.abs(this.minX / this.rangeX) * this.canvas.width
        );
        this.iteration = (this.maxX - this.minX) / 1000;
        this.scaleX = this.canvas.width / this.rangeX;
        this.scaleY = this.canvas.height / this.rangeY;

        // draw x and y axis
        this.drawXAxis();
        this.drawYAxis();
      }

      Graph.prototype.drawXAxis = function () {
        let context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(0, this.centerY);
        context.lineTo(this.canvas.width, this.centerY);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();

        // draw tick marks
        let xPosIncrement = this.unitsPerTick * this.unitX;
        let xPos, unit;
        context.font = this.font;
        context.textAlign = "center";
        context.textBaseline = "top";

        // draw left tick marks
        xPos = this.centerX - xPosIncrement;
        unit = -1 * this.unitsPerTick;
        while (xPos > 0) {
          context.moveTo(xPos, this.centerY - this.tickSize / 2);
          context.lineTo(xPos, this.centerY + this.tickSize / 2);
          context.stroke();
          context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
          unit -= this.unitsPerTick;
          xPos = Math.round(xPos - xPosIncrement);
        }

        // draw right tick marks
        xPos = this.centerX + xPosIncrement;
        unit = this.unitsPerTick;
        while (xPos < this.canvas.width) {
          context.moveTo(xPos, this.centerY - this.tickSize / 2);
          context.lineTo(xPos, this.centerY + this.tickSize / 2);
          context.stroke();
          context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
          unit += this.unitsPerTick;
          xPos = Math.round(xPos + xPosIncrement);
        }
        context.restore();
      };

      Graph.prototype.drawYAxis = function () {
        let context = this.context;
        context.save();
        context.beginPath();
        context.moveTo(this.centerX, 0);
        context.lineTo(this.centerX, this.canvas.height);
        context.strokeStyle = this.axisColor;
        context.lineWidth = 2;
        context.stroke();

        // draw tick marks
        let yPosIncrement = this.unitsPerTick * this.unitY;
        let yPos, unit;
        context.font = this.font;
        context.textAlign = "right";
        context.textBaseline = "middle";

        // draw top tick marks
        yPos = this.centerY - yPosIncrement;
        unit = this.unitsPerTick;
        while (yPos > 0) {
          context.moveTo(this.centerX - this.tickSize / 2, yPos);
          context.lineTo(this.centerX + this.tickSize / 2, yPos);
          context.stroke();
          context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
          unit += this.unitsPerTick;
          yPos = Math.round(yPos - yPosIncrement);
        }

        // draw bottom tick marks
        yPos = this.centerY + yPosIncrement;
        unit = -1 * this.unitsPerTick;
        while (yPos < this.canvas.height) {
          context.moveTo(this.centerX - this.tickSize / 2, yPos);
          context.lineTo(this.centerX + this.tickSize / 2, yPos);
          context.stroke();
          context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
          unit -= this.unitsPerTick;
          yPos = Math.round(yPos + yPosIncrement);
        }
        context.restore();
      };

      Graph.prototype.drawEquation = function (equation, color, thickness) {
        let context = this.context;
        context.save();
        context.save();
        this.transformContext();

        context.beginPath();
        context.moveTo(this.minX, equation(this.minX));

        for (
          let x = this.minX + this.iteration;
          x <= this.maxX;
          x += this.iteration
        ) {
          context.lineTo(x, equation(x));
        }

        context.restore();
        context.lineJoin = "round";
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.restore();
      };

      Graph.prototype.transformContext = function () {
        let context = this.context;

        // move context to center of canvas
        this.context.translate(this.centerX, this.centerY);
        // this.context.translate(105, 0);

        /*
         * stretch grid to fit the canvas window, and
         * invert the y scale so that that increments
         * as you move upwards
         */
        context.scale(this.scaleX, -this.scaleY);
      };

      const myGraph = new Graph({
        canvasId: "myCanvas",
        minX: -10,
        minY: -10,
        maxX: 10,
        maxY: 10,
        unitsPerTick: 1,
      });

      //zurj baigaa tegshitgeliin heseg
      const rangenChange = (value) => {
        const canva = document.getElementById("myCanvas");
        const context = canva.getContext("2d");
        context.clearRect(0, 0, canva.width, canva.height);
        myGraph.drawXAxis();
        myGraph.drawYAxis();
        //2 zereg.........
        if ($type1.value === "2") {
          if ($type.value === "x" && $type2.value === "x") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * x * x +
                  parseInt($d1.value) * x +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "sin" && $type2.value === "cos") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.sin(x) * Math.sin(x) +
                  parseInt($d1.value) * Math.cos(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "sin" && $type2.value === "sin") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.sin(x) * Math.sin(x) +
                  parseInt($d1.value) * Math.sin(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "sin" && $type2.value === "tan") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.sin(x) * Math.sin(x) +
                  parseInt($d1.value) * Math.tan(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "sin" && $type2.value === "cot") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.sin(x) * Math.sin(x) +
                  (parseInt($d1.value) * Math.cos(x)) / Math.sin(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "sin" && $type2.value === "x") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.sin(x) * Math.sin(x) +
                  parseInt($d1.value) * x +
                  parseInt($d2.value)
                );
                //return ;
              },
              "blue",
              3
            );
          } else if ($type.value === "cos" && $type2.value === "sin") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.cos(x) * Math.cos(x) +
                  parseInt($d1.value) * Math.sin(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "cos" && $type2.value === "tan") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.cos(x) * Math.cos(x) +
                  parseInt($d1.value) * Math.tan(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "cos" && $type2.value === "cot") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.cos(x) * Math.cos(x) +
                  (parseInt($d1.value) * Math.cos(x)) / Math.sin(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "cos" && $type2.value === "cos") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.cos(x) * Math.cos(x) +
                  parseInt($d1.value) * Math.cos(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "cos" && $type2.value === "x") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.cos(x) * Math.cos(x) +
                  parseInt($d1.value) * x +
                  parseInt($d2.value)
                );
                //return ;
              },
              "blue",
              3
            );
          } else if ($type.value === "tan" && $type2.value === "sin") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.tan(x) * Math.tan(x) +
                  parseInt($d1.value) * Math.sin(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "tan" && $type2.value === "cos") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.tan(x) * Math.tan(x) +
                  parseInt($d1.value) * Math.cos(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "tan" && $type2.value === "tan") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.tan(x) * Math.tan(x) +
                  parseInt($d1.value) * Math.tan(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "tan" && $type2.value === "cot") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.tan(x) * Math.tan(x) +
                  (parseInt($d1.value) * Math.cos(x)) / Math.sin(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "tan" && $type2.value === "x") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * Math.tan(x) * Math.tan(x) +
                  parseInt($d1.value) * x +
                  parseInt($d2.value)
                );
                //return ;
              },
              "blue",
              3
            );
          } else if ($type.value === "x" && $type2.value === "cot") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * x * x +
                  (parseInt($d1.value) * Math.cos(x)) / Math.sin(x) +
                  parseInt($d2.value)
                );
                //return ;
              },
              "blue",
              3
            );
          } else if ($type.value === "x" && $type2.value === "sin") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * x * x +
                  parseInt($d1.value) * Math.sin(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "x" && $type2.value === "cos") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * x * x +
                  parseInt($d1.value) * Math.cos(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          } else if ($type.value === "x" && $type2.value === "tan") {
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * x * x +
                  parseInt($d1.value) * Math.tan(x) +
                  parseInt($d2.value)
                );
                // return parseInt($d.value) * Math.cos(x) * Math.cos(x);
              },
              "blue",
              3
            );
          }
        } else if ($type1.value === "1") {
          if ($type.value === "sin") {
            myGraph.drawEquation(
              function (x) {
                return parseInt($d.value) * Math.sin(x) + parseInt($d2.value);
              },
              "blue",
              3
            );
          } else if ($type.value === "cos") {
            myGraph.drawEquation(
              function (x) {
                return parseInt($d.value) * Math.cos(x) + parseInt($d2.value);
              },
              "blue",
              3
            );
          } else if ($type.value === "tan") {
            myGraph.drawEquation(
              function (x) {
                return parseInt($d.value) * Math.tan(x) + parseInt($d2.value);
              },
              "blue",
              3
            );
          } else if ($type.value === "x") {
            myGraph.drawEquation(
              function (x) {
                return parseInt($d.value) * x + parseInt($d2.value);
              },
              "blue",
              3
            );
          }
        }
        //nemegdene!@#$%^&
        //console.log(a, b, c);
        // myGraph.drawEquation(
        //     (x) => {
        //         return (
        //             parseInt($a.value) * x * x +
        //             parseInt($b.value) * x +
        //             parseInt($c.value)
        //         );
        //     },
        //     "green",
        //     3
        // );

        // myGraph.drawEquation(
        //   function (x) {

        //     return 2 * x;
        //   },
        //   "red",
        //   3
        // );
      };
      const dra = (drawBtn = () => {
        if ($type1.value === "1") {
          console.log("lol");
          if ($type.value === "sin") {
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                return parseInt($d.value) * Math.sin(x) + parseInt($d2.value);
              },
              "blue",
              3
            );
          } else if ($type.value === "cos") {
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                return parseInt($d.value) * Math.cos(x) + parseInt($d2.value);
              },
              "blue",
              3
            );
          } else if ($type.value === "tan") {
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                return parseInt($d.value) * Math.tan(x) + parseInt($d2.value);
              },
              "blue",
              3
            );
          } else if ($type.value === "x") {
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                return parseInt($d.value) * x + parseInt($d2.value);
              },
              "blue",
              3
            );
          }
        } else if ($type1.value === "2") {
          if ($type.value === "x" && $type2.value === "x") {
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            console.log(a, b, c);
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * x * x +
                  parseInt($d1.value) * x +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "sin" && $type2.value === "cos") {
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            console.log(a, b, c);
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.sin(x) * Math.sin(x) +
                  parseInt($d1.value) * Math.cos(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "sin" && $type2.value === "sin") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.sin(x) * Math.sin(x) +
                  parseInt($d1.value) * Math.sin(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "sin" && $type2.value === "tan") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.sin(x) * Math.sin(x) +
                  parseInt($d1.value) * Math.tan(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "sin" && $type2.value === "cot") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.sin(x) * Math.sin(x) +
                  (parseInt($d1.value) * Math.cos(x)) / Math.sin(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "sin" && $type2.value === "x") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.sin(x) * Math.sin(x) +
                  parseInt($d1.value) * x +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } //cos
          else if ($type.value === "cos" && $type2.value === "cos") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.cos(x) * Math.cos(x) +
                  parseInt($d1.value) * Math.cos(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
            //nemegdej bn
          } else if ($type.value === "cos" && $type2.value === "x") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.cos(x) * Math.cos(x) +
                  parseInt($d1.value) * x +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "cos" && $type2.value === "sin") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.cos(x) * Math.cos(x) +
                  parseInt($d1.value) * Math.sin(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "cos" && $type2.value === "tan") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.cos(x) * Math.cos(x) +
                  parseInt($d1.value) * Math.tan(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "cos" && $type2.value === "cot") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.cos(x) * Math.cos(x) +
                  (parseInt($d1.value) * Math.cos(x)) / Math.sin(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          }
          //tan
          else if ($type.value === "tan" && $type2.value === "sin") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.tan(x) * Math.tan(x) +
                  parseInt($d1.value) * Math.sin(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "tan" && $type2.value === "x") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.tan(x) * Math.tan(x) +
                  parseInt($d1.value) * x +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "tan" && $type2.value === "cos") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.tan(x) * Math.tan(x) +
                  parseInt($d1.value) * Math.cos(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "tan" && $type2.value === "tan") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.tan(x) * Math.tan(x) +
                  parseInt($d1.value) * Math.tan(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "tan" && $type2.value === "cot") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * Math.tan(x) * Math.tan(x) +
                  (parseInt($d1.value) * Math.cos(x)) / Math.sin(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "x" && $type2.value === "cot") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                return (
                  parseInt($d.value) * x * x +
                  (parseInt($d1.value) * Math.cos(x)) / Math.sin(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "x" && $type2.value === "sin") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * x * x +
                  parseInt($d1.value) * Math.sin(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "x" && $type2.value === "cos") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * x * x +
                  parseInt($d1.value) * Math.cos(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          } else if ($type.value === "x" && $type2.value === "tan") {
            console.log($d.value, $d1.value, $d2.value);
            const canva = document.getElementById("myCanvas");
            const context = canva.getContext("2d");
            context.clearRect(0, 0, canva.width, canva.height);
            myGraph.drawXAxis();
            myGraph.drawYAxis();
            myGraph.drawEquation(
              function (x) {
                // console.log($d.value, $d1.value, $d2.value);
                return (
                  parseInt($d.value) * x * x +
                  parseInt($d1.value) * Math.tan(x) +
                  parseInt($d2.value)
                );
              },
              "blue",
              3
            );
          }
        }
      });
      "use strict";
      let wprRemoveCPCSS = function wprRemoveCPCSS() {
        let elem;
        document.querySelector('link[data-rocket-async="style"][rel="preload"]')
          ? setTimeout(wprRemoveCPCSS, 200)
          : (elem = document.getElementById("rocket-critical-css")) &&
            "remove" in elem &&
            elem.remove();
      };
      window.addEventListener
        ? window.addEventListener("load", wprRemoveCPCSS)
        : window.attachEvent && window.attachEvent("onload", wprRemoveCPCSS);
      window._taboola = window._taboola || [];
      _taboola.push({
        article: "auto",
      });
      !(function (e, f, u, i) {
        if (!document.getElementById(i)) {
          e.async = 1;
          e.src = u;
          e.id = i;
          f.parentNode.insertBefore(e, f);
        }
      })(
        document.createElement("script"),
        document.getElementsByTagName("script")[0],
        "https://cdn.taboola.com/libtrc/pythoncentral/loader.js",
        "tb_loader_script"
      );
      if (window.performance && typeof window.performance.mark == "function") {
        window.performance.mark("tbl_ic");
      }
    
      window._taboola = window._taboola || [];
      _taboola.push({
        mode: "thumbnails-b",
        container: "taboola-below-article-thumbnails",
        placement: "Below Article Thumbnails",
        target_type: "mix",
      });
    
    
      window._taboola = window._taboola || [];
      _taboola.push({
        flush: true,
      });