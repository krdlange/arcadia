import React from 'react'

export default function Carousel() {
  return (
<div id="myCarousel" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ol>
  
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="" alt=""/>
      <div className="carousel-caption">
        <h3>Image 1 Caption</h3>
        <p>Some description about Image 1</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="" alt=""/>
      <div className="carousel-caption">
        <h3>Image 2 Caption</h3>
        <p>Some description about Image 2</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="" alt=""/>
      <div className="carousel-caption">
        <h3>Image 3 Caption</h3>
        <p>Some description about Image 3</p>
      </div>
    </div>
  </div>
  
  <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>


  )
}
