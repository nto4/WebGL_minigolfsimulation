
var canvas;
var gl;
var k=0;
var program;
var i=0;
var l=0;
var numTimesToSubdivide = 5;
var c=true;
var index = 0;
var t=0;
var mvStack = [];

var pointsArray = [];
var colorArray = [];
var texCoordsArray = [];
 var normalsArray = [];
var vTexCoord;
var verticesSilin = [];
var vertexColor = [];
var v0 = 0;  
var zmin = 1.0;
var zmax = 50.0;
//类别
var wingColor = 1;
var bodyColor = 2;

//扇翅膀的幅度
var flap = 0;
var flap2 = 0;
var turn = false;
var startFlap = false;
var numPoints  = 0;

var near = 0.1;
var far = 50.0;
var radius = 4.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;
var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect=0.7;
var left = -2.0;
var right = 2.0;
var ytop = 2.0;
var bottom = -2.0;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var lightPosition = vec4(-2.0, -2.0, -2.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 200.0;

var ctm;
var ambientColor, diffuseColor, specularColor;
var eye;
var eyeLoc;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

//  正方形纹理坐标
var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];
var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];   
var numVertices = 18;

var vertices1 = [
    vec4( -2, -0.5,  10, 1.0 ),
        vec4( -2,  0, 10, 1.0 ),
        vec4(  2,  0,  10, 1.0 ),
        vec4(  2, -0.5, 10, 1.0 ),
        vec4( -2, -0.5, -20, 1.0 ),
        vec4( -2,  0, -20, 1.0 ),
        vec4(  2,  0, -20, 1.0 ),
        vec4(  2, -0.5, -20, 1.0 )
];
var verticesb = [
    vec4( -0.5, -0.5,  0.1, 1.0 ),
        vec4( -0.5,  0.5,  0.1, 1.0 ),
        vec4(  0.5,  0.5,  0.1, 1.0 ),
        vec4(  0.5, -0.5,  0.1, 1.0 ),
        vec4( -0.5, -0.5, 0, 1.0 ),
        vec4( -0.5,  0.5, 0, 1.0 ),
        vec4(  0.5,  0.5, 0, 1.0 ),
        vec4(  0.5, -0.5, 0, 1.0 )
];
var vertices2 = [
    vec4( -5.5, 0.0,  zmax, 1.0 ),
    vec4( -5.5,  0.0,  zmin, 1.0 ),
    vec4( 5.5, 0.0,  zmin, 1.0 ),
    vec4( 5.5,  0.0,  zmax, 1.0 ),
];
var verticess = [
        vec4( -0.19, 0.4,  0.5, 1.0 ),
        vec4( -0.15,  0.1,  0.5, 1.0 ),
		
        vec4(  -0.1,  -0.2,  0.5, 1.0 ),
        vec4(  0.4, -0.5,  0.5, 1.0 ),
        vec4( 0.8, -0.2, 0.5, 1.0 ),
        vec4( 0.9,  0.1, 0.5, 1.0 ),
		vec4( 0.8, 0.8,  0.5, 1.0 ),
        vec4( 0.7,  0.9,  0.5, 1.0 ),
		vec4( -0.19, 0.4,  0.3, 1.0 ),
        vec4( -0.15,  0.1,  0.3, 1.0 ),
        vec4(  -0.1,  -0.2,  0.3, 1.0 ),
        vec4(  0.4, -0.5,  0.3, 1.0 ),
        vec4( 0.8, -0.2, 0.3, 1.0 ),
        vec4( 0.9,  0.1, 0.3, 1.0 ),
		vec4( 0.8, 0.8,  0.3, 1.0 ),
        vec4( 0.7,  0.9,  0.3, 1.0 ),
       
        
        
		
    ];
