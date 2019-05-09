// 画像の変数
var lakeImage;
var moonImage;

// TODO サウンドの変数
// 爆発音のみでOK
var launchSound;
var explodeSound;

// 花火の粒を入れる配列
var fireworks = [];
var particles = [];
var lastParticles = [];

// 花火の粒子数
var fireLength;
var fireLength2;
var fireLength3;

var fireLengthArray = [];

// 初期化が完了しているか
var isInitFinish;

// 画像データからターゲット位置作成
var photoImage;
var photoImage2;
var photoImage3;

// タイマー用変数
var count = 0;

// TODO 画像によってstepSizeを変更する
//var stepSize = 12;
//var stepSize2 = 12;
//var stepSize3 = 12;

// 目的地の座標
var positions = [];
var positions2 = [];
var positions3 = [];

var positionsArray = [];

// ---Timer---
var timer;
var counter = 0;
var seconds, minutes;

// TODO 削除予定
var launch;

// index変数
var i = 0;
// どのボタンがクリックされたか
var judge = 0;

// データのロード
function preload() {
  
  launchSound = loadSound ('launch.mp3');
  explodeSound = loadSound ('explode.mp3');
  
  lakeImage = loadImage('lake.png');
  moonImage = loadImage('moon.png');
  
  photoImage = loadImage('reiwa.png');
  photoImage2 = loadImage('logo.png');
  photoImage3 = loadImage('clark.png');

  isInitFinish = false;
  launch = false;
  
  positionsArray.push(positions);
  positionsArray.push(positions2);
  positionsArray.push(positions3);
}

// 座標探索
function dot(photoImage,stepSize) {

  var pixels = photoImage.pixels;
  for (var y = 0; y < photoImage.height; y += stepSize) {
    for (var x = 0; x < photoImage.width; x += stepSize) {
      var i = (x + y * photoImage.width) * 4;
      
      // ピクセルを書きかえる
      var red   = pixels[i];
      var green = pixels[i + 1];
      var blue  = pixels[i + 2];
      
      if (red == 0 && green == 0 && blue == 0) 
      {
        positionsArray[index].push(createVector(x,y)); 
      }
    }
  }
}

// タイマー用関数
function timeIt() {
  // 1 counter = 1 second
  counter++ ;
  
  // 表示確認用
	minutes = floor(counter/60);
  seconds = counter % 60;
    
  timer.html(minutes + ":" + seconds);
}


function setup() {
  
  createCanvas(1100, 750);
  noStroke();
  
  index = 0;
  
  // 画像によってstepSizeを変更する
  var stepSize = 12; // 令和
  var stepSize2 = 8; // life is tech !
  var stepSize3 = 4; // クラークロゴ
  
  // 読み込んだ画像の座標位置を補足
  // 0番目
  photoImage.loadPixels();
  dot(photoImage,stepSize);
  fireLength = positions.length;
  
  fireLengthArray.push(fireLength);

  index++;
  print(fireLength);
  
  // 1番目
  photoImage2.loadPixels();
  dot(photoImage2,stepSize2);
  fireLength2 = positions2.length;
  
  fireLengthArray.push(fireLength2);

  index++;
  print(fireLength2);
  
  // 2番目
  photoImage3.loadPixels();
  dot(photoImage3,stepSize3);
  fireLength3 = positions3.length;
  
  print(fireLength3);
  
  fireLengthArray.push(fireLength3);

  // 初期化完了
  isInitFinish = true;
  
  // timer処理(確認用)
  timer = createP("timer");
  setInterval(timeIt, 1000);
  
}

