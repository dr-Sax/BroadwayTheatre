export class MarkerMover {
    constructor(marker, img, init_angle) {
        this.intervalId = null;
        this.img = img;
        this.angle_iter = init_angle;
        this.circ_radii = 0.5;
        
        marker.addEventListener("targetFound", event => {
            console.log("front marquee target found");
            
            this.intervalId = setInterval(() => {
                // Get current position - A-Frame returns an object, not a string
                const cur_position = this.img.getAttribute('position');
                
                // A-Frame position is an object with x, y, z properties
                const position_x = this.circ_radii * Math.sin(this.angle_iter);
                const position_y = this.circ_radii * Math.cos(this.angle_iter);
                const position_z = parseFloat(cur_position.z);
                
                // Try both string and object methods
                const next_position_string = `${position_x} ${position_y} ${position_z}`;
                
                // Try setting as string first
                this.img.setAttribute('position', next_position_string);

                this.angle_iter += 0.05;
            }, 
            10
            ); 
        });

        marker.addEventListener("targetLost", event => {
            console.log("front marquee target lost");
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
                this.angle_iter = init_angle;
            }
        });

    }
}