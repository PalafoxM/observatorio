import React from 'react';
import './ParallaxBackground.css';

const ParallaxBackground = () => {
  const layers = [
    { id: 0, src: "https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_0.png?raw=true" },
    { id: 1, src: "https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_1.png?raw=true" },
    { id: 2, src: "https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_2.png?raw=true" },
    { id: 3, src: "https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_3.png?raw=true" },
    { id: 4, src: "https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_4.png?raw=true" },
    { id: 5, src: "https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_5.png?raw=true" },
    { id: 6, src: "https://github.com/samdbeckham/blog/blob/master/dev/_assets/images/articles/firewatch/layer_6.png?raw=true" }
  ];

  return (
    <div className="parallax">
      {layers.map((layer) => (
        <div key={layer.id} className={`parallax__layer parallax__layer__${layer.id}`}>
          <img src={layer.src} alt={`Capa ${layer.id}`} />
        </div>
      ))}
    </div>
  );
};

export default ParallaxBackground;