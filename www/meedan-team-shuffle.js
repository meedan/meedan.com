
//
// Shuffle content onload
var list = document.getElementById("team");

function shuffle(items)
{
    var cached = items.slice(0), temp, i = cached.length, rand;
    while(--i)
    {
        rand = Math.floor(i * Math.random());
        temp = cached[rand];
        cached[rand] = cached[i];
        cached[i] = temp;
    }
    return cached;
}

function shuffleNodes()
{
    var nodes = list.children, i = 0;
    nodes = Array.prototype.slice.call(nodes);
    nodes = shuffle(nodes);
    while(i < nodes.length)
    {
        list.appendChild(nodes[i]);
        ++i;
    }
}

// We could expand this to other keypresses

var KEY = {
  ZERO:  48
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case KEY.ZERO:
          shuffleNodes();
          break;

        default:
            return; // exit this handler for other keys
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
  shuffleNodes();
});
