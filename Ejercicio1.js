// crear a escena
var scene = new THREE.Scene();
//Funcion generar cubo
function cubo(x, y, z, color, material, alambrado) {
  //Se obtiene los parametros del cubo
  var cubeGeometry = new THREE.BoxGeometry(x, y, z);
  var cubeMaterial;
  switch (material) {
    case "Basic":
      cubeMaterial = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Standard":
      cubeMaterial = new THREE.MeshStandardMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Physical":
      cubeMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Phong":
      cubeMaterial = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Lambert":
      cubeMaterial = new THREE.MeshLambertMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;
  }

  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // agrear cubo
  scene.add(cube);
  return cube;
}
function escalar(cubo, escala) {
  //Generamos una funcion de escalar simetricamente todos sus lados
  Cubo[cubo].scale.set(escala, escala, escala);
}
function init() {
  //Se genera variable  camara para visualizar la escena
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  //Se genera el render para recargar los cambios de la escena
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  //Se generan los ejes
  var axes = new THREE.AxesHelper(20);
  scene.add(axes); //Se añaden los ejes

  // crear cubo
  dim = 2; //Tamaño inicial del lado del cubo
  Cubo = []; // Definir un array unidimensional para generar los 3 cubos
  angulo = Math.PI / 4; //Angulo de rotacion de los cubos extremos
  diferencia = dim / 2; //lado /2
  diagonal = Math.sqrt(Math.pow(diferencia, 2) + Math.pow(diferencia, 2)); //Se calcula diagonal
  dim2 = diagonal - diferencia; //Nueva distancia
  for (i = 0; i < 3; i++) {
    //Generamos 3 cubos, donde los dos cubos extremos tienen un mismo color
    //y el de la mitad otro. Para diferenciar
    if (i % 2 == 0) {
      Cubo.push(cubo(dim, dim, dim, 0xffdd00, "Physical", false)); //Cubos extremos
    } else {
      Cubo.push(cubo(dim, dim, dim, 0xe80000, "Standard", false)); //Cubo mitad
    }
    //Se ubican centrados en el origen

    //Trasladamos todos los cubos en la ubicación solicitada
    Cubo[i].translateX(dim / 2); // Traladamos  la mitad del cubo en el  eje X
    Cubo[i].translateY(dim / 2); // Traladamos  la mitad del cubo en el  eje Y
    Cubo[i].translateZ(dim / 2); // Traladamos  la mitad del cubo en el  eje Z
  }

  Cubo[1].translateY((3 * dim) / 4); //Traladamos el segundo cubo encima del primero
  Cubo[2].translateY((9 * dim) / 8); //Traladamos el tercer cubo encima del segundo

  escalar(1, 1 / 2); //Se reduce el segundo cubo a la mitad de su tamaño original
  escalar(2, 1 / 4); //Se reduce el tercer cubo un cuarto de su tamaño original

  for (i = 0; i < 3; i++) {
    //Se rotan los cubos
    Cubo[i].translateX(dim2);

    Cubo[i].translateZ(dim2);
    if (i % 2 == 0) {
      //Se rotan unicamente los extremos con el angulo estabecido
      Cubo[i].rotateY(angulo);
    }
  }

  //Se genera la luz
  light = new THREE.PointLight(0xffff00);

  light.position.set(-1 * dim, 20 * dim, 15 * dim); //  Localización de la luz
  scene.add(light); //Se añade la luz a la escena

  // posicion on de la camara
  camera.position.set(1 * dim, 3 * dim, 6 * dim); //3, 5, 10
  camera.lookAt(scene.position);

  // Enviar el resultado representado al elemento de página especificado
  document.getElementById("webgl-output").appendChild(renderer.domElement);

  // renderizar la escena
  renderer.render(scene, camera);
}
