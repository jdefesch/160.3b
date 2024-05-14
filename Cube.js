class Cube {
    constructor() {
        this.type = 'cube';
        this.color = color;
        this.matrix = new Matrix4();
        this.textureNum = -2;
        this.textureCoords = null;
    }

    render() {
        var rgba = this.color;
        gl.uniform4f(u_FragColor, ...rgba);
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Cubr front
        drawTriangle3DUV([0, 0, 0, 1, 1, 0, 1, 0, 0], this.textureCoords ? [0, 0, 1, 1, 1, 0] : [0, 0, 1, 1, 1, 0]);
        drawTriangle3DUV([0, 0, 0, 0, 1, 0, 1, 1, 0], this.textureCoords ? [0, 0, 0, 1, 1, 1] : [0, 0, 0, 1, 1, 1]);

        // Cubr back
        drawTriangle3DUV([0, 0, 1, 1, 1, 1, 1, 0, 1], this.textureCoords ? [0, 0, 0, 1, 1, 1] : [0, 0, 0, 1, 1, 1]);
        drawTriangle3DUV([0, 0, 1, 0, 1, 1, 1, 1, 1], this.textureCoords ? [0, 0, 1, 1, 1, 0] : [0, 0, 1, 1, 1, 0]);

        gl.uniform4f(u_FragColor, ...rgba.map(v => v * 0.8));

        // Cube right
        drawTriangle3D([1, 0, 0, 1, 1, 1, 1, 1, 0]);
        drawTriangle3D([1, 0, 0, 1, 1, 1, 1, 0, 1]);

        // Cube left
        drawTriangle3D([0, 0, 0, 0, 1, 1, 0, 1, 0]);
        drawTriangle3D([0, 0, 0, 0, 1, 1, 0, 0, 1]);

        gl.uniform4f(u_FragColor, ...rgba.map(v => v * 0.7));

        // Cube top
        drawTriangle3D([0, 1, 0, 0, 1, 1, 1, 1, 1]);
        drawTriangle3D([0, 1, 0, 1, 1, 1, 1, 1, 0]);

        // Cube bottom
        drawTriangle3D([0, 0, 0, 0, 0, 1, 1, 0, 1]);
        drawTriangle3D([0, 0, 0, 1, 0, 1, 1, 0, 0]);
    }


    renderFast() {

        var rgba = this.color;
        gl.uniform4f(u_FragColor, ...rgba)

        gl.uniform1i(u_whichTexture, this.textureNum);

        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements)

        let allVerts = []

        allVerts = allVerts.concat([0, 0, 0, 1, 1, 0, 1, 0, 0])
        allVerts = allVerts.concat([0, 0, 0, 0, 1, 0, 1, 1, 0])
        allVerts = allVerts.concat([0, 0, 1, 1, 1, 1, 1, 0, 1])
        allVerts = allVerts.concat([0, 0, 1, 0, 1, 1, 1, 1, 1])
        allVerts = allVerts.concat([1, 0, 0, 1, 1, 1, 1, 1, 0])
        allVerts = allVerts.concat([1, 0, 0, 1, 1, 1, 1, 0, 1])
        allVerts = allVerts.concat([0, 0, 0, 0, 1, 1, 0, 1, 0])
        allVerts = allVerts.concat([0, 0, 0, 0, 1, 1, 0, 0, 1])
        allVerts = allVerts.concat([0, 1, 0, 0, 1, 1, 1, 1, 1])
        allVerts = allVerts.concat([0, 1, 0, 1, 1, 1, 1, 1, 0])
        allVerts = allVerts.concat([0, 0, 0, 0, 0, 1, 1, 0, 1])
        allVerts = allVerts.concat([0, 0, 0, 1, 0, 1, 1, 0, 0])

        drawTriangle3D(allVerts)



    }
}
