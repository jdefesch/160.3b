class Triangle {
    constructor(point, color, size) {
        this.type = 'triangle';
        this.point = point;
        this.color = color;
        this.size = size;
    }

    render() {
        gl.vertexAttrib3f(a_Position, ...this.point, 0.0);
        gl.uniform4f(u_FragColor, ...this.color);
        gl.uniform1f(u_Size, this.size);

       //gl.drawArrays(gl.TRIANGLES, 0, 1);
       drawTriangle( [this.point[0], this.point[1], this.point[0] + (0.005 * this.size), this.point[1], this.point[0], this.point[1] + (0.005 * this.size)] )
    }
}

const drawTriangle = (vertices) => {
    var n = 3
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, n)
};

const drawTriangle3D = (vertices) => {
    var n = vertices.length / 3
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, n)
};

const drawTriangle3DUV = (vertices, uv) => {
    var n = 3
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);


    var uvBuffer = gl.createBuffer();
    if (!uvBuffer){
       console.log('Failed to create the buffer object');
       return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_UV);
 
    gl.drawArrays(gl.TRIANGLES, 0, n);
}
