
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
var anim_sopa=false;
var sopa_aci=0;
var pointsArray = [];
var colorArray = [];
var texCoordsArray = [];
 var normalsArray = [];
var vTexCoord;
var verticesSilin = [];
var vertexColor = [];
var v0 = 0;  
var vurus_gucu=-3;
var top_hareket=0;
var top_hareket_tf=false;
var top_durma=false;
var top_d=0;
var top_dx=0;
var hiz=2;
var düsme=0;
var x_hareket=2.0;
var delik_y=0;
var delik_y_k=0;
var delik_y_k_tf=false;
var top_bakis=false;
///kamera
var r1=false;
var s1=false;
var s=0;
var r=0;
var w=false;

//golf sopa değişkenler
var gs_tx=0;
var gs_ty=0;
var gs_tz=0;
var gs_rx=0;
var gs_ry=0;
var gs_rz=0;
var gs_s=1;

//golf top değişkenler
var gt_tx=0;
var gt_ty=0;
var gt_tz=0;
var gt_rx=0;
var gt_ry=0;
var gt_rz=0;
var gt_s=1;
//golf bayrak değişkenler
var gb_tx=0;
var gb_ty=0;
var gb_tz=0;
var gb_rx=0;
var gb_ry=0;
var gb_rz=0;
var gb_s=1;


var light_c=1;
var turn = false;
var startFlap = false;
var numPoints  = 0;

var near = 0.1;
var far = 50.0;
var radius = 4.0;
var theta  = 0.0;
var theta1  = 0.0;
var theta2  = 0.0;
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
var materialShininess = 1.0;

var ctm;
var ambientColor, diffuseColor, specularColor;
var eye;
var eyeLoc;
var at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);


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
function sopa_2()
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
     colorArray.push(vertexColors[1]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticess[b]);
     colorArray.push(vertexColors[2]);
    texCoordsArray.push(texCoord[1]);
normalsArray.push(normal)
    pointsArray.push(verticess[c]);
     colorArray.push(vertexColors[1]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticess[a]);
     colorArray.push(vertexColors[2]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticess[c]);
     colorArray.push(vertexColors[2]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticess[d]);
     colorArray.push(vertexColors[1]);
    texCoordsArray.push(texCoord[3]);
normalsArray.push(normal)
    
}
function quadd(a, b, c, d) 
{
	var t1 = subtract(verticesd[b], verticesd[a]);
     var t2 = subtract(verticesd[c], verticesd[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);
  pointsArray.push(verticesd[a]);
     colorArray.push(vertexColors[2]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticesd[b]);
     colorArray.push(vertexColors[2]);
    texCoordsArray.push(texCoord[1]);
normalsArray.push(normal)
    pointsArray.push(verticesd[c]);
     colorArray.push(vertexColors[2]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticesd[a]);
     colorArray.push(vertexColors[2]);
    texCoordsArray.push(texCoord[0]);
normalsArray.push(normal)
    pointsArray.push(verticesd[c]);
     colorArray.push(vertexColors[2]);
    texCoordsArray.push(texCoord[2]);
normalsArray.push(normal)
    pointsArray.push(verticesd[d]);
     colorArray.push(vertexColors[2]);
    texCoordsArray.push(texCoord[3]);
normalsArray.push(normal)
    
}
function zemin() {
    quad1(1, 0, 3, 2);
   quad1(2, 3, 7, 6);
   quad1(3, 0, 4, 7);
    quad1(6, 5, 1, 2);
    quad1(4, 5, 6, 7);
    quad1(5, 4, 0, 1);

}
function bayrak() {
    quadb(1, 0, 3, 2);
   quadb(2, 3, 7, 6);
   quadb(3, 0, 4, 7);
    quadb(6, 5, 1, 2);
    quadb(4, 5, 6, 7);
    quadb(5, 4, 0, 1);

}
function delik() {
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

    gl.uniform1i(gl.getUniformLocation(program, "texture2"), 2);
}
function configureTexture3( image ) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE3);

    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    gl.uniform1i(gl.getUniformLocation(program, "texture3"), 3);
}
function configureTexture4(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE4);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture4"), 4);
}
function configureTexture5(image) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE5);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture5"), 5);
}
function triangle(a, b, c,type) {
    normalsArray.push(a[0],a[1], a[2], 0.0);
     normalsArray.push(b[0],b[1], b[2], 0.0);
     normalsArray.push(c[0],c[1], c[2], 0.0);
		
     pointsArray.push(a);
	
	 
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
    else {
	
        triangle( a, b, c);
    }
}