var verticesd = [
    vec4( -0.5, 0,  -0.5, 1.0 ),
    vec4( -0.75,  0,  -0.25, 1.0 ),
    vec4( -0.75,  0,  0, 1.0 ),
    vec4( -0.50, 0,  0.25, 1.0 ),
    vec4( -0.25, 0, 0.25, 1.0 ),
    vec4( 0,  0, 0, 1.0 ),
    vec4( 0,  0, -0.25, 1.0 ),
    vec4( -0.25, 0, -0.50, 1.0 ),
	 vec4( -0.5, -0.4,  -0.5, 1.0 ),
    vec4( -0.75,  -0.4,  -0.25, 1.0 ),
    vec4( -0.75, - 0.4,  0, 1.0 ),
    vec4( -0.50, -0.4,  0.25, 1.0 ),
    vec4( -0.25, -0.4, 0.25, 1.0 ),
    vec4( 0,  -0.4, 0, 1.0 ),
    vec4( 0, - 0.4, -0.25, 1.0 ),
    vec4( -0.25, -0.4, -0.50, 1.0 ),
];
function quad(a, b, c, d) {
	var t1 = subtract(verticesSilin[b], verticesSilin[a]);
     var t2 = subtract(verticesSilin[c], verticesSilin[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);
    pointsArray.push(verticesSilin[a]);
     colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticesSilin[b]);
     colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[1]);
normalsArray.push(normal)
    pointsArray.push(verticesSilin[c]);
    colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticesSilin[a]);
     colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticesSilin[c]);
     colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticesSilin[d]);
     colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[3]);
	normalsArray.push(normal)
}
function quad1(a, b, c, d) {
	 var t1 = subtract(vertices1[b], vertices1[a]);
     var t2 = subtract(vertices1[c], vertices1[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);
    pointsArray.push(vertices1[a]);
	 normalsArray.push(normal);
     colorArray.push(vertexColors[3]);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vertices1[b]);
	 normalsArray.push(normal);
     colorArray.push(vertexColors[3]);
    texCoordsArray.push(texCoord[1]);

    pointsArray.push(vertices1[c]);
	 normalsArray.push(normal);
     colorArray.push(vertexColors[3]);
    texCoordsArray.push(texCoord[2]);

    pointsArray.push(vertices1[a]);
	 normalsArray.push(normal);
     colorArray.push(vertexColors[3]);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vertices1[c]);
	 normalsArray.push(normal);
     colorArray.push(vertexColors[3]);
    texCoordsArray.push(texCoord[2]);

    pointsArray.push(vertices1[d]);
	 normalsArray.push(normal);
     colorArray.push(vertexColors[3]);
    texCoordsArray.push(texCoord[3]);
}
function quadb(a, b, c, d) {
	var t1 = subtract(verticesb[b], verticesb[a]);
     var t2 = subtract(verticesb[c], verticesb[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);
    pointsArray.push(verticesb[a]);
	normalsArray.push(normal) 
    colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(verticesb[b]);
	normalsArray.push(normal)
     colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[1]);
normalsArray.push(normal)
    pointsArray.push(verticesb[c]);
     colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticesb[a]);
     colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticesb[c]);
     colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticesb[d]);
     colorArray.push(vertexColors[6]);
    texCoordsArray.push(texCoord[3]);
}
function quad2(a, b, c, d) {
	var t1 = subtract(vertices2[b], vertices2[a]);
     var t2 = subtract(vertices2[c], vertices2[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);
    pointsArray.push(vertices2[a]);
     colorArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(vertices2[b]);
     colorArray.push(vertexColors[b]);
    texCoordsArray.push(texCoord[1]);
normalsArray.push(normal)
    pointsArray.push(vertices2[c]);
     colorArray.push(vertexColors[c]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(vertices2[a]);
     colorArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(vertices2[c]);
     colorArray.push(vertexColors[c]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(vertices2[d]);
     colorArray.push(vertexColors[d]);
    texCoordsArray.push(texCoord[3]);
	normalsArray.push(normal)
}
function colorCubes()
{
    quads( 0, 1, 6, 7 );
    quads( 1, 2, 5, 6 );
    quads( 2, 3, 4, 5 );
	quads( 8, 9, 1, 0 );
    quads( 9, 10, 2, 1 );
    quads( 10, 11, 3, 2 );
	quads( 11, 12, 4, 3 );
	quads( 12, 13, 5, 4 );
    quads( 13, 14, 6, 5 );
    quads( 14, 15, 11, 12 );
	quads( 15, 8, 0, 7 );
	quads( 15, 14, 9, 8 );
    quads( 14, 13, 10, 9 );
	quads( 13, 12, 11, 10 );
  
    
}

function quads(a, b, c, d) 
{
	var t1 = subtract(verticess[b], verticess[a]);
     var t2 = subtract(verticess[c], verticess[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);
  pointsArray.push(verticess[a]);
     colorArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticess[b]);
     colorArray.push(vertexColors[b]);
    texCoordsArray.push(texCoord[1]);
normalsArray.push(normal)
    pointsArray.push(verticess[c]);
     colorArray.push(vertexColors[c]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticess[a]);
     colorArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticess[c]);
     colorArray.push(vertexColors[c]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticess[d]);
     colorArray.push(vertexColors[d]);
    texCoordsArray.push(texCoord[3]);
normalsArray.push(normal)
    
}
function quadd(a, b, c, d) 
{
	var t1 = subtract(verticess[b], verticess[a]);
     var t2 = subtract(verticess[c], verticess[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);
  pointsArray.push(verticesd[a]);
     colorArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticesd[b]);
     colorArray.push(vertexColors[b]);
    texCoordsArray.push(texCoord[1]);
normalsArray.push(normal)
    pointsArray.push(verticesd[c]);
     colorArray.push(vertexColors[c]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticesd[a]);
     colorArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticesd[c]);
     colorArray.push(vertexColors[c]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticesd[d]);
     colorArray.push(vertexColors[d]);
    texCoordsArray.push(texCoord[3]);
normalsArray.push(normal)
    
}
function texCube() {
    quad1(1, 0, 3, 2);
   quad1(2, 3, 7, 6);
   quad1(3, 0, 4, 7);
    quad1(6, 5, 1, 2);
    quad1(4, 5, 6, 7);
    quad1(5, 4, 0, 1);

}
function texBay() {
    quadb(1, 0, 3, 2);
   quadb(2, 3, 7, 6);
   quadb(3, 0, 4, 7);
    quadb(6, 5, 1, 2);
    quadb(4, 5, 6, 7);
    quadb(5, 4, 0, 1);

}
function texCubed() {
    quadd(0, 1, 6, 7);
   quadd(1, 2, 5, 6);
   quadd(2, 3, 4, 5);
   quadd(8, 0, 7, 15);
    quadd(3, 4, 11, 12);

}

function configureTexture0( image ) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    //  先进行绑定
    gl.uniform1i(gl.getUniformLocation(program, "texture0"), 0);
}
function configureTexture1(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    //  先进行绑定
    gl.uniform1i(gl.getUniformLocation(program, "texture1"), 1);
}
function configureTexture2(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    //  先进行绑定
    gl.uniform1i(gl.getUniformLocation(program, "texture2"), 2);
}
function triangle(a, b, c,type) {
    normalsArray.push(a[0],a[1], a[2], 0.0);
     normalsArray.push(b[0],b[1], b[2], 0.0);
     normalsArray.push(c[0],c[1], c[2], 0.0);
		
     pointsArray.push(a);
	 console.log(a);
	 
     texCoordsArray.push(texCoord[0]);
	 colorArray.push(vertexColors[2]);
	
     pointsArray.push(b);
     texCoordsArray.push(texCoord[1]);
	 colorArray.push(vertexColors[1]);
		
     pointsArray.push(c);
     texCoordsArray.push(texCoord[2]);
    colorArray.push(vertexColors[2]);
     index += 3;
}