function draw() {
  
  // 初期化が完了次第動作
  if (isInitFinish)
  {
    // 暗い背景を描く
    background(0, 0, 20, 10);
    
    // 背景のセット
    image(moonImage, 120, 50);
    image(lakeImage, 0, height - 293);
        
    // --- デバッグ描画 ---
    // positionのインデックスを変更し，確認
    
    /*
    
    fill(255);
    var temp = [];
    temp = positionsArray[1];
    for(var i = 0; i < temp.length; i++){
      ellipse(temp[i].x,temp[i].y,1);
    }
    
    */
     
    if(!launch){
      // [R]をクリック
      if (keyIsDown(82)) {
        // 花火クラスからnewで花火を新しく作って配列に追加する
        judge = 0;
        fireworks.push(new Firework());
        launch = true;
      }
      
      // [L]をクリック
      if (keyIsDown(76)) {
        // 花火クラスからnewで花火を新しく作って配列に追加する
        judge = 1;
        fireworks.push(new Firework());
        launch = true;
      }
      
      // [C]をクリック
      if (keyIsDown(67)) {
        // 花火クラスからnewで花火を新しく作って配列に追加する
        judge = 2;
        fireworks.push(new Firework());
        launch = true;
      }
    }

    // 花火の本体の数だけ処理する
    for (var i = 0; i < fireworks.length; i++) {
        // 花火本体を移動させる
        fireworks[i].move();
        // 花火本体を表示する
        fireworks[i].draw();
        
        // 爆発したら
        if (fireworks[i].mode == 'explode') {
            // 花火本体を配列から消す
            fireworks.splice(i, 1);
        }
    }
    
    // 花火の粒の数だけ処理する
    for (var i = 0; i < particles.length; i++) {
        // 花火の粒を移動させる
        particles[i].move();
        // 花火の粒を表示する
        particles[i].draw();
        
        // 花火の粒が消える時間になったら
        if (particles[i].lifetime < 0) {
            // 花火の粒を配列から消す
            particles.splice(i, 1);
        }
    }
    
    // 最後の花火の粒の数だけ処理する
    for (var i = 0; i < lastParticles.length; i++) {
        // 花火の粒を移動させる
        lastParticles[i].move();
        // 花火の粒を表示する
        lastParticles[i].draw();
        
        // 花火の粒が消える時間になったら
        if (lastParticles[i].lifetime < 0) {
            // 花火の粒を配列から消す
            lastParticles.splice(i, 1);
        }
    }
    
    // 補足テキストの表示
    fill(255);
    
    text("Click [R] →", width - 170, 100);
    text("Click [L] →", width - 170, 300);
    text("Click [C] →", width - 170, 500);
    
    textSize(25);

  }
}

// 花火の本体のクラス
class Firework {
    // 初期化（constructor＝コンストラクター＝建設者）
    constructor() {
        // 打ち上がり始める座標をランダムに決める
        if(judge == 0){
          this.position = createVector(width, 100);
        }else if(judge == 1){
          this.position = createVector(width, 300);
        }else if(judge == 2){
          this.position = createVector(width, 500);
        }

        // 打ち上げる速度をランダムに決める
        // 花火の遺産/ほとんど停止させてる
        this.velocityY = random(-0.1, -0.2);
        // 色をランダムに決める
        this.color = color(random(200, 255), random(150, 255), random(100, 255));
        // モードを「move」にしておく
        this.mode = 'move';
        // 揺れの表現のために横の位置を保存しておく
        this.baseX = this.position.x;
        
        // 打ち上げの音のボリュームを調整
        launchSound.setVolume(0.05);
        // 打ち上げの音を鳴らす（launch＝ローンチ＝打ち上げ）
//        launchSound.play();
    }
    
    // 移動
    move() {
        // 重力で打ち上げ速度が変化する
        this.velocityY += 0.02;
        // 速度で座標が変化する
        this.position.y += this.velocityY;
        // 上昇中の揺れ（ゆれ）を表現する
        this.position.x = this.baseX + 0.6 * sin(this.position.y * 0.3);
        
        // 打ち上げの速度がゼロになって頂点に来たら
        if (this.velocityY > 0) {
            // 花火を爆発させる
            this.explode();
        }
    }
    
    // 爆発（explode＝エクスプロード＝爆発する）
    explode() {
        // モードを「explode」に変える
        this.mode = 'explode';
        launch = false;

        
        // 花火の大きさ（爆発の強さ）をランダムで決める
        var size = random(3.0, 6.0);
        // 花火の粒を大量に作る
        var tempFireLength = fireLengthArray[judge];
        for (var i = 0; i < tempFireLength; i++) {
            // 花火本体の座標と色を使って花火の粒を作り配列に入れる
            particles.push(new Particle(this.position.x, this.position.y, this.color, size, i,positionsArray[judge]));
        }
        
        // 爆発の音を鳴らす
        explodeSound.play();
    }
    
