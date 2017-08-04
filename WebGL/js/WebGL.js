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
var _head;

var is_tryon = false;

/*
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
}*/

function changeTexture(e) {
    var _texture = THREE.ImageUtils.loadTexture("../textures/" + e + ".jpg");
   
    if(mesh){
        mat.map = _texture;
    }
}

function changeColor(e) {
    var color = new THREE.Color(e);
    if(mesh){
        mat.color = color;
    }
}

function create_scene(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, $("#WebGL-Output").width() /  $("#WebGL-Output").height(), 0.1, 1000);
    //orbit = new THREE.OrbitControls(camera);

    webGLRenderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
    });
    webGLRenderer.setClearColor(new THREE.Color(0xE3E3E3, 1.0));
    webGLRenderer.setSize($("#WebGL-Output").width(), $("#WebGL-Output").height());
    webGLRenderer.shadowMapEnabled = true;

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;
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

    Listener();
}

function load_content(name){
    var loader = new THREE.JSONLoader();
    loader.load('../content/'+name+'.js', function (geometry,material) {
        if(mesh){
            parent.remove(mesh);
        }
        mat = material[0];
        mesh = new THREE.Mesh(geometry, mat);
        parent.add(mesh);
        mesh.scale.x = 160;
        mesh.scale.y = 160;
        mesh.scale.z = 160;
        if(is_tryon){
            mesh.position.set(0,20,0);
            mesh.rotation.set(0.2,0,0);
        }else{
            mesh.position.set(0,0,0);
            mesh.rotation.set(0,0,0);
        }
        //container.position.set(0,0,0);
        //mesh.scale.set(500, 500, 500);

    },"../textures/");

    //controls.changeTexture(name);
    /*
    var loader = new THREE.OBJMTLLoader();
    loader.load('../content/buffterfly.obj','../content/buffterfly.mtl',function(loadedMesh){
        mesh = loadedMesh;
        loadedMesh.scale.set(100, 100, 100);
        loadedMesh.position.set(0,0,0);
        scene.add(loadedMesh);
    });*/
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
    $("#WebGL-Output").on('touchstart touchmove touchend',function(event){
        if(is_tryon){
            return;
        }
        var touch_first = event.originalEvent.targetTouches[0],
        touch_second = event.originalEvent.targetTouches[1],
        fingers = event.originalEvent.touches.length;
        if (event.type == 'touchstart') {
            startX = touch_first.pageX;
            startY = touch_first.pageY;
            helper.rotation.set(0,0,0);
        } else if (event.type == 'touchmove') {

            endX =  touch_first.pageX - startX;
            endY = touch_first.pageY - startY;

            startX = touch_first.pageX;
            startY = touch_first.pageY;
            //var vec = new THREE.Vector3(0,0,0);
            //vec.crossVectors(camera.up,camera.getWorldDirection())
            rotateAroundWorldAxis(mesh,new THREE.Vector3(1,0,0),endY * 0.005);
            parent.rotateY(endX * 0.005);
            //parent.rotateY(endX * 0.002);
        } else if (event.type == 'touchend') {

        }

        /*
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
        }*/
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

function try_on() {
    /*
    var loader = new THREE.JSONLoader();
    loader.load('../content/head.js', function (geometry,material){
        //container.position.set(0,0,0);
        //mesh.scale.set(500, 500, 500);
        var _mat = new THREE.MeshBasicMaterial({color:0xFF0000});
        _mat.side = "double";
        if(!head) {
            //var head_geometry = new THREE.PlaneGeometry(10,10,10,10);
            head = new THREE.Mesh(geometry,_mat);
            head.scale.x = 1;
            head.scale.y = 1;
            head.scale.z = 1;
            head.position.set(0,0,0);
            alert("Hello");
        }else{
            //head.visible = true;
        }
        //scene.add(mesh);
    },"../textures/");*/
    is_tryon = true;
    parent.rotation.set(0,0,0);
    if(!_head){
        var texture = THREE.ImageUtils.loadTexture("../textures/head.png");
        var _mat = new THREE.MeshLambertMaterial({map:texture,transparent:true});
        var head_geometry = new THREE.PlaneGeometry(10,10,10,10);
        _head = new THREE.Mesh(head_geometry,_mat);
        scene.add(_head);
        _head.scale.x = 7;
        _head.scale.y = 7;
        _head.scale.z = 7;
        _head.position.set(0,-6,0);
    }else{
        _head.visible = true;
    }
}

function custom_made(){
    is_tryon = false;
    if(_head){
        _head.visible = false;
    }
}

function save_info(){
    if(is_tryon){
        var dataUrl = webGLRenderer.domElement.toDataURL("image/png");
        if(mesh){
            parent.remove(mesh);
        }
        return dataUrl;
    }else{
        if(mesh){
            parent.remove(mesh);
        }
    }

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