function top1(a, b, c, d, n) {
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
    gl.clearColor( 0.0, 1.0, 1.0, 1.0 );
     gl.enable(gl.DEPTH_TEST);
   
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
 ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);
    var va = vec4(0.0, 0.0, -1.0, 1);
    var vb = vec4(0.0, 0.942809, 0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
    var vd = vec4(0.816497, -0.471405, 0.333333, 1);

    
zemin();

 bayrak();
top1(va, vb, vc, vd, numTimesToSubdivide,2);
 top1(va, vb, vc, vd, numTimesToSubdivide,1);
 sopa(0.2, [-0.04, 0.4, 0.35]);

 sopa_2();
  sopa(1.0, [0.0, 0.4, 0.0]);
delik();
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

    
    document.getElementById("Button3").onclick = function(){top_d=0;
	top_dx=0;};
	
 document.getElementById("gt_rotate_x").onclick = function(){gt_rx += 0.1;};
 document.getElementById("gt_rotate_y").onclick = function(){gt_ry += 0.1;};
 document.getElementById("gt_rotate_z").onclick = function(){gt_rz += 0.1;};
 document.getElementById("gs_rotate_x").onclick = function(){gs_rx += 0.1;};
 document.getElementById("gs_rotate_y").onclick = function(){gs_ry += 0.1;};
 document.getElementById("gs_rotate_z").onclick = function(){gs_rz += 0.1;};
 document.getElementById("gb_rotate_x").onclick = function(){gb_rx += 0.1;};
 document.getElementById("gb_rotate_y").onclick = function(){gb_ry += 0.1;};
 document.getElementById("gb_rotate_z").onclick = function(){gb_rz += 0.1;};
 	 document.getElementById("gt_translate_x").onchange = function() {
        gt_tx =event.srcElement.value;
		
    };
	 document.getElementById("gt_translate_y").onchange = function() {
        gt_ty =event.srcElement.value;
		
    };
	 document.getElementById("gt_translate_z").onchange = function() {
        gt_tz =event.srcElement.value;
		
    };
	 document.getElementById("gs_translate_x").onchange = function() {
        gs_tx =event.srcElement.value;
		
    };
	 document.getElementById("gs_translate_y").onchange = function() {
        gs_ty =event.srcElement.value;
		
    };
	 document.getElementById("gs_translate_z").onchange = function() {
        gs_tz =event.srcElement.value;
		
    };
	 document.getElementById("gb_translate_x").onchange = function() {
        gb_tx =event.srcElement.value;
		
    };
	 document.getElementById("gb_translate_y").onchange = function() {
        gb_ty =event.srcElement.value;
		
    };
	 document.getElementById("gb_translate_z").onchange = function() {
        gb_tz =event.srcElement.value;
		
    };
   document.getElementById("guc").onchange = function() {
        vurus_gucu =event.srcElement.value;
		vurus_gucu=-vurus_gucu;
		
    };
 document.getElementById("hiz").onchange = function() {
        hiz =event.srcElement.value;
		
		
    };
	 document.getElementById("x_h").onchange = function() {
        x_hareket =event.srcElement.value;
		
		
    };
	 document.getElementById("gt_s").onchange = function() {
        gt_s =event.srcElement.value;
		
    };
	 document.getElementById("gs_s").onchange = function() {
        gs_s =event.srcElement.value;
		
    };
	 document.getElementById("gb_s").onchange = function() {
        gb_s =event.srcElement.value;
		
    };
	
  document.getElementById("shines").onchange = function() {
        materialShininess =event.srcElement.value;
		materialShininess =-materialShininess ;
    };
	
    var image = document.getElementById("texImage");
	
    configureTexture0(image);

    var image1 = document.getElementById("texImage2");
    configureTexture1(image1);
	
 var image2 = document.getElementById("texImage1");
 configureTexture2(image2);
 
  var image3 = document.getElementById("texImage3");
	
    configureTexture3(image3);

    var image4 = document.getElementById("texImage4");
    configureTexture4(image4);
	
 var image5 = document.getElementById("texImage5");
 configureTexture5(image5);
 
 window.addEventListener("keydown", function() {
switch (event.keyCode) {
case 37: // ’1’ keysol
s1=true;
s = s-0.1;
break;
case 38: // ’2’ keyyileri
r1=true;
r = r-0.1;
break;
case 39: // ’3’ keysağ
s1=true;
s = s+0.1;
break;
case 40: // ’3’ keygeri
r1=true;
r = r+0.1;
break;
case 87: // w
theta1 = theta1+0.01;
		theta2 = theta2+0.01;
		w=true;
break;
case 83: // w
theta1 = theta1-0.01;
		theta2 = theta2-0.01;
		w=true;
break;
case 68: // w
theta = theta+0.01;
		theta2 = theta2+0.01;
		w=true;
break;
case 65: // w
theta = theta-0.01;
		theta2 = theta2-0.01;
		w=true;
break;
case 79: // w
top_bakis=true;
break;
case 67: // w
top_bakis=false;
break;
case 76: // w
light_c=light_c+1;
if(light_c%2==0)
materialShininess=0;
else
	materialShininess=1;
break;
case 32: // w
anim_sopa=true; 
	top_dx=0;
break;
}
});
   
	
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
	    eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        radius*Math.sin(theta)*Math.sin(phi)+1.0, radius*Math.cos(theta)+1);
    render();
}


