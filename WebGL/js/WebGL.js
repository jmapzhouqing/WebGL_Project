/**
 * Created by zhouqing on 2017/7/26.
 */

var mesh;
var scene;
var camera;
var webGLRenderer
var orbit;

var gui;
var mat;
var controls;

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

        this.changeTexture = function (e) {
            var texture = THREE.ImageUtils.loadTexture("../textures/" + e + ".jpg");
            mat.map = texture;
            if(mesh){
                mesh.material.map = texture;
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

    spGui.add(controls, 'changeTexture', ["cap", "daocao", "double"]).onChange(controls.changeTexture);
}

function create_scene(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, $("#WebGL-Output").width() /  $("#WebGL-Output").height(), 0.1, 1000);
    //orbit = new THREE.OrbitControls(camera);

    webGLRenderer = new THREE.WebGLRenderer({
        antialias: true
    });
    webGLRenderer.setClearColor(new THREE.Color(0xffffff, 1.0));
    webGLRenderer.setSize($("#WebGL-Output").width(), $("#WebGL-Output").height());
    webGLRenderer.shadowMapEnabled = true;


    camera.position.x = 130;
    camera.position.y = 40;
    camera.position.z = 50;
    camera.lookAt(scene.position);
    scene.add(camera);

    var ambient_light =  new THREE.AmbientLight(0xffffff);
    ambient_light.intensity = 0;
    scene.add(ambient_light);

    var direct_light = new THREE.DirectionalLight(0xcccccc);
    direct_light.position.set(30, 40, 50);
    direct_light.intensity = 1;
    scene.add(direct_light);

    $("#WebGL-Output").append(webGLRenderer.domElement);

    render();
}

function load_content(name){
    controls.changeTexture(name);
    var loader = new THREE.JSONLoader();
    loader.load('../content/'+name+'.js', function (geometry,material) {
        mesh = new THREE.Mesh(geometry,mat);
        mesh.position.set(0,0,0);
        mesh.scale.set(500, 500, 500);
        scene.add(mesh);
    },"../textures");
}

function render() {
    //orbit.update();
    if (mesh) {

    }
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
}
