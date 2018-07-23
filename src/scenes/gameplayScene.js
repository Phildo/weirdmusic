var GamePlayScene = function(game, stage)
{
  var self = this;

  var canv;
  var canvas;
  var ctx;
  self.resize = function(s)
  {
    stage = s;
    canv = stage.canv;
    canvas = canv.canvas;
    ctx = canv.context;

    if(clicker) { clicker.detach(); clicker = new Clicker({source:stage.canv.canvas}); };
    if(dragger) { dragger.detach(); dragger = new Dragger({source:stage.canv.canvas}); };
  }
  self.resize(stage);

  var clicker;
  var dragger;
  var play_btn;
  var freq_slider;
  var vol_slider;
  var ab;

  self.ready = function()
  {
    clicker = new Clicker({source:stage.canv.canvas});
    dragger = new Dragger({source:stage.canv.canvas});
    ab = new audioboy();
    //ab.play();

    var x = 10;
    var y = 10;
    var w; var h;
    w = 100;
    h = 100;
    play_btn = new ToggleBox(x,y,w,h,0,function(v){ if(v) ab.play(); else ab.stop(); });
    y += h;
    y += 10;
    w = 200;
    h = 20;
    freq_slider = new SmoothSliderBox(x,y,w,h,20,20000,440,function(v){ ab.freq = v; });
    y += h;
    y += 10;
    w = 200;
    h = 20;
    vol_slider = new SmoothSliderBox(x,y,w,h,0,1,1,function(v){ ab.vol = v; });
  };

  self.tick = function()
  {
    clicker.filter(play_btn);
    dragger.filter(freq_slider);
    dragger.filter(vol_slider);
    clicker.flush();
    dragger.flush();

    freq_slider.tick();
    vol_slider.tick();
  };

  self.draw = function()
  {
    play_btn.draw(canv);
    freq_slider.draw(canv);
    vol_slider.draw(canv);
  };

  self.cleanup = function()
  {
    clicker.detach(); clicker = null;
    dragger.detach(); dragger = null;
  };

};

