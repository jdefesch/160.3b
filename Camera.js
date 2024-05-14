class Camera {
    constructor() {
        this.eye = new Vector3([0, 0, -1]);
        this.at = new Vector3([0, 0, 0]);
        this.up = new Vector3([0, 1, 0]);

        this.viewMat = new Matrix4();
        this.setLookAt();
    }

    getDirection() {
        // Calculate the direction vector from eye to at and normalize
        var direction = new Vector3([
            this.at.elements[0] - this.eye.elements[0],
            this.at.elements[1] - this.eye.elements[1],
            this.at.elements[2] - this.eye.elements[2]
        ]).normalize();
        return direction;
    }

    getRightVector() {
        let direction = this.getDirection();
        // Compute the right vector using cross product of direction and up vector, then normalize
        let right = new Vector3([
            direction.elements[1] * this.up.elements[2] - direction.elements[2] * this.up.elements[1],
            direction.elements[2] * this.up.elements[0] - direction.elements[0] * this.up.elements[2],
            direction.elements[0] * this.up.elements[1] - direction.elements[1] * this.up.elements[0]
        ]).normalize();
        return right;
    }

    forward() {
        let direction = this.getDirection();
        for (let i = 0; i < 3; i++) {
            this.eye.elements[i] += direction.elements[i] * 0.2;
            this.at.elements[i] += direction.elements[i] * 0.2;
        }
        this.setLookAt();
    }

    back() {
        let direction = this.getDirection();
        for (let i = 0; i < 3; i++) {
            this.eye.elements[i] -= direction.elements[i] * 0.2;
            this.at.elements[i] -= direction.elements[i] * 0.2;
        }
        this.setLookAt();
    }

    left() {
        let rightVector = this.getRightVector();
        for (let i = 0; i < 3; i++) {
            this.eye.elements[i] -= rightVector.elements[i] * 0.2;
            this.at.elements[i] -= rightVector.elements[i] * 0.2;
        }
        this.setLookAt();
    }

    right() {
        let rightVector = this.getRightVector();
        for (let i = 0; i < 3; i++) {
            this.eye.elements[i] += rightVector.elements[i] * 0.2;
            this.at.elements[i] += rightVector.elements[i] * 0.2;
        }
        this.setLookAt();
    }



    rotateView(angleDeg) {
        const angleRad = angleDeg * Math.PI / 180;
        const cosTheta = Math.cos(angleRad);
        const sinTheta = Math.sin(angleRad);

        const directionVector = new Vector3([
            this.at.elements[0] - this.eye.elements[0],
            this.at.elements[1] - this.eye.elements[1],
            this.at.elements[2] - this.eye.elements[2]
        ]);

        // Rotation matrix components for rotation around the up vector
        let x = this.up.elements[0], y = this.up.elements[1], z = this.up.elements[2];
        const ux = x * directionVector.elements[0];
        const uy = x * directionVector.elements[1];
        const uz = x * directionVector.elements[2];

        const vx = y * directionVector.elements[0];
        const vy = y * directionVector.elements[1];
        const vz = y * directionVector.elements[2];

        const wx = z * directionVector.elements[0];
        const wy = z * directionVector.elements[1];
        const wz = z * directionVector.elements[2];

        directionVector.elements[0] = (ux + (directionVector.elements[0] * (y*y + z*z) - x * (vy + wz)) * cosTheta + (-wy + vz) * sinTheta);
        directionVector.elements[1] = (uy + (directionVector.elements[1] * (x*x + z*z) - y * (ux + wz)) * cosTheta + (wx - uz) * sinTheta);
        directionVector.elements[2] = (uz + (directionVector.elements[2] * (x*x + y*y) - z * (ux + vy)) * cosTheta + (-vx + uy) * sinTheta);

        this.at.elements[0] = this.eye.elements[0] + directionVector.elements[0];
        this.at.elements[1] = this.eye.elements[1] + directionVector.elements[1];
        this.at.elements[2] = this.eye.elements[2] + directionVector.elements[2];

        this.setLookAt();
    }

    panRight(angle=5) {
        this.rotateView(-1*angle); 
    }

    panLeft(angle=5) {
        this.rotateView(angle); 
    }

    setLookAt() {
        this.viewMat.setLookAt(...this.eye.elements, ...this.at.elements, ...this.up.elements);
    }
}
