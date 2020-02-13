import React from "react";
import { Modal } from "react-bootstrap";
import Carousel from "../Carousel";

interface Props {
  productId: number | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CarouselModal: React.FC<Props> = ({
  show,
  setShow,
  productId
}) => {
  function handleClose(): void {
    setShow(false);
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Carousel productId={productId} />
      </Modal.Body>
    </Modal>
  );
};

export default CarouselModal;
