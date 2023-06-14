import * as THREE from './build/three.module.js'

let scene, camera, render;
//シーン作成
scene = new THREE.Scene();
//カメラ作成
camera = new THREE.PerspectiveCamera( 
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.set(0, 0, 500)

//ジオメトリー作成 → 骨格
let earthGeometory = new THREE.SphereGeometry(100, 64, 32);
//マテリアルを作成 → 材質や見た目の部分
let earthMaterial = new THREE.MeshPhysicalMaterial();
//メッシュ化 → ジオメトリー + マテリアル
let earthMesh = new THREE.Mesh(earthGeometory, earthMaterial);
//シーンにメッシュ化したものを追加
scene.add(earthMesh);

//レンダラー作成
render = new THREE.WebGLRenderer({ alpha: true});
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

render.render(scene, camera);

//平衡光源
let light = new THREE.DirectionalLight(0xffffff, .3);
light.position.set(1, 1, 1);
scene.add(light);

//ポイント光源
let pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-200, -200, -200)
scene.add(pointLight);
//ポイント光源ヘルパー（ポイント光源がどこにあるのかを確認）
let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
scene.add(pointLightHelper);

function animate() {
  //ポイント光源を動かす処理
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),//x軸
    200 * Math.sin(Date.now() / 1000),//y軸
    200 * Math.cos(Date.now() / 500)
  )
  render.render(scene, camera);
  //ブラウザのAPIを使用して、永久アニメーション
  requestAnimationFrame(animate);
}
animate();

