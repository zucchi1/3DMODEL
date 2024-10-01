window.addEventListener('DOMContentLoaded', init);

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas')
    });
    // ウィンドウサイズ設定
    width = document.getElementById('main_canvas').getBoundingClientRect().width;
    height = document.getElementById('main_canvas').getBoundingClientRect().height;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);

    // ガンマ補正の代わりに outputEncoding を設定
    renderer.outputEncoding = THREE.sRGBEncoding;

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 400, -1000);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // GLTF/GLBモデルの読み込み
    const loader = new THREE.GLTFLoader();
    //const url = './glb/Bauhaus.glb'; // 修正済みパス
    const url = './glb/Bauhaus.glb?' + new Date().getTime(); // GLBフォルダ内の正しいファイル名を指定
 
    let model = null;
    loader.load(
        url,
        function (gltf) {
            model = gltf.scene;
            model.scale.set(400.0, 400.0, 400.0);
            model.position.set(0, -400, 0);
            scene.add(gltf.scene);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened:', error);
        }
    );
    

    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1);
    scene.add(light);

    // 初回実行
    tick();

    function tick() {
        controls.update();

        if (model != null) {
            console.log(model);
        }
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}
