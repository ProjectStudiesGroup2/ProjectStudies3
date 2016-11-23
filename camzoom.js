var campo= true;


function camin(){

if(campo==true){
    if(camera.position.z>2){
      camera.position.z-=.01;
    }
    else {
      campo = false;
      camout()
    }
}

else if(campo==false){
  camout();
  console.log(camera.position.z);
}
}

function camout(){
  if(camera.position.z<6){
    camera.position.z+=.1;
    console.log('going out')
  }
  else{
    campo=true;
  }
}
