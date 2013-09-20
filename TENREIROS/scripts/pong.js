// JavaScript Document

      /*
        Author: John Crepezzi <john.crepezzi@gmail.com>
        http://github.com/seejohnrun/canvas-pong
        MIT License
      */

      function Paddle(context, paddleHeight) {

        // Load the canvas and context
        this.$canvas = context.canvas;
        this.context = context;

        // Dimensions and colors
        this.paddleWidth = 20;
        this.paddleHeight = paddleHeight;
        this.fillColor = 'blue';

        // The X position never changes
        // keep this guy on the left edge of the screen
        this.xPos = 0;
        this.yPos = 0;

        // The speed the paddle can move - never changes
        this.ySpeed = 4; // slightly slower than the ball

        // Get the paddle ready to go - by default the paddle starts in the center of the screen
        this.reset = function() {
          this.clear();
          this.yPos = this.$canvas.height / 2 - this.paddleHeight / 2;
        };

        // Draw the rectangular paddle into the given context
        this.draw = function() {
          this.clear();
          this.context.fillStyle = this.fillColor;
          this.context.fillRect(this.xPos, this.yPos, this.paddleWidth, this.paddleHeight);
        };

        // The horizontal position of the right side of the paddle
        this.right = function() {
          return this.paddleWidth + this.xPos;
        };

        // The vertical position of the top of the paddle
        this.top = function() {
          return this.yPos;
        };

        // The horizontal position of the paddle
        this.left = function() {
          return this.xPos;
        };

        // The vertical position of the bottom of the paddle
        this.bottom = function() {
          return this.yPos + this.paddleHeight;
        };

        // Move the paddle one step, and keep in mind that the screen has upper and lower bounds
        // that the paddle can't cross.
        // Singular argument is the distance to the desired target
        this.edgeMove = function(distance) {
          if (distance < 0) {
            if (this.top() > 0) {
              this.yPos += -this.ySpeed;
            }
          }
          else {
            if (this.bottom() < this.$canvas.height) {
              this.yPos += this.ySpeed;
            }
          }
        };

        // Move the paddle to attempt to make its center even with the ball.  Limited by a max speed
        // When the ball is headed away from the paddle, move to center to wait
        this.move = function(ball) {
          var distance;
          if (ball.xSpeed < 0) {
            distance = ball.yPos - (this.yPos + this.paddleHeight / 2);
            this.edgeMove(distance);
          }
          else {
            distance = this.$canvas.height / 2 - (this.yPos + this.paddleHeight / 2);
            if (Math.abs(distance) >= this.ySpeed) {
              this.edgeMove(distance); // no jitter
            }
          }
        };

        // Clear from the last place we were.
        // ordering of clears for performance reasons to avoid flicker
        this.clear = function() {
          this.context.clearRect(this.left(), this.top() - this.ySpeed - 2, this.paddleWidth, this.paddleHeight + this.ySpeed * 2 + 4);
        };

      }

      function Ball(context, leftEdge) {

        // Load the canvas and context
        this.$canvas = context.canvas;
        this.context = context;

        // Where the edge is
        this.leftEdge = leftEdge;

        // This is the radius of the circle
        this.circleRadius = 10;
        this.circleDiameter = this.circleRadius * 2;
        this.fillColor = 'blue';

        // The magnitude in a certain vector
        this.magnitude = 5;

        // Some initial value
        this.xPos = 0; this.yPos = 0; this.ySpeed = 5; this.xSpeed = 5;

        // This is to set up to a neutral place to get ready to start playing
        this.reset = function() {
          // Clear the ball away from where it was
          this.clear();
          // This is the xSpeed of the ball, which will be added to the xPos on each iteration
          // Initially, they are decided as either positive or negative
          this.xSpeed = Math.random() > 0.5 ? this.magnitude : -this.magnitude;
          this.ySpeed = Math.random() > 0.5 ? this.magnitude : -this.magnitude;
          // This is the xPosition of the ball
          this.xPos = this.$canvas.width / 2;
          // This is the yPosition of the ball
          // initially dynamically decided randomly
          this.yPos = Math.floor(Math.random() * this.$canvas.height);
        };

        // Draw the ball in the given context
        this.draw = function() {
          this.clearLast();
          this.context.fillStyle = this.fillColor;
          this.context.beginPath();
          this.context.arc(this.xPos, this.yPos, this.circleRadius, 0, Math.PI * 2, true);
          this.context.closePath();
          this.context.fill();
        };

        // The vertical position of the top of the ball
        this.top = function() {
          return this.yPos - this.circleRadius;
        };

        // The horizontal position of the left of the ball
        this.left = function() {
          return this.xPos - this.circleRadius;
        };

        // The vertical position of the bottom of the ball
        this.bottom = function() {
          return this.yPos + this.circleRadius;
        };

        // The horizontal position of the right of the ball
        this.right = function() {
          return this.xPos + this.circleRadius;
        };

        // This will clear the ball from the given context
        this.clear = function() {
          this.context.clearRect(this.left(), this.top(), this.circleDiameter, this.circleDiameter);
        };

        // This will clear the move of the ball from the given context
        // The reason we clear last instead of clearing current is for performance to reduce flicker on computation
        // for slow machines
				// There is a workaroud here for Chrome, which has trouble with non-integral positions and clearing
        this.clearLast = function() {
          this.context.clearRect(this.left() - this.xSpeed - 1, this.top() - this.ySpeed - 1, this.circleDiameter + 2, this.circleDiameter + 2);
        };

        // Make the next move for the ball
        this.move = function(hitterFrom, hitterTo) {
          // Move horizontally
          if (this.xPos >= this.$canvas.width - this.circleRadius) {
            this.xSpeed = -this.magnitude;
          }
          else if (this.xPos <= leftEdge) {
            this.xSpeed = this.magnitude;
          }
          this.xPos += this.xSpeed;
          // And vertically
          if (this.yPos >= this.$canvas.height - this.circleRadius) {
            this.ySpeed = -this.magnitude;
          }
          else if (this.yPos <= this.circleRadius) {
            this.ySpeed = this.magnitude;
          }
          this.yPos += this.ySpeed;
        };

      }

      // settings
      var difficulty = 4;
      var fps = 100;

      // get the space
      document.body.style.height = (window.innerHeight * difficulty) + 'px';

      // get the canvas
      var $canvas = document.getElementById('canvas');
      $canvas.width = window.innerWidth;
      $canvas.height = window.innerHeight;
      var context = $canvas.getContext('2d');
      var defaultBackground = document.body.style.background;

      // get the hitter height - cH^2/sH
      var hitterHeight = Math.pow(window.innerHeight, 2) / document.body.scrollHeight;

      // Get a ball and paddle
      var paddle = new Paddle(context, hitterHeight);
      var ball = new Ball(context, paddle.right());

      // keep score
      var theirScore = 0;
      var yourScore = 0;

      var gameRunning = false;
      $canvas.onclick = function() {

        if (gameRunning) {
          return;
        }

        // remove the intro box
        var $intro = document.getElementById('intro');
        $intro.style.display = 'none';

        // Reset the ball and paddle before each game
        ball.reset();
        paddle.reset();

        // Set the background to a non-error color
        document.body.style.background = defaultBackground;

        // Keep it moving, bro
        var interval = setInterval(function() {

          gameRunning = true;

          // Move the paddle and ball - paddle is at a disadvantage cause its first
          paddle.move(ball);
          ball.move();

          // Draw the screen, clearing previous moves
          ball.draw();
          paddle.draw();

          // If we're on the right side, consider that the user may have just lost
          if (ball.xPos >= $canvas.width - ball.circleRadius) {
            // Determine the position of the hittern and break on a match
            // Since this is scrollY (top) we need to offset it by window.innerHeight
            // NOTE: position represents the TOP of the hitter
            var position = (window.scrollY / document.body.scrollHeight) * $canvas.height;
            if (ball.bottom() < position || ball.top() > position + hitterHeight) {
              document.body.style.background = '#ee7777';
              document.getElementById('score').innerHTML = (theirScore += 1) + ' / ' + yourScore;
              clearInterval(interval);
              gameRunning = false;
            }
          }

          // If we're at the edge of the paddle, consider that it may not have gotten reflected
          if (ball.xPos <= paddle.right()) {
            if (ball.bottom() < paddle.top() || ball.top() > paddle.bottom()) {
              document.body.style.background = '#77ee77';
              document.getElementById('score').innerHTML = theirScore + ' / ' + (yourScore += 1);
              clearInterval(interval);
              gameRunning = false;
            }
          }

        }, 1000 / fps);

      };