import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import api from "../../../../services/Api";

interface Props {
  productId: number | null;
}

export const Carousels: React.FC<Props> = ({ productId }) => {
  const [images, setImages] = useState<{ url: string; id: number }[] | null>(
    null
  );

  useEffect(() => {
    async function loadImages() {
      if (productId) {
        const { data } = await api.get(`/api/product/${productId}/images`);
        setImages(data);
      }
    }
    loadImages();
  }, [productId]);
  console.log(images);
  return (
    <Carousel>
      {!!images?.length &&
        images.map(({ url, id }) => (
          <Carousel.Item key={id}>
            <img className="d-block w-100" src={url} alt="First slide" />
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default Carousels;