    // 表示
    draw() {
        // 色をセット
        fill(this.color);
        // 小さな円を描く
        ellipse(this.position.x, this.position.y, 5);
    }
}


// 花火の粒のクラス
class Particle {
    // 初期化（constructor＝コンストラクター＝建設者）
    constructor(x, y, color, size, _posID, targets) {
        // 粒子ごとに固有のIDを与える
        this.posID = _posID;

        // 花火本体の位置で初期化
        this.position = createVector(x, y);
        // 飛び散る速度を初期化
        //this.velocity = createVector(random(-3.0, 3.0), random(-3.0, 3.0));
        // 飛び散る向きをランダムに決める
        this.velocity = p5.Vector.random2D();
        // 飛び散る強さをランダムに決める
        this.velocity.mult(random(size));

        // 花火本体の色を引きつぐ
        this.color = color;

        // 花火の粒が表示される時間をランダムに決める
        this.lifetime = random(600, 900);
      
        // 目的地の代入
        this.targets = targets;
    }
    
    // 移動
    move() {
      // 空気抵抗
      this.velocity.mult(0.96);

      // 差分をとって目的地へ向かうベクトルを作成
      var diffX = this.targets[this.posID].x - this.position.x;
      var diffY = this.targets[this.posID].y - this.position.y;
      var vec2target = createVector(diffX, diffY);
      var diffLength = vec2target.mag();
      
            
      // --- 目的地に向かう ---
      //  目的地に到達したら
      if (diffLength < 10.0)
      {
        var size = random(1.0, 2.0);
        lastParticles.push(new LastParticle(this.position.x, this.position.y, this.color, size));
        // 自身を消す
        this.lifetime = 0;
        
      }
      else // 目的地に向かってる最中
      {
        //! 係数
        var k = 0.0003;
        this.velocity.x += vec2target.x * k;
        this.velocity.y += vec2target.y * k;
        // 重力で粒の速度が変化する
        this.velocity.y += 0.015; 
      }
        
      // 速度が0に近づいたら
      if (this.velocity.mag() < 0.05)
      {
        // 新しく小さな花火を打ち上げる
        // 花火の大きさ（爆発の強さ）をランダムで決める
        for (var i = 0; i < 10; i++)
        {
          var size = random(0.5, 1.5);
          lastParticles.push(new LastParticle(this.position.x, this.position.y, this.color, size));
          this.lifetime = 0.0;
        } 
      }

        // 速度で座標が変化する
        this.position.add(this.velocity);
        
        // 残りの時間を減らす
        this.lifetime -= 1.0;
    }
    
    // 表示
    draw() {
        // 粒の色をセットする
        fill(this.color);
        // 小さな円を描く
        ellipse(this.position.x, this.position.y, 2);
    }
}

// 最後に出る花火の粒のクラス
class LastParticle {
    // 初期化（constructor＝コンストラクター＝建設者）
    constructor(x, y, color, size) {

        // 花火本体の位置で初期化
        this.position = createVector(x, y);
        // 飛び散る向きをランダムに決める
        this.velocity = p5.Vector.random2D();
        // 飛び散る強さをランダムに決める
        this.velocity.mult(random(size));

        // 花火本体の色を引きつぐ
        this.color = color;

        // 花火の粒が表示される時間をランダムに決める
        this.lifetime = random(25, 40);
    }
    
    // 移動
    move() {
        // 空気抵抗
        this.velocity.mult(0.98);
        // 重力で粒の速度が変化する
        this.velocity.y += 0.015; 
        
        this.position.add(this.velocity);
        
        // 残りの時間を減らす
        this.lifetime -= 1.0;
    }
    
    // 表示
    draw() {
        // 粒の色をセットする
        fill(this.color);
        // 小さな円を描く
        ellipse(this.position.x, this.position.y, 1);
    }
}