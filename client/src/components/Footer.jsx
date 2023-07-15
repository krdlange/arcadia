import React from "react";
import Carousel from "./Carousel";
export default function Footer() {
  return (
    <footer className="bg-white mt-4">
      <div className="container-fluid border-top border-primary py-3">
        <div className="text-center">
          <p>Full-stack Project by Kriska de Lange</p>
        </div>
      </div>
      <Carousel></Carousel>
    </footer>
  );
}