function divideTriangle(a, b, c, count) {
    if ( count > 0 ) {

        var ab = normalize(mix( a, b, 0.5), true);
        var ac = normalize(mix( a, c, 0.5), true);
        var bc = normalize(mix( b, c, 0.5), true);

        divideTriangle( a, ab, ac, count - 1);
        divideTriangle( ab, b, bc, count - 1);
        divideTriangle( bc, c, ac, count - 1);
        divideTriangle( ab, bc, ac, count - 1);
    }
    else { // draw tetrahedron at end of recursion
	
        triangle( a, b, c);
    }
}

function tetrahedron(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}



window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 0.0, 1.0, 1.0 );
     gl.enable(gl.DEPTH_TEST);
    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
 ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);
    var va = vec4(0.0, 0.0, -1.0, 1);
    var vb = vec4(0.0, 0.942809, 0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
    var vd = vec4(0.816497, -0.471405, 0.333333, 1);

     //texCube();

    //--------------wingRight1_1
  // tetrahedron(va, vb, vc, vd, numTimesToSubdivide,wingColor);
    //--------------wingRight1_2
   //tetrahedron(va, vb, vc, vd, numTimesToSubdivide,bodyColor);
	
//truncCone(0.1, [0.5, -0.7, 0.0]);
texCube();
 //colorCubes();
 //texCubed();
 //truncCone(0.1, [0.1, -0.7, 0.0]);
 texBay();
 tetrahedron(va, vb, vc, vd, numTimesToSubdivide,wingColor);
 tetrahedron(va, vb, vc, vd, numTimesToSubdivide,bodyColor);
 truncCone(0.1, [0.4, -0.7, 0.0]);
 var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );
    
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(colorArray),gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program,"vColor");
    gl.vertexAttribPointer(vColor,4,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vColor);

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    var tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);

    vTexCoord = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);

    document.getElementById("Button0").onclick = function(){theta += dr;};
    document.getElementById("Button1").onclick = function(){theta -= dr;};
    document.getElementById("Button2").onclick = function(){phi += dr;};
    document.getElementById("Button3").onclick = function(){phi -= dr;};

    document.getElementById("Button4").onclick = function(){
        if(!startFlap){
            startFlap = true;
        }else{
            startFlap = false;
        }
    };

    var image = document.getElementById("texImage");
	
    configureTexture0(image);

    var image1 = document.getElementById("texImage2");

    configureTexture1(image1);
 var image2 = document.getElementById("texImage1");
    configureTexture2(image2);
	
	 gl.uniform4fv( gl.getUniformLocation(program, 
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "specularProduct"),flatten(specularProduct) );	
    gl.uniform4fv( gl.getUniformLocation(program, 
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, 
       "shininess"),materialShininess );
    render();
}


