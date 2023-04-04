function addPlayer(id, position) {
  if (id === socket.id) return;
  console.log(`adding ${id} on ${JSON.stringify(position)}`);
  var scene = document.querySelector("a-scene");
  var newPlayer = document.createElement("a-box");
  newPlayer.setAttribute("id", id);
  //newPlayer.setAttribute("player");
  newPlayer.setAttribute("position", JSON.parse(JSON.stringify(position)));
  scene.appendChild(newPlayer);
}
function removePlayer(id) {
  var player = document.querySelector(`#${id}`);
  player.parentNode.removeChild(player);
}
const url = window.location.href;
var socket = io(url);

socket.on("newPlayer", ({ id, position }) => {
  console.log("newPlayer");
  addPlayer(id, position);
});
socket.on("listOfPlayers", ({ players }) => {
  console.log("listOfPlayers");
  players.map((i) => addPlayer(i.id, i.position));

  console.log(players);
});
socket.on("hi", () => {
  console.log("hello");
});
socket.on("removePlayer", ({ id }) => {
  console.log(`${id} has disconnected`);
  removePlayer(id);
});
socket.on("movement", ({ id, position }) => {
  console.log(position);
  console.log(id);
  var target = document.getElementById(id);
  console.log(target);
  target.setAttribute("position", position);
});
socket.on("rotation", ({ id, rotation }) => {
  var target = document.getElementById(id);
  target.setAttribute("rotation", rotation);
});