function top1_init1(){

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

   
    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"),1);
    gl.activeTexture(gl.TEXTURE1);
    gl.disableVertexAttribArray(vTexCoord);

    for( var i=index/2+72; i<index; i+=3) 
       gl.drawArrays( gl.TRIANGLES, i, 3 );



}


function top1_init(){
	if(top_bakis){
		
 eye = vec3(radius*Math.sin(theta)*Math.cos(phi)+top_dx, 
        radius*Math.sin(theta)*Math.sin(phi)+1.0+gt_ty/5, radius*Math.cos(theta)+1+top_d);
		console.log(radius*Math.cos(theta));
	at = vec3(radius*Math.sin(theta)*Math.cos(phi)+top_dx, 
	radius*Math.sin(theta)*Math.sin(phi)+1.0+gt_ty/5, radius*Math.cos(theta)-4+top_d);}
		console.log(radius*Math.cos(theta));	
gl.uniform3fv(gl.getUniformLocation(program,
       "eyePosition"), flatten(eye));
  modelViewMatrix = lookAt(eye, at , up);
   projectionMatrix = perspective(fovy, aspect, near, far);

   
    modelViewMatrix = mult(modelViewMatrix,translate(gt_tx/5+0.0+top_dx,gt_ty/5+0.05+delik_y,gt_tz/5+1.40+top_d));
    modelViewMatrix = mult(modelViewMatrix,scalem(0.04*gt_s,0.06*gt_s,0.05*gt_s));
	
	modelViewMatrix = mult(modelViewMatrix,rotate(gt_rx*100,[1,0,0]));
	modelViewMatrix = mult(modelViewMatrix,rotate(gt_ry*100,[0,1,0]));
	modelViewMatrix = mult(modelViewMatrix,rotate(gt_rz*100,[0,0,1]));
	//modelViewMatrix = mult(modelViewMatrix,rotate(-20-i*100,[0,0,1]));
    //modelViewMatrix = mult(modelViewMatrix,scalem(0.3,0.3,0.3));
	
    top1_init1();
   
    //
    
}