function body(){

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

   
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.disableVertexAttribArray(vTexCoord);

    for( var i=index/2+72; i<index; i+=3) 
       gl.drawArrays( gl.TRIANGLES, i, 3 );

console.log(i);

}


function butterFlyOne(){

   eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        radius*Math.sin(theta)*Math.sin(phi)+1.0, radius*Math.cos(theta));
gl.uniform3fv(gl.getUniformLocation(program,
       "eyePosition"), flatten(eye));
  modelViewMatrix = lookAt(eye, at , up);
   projectionMatrix = perspective(fovy, aspect, near, far);

   // mvStack.push(modelViewMatrix);

    //body的矩阵变换
    modelViewMatrix = mult(modelViewMatrix,translate(0.0,0.1,2.0));
    modelViewMatrix = mult(modelViewMatrix,scalem(0.04,0.06,0.06));
	//modelViewMatrix = mult(modelViewMatrix,rotate(-20-i*1000,[1,0,0]));
	//modelViewMatrix = mult(modelViewMatrix,rotate(-20-i*100,[0,0,1]));
    //modelViewMatrix = mult(modelViewMatrix,scalem(0.3,0.3,0.3));
	console.log(pointsArray[100]);
	console.log(modelViewMatrix);
    body();
   
    //
    
}

function cube(){
   eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
       radius*Math.sin(theta)*Math.sin(phi)+1.0, radius*Math.cos(theta));
     // eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        // radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
gl.uniform4fv( gl.getUniformLocation(program, 
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "specularProduct"),flatten(specularProduct) );	
    gl.uniform4fv( gl.getUniformLocation(program, 
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, 
       "shininess"),materialShininess );
   modelViewMatrix = lookAt(eye, at , up);
   projectionMatrix = perspective(fovy, aspect, near, far);

	   
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 0);
    gl.activeTexture(gl.TEXTURE1);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES,  0, 36);

}
function cylinder(){
     eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
       radius*Math.sin(theta)*Math.sin(phi)+1.0, radius*Math.cos(theta));
     // eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        // radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

    modelViewMatrix = lookAt(eye, at , up);
  projectionMatrix = perspective(fovy, aspect, near, far);
    modelViewMatrix = mult(modelViewMatrix,translate(-0.05,0.22,2.02));
modelViewMatrix = mult(modelViewMatrix,scalem(0.1,0.2,0.1));
//modelViewMatrix = mult(modelViewMatrix,rotate(-40+i*20,[1,0,0]));
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 2);
    gl.activeTexture(gl.TEXTURE1);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 24648, 2148);

}
function cylinder2(){
     eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
       radius*Math.sin(theta)*Math.sin(phi)+1.0, radius*Math.cos(theta));
     // eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        // radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
 modelViewMatrix = lookAt(eye, at , up);
 projectionMatrix = perspective(fovy, aspect, near, far);
   modelViewMatrix = mult(modelViewMatrix,translate(0.0,0.1,2));
