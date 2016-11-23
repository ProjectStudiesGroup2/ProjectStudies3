var arrow = new THREE.ArrowHelper(
			new THREE.Vector3( 0, 0.5, 0.5 ),
			new THREE.Vector3( 15, 0.5, 0.5),
			15,
			0xff3300
		);

arrow.position.set(0, -5, 0);
	if (collisionDet == true) {	
if (team1.player.position.z >= 65 || team1.player.position.z <= -65) 
        {     
           arrow.position.set.z = team2.player.position.z;
    }
 }
  else if (collisionDet2 == true) {          
if (team2.player.position.z >= 65 || team2.player.position.z <= -65) 
        {
              arrow.position.set.z = team2.player.position.z;
                    
        }  
    }

function toggle() {
	var ele = document.getElementById("scale");
	var elee = document.getElementById("scale1");
	var eleee = document.getElementById("scale2");

    	ele.style.display = "block";
    	elee.style.display = "block";
    	eleee.style.display = "block";
    	scene.add(arrow);

  	}
	
function untoggle() {
	var ele = document.getElementById("scale");
	var elee = document.getElementById("scale1");
	var eleee = document.getElementById("scale2");

    	ele.style.display = "none";
    	elee.style.display = "none";
    	eleee.style.display = "none";

  	}
	