function zemin_init(){
 
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
    gl.activeTexture(gl.TEXTURE0);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES,  0, 36);

}
function golf_sopa_init(){
   
     // eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        // radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

    modelViewMatrix = lookAt(eye, at , up);
  projectionMatrix = perspective(fovy, aspect, near, far);
   modelViewMatrix = mult(modelViewMatrix,translate(-0.042+gs_tx/5,0.20-i/20+gs_ty/5,2.52-i/3+gs_tz/5));
modelViewMatrix = mult(modelViewMatrix,scalem(0.08*gs_s,0.08*gs_s,0.08*gs_s));
modelViewMatrix = mult(modelViewMatrix,rotate(sopa_aci+gs_rx*100+i*30,[1,0,0]));
modelViewMatrix = mult(modelViewMatrix,rotate(gs_ry*100,[0,1,0]));
modelViewMatrix = mult(modelViewMatrix,rotate(gs_rz*100,[0,0,1]));
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"),4);
    gl.activeTexture(gl.TEXTURE4);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 24648, 2232);

}

function delik_1(){
	
    
     // eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        // radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
 modelViewMatrix = lookAt(eye, at , up);
 projectionMatrix = perspective(fovy, aspect, near, far);
  modelViewMatrix = mult(modelViewMatrix,translate(0.07+gb_tx/5,0.004+gb_ty/5,-4.00+gb_tz/5));
modelViewMatrix = mult(modelViewMatrix,scalem(0.25*gb_s,0.25*gb_s,0.25*gb_s));
modelViewMatrix = mult(modelViewMatrix,rotate(gb_rx*100,1,0,0));
modelViewMatrix = mult(modelViewMatrix,rotate(gb_ry*100,0,1,0));
modelViewMatrix = mult(modelViewMatrix,rotate(gb_rz*100,0,0,1));
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 1);
    gl.activeTexture(gl.TEXTURE1);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 29028, 30);

}
function bayrak_direk_init(){
    
     // eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        // radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

    modelViewMatrix = lookAt(eye, at , up);
  projectionMatrix = perspective(fovy, aspect, near, far);
    modelViewMatrix = mult(modelViewMatrix,translate(-0.01+gb_tx/5,-0.2+gb_ty/5,-4.02+gb_tz/5));
modelViewMatrix = mult(modelViewMatrix,scalem(0.1*gb_s,0.12*gb_s,0.1*gb_s));
modelViewMatrix = mult(modelViewMatrix,rotate(gb_rx*100,1,0,0));
modelViewMatrix = mult(modelViewMatrix,rotate(gb_ry*100,0,1,0));
modelViewMatrix = mult(modelViewMatrix,rotate(gb_rz*100,0,0,1));
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 4);
    gl.activeTexture(gl.TEXTURE4);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 26880, 2148);

}
function bayrak_init(){
    
        // radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

    modelViewMatrix = lookAt(eye, at , up);
  projectionMatrix = perspective(fovy, aspect, near, far);
    modelViewMatrix = mult(modelViewMatrix,translate(0.11+gb_tx/5,0.9+gb_ty/5,-4.00+gb_tz/5));
modelViewMatrix = mult(modelViewMatrix,scalem(0.28*gb_s,0.28*gb_s,0.28*gb_s));
modelViewMatrix = mult(modelViewMatrix,rotate(gb_rx*100,1,0,0));
modelViewMatrix = mult(modelViewMatrix,rotate(gb_ry*100,0,1,0));
modelViewMatrix = mult(modelViewMatrix,rotate(gb_rz*100,0,0,1));
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.uniform1i(gl.getUniformLocation(program, "bTexCoord"), 4);
    gl.activeTexture(gl.TEXTURE4);

    gl.enableVertexAttribArray(vTexCoord);

    gl.drawArrays(gl.TRIANGLES, 36, 36);

}
function sopa(size, loc) {
    var x, y, z;
    var r, g, b;
    var degrees;
    var thetar;

    v0 = verticesSilin.length; 

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
        vertexColor.push(vec4(x, y, z, 1.0));

        x =  0.4*Math.cos(thetar);
        y =  40;
        z =  0.4*Math.sin(thetar);
    x = size*x + loc[0];
        y = size*y + loc[1];
        z = size*z + loc[2];
     

        verticesSilin.push(vec4(x, y, z, 1.0));

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
if(w){
	eye = vec3(radius*Math.sin(theta), 
        radius*Math.sin(theta1)+1, radius*Math.cos(theta2)+1);
		w=false;
}
  if(r1){
		eye = vec3(radius*Math.sin(theta)+s, 
        radius*Math.sin(theta1)+1, radius*Math.cos(theta2)+1+r);
		r1=false;
	 }
    if(s1){
		eye = vec3(radius*Math.sin(theta)+s, 
        radius*Math.sin(theta1)+1, radius*Math.cos(theta2)+1+r);
		at=vec3(radius*Math.sin(theta)+s, 
        radius*Math.sin(theta1)+1, radius*Math.cos(theta2)-4+r)
		s1=false;
	}
	
		
    top1_init();
	
	golf_sopa_init();
zemin_init();
	//golf_sopa_init_2();
	
	bayrak_direk_init();
	bayrak_init();
	delik_1();
	console.log(gb_tx);
	console.log("SESADA");
	//butterFlyOne();
	var a;
	
	if(anim_sopa){
		
   i=i+0.05*hiz;
   sopa_aci=-70;
   if(l>=0.0){
   if(i>3.20){
	  k=k+0.1;
	
	  if(l>1.50)
	  l=l-0.005;
	  i=i-3.20;
	   anim_sopa=false; 
	   sopa_aci=0;
	   top_hareket_tf=true;
   }
   else
	   if(l<1.50)
	   l=l+0.005;
   }
   else
	   l=0.0;
   t=t-0.01;
   if(t<-0.09){
	   
	}}
	if(top_hareket_tf){
	if(x_hareket==0){top_dx=0;}
	else if(x_hareket==-3){top_dx=top_dx-0.00315*hiz;

	}
	else if(x_hareket==-2){top_dx=top_dx-0.00210*hiz;

	}
	else if(x_hareket==-1){top_dx=top_dx-0.00105*hiz;
	}
	else if(x_hareket==1){top_dx=top_dx+0.00105*hiz;
	}
	else if(x_hareket==2){top_dx=top_dx+0.00210*hiz;
	}
	else if(x_hareket==3){top_dx=top_dx+0.00315*hiz;
	}
	
	else{top_dx=top_dx+0.001*hiz;
}
		
		if(top_d>vurus_gucu){
		top_d=top_d-0.01*hiz;
	if(top_d>vurus_gucu/9)
		gt_ty=gt_ty+0.04*hiz;
	else if(top_d>vurus_gucu*2/9) {gt_ty=gt_ty+0.02*hiz;}
	else if(top_d>vurus_gucu*3/9) {gt_ty=gt_ty+0.01*hiz;}
	else if(top_d>vurus_gucu*4/9) {gt_ty=gt_ty+0.005*hiz;}
	else if(top_d>vurus_gucu*5/9) {gt_ty=gt_ty-0.005*hiz;}
	else if(top_d>vurus_gucu*6/9) {gt_ty=gt_ty-0.01*hiz;}
	else if(top_d>vurus_gucu*7/9) {gt_ty=gt_ty-0.02*hiz;}
	else if(top_d>vurus_gucu*8/9) {gt_ty=gt_ty-0.04*hiz;}
	else gt_ty=0;
		}
		
		else{  
		top_hareket_tf=false;
		
		}

	}
	console.log(top_dx);
	console.log("aşağı gbtx");
	console.log(gb_tx);
	
	if(top_d>-5.75+gb_tz/5&&top_d<(-5.40+gb_tz/5)&&gt_ty==0&&Math.abs(gb_tx/5-top_dx)<0.09){
		top_d=0;
		top_dx=0;
	delik_y_k_tf=true;
	top_hareket_tf=false;

	}
	if(delik_y_k_tf){
	if(delik_y_k<20){
		delik_y=delik_y-0.1;
		delik_y_k=delik_y_k+1;}
	else {delik_y=delik_y+2.0;delik_y_k_tf=false;delik_y_k=0;}}
    window.requestAnimFrame(render);


}
