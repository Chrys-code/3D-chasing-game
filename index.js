window.onload = () => {
    const trump = {
        object: document.querySelector('#trump-doll'),
        position: function(x,y,z) {
            const curPos = this.object.getAttribute("position");
            return  curPos   //{x:curPos.x, y:curPos.y, z:curPos.z,}
        },
        follow: function(cameraPos, trumpPos, velocity) {
            
            let zScale = Math.abs(cameraPos.z - trumpPos.z)
            let xScale = Math.abs(cameraPos.x - trumpPos.x) 


            velocity != 0 && cameraPos.x > trumpPos.x 
            ?  this.object.setAttribute("position", {
                    x: trumpPos.x + velocity * xScale/1000,
                    y: trumpPos.y,
                    z: trumpPos.z,
                })
               : this.object.setAttribute("position", {
                    x: trumpPos.x - velocity * xScale/1000,
                    y: trumpPos.y,
                    z: trumpPos.z,
                });
                //////////////////////////////
            velocity != 0 && cameraPos.z > trumpPos.z
            ?    this.object.setAttribute("position", {
                    x: trumpPos.x,
                    y: trumpPos.y,
                    z: trumpPos.z  + velocity * zScale/1000,
                }) 
                : this.object.setAttribute("position", {
                    x: trumpPos.x,
                    y: trumpPos.y,
                    z: trumpPos.z  - velocity * zScale/1000,
                });
        },

        poke: function() {

            let polarityAxisX = Math.floor(Math.random() * Math.floor(2))
            let polarityAxisZ = Math.floor(Math.random() * Math.floor(2))
            let randomPosX = Math.random() * 30;
            let randomPosZ = Math.random() * 30;

                this.object.setAttribute("position", {
                    x: polarityAxisX == 1 ? -(randomPosX) : randomPosX,
                    y: 0,
                    z: polarityAxisZ == 1 ? -(randomPosZ) : randomPosZ,
                })
        }
    }

    const trump2 = {
        object: document.querySelector('#trump2-doll'),
        position: function(x,y,z) {
            const curPos = this.object.getAttribute("position");
            return  curPos   //{x:curPos.x, y:curPos.y, z:curPos.z,}
        },
        follow: function(cameraPos, trumpPos, velocity) {
            
            let zScale = Math.abs(cameraPos.z - trumpPos.z)
            let xScale = Math.abs(cameraPos.x - trumpPos.x) 


            velocity != 0 && cameraPos.x > trumpPos.x 
            ?  this.object.setAttribute("position", {
                    x: trumpPos.x + velocity * xScale/1000,
                    y: trumpPos.y,
                    z: trumpPos.z,
                })
               : this.object.setAttribute("position", {
                    x: trumpPos.x - velocity * xScale/1000,
                    y: trumpPos.y,
                    z: trumpPos.z,
                });
                //////////////////////////////
            velocity != 0 && cameraPos.z > trumpPos.z
            ?    this.object.setAttribute("position", {
                    x: trumpPos.x,
                    y: trumpPos.y,
                    z: trumpPos.z  + velocity * zScale/1000,
                }) 
                : this.object.setAttribute("position", {
                    x: trumpPos.x,
                    y: trumpPos.y,
                    z: trumpPos.z  - velocity * zScale/1000,
                });
        },

        poke: function() {

            let polarityAxisX = Math.floor(Math.random() * Math.floor(2))
            let polarityAxisZ = Math.floor(Math.random() * Math.floor(2))
            let randomPosX = Math.random() * 30;
            let randomPosZ = Math.random() * 30;

                this.object.setAttribute("position", {
                    x: polarityAxisX == 1 ? -(randomPosX) : randomPosX,
                    y: 0,
                    z: polarityAxisZ == 1 ? -(randomPosZ) : randomPosZ,
                })
        }
    }

    


    const camera = {
        object: document.querySelector('[camera]'),
        position: function(x,y,z) {
            const currPos = this.object.getAttribute("position");
            return {x:currPos.x, z:currPos.z}
        }, 
    }
    const game = {
        run: false,
        level: 1,
        refreshTime: 1,
        collusionDistance: 1,
        velocity: 0,
        start: function(run, refreshTime, velocityValue) {
            if (run == false) {
                this.run = true;
                this.velocity = velocityValue;
                setInterval(() => {
                    trump.follow(camera.position(), trump.position(), this.velocity);
                    this.over(camera.position(), trump.position(), trump2.position(), this.collusionDistance);

                    if (this.level == 2) {
                        trump2.follow(camera.position(), trump2.position(), this.velocity);
                    }

                }, refreshTime);
            } else {
                return null
            }
        },
        over: function(cameraPos, trumpPos, trump2Pos, collusionDistance) {
            if (( Math.abs(cameraPos.z - trumpPos.z) < Math.abs(collusionDistance)) && ( Math.abs(cameraPos.x - trumpPos.x) < Math.abs(collusionDistance)) || ( Math.abs(cameraPos.z - trump2Pos.z) < Math.abs(collusionDistance)) && ( Math.abs(cameraPos.x - trump2Pos.x) < Math.abs(collusionDistance)) ) {
                var r = confirm("Game Over!");
                if(r==true){
                    location.reload();     
                }
            }


        }
    }
    window.addEventListener('keydown', (e) => {
        game.start(game.run, game.refreshTime, 3);
    });

    trump.object.addEventListener('click', (e) => {
        trump.poke();
    })

    trump2.object.addEventListener('click', (e) => {
        trump2.poke();
    })

    const scene = document.querySelector("a-scene");
   const level = document.querySelector("#level");
   level.addEventListener("change", ()=> {
       game.level = level.value;
 
   })

}