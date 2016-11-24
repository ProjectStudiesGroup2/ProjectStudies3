# **The football game**

Our project is a football game that can be played by two users. Players can take a team of for footballers,
switch between them and compete with another team during the game. Each player will have a score equals to
the number of goals that were done. The game follows the real football rules. 
Implemented using Three.js with physical engine.


## **Feature requirements**

*Multiplayer**
The game can be played by two users. There are two teams: Red and Blue. Each user has a top view from own goal gates side.
It is possible to choose a team and name it with any desired name.

**Switching between players in a team**
Both users are able to switch between the players in their own teams to generate some tactics and have better experience
from the gameplay.

**Dynamic camera**
The camera always focusing to the ball. It zooms in a bit when player with a ball get closer to the opponents goal gates.

**Sound effects**
The game has sounds producing from the surrounding environment. The ball has sounds of impact: beating from the field,
fence and gates; and also there is the sound of kick. In addition, there are sounds of other sources like audience.

**Gamepad support**
For the controls can be chosen both: keyboard and gamepad. Playing with gamepad provides better experience from a gameplay.

**Directing the balls kick with a mouse (or with a right stick on a gamepad)**
The game constantly defines the position of cursor on a field. After the kick, the ball goes to the cursor direction.
It is the same for passing it between players and making a goal.

**AI for non-played players**
If user controls one player from a team, he does not have to worry about other players – they will hold users back alone.
