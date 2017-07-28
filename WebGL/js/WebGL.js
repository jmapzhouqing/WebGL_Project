/**
 * Created by zhouqing on 2017/7/26.
 */

var mesh;
var part;
var scene;
var parent;
var camera;
var webGLRenderer
var orbit;

var gui;
var mat;
var controls;

var helper;

function create_ui(){
    controls = new function () {
        mat = new THREE.MeshPhongMaterial();
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;

        this.opacity = mat.opacity;
        this.transparent = mat.transparent;
        this.overdraw = mat.overdraw;
        this.visible = mat.visible;

        this.wireframe = mat.wireframe;
        this.wireframeLinewidth = mat.wireframeLinewidth;
        this.wireFrameLineJoin = mat.wireframeLinejoin;

        this.selectedMesh = function (e) {
            load_content(e);
        };

        this.selectPart = function (e) {
            load_part(e);
        };

        this.changeTexture = function (e) {
            var texture = THREE.ImageUtils.loadTexture("../textures/" + e + ".jpg");
            mat.map = texture;
            if(mesh){
                mesh.material.map = texture;
            }
        }

        this.changeColor = function (e) {
           var color = new THREE.Color(e);
            if(mesh){
                mesh.material.color = color;
            }
        }
    };

    var gui = new dat.GUI();
    var spGui = gui.addFolder("Mesh");
    spGui.add(controls, 'opacity', 0, 1).onChange(function (e) {
        mat.opacity = e
    });
    spGui.add(controls, 'transparent').onChange(function (e) {
        mat.transparent = e
    });
    spGui.add(controls, 'wireframe').onChange(function (e) {
        mat.wireframe = e
    });
    spGui.add(controls, 'wireframeLinewidth', 0, 20).onChange(function (e) {
        mat.wireframeLinewidth = e
    });
    spGui.add(controls, 'visible').onChange(function (e) {
        mat.visible = e
    });

    spGui.add(controls, 'selectedMesh', ["cap", "sphere", "plane"]).onChange(controls.selectedMesh);

    spGui.add(controls, 'selectPart', ["part", "sphere", "plane"]).onChange(controls.selectPart);

    spGui.add(controls, 'changeColor', ["#FF0000", "#00FF00", "double"]).onChange(controls.changeColor);

    spGui.add(controls, 'changeTexture', ["cap", "daocao", "double"]).onChange(controls.changeTexture);
}

function create_scene(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, $("#WebGL-Output").width() /  $("#WebGL-Output").height(), 0.1, 1000);
    //orbit = new THREE.OrbitControls(camera);

    helper = new THREE.AxisHelper(20);
    scene.add(helper);
    helper.rotation.y = 10;

    webGLRenderer = new THREE.WebGLRenderer({
        antialias: true
    });
    webGLRenderer.setClearColor(new THREE.Color(0xffffff, 1.0));
    webGLRenderer.setSize($("#WebGL-Output").width(), $("#WebGL-Output").height());
    webGLRenderer.shadowMapEnabled = true;

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 50;
    camera.lookAt(scene.position);
    scene.add(camera);


    var ambient_light =  new THREE.AmbientLight(0xffffff);
    ambient_light.intensity = 0.5;
    scene.add(ambient_light);


    var direct_light = new THREE.DirectionalLight(0xcccccc);
    direct_light.position.set(30, 40, 50);
    direct_light.intensity = 0.2;
    scene.add(direct_light);
    parent = new THREE.Object3D();
    scene.add(parent);

    parent.rotation.set(0,0,0);

    $("#WebGL-Output").append(webGLRenderer.domElement);

    render();

    load_content("sphere");

    Listener();
}

function load_content(name){
    /*var loader = new THREE.JSONLoader();
    loader.load('../content/'+name+'.js', function (geometry,material) {
        if(mesh){
            scene.remove(mesh);
        }
        mat = material[0];
        mesh = new THREE.Mesh(geometry, mat);
        mesh.scale.x = 15;
        mesh.scale.y = 15;
        mesh.scale.z = 15;
        //container.position.set(0,0,0);
        //mesh.scale.set(500, 500, 500);
        parent.add(mesh);
    },"../textures/");*/

    //controls.changeTexture(name);

    var loader = new THREE.OBJMTLLoader();
    loader.load('../content/buffterfly.obj','../content/buffterfly.mtl',function(loadedMesh){
        mesh = loadedMesh;
        loadedMesh.scale.set(100, 100, 100);
        loadedMesh.position.set(0,0,0);
        scene.add(loadedMesh);
    });
}

