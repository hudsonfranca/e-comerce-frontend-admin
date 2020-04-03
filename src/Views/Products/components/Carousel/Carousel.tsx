import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import api from "../../../../services/Api";

interface Props {
  productId: number | null;
}

interface Images {
  image: string;
  id: number;
  id_product: number;
  aspect_ratio: string;
}

export const Carousels: React.FC<Props> = ({ productId }) => {
  const [images, setImages] = useState<Images[] | null>(null);

  console.log(productId);

  useEffect(() => {
    async function loadImages() {
      if (productId) {
        const { data } = await api.get(`/api/product/${productId}/images`);
        setImages(data);
      }
    }
    console.log(images);
    loadImages();
  }, []);

  return (
    <Carousel>
      {!!images?.length &&
        images.map(({ image, id }) => (
          <Carousel.Item key={id}>
            <img className="d-block w-100" src={image} alt="First slide" />
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default Carousels;
