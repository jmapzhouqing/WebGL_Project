/**
 * 
 */
var space_container;
var WebGL_Container;
var view_container;
var layer_control;
var element_control;

var webgl_control;

function View(name,url){
	var node = $("<li></li>");
	var container = $("<div></div>");
	var _delete = $("<img>",{
        src:"style/admstatic/images/1.png",
    	className:"view_edit_img",
		width:20,
		height:20,
        hide:true
	});

	var _edit = $("<img>",{
        src:"style/admstatic/images/1.png",
        className:"view_edit_img",
        width:20,
        height:20,
		hide:true
	});

	container.text(name);
	container.className = "view_div";
	container.on({
		mouseover:function () {
            _delete.show();
            _edit.show();
        },
		mouseout:function () {
            _delete.hide();
            _edit.hide();
        }
	});

	container.append(_delete);
	container.append(_edit);
	node.append(container);

	this.view = WebGL.create("",1,800,640);
	view_container.append(node);

	this.layer_list = new Array();

	this.delete();

	if(typeof View._initialized == "undefined"){
        View.prototype.delete = function(){
			for(var _layer in this.layer_list){

			}
        };

        View.prototype.add_layer = function(name,order){
        		var _layer = new Layer(this,name,order);
        		this.layer_list.push(_layer);
		}

        View._initialized = true;
	}
}

function Layer(view,name,order){
	this.element_list = new Array();

	if(typeof Layer._initialized == "undefined"){
        Layer.prototype.delete = function(){

        };

        Layer._initialized = true;
    }
}

function Element(){

    if(typeof Element._initialized == "undefined"){
        Element.prototype.delete = function(){

        };
        Element._initialized = true;
    }
}

var WebGL = {
	scene:{},
	webGLRenderer:{},
	camera:{},
	parent:{},
   	render:function(){
		requestAnimationFrame(WebGL.render);
		webGLRenderer.render(scene, camera);
	},
	init:function(){
		scene = new THREE.Scene();
		camera = new THREE.OrthographicCamera(-400,400,290,-290,-1000,1000);
		camera.position.set(0,0,0);
		camera.lookAt(scene.position);
		scene.add(camera);

        var ambient_light =  new THREE.AmbientLight(0xffffff);
        ambient_light.intensity = 0.5;
        scene.add(ambient_light);

        var direct_light = new THREE.DirectionalLight(0xcccccc);
        direct_light.position.set(30, 40, 50);
        direct_light.intensity = 0.2;
        scene.add(direct_light);


		webGLRenderer = new THREE.WebGLRenderer();
		webGLRenderer.setClearColor(0xFFFFFF,1);
		webGLRenderer.setSize(WebGL_Container.width(),WebGL_Container.height());
        webGLRenderer.shadowMapEnabled = true;

		WebGL_Container.append(webGLRenderer.domElement);

		this.render();
	},
	load_texture:function(url){
		var _texture = THREE.ImageUtils.loadTexture("style/admstatic/image/image/tt.jpg");
		return _texture;
	},
	create:function (parent,url,order,width,height) {
		if($.isNull(parent)){
			parent = scene;
		}
		var _texture = this.load_texture(url);
		var _plane = new THREE.PlaneGeometry(width,height,1,1);
		var _mat = new THREE.MeshLambertMaterial({map:_texture,transparent:true});
		var mesh = new THREE.Mesh(_plane,_mat);
        parent.add(mesh);
    }
}

$(function(){
    view_container = $("#view_container");
    WebGL_Container = $("#WebGl-Output");

    WebGL.init();

	$("#view_entering").hide();
	$("#view_add_control").click(function(){
		$("#view_entering").show();
	});

	$("#view_confirm").click(function(){
            var view = new View("Name","style/admstatic/images/1.png");

        $("#view_entering").hide();
	})
})