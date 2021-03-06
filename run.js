var baseUrl = "https://dominiek.github.com/asteroids/";

function stars() {
  let scene, camera, renderer, stars, starGeo;

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    starGeo = new THREE.Geometry();
    for (let i = 0; i < 6000; i++) {
      star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      star.velocity = 0;
      star.acceleration = 0.02;
      starGeo.vertices.push(star);
    }

    //let sprite = new THREE.TextureLoader().load(baseUrl + "star.png");

    let sprite = new THREE.TextureLoader().load(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA5LTEwVDA4OjI3OjI4KzA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA5LTEwVDA4OjI3OjI4KzA3OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wOS0xMFQwODoyNzoyOCswNzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0ZmU0ODhkMy0wMjU5LWQ0NDEtOWNlMS1mNDg2NzEwNWU3NjQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3NDNmOTk3Ny0yMjVlLWIyNDktYjMzNy0wNTA2MGU1NTM0NjEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZThiNTZjMS04NjVmLTNkNGItYTk1Yy03YjY2Mzk1ZDIwMDMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0ZThiNTZjMS04NjVmLTNkNGItYTk1Yy03YjY2Mzk1ZDIwMDMiIHN0RXZ0OndoZW49IjIwMTktMDktMTBUMDg6Mjc6MjgrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NGZlNDg4ZDMtMDI1OS1kNDQxLTljZTEtZjQ4NjcxMDVlNzY0IiBzdEV2dDp3aGVuPSIyMDE5LTA5LTEwVDA4OjI3OjI4KzA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+0FZuFwAAAcBJREFUaN7lmklOAkEUhlmIF5BARLea4GEQV5Do2oQdmOBCz6C9EK8i3IEOstRwBSEBlKghfC58nXS0VYYe6pV/8jadrqr+UkPXG1JAygYLs7MsUAYcoAU8AAPgVWwgz1ryTlnaGAGyBdSBDjBnec2lbV36ih1kG7gCnglPL8ANkI8DZANoABOi00TGSEcFsgd0iU/3wEHYIIfAiPg1AUphgZwCM5LTTL5hLZAq5qi6Kkgx4ZkImpnisiCFiE+mdfZMYVGQNNDDXPWCjuYgkAbm6/wvkLyhSypoieV/A2miR7c/gWSAqSKQqXzzN5Aa+lQLAnEVgnS+gmRX9CeS1tzb9B5IBb069oM4ikEcP0hLMcidH6SvGKTvBxkrBhn7QbTLCpA3W5bWk5Wb3Zrj15ofouYryokfJGfLpVHrNd61xbE6s9rVTYlDrz74YFU4yJoAnRcy7RoM0WXBkKmXnRoZCDEG9vmPaQWrEj1Wpd48K5FcMvQI5enpHhGkpz3bBC4ivspMgUsZK/ISjh3gmvBLOJrALgkU1WT4LIhxWb2oxpU+MhhS5pQTT9MB2sAjMATexYbyrC3vVKSNcfVaidoHrhc50nP+8ssAAAAASUVORK5CYII="
    );
    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite,
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    window.addEventListener("resize", onWindowResize, false);

    animate();
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  function animate() {
    starGeo.vertices.forEach((p) => {
      p.velocity += p.acceleration;
      p.y -= p.velocity;

      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.y += 0.002;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  document.getElementsByTagName("body")[0].innerHTML = "";
  document.getElementsByTagName("body")[0].style = "background: black";

  init();
}

window.playAsteroids = function () {
  function playBackgroundMusic() {
    const tracks = [
      "her2",
      //'her3', // I think this file is wrong
      "her5",
      "her6",
      "her9",
      "her10",
      "her11",
      "her13",
      "her14",
      "her15",
    ];
    const id = tracks[Math.floor(Math.random() * tracks.length)];
    const track = new Audio(baseUrl + "assets/sounds/" + id + ".mp3");
    track.onended = function () {
      setTimeout(function () {
        playBackgroundMusic();
      }, 1000);
    };
    track.play();
  }

  function playSounds(type) {
    if (type === "fire") {
      new Audio(baseUrl + "assets/sounds/shoot.wav").play();
    }
    if (type === "atmosphere") {
      new Audio(baseUrl + "assets/sounds/atmosphere.wav").play();
    }
    if (type === "engine") {
      new Audio(baseUrl + "assets/sounds/rattle.wav").play();
    }
    if (type === "explosion") {
      const id = Math.floor(Math.random() * 4) + 1;
      new Audio(baseUrl + "assets/sounds/explosion" + id + ".wav").play();
    }
  }

  playSounds("atmosphere");
  setTimeout(function () {
    playBackgroundMusic();
  }, 2000);

  function Asteroids() {
    if (!window.ASTEROIDS)
      window.ASTEROIDS = {
        enemiesKilled: 0,
        startedPlaying: new Date().getTime(),
      };

    /*
        Classes
    */

    function Vector(x, y) {
      if (typeof x == "Object") {
        this.x = x.x;
        this.y = x.y;
      } else {
        this.x = x;
        this.y = y;
      }
    }

    Vector.prototype = {
      cp: function () {
        return new Vector(this.x, this.y);
      },

      mul: function (factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
      },

      mulNew: function (factor) {
        return new Vector(this.x * factor, this.y * factor);
      },

      add: function (vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
      },

      addNew: function (vec) {
        return new Vector(this.x + vec.x, this.y + vec.y);
      },

      sub: function (vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
      },

      subNew: function (vec) {
        return new Vector(this.x - vec.x, this.y - vec.y);
      },

      // angle in radians
      rotate: function (angle) {
        var x = this.x,
          y = this.y;
        this.x = x * Math.cos(angle) - Math.sin(angle) * y;
        this.y = x * Math.sin(angle) + Math.cos(angle) * y;
        return this;
      },

      // angle still in radians
      rotateNew: function (angle) {
        return this.cp().rotate(angle);
      },

      // angle in radians... again
      setAngle: function (angle) {
        var l = this.len();
        this.x = Math.cos(angle) * l;
        this.y = Math.sin(angle) * l;
        return this;
      },

      // RADIANS
      setAngleNew: function (angle) {
        return this.cp().setAngle(angle);
      },

      setLength: function (length) {
        var l = this.len();
        if (l) this.mul(length / l);
        else this.x = this.y = length;
        return this;
      },

      setLengthNew: function (length) {
        return this.cp().setLength(length);
      },

      normalize: function () {
        var l = this.len();
        this.x /= l;
        this.y /= l;
        return this;
      },

      normalizeNew: function () {
        return this.cp().normalize();
      },

      angle: function () {
        return Math.atan2(this.y, this.x);
      },

      collidesWith: function (rect) {
        return (
          this.x > rect.x &&
          this.y > rect.y &&
          this.x < rect.x + rect.width &&
          this.y < rect.y + rect.height
        );
      },

      len: function () {
        var l = Math.sqrt(this.x * this.x + this.y * this.y);
        if (l < 0.005 && l > -0.005) return 0;
        return l;
      },

      is: function (test) {
        return typeof test == "object" && this.x == test.x && this.y == test.y;
      },

      toString: function () {
        return (
          "[Vector(" +
          this.x +
          ", " +
          this.y +
          ") angle: " +
          this.angle() +
          ", length: " +
          this.len() +
          "]"
        );
      },
    };

    function Line(p1, p2) {
      this.p1 = p1;
      this.p2 = p2;
    }

    Line.prototype = {
      shift: function (pos) {
        this.p1.add(pos);
        this.p2.add(pos);
      },

      intersectsWithRect: function (rect) {
        var LL = new Vector(rect.x, rect.y + rect.height);
        var UL = new Vector(rect.x, rect.y);
        var LR = new Vector(rect.x + rect.width, rect.y + rect.height);
        var UR = new Vector(rect.x + rect.width, rect.y);

        if (
          this.p1.x > LL.x &&
          this.p1.x < UR.x &&
          this.p1.y < LL.y &&
          this.p1.y > UR.y &&
          this.p2.x > LL.x &&
          this.p2.x < UR.x &&
          this.p2.y < LL.y &&
          this.p2.y > UR.y
        )
          return true;

        if (this.intersectsLine(new Line(UL, LL))) return true;
        if (this.intersectsLine(new Line(LL, LR))) return true;
        if (this.intersectsLine(new Line(UL, UR))) return true;
        if (this.intersectsLine(new Line(UR, LR))) return true;
        return false;
      },

      intersectsLine: function (line2) {
        var v1 = this.p1,
          v2 = this.p2;
        var v3 = line2.p1,
          v4 = line2.p2;

        var denom =
          (v4.y - v3.y) * (v2.x - v1.x) - (v4.x - v3.x) * (v2.y - v1.y);
        var numerator =
          (v4.x - v3.x) * (v1.y - v3.y) - (v4.y - v3.y) * (v1.x - v3.x);

        var numerator2 =
          (v2.x - v1.x) * (v1.y - v3.y) - (v2.y - v1.y) * (v1.x - v3.x);

        if (denom == 0.0) {
          return false;
        }
        var ua = numerator / denom;
        var ub = numerator2 / denom;

        return ua >= 0.0 && ua <= 1.0 && ub >= 0.0 && ub <= 1.0;
      },
    };

    function Highscores() {}

    Highscores.prototype = {
      build: function () {
        var self = this;

        var w =
          document.clientWidth ||
          window.innerWidth ||
          document.documentElement.clientWidth;
        var h =
          document.clientHeight ||
          window.innerHeight ||
          document.documentElement.clientHeight;

        this.container = document.createElement("div");
        this.container.className = "ASTEROIDSYEAH";
        with (this.container.style) {
          position = "fixed";
          top = parseInt(h / 2 - 250, 10) + "px";
          left = parseInt(w / 2 - 250, 10) + "px";
          width = "500px";
          height = "500px";
          boxShadow = MsBoxShadow = OBoxShadow = MozBoxShadow = WebkitBoxShadow =
            "0 0 25px #000";
          zIndex = "1000002";
          //webkitTransform causes a bug where you can't click anything in the iframe if the scroll is not top
          //webkitTransform = 'scale(0, 0)';
          //webkitTransition = "-webkit-transform 500ms";
          background = "#222";
        }
        document.body.appendChild(this.container);

        // Create iframe
        this.iframe = document.createElement("iframe");
        this.iframe.className = "ASTEROIDSYEAH";
        this.iframe.width = this.iframe.height = 500;
        this.iframe.frameBorder = 0;
        this.container.appendChild(this.iframe);

        // Create close button
        this.close = document.createElement("a");
        this.close.href = "#";
        this.close.onclick = function () {
          self.hide();
          return false;
        };
        this.close.innerHTML = "X";
        with (this.close.style) {
          position = "absolute";
          display = "block";
          padding = "2px 6px";
          top = "-12px";
          right = "-12px";
          background = "#222";
          //textIndent = "-10000px";
          border = "3px solid #fff";
          boxShadow = "1px 1px 5px #000";
          color = "#fff";
          textAlign = "center";
          borderRadius = "24px";
          outline = "none";
          textDecoration = "none";
          fontFamily = "Verdana";
          fontSize = "16px";
          fontWeight = "bold";
          zIndex = "10003";
        }
        this.container.appendChild(this.close);
        this.hide();

        document.body.appendChild(this.container);
      },

      show: function () {
        this.build();
        this.container.style.display = "block";

        var self = this;
        setTimeout(function () {
          //self.container.style.webkitTransform = 'scale(1, 1)';
        }, 50);
      },

      hide: function () {
        if (this.container && this.container.parentNode)
          this.container.parentNode.removeChild(this.container);
      },
    };

    /*
        end classes, begin code
    */

    var that = this;

    var isIE = !!window.ActiveXObject; // IE gets less performance-intensive
    var isIEQuirks = isIE && document.compatMode == "BackCompat";

    // configuration directives are placed in local variables
    var w = document.documentElement.clientWidth,
      h = document.documentElement.clientHeight;
    if (isIEQuirks) {
      w = document.body.clientWidth;
      h = document.body.clientHeight;
    }

    var playerWidth = 20,
      playerHeight = 30;

    var playerVerts = [
      [-15, -10],
      [-15, 10],
      [15, 0],
    ];

    var ignoredTypes = [
      "HTML",
      "HEAD",
      "BODY",
      "SCRIPT",
      "TITLE",
      "META",
      "STYLE",
      "LINK",
    ];
    if (window.ActiveXObject)
      ignoredTypes = [
        "HTML",
        "HEAD",
        "BODY",
        "SCRIPT",
        "TITLE",
        "META",
        "STYLE",
        "LINK",
        "SHAPE",
        "LINE",
        "GROUP",
        "IMAGE",
        "STROKE",
        "FILL",
        "SKEW",
        "PATH",
        "TEXTPATH",
        "INS",
      ]; // Half of these are for IE g_vml
    var hiddenTypes = ["BR", "HR"];

    var FPS = 50;

    // units/second
    var acc = 300;
    var maxSpeed = 600;
    var rotSpeed = 360; // one rotation per second
    var bulletSpeed = 700;
    var particleSpeed = 400;

    var timeBetweenEngine = 450; // how many milliseconds between shots
    var timeBetweenFire = 150; // how many milliseconds between shots
    var timeBetweenBlink = 250; // milliseconds between enemy blink
    var timeBetweenEnemyUpdate = isIE ? 10000 : 2000;
    var bulletRadius = 2;
    var maxParticles = isIE ? 20 : 40;
    var maxBullets = isIE ? 10 : 20;

    // generated every 10 ms
    this.flame = { r: [], y: [] };

    // blink style
    this.toggleBlinkStyle = function () {
      if (this.updated.blink.isActive) {
        removeClass(document.body, "ASTEROIDSBLINK");
      } else {
        addClass(document.body, "ASTEROIDSBLINK");
      }

      this.updated.blink.isActive = !this.updated.blink.isActive;
    };

    addStylesheet(
      ".ASTEROIDSBLINK .ASTEROIDSYEAHENEMY",
      "outline: 2px dotted red;"
    );

    this.pos = new Vector(
      Math.round(window.innerWidth / 3),
      Math.round(window.innerHeight / 3)
    );
    this.lastPos = false;
    this.vel = new Vector(0, 0);
    this.dir = new Vector(0, 1);
    this.keysPressed = {};
    this.firedAt = false;
    this.engineFiredAt = false;
    this.updated = {
      enemies: false, // if the enemy index has been updated since the user pressed B for Blink
      flame: new Date().getTime(), // the time the flame was last updated
      blink: { time: 0, isActive: false },
    };
    this.scrollPos = new Vector(0, 0);

    this.bullets = [];

    // Enemies lay first in this.enemies, when they are shot they are moved to this.dying
    this.enemies = [];
    this.dying = [];
    this.totalEnemies = 0;

    // Particles are created when something is shot
    this.particles = [];

    // things to shoot is everything textual and an element of type not specified in types AND not a navigation element (see further down)
    function updateEnemyIndex() {
      for (var i = 0, enemy; (enemy = that.enemies[i]); i++)
        removeClass(enemy, "ASTEROIDSYEAHENEMY");

      var all = document.body.getElementsByTagName("*");
      that.enemies = [];
      for (var i = 0, el; (el = all[i]); i++) {
        // elements with className ASTEROIDSYEAH are part of the "game"
        if (
          indexOf(ignoredTypes, el.tagName.toUpperCase()) == -1 &&
          el.prefix != "g_vml_" &&
          hasOnlyTextualChildren(el) &&
          el.className != "ASTEROIDSYEAH" &&
          el.offsetHeight > 0
        ) {
          el.aSize = size(el);
          that.enemies.push(el);

          addClass(el, "ASTEROIDSYEAHENEMY");

          // this is only for enemycounting
          if (!el.aAdded) {
            el.aAdded = true;
            that.totalEnemies++;
          }
        }
      }
    }
    updateEnemyIndex();

    // createFlames create the vectors for the flames of the ship
    var createFlames;
    (function () {
      var rWidth = playerWidth,
        rIncrease = playerWidth * 0.1,
        yWidth = playerWidth * 0.6,
        yIncrease = yWidth * 0.2,
        halfR = rWidth / 2,
        halfY = yWidth / 2,
        halfPlayerHeight = playerHeight / 2;

      createFlames = function () {
        // Firstly create red flames
        that.flame.r = [[-1 * halfPlayerHeight, -1 * halfR]];
        that.flame.y = [[-1 * halfPlayerHeight, -1 * halfY]];

        for (var x = 0; x < rWidth; x += rIncrease) {
          that.flame.r.push([-random(2, 7) - halfPlayerHeight, x - halfR]);
        }

        that.flame.r.push([-1 * halfPlayerHeight, halfR]);

        // ... And now the yellow flames
        for (var x = 0; x < yWidth; x += yIncrease) {
          that.flame.y.push([-random(2, 7) - halfPlayerHeight, x - halfY]);
        }

        that.flame.y.push([-1 * halfPlayerHeight, halfY]);
      };
    })();

    createFlames();

    /*
        Math operations
    */

    function radians(deg) {
      return deg * 0.0174532925;
    }

    function random(from, to) {
      return Math.floor(Math.random() * (to + 1) + from);
    }

    /*
        Misc operations
    */

    function code(name) {
      var table = { up: 38, down: 40, left: 37, right: 39, esc: 27 };
      if (table[name]) return table[name];
      return name.charCodeAt(0);
    }

    function boundsCheck(vec) {
      if (vec.x > w) vec.x = 0;
      else if (vec.x < 0) vec.x = w;

      if (vec.y > h) vec.y = 0;
      else if (vec.y < 0) vec.y = h;
    }

    function size(element) {
      var el = element,
        left = 0,
        top = 0;
      do {
        left += el.offsetLeft || 0;
        top += el.offsetTop || 0;
        el = el.offsetParent;
      } while (el);
      return {
        x: left,
        y: top,
        width: element.offsetWidth || 10,
        height: element.offsetHeight || 10,
      };
    }

    // Taken from:
    // http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
    function addEvent(obj, type, fn) {
      if (obj.addEventListener) obj.addEventListener(type, fn, false);
      else if (obj.attachEvent) {
        obj["e" + type + fn] = fn;
        obj[type + fn] = function () {
          obj["e" + type + fn](window.event);
        };
        obj.attachEvent("on" + type, obj[type + fn]);
      }
    }

    function removeEvent(obj, type, fn) {
      if (obj.removeEventListener) obj.removeEventListener(type, fn, false);
      else if (obj.detachEvent) {
        obj.detachEvent("on" + type, obj[type + fn]);
        obj[type + fn] = null;
        obj["e" + type + fn] = null;
      }
    }

    function applyVisibility(vis) {
      for (var i = 0, p; (p = window.ASTEROIDSPLAYERS[i]); i++) {
        p.gameContainer.style.visibility = vis;
      }
    }

    function getElementFromPoint(x, y) {
      // hide canvas so it isn't picked up
      applyVisibility("hidden");

      var element = document.elementFromPoint(x, y);

      if (!element) {
        applyVisibility("visible");
        return false;
      }

      if (element.nodeType == 3) element = element.parentNode;

      // show the canvas again, hopefully it didn't blink
      applyVisibility("visible");
      return element;
    }

    function addParticles(startPos) {
      var time = new Date().getTime();
      var amount = maxParticles;
      for (var i = 0; i < amount; i++) {
        that.particles.push({
          // random direction
          dir: new Vector(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
          ).normalize(),
          pos: startPos.cp(),
          cameAlive: time,
        });
      }
    }

    function setScore() {
      that.points.innerHTML = window.ASTEROIDS.enemiesKilled * 10;
    }

    function hasOnlyTextualChildren(element) {
      if (
        element.offsetLeft < -100 &&
        element.offsetWidth > 0 &&
        element.offsetHeight > 0
      )
        return false;
      if (indexOf(hiddenTypes, element.tagName) != -1) return true;

      if (element.offsetWidth == 0 && element.offsetHeight == 0) return false;
      for (var i = 0; i < element.childNodes.length; i++) {
        // <br /> doesn't count... and empty elements
        if (
          indexOf(hiddenTypes, element.childNodes[i].tagName) == -1 &&
          element.childNodes[i].childNodes.length != 0
        )
          return false;
      }
      return true;
    }

    function indexOf(arr, item, from) {
      if (arr.indexOf) return arr.indexOf(item, from);
      var len = arr.length;
      for (
        var i = from < 0 ? Math.max(0, len + from) : from || 0;
        i < len;
        i++
      ) {
        if (arr[i] === item) return i;
      }
      return -1;
    }

    // taken from MooTools Core
    function addClass(element, className) {
      if (element.className.indexOf(className) == -1)
        element.className = (element.className + " " + className)
          .replace(/\s+/g, " ")
          .replace(/^\s+|\s+$/g, "");
    }

    // taken from MooTools Core
    function removeClass(element, className) {
      element.className = element.className.replace(
        new RegExp("(^|\\s)" + className + "(?:\\s|$)"),
        "$1"
      );
    }

    function addStylesheet(selector, rules) {
      var stylesheet = document.createElement("style");
      stylesheet.type = "text/css";
      stylesheet.rel = "stylesheet";
      stylesheet.id = "ASTEROIDSYEAHSTYLES";
      try {
        stylesheet.innerHTML = selector + "{" + rules + "}";
      } catch (e) {
        stylesheet.styleSheet.addRule(selector, rules);
      }
      document.getElementsByTagName("head")[0].appendChild(stylesheet);
    }

    function removeStylesheet(name) {
      var stylesheet = document.getElementById(name);
      if (stylesheet) {
        stylesheet.parentNode.removeChild(stylesheet);
      }
    }

    /*
        == Setup ==
    */
    this.gameContainer = document.createElement("div");
    this.gameContainer.className = "ASTEROIDSYEAH";
    document.body.appendChild(this.gameContainer);

    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("width", w);
    this.canvas.setAttribute("height", h);
    this.canvas.className = "ASTEROIDSYEAH";
    with (this.canvas.style) {
      width = w + "px";
      height = h + "px";
      position = "fixed";
      top = "0px";
      left = "0px";
      bottom = "0px";
      right = "0px";
      zIndex = "10000";
    }

    addEvent(this.canvas, "mousedown", function (e) {
      e = e || window.event;
      var message = document.createElement("span");
      message.style.position = "absolute";
      message.style.border = "0";
      message.style.background = "#999";
      message.style.color = "black";
      message.innerHTML = "Press Esc to quit";
      document.body.appendChild(message);

      var x = e.pageX || e.clientX + document.documentElement.scrollLeft;
      var y = e.pageY || e.clientY + document.documentElement.scrollTop;
      message.style.left = x - message.offsetWidth / 2 + "px";
      message.style.top = y - message.offsetHeight / 2 + "px";

      setTimeout(function () {
        try {
          message.parentNode.removeChild(message);
        } catch (e) {}
      }, 1000);
    });

    var eventResize = function () {
      if (!isIE) {
        that.canvas.style.display = "none";

        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;

        that.canvas.setAttribute("width", w);
        that.canvas.setAttribute("height", h);

        with (that.canvas.style) {
          display = "block";
          width = w + "px";
          height = h + "px";
        }
      } else {
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;

        if (isIEQuirks) {
          w = document.body.clientWidth;
          h = document.body.clientHeight;
        }

        that.canvas.setAttribute("width", w);
        that.canvas.setAttribute("height", h);
      }
      forceChange = true;
    };
    addEvent(window, "resize", eventResize);

    this.gameContainer.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.ctx.fillStyle = "#f6931d";
    this.ctx.strokeStyle = "#f6931d";

    // navigation wrapper element
    if (!document.getElementById("ASTEROIDS-NAVIGATION")) {
      this.navigation = document.createElement("div");
      this.navigation.id = "ASTEROIDS-NAVIGATION";
      this.navigation.className = "ASTEROIDSYEAH";
      with (this.navigation.style) {
        fontFamily = "Arial,sans-serif";
        position = "fixed";
        zIndex = "10001";
        bottom = "20px";
        left = "20px";
        textAlign = "center";
        background = "#000";
        color = "#fff";
        padding = "2px";
        width = "150px";
        borderRadius = "5px";
        opacity = "0.60";
      }
      this.gameContainer.appendChild(this.navigation);

      // points
      this.points = document.createElement("span");
      this.points.id = "ASTEROIDS-POINTS";
      with (this.points.style) {
        font = "28pt Arial, sans-serif";
        fontWeight = "bold";
        position = "relative";
        left = "0px";
        textAlign = "center";
      }
      this.points.className = "ASTEROIDSYEAH";
      this.navigation.appendChild(this.points);
    } else {
      this.navigation = document.getElementById("ASTEROIDS-NAVIGATION");
      this.points = document.getElementById("ASTEROIDS-POINTS");
    }

    if (!document.getElementById("ASTEROIDS-HOWTO")) {
      this.howto = document.createElement("div");
      this.howto.id = "ASTEROIDS-HOWTO";
      this.howto.className = "ASTEROIDSYEAH";
      with (this.howto.style) {
        fontFamily = "Arial,sans-serif";
        fontSize = "30px";
        lineHeight = "40px";
        padding = "20px";
        position = "fixed";
        zIndex = "10001";
        bottom = "40%";
        left = "40%";
        textAlign = "left";
        background = "#000";
        color = "#fff";
        width = "20%";
        borderRadius = "5px";
        opacity = "0.60";
      }
      this.howto.innerHTML = "Use arrow keys to move, space bar to shoot!";
      this.gameContainer.appendChild(this.howto);
      setTimeout(() => {
        this.gameContainer.removeChild(this.howto);
      }, 5000);
    }

    if (!document.getElementById("ASTEROIDS-ATTRIBUTION")) {
      this.attribution = document.createElement("div");
      this.attribution.id = "ASTEROIDS-ATTRIBUTION";
      this.attribution.className = "ASTEROIDSYEAH";
      with (this.attribution.style) {
        fontFamily = "Arial,sans-serif";
        fontSize = "20px";
        lineHeight = "20px";
        padding = "10px";
        position = "fixed";
        zIndex = "10001";
        bottom = "20px";
        right = "20px";
        textAlign = "left";
        background = "#000";
        color = "#fff";
        width = "40%";
        borderRadius = "5px";
        opacity = "0.60";
      }
      this.attribution.innerHTML =
        'Original game by <a style="color: white" href="http://www.rootof.com/">Rootof Creations</a> - music by <a style="color: white" href="https://demozoo.org/sceners/10035/">Estrayk</a>';
      this.gameContainer.appendChild(this.attribution);
      setTimeout(() => {
        this.gameContainer.removeChild(this.attribution);
      }, 9000);
    }

    // Because IE quirks does not understand position: fixed we set to absolute and just reposition it everything frame
    if (isIEQuirks) {
      this.gameContainer.style.position = this.canvas.style.position = this.navigation.style.position =
        "absolute";
    }

    setScore();
    // For ie
    if (typeof G_vmlCanvasManager != "undefined") {
      var children = this.canvas.getElementsByTagName("*");
      for (var i = 0, c; (c = children[i]); i++) addClass(c, "ASTEROIDSYEAH");
    }

    /*
        == Events ==
    */

    var eventKeydown = function (event) {
      event = event || window.event;
      if (event.ctrlKey || event.shiftKey) return;
      that.keysPressed[event.keyCode] = true;

      switch (event.keyCode) {
        case code(" "):
          that.firedAt = 1;
          break;
      }

      // check here so we can stop propagation appropriately
      if (
        indexOf(
          [
            code("up"),
            code("down"),
            code("right"),
            code("left"),
            code(" "),
            code("B"),
            code("W"),
            code("A"),
            code("S"),
            code("D"),
          ],
          event.keyCode
        ) != -1
      ) {
        if (event.ctrlKey || event.shiftKey) return;

        if (event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        event.returnValue = false;
        event.cancelBubble = true;
        return false;
      }
    };
    addEvent(document, "keydown", eventKeydown);

    var eventKeypress = function (event) {
      event = event || window.event;
      if (
        indexOf(
          [
            code("up"),
            code("down"),
            code("right"),
            code("left"),
            code(" "),
            code("W"),
            code("A"),
            code("S"),
            code("D"),
          ],
          event.keyCode || event.which
        ) != -1
      ) {
        if (event.ctrlKey || event.shiftKey) return;

        if (event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        event.returnValue = false;
        event.cancelBubble = true;
        return false;
      }
    };
    addEvent(document, "keypress", eventKeypress);

    var eventKeyup = function (event) {
      event = event || window.event;
      that.keysPressed[event.keyCode] = false;

      if (
        indexOf(
          [
            code("up"),
            code("down"),
            code("right"),
            code("left"),
            code(" "),
            code("B"),
            code("W"),
            code("A"),
            code("S"),
            code("D"),
          ],
          event.keyCode
        ) != -1
      ) {
        if (event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        event.returnValue = false;
        event.cancelBubble = true;
        return false;
      }
    };
    addEvent(document, "keyup", eventKeyup);

    /*
        Context operations
    */

    this.ctx.clear = function () {
      this.clearRect(0, 0, w, h);
    };

    this.ctx.clear();

    this.ctx.drawLine = function (xFrom, yFrom, xTo, yTo) {
      this.beginPath();
      this.moveTo(xFrom, yFrom);
      this.lineTo(xTo, yTo);
      this.lineTo(xTo + 1, yTo + 1);
      this.closePath();
      this.fill();
    };

    this.ctx.tracePoly = function (verts) {
      this.beginPath();
      this.moveTo(verts[0][0], verts[0][1]);
      for (var i = 1; i < verts.length; i++)
        this.lineTo(verts[i][0], verts[i][1]);
      this.closePath();
    };

    var THEPLAYER = false;
    if (window.KICKASSIMG) {
      THEPLAYER = document.createElement("img");
      THEPLAYER.src = window.KICKASSIMG;
    }

    this.ctx.drawPlayer = function () {
      if (!THEPLAYER) {
        this.save();
        this.translate(that.pos.x, that.pos.y);
        this.rotate(that.dir.angle());
        this.tracePoly(playerVerts);
        this.fillStyle = "#f6931d";
        this.fill();
        //this.tracePoly(playerVerts);
        this.stroke();
        this.restore();
      } else {
        this.save();
        this.translate(that.pos.x, that.pos.y);
        this.rotate(that.dir.angle() + Math.PI / 2);
        this.drawImage(THEPLAYER, -THEPLAYER.width / 2, -THEPLAYER.height / 2);
        this.restore();
      }
    };

    var PI_SQ = Math.PI * 2;

    this.ctx.drawBullets = function (bullets) {
      for (var i = 0; i < bullets.length; i++) {
        this.beginPath();
        this.arc(
          bullets[i].pos.x,
          bullets[i].pos.y,
          bulletRadius,
          0,
          PI_SQ,
          true
        );
        this.closePath();
        this.fill();
      }
    };

    var randomParticleColor = function () {
      return ["red", "yellow"][random(0, 1)];
    };

    this.ctx.drawParticles = function (particles) {
      var oldColor = this.fillStyle;

      for (var i = 0; i < particles.length; i++) {
        this.fillStyle = randomParticleColor();
        this.drawLine(
          particles[i].pos.x,
          particles[i].pos.y,
          particles[i].pos.x - particles[i].dir.x * 10,
          particles[i].pos.y - particles[i].dir.y * 10
        );
      }

      this.fillStyle = oldColor;
    };

    this.ctx.drawFlames = function (flame) {
      if (THEPLAYER) return;

      this.save();

      this.translate(that.pos.x, that.pos.y);
      this.rotate(that.dir.angle());

      var oldColor = this.strokeStyle;
      this.strokeStyle = "red";
      this.tracePoly(flame.r);
      this.stroke();

      this.strokeStyle = "yellow";
      this.tracePoly(flame.y);
      this.stroke();

      this.strokeStyle = oldColor;
      this.restore();
    };

    /*
        Game loop
    */

    // Attempt to focus window if possible, so keyboard events are posted to us
    try {
      window.focus();
    } catch (e) {}

    addParticles(this.pos);
    addClass(document.body, "ASTEROIDSYEAH");

    var isRunning = true;
    var lastUpdate = new Date().getTime();
    var forceChange = false;

    this.update = function () {
      // ==
      // logic
      // ==
      var nowTime = new Date().getTime();
      var tDelta = (nowTime - lastUpdate) / 1000;
      lastUpdate = nowTime;

      // update flame and timer if needed
      var drawFlame = false;
      if (nowTime - this.updated.flame > 50) {
        createFlames();
        this.updated.flame = nowTime;
      }

      this.scrollPos.x =
        window.pageXOffset || document.documentElement.scrollLeft;
      this.scrollPos.y =
        window.pageYOffset || document.documentElement.scrollTop;

      // update player
      // move forward
      if (this.keysPressed[code("up")] || this.keysPressed[code("W")]) {
        this.vel.add(this.dir.mulNew(acc * tDelta));

        drawFlame = true;
        if (nowTime - this.engineFiredAt > timeBetweenEngine) {
          //playSounds('engine');
          this.engineFiredAt = nowTime;
        }
      } else {
        // decrease speed of player
        this.vel.mul(0.96);
      }

      // rotate counter-clockwise
      if (this.keysPressed[code("left")] || this.keysPressed[code("A")]) {
        forceChange = true;
        this.dir.rotate(radians(rotSpeed * tDelta * -1));
      }

      // rotate clockwise
      if (this.keysPressed[code("right")] || this.keysPressed[code("D")]) {
        forceChange = true;
        this.dir.rotate(radians(rotSpeed * tDelta));
      }

      // fire
      if (
        this.keysPressed[code(" ")] &&
        nowTime - this.firedAt > timeBetweenFire
      ) {
        this.bullets.unshift({
          dir: this.dir.cp(),
          pos: this.pos.cp(),
          startVel: this.vel.cp(),
          cameAlive: nowTime,
        });
        playSounds("fire");

        this.firedAt = nowTime;

        if (this.bullets.length > maxBullets) {
          this.bullets.pop();
        }
      }

      // add blink
      if (this.keysPressed[code("B")]) {
        if (!this.updated.enemies) {
          updateEnemyIndex();
          this.updated.enemies = true;
        }

        forceChange = true;

        this.updated.blink.time += tDelta * 1000;
        if (this.updated.blink.time > timeBetweenBlink) {
          this.toggleBlinkStyle();
          this.updated.blink.time = 0;
        }
      } else {
        this.updated.enemies = false;
      }

      if (this.keysPressed[code("esc")]) {
        destroy.apply(this);
        stars();
        return;
      }

      // cap speed
      if (this.vel.len() > maxSpeed) {
        this.vel.setLength(maxSpeed);
      }

      // add velocity to player (physics)
      this.pos.add(this.vel.mulNew(tDelta));

      // check bounds X of player, if we go outside we scroll accordingly
      if (this.pos.x > w) {
        window.scrollTo(this.scrollPos.x + 50, this.scrollPos.y);
        this.pos.x = 0;
      } else if (this.pos.x < 0) {
        window.scrollTo(this.scrollPos.x - 50, this.scrollPos.y);
        this.pos.x = w;
      }

      // check bounds Y
      if (this.pos.y > h) {
        window.scrollTo(this.scrollPos.x, this.scrollPos.y + h * 0.75);
        this.pos.y = 0;
      } else if (this.pos.y < 0) {
        window.scrollTo(this.scrollPos.x, this.scrollPos.y - h * 0.75);
        this.pos.y = h;
      }

      // update positions of bullets
      for (var i = this.bullets.length - 1; i >= 0; i--) {
        // bullets should only live for 2 seconds
        if (nowTime - this.bullets[i].cameAlive > 2000) {
          this.bullets.splice(i, 1);
          forceChange = true;
          continue;
        }

        var bulletVel = this.bullets[i].dir
          .setLengthNew(bulletSpeed * tDelta)
          .add(this.bullets[i].startVel.mulNew(tDelta));

        this.bullets[i].pos.add(bulletVel);
        boundsCheck(this.bullets[i].pos);

        // check collisions
        var murdered = getElementFromPoint(
          this.bullets[i].pos.x,
          this.bullets[i].pos.y
        );
        if (
          murdered &&
          murdered.tagName &&
          indexOf(ignoredTypes, murdered.tagName.toUpperCase()) == -1 &&
          hasOnlyTextualChildren(murdered) &&
          murdered.className != "ASTEROIDSYEAH"
        ) {
          addParticles(this.bullets[i].pos);
          this.dying.push(murdered);
          playSounds("explosion");

          this.bullets.splice(i, 1);
          continue;
        }
      }

      if (this.dying.length) {
        for (var i = this.dying.length - 1; i >= 0; i--) {
          try {
            // If we have multiple spaceships it might have already been removed
            if (this.dying[i].parentNode) window.ASTEROIDS.enemiesKilled++;

            this.dying[i].parentNode.removeChild(this.dying[i]);
          } catch (e) {}
        }

        setScore();
        this.dying = [];
      }

      // update particles position
      for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].pos.add(
          this.particles[i].dir.mulNew(particleSpeed * tDelta * Math.random())
        );

        if (nowTime - this.particles[i].cameAlive > 1000) {
          this.particles.splice(i, 1);
          forceChange = true;
          continue;
        }
      }

      // ==
      // drawing
      // ==

      // Reposition the canvas area for IE quirks because it does not understand position: fixed
      if (isIEQuirks) {
        this.gameContainer.style.left = this.canvas.style.left =
          document.documentElement.scrollLeft + "px";
        this.gameContainer.style.top = this.canvas.style.top =
          document.documentElement.scrollTop + "px";

        this.navigation.style.right = "10px";
        this.navigation.style.top =
          document.documentElement.scrollTop +
          document.body.clientHeight -
          this.navigation.clientHeight -
          10 +
          "px";
      }

      // clear
      if (
        forceChange ||
        this.bullets.length != 0 ||
        this.particles.length != 0 ||
        !this.pos.is(this.lastPos) ||
        this.vel.len() > 0
      ) {
        this.ctx.clear();

        // draw player
        this.ctx.drawPlayer();

        // draw flames
        if (drawFlame) this.ctx.drawFlames(that.flame);

        // draw bullets
        if (this.bullets.length) {
          this.ctx.drawBullets(this.bullets);
        }

        // draw particles
        if (this.particles.length) {
          this.ctx.drawParticles(this.particles);
        }
      }
      this.lastPos = this.pos;
      forceChange = false;
    };

    // Start timer
    var updateFunc = function () {
      //try {
      that.update.call(that);
      /*}
        catch (e) {
            clearInterval(interval);
            throw e;
        }*/
    };
    var interval = setInterval(updateFunc, 1000 / FPS);

    function destroy() {
      clearInterval(interval);
      removeEvent(document, "keydown", eventKeydown);
      removeEvent(document, "keypress", eventKeypress);
      removeEvent(document, "keyup", eventKeyup);
      removeEvent(window, "resize", eventResize);
      isRunning = false;
      removeStylesheet("ASTEROIDSYEAHSTYLES");
      removeClass(document.body, "ASTEROIDSYEAH");
      if (this.highscores) this.highscores.hide();
      this.gameContainer.parentNode.removeChild(this.gameContainer);
    }
  }

  if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
  window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length] = new Asteroids();
};

window.playAsteroids();
window.screensaver = true;
