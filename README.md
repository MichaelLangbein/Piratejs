Pirates.JS

A simple, socket based multiplayer browsergame. 

Strategy: 
 - state does only need to contain positions and velocities of all agents, plus events like explosions. 
 - server should own single source of truth, that is: state should be immutable on client
 - when client pushes a button, state is updated on server and rebroadcast on all clients
 - collision-detection should also happen on server only and trigger broadcast


Todos:
 - client: send out information via socket
 - dev: autobuild on changes