function load_part(name){
    var loader = new THREE.JSONLoader();
    loader.load('../content/part.js', function (geometry,material){
        //container.position.set(0,0,0);
        //mesh.scale.set(500, 500, 500);
        if(mesh){
            if(part){
                mesh.remove(part);
            }
            mat = material[0];
            part = new THREE.Mesh(geometry, mat);
            mesh.add(part);
            part.scale.x = 1;
            part.scale.y = 1;
            part.scale.z = 1;
            part.position.set(0,0,0);
        }
        //scene.add(mesh);
    },"../textures/");
}

function render() {
    //orbit.update();
    if (mesh) {
        //mesh.rotation.y += 0.02;

    }
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
}

function Listener(){
    var startX,endX,startY,endY;
    var _down = false;
    $("#WebGL-Output").on('mousemove mousedown mouseup',function(event){
        /*
        var touch_first = event.originalEvent.targetTouches[0],
            touch_second = event.originalEvent.targetTouches[1],
            fingers = event.originalEvent.touches.length;
        if (event.type == 'touchstart') {
            startX = touch_first.pageX;
            startY = touch_first.pageY;

        } else if (event.type == 'touchmove') {
            endX = Math.abs(touch_first.pageX - startX);
            endY = Math.abs(touch_first.pageY - startY);
            mesh.rota
            mesh.rotation.x += endY * 0.01;
        } else if (event.type == 'touchend') {

        }*/

        if (event.type == 'mousedown') {
            startX = event.clientX;
            startY = event.clientY;
            _down = true;
        } else if (event.type == 'mousemove') {
            if(!_down){
                return;
            }
            endX = event.clientX - startX;
            endY = event.clientY - startY;

            startX = event.clientX;
            startY = event.clientY;
            //mesh.rota
            //rotateAroundWorldAxis(parent,new THREE.Vector3(1,0,0),endY * 0.01);
            //rotateAroundWorldAxis(parent,camera.up,endX * 0.01);
            var vec = new THREE.Vector3(0,0,0);
            //vec.crossVectors(camera.up,camera.getWorldDirection())
            rotateAroundWorldAxis(parent,new THREE.Vector3(1,0,0),endX * 0.01);
            //mesh.rotateY(endX*0.01);
        }else if(event.type == 'mouseup'){
            _down = false;
        }
    });
}

function makeRotationAxis( axis, angle ) {
    var c = Math.cos( angle );
    var s = Math.sin( angle );
    var t = 1 - c;
    var x = axis.x, y = axis.y, z = axis.z;
    var tx = t * x, ty = t * y;
    this.set(
        tx * x + c, tx * y - s * z, tx * z + s * y, 0,
        tx * y + s * z, ty * y + c, ty * z - s * x, 0,
        tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
        0, 0, 0, 1
    );
    return this;
}

var rotWorldMatrix;

function rotateAroundWorldAxis(object, axis, radians) {

    rotWorldMatrix = new THREE.Matrix4();

    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;

    object.rotation.setFromRotationMatrix(object.matrix);

}

/*
var touchScale = function(seletor, bg) {
        var startX, endX, scale, x1, x2, y1, y2, imgLeft, imgTop, imgWidth, imgHeight,
        one = false,
        $touch = $(seletor),
        originalWidth = $touch.width(),
        originalHeight = $touch.height(),
        baseScale = parseFloat(originalWidth/originalHeight),
        imgData = [],
        bgTop = parseInt($(bg).css('top'));
    function siteData(name) {
        imgLeft = parseInt(name.css('left'));
        imgTop = parseInt(name.css('top'));
        imgWidth = name.width();
        imgHeight = name.height();
    }

    var getData = function(){
        return imgData;
    };
    return {
        imgData : getData
    }
};*/