modelViewMatrix = mult(modelViewMatrix,scalem(0.05,0.05,0.05));
//modelViewMatrix = mult(modelViewMatrix,rotate(i*20,0,1,0));
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 0);
    gl.activeTexture(gl.TEXTURE1);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 26760, 84);

}
function delik(){
	
     eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
       radius*Math.sin(theta)*Math.sin(phi)+1.0, radius*Math.cos(theta));
     // eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        // radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
 modelViewMatrix = lookAt(eye, at , up);
 projectionMatrix = perspective(fovy, aspect, near, far);
   modelViewMatrix = mult(modelViewMatrix,translate(0.04,0.005,-2.00));
modelViewMatrix = mult(modelViewMatrix,scalem(0.2,0.2,0.2));
//modelViewMatrix = mult(modelViewMatrix,rotate(i*20,1,0,0));
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 0);
    gl.activeTexture(gl.TEXTURE1);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 26844, 30);

}
function direkb(){
     eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
       radius*Math.sin(theta)*Math.sin(phi)+1.0, radius*Math.cos(theta));
     // eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        // radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

    modelViewMatrix = lookAt(eye, at , up);
  projectionMatrix = perspective(fovy, aspect, near, far);
    modelViewMatrix = mult(modelViewMatrix,translate(-0.08,0.2,-2.02));
modelViewMatrix = mult(modelViewMatrix,scalem(0.1,0.3,0.2));
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 0);
    gl.activeTexture(gl.TEXTURE0);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 26874, 2148);

}
function bayrak(){
     eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
       radius*Math.sin(theta)*Math.sin(phi)+1.0, radius*Math.cos(theta));
     // eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        // radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

    modelViewMatrix = lookAt(eye, at , up);
  projectionMatrix = perspective(fovy, aspect, near, far);
    modelViewMatrix = mult(modelViewMatrix,translate(0.02,0.5,-2.02));
modelViewMatrix = mult(modelViewMatrix,scalem(0.2,0.2,0.2));
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 2);
    gl.activeTexture(gl.TEXTURE0);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 36, 36);

}
function truncCone(size, loc) {
    var x, y, z;
    var r, g, b;
    var degrees;
    var thetar;

    v0 = verticesSilin.length;  // Capture the first vertex index.

    for (degrees = 0; degrees < 360; degrees += 2) {
        thetar = toradians(degrees);
        //x'=size*x + loc[0]
        // bottom circle of cone
        x =  0.4*Math.cos(thetar);
        y =  0.0;
        z =  0.4*Math.sin(thetar);

        x = size*x + loc[0];
        y = size*y + loc[1];
        z = size*z + loc[2];

        verticesSilin.push(vec4(x, y, z, 1.0));

       // r =  3.2404542*x - 1.5371385*y - 0.4985314*z;
        //g = -0.9692660*x + 1.8760108*y + 0.0415560*z;
        //b =  0.0556434*x - 0.2040259*y + 1.0572252*z;
        vertexColor.push(vec4(x, y, z, 1.0));

        // top circle of cone
        x =  0.4*Math.cos(thetar);
        y =  20;
        z =  0.4*Math.sin(thetar);

        x = size*x + loc[0];
        y = size*y + loc[1];
        z = size*z + loc[2];

        verticesSilin.push(vec4(x, y, z, 1.0));

       // r =  3.2404542*x - 1.5371385*y - 0.4985314*z;
        //g = -0.9692660*x + 1.8760108*y + 0.0415560*z;
        //b =  0.0556434*x - 0.2040259*y + 1.0572252*z;
        vertexColor.push(vec4(x, y, z, 1.0));
    }

    for( var i=0 ; i<357; i++ ) {
        quad(i, i+2, i+3, i+1);
    }
    quad(358, 0, 1, 359);
}


function toradians(deg)
{
   return deg * Math.PI / 180.0;
}





function render() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  
    butterFlyOne();
	
	cylinder();
	cube();
	//cylinder2();
	delik();
	//direkb();
	bayrak();
	console.log(pointsArray[26795]);
	console.log("SESADA");
	//butterFlyOne();
	var a;
	
   /*i=i+0.01;
   console.log(pointsArray[10][2]);
   console.log(pointsArray[26845][2]);
   if(l>=0.0){
   if(i<1.70){
	  k=k+0.1;
	  t=t+0.01;
	  l=l+0.005;
	  //i=i-3.30;
	    
   }
   else
	   l=l-0.005;
   }
   else
	   l=0.0;*/
    window.requestAnimFrame(render);


}
