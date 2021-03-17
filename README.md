
# Asteroids

_Audio pimped up version of Erkie's awesome Asteroids bookmarklet: https://github.com/erkie/erkie.github.com_


## Usage

On any web site:

```
<script>
    function loadAsteroids() {
        var script = document.createElement("script");
        script.setAttribute('type', 'text/javascript');
        script.src = "https://dominiek.github.io/asteroids/run.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
</script>
<div onclick="loadAsteroids();" style="font-size: 8px; color: #ccc; display: block; position: absolute; right: 10px; bottom: 10px">π</div>
```
